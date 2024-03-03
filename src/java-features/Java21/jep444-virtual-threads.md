---
title: Java 21 新特性：虚拟线程
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-01-11
category: Java
tag:
  - Java
  - Java21
order: 444
---

# Java 21 新特性：虚拟线程（Virtual Threads）

Java 21 引入了**虚拟线程**（Virtual Threads）功能，它是对线程的一种新的实现方式，用于提高并发性能和降低资源消耗。
虚拟线程，也称为“用户模式线程”（User-Mode Threads）或 ”纤程“（Fibers），是一种轻量级的线程，它不需要操作系统的线程支持，而是由Java虚拟机（JVM）直接管理。

