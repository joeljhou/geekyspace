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

### 魔数

魔数是头4个字节的值`0xCAFEBABE`，用于验证文件是否为有效的Class文件。
不仅限于Class文件，很多文件格式如`GIF`或`JPEG`等也使用魔数来进行身份识别。

* GIF文件：`47 49 46 38`
* JPEG文件：`FF D8 FF E0`

在Java被称为“Oak”语言时期（大约1991年前后），`0xCAFEBABE`被选为魔数。
Java开发小组关键成员Patrick Naughton提到，他们选择这个值是因为它好玩且容易记忆，
象征着著名咖啡品牌Peet’s Coffee深受欢迎的Baristas咖啡，也预示着日后“Java”这一商标名称的出现。

### Class文件版本号

紧跟魔数`0xCAFEBABE`之后的4个字节存储的是Class文件的版本号，其中：

* 第5~6字节：次版本号（Minor Version）
* 第7~8字节：主版本号（Major Version），Java 8 = 52.0

Java的主版本号从JDK 1.0的45开始，每次大版本发布都会+1；
次版本号通常保持为0，对应一些次要的特性改进或修复。

**Java版本对应表：**

| JDK版本  | 十进制 | 十六进制 | 发布时间       |
|--------|-----|------|------------|
| JDK1.1 | 45  | 0x2D | 1996-05-15 |
| JDK1.2 | 46  | 0x2E | 1998-12-08 |
| JDK1.3 | 47  | 0x2F | 2000-05-08 |
| JDK1.4 | 48  | 0x30 | 2002-02-13 |
| JDK1.5 | 49  | 0x31 | 2004-09-30 |
| JDK1.6 | 50  | 0x32 | 2006-12-11 |
| JDK1.7 | 51  | 0x33 | 2011-07-28 |
| JDK1.8 | 52  | 0x34 | 2014-03-18 |
| Java9  | 53  | 0x35 | 2017-09-21 |
| Java10 | 54  | 0x36 | 2018-03-20 |
| Java11 | 55  | 0x37 | 2018-09-25 |
| Java12 | 56  | 0x38 | 2019-03-19 |
| Java13 | 57  | 0x39 | 2019-09-17 |
| Java14 | 58  | 0x3A | 2020-03-17 |
| Java15 | 59  | 0x3B | 2020-09-15 |
| Java16 | 60  | 0x3C | 2021-03-16 |
| Java17 | 61  | 0x3D | 2021-09-14 |
| Java18 | 62  | 0x3E | 2022-03-22 |
| Java19 | 63  | 0x3F | 2022-09-20 |
| Java20 | 64  | 0x40 | 2023-03-21 |
| Java21 | 65  | 0x41 | 2023-09-19 |
| Java22 | 66  | 0x42 | 2024-03-19 |

### 常量池

常量池入口紧随主、次版本号之后，可以理解成Class文件的资源仓库。
与其他数据关联最多，占用空间最大，也是第一个出现的表类型数据项`cp_info`。

**1、常量池计数**

由于常量项不固定，入口处`u2`类型的数据值表示**常量池计数**（`constant_pool_count`）。

* 常量池的计数从1开始，即：`常量项 = 常量池计数 - 1`
* Class文件格式规范刻意将第0项常量空出，索引值0表示“不引用任何常量池项”

**2、常量类型**

常量池主要存放两大类常量：字面量（Literal）和符号引用（Symbolic References）

* **字面量：** 比较接近于Java语言层面的常量概念，如数值、文本字符串、final常量等
* **符号引用：** 符号引用则属于编译原理方面的概念，包括以下几类常量：
  * 被模块导出或者开放的包(Package)
  * 类和接口的全限定名(Fully Qualified Name)
  * 字段的名称和描述符(Descriptor)
  * 方法的名称和描述符
  * 方法句柄和方法类型(Method Handle、Method Type、Invoke Dynamic)
  * 动态调用点和动态常量(Dynamically-Computed Call Site、Dynamically-Computed Constant)

不同于C/C++编译时有“连接”步骤，JVM在加载Class文件时才进行“动态连接”。
因此，Class文件不保存方法、字段最终在内存中的布局信息。
JVM在类加载时从常量池获取符号引用，并在类创建或运行时解析为具体地址。

**3、常量表结构**

[JVM虚拟机规范第四章-常量池](https://docs.oracle.com/javase/specs/jvms/se22/html/jvms-4.html#jvms-4.4)
定义了`constant_pool`表条目具有以下通用格式：

```java
cp_info {
  u1 tag;
  u1 info[];
}
```

常量池中的每项常量都是一个表，起始的第一位是一个`u1`类型的标志位（tag），表示当前常量的类型。

1. 最初设计的11种常量类型 
2. 为支持动态语言，增加了4种动态语言相关的常量 
3. 为支持Java模块化系统（Jigsaw），新增了`CONSTANT_Module_info`和`CONSTANT_Package_info`

| 类型(tag)                              | 描述              | 结构细节（起始`u1 tag;`）                                                                                  |
|--------------------------------------|-----------------|----------------------------------------------------------------------------------------------------|
| CONSTANT_Utf8_info(1)                | UTF-8编码的字符串     | `u2 length;`<br />字符串的字节长度<br />`u1 bytes[length];`<br />UTF-8编码的字节数据                              |
| CONSTANT_Integer_info(3)             | 整型字面量           | `u4 bytes;` 32位整数值                                                                                 |
| CONSTANT_Float_info(4)               | 浮点型字面量          | `u4 bytes;` 32位浮点数值                                                                                |
| CONSTANT_Long_info(5)                | 长整型字面量          | `u4 high_bytes;` 高32位<br />`u4 low_bytes;` 低32位                                                    |
| CONSTANT_Double_info(6)              | 双精度浮点型字面量       | `u4 high_bytes;` 高32位<br />`u4 low_bytes;` 低32位                                                    |
| CONSTANT_Class_info(7)               | 类或接口的符号引用       | `u2 name_index;`<br />指向类或接口名称的索引                                                                  |
| CONSTANT_String_info(8)              | 字符串类型字面量        | `u2 string_index;`<br />指向字符串字面量的索引                                                                |
| CONSTANT_Fieldref_info(9)            | 字段的符号引用         | `u2 class_index;`<br />指向字段所在类的索引<br />`u2 name_and_type_index;`<br />指向字段名称和描述符的索引                |
| CONSTANT_Methodref_info(10)          | 类中方法的符号引用       | `u2 class_index;`<br />指向方法所在类的索引<br />`u2 name_and_type_index;`<br />指向方法名称和描述符的索引                |
| CONSTANT_InterfaceMethodref_info(11) | 接口中方法的符号引用      | `u2 class_index;`<br />指向接口所在类的索引<br />`u2 name_and_type_index;`<br />指向方法名称和描述符的索引                |
| CONSTANT_NameAndType_info(12)        | 字段或方法的部分符号引用    | `u2 name_index;`<br />指向字段或方法名称的索引<br />`u2 descriptor_index;`<br />指向字段或方法描述符的索引                  |
| CONSTANT_MethodHandle_info(15)       | 表示方法句柄          | `u1 reference_kind;`<br />方法句柄的类型<br />`u2 reference_index;`<br />指向方法句柄引用的索引                      |
| CONSTANT_MethodType_info(16)         | 表示方法类型          | `u2 descriptor_index;`<br />指向方法类型描述符的索引                                                           |
| CONSTANT_Dynamic_info(17)            | 表示一个动态计算常量      | `u2 bootstrap_method_attr_index;`<br />指向引导方法属性的索引<br />`u2 name_and_type_index;`<br />指向名称和描述符的索引 |
| CONSTANT_InvokeDynamic_info(18)      | 表示一个动态方法调用点     | `u2 bootstrap_method_attr_index;`<br />指向引导方法属性的索引<br />`u2 name_and_type_index;`<br />指向名称和描述符的索引 |
| CONSTANT_Module_info(19)             | 表示一个模块          | `u2 name_index;`<br />指向模块名称的索引                                                                    |
| CONSTANT_Package_info(20)            | 表示一个模块中开放或者导出的包 | `u2 name_index;`<br />指向包名称的索引                                                                     |

常量池的数据结构复杂，因为包含17种独立的常量类型，彼此没有共性，因此需要逐项讲解。

### 访问标志

在常量池结束后，紧接的2个字节代表访问标志（`access_flags`），用于识别类或接口的访问信息，包括：

* 类或接口的类型
* 是否定义为`public`
* 是否定义为`abstract`
* 如果是类，是否声明为`final`

| 标志名称           | 标志值    | 含义                                                                                                                 |
|----------------|--------|--------------------------------------------------------------------------------------------------------------------|
| ACC_PUBLIC     | 0x0001 | 是否为 `public` 类型                                                                                                    |
| ACC_FINAL      | 0x0010 | 是否被声明为 `final`，只有类可设置                                                                                              |
| ACC_SUPER      | 0x0020 | 是否允许使用 `invokespecial` 字节码指令的新语义，`invokespecial` 指令的语义在 JDK 1.0.2 发生过改变，为了区别该指令使用哪种语义，JDK 1.0.2 之后编译出来的类的这个标志都必须为真 |
| ACC_INTERFACE  | 0x0200 | 标识这是一个接口                                                                                                           |
| ACC_ABSTRACT   | 0x0400 | 是否为 `abstract` 类型，对于接口或抽象类来说，此标志值为真，其他类型值为假                                                                        |
| ACC_SYNTHETIC  | 0x1000 | 标识这个类并非由用户代码产生的                                                                                                    |
| ACC_ANNOTATION | 0x2000 | 标识这是一个注解                                                                                                           |
| ACC_ENUM       | 0x4000 | 标识这是一个枚举                                                                                                           |
| ACC_MODULE     | 0x8000 | 标识这是一个模块                                                                                                           |

总共有 16 个标记位可供使用，但常用的只有其中 7 个，见下图：

![16个访问标记位](https://img.geekyspace.cn/pictures/2024/202407230642248.png)

### 类索引、父类索引与接口索引集合

类索引（this_class）、父类索引（super_class） 和 接口索引集合（interfaces） 是Class文件中用于确定类的继承关系的重要部分。

* **类索引**（u2类型）：类的全限定名
* **父类索引**（u2类型）：父类的全限定名。除`Object`外，父类索引都不为0
* **接口索引集合**（u2类型的集合）：描述类实现的接口
  * 入口第一项`u2`类型的数据为**接口计数器**（interfaces_count）

### 字段表集合

### 方法表集合

### 属性表集合


[酷 壳 – CoolShell《实例分析JAVA CLASS的文件结构》](https://coolshell.cn/articles/9229.html)