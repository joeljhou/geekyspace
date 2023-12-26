---
title: Java 9 新特性：不可变集合的快捷创建方法
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2023-12-25
category: Java
tag:
  - Java
  - Java 9
order: 266
---

# Java 9 新特性：不可变集合的快捷创建方法

Java 9引入了一项令人期待的新特性，即“Convenience Factory Methods for Collections”（集合的便利工厂方法），旨在使不可变集合的创建更加简单和便捷。
在此之前，我们通常使用构造方法来初始化集合，而Java 9为我们提供了一些全新的静态工厂方法，使得创建不可变集合的过程更为优雅。

## Java 9的集合创建方式

Java 9引入了一些便利的工厂方法，使得创建和初始化集合对象变得更加简洁和方便。
这些改进包括List.of()、Set.of()和Map.of()等方法，用于创建不可变的集合对象。

```java
// 创建不可变列表
List<String> immutableList = List.of("item1", "item2", "item3");

// 创建不可变集合
Set<String> immutableSet = Set.of("item1", "item2", "item3");

// 创建不可变映射
Map<String, Integer> immutableMap = Map.of("a", 1, "b", 2, "c", 3);
```

这样一行代码就完成了整个集合的创建和初始化过程，使得代码更加简洁、清晰，并且具有更高的可读性。

## Java 8的集合创建方式

Java 8引入了Lambda表达式和流式操作，这使得集合的初始化过程变得更加流畅和具有函数式编程的特性。

```java
// 创建不可变列表
List<String> immutableList = Collections.unmodifiableList(
        Stream.of("item1", "item2", "item3").collect(Collectors.toList())
);

// 创建不可变集合
Set<String> immutableSet = Collections.unmodifiableSet(
        Stream.of("item1", "item2", "item3").collect(Collectors.toSet())
);

// 创建不可变映射
Map<String, Integer> immutableMap = Collections.unmodifiableMap(
        Stream.of(new String[][]{{"a", "1"}, {"b", "2"}, {"c", "3"}})
              .collect(Collectors.toMap(data -> data[0], data -> Integer.parseInt(data[1])))
);
```

虽然相较于传统方式，Java 8的写法更为紧凑，但仍显得略显繁琐。

## 传统的集合创建方式

```java
// 创建不可变列表
List<String> traditionalList = new ArrayList<>();
traditionalList.add("item1");
traditionalList.add("item2");
traditionalList.add("item3");
traditionalList = Collections.unmodifiableList(traditionalList);

// 创建不可变集合
Set<String> traditionalSet = new HashSet<>();
traditionalSet.add("item1");
traditionalSet.add("item2");
traditionalSet.add("item3");
traditionalSet = Collections.unmodifiableSet(traditionalSet);

// 创建不可变映射
Map<String, Integer> traditionalMap = new HashMap<>();
traditionalMap.put("a", 1);
traditionalMap.put("b", 2);
traditionalMap.put("c", 3);
traditionalMap = Collections.unmodifiableMap(traditionalMap);
```

这种方式繁琐且不够直观，给代码的可读性和编写效率带来了一定的挑战。

## List.of() vs. Arrays.asList()

* **可变性：**`List.of` 创建的是不可变集合，`Arrays.asList` 是可变集合

  ```java
  // List.of 创建建的列表是不可变的
  List<Integer> immutableList = List.of(1, 2, 3);
  // 无法添加、删除或修改元素，以下操作会导致 UnsupportedOperationException
  immutableList.add(4);
  immutableList.set(0, 0);
  
  // Arrays.asList()  创建的列表是可变的
  List<Integer> mutableList = Arrays.asList(1, 2, 3);
  // 可以使用 add()、set() 方法修改元素，但不允许改变列表的大小
  mutableList.add(4);
  mutableList.set(0, 0);
  ```

* **null元素：**`List.of` 不允许包含 null 元素，`Arrays.asList` 允许包含 null 元素，但不推荐

  ```java
  List<Integer> listWithNull = Arrays.asList(1, null, 3);
  ```

* **底层数据结构：**`List.of `使用不可变数据结构，`Arrays.asList`底层使用数组，对列表修改将反映在原始数组上

  ```java
  List<Integer> immutableList = List.of(1, 2, 3);
  List<Integer> mutableList = Arrays.asList(1, 2, 3);
  ```
