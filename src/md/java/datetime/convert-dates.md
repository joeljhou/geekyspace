---
title: 转换日期时间实例
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-02-09
category: Java Dates
tags:
  - date-time
---
# 转换日期时间实例

本文总结了 Java 中常见的日期时间类之间的转换方法，涵盖了 Java 8 引入的 `java.time` 包中的类（如 `LocalDate`, `LocalDateTime`, `ZonedDateTime`）以及旧版的 `java.util.Date` 和 `java.sql.Date` 等。

* [🐟代码小抄-Java日期转换工具类](https://codecopy.cn/post/q7kdjf)

## 1. LocalDateTime 与 ZonedDateTime 互转

`LocalDateTime` 表示不带时区的日期时间，而 `ZonedDateTime` 是带有时区的日期时间（`LocalDateTime` + `ZoneId`）。

### LocalDateTime -> ZonedDateTime

要将 `LocalDateTime` 转换为 `ZonedDateTime`，必须添加时区信息（Zone Offset）。

```java
LocalDateTime ldt = LocalDateTime.now(); // 本地日期时间

// 添加时区信息
ZoneId zoneId = ZoneId.of("Asia/Shanghai");
ZonedDateTime zdtAtAsia = ldt.atZone(zoneId); 

// 转换到另一个时区（保持时间瞬间一致）
ZonedDateTime zdtAtET = zdtAtAsia.withZoneSameInstant(ZoneId.of("America/New_York"));
```

### ZonedDateTime -> LocalDateTime

直接使用 `toLocalDateTime()` 方法，这将丢弃时区信息。

```java
ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("America/New_York"));
LocalDateTime ldt = zdt.toLocalDateTime();
```

## 2. LocalDate 与 ZonedDateTime 互转

`LocalDate` 仅包含日期信息，转换为 `ZonedDateTime` 需要补充时间和时区。

### LocalDate -> ZonedDateTime

**方法一：使用 `atStartOfDay`（默认时间为 00:00）**

```java
LocalDate localDate = LocalDate.now();
// 默认当天开始时间 (00:00) + 指定时区
ZonedDateTime zdt = localDate.atStartOfDay(ZoneId.of("America/New_York"));
```

**方法二：先转 LocalDateTime 再转 ZonedDateTime**

```java
LocalDate localDate = LocalDate.now();
// 指定具体时间
LocalDateTime localDateTime = localDate.atTime(14, 30, 0);
// 添加时区
ZonedDateTime zdt = localDateTime.atZone(ZoneId.of("Asia/Shanghai"));
```

### ZonedDateTime -> LocalDate

直接使用 `toLocalDate()`。

```java
ZonedDateTime zdt = ZonedDateTime.now();
LocalDate localDate = zdt.toLocalDate();
```

## 3. LocalDate 与 LocalDateTime 互转

`LocalDateTime` = `LocalDate` + `LocalTime`。

### LocalDate -> LocalDateTime

需要补充时间部分。

```java
LocalDate date = LocalDate.now();
// 1. 当天开始时间 (00:00)
LocalDateTime startOfDay = date.atStartOfDay();
// 2. 当前时间
LocalDateTime withCurrentTime = date.atTime(LocalTime.now());
// 3. 指定时间
LocalDateTime specificTime = date.atTime(14, 30, 0);
```

### LocalDateTime -> LocalDate

直接使用 `toLocalDate()`。

```java
LocalDateTime dateTime = LocalDateTime.now();
LocalDate date = dateTime.toLocalDate();
```

## 4. LocalDate 与 java.sql.Date 互转

`java.sql.Date` 是旧版 JDBC API 使用的类，仅包含日期部分（时间设为 00:00:00）。

### java.sql.Date -> LocalDate

```java
java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());
LocalDate localDate = sqlDate.toLocalDate();
```

### LocalDate -> java.sql.Date

```java
LocalDate localDate = LocalDate.now();
java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
```

## 5. LocalTime 与 java.sql.Time 互转

### LocalTime -> java.sql.Time

注意：`java.sql.Time` 不包含纳秒精度。

```java
LocalTime localTime = LocalTime.now();
java.sql.Time sqlTime = java.sql.Time.valueOf(localTime);
```

### java.sql.Time -> LocalTime

```java
java.sql.Time sqlTime = new java.sql.Time(System.currentTimeMillis());
LocalTime localTime = sqlTime.toLocalTime();
```

## 6. LocalDate 与 java.util.Date 互转

`java.util.Date` 包含日期和时间，且基于 Epoch 毫秒数。转换时通常需要借助 `Instant` 和系统默认时区。

### java.util.Date -> LocalDate

```java
Date date = new Date();
LocalDate localDate = Instant.ofEpochMilli(date.getTime())
                             .atZone(ZoneId.systemDefault())
                             .toLocalDate();
```

### LocalDate -> java.util.Date

需要先转为当天开始时间的 `ZonedDateTime` 或 `Instant`。

```java
LocalDate localDate = LocalDate.now();
Date date = Date.from(localDate.atStartOfDay()
                               .atZone(ZoneId.systemDefault())
                               .toInstant());
```

## 7. LocalDateTime 与 java.util.Date 互转

### java.util.Date -> LocalDateTime

```java
Date date = new Date();
LocalDateTime ldt = Instant.ofEpochMilli(date.getTime())
                           .atZone(ZoneId.systemDefault())
                           .toLocalDateTime();
```

### LocalDateTime -> java.util.Date

```java
LocalDateTime ldt = LocalDateTime.now();
Date date = Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());
```

## 8. 时区转换与 EST/EDT 处理

### ZonedDateTime 时区转换


使用 `withZoneSameInstant` 方法将同一时刻转换为另一时区的表达。

```java
ZonedDateTime now = ZonedDateTime.now(); // 当前时区
ZonedDateTime utc = now.withZoneSameInstant(ZoneId.of("UTC"));
ZonedDateTime ny = now.withZoneSameInstant(ZoneId.of("America/New_York"));
```

### OffsetDateTime 时区转换

类似地，使用 `withOffsetSameInstant`。

```java
OffsetDateTime now = OffsetDateTime.now();
OffsetDateTime utc = now.withOffsetSameInstant(ZoneOffset.UTC);
```

### java.util.Date 时区格式化

java.util.Date 表示一个时间点（UTC），但在格式化时会根据默认时区进行展示。可以通过设置 `SimpleDateFormat` 的时区来控制输出。
- [如何设置java.util.Date的时间区域？ - Stack Overflow](https://stackoverflow.com/questions/2891361/how-to-set-time-zone-of-a-java-util-date/30403673#30403673).

```java
SimpleDateFormat FORMATTER = new SimpleDateFormat("MM/dd/yyyy 'at' hh:mma z");
Date currentDate = new Date();

// 默认系统时区（东八区）
System.out.println(FORMATTER.format(currentDate));  //02/12/2026 at 02:08上午 CST

// 指定 UTC 时区
FORMATTER.setTimeZone(TimeZone.getTimeZone("UTC"));
System.out.println(FORMATTER.format(currentDate));  //02/11/2026 at 06:08下午 UTC
```

### EST, EDT 与 "America/New_York"

*   **EST**: Eastern Standard Time (UTC-5)，不包含夏令时。
*   **EDT**: Eastern Daylight Time (UTC-4)，夏令时。
*   **EST5EDT**: 自动切换 EST 和 EDT。
*   **America/New_York**: 推荐使用，涵盖了 1966 年以后的所有规则，自动处理夏令时。

转换示例：

```java
// 将 ZonedDateTime 转换为 ET 时区
ZonedDateTime ist = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));
ZonedDateTime et = ist.withZoneSameInstant(ZoneId.of("America/New_York")); //推荐
```

## 9. Instant 与 LocalDateTime 互转

`Instant` 代表时间轴上的一个点（UTC）。

### Instant -> LocalDateTime

需要指定时区偏移。

```java
Instant instant = Instant.now();
LocalDateTime ldt = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
LocalDate ld = LocalDate.ofInstant(instant, ZoneOffset.systemDefault());
LocalTime lt = LocalTime.ofInstant(instant, ZoneOffset.systemDefault());

// 或者
LocalDateTime ldt2 = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
LocalDate ld2 = instant.atZone(ZoneOffset.systemDefault()).toLocalDate();
LocalTime lt2 = instant.atZone(ZoneOffset.systemDefault()).toLocalTime();
```

### LocalDateTime -> Instant

需要指定时区偏移。

```java
LocalDateTime ldt = LocalDateTime.now();
Instant instant = ldt.atZone(ZoneId.systemDefault()).toInstant();
```