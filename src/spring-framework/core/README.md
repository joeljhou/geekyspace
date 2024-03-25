---
title: Spring 核心技术
icon: spring
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-18
category: Spring
tag:
  - Spring
  - Spring Framework
---

# Spring 核心技术

## 核心技术

Spring 框架的核心技术主要包括：

* **依赖注入（dependency injection），也称为控制反转（IOC）**
* 事件（events）
* 资源（resources）
* 国际化（i18n）
* 数据验证（validation）
* 数据绑定（data binding）
* 类型转换（type conversion）
* SpEL（Spring Expression Language）
* **面向切面编程（AOP）**

## Spring IoC容器和Bean简介

**Spring IoC（控制反转）** 也被称为**依赖注入（DI）**。

它是一个过程，对象仅通过构造函数参数、工厂方法参数 或在 构造函数或工厂方法实例化后设置的属性来定义它们的依赖关系。
在IoC容器创建bean时，它会注入这些依赖项。 这个过程对象不再通过直接构造依赖项或使用服务定位器模式等方式来控制其实例化或位置，
而是交由IoC容器来管理，因此称为**控制反转**。

[org.springframework.beans](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/beans/factory/BeanFactory.html)
和 [org.springframework.context](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/ApplicationContext.html)
包是Spring Framework的IoC容器的基础。
[BeanFactory](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/beans/factory/BeanFactory.html)
接口提供了一种高级配置机制，能够管理任何类型的`object`对象。
[ApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/ApplicationContext.html)
是 BeanFactory 的一个子接口。它增加了：

* 与Spring的AOP特性更好的集成
* `Message resource`消息资源处理（用于国际化）
* `Event publication`事件发布
* 应用层特定的上下文，例如Web应用程序的`WebApplicationContext`

简而言之，`BeanFactory` 提供了配置框架和基本功能，`ApplicationContext` 添加了更多企业特定的功能。
`ApplicationContext` 是 `BeanFactory` 的一个超集。 在特别要求轻量级应用程序的情况下，可以考虑使用`BeanFactory`。

想要了解 BeanFactory
请参阅 [BeanFactory API](https://docs.spring.io/spring-framework/reference/core/beans/beanfactory.html) 。
