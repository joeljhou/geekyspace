---
title: 第一章 Spring Boot2.x 快速上手
shortTitle: 第一章 快速上手
description: 使用 Maven 创建最小 Spring Boot 2.x Web 项目，理解核心依赖并启动接口。
icon: spring
author: 流浪码客
isOriginal: true
date: '2019-03-24'
category: Spring Boot
tag:
  - Spring Boot 2.x
order: 1
---

# 第一章 Spring Boot2.x 快速上手

主要官方来源：[Spring Boot 官网](https://spring.io/projects/spring-boot/)

> **Spring Boot** 最初由 Pivotal 团队推出，旨在简化 Spring 应用的初始搭建与开发过程，减少重复、模板化的配置。采用“==习惯优于配置==”的理念开发。

**特点**

1. 能够快速的创建基于Spring的应用程序。
2. 内嵌的Tomcat，Jetty等容器，直接打包成jar包，不用war包部署，部署简单
3. 提供生产就绪功能，如指针，健康检查和外部配置
4. 开箱即用，无需XML配置

![SpringBoot概观](http://img.geekyspace.cn/pictures/2026/202610271738725.png)


本文只完成一件事：创建一个能访问 `/hello` 的 Web 应用。

## 1. 创建项目

本文沿用 **Spring Boot 2.1.3.RELEASE + JDK 8**，使用 Maven 3.3+。~~该版本已停止开源维护~~。

在 IDEA 中创建普通 Maven 项目，填写：

| 配置         | 示例值              |
|------------|------------------|
| GroupId    | `cn.geekyspace`  |
| ArtifactId | `quickstart`     |
| JDK        | `8`              |
| 打包方式       | `jar`（Maven 默认值） |

也可以使用 [Spring Initializr](/md/spring/01-spring-initializr.md)，选择 Maven、Java、Jar 和 **Spring Web**。如果版本列表中没有 2.1.3，直接按本文使用普通 Maven 项目即可。

### 1.1 目录结构

```text
quickstart/
├── pom.xml                              # Maven 项目配置
└── src/
    ├── main/
    │   ├── java/                        # Java 源代码目录
    │   │   └── cn/geekyspace/quickstart/
    │   │       ├── DemoApplication.java
    │   │       └── HelloController.java
    │   └── resources/                   # 资源目录
    │       ├── static/                  # 静态资源目录
    │       ├── templates/               # 表面层页面目录
    │       └── application.properties   # Spring Boot 配置文件
    └── test/                            # 测试文件目录
        ├── java/
        └── resources/
```

![SpringBoot项目目录结构](http://img.geekyspace.cn/pictures/2026/202610271733455.png)

## 2. 配置核心依赖

### 2.1 配置

1. `spring-boot-starter-parent`：所有 Spring Boot 组件的基础引用。
2. `spring-boot-starter-web`：为SB应用提供Web的支持
3. `spring-boot-starter-thymeleaf`：提供thymeleaf模板引擎支持
4. `spring-boot-maven-plugin`：提供SB应用打包功能

### 2.2 pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.3.RELEASE</version>
        <relativePath/>
    </parent>

    <groupId>cn.geekyspace</groupId>
    <artifactId>quickstart</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
	        <groupId>org.springframework.boot</groupId>
	        <artifactId>spring-boot-starter-thymeleaf</artifactId>
	    </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

## 3. 编写启动类与接口

按前面的目录结构，在 `src/main/java/cn/geekyspace/quickstart/` 下创建启动类与接口类。

`application.properties` 用于配置端口等参数，本例保持为空即可。

启动类 `DemoApplication.java`：

```java
package cn.geekyspace.quickstart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

接口类 `HelloController.java`：

```java
package cn.geekyspace.quickstart;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot 2";
    }
}
```

**Controller 放在启动类所在包或其子包中**，默认组件扫描才能发现它。`@RestController` 将返回值直接写入 HTTP 响应，`@GetMapping` 指定 GET 请求路径。

## 4. 启动与验证

在 IDEA 中运行 `DemoApplication.main()`，或在项目根目录执行：

```bash
mvn spring-boot:run
```

启动后，在浏览器打开 <http://localhost:8080/hello>，或在另一个终端执行：

```bash
curl http://localhost:8080/hello
```

返回 `Hello Spring Boot 2` 即表示验证成功。默认端口为 `8080`，若被占用，可在 `application.properties` 中设置 `server.port=8081`，并相应修改访问地址。

下一篇：[第二章 常用配置](02-configuration.md)。打包与发布见[第七章](07-deployment.md)。
