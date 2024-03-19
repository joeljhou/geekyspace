---
title: IoC 容器
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

## ApplicationContext实现类

Spring 提供了多个 `ApplicationContext` 接口的实现类

* [ClassPathXmlApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html)
* [FileSystemXmlApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html)

虽然 `XML` 一直是定义==配置元数据==的传统格式， 但通过提供少量的 `XML` 配置，您可以声明性地启用对`Java注解`或`Java代码`
作为元数据格式的支持，从而更灵活地定义应用程序的配置信息。

## 初始化IoC容器

在大多数应用场景中，无需手动编写代码来实例化**Spring IoC**容器

* 例如：Web应用中，只需要在`web.xml`中添加 8
  行[模板XML](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-create)
  即可初始化`ApplicationContext`

下图表展示了Spring框架的工作原理高层视图。通过将您的==应用程序类==与==配置元数据==结合起来，
一旦`ApplicationContext`被创建和初始化，您就获得了一个完全配置且可执行的系统或应用程序。

![Spring IoC容器](http://img.geekyspace.cn/pictures/2024/202403181756387.png)

## 配置元数据

Spring框架传统上使用`XML`文件来配置`ApplicationContext`，以下是示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="exampleBean1" class="com.example.ExampleClass1">
        <!-- 这个bean的协作器和配置在这里 -->
    </bean>

    <bean id="exampleBean2" class="com.example.ExampleClass2">
        <!-- 这个bean的协作器和配置在这里 -->
    </bean>

    <!-- 更多的bean定义见这里 -->

</beans>
```

1. `id`属性是一个字符串，用于==唯一标识==bean
2. `class`属性是一个字符串，用于指定bean的==完整类名==（包括包名）

> 传统的XML格式的元数据并不是唯一允许的配置元数据形式。Spring IoC容器本身与实际配置元数据的编写格式完全解耦。
> 如今，许多开发者选择使用[基于Java的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/java.html)
> 来构建他们的Spring应用程序。

有关在`Spring`容器中使用其他形式的元数据信息，请参阅：

* [基于XML的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-properties-detailed.html)
* [基于注解的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html)（Spring
  2.5开始支持）
* [基于Java的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/java.html)（Spring 3.0开始支持）
* 等等

## 实例化容器

* [链接](https://docs.spring.io/spring-framework/reference/core/beans/basics.html#beans-factory-instantiation)
