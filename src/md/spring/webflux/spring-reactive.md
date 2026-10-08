---
title: Spring 反应式编程
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-09-23
category: Spring
tags:
  - webflux
---

# Spring 反应式编程
## 概念
- 官网地址： https://spring.io/reactive
- Spring WebFlux 是一个从头开始构建的非阻塞Web框架，旨在利用多核、下一代处理器并处理大量并发连接。

![同步阻塞 vs 反应式](http://img.geekyspace.cn/pictures/2025/202509232044205.png)

**使用 Spring Boot 的 Reactive 微服务**
- Spring 套件提供了两个并行栈。
- 一个是基于 Servlet API，包含 Spring MVC 和 Spring Data 的栈。
- 另一个是完全响应式的栈，利用 Spring WebFlux 和 Spring Data 的响应式仓库。
- 在这两种情况下，Spring Security 都为这两个栈提供原生支持。
![Servlet vs Reactive](https://spring.io/img/extra/reactive-5.svg)

## Reactive Stream 工作模式、流程
**`Reactive Stream Reartor` 与 `Webflux` 之间的关系**   
![反应式技术组件关系](http://img.geekyspace.cn/pictures/2025/202509232053357.png)

![订阅关系](http://img.geekyspace.cn/pictures/2025/202509232053949.png)

![Reactive Stream组件模型](http://img.geekyspace.cn/pictures/2025/202509232055481.png)