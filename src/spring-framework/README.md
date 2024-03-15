---
title: Spring 框架
icon: spring
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-15
category: Spring
tag:
  - Spring
  - Spring Framework
---

# Spring 框架

## 什么是Spring框架？

Spring是一个开源的Java框架，用于构建企业级应用程序。
核心思想是避免重复造轮子，通过 ==IOC==（控制反转）和==AOP==（面向切面编程）提供了一种更加简单、更加高效的开发方式。
专注于企业程序的“管道”组件，如事务管理、安全、数据访问、Web应用程序等。

## 为什么选择Spring框架？

> 官网解释：[why-spring](https://spring.io/why-spring)
>
> Spring让Java编程变得更快、更容易、更安全。
> Spring对速度、简单性和生产力的关注使其成为世界上最受欢迎的Java框架。

我们使用了许多Spring框架提供的工具，并受益于许多==开箱即用==的解决方案，
无需担心编写大量额外的代码，因此这确实为我们节省了时间和精力。

## 版本支持

我们建议尽可能从Maven Central升级到最新的**Spring Framework 6.0.x / 5.3.x** 版本

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
