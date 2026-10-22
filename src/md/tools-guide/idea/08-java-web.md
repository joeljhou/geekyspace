---
title: IDEA 创建 Java Web 工程与配置 Tomcat
date: 2019-01-08
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: Java Web 与 Tomcat
description: 静态与动态 Java Web 工程的创建方式，以及 Tomcat 的配置过程。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2019-01-09T02:15:20
created: 2019-01-08T21:00:35
---

# IDEA 创建 Java Web 工程与配置 Tomcat

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

静态与动态 Java Web 工程的创建方式，以及 Tomcat 的配置过程。

## 1. 创建静态的 Java Web

![新建 Module 向导中选择 Static Web 静态网站](https://img.geekyspace.cn/pictures/2026/202610151623731.png)

![填写静态 Web Module 的名称和目录](https://img.geekyspace.cn/pictures/2026/202610151623732.png)

## 2. 创建动态的 Java Web

### 2.1 创建动态 Web 的 module

![新建 Java Web Module 时勾选 Web Application](https://img.geekyspace.cn/pictures/2026/202610151623733.png)
这里一定要勾选 Web Application，才能创建一个 Web 工程。
![填写 Java Web Module 的名称和路径](https://img.geekyspace.cn/pictures/2026/202610151623734.png)
提供 JavaWeb 的工程名。这里注意修改一下 Content root 和 Module file location。
创建以后的工程结构如下：
![Java Web 模块中的 web、WEB-INF、web.xml 与 index.jsp](https://img.geekyspace.cn/pictures/2026/202610151623735.png)
打开 index.jsp。修改为如下内容。这里你会发现 IDEA 的代码提示功能要强于 Eclipse。

### 2.2 配置 Tomcat

在 IDEA 中配置 Tomcat 之前，需要保证己经安装并配置了 Tomcat 的环境变量。如果没有安装并配置，可以参考《尚硅谷宋红康 Tomcat 快速部署.pdf》，配置完成以后，在命令行输入：catalina run。能够启动 tomcat，则证明安装配置成功
下面看如何在 IDEA 中配置：
![Run 菜单中的 Edit Configurations 入口](https://img.geekyspace.cn/pictures/2026/202610151623736.png)
点击 Edit Configurations
![运行配置中新增本地 Tomcat Server](https://img.geekyspace.cn/pictures/2026/202610151623737.png)
这里选择 Tomcat Server 或者 TomEE Server 都可以。接着选择 Local
![Tomcat 运行配置中指定服务器安装目录](https://img.geekyspace.cn/pictures/2026/202610151623368.png)
这里配置 Tomcat 的名称以及配置应用服务器的位置。根据自己 Tomcat 的安装位置决定。
![Tomcat Server 配置中的端口和浏览器选项](https://img.geekyspace.cn/pictures/2026/202610151623369.png)
其他地方使用默认值(设置要启动的浏览器以及端口号),如上。
接着部署
![Deployment 页面中添加 Artifact 部署包](https://img.geekyspace.cn/pictures/2026/202610151623370.png)

![部署列表中的 JavaWeb war exploded 和应用上下文](https://img.geekyspace.cn/pictures/2026/202610151623371.png)
点击 Ok 即可。此时：
![Tomcat Server 配置中的浏览器访问 URL](https://img.geekyspace.cn/pictures/2026/202610151623372.png)
执行刚才创建的 index.jsp 即可
![IDEA 工具栏中运行 Tomcat 配置的按钮](https://img.geekyspace.cn/pictures/2026/202610151623373.png)
效果如下：
![浏览器中打开 localhost 的 JavaWeb 示例页面](https://img.geekyspace.cn/pictures/2026/202610151623375.png)
注意事项：
显示运行以后的 Tomcat 的信息
![IDEA Run 窗口中停止 Tomcat 部署的按钮](https://img.geekyspace.cn/pictures/2026/202610151623376.png)
可以点击红框，刚点击完毕并不能马上关闭服务器，只是断开了与服务器的链接，稍后当停止按键显示为灰色，才表示关闭。
