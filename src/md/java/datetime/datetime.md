---
title: 获取当前日期和时间
shortTitle:
description: Java 提供了许多有用的方法来获取当前日期或当前时间，可以使用 `Date`、`Calendar` 以及 Java 8 Date/Time API 类中新引入的 `LocalDate`、`LocalDateTime` 和 `ZonedDateTime` 类。
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
# 获取当前日期和时间

介绍在 Java 中获取当前 **日期 / 时间 / 日期时间** 的不同方式，分 Java 8 及更高版本和旧版本来讲解。
- 对于 JDK 8 或更高版本，推荐使用 [LocalDate](https://www.runoob.com/java/java-localdate-class.html) 和 [LocalTime](https://www.runoob.com/java/java-localtime-class.html) 类。
- 对于 JDK 7 或更早版本，我们只能使用 [Date](https://www.runoob.com/java/java-date-class.html) 和 [Calendar](https://www.runoob.com/java/java-calendar-class.html) 类。
## 1. Java 8 及以后（推荐方式）
### 1.1 核心 API（java.time 包）
- [java.time.LocalDate](https://howtodoinjava.com/java/date-time/java-time-localdate-class/) – **仅**表示 _yyyy-MM-dd_ 格式的日期信息。
- [java.time.LocalTime](https://howtodoinjava.com/java/date-time/java-localtime/) – 表示 _HH:mm:ss.SSSSSSSS_ 格式的时间信息 。
- [java.time.LocalDateTime](https://howtodoinjava.com/java/date-time/java-localdatetime-class/) – 表示**日期和时间信息，不包含任何时区信息** 。其模式是本地日期和时间信息的组合。

要获取**其他时区/语言环境下的当前日期和时间信息** ，我们可以使用以下类。
- [java.time.ZonedDateTime](https://howtodoinjava.com/java/date-time/zoneddatetime-class/) – 表示**给定时区的日期和时间信息** 。
### 1.2 示例代码
```java
LocalDate today = LocalDate.now();          //2026-02-04
LocalTime currentTime = LocalTime.now();    //13:05:55.540946
LocalDateTime now = LocalDateTime.now();    //2026-02-04T13:05:55.540982
```
若需要带时区：
```java
ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("GMT"));  //2026-02-04T05:06:28.188180Z[GMT]
```
默认的 `now()` 返回当前系统时区的日期/时间。
### 1.3 自定义格式化输出
如果希望控制显示格式（比如 `dd‑MM‑yyyy hh:mm`），可以用 **DateTimeFormatter**：
```java
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm");
String formatted = fmt.format(LocalDateTime.now());  // 04-02-2026 01:06
```
这样可以输出自定义样式的字符串。
## 2. 旧版 Java（JDK 7 及更早）
在 Java 8 之前，没有 `java.time` 包，需要用旧类：
- **java.util.Date**
- **java.util.Calendar**
### 2.1 代码示例
```java
Date date = new Date();                  //Wed Feb 04 13:07:38 CST 2026
Calendar cal = Calendar.getInstance();   //Wed Feb 04 13:08:13 CST 2026
```
### 2.2 自定义格式化输出
并通过 **SimpleDateFormat** 做格式化输出。
```java
SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy hh:mm");  
System.out.println(sdf.format(date));           //04-02-2026 01:10  
System.out.println(sdf.format(cal.getTime()));  //04-02-2026 01:10
```
⚠️ 这种方式的类设计较旧且非线程安全，因此不推荐在新代码中使用。