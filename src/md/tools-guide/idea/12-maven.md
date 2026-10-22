---
title: IDEA Maven 配置与模块创建
date: 2019-01-08
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
  - Maven
shortTitle: Maven 配置与模块创建
description: 介绍 Maven 的构建作用，并记录 IDEA 中配置 Maven 和创建模块的步骤。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2019-04-19T22:53:22
created: 2019-01-08T21:16:25
---

# IDEA Maven 配置与模块创建

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

介绍 Maven 的构建作用，并记录 IDEA 中配置 Maven 和创建模块的步骤。

## 1. Maven 的介绍

![image1](https://img.geekyspace.cn/pictures/2026/202610151624039.png)

构建工具的发展：Make → Ant → Maven → Gradle。

Maven 是 Apache 提供的一款自动化构建工具，用于自动化构建和依赖管理。开发团队基本不用花多少时间就能自动完成工程的基础构建配置，因为 Maven 使用了一个标准的目录结构和一个默认的构建生命周期。在如下环节中，Maven 使得开发者工作变得更简单。
构建环节：
![image2](https://img.geekyspace.cn/pictures/2026/202610151624040.png)
![image3](https://img.geekyspace.cn/pictures/2026/202610151624041.png)

## 2. Maven 的配置

maven 的 下载 一 解压 一 环境变量的配置 这里就赘述了，需要的参考 1 课件中的《Maven 的配置》。下面直接整合 Maven 选择自己 Maven 的目录，和 settings 文件，然后配置自己的仓库 repository。
![image4](https://img.geekyspace.cn/pictures/2026/202610151624042.png)
![image5](https://img.geekyspace.cn/pictures/2026/202610151624043.png)

- Maven home directory：可以指定本地 Maven 的安装目录所在，因为我己经配置了 M2_HOME 系统参数，所以直接这样配置 IntelliJ IDEA 是可以找到的。但是假如你没有配置的话，这里可以选择你的 Maven 安装目录。此外，这里不建议使用 IDEA 默认的。
- User settings file/ Local repository 我们还可以指定 Maven 的 settings.xml 位置和本地仓库位置。
![image6](https://img.geekyspace.cn/pictures/2026/202610151624044.png)

![image7](https://img.geekyspace.cn/pictures/2026/202610151624045.png)

- Import Maven projects automatically：表示 IntelliJ IDEA 会实时监控项目的 pom.xml 文件，进行项目变动设置。
- Automatically down load ：在 Maven 导入依赖包的时候是否自动下载源码和文档。默认是没有勾选的，也不建议勾选，原因是这样可以加快项目从外网导入依赖包的速度，如果我们需要源码和文档的时候我们到时候再针对某个依賴包进行联网下载即可。IntelliJ IDEA 支持直接从公网下载源码和文档的。
- VM options for importer：可以设置导入的 VM 参数。一般这个都不需要主动改，除非项目真的导入太慢了我们再增大此参数。

## 3. 创建对应的 Module

![image8](https://img.geekyspace.cn/pictures/2026/202610151624046.png)

![image9](https://img.geekyspace.cn/pictures/2026/202610151624047.png)
举例：此时的 Spring Initalizr 是 springboot 工程模板。
![image10](https://img.geekyspace.cn/pictures/2026/202610151624048.png)
Group：组织或公司域名，倒序
Artifact：项目模块名称
Version：默认 maven 生成版本：0.01-SNAPSHOT
![image11](https://img.geekyspace.cn/pictures/2026/202610151624049.png)
这里可以暂时先不选，后面开发需要了再进行设置。
![image12](https://img.geekyspace.cn/pictures/2026/202610151624050.png)
点击 finish 即可完成创建
![image13](https://img.geekyspace.cn/pictures/2026/202610151624051.png)
创建完成以后，可以在 IDEA 右边看到创建的 Module 如果没有，可以刷新一下。
目录下也会有对应的生命周期。其中常用的是：clean、compile、package、install

比如这里 install,如果其他项目需要将这里的模块作为依赖使用，那就可以 install.安装到本地仓库的位置。
![image14](https://img.geekyspace.cn/pictures/2026/202610151624052.png)
其他操作这里不再赘述。
