---
title: Java虚拟机概述
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-07-19
category: JVM
tag: JVM
order: 1.4
---

# Java虚拟机概述

> **Java虚拟机**（Java Virtual Machine，简称JVM）是运行所有Java程序的虚拟计算机，是Java平台的核心实现。
> 它提供了一种独立于底层硬件和操作系统的运行环境，使Java程序能够在任何安装了JVM的系统上执行。
> JVM通过将Java字节码（.class文件）转换为机器码来实现跨平台运行，这一特性被称为“Write Once, Run Anywhere”。

## 跨平台开发的通用平台

随着发展，JVM不再是Java独享的Moment，越来越多的语言开始在JVM上运行，使JVM逐渐演变成一个**跨平台开发的通用平台**。

![jvm-class](https://img.geekyspace.cn/pictures/2024/image-20240620020158368.png)

* JVM本质上只关心`.class`的字节码文件，而不关心源代码是用什么语言编写的。
* 通过Oracle TCK（Technology Compatibility Kit）测试，就是合格的Java虚拟机。

## Java虚拟机家族

**虚拟机始祖：Sun Classic/Exact VM（Sun/Oracle公司）**

* **Classic VM：**
    * 1996年1月23日，Sun发布JDK 1.0，正式商用，最早的Java虚拟机实现
    * 直到JDK 1.4，才完全退出商用虚拟机的历史舞台
    * ==纯解释器==，可外挂即时编译器（JIT），**缺点**是只能<u>二选一</u>
* **Exact VM：**
    * 在JDK 1.2时，在Solaris平台发布，是Classic VM的改进版
    * 因准确式内存管理（Exact Memory Management）而得名，是垃圾收集时准确判断堆上数据的前提
    * 它的编译执行系统已经具备现代高性能虚拟机雏形
        * 如热点探测、两级即时编译器、==编译器与解释器混合工作==模式等
    * **缺点**是<u>只能在Solaris平台上运行</u>

**武林盟主：HotSpot VM（Sun/Oracle公司）**

* **HotSpot VM**
    * 最初由Longview Technologies公司开发，后被Sun公司收购
    * 从JDK 1.3至今（2024），HotSpot VM成为默认虚拟机，目前使用最广泛
    * HotSpot VM集成了Sun以上两款虚拟机优点（准确式内存管理，热点代码探测技术...）
      * **优点**是<u>同时支持解释执行和即时编译执行</u>，在响应速度和执行速度上取得平衡
    * Oracle收购Sun以后，建立HotRockit项目，把BEA JRocki优秀特性融合到HotSpot之中
    * 2014年JDK 8时期，HotSpot移除掉[永久代](/md/jvm/part2/runtime-data-areas.html#方法区)，吸收了JRockit的Java Mission Control监控工具等功能

**小家碧玉：Mobile/Embedded VM（Sun/Oracle公司）**

专门为移动设备和嵌入式设备设计的Java虚拟机（JavaME）

* **KVM（Kilobyte Virtual Machine）**:
    * 用于早期的移动设备，但智能手机市场已被Android和iOS主导
* **CDC（Connected Device Configuration）**:
    * 用于功能更强的嵌入式设备，但面临自家Java SE Embedded（eJDK）的竞争
    * 由于Java SE的普及，CDC市场快速萎缩，Oracle基本砍掉了CDC-HI项目，将其划归Java SE Embedded

**天下第二：BEA JRockit/IBM J9 VM**

* **BEA JRockit**:
    * 最初由BEA Systems开发，后被Oracle收购，永远停留在R28（JDK 6版JRockit代号）
    * ==专注于服务器==硬件和服务端应用场景，不关注启动速度，不包含解释器实现
    * 以其出色的垃圾收集器和性能和诊断工具（如Java Mission Control）著称
* **IBM J9 VM**:
    * 全称“IBM Technology for Java Virtual Machine”，简称IT4J，但普遍称为J9
    * 作为通用型JVM，其市场定位接近HotSpot，主要优势在IBM产品上
    * 由IBM开发，2017年开源为[OpenJ9](https://www.eclipse.org/openj9/)，现由Eclipse基金会维护
    * 模块化设计优于HotSpot
        * 核心组件库（包括垃圾收集器、即时编译器、诊断监控子系统等）构成了IBM OMR项目
        * 可以在其他语言平台如Ruby、Python中快速组装成相应的功能

**软硬合璧：BEA Liquid VM/Azul VM（Zing）**

* **BEA Liquid VM**:
    * 也被称为JRockit VE（Virtual Edition，VE），专为BEA WebLogic实时运行环境设计
    * BEA公司开发的JRockit虚拟机虚拟化版本，可直接运行在自家Hypervisor系统上
    * 不需要操作系统支持，自身实现了必要的操作系统功能（如线程调度、文件系统、网络支持等）
    * 直接控制硬件，避免内核态/用户态切换，最大限度发挥硬件性能，提升Java程序执行效率
    * 随着JRockit虚拟机终止开发，Liquid VM项目也停止了

* **Azul VM**:
    * 适用于Azul Systems专有硬件Vega产品线，在HotSpot基础改进
    * 采用PGC和C4收集器，停顿时间可控，每个Azul VM实例可管理数十个CPU和数百GB内存

* **Zing VM**:
    * 2010年起，Azul公司重心转向软件，发布Zing虚拟机，基于HotSpot某旧版代码分支
    * 低延迟，配备PGC和C4垃圾收集器
        * 支持TB级别Java堆内存，暂停时间不超过10毫秒
        * HotSpot直到JDK 11和JDK 12的ZGC和Shenandoah收集器才达到类似目标，但效果仍不及C4
    * Zing的ReadyNow（快速预热、启动）！
        * 利用之前收集的性能监控数据，使虚拟机在启动后快速达到高性能水平
        * 减少从解释执行到即时编译的等待时间
    * 易于监控（ZVision/ZVRobot工具）
        * 方便用户监控JVM运行状态，包括代码热点、对象分配监控、锁竞争监控等

**挑战者：Apache Harmony/Google Android Dalvik VM**

* **Apache Harmony**:
    * 一个开源的Java SE实现项目，旨在提供兼容Java SE的JVM及类库。虽然项目已停止，但其代码和理念影响深远
    * Apache软件基金会开源项目，兼容JDK 5和JDK 6，提供自己的虚拟机和Java类库API。
    * 没有通过TCK认证，无法正式称为“Java虚拟机”
    * 曾对Java生态系统构成巨大挑战，导致Apache基金会退出JCP组织
    * 随Sun公司开源OpenJDK，Harmony项目的优势逐渐减弱
    * 主要贡献（如Java类库代码）被吸纳进IBM JDK 7和Google Android SDK


* **Google Android Dalvik VM**:
    * Android平台核心虚拟机，名字来源于冰岛的小渔村Dalvik
    * 非Java虚拟机，使用寄存器架构，不直接执行Java Class文件，而是执行DEX文件
    * 通过Class文件转化为DEX文件，支持Java语法和API，推动Android迅速发展
    * Android 2.2引入即时编译器，提升性能
    * Android 4.4开始引入提前编译（Ahead of Time Compilation，AOT）的ART虚拟机
    * Android 5.0开始ART全面替代Dalvik虚拟机

**没有成功，但并非失败：Microsoft JVM及其他**

* **Microsoft JVM**:
    * 微软开发的Java虚拟机，曾用于早期的Windows平台。但由于与Sun的法律纠纷，微软最终停止了其开发
    * 为支持Internet Explorer 3中的Java Applets，开发Microsoft JVM，仅限Windows平台
    * 被认为是当时Windows系统下性能最好的Java虚拟机，1997年和1998年连续获得《PC Magazine》“编辑选择奖”
    * 1997年被Sun公司控告侵犯商标、不正当竞争，最终微软赔偿2000万美元，并承诺停止开发和逐步移除其Java虚拟机
    * 虽然微软的Java虚拟机未能长期发展，但其短暂的成功对当时Java的推广起到了积极作用。

**百家争鸣**

* KVM：为小型设备设计的轻量级Java虚拟机
* Java Card VM：支持智能卡和小型嵌入式设备的Java虚拟机
* Squawk VM：针对嵌入式系统和传感器网络的Java虚拟机
* JavaInJava：用Java自身编写的Java虚拟机
* Maxine VM：由Java编写、用于研究和实验的Java虚拟机
* Jikes RVM： IBM开源的高性能研究虚拟机
* IKVM.NET：在.NET平台上运行Java代码的虚拟机
* JamVM：[http://jamvm.sourceforge.net/](http://jamvm.sourceforge.net/)
* CacaoVM：[http://www.cacaovm.org/](http://www.cacaovm.org/)
* SableVM：[http://www.sablevm.org/](http://www.sablevm.org/)
* Kaffe：[http://www.kaffe.org/](http://www.kaffe.org/)
* Jelatine JVM：[http://jelatine.sourceforge.net/](http://jelatine.sourceforge.net/)
* NanoVM：[http://www.harbaum.org/till/nanovm/index.shtml](http://www.harbaum.org/till/nanovm/index.shtml)
* MRP：[https://github.com/codehaus/mrp](https://github.com/codehaus/mrp)
* Moxie JVM：[http://moxie.sourceforge.net/](http://moxie.sourceforge.net/)

## Java虚拟机架构

理解总体知识点在全局上与知识体系之间的对应关系

![Java虚拟机架构](https://img.geekyspace.cn/pictures/2024/0082zybply1gc6fz21n8kj30u00wpn5v.jpg)

从整体上看，JVM 由三个不同的组件组成：

1. **类加载子系统（Class Loader SubSystem）**：主要负责将类`.class`加载到内存中
2. **运行时数据区（Runtime Data Area）**：管理JVM运行时所需的数据结构
3. **执行引擎（Execution Engine）**：负责执行字节码指令，将其转换为机器代码，供机器理解

![JVM三大组件](https://img.geekyspace.cn/pictures/2024/image-39.png)

---

### 类加载子系统

第一个组件 ==**类加载过程**== 分为三个阶段：加载、链接和初始化。

**1、加载（Loading）**：将类的字节码文件加载到内存中，并生成 JVM 运行时的类表示

* **启动类加载器（Bootstrap Class Loader）：**
  * 负责加载Java的核心类库，如`java.lang`、`java.net`、`java.util`、`java.io`等
  * 这些类库位于`$JAVA_HOME/jre/lib`目录中，例如`rt.jar`
* **扩展类加载器（Extension Class Loader）：**
  * Bootstrap类加载器的子类，同时也是Application类加载器的父类。
  * 它负责加载位于`$JAVA_HOME/jre/lib/ext`目录中的Java标准库的扩展
* **系统类加载器（Application Class Loader）：**
  * Extension类加载器的子类，加载位于类路径上的类文件，默认情况下，类路径为应用程序的目录
  * 可通过添加命令行选项`-classpath`或`-cp`来修改类路径

**2、链接（Linking）**：将类的二进制数据合并到JVM的运行时状态中，分为以下三个步骤：

- **验证（Verify）**：通过一组约束或规则检查`.class`文件的正确性，验证失败抛出`VerifyException`
- **准备（Prepare）**：为类或接口的静态字段分配内，存并设置默认初始值
- **解析（Resolve）**：将符号引用替换为常量池中存在的直接引用

**3、初始化（Initialization）**：执行类的静态初始化块和静态变量的初始化

![类加载三个阶段](https://img.geekyspace.cn/pictures/2024/image-40.png)

---

### 运行时数据区

第二个组件 ==**运行时数据区域**== 内含有五个数据区域：

* *线程共享区*：
  - **<u>方法区</u>**（Method Area）：存储已加载的类信息、常量池、静态变量和即时编译后的代码
  - **堆（Heap Area）**：存储对象实例和数组（即`new`出来的对象）
    - GC管理的主要区域，分为新生代和老年代
* *线程隔离区*：
  - **<u>虚拟机栈</u>（Virtual Machine Stack）**：存储局部变量、操作数栈（用于计算）、栈帧和方法调用信息
  - **程序计数器（PC寄存器，Program Counter Register）**：存储当前线程执行的字节码指令的地址，以便线程切换时能恢复
  - **本地方法栈（Native Method Stack）**：用于执行本地方法（即 JNI 调用的C/C++代码）

![运行时数据区](https://img.geekyspace.cn/pictures/2024/image-32.png)

---

### 执行引擎

第三个组件 ==**执行引擎**== 包含解释器、编译器和垃圾回收区：

* **解释器（Interpreter）**：**逐行**解释执行字节码指令，速度较慢，但实现简单
* **即时编译器（JIT Compiler，Just-In-Time Compiler）**：将**热点代码**（经常执行的字节码）编译成机器码，以提高执行效率
* **垃圾回收器（Garbage Collector）**：自动管理和回收堆中的无用对象，防止内存泄漏

![执行引擎](https://img.geekyspace.cn/pictures/2024/image-33.png)

这些部分共同组成了JVM的核心功能，使得Java程序可以跨平台运行，并且具有良好的性能和安全性

* 参考：[Siben Nayak—《面向初学者的Java虚拟机架构》](https://www.freecodecamp.org/news/jvm-tutorial-java-virtual-machine-architecture-explained-for-beginners/)
