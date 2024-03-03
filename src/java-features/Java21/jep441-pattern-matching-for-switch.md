---
title: Java 21 新特性：switch模式匹配
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-01-10
category: Java
tag:
  - Java
  - Java21
order: 441
---

# Java 21 新特性：switch模式匹配

Java 21 引入了 switch 模式匹配功能，它增强了 switch 语句的功能，允许使用更简洁的语法来执行类型检查和数据提取。
该功能与[记录模式（JEP 440）](/java-features/Java21/jep440-record-partterns)共同发展，并与之有相当大的互动。


## switch + instanceof

与if条件中的`instanceof`一样，`switch case`现在可以对其值进行类型检查，并创建一个case作用域变量:

```java
static String asStringValue(Object anyValue) {
    return switch (anyValue) {
        case String str      -> str;
        case JSONObject json -> json.toCompactString();
        case BigDecimal bd   -> bd.toEngineeringString();
        case Integer i       -> Integer.toString(i);
        case LocalDate ld    -> ld.format(DateTimeFormatter.ISO_LOCAL_DATE);
        default              -> "n/a";
    };
}
```

## switch + null

```java
static String asStringValue(Object anyValue) {
    return switch (anyValue) {
        case null       -> "n/a";
        case String str -> str;
        ...
    };
}
```

## switch + enum

```java
sealed interface CardClassification permits Suit, Tarot {}
public enum Suit implements CardClassification { CLUBS, DIAMONDS, HEARTS, SPADES }
final class Tarot implements CardClassification {}

static void exhaustiveSwitchWithBetterEnumSupport(CardClassification c) {
    switch (c) {
        case CLUBS -> System.out.println("梅花");
        case DIAMONDS -> System.out.println("方块");
        case HEARTS -> System.out.println("红桃");
        case SPADES -> System.out.println("黑桃");
        case Tarot t -> System.out.println("塔罗牌");
        default -> System.out.println("未知的卡片类型");
    }
}
```

