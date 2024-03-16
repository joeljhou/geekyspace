---
title: Spring Framework 概述
icon: spring
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-15
category: Spring
tag:
  - Spring
  - Spring Framework
---

# Spring Framework 概述

## Spring Framework 简介

官网地址：[spring-framework-overview](https://docs.spring.io/spring-framework/reference/index.html)

Spring是一个开源、轻量级、依赖注入(DI)容器和框架，用于构建Java企业应用程序。

## 为什么使用Spring？

> 官网解释：[why-spring](https://spring.io/why-spring)
>
> Spring让Java编程变得更快、更容易、更安全。
> Spring对速度、简单性和生产力的关注使其成为世界上最受欢迎的Java框架。

我们使用了许多Spring框架提供的工具，并受益于许多==开箱即用==的解决方案，
无需担心编写大量额外的代码，因此这确实为我们节省了时间和精力。

## 设计理念

* 在各个层面提供选择：
    * Spring 支持延迟设计决策，例如可以通过配置切换持久层而无需修改代码
* 容纳不同的观点：
    * Spring框架具有灵活性，不固守特定的实现方式，可以满足广泛的应用需求
* 保持后向兼容性：
    * Spring版本升级尽量保持向后兼容，并支持固定的JDK版本和第三方库，便于应用程序维护
* 专注 API 设计：
    * Spring 团队非常注重API的易用性和可维护性，确保在多个版本中保持稳定
* 追求严苛的代码质量：
    * Spring框架强调代码可读性、准确性和及时更新，保持清晰结构且避免循环依赖

## 核心思想

Spring的核心思想是 **控制反转（IOC）** 和 **面向切面编程（AOP）**。

### 控制反转（IOC）

控制反转是一种设计模式，它将对象的创建和对象之间的依赖关系的管理交给了Spring IOC容器。
在传统的开发模式中，对象的创建和对象之间的依赖关系的管理都是由程序员来完成的。

### 面向切面编程（AOP）

面向切面编程是一种编程范式，它将程序的业务逻辑和系统级服务（如日志，事务，安全等）分开，通过==横切关注点==的方式来解耦。
在传统的开发模式中，业务逻辑和系统级服务是混在一起的，这样会导致代码的复杂性增加。

## 版本支持

我们建议尽可能从Maven Central升级到最新的**Spring Framework 6.0.x / 5.3.x** 版本

在Spring Framework 6.0中， Spring需要Java 17+。

* 6.2.x (2024年11月) - 下一个功能分支
* 6.1.x (2023年11月) - 即将推出的功能分支
* 6.0.x (2022年11月) - 主要生产线，基于JDK 17和Jakarta EE 9
* 5.3.x - 第五代最终功能分支，长期支持，支持JDK 8、11、17和Java EE 8
* 4.3.x - EOL (2020年12月31日)，不再提供维护和安全补丁
* 3.2.x - EOL (2016年12月31日)，不再提供维护和安全补丁

您可以在 [spring.io](https://spring.io/projects/spring-framework#support)上找到有关官方支持日期的更多信息。

## 入门指南

使用[Spring Boot](https://spring.io/projects/spring-boot)来快速创建生产就绪的Spring应用程序。

* 您可以通过[start.spring.io](start.spring.io)生成基本项目
* 或者遵循"[入门指南](https://spring.io/guides)"
  之一，例如"[开始构建RESTful Web服务](https://spring.io/guides/gs/rest-service/)"。
