---
title: Java 21 新特性：分代ZGC
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-01-08
category: Java
tag: Java Features
order: 439
---

# Java 21 新特性：分代ZGC（Generational ZGC）

Java以其垃圾回收机制而闻名。这是它的主要优势之一，但也可能是许多头疼的根源。

* Java 11（[JEP 333](https://openjdk.org/jeps/333)）中引入了一个可扩展的低延迟垃圾收集器，称为ZGC
* Java 15（[JEP 377](https://openjdk.org/jeps/377)）中 ZGC 可用于生产
* 现在，随着Java 21的出现，它已经发展成为一种分代GC（[JEP 439](https://openjdk.org/jeps/439)）

## 垃圾收集（Garbage Collection）

在Java中，垃圾收集器负责释放堆内存，堆内存是存储Java对象的地方。
这有助于防止内存泄漏并确保有效的资源使用，否则，程序会抛出`OutOfMemoryError`异常。

“[垃圾收集](https://wiki.c2.com/?GarbageCollection)”的概念本质上是**自动内存管理**， 这可能导致如下潜在的错误：

1. 需要时间来清理和重新排列内存，引入了运行时开销，超出了程序员的控制。
2. GC运行的实际点通常是不确定的，对于高吞吐量内存消耗大的应用，可能会长时间的“**GC暂停**”
3. 讽刺的是，GC的非确定性也是它的优点之一，我们不必担心内存是何时或如何释放的，它将自动发生

有三种主要的自动内存管理技术：

1. 引用计数（[ReferenceCounting](https://wiki.c2.com/?ReferenceCounting)）
2. 标记和清除（[MarkAndSweep](https://wiki.c2.com/?MarkAndSweep)）
3. 复制（[StopAndCopy](https://wiki.c2.com/?StopAndCopy)）

## 不同语言如何管理内存

* **C/C++**：手动管理内存，程序员负责分配和释放内存
* **Objective-C 和 Swift**：引入了自动引用计数（ARC），但仍然需要手动释放内存
* **Rust**：使用[仿射类型系统](https://en.wikipedia.org/wiki/Substructural_type_system#Affine_type_systems)
  而不是GC，引入了所有权和借用，编译器在编译时检查内存安全性
* **Kotlin**：与Java类似，但引入了`Kotlin/Native`，允许手动内存管理
* **Java、[Python](https://devguide.python.org/internals/garbage-collector/)
  、Go、[C#](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals)
  、JavaScript**：自动内存管理，垃圾收集器负责释放内存

## HotSpot JVM垃圾收集器

内存管理有许多不同的方法，并且没有“最好”的方法。
即使在一种语言/运行时中，也可以有不止一种垃圾收集方法，JVM就是一个很好的例子。

与单一的GC不同，[HotSpot JVM](https://docs.oracle.com/en/java/javase/11/gctuning/available-collectors.html)有5个GC可供选择：

* Garbage-First Collector(G1)（Java 9后的默认选项）
* Serial Collector
* Parallel Collector
* ~~Concurrent Mark Sweep (CMS) Collector（Java 9中已弃用）~~
* Shenandoah GC（Java 12+）
* Z Garbage Collector（Java 15中可用于生产）

此外，不要忘记还有其他的JDK实现！

* [Eclipse OpenJ9](https://eclipse.dev/openj9/) 使用具有多个收集策略的分代并发GC
* [GraalVM](https://www.graalvm.org/latest/reference-manual/native-image/optimizations-and-performance/MemoryManagement/)
  有 Epsilon GC，它是一个 No-Op GC，完全不进行内存清理

## 如何选择JVM GC

许多语言只提供了一种垃圾收集方法，而Java之所以提供多种GC选项，取决于您的应用程序对于“全局停顿”事件和总体暂停时间的容忍程度。

GC算法主要关注三个指标：

1. **吞吐量**：应用程序的运行时间与GC时间的比率
2. **延迟**：GC暂停时间
3. **内存占用**：GC对堆内存的使用

与许多问题一样，您无法为所有这些问题进行优化，因此每个GC都需要在它们之间找到平衡点。以下是一些场景及其匹配的GC作为起点：

| 垃圾收集器       | 场景                                             |
|-------------|------------------------------------------------|
| Serial      | 小数据集 (最大~100 MB)<br />资源有限 (例如单核)<br />暂停时间短   |
| Parallel    | 多核系统上的峰值性能<br />非常适合高计算负载<br />暂停时间 > 1秒是可以接受的 |
| G1<br />CMS | 响应时间 > 吞吐量<br />堆内存较大<br />暂停时间 < 1秒           |
| Shenandoah  | 尽量减少暂停时间<br />可预测的延迟                           |
| ZGC         | 响应时间是高优先级的，和/或<br />非常大的堆内存                    |
| Epsilon GC  | 性能测试和故障排除                                      |

每种方法都有自己的优点和缺点，这在很大程度上取决于应用程序的需求和可用资源。

## 分代ZGC

Java 11引入的实验性功能**ZGC**是一种**非分代**的垃圾收集方法。
尽管如此，它在**GC暂停**时间方面仍然带来了显著改进，至少在资源足够的情况下，可以比并发线程消耗内存更快地回收内存。
缺点是，它将所有对象存储在一起，而不考虑年龄，因此每个周期都会收集所有对象。

[generational hypothesis](https://www.memorymanagement.org/glossary/g.html#generational.hypothesis)
观察到==年轻对象==比==年长对象==更有可能“**早逝**”，于是产生了分代假设。

Java 21 中，**分代 ZGC** 将堆分为两个逻辑代：一个用于最近分配的对象，另一个用于长期存活对象。
GC 可以专注于更频繁地收集**年轻**(最近分配)且更有**前途**(可能长期存在)的对象，而不会增加GC暂停时间，将其保持在 1 毫秒以下。

**分代ZGC**与非分代ZGC相比的关键优势：

* 减少分配停滞的风险
* 降低堆内存开销要求
* 减少垃圾回收CPU开销

此外，目标是在保留非分代方法已有优势的基础上实现这些优势：

* 暂停时间保持在在 1 毫秒以下
* 支持多达数万TB的堆大小
* 最少的手动配置

为了保持最后一点，新的GC不需要手动配置代的大小、GC使用的线程数，或对象在年轻代中停留的时间。

## 如何使用 JVM GC

在Java 21中，分代ZGC是默认的垃圾收集器。为了顺利过渡，分代ZGC将与非分代ZGC一起提供，您可以通过以下方式进行配置：

```shell
# 启用ZGC(默认为非分代)
$ java -XX:+UseZGC

# 使用分代ZGC
$ java -XX:+UseZGC -XX:+ZGenerational
```

如果您需要关闭分代ZGC，可以通过将加号（+）替换为减号（-）来实现：

```shell
# 不使用分代ZGC
$ java -XX:+UseZGC -XX:-ZGenerational
```

计划在更晚的版本中完全删除非分代ZGC。
