---
title: 运行时数据区
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-08-10
category: JVM
tag: JVM
---

# 运行时数据区

> **运行时数据区**是指Java虚拟机（JVM）在运行Java程序时用于存储数据的内存区域，分为程序计数器、Java虚拟机栈、本地方法栈、Java堆和方法区五个部分。

![Java虚拟机运行时数据区](https://img.geekyspace.cn/pictures/2024/202408102247073.png)

## 程序计数器

> **程序计数器**（Program Counter Register）是一块较小的内存空间，可以看做当前线程所执行字节码的行号指示器。
> 每个线程都有一个独立的程序计数器，用于记录线程执行的位置，以便线程切换后能恢复到正确的位置。

* Java方法执行时，程序计数器记录字节码指令地址
* Native方法执行时，程序计数器为空（Undefined）
* 此区域不抛出`OutOfMemoryError`异常

## Java虚拟机栈

> **Java虚拟机栈**（Java Virtual Machine Stack）是线程私有的内存区域，其生命周期与线程相同。
> 它描述了方法执行的内存模型。当方法被执行时，JVM 会为该方法同步创建一个**栈帧**（Stack Frame）。

* 每个方法从调用到执行完成的过程，就对应着一个栈帧在虚拟机栈中入栈和出栈的过程。
* 可以通过参数`-Xss`来设置线程的最大栈空间，栈的大小直接决定了函数调用的最大可达深度。
* 栈帧用于存储局部变量、操作数栈、动态链接、方法出口等信息。

![栈帧的概念结构](https://img.geekyspace.cn/pictures/2024/202408112312001.png)

* **局部变量表（Local Variable Table）：** 方法执行时用于存储方法参数和局部变量的一块内存空间。
* **操作数栈（Operand Stack）：** 后进先出（LIFO）结构，用于方法执行时存储执行指令产生中间结果。
* **动态链接（Dynamic Linking）：** 指在方法调用时，将符号引用转换为直接引用的过程。
* **方法返回地址(Return Address)：** 指方法调用后返回位置的地址。

## 本地方法栈

> 本地方法栈（Native Method Stack）与虚拟机栈功能非常相似，其区别在于：
> * 虚拟机栈为虚拟机执行Java方法（字节码）服务
> * 本地方法栈则为虚拟机执行本地（Native）方法服务

HotSpot虚拟机把虚拟机栈和本地方法栈合二为一

## Java堆

> Java堆（Java Heap）是虚拟机管理的内存中最大的一块，线程共享，并在虚拟机启动时创建。
> 它的唯一目的是存放对象实例，几乎所有的对象实例以及数组都在堆上分配。

![堆内存模型](https://img.geekyspace.cn/pictures/2024/202407172004168.png)

* **新生代 (Young Generation)：**
  * 通常由Eden区和两个Survivor区(被称为from/to或s0/s1)组成，默认比例是`8:1:1`。
  * 大多数新创建的对象都在新生代分配内存，被填满时会触发一次`Minor GC`（小型垃圾回收）。
  * 使用的垃圾收集算法通常是复制算法，将存活的对象复制到Survivor区，然后清理Eden区和使用过的Survivor区。
* **老年代 (Old Generation / Tenured Generation)：**
  * 通过多次新生代垃圾收集后任然存活的对象会被晋升到老年代。
  * 老年代的对象相对来说生命周期较长，垃圾回收（`Major GC`或`Full GC`）相对较少，一旦发生，会比`Minor GC`耗时。
  * 使用的垃圾收集算法通常是标记-清除算法或标记-整理算法。
* **元空间 (Metaspace)：** 
  * 从JDK8开始，永久代（PermGen）被元空间取代。
  * 元空间使用的是本地内存，而不是JVM堆内存。
  * 元空间的大小仅受本地内存限制，但可以通过参数进行调整。

[DigitalOcean——Java （JVM） 内存模型 - Java 中的内存管理](https://www.digitalocean.com/community/tutorials/java-jvm-memory-model-memory-management-in-java)

## 方法区

> 方法区（Method Area）是JVM规范中定义的一个概念，用于被虚拟机加载的类信息、常量、静态变量、JIT编译器编译后的代码等数据。

在Java8之前，方法区被称为“**永久代**（PermGen）”。

从Java8开始，方法区的实现被改为**元空间**（Metaspace），元空间使用的是本地内存，而不是像永久代那样在JVM的堆内存中分配。

## 运行时常量池

运行时常量池（Runtime Constant Pool）是方法区的一部分。

Class文件中除了有类的版本、字段、方法、接口等描述信息外，还有一项信息是常量池表（Constant Pool Table），用于存放编译期生成的各种字面量与符号引用，这部分内容将在类加载后存放到方法区的运行时常量池中。

## 直接内存