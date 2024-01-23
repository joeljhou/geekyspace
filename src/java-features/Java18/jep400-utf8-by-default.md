---
title: Java 18 新特性：指定UTF-8为默认字符集
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-01-01
category: Java
tag:
  - Java
  - Java 18
order: 400
---

# Java 18 新特性：指定UTF-8为默认字符集

在Java 18中，将`UTF-8`指定为标准Java API 的默认字符集，
以提高Java程序在不同实现、操作系统、区域设置和配置下的一致性。

## 目标

* 使Java程序在依赖默认字符集的代码上更加可预测和**可移植**
* 明确标准Java API在何处使用默认字符集
* 在标准Java API中统一使用UTF-8，除了控制台I/O

尽管这项工作可能会发现新的便利方法可能会使现有的API更易于使用，但这一更改并不是要弃用或删除依赖默认字符集的标准Java API。

## 动机

默认情况下，Java API 会根据**运行时环境**（操作系统、用户的区域设置等）选择默认字符集。
为了提高 Java API 的一致性并降低潜在的兼容性问题，我们建议将所有 Java API 统一使用 `UTF-8` 作为默认字符集。
尽管这一变更可能对迁移到 JDK 18 的程序产生兼容性影响，但我们提供了一个 `COMPAT` 选项，允许恢复到之前的行为，即默认字符集取决于环境。

## 描述

### 兼容性危害示例

在MacOS上以`UTF-8`编码的日语文本文件在Windows上以美英或日语区域设置读取时被损坏

```java
java.io.FileReader(“hello.txt”) -> “こんにちは” (macOS)
java.io.FileReader(“hello.txt”) -> “ã?“ã‚“ã?«ã?¡ã? ” (Windows (en-US))
java.io.FileReader(“hello.txt”) -> “縺ォ縺。縺ッ” (Windows (ja-JP)
```

### 查询默认字符集

通过方法 `java.nio.charset.Charset.defaultCharset()` 可以获取默认字符集。

另外，使用以下命令可以快速查看当前 JDK 的默认字符集：

```java
java -XshowSettings:properties -version 2>&1 | grep file.encoding
```

如果想在所有 Java 版本上获取从环境中确定的字符集，可以使用以下代码：

```java
// 获取native.encoding系统属性（在Java 18及更高版本上赋值）
String encoding = System.getProperty("native.encoding");
// 使用三元运算符选择字符集，如果encoding不为null，则使用指定字符集，否则使用默认字符集
Charset cs = (encoding != null) ? Charset.forName(encoding) : Charset.defaultCharset();
// 使用指定字符集创建 FileReader 对象，打开名为 "file.txt" 的文件
var reader = new FileReader("file.txt", cs);
```

### 兼容使用默认字符集API（迁移）

多个标准 Java API 使用默认字符集，包括：

* 在 java.io 包中，InputStreamReader、FileReader、OutputStreamWriter、FileWriter 和 PrintStream
  提供了构造函数，用于创建使用默认字符集进行编码或解码的读取器、写入器和打印流
* 在 java.util 包中，Formatter 和 Scanner 提供了构造函数，使用默认字符集进行操作
* 在 java.net 包中，URLEncoder 和 URLDecoder 提供了使用默认字符集的已弃用方法

我们将更新所有使用 Charset.defaultCharset() 进行交叉引用的标准 Java API 的规范。
这些 API 包括上述提到的 API，但不包括 System.out 和 System.err，它们的字符集将由 Console.charset() 指定。

### file.encoding 和 native.encoding 系统属性

`file.encoding` 是 Java 虚拟机的系统属性，用于指定默认的字符编码

```shell
java -Dfile.encoding=COMPAT   # COMPAT 模式, 默认字符集取决于环境
java -Dfile.encoding=UTF-8    # UTF-8 模式, 默认字符集为UTF-8
```

`native.encoding` 在Java 17 中引入，该属性提供了底层主机环境的字符编码名称

Java内部使用了三个字符集相关的系统属性，它们目前未指定且不受支持。这里简要记录一下：

1. `sun.stdout.encoding`
2. `sun.stderr.encoding`
3. `sun.jnu.encoding`：

> Tips：对于JDK(8-17)：强烈建议开发人员使用`java -Dfile.encoding=UTF-8`指定默认字符集为UTF-8启动程序

### 源文件编码
Java语言允许源代码使用`UTF-16`编码方式表达`Unicode`字符，并且这不受默认字符集UTF-8的影响。
但是，`javac`编译器会受到影响，因为它需要将源代码转换为平台默认的字符集，除非通过`-encoding`选项进行配置

如果源文件以非UTF-8编码保存并在较早的JDK上进行编译，然后在JDK 18或更高版本上重新编译，可能会导致问题。
例如，如果非UTF-8源文件中的字符串文字包含非ASCII字符，则在JDK 18或更高版本中，除非使用`-encoding`选项，否则这些文字可能会被`javac`错误解释。

在使用UTF-8作为默认字符集的JDK上编译之前，强烈建议开发人员通过在当前JDK（8-17）上使用javac -encoding UTF-8 ... 进行编译来检查字符集问题。
另外，喜欢以非UTF-8编码保存源文件的开发人员可以通过将JDK 17及更高版本上的`-encoding`选项设置为`native.encoding`系统属性的值，防止javac假定UTF-8。

### 旧版默认字符集（US-ASCII）

在JDK 17及更早版本中，名称`default`会被识别为`US-ASCII`字符集的别名。

在JDK 18中，默认字符集`UTF-8`，保留`default`作为`US-ASCII`的别名将会非常混乱，于是重新定义`default`不再是`US-ASCII`的别名。

Java程序使用枚举常量StandardCharsets.US_ASCII来明确其开发人员意图，而不是向Charset.forName(...)传递字符串。

因此，在JDK 18中，`Charset.forName("default")`将抛出 UnsupportedCharsetException。
这将为开发人员提供检测到这种惯用法并迁移到US-ASCII或Charset.defaultCharset()结果的机会。
