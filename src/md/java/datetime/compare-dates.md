---
title: 比较两个日期
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-02-06
category: Java Dates
tags:
  - date-time
---
# 比较两个日期
> 此文参考文献：
> 
> - [【howtodoinjava】- 用 Java 比较两个日期](https://howtodoinjava.com/java/date-time/compare-dates/)
> 	- [比较 LocalDate](https://howtodoinjava.com/java/date-time/compare-localdates/)  
> 	- [比较 LocalDateTime](https://howtodoinjava.com/java/date-time/compare-localdatetime/) 
> 	- [比较 ZonedDateTime](https://howtodoinjava.com/java/date-time/zoneddatetime-comparison/)

| 方法 / API                       | 支持类 / 类型                                                                                                                                                                                                                                                                                        | Java 版本   | 说明                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------- |
| `isBefore / isAfter / isEqual` | [LocalDate](https://howtodoinjava.com/java/date-time/java-time-localdate-class/), [LocalTime](https://howtodoinjava.com/java/date-time/java-localdatetime-class/), [LocalDateTime](https://howtodoinjava.com/java/date-time/zoneddatetime-class/), `ZonedDateTime`, `OffsetDateTime`, `Instant` | Java 8+   | 判断先后或相等，语义清晰、线程安全 |
| `compareTo`                    | `LocalDate`, `LocalTime`, `LocalDateTime`, `ZonedDateTime`, `OffsetDateTime`, `Instant`, `java.util.Date`                                                                                                                                                                                       | 通用        | 排序或比较大小           |
| `before / after`               | [java.util.Date](https://howtodoinjava.com/java/date-time/java-date-examples/), `java.util.Calendar`                                                                                                                                                                                            | Java 7 以前 | 判断早于或晚于           |
| `equals`                       | `java.util.Date`, `java.util.Calendar`                                                                                                                                                                                                                                                          | 通用        | 判断相等              |
| `getTime / getTimeInMillis`    | `java.util.Date`, `java.util.Calendar`                                                                                                                                                                                                                                                          | Java 7 以前 | 获取毫秒时间戳，可直接比较大小   |

**Date 日期比较**
```java
import java.util.Calendar;
import java.util.Date;

public class CompareDatePartOnly {
    public static void main(String[] args) {
        Date date1 = new Date();
        Date date2 = new Date(date1.getTime() + 24 * 60 * 60 * 1000); // 次日

        int diff = compareDatePartOnly(date1, date2);
        if (diff > 0) {
            System.out.println(date1 + " 大于 " + date2);
        } else if (diff < 0) {
            System.out.println(date1 + " 小于 " + date2);
        } else {
            System.out.println(date1 + " 等于 " + date2);
        }
    }

    private static int compareDatePartOnly(final Date date1, final Date date2) {
        Calendar cal1 = Calendar.getInstance();
        Calendar cal2 = Calendar.getInstance();

        cal1.setTime(date1);
        cal2.setTime(date2);

        int result = cal1.get(Calendar.YEAR) - cal2.get(Calendar.YEAR);
        if (result == 0) {
            result = cal1.get(Calendar.DAY_OF_YEAR) - cal2.get(Calendar.DAY_OF_YEAR);
        }
        return result;
    }
}
```