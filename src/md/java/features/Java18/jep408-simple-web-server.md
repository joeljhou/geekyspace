---
title: Java 18 新特性：简单Web服务器
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2024-01-02
category: Java Features
tag:
  - java
order: 408
---

# Java 18 新特性：简单Web服务器

Java 18 引入了**简单Web服务**器（Simple Web Server），一个专为教育或非正式任务设计的最小HTTP服务器，为单个目录层次结构提供服务。
基于JDK中的`com.sun.net.httpserver`包实现，旨在简化服务器的创建和请求处理过程。

主要特点：

* 不能替代成熟的商业服务器，如`Jetty`、`Nginx` 和 `Apache Tomcat`等
* 不提供身份验证、访问控制或加密等安全功能
* 仅支持HTTP/1.1，不支持HTTPS
* 仅支持GET、HEAD请求，否则返回 501 Not Implemented 或 405 Not Allowed

## 命令行工具

为了开始使用简单Web服务器，您需要准备一个`index.html`文件，并执行以下步骤：

1. 打开终端。
2. 输入命令：`jwebserver`。

```shell
$ jwebserver
```

默认情况下，服务器将绑定到本地回环地址，并在端口8000上提供服务。看到类似以下的输出：

```shell
Binding to loopback by default. For all interfaces use "-b 0.0.0.0" or "-b ::".
Serving /cwd and its subdirectories on 127.0.0.1 port 8000
URL: http://127.0.0.1:8000/
```

尝试访问一下 `http://127.0.0.1:8000/` ，就可以获得之前准备的HTML内容了。

### 支持的命令行选项

```shell
选项：
       -h 或 -? 或 --help
              打印帮助信息并退出.

       -b addr 或 --bind-address addr
              指定绑定的地址。默认：127.0.0.1或::1（回环地址）。要使用所有接口，请使用 -b 0.0.0.0 或 -b ::.

       -d dir 或 --directory dir
              指定要提供服务的目录。默认：当前目录.

       -o level 或 --output level
              指定输出格式。none | info | verbose。默认：info.

       -p port 或 --port port
              指定要监听的端口。默认：8000.

       -version 或 --version
              打印版本信息并退出。

       要停止服务器，请按 Ctrl + C.
```

## API编程方式

尽管命令行工具提供了便利，但为了更灵活地定制处理程序的行为，与现有代码集成，提高代码的可读性和可维护性，我们引入了新的API。

> 新的API中引入了三个新的类是`SimpleFileServer`、`HttpHandlers`和`Request`，
> 每个类都构建在`com.sun.net.httpserver`包中的现有类和接口上：`HttpServer`、`HttpHandler`、`Filter`和`HttpExchange`。

### 简单文件服务器（SimpleFileServer）

`SimpleFileServer`支持创建文件服务器、文件服务器处理程序和输出过滤器。

```java
package com.sun.net.httpserver;

public final class SimpleFileServer {
    // 创建文件服务器实例
    public static 1 createFileServer(
        InetSocketAddress addr, Path rootDirectory, OutputLevel outputLevel) {...}          
    
    // 创建文件服务器处理程序
    public static HttpHandler createFileHandler(
        Path rootDirectory) {...}
    
    // 创建输出过滤器
    public static Filter createOutputFilter(
        OutputStream out, OutputLevel outputLevel) {...}
    ...
}
```

有了这个类，在`jshell`中只需几行代码，就可以启动一个最小但定制的**文件服务器**：

```java
jshell> var server = SimpleFileServer.createFileServer(new InetSocketAddress(8080),
   ...> Path.of("/some/path"), SimpleFileServer.OutputLevel.INFO);
jshell> server.start()
```

相当于命令行模式的：

```shell
jwebserver -p 8080 -d /some/path -o info
```

### 自定义处理程序和过滤器

将自定义的**文件服务器处理程序**添加到现有服务器：

```java
jshell> var handler = SimpleFileServer.createFileHandler(Path.of("/some/path"));
jshell> var server = HttpServer.create(new InetSocketAddress(8080),
   ...> 10, "/store/", new SomePutHandler());
jshell> server.createContext("/browse/", handler);
jshell> server.start();
```

将自定义的**输出过滤器**在创建过程中添加到服务器：

```java
jshell> var filter = SimpleFileServer.createOutputFilter(System.out,
   ...> OutputLevel.INFO);
jshell> var server = HttpServer.create(new InetSocketAddress(8080),
   ...> 10, "/store/", new SomePutHandler(), filter);
jshell> server.start();
```

两个例子是由`HttpServer`和`HttpsServer`类中的新重载`create`方法启用的：

```java
public static HttpServer create(InetSocketAddress addr,
                                int backlog,
                                String root,
                                HttpHandler handler,
                                Filter... filters) throws IOException {...}
```

### 增强的请求处理（HttpHandlers）

简单Web服务器的核心功能是**处理程序**。为了与现有代码兼容，我们引入了`HttpHandlers`类，
提供两个静态方法用于==创建==和==自定义处理程序==，还有`Filter`类中的新方法用于适配请求：

```java
package com.sun.net.httpserver;

public final class HttpHandlers {
    
    // handleOrElse方法补充条件处理程序
    public static HttpHandler handleOrElse(Predicate<Request> handlerTest,
                                           HttpHandler handler,
                                           HttpHandler fallbackHandler) {...}
    
    // of方法创建具有预设响应状态的处理程序
    public static HttpHandler of(int statusCode, Headers headers, String body) {...}
    {...}
}
```

```java
public abstract class Filter {
    // adaptRequest方法获取预处理过滤器，用于在处理请求之前检查和调整请求的某些属性
    public static Filter adaptRequest(
        String description, UnaryOperator<Request> requestOperator) {...}
    {...}
}
```

这些方法的用例包括基于请求方法委托交换，创建总是返回特定响应的“canned response”处理程序，或向所有传入请求添加标头。

### 请求（Request）

现有API中，使用HttpExchange类来表达HTTP==请求-响应对==，描述了请求-响应交换的完整可变状态。
然而，并非所有这状态对于处理程序的定制和适配都是必要的。
因此，我们引入了更简单的Request接口，提供==请求==的不可变状态的有限视图。

```java
public interface Request {
    URI getRequestURI();         // 获取请求的URI
    String getRequestMethod();   // 获取请求的方法
    Headers getRequestHeaders(); // 获取请求的标头
    // 用于修改请求头部信息
    default Request with(String headerName, List<String> headerValues)
    {...}
}
```

这使得可以直接定制现有的处理程序，例如：

```java
// 创建一个处理程序，根据请求方法选择对应的处理器，如果请求方法为 PUT，则使用 SomePutHandler，否则使用 SomeHandler
var h = HttpHandlers.handleOrElse(r -> 
    r.getRequestMethod().equals("PUT"), new SomePutHandler(), new SomeHandler());
// 创建一个过滤器，用于修改请求头部信息，在请求中添加名为 "Foo" 的头部，值为 "Bar"
var f = Filter.adaptRequest("Add Foo header", r -> r.with("Foo", List.of("Bar")));
// 创建一个 HTTP 服务器，并指定端口为 8080，最大连接数为 10，根路径为 "/"，处理程序为 h，过滤器为 f
var s = HttpServer.create(new InetSocketAddress(8080), 10, "/", h, f);
// 启动服务器
s.start();
```

## 替代品

**命令行工具**的替代方案：

* 最初，使用 `java -m jdk.httpserver` 命令运行 Simple Web Server，没有专门的命令行工具
* 为了提高便利性和可访问性，我们引入了一个专门的工具 `jwebserver`
  * 实际上 `jwebserver` 在后台使用了 `java -m ...` 命令

**API编程方式**替代方案：

* 新的 `DelegatingHandler` 类：捆绑定制方法在一个单独的类中，但由于引入了新类型并未添加更多功能，我们放弃了这个选项。
* 将 `HttpHandler` 作为服务：将 `HttpHandler` 转换为服务，并提供内部文件服务器处理程序实现。然而，这种方法对于我们要提供的功能来说过于复杂。
* 使用**过滤器**而不是 `HttpHandler`：仅使用过滤器来处理请求，但这样做不符合直觉，并且过滤器的方法会更难找到。
