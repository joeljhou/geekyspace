---
title: 实战编译JDK
description:
author: 流浪码客
isOriginal: true
date: 2024-07-26
category: JVM
tag: JVM
order: 1.6
---

# 实战编译JDK

想要窥探Java虚拟机内部的实现原理，最直接的路径就是编译自己的JDK。
尽管网络上有不少开源JDK实现，但OpenJDK无疑是最广泛使用的，我们将选择OpenJDK进行编译实战。

## 获取源码

* 版本选择OpenJDK 12，下载地址 [https://hg.openjdk.org/jdk/jdk12](https://hg.openjdk.org/jdk/jdk12)
* 点击“browse”链接，然后选择对应的压缩包（zip、gz）进行下载

![OpenJDK源码下载](https://img.geekyspace.cn/pictures/2024/202407260406861.png)

## 系统需求

建议在Linux或MacOS上构建OpenJDK，构建工具链和依赖项比起Windows或Solaris平台要容易许多。

* 认真阅读一遍源码中的`doc/building.html`文档
* 确保源码和依赖项不要放在包含中文的目录里面

## 构建编译环境

## 进行编译

## 在IDE工具中进行源码调试

