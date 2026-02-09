---
title: 获取两个日期之间的时间差
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-02-05
category: Java Dates
tags:
  - date-time
---
# 获取两个日期之间的时间差

## 1. Java 8 推荐
传统的 Java 类一直缺乏足够的支持来有效地表达日期和时间段。Java 8 首次尝试升级此日期/时间 API。

### 1.1 ChronoUnit

**用于计算所有时间单位之间的差值**
- 获取两个日期或时间之间的绝对差值（按**单位**），适用所有`Temporal`类型（如 `LocalDate`,`LocalDateTime`,`ZonedDateTime` 等）。

```java
// 日期级单位（仅依赖日期）
long years  = ChronoUnit.YEARS.between(startDate, endDate);
long months = ChronoUnit.MONTHS.between(startDate, endDate);
long days   = ChronoUnit.DAYS.between(startDate, endDate);
// 时间级单位（需包含时间部分，如 LocalDateTime）
long hours   = ChronoUnit.HOURS.between(startDateTime, endDateTime);
long minutes = ChronoUnit.MINUTES.between(startDateTime, endDateTime);
long seconds = ChronoUnit.SECONDS.between(startDateTime, endDateTime);
long millis  = ChronoUnit.MILLIS.between(startDateTime, endDateTime);
long micros  = ChronoUnit.MICROS.between(startDateTime, endDateTime);
long nanos   = ChronoUnit.NANOS.between(startDateTime, endDateTime);
```

### 1.2 Period-日期段
**用于计算天数、月数和年数的差值**

```java
// 包含开始日期，不包含结束日期
Period diff = Period.between(startDate, endDate);

int years  = diff.getYears();   // 完整年数
int months = diff.getMonths();  // 剩余月数
int days   = diff.getDays();    // 剩余天数

// ⚠️ 仅为近似值，不推荐用于精确计算
int totalDays = years * 365 + months * 30 + days;
```

⚠️ 注意事项
- `Period` 以 “x 年 y 月 z 日” 的形式表示时间差 
- `getDays()` 返回的是剩余天数，并非两个日期之间的总天数 
- 结果可能为负值（当结束日期早于开始日期）

### 1.3 Duration-时间段

**计算基于时间线的精确时间差**

**Duration**表示以小时、分钟、秒、纳秒等较小时间单位表示的时间差。


```java
Duration duration = Duration.between(dateTime, dateTime2);

long hours   = duration.toHours();        // 总小时数
long minutes = duration.toMinutes();      // 总分钟数
long seconds = duration.getSeconds();     // 总秒数
long millis  = duration.toMillis();       // 总毫秒数
long micros = duration.toNanos() / 1_000; // 总微秒数
int  nanos   = duration.getNano();        // 剩余纳秒（非总纳秒）
```

⚠️ 仅对包含时间部分的日期时间对象有效（如 `LocalDateTime`、`Instant`）。

## 2. Joda‑Time 库

对于Java8之前的旧项目，还可以用 [Joda‑Time](https://www.joda.org/joda-time/)。

![Joda‑Time 库特征](http://img.geekyspace.cn/pictures/2025/202602060038056.png)

由于我们都更喜欢可读性，我建议使用 Jodatime 库（它实际上启发了 Java 8 日期/时间 API）。

1. 导入依赖`joda-time`依赖
2. 演示代码
   
```java
DateTime dateOfBirth = new DateTime(1988, 7, 4, 0, 0, GregorianChronology.getInstance());
DateTime currentDate = new DateTime(); // 当前时间

Days diffInDays = Days.daysBetween(dateOfBirth, currentDate);                // 计算天数差
Hours diffInHours = Hours.hoursBetween(dateOfBirth, currentDate);            // 计算小时差
Minutes diffInMinutes = Minutes.minutesBetween(dateOfBirth, currentDate);    // 计算分钟差
Seconds diffInSeconds = Seconds.secondsBetween(dateOfBirth, currentDate);    // 计算秒数差
```

## 3. Legacy API 方法（不推荐）
为了便于参考，我们来看一个使用 `java.util.Date` 和 `TimeUnit` 类查找日期差的示例。
```java
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class DateDifference {
    public static void main(final String[] args) {
        // 第一个日期：今天
        Date today = new Date();

        // 第二个日期：下个月同一天
        Date sameDayNextMonth = new Date();
        sameDayNextMonth.setMonth(today.getMonth() + 1); // 注意：月份从0开始

        // 计算两个日期的时间差
        long days = getDateDiff(today, sameDayNextMonth, TimeUnit.DAYS);
        long hours = getDateDiff(today, sameDayNextMonth, TimeUnit.HOURS);
        long minutes = getDateDiff(today, sameDayNextMonth, TimeUnit.MINUTES);
        long seconds = getDateDiff(today, sameDayNextMonth, TimeUnit.SECONDS);
        long mills = getDateDiff(today, sameDayNextMonth, TimeUnit.MILLISECONDS);
    }

    /**
     * 计算两个日期之间的差值，并以指定的时间单位返回
     *
     * @param date1 起始日期
     * @param date2 结束日期
     * @param timeUnit 返回的时间单位（天、小时、分钟等）
     * @return 两个日期之间的差值
     */
    public static long getDateDiff(final Date date1, final Date date2,
                                   final TimeUnit timeUnit) {
        long diffInMillies = date2.getTime() - date1.getTime(); // 毫秒差

        // 将毫秒差转换成指定时间单位
        return timeUnit.convert(diffInMillies, TimeUnit.MILLISECONDS);
    }
}
```
  

