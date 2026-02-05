---
title: 获取当前时间戳
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-02-04
category: Java Dates
tags:
  - date-time
---
# 获取当前时间戳

> 在Java中，**时间戳**（Timestamp）用来表示一个特定的**时间点**（`Instant`），本质上是一个与时区无关的时间线坐标。 
> 它通常表示自 **1970-01-01 00:00:00 UTC**（Unix 纪元） 起经过的时间长度。精度到**纳秒**。
## 1. 获取当前时间戳
在Java中，时间戳用以下类表示：
- [java.time.Instant](https://www.runoob.com/java/java-instant-class.html)
- `java.sql.Timestamp`（Java 7 及以前）
### 1.1 Instant
`Instant`表示从 **系统 UTC 时钟** 获取的 **当前时间点**。 
```java
Instant instant = Instant.now();  //2026-02-04T14:19:17.793293Z
```
⚠️ 思考 [Java 17 中 Instant.now 的精度改变了吗？](https://www.reddit.com/r/java/comments/1ffwkc7/has_the_precision_of_instantnow_changed_in_java_17/?tl=zh-hans)
### 1.2 Timestamp
`Timestamp`是`java.util.Date`的子类，表示一个具体的时间点，精确到**毫秒**。
```java
// 基于系统毫秒时间戳
Timestamp timestamp1 = new Timestamp(System.currentTimeMillis());  //2026-02-04 22:47:47.582
// 通过 Date 转换
Date date = new Date();
Timestamp timestamp2 = new Timestamp(date.getTime());              //2026-02-04 22:47:47.586
```
如果你需要兼容旧 API（比如 JDBC），可以用 `java.sql.Timestamp`：
## 2. Instant vs ZonedDateTime
从表面上看， _Instant 类_ 和 [ZonedDateTime](https://howtodoinjava.com/java/date-time/zoneddatetime-class/) 类似乎很相似，但实际上并非如此。
- `Instant` 是 UTC时间的一个时间点。
- `ZonedDateTime` 是一个**特定时区**的实际时间点。
![Instant vs ZonedDateTime](http://img.geekyspace.cn/pictures/2025/202602050030344.png)
[【howtodoinjava】- 了解 java.time.ZonedDateTime](https://howtodoinjava.com/java/date-time/zoneddatetime-class/)









