---
title: 字节码指令集
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-07-26
category: JVM
tag: JVM
order: 3
---

# 字节码指令集

字节码指令集是JVM执行的低级指令集合，由Java编译器将Java源代码编译后保存在`Method`描述中。 由操作码和操作数组成:

* **操作码（`Opcode`）：** 一个字节长度的数字，代表某种特定操作
* **操作数（`Operands`）：** 跟随操作码之后的零至多个参数，用于该操作所需的数据

由于JVM采用面向操作数栈而不是面向寄存器的架构，大多数指令都不包含操作数，只有一个操作码，指令参数存放在操作数栈中。

**优势和劣势**

限制Java虚拟机操作码的长度为一个字节（即0～255），意味着指令集的操作码总数不能超过256条；
Class文件格式放弃了编译后代码的操作数长度对齐，需要在运行时从字节中重建具体数据结构。
例如，存储16位无符号整数要使用两个无符号字节（`byte1`和`byte2`）：


```shell
(byte1 << 8) | byte2
```

这种操作可能导致解释执行字节码时性能损失，但省略了大量的填充和间隔符号，用一个字节代表操作码，使编译代码更小，更适合高传输效率的设计。
Java语言设计初期主要面向网络和智能家电，这种设计一直沿用至今。

**执行模型**

如果不考虑异常处理的话，那Java虚拟机的解释器可以使用下面这段伪代码作为最基本的执行模型来理解：

```java
do {
    自动计算PC寄存器的值加1;
    根据PC寄存器指示的位置，从字节码流中取出操作码;
if (字节码存在操作数) 从字节码流中取出操作数;
    执行操作码所定义的操作;
} while (字节码流长度 > 0);
```

字节码指令流基本上都是单字节对齐的，只有“tableswitch”和“lookupswitch”两条指令例外，
由于操作数特殊，是以4字节为界划分的，所以需要预留出相应的空位填充来实现对齐。

## 字节码与数据类型

数据类型相关的字节码指令，包含特定的**操作码助记符**：

| 数据类型      | 操作码助记符 |
|-----------|--------|
| int       | `i`    |
| long      | `l`    |
| short     | `s`    |
| byte      | `b`    |
| char      | `c`    |
| float     | `f`    |
| double    | `d`    |
| reference | `a`    |

也有一些指令没有明确的类型字符：

| 指令            | 描述              |
|---------------|-----------------|
| `arraylength` | 操作数为数组类型对象      |
| `goto`        | 无条件跳转指令，与数据类型无关 |

由于操作码长度只有一个字节，如果每种类型的指令都支持所有数据类型，指令数量将超出范围。
因此，Java虚拟机的指令集设计成非完全独立的（“Not Orthogonal”）。
即并非每种数据类型和每一种操作都有对应的指令。
参考下表**Java虚拟机指令集所支持的数据类型**。

使用数据类型对应的操作码助记符替换操作码`opcode`列指令模板中的`T`，得到具体的字节码指令。

| opcode        | byte   | short   | int       | long    | float   | double  | char    | reference |
|---------------|--------|---------|-----------|---------|---------|---------|---------|-----------|
| **Tpush**     | bipush | sipush  |           |         |         |         |         |           |
| **Tconst**    |        |         | iconst    | lconst  | fconst  | dconst  |         | aconst    |
| **Tload**     |        |         | iload     | lload   | fload   | dload   |         | aload     |
| **Tstore**    |        |         | istore    | lstore  | fstore  | dstore  |         | astore    |
| **Tinc**      |        |         | iinc      |         |         |         |         |           |
| **Taload**    |        | baload  | saload    | iaload  | laload  | faload  | daload  | caload    | aaload    |
| **Tastore**   |        | bastore | sastore   | iastore | lastore | fastore | dastore | castore   | aastore   |
| **Tadd**      |        |         | iadd      | ladd    | fadd    | dadd    |         |           |
| **Tsub**      |        |         | isub      | lsub    | fsub    | dsub    |         |           |
| **Tmul**      |        |         | imul      | lmul    | fmul    | dmul    |         |           |
| **Tdiv**      |        |         | idiv      | ldiv    | fdiv    | ddiv    |         |           |
| **Trem**      |        |         | irem      | lrem    | frem    | drem    |         |           |
| **Tneg**      |        |         | ineg      | lneg    | fneg    | dneg    |         |           |
| **Tshl**      |        |         | ishl      | lshl    |         |         |         |           |
| **Tshr**      |        |         | ishr      | lshr    |         |         |         |           |
| **Tushr**     |        |         | iushr     | lushr   |         |         |         |           |
| **Tand**      |        |         | iand      | land    |         |         |         |           |
| **Tor**       |        |         | ior       | lor     |         |         |         |           |
| **Txor**      |        |         | ixor      | lxor    |         |         |         |           |
| **i2T**       | i2b    | i2s     | i2i       | i2l     | i2f     | i2d     |         |           |
| **l2T**       |        |         | l2i       | l2l     | l2f     | l2d     |         |           |
| **f2T**       |        |         | f2i       | f2l     | f2f     | f2d     |         |           |
| **d2T**       |        |         | d2i       | d2l     | d2f     | d2d     |         |           |
| **Tcmp**      |        |         | icmp      | lcmp    |         |         |         |           |
| **Tcmpl**     |        |         |           |         | fcmpl   | dcmpl   |         |           |
| **Tcmpg**     |        |         |           |         | fcmpg   | dcmpg   |         |           |
| **if_TcmpOP** |        |         | if_icmpOP |         |         |         |         | if_acmpOP |
| **Treturn**   |        |         | ireturn   | lreturn | freturn | dreturn |         | areturn   |

从表中看来，大部分指令不支持`byte`、`char`和`short`类型，`boolean`类型更是没有任何指令支持。

* 编译器会在编译期或运行期将`byte`和`short`类型数据带符号扩展（Sign-Extend）为`int`类型
* 将`boolean`和`char`类型数据零位扩展（Zero-Extend）为`int`类型
* 在处理这些类型的数组时，也会转换为使用`int`类型的字节码指令

因此，大多数对`boolean`、`byte`、`short`和`char`类型数据的操作，实际上都是使用`int`类型进行的。

## 加载和存储指令

加载和存储指令用于在栈帧中的局部变量表和操作数栈之间传输数据。这些指令包括：

**将局部变量加载到操作数栈**

- 整数加载指令：`iload`、`iload_<n>`
- 长整型加载指令：`lload`、`lload_<n>`
- 浮点型加载指令：`fload`、`fload_<n>`
- 双精度浮点型加载指令：`dload`、`dload_<n>`
- 引用类型加载指令：`aload`、`aload_<n>`

**将数值从操作数栈存储到局部变量表**

- 整数存储指令：`istore`、`istore_<n>`
- 长整型存储指令：`lstore`、`lstore_<n>`
- 浮点型存储指令：`fstore`、`fstore_<n>`
- 双精度浮点型存储指令：`dstore`、`dstore_<n>`
- 引用类型存储指令：`astore`、`astore_<n>`

**将常量加载到操作数栈**

- 字节常量加载指令：`bipush`
- 短整型常量加载指令：`sipush`
- 常量池加载指令：`ldc`、`ldc_w`、`ldc2_w`
- 空常量加载指令：`aconst_null`
- 整数常量加载指令：`iconst_m1`、`iconst_<i>`
- 长整型常量加载指令：`lconst_<l>`
- 浮点型常量加载指令：`fconst_<f>`
- 双精度浮点型常量加载指令：`dconst_<d>`

**扩充局部变量表访问索引的指令**

- 扩展索引指令：`wide`

加载和存储指令主要用于操作数栈和局部变量表之间的数据传输。
此外，一些指令（如访问对象字段或数组元素的指令）也会涉及操作数栈的数据传输。

## 运算指令

## 类型转换指令

## 对象创建与访问指令

## 操作数栈管理指令

## 控制转移指令

## 方法调用和返回指令

## 异常处理指令

## 同步指令





