---
title: Lombok 的 Maven 配置
shortTitle: Lombok 配置
description: 参考官方文档添加 Lombok Maven 依赖与注解处理器，并补充 Spring Boot 的版本管理说明。
author: 流浪码客
isOriginal: true
date: 2026-11-05
category: 开发实践
tags:
  - Lombok
  - Maven
  - Spring Boot
---

# Lombok 的 Maven 配置

官方文档：[Lombok Maven 配置](https://projectlombok.org/setup/maven)

> Lombok 是编译期工具，通过注解生成构造函数、Getter/Setter 等代码，减少样板代码。应用运行时无需依赖 Lombok。

以下以继承 `spring-boot-starter-parent` 的 Spring Boot 项目为例，使用 Maven Compiler Plugin 3.x。

## 一、添加依赖

在 `pom.xml` 的 `<dependencies>` 中添加 Lombok 依赖：

```xml
<!-- 编译期工具：通过注解生成构造函数、Getter/Setter 等，减少样板代码 -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>
```

- **版本管理**：Spring Boot 已管理 Lombok 版本，无需显式指定 `<version>`。
- **作用域**：`provided` 表示编译时可用，不作为运行时依赖引入。

## 二、配置注解处理器

在 `pom.xml` 的 `<build><plugins>` 中显式配置 Lombok 注解处理器：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

- **必需场景**：使用 JDK 23+，或在 JDK 9+ 下进行模块化编译（含 `module-info.java`）。
- **版本管理**：`${lombok.version}` 由 Spring Boot 父 POM 提供，插件版本也由父 POM 管理。
- **其他处理器**：使用 MapStruct 等注解处理器时，保留对应的 `<path>` 配置。

## 三、验证配置

在项目根目录执行：

```shell
mvn clean compile
```

确认使用 Lombok 注解的代码能通过 Maven 编译，而不只是 IDE 中没有报错。
