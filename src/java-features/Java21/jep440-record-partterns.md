---
title: Java 21 新特性：记录模式（Record Patterns）
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-01-09
category: Java
tag:
  - Java
  - Java21
order: 440
---

# Java 21 新特性：记录模式（Record Patterns）

Java 21 中的**记录模式**（Record Patterns）是对模式匹配的扩展，它允许在模式匹配中使用**记录**（Records）类型。
同时，记录模式还支持嵌套，可以实现更复杂的数据查询和处理。

## 仅仅是类型匹配

到目前为止，Java中的模式匹配主要局限于匹配类型：[instanceof类型匹配](/java-features/Java16/jep394-pattern-matching-for-instanceof)

```java
// Java 16 之前
if (obj instanceof String) {
  String str = (String) obj;
  System.out.println(str);
}

// JAVA 16+
if (obj instanceof String str) {
  System.out.println(str);
}
```

Java
21扩展了这个概念，使其可用于switch语句和表达式: [switch的模式匹配](/java-features/Java21/jep441-pattern-matching-for-switch)

```java
// JAVA 21之前
static String asStringValue(Object anyValue) {
  String result = null;
  if (anyValue instanceof String str) {
    result = str;
  } else if (anyValue instanceof BigDecimal bd) {
    result = bd.toEngineeringString();
  } else if (anyValue instance Integer i) {
    result = Integer.toString(i);
  } else {
    result = "n/a";
  }
  return result;
}

// JAVA 21+
static String asStringValue(Object anyValue) {
  return switch (anyValue) {
    case String str    -> str;
    case BigDecimal bd -> bd.toEngineeringString();
    case Integer i     -> Integer.toString(i);
    default            -> "n/a";
  };
}
```

代码比之前更加简洁，同时也更加易读。但是，这种模式匹配仍然局限于类型匹配。

## record模式

当我们将模式匹配与记录类型结合使用时，我们称之为**记录模式**。这意味着我们可以在模式匹配中使用记录类型，以及记录类型的属性。

```java
record Point(int x, int y) {}

// Java 16 之前
static void printSum(Object obj) {
    if (obj instanceof Point p) {
        int x = p.x();
        int y = p.y();
        System.out.println(x+y);
    }
}

// JAVA 21+
static void printSum(Object obj) {
    if (obj instanceof Point(int x, int y)) {
        System.out.println(x+y);
    }
}
```

其中`Point(int x, int y)`就是记录模式，它匹配`Point`类型的对象，将记录的实例（obj）分解到它的组件（`x`和`y`）。

## 嵌套record的解构

假设我们设计了一个记录，表示一个矩形，其中包含左上角和右下角的颜色点。
如果我们想要获取左上角点的颜色，我们可以这样写：

```java
record Point(int x, int y) {}
enum Color { RED, GREEN, BLUE }
record ColoredPoint(Point p, Color c) {}
record Rectangle(ColoredPoint upperLeft, ColoredPoint lowerRight) {}

Rectangle r = new Rectangle(new ColoredPoint(new Point(x1, y1), c1), 
                            new ColoredPoint(new Point(x2, y2), c2));

// Java 16 之前
static void printUpperLeftColoredPoint(Rectangle r) {
    if (r instanceof Rectangle(ColoredPoint ul, ColoredPoint lr)) {
         System.out.println(ul.c());
    }
}

// JAVA 21+
static void printUpperLeftColoredPoint(Rectangle r) {
    if (r instanceof Rectangle(ColoredPoint(Point ul, Color c), ColoredPoint lr)) {
         System.out.println(c);
    }
}
```

嵌套模式允许我们使用与将其组合的代码一样清晰简洁的代码来拆解聚合。

## 发展脉络

该功能最初作为预览功能在Java 19（JEP 405）中首次亮相，随后经过Java 20（JEP 432）的迭代，最终在Java 21中定稿（JEP 440）。
此功能与模式匹配的switch语句（JEP 441）共同演进，并且它们之间存在相当大的互动。
