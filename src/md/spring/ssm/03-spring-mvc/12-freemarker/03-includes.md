---
title: 子页面
shortTitle: 子页面
description: 通过 header、footer 和主页面模板，记录 FreeMarker include 复用子页面的方法。
author: 流浪码客
isOriginal: true
date: '2019-04-20'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
  - FreeMarker
order: 3
---
# 子页面

通过 header、footer 和主页面模板，记录 FreeMarker include 复用子页面的方法。

## 主页面与公共子页面

![主页面与公共子页面](https://img.geekyspace.cn/pictures/2026/202610271647934.png)

### test.ftl

```html
<#include "include/header.ftl"/>

<b>${testString}</b>
<h1>I`m bilibili!!!</h1>

<#include "include/footer.ftl"/>
```

### header.ftl

```html
首页|专栏|广场|直播|小黑屋
<hr>
```

### footer.ftl

```html
<hr>
Copyright...
```
