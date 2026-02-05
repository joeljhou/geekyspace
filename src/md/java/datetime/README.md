---
title: Java 日期时间
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-02-03
category: Java Dates
tags:
  - date-time
---
# Java 日期时间
> 此文参考文献：[【howtodoinjava】-Java 日期时间教程](https://howtodoinjava.com/java/date-time/guides-java-date-time/)

长期以来，传统的 Java API 一直是 Java 开发人员的一大痛点。随着[Java 8](https://howtodoinjava.com/java-8-tutorial/)版本（[JSR-310](https://jcp.org/en/jsr/detail?id=310)
）的发布，`java.time`包引入了新的[不可变](https://howtodoinjava.com/java/basics/how-to-make-a-java-class-immutable/)类，解决了原有类存在的问题。

以下文章旨在帮助您开始使用[新的日期时间 API ](/md/java/date-time/intro-to-date-time-api)的一些常见任务。

## 获取当前日期和时间

- [获取当前日期和时间](/md/java/datetime/datetime)
- [获取当前时间戳](/md/java/datetime/timestamp)
- [获取当前用户区域设置、国际化](/md/java/datetime/locale)

## 比较日期和时间

- [日期比较](https://howtodoinjava.com/java/date-time/compare-dates/)
- [比较 LocalDate 实例](https://howtodoinjava.com/java/date-time/compare-localdates/)
- [比较 LocalDateTime 实例](https://howtodoinjava.com/java/date-time/compare-localdatetime/)
- [比较 ZonedDateTime 实例](https://howtodoinjava.com/java/date-time/zoneddatetime-comparison/)
- [ZonedDateTime 和 OffsetDateTime 的区别](https://howtodoinjava.com/java/date-time/zoneddatetime-vs-offsetdatetime/)

## 转换日期时间实例

- [在本地日期时间和分区日期时间之间进行转换](https://howtodoinjava.com/java/date-time/localdatetime-to-zoneddatetime/)
- [在本地日期和分区日期时间之间进行转换](https://howtodoinjava.com/java/date-time/localdate-zoneddatetime-conversion/)
- [在本地日期时间和本地日期之间进行转换](https://howtodoinjava.com/java/date-time/localdate-localdatetime-conversions/)
- [在 LocalDate 和 java.sql.Date 之间进行转换](https://howtodoinjava.com/java/date-time/localdate-to-sql-date/)
- [在本地时间 (LocalTime) 和 java.sql.Time 之间进行转换](https://howtodoinjava.com/java/date-time/localtime-to-sql-time/)
- [将 java.util.Date 转换为 LocalDate](https://howtodoinjava.com/java/date-time/localdate-to-date/)
- [将 java.util.Date 转换为 LocalDateTime](https://howtodoinjava.com/java/date-time/localdatetime-to-date/)
- [在不同时区之间转换日期和时间](https://howtodoinjava.com/java/date-time/convert-date-between-timezones/)
- [将日期转换为 EST/EDT 时区](https://howtodoinjava.com/java/date-time/convert-date-time-to-est-est5edt/)
- [将 Instant 转换为 LocalDateTime、LocalDate 或 LocalTime](https://howtodoinjava.com/java/date-time/convert-instant-to-local-date-time/)

## 将字符串解析为日期

- [Java 日期格式验证](https://howtodoinjava.com/java/date-time/date-validation/)
- [将字符串转换为 UTC 日期时间](https://howtodoinjava.com/java/date-time/parse-string-to-date-time-utc-gmt/)
- [将字符串转换为 ZonedDateTime](https://howtodoinjava.com/java/date-time/zoneddatetime-parse/)
- [将字符串转换为本地日期时间](https://howtodoinjava.com/java/date-time/localdatetime-parse/)
- [将字符串转换为本地日期](https://howtodoinjava.com/java/date-time/localdate-parse-string/)
- [将字符串解析为 java.util.Date](https://howtodoinjava.com/java/date-time/java-date-examples/)
- [Java 严格、智能和宽松的日期解析](https://howtodoinjava.com/java/date-time/resolverstyle-strict-date-parsing/)
- Spring Boot 日期格式验证注解（_待办事项_）
- 验证多种日期格式（_待办事项_）

## 将日期格式化为字符串

- [在 Java 中将日期格式化为字符串](https://howtodoinjava.com/java/date-time/java-date-formatting/)
- [格式化分区日期时间](https://howtodoinjava.com/java/date-time/format-zoneddatetime/)
- [格式化本地日期时间](https://howtodoinjava.com/java/date-time/format-localdatetime-to-string/)
- [格式化本地日期](https://howtodoinjava.com/java/date-time/localdate-format-example/)
- [格式 XMLGregorianCalendar](https://howtodoinjava.com/java/date-time/format-xmlgregoriancalendar-to-date-pattern/)
- [基于位置的货币格式](https://howtodoinjava.com/java/date-time/location-based-currency-formatting-in-java/)
- [基于位置的日期时间格式](https://howtodoinjava.com/java/date-time/locale-based-date-formatting/)
- [以用户时区显示本地化时间戳](https://howtodoinjava.com/java/date-time/display-localized-timestamps/)
- [以 12 小时制格式格式化日期/时间戳](https://howtodoinjava.com/java/date-time/format-time-12-hours-pattern/)
- [将毫秒级持续时间格式化为小时、分钟和秒](https://howtodoinjava.com/java/date-time/format-millis-to-hh-mm-ss/)

## 日期和时间提取与处理

- [测量经过时间](https://howtodoinjava.com/java/date-time/execution-elapsed-time/)
- [两个日期之间的差异](https://howtodoinjava.com/java/date-time/calculate-difference-between-two-dates-in-java/)
- [计算两个日期之间的天数](https://howtodoinjava.com/java/date-time/calculate-days-between-dates/)
- [获取两个日期之间的所有日期](https://howtodoinjava.com/java/date-time/dates-between-two-dates/)
- [检查日期或本地日期是否为周末。](https://howtodoinjava.com/java/date-time/check-weekend/)
- [计算两个日期之间的工作日](https://howtodoinjava.com/java/date-time/calculate-business-days/)
- [增加或减少工作日](https://howtodoinjava.com/java/date-time/add-subtract-business-days/)
- [获取下一个和上一个日期](https://howtodoinjava.com/java/date-time/java8-next-previous-date/)
- [请检查给定年份是否为闰年？](https://howtodoinjava.com/java/date-time/check-leap-year/)
- [增加或减少天数、月份和年份](https://howtodoinjava.com/java/date-time/add-days-months-years/)
- [增加或减少小时、分钟和秒](https://howtodoinjava.com/java/date-time/add-subtract-hours-minutes-seconds/)
- [从日期中获取年、月和日](https://howtodoinjava.com/java/date-time/get-year-month-day-from-date/)
- [确定约会的星期几](https://howtodoinjava.com/java/date-time/finding-day-of-week/)
- [用于匹配日期模式的正则表达式](https://howtodoinjava.com/java/regex/java-regex-date-format-validation/)
- [如何设置 JVM 时区](https://howtodoinjava.com/java/date-time/setting-jvm-timezone/)
- [一天的开始和结束](https://howtodoinjava.com/java/date-time/start-and-end-of-day/)

## 日期时间 API

- [Java 本地化类](https://howtodoinjava.com/java/date-time/java-locale-api-examples/)
- [Java 类 LocalTime](https://howtodoinjava.com/java/date-time/java-localtime/)
- [Java 类 LocalDate](https://howtodoinjava.com/java/date-time/java-time-localdate-class/)
- [Java 类 LocalDateTime](https://howtodoinjava.com/java/date-time/java-localdatetime-class/)
- [Java ZonedDateTime 类](https://howtodoinjava.com/java/date-time/zoneddatetime-class/)
- Java OffsetDateTime（_待办事项_）
- [Java XMLGregorianCalendar](https://howtodoinjava.com/java/date-time/xmlgregoriancalendar-date-string-example/)
- Java SimpleDateFormat (_TODO_)
- [Java DateTimeFormatter](https://howtodoinjava.com/java/date-time/java8-datetimeformatter-example/)
- [爪哇时期](https://howtodoinjava.com/java/date-time/java8-period/)
- Java 持续时间（_待办事项_）
- [Java 星期几](https://howtodoinjava.com/java/date-time/find-dayofweek/)
- [Java 时间调整器](https://howtodoinjava.com/java/date-time/java8-temporal-adjusters/)
- [Java TemporalQuery](https://howtodoinjava.com/java/date-time/temporalquery/)
- Java InstantSource（_待办事项_）

快乐学习！