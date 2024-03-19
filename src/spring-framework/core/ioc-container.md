---
title: IoC 容器
icon: spring
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-18
category: Spring
tag:
  - Spring
  - Spring Framework
---

# IoC 容器

## 概述

> `org.springframework.context.ApplicationContext` 接口代表了**Spring IoC**容器，负责实例化、配置和组装`Bean`

容器通过读取==配置元数据==来获取指令，从而确定要实例化、配置和组装哪些对象。
配置元数据可以用 `XML`、`Java注解`或`Java代码`表示， 用于描述应用程序中的对象及它们之间的复杂相互依赖关系。

## 实现类

Spring 提供了多个 `ApplicationContext` 接口的实现类

* [ClassPathXmlApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html)
* [FileSystemXmlApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html)

虽然 `XML` 一直是定义==配置元数据==的传统格式， 但通过提供少量的 `XML` 配置，您可以声明性地启用对`Java注解`或`Java代码`
作为元数据格式的支持，从而更灵活地定义应用程序的配置信息。

## 初始化

在大多数应用场景中，无需手动编写代码来实例化**Spring IoC**容器

* 例如：Web应用中，只需要在`web.xml`中添加 8
  行[模板XML](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-create)
  即可初始化`ApplicationContext`

下图表展示了Spring框架的工作原理高层视图。通过将您的==应用程序类==与==配置元数据==结合起来，
一旦`ApplicationContext`被创建和初始化，您就获得了一个完全配置且可执行的系统或应用程序。

![container magic](http://img.geekyspace.cn/pictures/2024/202403181756387.png)
