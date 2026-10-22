---
title: IDEA 断点调试
date: 2019-01-08
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: 断点调试
description: IDEA 的调试设置、单步执行、条件断点和表达式查看方法。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2019-03-27T00:55:57
created: 2019-01-08T21:14:55
---

# IDEA 断点调试

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

IDEA 的调试设置、单步执行、条件断点和表达式查看方法。

## 1. Debug 的设置

![image1](https://img.geekyspace.cn/pictures/2026/202610151623388.png)

设置 Debug 连接方式，默认是 Socket。Shared memory 是 Windows 特有的一个属性，一般在 Windows 系统下建议使用此设置，内存占用相对较少。

## 2. 常用断点调试的快捷键

![Pasted image 20261022030423](https://img.geekyspace.cn/pictures/2026/202610220305995.png)

> step over：进入下一步，如果当前断点是一个方法，则不进入当前方法体内

![Pasted image 20261022030433](https://img.geekyspace.cn/pictures/2026/202610220305305.png)

> step into：进入下一步，如果当前断点是一个方法，则进入当前方法体内

![Pasted image 20261022030437](https://img.geekyspace.cn/pictures/2026/202610220305472.png)

> force step info：进入下一步，如果当前断点是一个方法，则进入当前方法体内

![Pasted image 20261022030440](https://img.geekyspace.cn/pictures/2026/202610220305659.png)

> step out：跳出

![Pasted image 20261022030452](https://img.geekyspace.cn/pictures/2026/202610220305807.png)

> resume program：恢复程序运行，但如果该断点下面代码还有断点则停在下一个断点上

![Pasted image 20261022030456](https://img.geekyspace.cn/pictures/2026/202610220305766.png)

> stop：停止

![Pasted image 20261022030500](https://img.geekyspace.cn/pictures/2026/202610220305511.png)

> mute breakpoints：点中，使得所有断点失效

![Pasted image 20261022030503](https://img.geekyspace.cn/pictures/2026/202610220305018.png)

> view breakpoints：查看所有断点

对于常用的 Debug 的快捷键，需要大家熟练掌握。

## 3. 条件断点

![image10](https://img.geekyspace.cn/pictures/2026/202610151623389.png)

### 说明

在循环中设置条件断点，可以只在满足条件时暂停，减少重复的单步操作。

### 具体操作

在断点处右击调出条件断点。可以在满足某个条件下，实施断点。

## 查看表达式的值(ctrl+u)

选择行，ctrl+u 还可以在查看框中输入编写代码时的其他方法:
![image11](https://img.geekyspace.cn/pictures/2026/202610151623390.png)
