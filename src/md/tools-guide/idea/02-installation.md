---
title: IDEA Windows 安装与目录说明
date: 2019-01-06
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: Windows 安装与目录说明
description: Windows 下安装 IDEA 的软硬件要求、安装步骤、目录结构及 JVM 内存设置。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2019-02-09T00:20:11
created: 2019-01-06T02:47:59
---

# IDEA Windows 安装与目录说明

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

Windows 下安装 IDEA 的软硬件要求、安装步骤、目录结构及 JVM 内存设置。

## 1. 安装前准备

### 1.1 硬件要求

![image1](https://img.geekyspace.cn/pictures/2026/202610221218449.png)

原课程建议至少 8 GB 内存、Intel Core i5 级别处理器，并将 IDEA 安装在 SSD 上。硬件需求还取决于项目大小。

### 1.2 软件要求(Software requirements)

![image2](https://img.geekyspace.cn/pictures/2026/202610221218733.png)

## 2. 具体安装过程

.点击 exe 文件进行安装

![image3](https://img.geekyspace.cn/pictures/2026/202610221218734.png)

.选择安装路径

![image4](https://img.geekyspace.cn/pictures/2026/202610221218735.png)

.选择红框的两个就 OK 好。出于好奇，我把新出的“Update PATH variable”、“Update Folder as Project”勾上了（需重启电脑，麻烦，暂时还没发现添加环境变量的好处）

![image5](https://img.geekyspace.cn/pictures/2026/202610221218736.png)

![image6](https://img.geekyspace.cn/pictures/2026/202610221218737.png)

启动

![image7](https://img.geekyspace.cn/pictures/2026/202610221218738.png)

## 3. 安装总结

![image8](https://img.geekyspace.cn/pictures/2026/202610221218739.png)

## 4. 查看安装目录结构

![image9](https://img.geekyspace.cn/pictures/2026/202610221218740.png)

bin：容器，执行文件和启动参数等

help：快捷键文档和其他帮助文档

jre64：64 位 java 运行环境

lib：idea 依赖的类库

license：各个插件许可

plugin：插件

其中：bin 目录下：

![image10](https://img.geekyspace.cn/pictures/2026/202610221218741.png)

### 调整 JVM 内存参数

![image11](https://img.geekyspace.cn/pictures/2026/202610221218742.png)

1. 大家根据电脑系统的位数，选择 32 位的 VM 配置文件或者 64 位的 VM 配置文件
2. 32 位操作系统内存不会超过 4G ，所以没有多大空间可以调整，建议不用调整了
3. 64 位操作系统中 8G 内存以下的机子或是静态页面开发者无需修改。
4. 64 位操作系统且内存大于 8G 的，如果你是开发大型项目、 Java 项目或是 Android 项目 ，建议进行修改，常的就是下面 3 个参数 ：

| 参数 | 原课程值 | 16 GB 内存示例值 | 作用 |
| --- | --- | --- | --- |
| `-Xms` | `128m` | `512m` | 初始堆内存 |
| `-Xmx` | `750m` | `1500m` | 最大堆内存 |
| `-XX:ReservedCodeCacheSize` | `240m` | `500m` | JIT 编译代码缓存 |

数值来自旧版课程，调整时结合当前版本和实际内存使用情况。

## 5. 查看设置目录结构

![image12](https://img.geekyspace.cn/pictures/2026/202610221218743.png)
这是 IDEA 的各种配置的保存目录。这个设置目录有一个特性，就是你删除掉整个目录之后，重新启动 IntelliJ IDEA 会再自动帮你生成一个全新的默认配置，所以很多时候如果你把 IntelliJ IDEA 配置改坏了，没关系，删掉该目录，一切都会还原到默认

### 5.1 config 目录

`config` 保存 IDE 设置、代码模板、文件模板、快捷键和任务记录等。安装新版本时，IDEA 可导入旧版本的配置。
![image13](https://img.geekyspace.cn/pictures/2026/202610221218744.png)

### 5.2 system 目录

`system` 保存缓存、索引和运行产生的文件。具体目录位置随 IDEA 版本变化。
![image14](https://img.geekyspace.cn/pictures/2026/202610221218745.png)
