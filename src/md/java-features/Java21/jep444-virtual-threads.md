---
title: Java 21 新特性：虚拟线程
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2024-01-11
category: Java Features
tag:
  - java
order: 444
---

# Java 21 新特性：虚拟线程（Virtual Threads）

Java 21 引入了**虚拟线程**（Virtual Threads）功能，类似于Go语言中的`Goroutines`。
虚拟线程是一种轻量级的线程，它可以极大地减少了编写、维护和管理高吞吐量并发应用程序所需的工作量。

Java平台目前为止有两种类型的线程：**传统线程**，也称为==平台线程==，和**虚拟线程**。

## 平台线程

在引入虚拟线程之前，我们所使用的线程`java.lang.Thread`是由所谓的平台线程支持的。

这些线程通常是 1:1 映射到操作系统线程的，因此它们是重量级的，创建和销毁线程的开销很大。
且每个请求都需要一个独立的线程，这会导致线程资源的快速耗尽，从而限制了应用程序的可伸缩性。

### 创建平台线程

```java
Thread thread = new Thread(() -> {
  // 由平台线程执行的代码
}).start();
```

随着[Project Loom](https://openjdk.org/projects/loom/)简化了新的并发方法，它还提供了一种新的方法来创建平台支持的线程：

```java
Thread thread = Thread.ofPlatform()
                      .start(runnable);
                      
// 或者
Thread thread = Thread.ofPlatform().
                      .daemon()
                      .name("platform-thread")
                      .unstarted(runnable);
```

## 虚拟线程

虚拟线程是JDK提供的**轻量级线程**实现，可以在同一个OS线程上运行许多虚拟线程。
虚拟线程为平台线程提供了一种更有效的替代方案，允许开发人员以显著降低的开销处理大量任务。
这些线程提供了与现有Java代码的兼容性和无缝迁移路径，从而从增强的性能和资源利用率中获益。

许多语言中都有某种形式的轻量级线程：

* Go语言的[Goroutines](https://go.dev/tour/concurrency/1)
* Erlang的[Erlang Processes](https://www.erlang.org/docs/23/efficiency_guide/processes.html)
* Haskell的[Haskell Threads](https://wiki.haskell.org/Lightweight_concurrency)
* 等等

### 创建虚拟线程

1. 使用`Thread.startVirtualThread()`方法创建虚拟线程：

```java
// 使用静态构建器方法
Thread.startVirtualThread(() -> {
    // 由虚拟线程执行的代码
});
```

也可以使用`Thread.ofVirtual()`来创建，这里还可以设置一些属性，比如：线程名称等。具体如下代码：

```java 
Thread virtualThread = Thread.ofVirtual()
    .name("virtual-thread")
    .start(runnable);
```

2. 使用`ExecutorService`创建虚拟线程：

从Java 5开始，就推荐开发人员使用`ExecutorServices`而不是直接使用`Thread`类了。
现在，Java 21中引入了使用虚拟线程，所以也有了新的ExecutorService来适配，看看下面的例子：

```java
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
}  // executor.close() 被隐式调用, 然后 waits
```

3.使用`ThreadFactory`创建虚拟线程：

开发者还可以创建一个生成虚拟线程的工厂来管理，具体看下面的例子例子：

```java
ThreadFactory virtualThreadFactory = Thread.ofVirtual()
        .name("virtual-thread", 0)
        .factory();

Thread factoryThread = virtualThreadFactory.newThread(() -> {
    // 由虚拟线程执行的代码
});
factoryThread.start();
```

这段代码创建了一个虚拟线程工厂，每个虚拟线程都会以`virtual-thread`为前缀、以数字结尾（从0开始累加）的名称。

## 虚拟线程如何工作

虚拟线程是一个新的轻量级`java.lang.Thread`变体，由JVM的[Project Loom](https://openjdk.org/projects/loom/)项目实现的。
它使用了一种称为`Continuation`的技术，不受操作系统的管理或调度。相反，JVM负责调度。

![Java中虚拟线程的结构](https://img.geekyspace.cn/pictures/2024/202403141847457.jpg)

应用程序实例化虚拟线程，而 JVM 分配计算资源来处理它们。
与传统线程相对比，传统线程直接映射到操作系统（OS）进程。
传统线程中，应用程序代码负责提供和释放 OS 资源。
而虚拟线程中，应用程序实例化虚拟线程，从而表达并发需求。
但实际上是 JVM 从操作系统获取并释放资源。

![JVM/OS线程管理](https://img.geekyspace.cn/pictures/2024/202403141846557.webp)

所需的平台线程在 FIFO 工作窃取
[ForkJoinPool](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ForkJoinPool.html)
中进行管理，默认情况下使用所有可用处理器，
但可以通过调整系统属性 `jdk.virtualThreadScheduler.parallelism` 来根据您的需求进行修改。
您熟悉的 `ForkJoinPool` 和其他功能（如并行流）使用的公共池的主要区别在于，公共池以 LIFO 模式运行。

