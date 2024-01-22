---
title: Java 10 新特性：局部变量类型推断
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2023-12-23
category: Java
tag:
  - Java
  - Java 10
order: 286
---

# Java 10 新特性：局部变量类型推断

Java 10 引入了一项新的语言特性，即**局部变量类型推断**（Local-Variable Type Inference），
它允许在局部变量声明时，根据变量的初始值，推断出变量的数据类型。

## 语法

局部变量类型推断的语法非常简单，只需要将 `var` 关键字作为局部变量的类型即可。

```java
var list = new ArrayList<String>();  // 自动推断 ArrayList<String>
var stream = list.stream();          // 自动推断 Stream<String>
```

## 示例

相比传统的方式和 Java 7 的钻石操作符（Diamond Operator），Java 10 的局部变量类型推断使得代码更加精炼：

```java
// 传统方式（等号两边都需要）
List<String> list = new ArrayList<String>();

// Java7的钻石操作符（Diamond Operator）（只需要在左边申明类型即可）
List<String> list = new ArrayList<>();

// Java10的局部变量类型推断（类型在等号右边决定）
var list = new ArrayList<String>();
```

在使用 var 进行局部变量类型推断时，需要注意以下几点：
1. 必须在声明的同时进行初始化
2. 仅限于局部变量，不能用于定义成员变量、方法参数和返回类型
3. 每次只能定义一个变量，不能复合声明多个变量

通过使用局部变量类型推断，我们能够在不失代码可读性的前提下，减少了冗余的类型声明，使得代码更加简洁清晰。
这一特性尤其在Lambda表达式、集合初始化等场景下表现突出，提高了代码的书写效率。
在实际项目中，合理运用局部变量类型推断，将有助于代码的维护和阅读。
