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

其中最重要的技术之一是Spring框架的==控制反转（IOC）== 容器，它是Spring框架的核心。
紧随其后的是Spring框架的==面向切面编程（AOP）== 技术。

## AOP支持

Spring框架独有的AOP框架采用基于代理的实现方式，这种方式使AOP
概念易于理解，并且成功地满足了Java企业编程中80%的AOP需求。
此外，Spring 可以与`AspectJ`无缝集成，后者是Java企业领域功能最丰富、最成熟的 AOP 实现之一。

## AOT（Ahead-of-Time）处理

`AOT（Ahead-of-Time）`处理用于优化应用程序的性能。通常用于使用`GraalVM`进行本地图像部署。
通过AOT编译，应用程序可以在启动时更快地启动和执行，提高了应用程序的响应速度和资源利用率。

