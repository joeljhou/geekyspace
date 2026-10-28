---
title: Jetty
shortTitle: Jetty
description: Jetty 嵌入式 Web 容器的特点、Maven 插件及运行 Web 工程的方法。
author: 流浪码客
isOriginal: true
date: '2019-04-18'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 6
---
# Jetty

Jetty 嵌入式 Web 容器的特点、Maven 插件及运行 Web 工程的方法。

![Jetty 嵌入式 Web 容器的特点、Maven 插件及运行 Web 工程的方法](https://img.geekyspace.cn/pictures/2026/202610271647296.png)

## Jetty 是什么？

1. Jetty 是一个开源的 servlet 容器

2. 开发人员可以将 Jetty 容器实例化成一个对象，无需依赖外部环境，让程序以独立方式(stand-alone)运行

3. Jetty 支持嵌入式运行，也可用于开发环境。具体选型取决于部署方式与依赖兼容性。

4. 本篇通过 Maven 插件运行 Jetty；这和 Spring Boot 的内嵌 Jetty Starter 是两种接入方式。

## Jetty 开发套路

## 1. 创建 webapp 目录，包含 `WEB-INF/web.xml`

![创建 webapp 目录，包含 `WEB-INF/web.xml`](https://img.geekyspace.cn/pictures/2026/202610271647297.png)

### web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="3.0" xmlns="http://java.sun.com/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">

</web-app>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
version="4.0">

</web-app>
```

附件
[web.xml](/md/spring/ssm/attachments/jetty-web.xml)

## 2. pom.xml 引入插件 jetty-maven-plugin

将 Web 工程的 Maven 打包类型设置为 `war`。

![将 Web 工程的 Maven 打包类型设置为 war](https://img.geekyspace.cn/pictures/2026/202610271647298.png)

```xml
<!--Jetty启动一定要将打包从Jar改为war-->
<packaging>war</packaging>
<build>
    <plugins>
        <plugin>
            <!-- 嵌入式Jetty的Maven插件 -->
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-maven-plugin</artifactId>
            <version>9.4.16.v20190411</version>
            <configuration>
                <!--页面启动后加载webapp网页与资源-->
                <webAppSourceDirectory>src/main/webapp</webAppSourceDirectory>
                <httpConnector>
                    <!--应用端口号 默认8080端口-->
                    <port>80</port>
                </httpConnector>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## 3. 利用 jetty:run 启动嵌入式 web 应用

![利用 Jetty:run 启动嵌入式 web 应用：Maven](https://img.geekyspace.cn/pictures/2026/202610271647649.png)

启动成功后的控制台：

![启动成功后的控制台：端口号80](https://img.geekyspace.cn/pictures/2026/202610271647650.png)

页面运行结果：

![浏览器访问嵌入式 Jetty 后显示测试页面](https://img.geekyspace.cn/pictures/2026/202610271647651.png)

## 4. 通过引入 webdefault.xml 解决无法热部署的问题

文件修改无法保存

### 1. 将 useFileMappedBuffer 设为 false

![将 useFileMappedBuffer 设为 false：修改日期](https://img.geekyspace.cn/pictures/2026/202610271647652.png)

附件
[webdefault.xml](/md/spring/ssm/attachments/jetty-webdefault.xml)

![IDEA 中 Jetty 项目的源码目录结构](https://img.geekyspace.cn/pictures/2026/202610271647653.png)
在附件中查找 `useFileMappedBuffer` 并改为 `false`，不要依赖截图中的行号。
![在附件中查找 `useFileMappedBuffer` 并改为 `false`，不要依赖截图中的行号。：mymavenlpom.xml](https://img.geekyspace.cn/pictures/2026/202610271647654.png)

### 2. 在 pom.xml 中指定 webdefault.xml

![在 pom.xml 中指定 webdefault.xml](https://img.geekyspace.cn/pictures/2026/202610271648190.png)
再次启动程序，配置就会生效
```xml
<configuration>
<webApp>
<defaultsDescriptor>src/main/resources/webdefault.xml</defaultsDescriptor>
</webApp>
<!--页面启动后加载webapp网页与资源-->
<webAppSourceDirectory>src/main/webapp</webAppSourceDirectory>
<httpConnector>
<!--应用端口号默认8080端口-->
<port>80</port>
</httpConnector>
</configuration>
```

### 3. 创建 jetty:run 运行配置

![创建 jetty:run 运行配置](https://img.geekyspace.cn/pictures/2026/202610271648191.png)

![创建 jetty:run 运行配置：Docker](https://img.geekyspace.cn/pictures/2026/202610271647929.png)

在 Command line 输入命令 jetty:run,点击 OK
![在 Command line 输入命令 jetty:run,点击 OK](https://img.geekyspace.cn/pictures/2026/202610271647930.png)
生成快捷方式
![生成快捷方式](https://img.geekyspace.cn/pictures/2026/202610271647931.png)
