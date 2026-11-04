---
title: Lombok 的 Maven 配置与 Spring Boot 集成
shortTitle: Lombok 配置
description: 参考 Lombok 官方文档配置 Maven 依赖与注解处理器，说明 Spring Boot 项目如何复用版本管理，以及 JDK 23 和模块化编译的注意事项。
author: 流浪码客
isOriginal: true
date: 2026-11-05
category: 开发实践
tags:
  - Lombok
  - Maven
  - Spring Boot
---

# Lombok 的 Maven 配置与 Spring Boot 集成

主要官方来源：[Lombok Maven 配置](https://projectlombok.org/setup/maven) | [Spring Boot Maven 版本管理](https://docs.spring.io/spring-boot/maven-plugin/using.html) | [Spring Boot 依赖版本属性](https://docs.spring.io/spring-boot/appendix/dependency-versions/properties.html)

> Lombok 是编译期工具，通过注解生成构造函数、Getter/Setter 等代码，减少样板代码。它需要参与编译，但应用运行时不需要依赖 Lombok。

## 一、Spring Boot 项目配置

以下示例以项目已经继承 `spring-boot-starter-parent` 为前提，使用 Maven Compiler Plugin 3.x 的配置方式。

### 1. 添加依赖

在 `pom.xml` 的 `<dependencies>` 中添加：

```xml
<!-- 编译期工具：通过注解生成构造函数、Getter/Setter 等，减少样板代码 -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>
```

- **不需要显式指定版本号**：Spring Boot 的依赖管理已经管理了 Lombok 版本，省略 `<version>` 即可使用与当前 Spring Boot 版本配套的版本。
- **使用 `provided` 作用域**：Lombok 在编译时可用，但不会作为普通的运行时依赖传递给下游项目。应用运行依靠的是编译后生成的代码。
- **依赖管理不等于自动引入依赖**：即使 Spring Boot 管理了版本，仍然需要添加上面的 `<dependency>`。

### 2. 配置注解处理器

在 `pom.xml` 的 `<build><plugins>` 中添加或合并以下配置。如果已有 `maven-compiler-plugin`，直接在现有配置中补充，不要重复声明插件。

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

这里的 `${lombok.version}` 来自 Spring Boot 父 POM，无需在当前项目中重新定义，也不需要手写具体版本号。插件版本同样由父 POM 管理。

`<dependencies>` 声明编译时可用的 Lombok 注解，`<annotationProcessorPaths>` 则显式告诉编译器去哪里加载注解处理器，两者用途不同。

根据 Lombok 官方说明，以下情况**必须显式配置注解处理器**：

- 使用 **JDK 23 及以上版本**编译。
- 使用 **JDK 9 及以上版本**，并以 Java 模块方式编译，即项目中存在 `module-info.java`。

其他非模块化项目也可以使用上述显式配置，减少对默认扫描行为的依赖。如果项目还使用 MapStruct 等其他注解处理器，应保留它们的 `<path>`，不要只留下 Lombok。

### 3. 仅导入 Spring Boot BOM 的情况

如果项目没有继承 `spring-boot-starter-parent`，而是在 `<dependencyManagement>` 中导入 `spring-boot-dependencies`：

- Lombok 的**依赖声明仍可省略 `<version>`**，版本由 BOM 管理。
- **不能假定 `${lombok.version}` 可用**：导入 BOM 不会把 BOM 内部的属性继承到当前项目。
- BOM 只提供依赖管理，不提供插件管理，需要自行管理 `maven-compiler-plugin` 的版本。

对于支持从项目依赖管理中解析注解处理器版本的 Maven Compiler Plugin 3.12.0 及以上的 3.x 版本，可省略 `<path>` 中的 `<version>`，直接复用 BOM 管理的版本，详见[官方参数说明](https://maven.apache.org/plugins/maven-compiler-plugin/compile-mojo.html#annotationProcessorPaths)；使用较旧插件时，需要自行提供版本或定义属性，并与依赖版本保持一致。

## 二、普通 Maven 项目配置

如果没有使用 Spring Boot 或其他 BOM 管理 Lombok，就需要自行指定版本。可在 `pom.xml` 中统一定义属性，并在依赖和注解处理器中复用：

```xml
<properties>
    <lombok.version>1.18.48</lombok.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>${lombok.version}</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

上面的版本号取自撰写本文时的 Lombok 官方 Maven 示例，实际使用时应根据 JDK 版本和官方兼容性说明选择。

注解处理器沿用第一节的插件配置，让 `<path>` 中的 `${lombok.version}` 与依赖保持一致；普通 Maven 项目还需要自行管理 `maven-compiler-plugin` 的版本。

## 三、验证配置

在项目根目录执行：

```shell
mvn clean compile
```

确认实际使用了 Lombok 注解的代码能通过 Maven 编译，而不只是 IDE 中没有报错。

继承 Spring Boot 父 POM 的项目，还可以查看继承的版本属性：

```shell
mvn help:evaluate -Dexpression=lombok.version -q -DforceStdout
```

如果出现 `${lombok.version}` 无法解析、生成的方法或构造函数找不到等问题，优先检查父 POM 是否生效、注解处理器是否配置完整，以及当前 Lombok 版本是否支持正在使用的 JDK。
