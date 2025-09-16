---
title: Java 15 新特性：隐藏类（Hidden Classes）
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2023-12-26
category: Java Features
tag:
  - java
order: 371
---

# Java 15 新特性：隐藏类（Hidden Classes）

**隐藏类**（Hidden Classes） 提供了一种在运行时生成类的机制，在编译时未知，并且不能直接在源代码中引用，
需要通过反射间接使用它们，隐藏类是为框架设计的，具有以下特性：

* **动态生成内部类**：隐藏类天生为框架设计，在运行时生成内部类
* **反射访问限制**：隐藏类只能通过反射访问，不能直接被其他类的字节码访问
* **独立加载和卸载**：隐藏类可以独立于其他类加载和卸载
* **框架扩展性**：适用于需要在运行时生成类的框架，提高语言的灵活性和效率

## 原理


## 框架中应用


[https://bugs.openjdk.org/browse/JDK-8220607](https://bugs.openjdk.org/browse/JDK-8220607)
