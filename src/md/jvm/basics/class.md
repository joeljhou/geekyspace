---
title: 类字节码详解
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-07-19
category: JVM
tag: JVM
order: 2
---

# 类字节码详解

> 计算机只能运行由0和1构成的二进制格式。
> 要运行Java程序，必须先通过Java虚拟机（JVM）执行编译后的Java代码，这个编译后的代码就是**Java字节码**。

## 跨平台的基石

Java字节码具有“平台无关性”和“语言无关性”。

* **平台无关性：** 字节码可以在任何支持JVM的平台上运行，实现“一次编写，到处运行”
* **语言无关性：** 多种编程语言可以编译成字节码并在JVM（GraalVM）上运行，不仅限于Java

![Java虚拟机提供的语言无关性](https://img.geekyspace.cn/pictures/2024/202407200209120.png)

## Class类文件结构

Java技术的良好向后兼容性得益于Class文件结构的稳定性，
每个Class文件对应一个类或接口的定义信息，是一组以8个字节为单位的二进制流。各数据项严格按顺序排列，没有任何分隔符。

Class文件格式类似于C语言的结构体，这种伪结构只有两种数据类型：“无符号数”和“表”。

* **无符号数：** 基本数据类型，使用`u1`、`u2`、`u4`、`u8`表示1、2、4、8个字节的无符号数。
  它们可以描述数字、索引引用、数量值或按照`UTF-8`编码的字符串值。
* **表：** 由多个无符号数或其他表构成的复合数据类型，通常以“_info”结尾。
  表用于描述有层次关系的复合结构，整个Class文件本质上也是一个表，由按严格顺序排列的数据项构成。

[JVM虚拟机规范第四章](https://docs.oracle.com/javase/specs/jvms/se22/html/jvms-4.html)
中规定了Class文件必须是一个固定的`ClassFile`结构，如下所示：

```java
ClassFile {
  u4 magic;                   // 魔数 (0xCAFEBABE)，标识class文件格式
  u2 minor_version;           // 次版本号
  u2 major_version;           // 主版本号
  u2 constant_pool_count;     // 常量池计数
  cp_info constant_pool[constant_pool_count-1]; // 常量池
  u2 access_flags;            // 访问标志
  u2 this_class;              // 当前类索引
  u2 super_class;             // 父类索引
  u2 interfaces_count;        // 接口计数
  u2 interfaces[interfaces_count]; // 接口索引表
  u2 fields_count;            // 字段计数
  field_info fields[fields_count];    // 字段表
  u2 methods_count;           // 方法计数
  method_info methods[methods_count];  // 方法表
  u2 attributes_count;        // 属性计数
  attribute_info attributes[attributes_count]; // 属性表
}
```

通过分析 ClassFile 的内容，我们便可以知道 class 文件的组成。

![ClassFile 内容分析](https://img.geekyspace.cn/pictures/2024/202407220149546.png)

### 魔数与Class文件的版本

每个Class文件的头4个字节被称为魔数（Magic Number），它的唯一作用是确定这个文件是否为一个能被虚拟机接受的Class文件。



### 常量池

### 访问标志

### 类索引、父类索引与接口索引集合

### 字段表集合

### 方法表集合

### 属性表集合

