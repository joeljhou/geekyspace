---
title: 深入理解Java虚拟机
description:
author: 流浪码客
isOriginal: true
date: 2024-08-08
category: JVM
tag: JVM
star: true    # 收藏star标记
#sticky: true  # 置顶特定文章
---

# 深入理解Java虚拟机目录

## 前言（Preface）

## 致谢（Acknowledgements）

## 第一部分 走近Java（Part 1: Approaching Java）

- **第1章 走近Java（Chapter 1: Approaching Java）**
    - 1.1 概述（Overview）
    - 1.2 Java技术体系（Java Technology System）
    - 1.3 Java发展史（History of Java）
    - [1.4 Java虚拟机家族（Java Virtual Machine Family）](part1/overview.html#java虚拟机家族)
    - 1.5 展望Java技术的未来（Future of Java Technology）
    - [1.6 实战：自己编译JDK（Practical: Compiling JDK）](part1/compile_jdk)

## 第二部分 自动内存管理（Part 2: Automatic Memory Management）

- **第2章 Java内存区域与内存溢出异常（Chapter 2: Java Memory Areas and OutOfMemoryError）**
    - 2.1 概述（Overview）
    - [2.2 运行时数据区域（Runtime Data Areas）](part2/runtime-data-areas)
    - [2.3 HotSpot虚拟机对象探秘（HotSpot Virtual Machine Object Exploration）](part2/heap-object-flow)
    - 2.4 实战：OutOfMemoryError异常（Practical: OutOfMemoryError Exception）

- **第3章 垃圾收集器与内存分配策略（Chapter 3: Garbage Collectors and Memory Allocation Strategies）**
    - 3.1 概述（Overview）
    - 3.2 对象已死吗？（Is the Object Dead?）
    - 3.3 垃圾收集算法（Garbage Collection Algorithms）
    - 3.4 HotSpot的算法实现（HotSpot Algorithm Implementation）
    - 3.5 垃圾收集器（Garbage Collectors）

- **第4章 虚拟机性能监控、故障处理工具（Chapter 4: JVM Performance Monitoring and Troubleshooting Tools）**
    - 4.1 概述（Overview）
    - 4.2 JConsole介绍（Introduction to JConsole）
    - 4.3 VisualVM介绍（Introduction to VisualVM）
    - 4.4 其他工具（Other Tools）

- **第5章 调优案例分析与实战（Chapter 5: Optimization Case Analysis and Practices）**
    - 5.1 概述（Overview）
    - 5.2 实战案例分析（Practical Case Analysis）
    - 5.3 调优实践（Optimization Practices）

## 第三部分 虚拟机执行子系统（Part 3: JVM Execution Subsystem）

- **第6章 类文件结构（Chapter 6: Class File Structure）**
    - 6.1 概述（Overview）
    - [6.2 无关性的基石（The Cornerstone of Independence）](part3/class-file-structure.html#跨平台的基石)
    - [6.3 Class类文件的结构（Structure of Class File）](part3/class-file-structure.html#class类文件结构-理论)
    - [6.4 字节码指令简介（Introduction to Bytecode Instructions）](part3/bytecode-instructions-set)
    - 6.5 公有设计，私有实现（Public Design, Private Implementation）
    - 6.6 Class文件结构的发展（Development of Class File Structure）

- **第7章 虚拟机类加载机制（Chapter 7: JVM Class Loading Mechanism）**
    - 7.1 概述（Overview）
    - 7.2 类加载的时机（Timing of Class Loading）
    - [7.3 类加载的过程（Class Loading Process）](part3/class-loading-mechanism.html#类加载的过程)
    - [7.4 类加载器（Class Loaders）](part3/class-loading-mechanism.html#类加载器)
    - 7.5 Java模块化系统（Java Modular System）

- **第8章 虚拟机字节码执行引擎（Chapter 8: JVM Bytecode Execution Engine）**
    - 8.1 概述（Overview）
    - 8.2 运行时栈帧结构（Runtime Stack Frame Structure）
    - 8.3 方法调用与返回（Method Invocation and Return）

- **第9章 类加载及执行子系统的案例与实战（Chapter 9: Case Studies and Practices of Class Loading and Execution Subsystem）**
    - 9.1 概述（Overview）
    - 9.2 实战案例分析（Practical Case Analysis）
    - 9.3 调优实践（Optimization Practices）

## 第四部分 程序编译与代码优化（Part 4: Program Compilation and Code Optimization）

- **第10章 前端编译与优化（Chapter 10: Front-end Compilation and Optimization）**
    - 10.1 概述（Overview）
    - 10.2 语法与语义分析（Syntax and Semantic Analysis）
    - 10.3 字节码生成（Bytecode Generation）

- **第11章 后端编译与优化（Chapter 11: Back-end Compilation and Optimization）**
    - 11.1 概述（Overview）
    - 11.2 即时编译器（Just-in-time Compiler）
    - 11.3 编译优化（Compilation Optimization）

## 第五部分 高效并发（Part 5: Efficient Concurrency）

- **第12章 Java内存模型与线程（Chapter 12: Java Memory Model and Threads）**
    - 12.1 概述（Overview）
    - 12.2 Java内存模型（Java Memory Model）
    - 12.3 线程与线程池（Threads and Thread Pools）

- **第13章 线程安全与锁优化（Chapter 13: Thread Safety and Lock Optimization）**
    - 13.1 概述（Overview）
    - 13.2 线程安全（Thread Safety）
    - 13.3 锁优化（Lock Optimization）

## 附录（Appendices）

- **附录A 在Windows系统下编译OpenJDK 6（Appendix A: Compiling OpenJDK 6 on Windows）**
- **附录B 展望Java技术的未来（2013年版）（Appendix B: Outlook of Java Technology's Future (2013 Edition)）**
- **附录C 虚拟机字节码指令表（Appendix C: JVM Bytecode Instruction Table）**
    - C.1 指令集概述（Overview of Instruction Set）
    - C.2 常用指令详解（Detailed Explanation of Common Instructions）

- **附录D 对象查询语言（OQL）简介（Appendix D: Introduction to Object Query Language (OQL)）**
    - D.1 概述（Overview）
    - D.2 OQL语法（OQL Syntax）
    - D.3 使用案例（Usage Cases）

- **附录E JDK历史版本轨迹（Appendix E: Historical Versions of the JDK）**
    - E.1 概述（Overview）
    - E.2 版本列表（Version List）
