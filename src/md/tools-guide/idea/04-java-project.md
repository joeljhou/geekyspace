---
title: IDEA 创建 Java 工程与模块
date: 2019-01-06
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: 创建 Java 工程与模块
description: IDEA 中创建 Java 工程、包、类和模块，以及运行 HelloWorld 的基本流程。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2025-11-04T21:24:06
created: 2019-01-06T02:49:40
---

# IDEA 创建 Java 工程与模块

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

IDEA 中创建 Java 工程、包、类和模块，以及运行 HelloWorld 的基本流程。

## 1. 创建 Java 工程

![image1](https://img.geekyspace.cn/pictures/2026/202610151624053.png)

![image2](https://img.geekyspace.cn/pictures/2026/202610151624054.png)

这里选择 Create New Project,需要明确一下概念：
IntelliJ IDEA 没有类似 Eclipse 的工作空间的概念(Workspaces），最大单元就是
Project。这里可以把 Project 理解为 Eclipse 中的 Workspace
![image3](https://img.geekyspace.cn/pictures/2026/202610151624055.png)
选择指定目录下的 JDK 作为 Project
如果要创建 web 工程，则需要勾选上面的 Web Application。如果不需要创建 web
工程的话，则不需要勾选。这里先不勾选，只是创建简单的 Java 工程。

其中，选择 New：
选择 jdk 的安装路径所在位置：
![image4](https://img.geekyspace.cn/pictures/2026/202610151624056.png)
点击 OK 以后，选择 Next：
![image5](https://img.geekyspace.cn/pictures/2026/202610151624057.png)
这里不需要勾选，选择 Next，进入下一个界面
![image6](https://img.geekyspace.cn/pictures/2026/202610151624058.png)
给创建的工程起一个名字，点击 finish。
![image7](https://img.geekyspace.cn/pictures/2026/202610151625968.png)
点击 OK 即可
![image8](https://img.geekyspace.cn/pictures/2026/202610151625969.png)

## 2. 设置显示常见视图

![image9](https://img.geekyspace.cn/pictures/2026/202610151625970.png)
调出工具条和按钮组

## 3. 工程界面展示

![image10](https://img.geekyspace.cn/pictures/2026/202610151625971.png)

- 下的类似于 Eclipse 下的 src 目录，用于存放代码。
- 工程下的.idea 和 project01.iml 文件都是 IDEA 工程特有的。
  - 类似于 Eclipse 工程下 的 settings ，.classpath、.project 等

## 4. 创建 package 和 class

接着在 src 目录下创建一个 package
![image11](https://img.geekyspace.cn/pictures/2026/202610151625972.png)

![image12](https://img.geekyspace.cn/pictures/2026/202610151625973.png)
在包下 new-class
![image13](https://img.geekyspace.cn/pictures/2026/202610151625974.png)

![image14](https://img.geekyspace.cn/pictures/2026/202610151625975.png)
不管是创建 class，还是 interface，还是 annotation, 都是选择 new 一 java class
然后在下拉框中选择创建的结构的类型。
接着在类 Helloworld 里声明主方法，输出 HelloWorld，完成测试
说明：在 IDEA 里要说的是，写完代码，不用点击保存。IDEA 会自动保存代码

## 5. 创建模块(Module)

1. 在 Eclipse 中我们有 Workspace（工作空间）和 Project（工程）的概念，在 IDEA 中只有 Project（工程）和 Module (模块） 的概念。 这里的 对应关系为
![image15](https://img.geekyspace.cn/pictures/2026/202610151625976.png)
![image16](https://img.geekyspace.cn/pictures/2026/202610151625977.png)
这个地方刚开始用的时候会很容易理不清它们之间的关系。
2. 从 Eclipse 转过来的人总是下意识地要在同一个窗口管理 n 个 项 目 ， 这 在 IntelliJ IDEA 是无法做到的。IntelliJ IDEA 提供的解决方案开多个项目实例
即打开多个项目窗口。即：一个 Project 打开一个 Window 窗 口。
3. 在 IntelliJ IDEA 中 Project 是最顶级的级别，次级别是 Module。1 个 Project 可以有多个 Module 目前主流的大型项目都是分布式部的，结构都是类似这种多 Module 结构
![image17](https://img.geekyspace.cn/pictures/2026/202610151625978.png)
这类项目一般是这样划分的，比如：
core Module，webModule、plugin Module、soir Module 等等，模块之间彼此可以相互依赖。通过这些 Module 的命名也可以看出，他们之间都是处于同一个目 务下的模块，彼此之间是有不可分割的业务关系的。举例：
![image18](https://img.geekyspace.cn/pictures/2026/202610151625979.png)
4 .相比较于多 Module 项目，小项目就无需搞得这么复杂。只有一个 Module 的结构 IntelliJ IDEA 也是支持的，并且 IntelliJ IDEA 创建项目的时 候，默认就是单 Module 的结构
下面，我们演示如何创建 Module
![image19](https://img.geekyspace.cn/pictures/2026/202610151625980.png)

![image20](https://img.geekyspace.cn/pictures/2026/202610151625981.png)
接着选择 Next：
![image21](https://img.geekyspace.cn/pictures/2026/202610151625982.png)
之后，我们可以在 Module 的 src 里写代码，此时 Project 工程下的 src 就没什么用了。可以删掉。

## 6. 如何删除 Module

![image22](https://img.geekyspace.cn/pictures/2026/202610151625983.png)

![image23](https://img.geekyspace.cn/pictures/2026/202610151625984.png)

![image24](https://img.geekyspace.cn/pictures/2026/202610151625985.png)
此时的删除，会从硬盘上删除掉

## 7. 查看项目配置

![image25](https://img.geekyspace.cn/pictures/2026/202610151625986.png)
进入项目结构
![image26](https://img.geekyspace.cn/pictures/2026/202610151625987.png)
