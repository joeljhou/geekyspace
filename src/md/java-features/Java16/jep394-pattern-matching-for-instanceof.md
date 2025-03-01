---
title: Java 16 新特性：instanceof 模式匹配
description:
author: 流浪码客
isOriginal: true
date: 2023-12-28
category: Java
tag: Java Features
order: 394
---

# Java 16 新特性：instanceof 模式匹配

Java 16 引入了`instanceof`**模式匹配**的增强语法，用于更简便地判断对象是否是某个类的实例并进行相应的**局部类型转换**。

## instanceof 基础用法

```java
if (obj instanceof String) {
    String someString = (String) obj;  // 强制类型转换
    // ... 
}
```

这个**强制转换**通常是在 `instanceof` 检查之后 的第一件事，所以为什么不围绕它优化一下语法呢？

## instanceof 增强用法

```java
if (obj instanceof String someString) {
    // ...
}
// 这里 someString 超出了作用域
```

1. 若 `instanceof` 检查成功，将自动将变量转换为指定类型
2. 定义的变量实质上是一个**局部变量**，只在if语句的范围内可见

## 常见用法建议

不仅如此！使用模式匹配，我们可以更灵活地应用条件测试。

* 利用已定义的 obj，在不需要额外嵌套的情况下判断字符串是否以“Awesome”开头

  ```java
  // 以前
  return (someObject instanceof String) && ((String) someObject).startsWith("Awesome");
  
  // 现在
  return someObject instanceof String someString && someString.startsWith("Awesome");
  ```

* 甚至在 equals 方法中，代码会更加简洁

  ```java
  // 以前
  public boolean equals(Object obj) {
      if (obj instanceof Integer) {
          return value == ((Integer) obj).intValue();
      }
      return false;
  }
  
  // 现在
  public boolean equals(Object obj) {
      return (obj instanceof Integer i) && value == i.intValue();
  }
  ```

多么不同！现在代码简洁而直观。

## 发展脉络

该功能经历了2个预览版本（JDK 14中的JEP 305、JDK 15中的JEP 375），最终定稿于JDK 16中的JEP 394。
