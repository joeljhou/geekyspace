---
title: Spring 初始化
shortTitle: Spring Initializr
description: 对比三个 Spring Boot 脚手架的版本情况，说明选择 3.5.x 的原因，以及在 IDEA 中切换服务创建项目的方法。
icon: spring
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-10-23
category: Spring Boot
tags:
  - IntelliJ-IDEA
  - Spring-Boot
  - Spring-Initializr
  - Maven
---

# Spring Initializr

Spring Initializr 是生成 Spring Boot 项目骨架的脚手架服务，可根据选择的构建工具、Java 版本和依赖，生成项目配置与基础目录。

## 三种脚手架如何选？

### Spring 官方断档（4.x）

地址：[https://start.spring.io](https://start.spring.io/)

![官方脚手架](http://img.geekyspace.cn/pictures/2026/202610230709067.png)

官方脚手架的版本列表已转向 **Spring Boot 4.x**，不再提供 **3.5.x** 的创建入口。以 Boot 4.0 为例，其底层升级到 **Spring Framework 7.0 与 Jakarta EE 11**，最低要求为 **JDK 17**。

如果使用尚未适配的旧版 Dubbo、Nacos 相关 Starter 等组件，贸然升级可能因 API 或包结构变化，出现类找不到、方法不存在或自动配置失效。**需要使用 4.x，且依赖生态已完成适配时，优先选择官方脚手架。** 这里的“断档”仅指在线创建入口，不代表 3.5.x 的官方依赖无法使用。

### 阿里脚手架落后（2.x-3.0.2）

地址：[https://start.aliyun.com](https://start.aliyun.com/)

![阿里脚手架](http://img.geekyspace.cn/pictures/2026/202610230709033.png)

阿里脚手架最高可选版本仍为 **3.0.2**，不仅缺少后续版本的修复，也没有 **Boot 3.2 起提供的 JDK 21 虚拟线程自动配置支持**，不宜直接作为新项目基线。

**复现旧项目、且目标版本与其模板匹配时，可以使用阿里脚手架。** 是否涉及高危安全漏洞，应以具体依赖版本和安全公告为准，不能仅凭“3.x 初代版本”就断言存在大量高危 CVE。

### 黄金交界点（3.5.x）

地址：[https://start.springboot.io](https://start.springboot.io/)

![第三方脚手架](http://img.geekyspace.cn/pictures/2026/202610230709558.png)

**3.5.x 兼顾生态兼容性与新特性：**

- **迁移成本较低**：基于 Spring Framework 6.2，无需直接跨入 Boot 4 技术栈。
- **支持虚拟线程**：配合 JDK 21 使用，**默认不开启**，需在 `application.properties` 中显式设置 `spring.threads.virtual.enabled=true`。
- **提供创建入口**：该脚手架可选择 **3.5.16**。

例如，创建 **Spring AI Alibaba** 项目时，[官方版本说明](https://java2ai.com/docs/versions/)中当前推荐版本对应 **Boot 3.5.x**，就可以使用这个脚手架。

![Spring AI Alibaba 框架版本](http://img.geekyspace.cn/pictures/2026/202610230716937.png)

> 生产使用前，仍需核对维护周期、安全补丁和组件兼容性。

## IDEA 中切换

IDEA 的版本列表由脚手架服务提供，**更换 Server URL 即可切换可选版本**。

打开 **File → New → Project → Spring Boot**，将 **Server URL** 改为 `https://start.springboot.io`，即可选择 **3.5.16** 创建项目。

![IDEA 更换服务器 URL](http://img.geekyspace.cn/pictures/2026/202610230641581.png)

> 若生成的 `pom.xml` 父版本为 `3.5.16.RELEASE`，去掉 `.RELEASE`，再重新加载 Maven 项目。

脚手架只负责生成项目骨架，依赖版本仍由 `pom.xml` 中的父工程和 BOM 统一管理。
