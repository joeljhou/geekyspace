---
title: Java 日期时间 API
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
# Java 日期时间 API

> 此文参考文献：
> 
> * [【菜鸟教程】-Java 日期时间](https://www.runoob.com/java/java-date-time.html)
> * [【howtodoinjava】- Java 8 日期时间 API](https://howtodoinjava.com/java/date-time/intro-to-date-time-api/)

Java 主要使用两个包`java.time`和`java.util`支持日期和时间特性。 `java.time`包是在 Java 8 [JSR-310](https://jcp.org/en/jsr/detail?id=310) 中新增的，解决了旧版
`java.util.Date`和`java.util.Calendar`类的不足之处。

## 遗留 API

Java 8 之前的日期时间处理主要依赖 `Date`、`Calendar`、`SimpleDateFormat` 和 `TimeZone` 等遗留 API，本质上围绕**毫秒时间戳**进行封装、计算、格式化及时区转换。

| 类/方法                                                                                                                    | 用途                                |
|-------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [System.currentTimeMillis()](https://docs.oracle.com/javase/7/docs/api/java/lang/System.html#currentTimeMillis%5C(%5C)) | 获取当前时间的 **毫秒时间戳**                 |
| [java.util.Date](https://docs.oracle.com/javase/7/docs/api/java/util/Date.html)                                         | 对时间戳进行封装，表示一个具体的 **时间点**          |
| [java.util.Calendar](https://docs.oracle.com/javase/7/docs/api/java/util/Calendar.html)                                 | 提供按 **年、月、日、时、分、秒** 等字段进行计算和操作的能力 |
| [java.text.SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html)                 | 负责 **日期与字符串之间的格式化与解析**，受时区和区域设置影响 |
| [java.util.TimeZone](https://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html)                                 | 表示 **时区偏移量**，可计算夏令时               |

**核心缺陷**：

旧的日期时间 API 既易出错又不直观，难以安全、清晰地表示日期与时间。

1. _可变性_：`Date` 和 `Calendar` 类是可变的，这可能导致意外的副作用和**线程安全问题**。
2. _设计缺陷_：月份从 0 开始计数，年份从 1900 开始计数，这可能导致混淆。
3. _有限的功能_：这些类缺乏对日期和时间操作的丰富支持，例如处理时区、闰秒等。

因此，其他许多第三方库（例如 [Joda-Time](https://www.joda.org/joda-time/) 或 [Apache Commons](https://commons.apache.org/)  中的类）也更加受欢迎。

## Java 8 Time API

新的日期 API 尝试解决旧类的上述问题。 它主要包含以下类：

| 类/接口                                                                                                                    | 用途                           |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [java.time.LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html)                               | 不带时间的**日期**                  |
| [java.time.LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html)                               | 不带日期的**时间**                  |
| [java.time.Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html)                                   | 时间线上的一个**瞬间点**               |
| [java.time.LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html)                       | **日期和时间**                    |
| [java.time.ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html)                       | 包含**时区**的完整日期和时间             |
| [java.time.OffsetDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/OffsetDateTime.html)                     | 包含**UTC 偏移量**的完整日期和时间        |
| [java.time.Duration](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html)                                 | **时间量**，两个时间点之间的**时间段**      |
| [java.time.Period](https://docs.oracle.com/javase/8/docs/api/java/time/Period.html)                                     | **时间量**，两个日期之间的**日期段**       |
| [java.time.format.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) | **格式化解析器**                   |
| [java.time.ZoneId](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html)                                     | **时区标识符**（如 `Asia/Shanghai`） |
| [java.time.ZoneOffset](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneOffset.html)                             | **UTC 偏移量**（如 `+08:00`）      |
## 执行常见任务
[🐟代码小抄-Java 日期、时间常用API](https://codecopy.cn/post/suloc9)
```java
import java.time.*;  
import java.time.format.DateTimeFormatter;  
import java.time.temporal.ChronoUnit;  
  
/**  
 * Java8 日期时间API的通用操作  
 */  
public class Java8DateTimeCommonOperations {  
    public static void main(String[] args) throws InterruptedException {  
        // 获取当前日期和时间  
        // 所有日期时间类都有一个工厂方法 now() 这是在 Java 8 中获取当前日期和时间的首选方法。  
        LocalTime currentTime = LocalTime.now();  
        LocalDate currentDate = LocalDate.now();  
        LocalDateTime currentDateTime = LocalDateTime.now();  
        System.out.println("当前时间 (LocalTime): " + currentTime);  
        System.out.println("当前日期 (LocalDate): " + currentDate);  
        System.out.println("当前日期时间 (LocalDateTime): " + currentDateTime);  
  
        // 解析日期和时间  
        // 日期解析是借助 DateTimeFormatter 类和日期时间类中的 parse() 方法完成的。  
        String dateString = "2026-02-04 12:30";  
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");  
        LocalDateTime parsedDateTime = LocalDateTime.parse(dateString, formatter);  
        System.out.println("解析后的日期时间: " + parsedDateTime);  
  
        // 格式化日期和时间  
        // 日期格式化是借助 DateTimeFormatter 类和日期时间类中的 format() 方法完成的。  
        LocalDateTime myDateObj = LocalDateTime.now();  
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");  
        String formattedDate = myDateObj.format(myFormatObj);  
        System.out.println("格式化后的日期时间: " + formattedDate);  
  
        // 测量经过时间  
        // 要获取不同时间单位的执行时间，可以使用 java.time.Instant 和 java.time.Duration 类中的  
        // toDays() 、 toHours() 、 toMillis() 、 toMinutes() 、 toNanos() 和 getSeconds() 等方法。  
        Instant start = Instant.now();  
        Thread.sleep(1000);  // 休眠1s  
        Instant finish = Instant.now();  
        long timeElapsed = Duration.between(start, finish).toMillis();  
        System.out.println("执行时间（毫秒）: " + timeElapsed);  
  
        // 计算两个日期之间的天数  
        // 在 Java 8 中使用 ChronoUnit.DAYS.between() 和 LocalDate.until() 方法计算两个日期之间的天数 。  
        LocalDate date1 = LocalDate.now();  
        LocalDate date2 = date1.plusDays(99);  
        long diffInDays = ChronoUnit.DAYS.between(date1, date2);  
        System.out.println("两个日期之间的天数: " + diffInDays);  
    }  
}
```