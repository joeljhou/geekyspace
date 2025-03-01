---
title: Java 21 新特性：有序集合
description:
author: 流浪码客
isOriginal: true
date: 2024-01-07
category: Java
tag: Java Features
order: 431
---

# Java 21 新特性：有序集合（Sequenced Collections）

在JDK 21中，**有序集合**（Sequenced Collections）引入了新的接口和方法来简化集合处理。

> 此增强功能旨在解决访问Java中各种集合类型的第一个和最后一个元素需要非统一且麻烦处理场景

`Sequenced Collections` 引入如下 3 个新接口，用于处理顺序`List`、`Set`和`Map`，
并将它们整合到现有的集合类型中。这些新接口中的方法都具有默认实现。

1. SequencedCollection
2. SequencedSet
3. SequencedMap

## SequencedCollection

提供了在集合两端添加、检索和移除元素的方法，沿着`reversed()`方法提供了该集合的逆序视图。

```java
interface SequencedCollection<E> extends Collection<E> {
    // 新方法：返回反转后的序列化集合
    SequencedCollection<E> reversed();
    // 以下方法是从Deque提升的,支持在两端添加、获取和删除元素
    void addFirst(E);
    void addLast(E);
    E getFirst();
    E getLast();
    E removeFirst();
    E removeLast();
}
```

* 新的`reversed()`方法提供了原始集合的反向视图，对原始集合的任何修改都可以在视图中看到
* 如果允许，对视图的修改将写入原始集合
* 逆序视图使得不同的序列类型可以在两个方向上处理元素
    * 如：增强for循环、显式iterator()循环、forEach()、stream()、parallelStream() 和 toArray()

例如，从`LinkedHashSet`获得逆序流以前很难，现在很简单

```java
linkedHashSet.stream().sorted(Comparator.reverseOrder())  // 获取逆序流非常困难
linkedHashSet.reversed().stream()    // 现在：直接使用 reversed() 方法获取逆序流
```

> `reversed()` 方法本质上是 `NavigableSet::descendingSet`的重命名，并升级为 SequencedCollection

## SequencedSet

sequenced set 是一个不包含重复元素的 SequencedCollection，区别是`SequencedSet.reversed()`的返回类型是SequencedSet。

```java
interface SequencedSet<E> extends Set<E>, SequencedCollection<E> {
    // 重写父接口的 reversed() 方法
    SequencedSet<E> reversed();
}
```

**SortedSet**

* Java集合框架中`SortedSet`接口，表示一个有序集合
* 不能支持显式定位操作，因为是基于元素之间的相对比较来确定它们位置的，而不是基于顺序插入
* 如果尝试使用`addFirst(E)`或`addLast(E)`方法，会抛出`UnsupportedOperationException`异常

**SequencedSet**

* `SequencedSet`接口扩展了`SortedSet`
* 其中`addFirst(E)`和`addLast(E)` 方法对于集合（如`LinkedHashSet`）具有特殊情况语义：
    * 如果元素已经存在于集合中，则将其移动到适当的位置
    * 这弥补了LinkedHashSet中的一个长期缺陷，即无法重新定位元素

## SequencedMap

sequenced map 是一个映射，其键具有已定义的顺序，
它不实现SequencedCollection，而是提供了自己的方法，这些方法将访问顺序应用于映射条目，而不是单个元素。

```java
interface SequencedMap<K,V> extends Map<K,V> {
    // 新方法
    SequencedMap<K,V> reversed();                // 返回一个反转的映射
    SequencedSet<K> sequencedKeySet();           // 返回键的序列化集合
    SequencedCollection<V> sequencedValues();    // 返回值的序列化集合
    SequencedSet<Entry<K,V>> sequencedEntrySet();// 返回条目的序列化集合
    V putFirst(K key, V value);                  // 将键值对放在映射的第一个位置
    V putLast(K key, V value);                   // 将键值对放在映射的最后一个位置
    // 从 NavigableMap 提升的方法，支持在映射的两端获取和移除条目
    Entry<K, V> firstEntry();                    // 返回映射的第一个条目
    Entry<K, V> lastEntry();                     // 返回映射的最后一个条目
    Entry<K, V> pollFirstEntry();                // 移除并返回映射的第一个条目
    Entry<K, V> pollLastEntry();                 // 移除并返回映射的最后一个条目
}
```

新的`put*(K, V)`方法具有特殊的含义，类似于 SequencedSet 中对应的`add*(E)`方法：

* 对于 LinkedHashMap 映射，如果已存在相同键的条目，该方法将重新定位该条目
* 对于 SortedMap 映射，这些方法会抛出 `UnsupportedOperationException` 异常

## 改造

上述定义的三个新接口完美地适应了现有的集合类型层次结构（点击放大）：

![Sequenced-Collections](http://img.geekyspace.cn/pictures/2024/SequencedCollectionDiagram20220216.png)

具体而言，我们对现有的类和接口进行以下调整：

* List 现在将 SequencedCollection 定义为其直接超级接口
* Deque 现在将 SequencedCollection 定义为其直接超级接口
* LinkedHashSet 另外实现了 SequencedSet
* SortedSet 现在将 SequencedSet 定义为其直接超级接口
* LinkedHashMap 另外实现了 SequencedMap
* SortedMap 现在将 SequencedMap 定义为其直接超级接口

我们在适当的位置为`reversed()`方法定义协变覆盖。
例如: `List::reversed` 被覆盖为返回 List 类型的值，而不是 `SequencedCollection` 类型的值。

我们还向 Collections 实用类添加了新方法，用于创建三种新类型的不可修改包装：

* Collections.unmodifiableSequencedCollection(sequencedCollection)
* Collections.unmodifiableSequencedSet(sequencedSet)
* Collections.unmodifiableSequencedMap(sequencedMap)

## 第一个和最后一个元素的访问

引入顺序接口的动机是对获取集合的第一个和最后一个元素的简单方法的长期未决需求。

目前，在Java 21之前，JDK API调用访问第一个和最后一个元素的一些示例：

| 访问位置   | List                    | Deque            | SortedSet   |
|--------|-------------------------|------------------|-------------|
| 第一个元素  | list.get(0)             | deque.getFirst() | set.first() |
| 最后一个元素 | list.get(list.size()-1) | deque.getLast()  | set.last()  |

可以看到，一个简单的操作，在不同的集合中需要不同的编写方式，非常麻烦！
但在JDK 21之后，访问第一个和最后一个元素就方法多了：

对于`List`, `Deque`, `Set`这些有序的集合，访问方法变得统一起来：

* 第一个元素：`collection.getFirst()`
* 最后一个元素：`collection.getLast()`
