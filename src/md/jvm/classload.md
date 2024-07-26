---
title: 类加载机制
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-07-20
category: JVM
tag: JVM
order: 3
---

# 类加载机制

## 类的生命周期

一个类从被加载到虚拟机内存中开始，到卸载出内存为止，整个生命周期将会经历如下七个阶段：

![类的生命周期](https://img.geekyspace.cn/pictures/2024/202407260441081.png)

加载、验证、准备、初始化和卸载这五个阶段按顺序开始。
解析阶段可以在初始化之后进行，以支持Java的运行时绑定特性。
这些阶段通常交叉混合进行，会在一个阶段执行过程中调用、激活另一个阶段。




