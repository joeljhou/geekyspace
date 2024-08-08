---
title: 类文件结构
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-07-19
category: JVM
tag: JVM
---

# 类文件结构

> 计算机只能运行由0和1构成的二进制格式。
> 要运行Java程序，必须先通过Java虚拟机（JVM）执行编译后的Java代码，这个编译后的代码就是**Java字节码**，存储在`.class`类文件中。

## 跨平台的基石

Java字节码具有“平台无关性”和“语言无关性”。

* **平台无关性：** 字节码可以在任何支持JVM的平台上运行，实现“一次编写，到处运行”
* **语言无关性：** 多种编程语言可以编译成字节码并在JVM（GraalVM）上运行，不仅限于Java

![Java虚拟机提供的语言无关性](https://img.geekyspace.cn/pictures/2024/202407200209120.png)

## Class类文件结构（理论）

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

> **魔数：** 用于验证文件是否为有效的Class文件，其值固定为`0xCAFEBABE`。

* 不仅限于Class文件，其他文件格式如`GIF`或`JPEG`等，也使用魔数来进行身份识别。
  * GIF文件：`47 49 46 38`
  * JPEG文件：`FF D8 FF E0`

在Java被称为“Oak”语言时期（大约1991年前后），`0xCAFEBABE`被选为魔数。
Java开发小组关键成员Patrick Naughton提到，他们选择这个值是因为它好玩且容易记忆，
象征着著名咖啡品牌Peet’s Coffee深受欢迎的Baristas咖啡，也预示着日后“Java”这一商标名称的出现。

### Class文件版本号

> **版本号：** 紧跟魔数之后，占4个字节，包含主版本号和次版本号，用于标识Class文件的版本。

* 第5~6字节：次版本号（Minor Version）
* 第7~8字节：主版本号（Major Version），Java 8 = 52.0

Java 的主版本号从 JDK 1.0 的 45 开始，每次大版本发布都会+1；
次版本号通常保持为0，对应一些次要的特性改进或修复。

**Class文件版本号：**

支持高版本JDK编译出兼容低版本JDK的类，例如使用JDK 1.8版本，编译出1.7版本的class：

```shell
javac –source 1.8 –target 1.7 Example.java
```

注：从JDK 9开始，`javac`编译器不再支持使用`-source`参数编译版本号小于1.5的源码。

### 常量池

> **常量池：** 紧随版本号之后，可以理解成Class文件的资源仓库。存放各种常量信息，如字符串常量、类和接口名、字段名和方法名等。

* 与其他数据关联最多，占用空间最大，也是第一个出现的表类型数据项`cp_info`。

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

> **访问标志：** 紧随常量池之后，占2个字节，表示类或接口的访问权限和属性，如是否为`public`、`abstract`、`final`等。

* 访问标志不仅用于描述类或接口，在字段表和方法表中也存在各自的访问标志。

**类和接口的访问标志（access_flags）**

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

> **类索引、父类索引与接口索引集合：** 用于确定类的继承和实现关系，分别指出当前类，父类，以及所实现的接口。

* **类索引（`this_class`）：** 当前类的全限定名
* **父类索引（`super_class`）：** 父类的全限定名
* **接口索引集合（`interfaces`）：** 当前类实现的所有接口

对于接口索引集合，首项为`u2`类型的接口计数器`interfaces_count`，表示索引表的容量。
如果该类没有实现任何接口，则该计数器值为0，后面接口的索引表不再占用任何字节。
否则每个索引指向常量池中的一个`CONSTANT_Class_info`类型的接口名称

**类索引查找全限定名的过程**

类索引和父类索引都是`u2`类型的索引值，指向`CONSTANT_Class_info`常量，再通过`CONSTANT_Class_info`常量中的索引值，找到定义在`CONSTANT_Utf8_info`中的全限定名字符串

![类索引查找全限定名的过程](https://img.geekyspace.cn/pictures/2024/202407251001215.png)

### 字段表集合

> **字段表（`field_info`）：** 描述类或接口中声明的字段。

[JVM虚拟机规范第四章-字段表](https://docs.oracle.com/javase/specs/jvms/se22/html/jvms-4.html#jvms-4.5)
定义了结构：

```java
field_info {
  u2             access_flags;
  u2             name_index;
  u2             descriptor_index;
  u2             attributes_count;
  attribute_info attributes[attributes_count];
}
```

**1、字段访问标志（`access_flags`）**

与类中的`access_flags`类似，都是一个`u2`的数据类型，取值如下表：

| 标志名称          | 标志值    | 含义               |
|---------------|--------|------------------|
| ACC_PUBLIC    | 0x0001 | 字段是否 `public`    | 
| ACC_PRIVATE   | 0x0002 | 字段是否 `private`   |
| ACC_PROTECTED | 0x0004 | 字段是否 `protected` |
| ACC_STATIC    | 0x0008 | 字段是否 `static`    |
| ACC_FINAL     | 0x0010 | 字段是否 `final`     |
| ACC_VOLATILE  | 0x0040 | 字段是否 `volatile`  |
| ACC_TRANSIENT | 0x0080 | 字段是否 `transient` |
| ACC_SYNTHETIC | 0x1000 | 字段是编译器自动产生       |
| ACC_ENUM      | 0x4000 | 字段是否 `enum`      |

受Java语法规则的约束：

* `public`、`private`、`protected` 只能三选一
* `final`、`volatile`不能同时选择
* 接口中的字段必须有 `public`、`static`和`final`

**2、简单名称（`name_index`）和描述符（`descriptor_index`）**

跟随`access_flags`标志之后的两项索引值；以及**全限定名**这三种特殊字符串的概念解释：

* 全限定名：表示字段或方法在类中的完整路径，包括包名和类名。例如`java.lang.String`
* 简单名称：表示字段或方法的名称。例如`name`是字段的简单名称，`toString`是方法的简单名称
* 描述符：表示字段或方法的类型信息
  * 对于字段，描述符表示字段的类型，例如`I`表示`int`类型
  * 对于方法，描述符表示方法的参数和返回类型，例如`(I)V`表示接受`int`参数且无返回值的方法

**描述符标识字符含义**

| 标识字符 | 含义                           |
|------|------------------------------|
| B    | 基本类型 `byte`                  |
| C    | 基本类型 `char`                  |
| D    | 基本类型 `double`                |
| F    | 基本类型 `float`                 |
| I    | 基本类型 `int`                   |
| J    | 基本类型 `long`                  |
| S    | 基本类型 `short`                 |
| Z    | 基本类型 `boolean`               |
| V    | 特殊类型 `void`                  |
| L    | 对象类型，例如 `Ljava/lang/Object;` |

**3、属性表集合**

Class文件、字段表、和方法表都包含各自的属性表集合，用于记录特定场景下的附加信息。
每个属性表集合由属性计数（`attributes_count`）和若干属性信息（`attribute_info`）组成。

* **属性计数 (`attributes_count`)：** 表示该集合中包含的属性个数
* **属性信息 (`attribute_info`)：** 每个属性的信息结构，提供详细的元数据

### 方法表集合

> **方法表（`method_info`）：** 描述类或接口中声明的方法。

[JVM虚拟机规范第四章-方法表](https://docs.oracle.com/javase/specs/jvms/se22/html/jvms-4.html#jvms-4.6)
定义了结构，与属性表相似：

```java
method_info {
    u2             access_flags;
    u2             name_index;
    u2             descriptor_index;
    u2             attributes_count;
    attribute_info attributes[attributes_count];
}
```

**1、方法访问标志（`access_flags`）**

* 去除`volatile`和`transient`关键字，不能修饰方法
* 新增`synchronized`、`native`、`strictfp`和`abstract`关键字

| 标志名称             | 标志值    | 含义                   |
|------------------|--------|----------------------|
| ACC_PUBLIC       | 0x0001 | 方法是否为 `public`       |
| ACC_PRIVATE      | 0x0002 | 方法是否为 `private`      |
| ACC_PROTECTED    | 0x0004 | 方法是否为 `protected`    |
| ACC_STATIC       | 0x0008 | 方法是否为 `static`       |
| ACC_FINAL        | 0x0010 | 方法是否为 `final`        |
| ACC_SYNCHRONIZED | 0x0020 | 方法是否为 `synchronized` |
| ACC_BRIDGE       | 0x0040 | 方法是否是由编译器产生的桥接方法     |
| ACC_VARARGS      | 0x0080 | 方法接受不定参数             |
| ACC_NATIVE       | 0x0100 | 方法是否为 `native`       |
| ACC_ABSTRACT     | 0x0400 | 方法是否为 `abstract`     |
| ACC_STRICT       | 0x0800 | 方法是否为 `strictfp`     |
| ACC_SYNTHETIC    | 0x1000 | 方法是否由编译器自动产生         |

**2、方法的代码`Code`**

方法的定义可以通过访问标志、名称索引、描述符索引来表达清楚。
而方法的代码，经过`javac`编译成[字节码指令](/md/jvm/basics/bytecode)后存放在**方法属性表集合**中的`Code`的属性中。

### 属性表集合

> **属性表：** 用于存储一些额外的信息，如源文件名称、编译器版本等。

* Class文件、字段表、和方法表都可以携带自己的属性表集合，以描述某些场景专有的信息。
* 其限制相对宽松，不要求具有严格顺序。编译器可向属性表写入自定义信息，JVM运行时会忽略不认识的属性。

**虚拟机规范预定义的属性**

| 属性名称                                 | 使用位置              | 含义                                                                                                                                                                                                 |
|--------------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Code                                 | 方法表               | Java代码编译成的字节码指令                                                                                                                                                                                    |
| ConstantValue                        | 字段表               | 由`final`关键字定义的常量值                                                                                                                                                                                  |
| Deprecated                           | 类、方法表、字段表         | 被声明为`deprecated`的方法和字段                                                                                                                                                                             |
| Exceptions                           | 方法表               | 方法抛出的异常列表                                                                                                                                                                                          |
| EnclosingMethod                      | 类文件               | 仅当一个类为局部类或者匿名类时才可能拥有此属性，用于标示此类存在的外部方法                                                                                                                                                              |
| InnerClasses                         | 类文件               | 内部类列表                                                                                                                                                                                              |
| LineNumberTable                      | Code属性            | Java代码的行号与字节码指令的对应关系                                                                                                                                                                               |
| LocalVariableTable                   | Code属性            | 方法的局部变量信息                                                                                                                                                                                          |
| StackMapTable                        | Code属性            | JDK6新增属性，供新的类型检查验证器（Type Checker）检查和处理目标方法的局部变量和操作数栈所需要的类型是否匹配                                                                                                                                     |
| Signature                            | 类、方法表、字段表         | JDK5新增属性，用于支持泛型标记下的方法签名。在 Java 语言中，任何类、接口、初始化方法或成员的字段如果包含了类型变量（Type Variables）或参数化类型（Parameterized Types），则 Signature 属性会记录泛型签名信息。由于 Java 的泛型采用擦除实现，为了能够在泛型擦除后还能确保签名信息，可以通过 Signature 属性记录泛型签名相关信息 |
| SourceFile                           | 类文件               | 记录源文件名称                                                                                                                                                                                            |
| SourceDebugExtension                 | 类文件               | JDK5新增属性，用于存储额外的调试信息。譬如如在 JSP 文件调试时，无法通过 Java 推栈来推导到 JSP 文件的代码。JSR 45 提议的运行时通过插桩机制向虚拟机中的程序提供了一种进行调试的标准机制，使用该属性可以用于存储插桩时额外新增的调试信息                                                                   |
| Synthetic                            | 类、方法表、字段表         | 标示为编译器自动生成的代码                                                                                                                                                                                      |
| LocalVariableTypeTable               | 类                 | JDK5新增属性，使用扩展的签名标示符，是为了引入泛型方法之后能描述泛型参数的类型而添加                                                                                                                                                       |
| RuntimeVisibleAnnotations            | 类、方法表、字段表         | JDK5新增属性，为动态注解提供支持。该属性用于指明哪些注解是在运行时（实际在运行时就意味着反射调用）可见的                                                                                                                                             |
| RuntimeInvisibleAnnotations          | 类、方法表、字段表         | JDK5新增属性，与 RuntimeVisibleAnnotations 属性作用相反，用于指明哪些注解是在运行时不可见的                                                                                                                                      |
| RuntimeVisibleParameterAnnotations   | 方法表               | JDK5新增属性，作用与 RuntimeVisibleAnnotations 属性类似，只不过作用对象为方法参数                                                                                                                                           |
| RuntimeInvisibleParameterAnnotations | 方法表               | JDK5新增属性，作用与 RuntimeInvisibleAnnotations 属性类似，只不过作用对象为方法参数                                                                                                                                         |
| AnnotationDefault                    | 方法表               | JDK5新增属性，用于记录注解类型元素默认值                                                                                                                                                                             |
| BootstrapMethods                     | 类文件               | JDK7新增属性，用于保存 invokedynamic 指令引用的引导方法限定符                                                                                                                                                           |
| RuntimeVisibleTypeAnnotations        | 类、方法表、字段表、Code 属性 | JDK8新增属性，为实现 JSR 308 中新增的类型注解提供的支持。用于指明哪些注解是在运行时（实际在运行时意味着反射调用）可见的                                                                                                                                 |
| RuntimeInvisibleTypeAnnotations      | 类、方法表、字段表、Code 属性 | JDK8新增属性，为实现 JSR 308 中新增的类型注解提供的支持。与 RuntimeVisibleTypeAnnotations 属性作用相反，用于指明哪些注解是在运行时不可见的                                                                                                        |
| MethodParameters                     | 方法表               | JDK8新增属性，用于支持（编译时加上 -parameters 参数）将方法参数名称保存进 Class 文件中，并可运行时获取此数据。此数据可用于方法参数名称（典型的如 IDE 的代码提示）只能通过 Javadoc 中得到                                                                                    |
| Module                               | 类                 | JDK9新增属性，用于记录一个 Module 的名称以及相关信息（requires、exports、opens、uses、provides）                                                                                                                             |
| ModulePackages                       | 类                 | JDK9新增属性，用于记录一个模块中所有存在 exports 或者 opens 的包                                                                                                                                                         |
| ModuleMainClass                      | 类                 | JDK9新增属性，用于指定一个模块的主类                                                                                                                                                                               |
| NestHost                             | 类                 | JDK11新增属性，用于支持嵌套类（Java中的内部类）的成员和访问控制的 API。——宿主类通过此属性知道自己有哪些内部类                                                                                                                                     |
| NestMembers                          | 类                 | JDK11新增属性，用于支持嵌套类（Java中的内部类）的成员和访问控制的 API。——宿主类通过此属性知道自己有哪些内部类                                                                                                                                     |

[JVM虚拟机规范第四章-属性表](https://docs.oracle.com/javase/specs/jvms/se22/html/jvms-4.html#jvms-4.7)
定义了结构：

```shell
attribute_info {
    u2 attribute_name_index;
    u4 attribute_length;
    u1 info[attribute_length];
}
```

对于每个属性，其名称从常量池中引用1个`CONSTANT_Utf8_info`表示，
通过1个`u4`的`attribute_length`说明属性值的字节数，属性值的结构完全自定义。

1. Code属性
2. Exceptions属性
3. LineNumberTable属性
4. LocalVariableTable及LocalVariableTypeTable属性
5. SourceFile及SourceDebugExtension属性
6. ConstantValue属性
7. InnerClasses属性
8. Deprecated及Synthetic属性
9. StackMapTable属性
10. Signature属性
11. BootstrapMethods属性
12. MethodParameters属性
13. 模块化相关属性
14. 运行时注解相关属性


## 编译字节码分析（实践）

使用`javac Main.java`命令，编译生成`Main.class`文件：

```java
public class Main {

    private int m;

    public int inc() {
        return m + 1;
    }
}
```

使用[WinHex](https://www.ghxi.com/winhex.html)(十六进制编辑器) 打开`.class`文件查看：

```shell
CA FE BA BE 00 00 00 3D 00 13 0A 00 02 00 03 07
00 04 0C 00 05 00 06 01 00 10 6A 61 76 61 2F 6C
61 6E 67 2F 4F 62 6A 65 63 74 01 00 06 3C 69 6E
69 74 3E 01 00 03 28 29 56 09 00 08 00 09 07 00
0A 0C 00 0B 00 0C 01 00 04 4D 61 69 6E 01 00 01
6D 01 00 01 49 01 00 04 43 6F 64 65 01 00 0F 4C
69 6E 65 4E 75 6D 62 65 72 54 61 62 6C 65 01 00
03 69 6E 63 01 00 03 28 29 49 01 00 0A 53 6F 75
72 63 65 46 69 6C 65 01 00 09 4D 61 69 6E 2E 6A
61 76 61 00 21 00 08 00 02 00 00 00 01 00 02 00 
0B 00 0C 00 00 00 02 00 01 00 05 00 06 00 01 00
0D 00 00 00 1D 00 01 00 01 00 00 00 05 2A B7 00
01 B1 00 00 00 01 00 0E 00 00 00 06 00 01 00 00
00 01 00 01 00 0F 00 10 00 01 00 0D 00 00 00 1F
00 02 00 01 00 00 00 07 2A B4 00 07 04 60 AC 00
00 00 01 00 0E 00 00 00 06 00 01 00 00 00 06 00
01 00 11 00 00 00 02 00 12
```

* `CA FE BA BE`：**魔数**，用于标识Class文件格式
* `00 00 00 3D`：**版本号**，其中`00 00`是次版本号，`00 3D`是主版本号（61，对应Java17）
* `00 13`：**常量池计数**，`0x13`十进制为19，第0项常量空出，因此常量池中有18个常量

使用`javap -verbose Main`命令查看**常量池**：

```shell
Constant pool:
   #1 = Methodref          #2.#3          // java/lang/Object."<init>":()V
   #2 = Class              #4             // java/lang/Object
   #3 = NameAndType        #5:#6          // "<init>":()V
   #4 = Utf8               java/lang/Object
   #5 = Utf8               <init>
   #6 = Utf8               ()V
   #7 = Fieldref           #8.#9          // Main.m:I
   #8 = Class              #10            // Main
   #9 = NameAndType        #11:#12        // m:I
  #10 = Utf8               Main
  #11 = Utf8               m
  #12 = Utf8               I
  #13 = Utf8               Code
  #14 = Utf8               LineNumberTable
  #15 = Utf8               inc
  #16 = Utf8               ()I
  #17 = Utf8               SourceFile
  #18 = Utf8               Main.java
```

* `00 21`：**访问标志**，`ACC_PUBLIC`（public）和`ACC_SUPER`（super）

![类索引查找全限定名的过程](https://img.geekyspace.cn/pictures/2024/202407251001215.png)

* `00 08`：**类索引**，指向常量池第8项`#8 = Class #10 // Main`，表示当前类是`Main`
* `00 02`：**父类索引**，指向常量池第2项`#2 = Class #4 // java/lang/Object`，表示父类是`Object`
* `00 00`：**接口计数器**，为0表示该类没有实现任何接口，所以**接口索引集合**为空
* `00 01`：**字段计数器**，表示有1个字段
* `00 02 00 0B 00 0C 00 00`: **字段表集合**
  * `access_flags`：`00 02`表示`private`访问权限
  * `name_index`：`00 0B`指向常量池中的第11项`#11 = Utf8 m`，表示字段名为`m`
  * `descriptor_index`：`00 0C`指向常量池中的第12项`#12 = Utf8 I`，表示字段类型为`int`
  * `attributes_count`：`00 00`表示没有属性，所以`attribute_info`为空
* `00 02`：**方法计数器**，表示有2个方法

使用`javap -verbose Main`命令查看**方法表集合**，
或使用[IDEA jclasslib插件](https://plugins.jetbrains.com/plugin/9248-jclasslib-bytecode-viewer)查看：

```shell
{
  public Main();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 1: 0

  public int inc();
    descriptor: ()I
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: getfield      #7                  // Field m:I
         4: iconst_1
         5: iadd
         6: ireturn
      LineNumberTable:
        line 6: 0
}
```

[酷 壳 – CoolShell《实例分析JAVA CLASS的文件结构》](https://coolshell.cn/articles/9229.html)