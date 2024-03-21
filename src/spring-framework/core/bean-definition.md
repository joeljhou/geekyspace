---
title: Bean 定义
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-18
category: Spring
tag:
  - Spring
  - Spring Framework
---

# Bean 定义

## 概述

> Spring IoC 容器管理的对象称为 Bean。
> 由`org.springframework.beans.factory.config.BeanDefinition` 接口表示，定义了Bean的配置元数据。

## BeanDefinition

`BeanDefinition` 包含以下元数据：

* Bean的包限定类名
* Bean的行为配置元素，例如作用域、生命周期回调等
* Bean的依赖关系
* 其他配置信息（如：管理连接池的Bean可以配置池的大小，连接数量等）

该元数据转换为组成每个bean定义的一组属性。 下表介绍了这些属性：

| 属性                       | 描述           |
|--------------------------|--------------|
| Class                    | Bean的全限定类名   |
| Name                     | Bean的名称      |
| Scope                    | Bean的作用域     |
| Constructor arguments    | Bean的构造函数参数  |
| Properties               | Bean的属性      |
| Autowiring mode          | Bean的自动装配模式  |
| Lazy initialization mode | Bean的延迟初始化模式 |
| Initialization method    | Bean的初始化方法   |
| Destruction method       | Bean的销毁方法    |

