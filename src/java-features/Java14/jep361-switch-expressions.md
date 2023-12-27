---
title: Java 14 新特性：switch表达式增强
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2023-12-26
category: Java
tag:
  - Java
  - Java 14
order: 361
---

# Java 14 新特性：switch表达式增强

Java 14（JEP 361）引入了 switch 表达式的新特性，其中包括了 "箭头标签（`case ... ->`）" 和 `yield` 语句的增强，
同时支持 `Lambda` 语法，使得代码更加灵活、简洁，并为未来的**模式匹配**（JEP 305）特性做好了准备。

## 传统的switch语句

首先，让我们回顾一下传统的switch语句，它们在处理多个条件时可能显得有些冗长：

```java
switch (day) {
    case MONDAY:
    case FRIDAY:
    case SUNDAY:
        System.out.println(6);
        break;
    case TUESDAY:
        System.out.println(7);
        break;
    case THURSDAY:
    case SATURDAY:
        System.out.println(8);
        break;
    case WEDNESDAY:
        System.out.println(9);
        break;
}
```

传统的 switch 语句存在以下问题：

1. 设计受到C和C++等低级语言的影响，且默认支持fall through语义
2. 过多的`break`语句使得代码显得冗长

## switch表达式增强

### 箭头标签（case L ->）

1. 引入了一种新的开关标签"`case L ->`"，用于表示只有一个分支的情况
2. 允许每种情况下有多个常量，用逗号分隔
3. 标签右侧的代码仅限于表达式、块或抛出异常throw语句

```java
switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> System.out.println(6);
    case TUESDAY                -> System.out.println(7);
    case THURSDAY, SATURDAY     -> System.out.println(8);
    case WEDNESDAY              -> System.out.println(9);
}
```

### 局部变量独立作用域

在 Java 14 中，允许在每个分支中声明局部变量，避免块中变量命名冲突和误用。

```
switch (day) {
    case MONDAY:
    case TUESDAY:
        int temp = ...     // 'temp'的作用域延续到 }
        break;
    case WEDNESDAY:
    case THURSDAY:
        int temp2 = ...    // 不能将此变量命名为'temp'
        break;
    default:
        int temp3 = ...    // 不能将此变量命名为'temp'
}
```

### switch表达式

Switch 表达式被引入，允许将 `switch` 语句用作表达式，通过 `Lambda` 语法，根据输入值返回不同的结果。

```java
// 根据输入值`k`的不同，返回不同的字符串，并通过`System.out.println`打印结果
static void howMany(int k) {
    System.out.println(
        switch (k) {
            case  1 -> "one";
            case  2 -> "two";
            default -> "many";
        }
    );
}
```

Switch表达式的常见形式如下：

```java
T result = switch (arg) {
    case L1 -> e1;
    case L2 -> e2;
    default -> e3;
};
```

> Switch表达式是多态表达式（poly expression）。
>
> 多态性是指在编译时不确定具体类型，而在运行时确定类型的特性。

### yield语句返回值

允许在switch表达式中使用`yield`语句，而不是使用`break`语句，用于返回一个值，结束switch表达式的执行。

```java
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    case THURSDAY, SATURDAY     -> 8;
    case WEDNESDAY -> {
        int temp = performComplexCalculation();  // 在这里进行一些复杂的计算
        yield temp;                              // 使用yield返回计算结果
    }
};
```

## 发展脉络

追溯JEP 361的发展历程：从JDK 12预览版(JEP 325)到JDK 13预览版(JEP 354)，
虽然部分功能在早期版本中已经出现，但建议在 JDK 14 及以后的版本中使用，以获得更好的稳定性和支持。
