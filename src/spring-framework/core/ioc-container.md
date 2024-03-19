---
title: Ioc 容器
icon: spring
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-18
category: Spring
tag:

  - Spring
  - Spring Framework
---

# Ioc 容器

## 容器概述

> `org.springframework.context.ApplicationContext` 接口代表了 **Spring IoC** 容器，负责实例化、配置和组装 bean。

* 容器通过读取配置==元数据==来获取指令，从而确定要实例化、配置和组装哪些对象。
* 配置元数据可以用 XML、Java 注解或 Java 代码表示，它允许您表达组成应用程序的对象以及这些对象之间的丰富相互依赖关系。

### 容器实现

* Spring 提供了多个实现了 `ApplicationContext` 接口的实现类。
  * [ClassPathXmlApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html)
  * [FileSystemXmlApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html)

* 虽然 XML 一直是定义配置元数据的传统格式，但您可以通过提供少量的 XML 配置来声明性地启用对这些附加元数据格式的支持，
  从而指示容器使用 Java 注解或代码作为元数据格式。

### 容器初始化简化

* 在大多数应用场景中，通常不需要用户编写显式代码来实例化一个或多个 Spring IoC 容器的实例。
* 在 Web 应用程序场景中，通常只需要在应用程序的 `web.xml` 文件中添加简单的八行左右的模板式 Web 描述符 XML 就足够了
  （请参阅方便的 [Web 应用程序中的 ApplicationContext 实例化](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-create)）。
* 如果您使用 [Spring Tools for Eclipse](https://spring.io/tools)，您可以轻松地通过几次鼠标点击或按键来创建这个模板配置。

以下图表展示了 Spring 工作的高层视图。
您的应用程序类与配置元数据结合在一起，因此，在创建和初始化 ApplicationContext 之后，您就拥有了一个完全配置和可执行的系统或应用程序。

![container magic](http://img.geekyspace.cn/pictures/2024/202403181756387.png)

## 配置元数据
