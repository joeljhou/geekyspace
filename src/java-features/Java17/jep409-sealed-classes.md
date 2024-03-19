---
title: Java 17 新特性：sealed类
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2023-12-31
category: Java
tag:
  - Java
  - Java 17
order: 409
---

# Java 17 新特性：sealed类

Java 17 中引入了**密封类**（Sealed Classes），它是一种限制的类和接口，
可以控制哪些类继承或实现它，保证在编译时就能够确定类的继承关系，提高代码的可读性和可维护性。

## 密封类语法

密封类的声明使用关键字 `sealed`，并通过 `permits` 关键字声明允许继承或实现的类。

```java
// 密封类
public abstract sealed class 类名 extends 父类名 permits 子类名1, 子类名2, ... {
  // 类的成员
}

// 密封接口
public sealed interface 接口名 extends 父接口名 permits 子类名1, 子类名2, ... {
  // 接口的成员
}
```

密封类对其允许的子类施加了三个约束：

1. 密封类及其允许的子类必须属于同一个模块或同一包（对于未命名模块）
2. 每个允许的子类必须直接扩展密封类
3. 每个允许的子类必须使用修饰符描述其继承关系：
    * `final`：表示该类不能被继承（记录类隐式声明为 `final`）
    * `sealed`：表示该类可以被继承，但只能被允许的子类继承
    * `non-sealed`：表示该类可以被继承，且可以被任意类继承

## 历史限制继承手段

对于继承能力的限制，Java 语言已经提供了以下几种手段：

1. `final`修饰类，这样类就无法被继承了
2. 构造函数声明为`private`或`package-private`，则只能在同一类或同一包中创建该类的子类

## 发展脉络

该功能经历了2个预览版本（JDK 15中的JEP 360、JDK 16中的JEP 397），最终定稿于JDK 17中的JEP 409。
