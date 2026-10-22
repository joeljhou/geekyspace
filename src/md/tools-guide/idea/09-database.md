---
title: IDEA 数据库工具
date: 2019-01-08
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: 数据库工具
description: IDEA 数据库连接、驱动下载、连接测试和常用数据库面板操作。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2019-01-09T03:22:16
created: 2019-01-08T21:06:35
---

# IDEA 数据库工具

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

IDEA 数据库连接、驱动下载、连接测试和常用数据库面板操作。

## 1. 关联方式

![image1](https://img.geekyspace.cn/pictures/2026/202610151621281.png)


![cf1210e2-c25c-4656-a1f2-f809b32b0783](https://img.geekyspace.cn/pictures/2026/202610220257981.png)


下载驱动后，点击 **Test Connection** 测试连接。

![2abe10b5-8907-4fe0-94b8-95998b7835b8](https://img.geekyspace.cn/pictures/2026/202610220257112.png)

![9f79f936-3850-4e6f-a1c1-e360ce6648ae](https://img.geekyspace.cn/pictures/2026/202610220257858.png)

Database 面板不仅用于图形化管理数据库，还能辅助 Java Web 开发。配置连接后，IDEA 可以结合 Hibernate、MyBatis 等框架识别实体与数据表的关系，并根据表结构生成对象。

## 2. 常用操作


![Pasted image 20261022025736](https://img.geekyspace.cn/pictures/2026/202610220257982.png)


- 图标 1：同步当前的数据库连接。

> 这个是最重要的操作。配置好连接以后或通过其他工具操作数据库以后，需要及时同步。

- 图标 2：配置当前的连接 。
- 图标 3：断开当前的连接。
- 图标 4：显示相应数据库对象的数据
- 图标 5：编辑修改当前数据库对象
