---
title: Java 11 新特性 ：移除JavaEE和CORBA模块以及JavaFX
shortTitle: Java 11 新特性 ：移除JavaEE和CORBA模块
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2023-12-24
category: Java
tag:
  - Java
  - Java 11
order: 320
---

# Java 11 新特性 ：移除JavaEE和CORBA模块以及JavaFX

Java 11 中移除了 `Java EE` 和 `CORBA` 模块，同时 `JavaFX` 也被剥离，但仍可作为独立模块使用。

## Java9 弃用过程

在 Java 9 中，`Java EE` 和 `CORBA` 模块被标记为 @Deprecated，为开发者提供了适应期。

## Java11 彻底删除

Java 11 完全删除了以下九个模块：

* java.xml.ws（包含 JAX-WS、SAAJ 和 Web 服务元数据）
* java.xml.bind（JAXB）
* java.activation(JAF)
* java.xml.ws.annotation（常用注解）
* java.corba（CORBA）
* java.transaction(JTA)
* java.se.ee (以上6个模块的聚合模块)
* jdk.xml.ws (JAX-WS 工具)
* jdk.xml.bind (JAXB 工具)

删除后的影响：

* 源代码从 OpenJDK 存储库中删除
* 在 JDK 运行时映像中将不包含这些类
* 相关工具将不再可用:
    * wsgen and wsimport (来自 jdk.xml.ws)
    * schemagen and xjc (来自 jdk.xml.bind)
    * idlj, orbd, servertool, and tnamesrv (来自 java.corba)
* JNDI CosNaming 提供者 (来自 java.corba) 将不再可用
* 不再有命令行标志能够启用它们，就像 JDK 9 上的 --add-modules 一样

## JavaFX 移除

`JavaFX` 在 Java 11 中被移除，但仍可以作为独立模块使用。
开发者需要额外的配置和依赖，以在项目中继续使用 JavaFX 技术。
