---
title: 字节码指令集
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-07-26
category: JVM
tag: JVM
---

# 字节码指令集

> 字节码指令集是Java虚拟机（JVM）能理解和执行的低级指令集合。具体保存在Java类文件（`.class`）的方法区部分，由操作码和操作数组成。

- **操作码（`Opcode`）：** 一个字节长度的数字，代表某种特定操作
- **操作数（`Operands`）：** 跟随操作码之后的零至多个参数，用于该操作所需的数据

由于JVM采用面向操作数栈而不是面向寄存器的架构，大多数指令都不包含操作数，只有一个操作码，指令参数存放在操作数栈中。

## 操作码助记符

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

## 操作码表

使用数据类型对应的操作码助记符替换操作码`opcode`列指令模板中的`T`，得到具体的字节码指令。

参考下表**Java虚拟机指令集所支持的数据类型**。

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

## 字节码指令分类

### 加载和存储指令

> 加载和存储指令用于在栈帧中的局部变量表和操作数栈之间传输数据。

- **将局部变量加载到操作数栈**
    * 整数加载指令：`iload`、`iload_<n>`
    * 长整型加载指令：`lload`、`lload_<n>`
    * 浮点型加载指令：`fload`、`fload_<n>`
    * 双精度浮点型加载指令：`dload`、`dload_<n>`
    * 引用类型加载指令：`aload`、`aload_<n>`
- **将数值从操作数栈存储到局部变量表**
    * 整数存储指令：`istore`、`istore_<n>`
    * 长整型存储指令：`lstore`、`lstore_<n>`
    * 浮点型存储指令：`fstore`、`fstore_<n>`
    * 双精度浮点型存储指令：`dstore`、`dstore_<n>`
    * 引用类型存储指令：`astore`、`astore_<n>`
- **将常量加载到操作数栈**
    * 字节常量加载指令：`bipush`
    * 短整型常量加载指令：`sipush`
    * 常量池加载指令：`ldc`、`ldc_w`、`ldc2_w`
    * 空常量加载指令：`aconst_null`
    * 整数常量加载指令：`iconst_m1`、`iconst_<i>`
    * 长整型常量加载指令：`lconst_<l>`
    * 浮点型常量加载指令：`fconst_<f>`
    * 双精度浮点型常量加载指令：`dconst_<d>`
- **扩充局部变量表访问索引的指令**
    * 扩展索引指令：`wide`

加载和存储指令主要用于操作数栈和局部变量表之间的数据传输。
此外，一些指令（如访问对象字段或数组元素的指令）也会涉及操作数栈的数据传输。

### 运算指令

> 算术指令用于对两个操作数栈上的值进行特定运算，并将结果重新存入到操作栈顶。

- **算术指令列表：**
    * 加法指令：`iadd`、`ladd`、`fadd`、`dadd`
    * 减法指令：`isub`、`lsub`、`fsub`、`dsub`
    * 乘法指令：`imul`、`lmul`、`fmul`、`dmul`
    * 除法指令：`idiv`、`ldiv`、`fdiv`、`ddiv`
    * 求余指令：`irem`、`lrem`、`frem`、`drem`
    * 取反指令：`ineg`、`lneg`、`fneg`、`dneg`
    * 位移指令：`ishl`、`ishr`、`iushr`、`lshl`、`lshr`、`lushr`
    * 按位或指令：`ior`、`lor`
    * 按位与指令：`iand`、`land`
    * 按位异或指令：`ixor`、`lxor`
    * 局部变量自增指令：`iinc`
    * 比较指令：`dcmpg`、`dcmpl`、`fcmpg`、`fcmpl`、`lcmp`

### 类型转换指令

> 类型转换指令可以将两种不同的数值类型相互转换。
> 用于实现用户代码中的显式类型转换操作，或处理字节码指令集中数据类型相关指令无法与数据类型一一对应的问题。

- **宽化类型转换：** 即小范围类型向大范围类型的安全转换
    * `int`类型到`long`、`float`或者`double`类型
    * `long`类型到`float`、`double`类型
    * `float`类型到`double`类型
- **窄化类型转换：** 与“宽化”相对，需显式指令，可能导致正负号变化和精度丢失
    * `i2b`、`i2c`、`i2s`、`l2i`、`f2i`、`f2l`、`d2i`、`d2l`、`d2f`

### 对象创建与访问指令

虽然类实例和数组都是对象，但Java虚拟机对类实例和数组的创建与操作使用了不同的字节码指令。
对象创建后，可以通过对象访问指令来获取对象实例或数组中的字段或者数组元素。

- **对象创建指令**
    * 创建类实例：`new`
    * 创建数组：`newarray`、`anewarray`、`multianewarray`
- **对象访问指令**
    * 访问字段：`getfield`、`putfield`、`getstatic`、`putstatic`
    * 访问数组元素：`baload`、`caload`、`saload`、`iaload`、`laload`、`faload`、`daload`、`aaload`
    * 存储数组元素：`bastore`、`castore`、`sastore`、`iastore`、`fastore`、`dastore`、`aastore`
    * 数组操作：`arraylength`
    * 类型检查和转换：`instanceof`、`checkcast`

### 操作数栈管理指令

如同操作一个普通数据结构中的堆栈那样，Java虚拟机提供了一些用于直接操作操作数栈的指令，包括：

- **操作数栈管理指令**
    * 出栈：`pop`、`pop2`
    * 复制栈顶元素：`dup`、`dup2`、`dup_x1`、`dup2_x1`、`dup_x2`、`dup2_x2`
    * 互换栈顶两个元素：`swap`

### 控制转移指令

> 控制转移指令用于在程序执行过程中有条件或无条件地跳转到其他指令位置，修改程序计数器（PC）的值。

- **条件分支**
    * `ifeq`、`iflt`、`ifle`、`ifne`、`ifgt`、`ifge`
    * `ifnull`、`ifnonnull`
    * `if_icmpeq`、`if_icmpne`、`if_icmplt`、`if_icmpgt`、`if_icmple`、`if_icmpge`
    * `if_acmpeq`、`if_acmpne`
- **复合条件分支**
    * `tableswitch` — 使用表的方式处理范围内的分支
    * `lookupswitch` — 使用查找表的方式处理分支
- **无条件分支**
    - `goto`、`goto_w` — 无条件跳转到指定位置
    - `jsr`、`jsr_w` — 跳转到子程序并保存返回地址
    - `ret` — 从子程序返回

所有比较最终都转为`int`类型，Java虚拟机提供了丰富的 `int` 类型条件分支指令：

* `boolean`、`byte`、`char`和`short`直接使用`int`类型指令
* `long`、`float` 和 `double`先用对应比较指令，再转换为`int`进行条件分支

### 方法调用和返回指令

- **方法调用（分派、执行过程）** 分为以下五种指令，用于不同类型的方法调用：
    * `invokevirtual`：调用对象的实例方法，依据对象的实际类型进行分派（虚方法分派），最常见
    * `invokeinterface`：调用接口方法，运行时搜索实现了接口的方法
    * `invokespecial`：调用需要特殊处理的实例方法，如实例初始化方法、私有方法和父类方法
    * `invokestatic`：调用类静态方法（static方法）
    * `invokedynamic`：运行时动态解析和调用方法，分派逻辑由用户定义
- **方法返回指令** 根据返回值的类型区分，包括：
    * `ireturn`：返回 `boolean`、`byte`、`char`、`short` 和 `int` 类型的值
    * `lreturn`：返回 `long` 类型的值
    * `freturn`：返回 `float` 类型的值
    * `dreturn`：返回 `double` 类型的值
    * `areturn`：返回引用类型的值
    * `return`：用于声明为 `void` 的方法、实例初始化方法、类初始化方法

### 异常处理指令

在Java程序中，**显式抛出异常**（`throw` 语句）由`athrow`指令实现。

除了显式抛出异常，在JVM指令检测到异常状况时，会自动抛出**运行时异常**。
例如，在整数运算中，当除数为零时，虚拟机会在`idiv`或`ldiv`指令中抛出`ArithmeticException`异常。

处理异常（`catch` 语句）在Java虚拟机中不是通过字节码指令实现的，而是采用**异常表**来完成。

### 同步指令

Java虚拟机支持方法级的同步和方法内部一段指令序列的同步，这两种同步结构都是使用**管程**（Monitor，通常称为“锁”）来实现的。

**方法级同步**

方法级同步是隐式的，通过方法调用和返回操作实现。
虚拟机从方法常量池中的方法表结构中的 `ACC_SYNCHRONIZED` 访问标志来判断方法是否被声明为同步方法。同步方法的执行过程如下：

1. 方法调用时，检查 `ACC_SYNCHRONIZED` 标志。
2. 如果设置了该标志，执行线程需先成功持有管程，然后才能执行方法。
3. 方法执行完成（无论正常还是异常）后，释放管程。
4. 在方法执行期间，持有管程的线程独占管程，其他线程无法获取同一个管程。

**指令序列同步**

同步一段指令集序列由 `synchronized` 语句块表示。Java虚拟机的指令集中有 `monitorenter` 和 `monitorexit` 两条指令来支持 `synchronized` 关键字的语义。以下是一个示例代码及其编译后的字节码序列：

```java
void onlyMe(Foo f) {
    synchronized(f) {
        doSomething();
    }
}
```

编译后的字节码序列：

```shell
Method void onlyMe(Foo)
0  aload_1       // 将对象f入栈
1  dup           // 复制栈顶元素（即f的引用）
2  astore_2      // 将栈顶元素存储到局部变量表变量槽 2中
3  monitorenter  // 以栈顶元素（即f）作为锁，开始同步
4  aload_0       // 将局部变量槽 0（即this指针）的元素入栈
5  invokevirtual #5 // 调用doSomething()方法
8  aload_2       // 将局部变量槽 2的元素（即f）入栈
9  monitorexit   // 退出同步
10 goto 18       // 方法正常结束，跳转到18返回
13 astore_3      // 异常路径起始，见下面异常表的Target 13
14 aload_2       // 将局部变量槽 2的元素（即f）入栈
15 monitorexit   // 退出同步
16 aload_3       // 将局部变量槽 3的元素（即异常对象）入栈
17 athrow        // 把异常对象重新抛出给onlyMe()方法的调用者
18 return        // 方法正常返回

Exception table:
From    To  Target  Type
    4       10  13      any
    13      16  13      any
```

编译器必须确保无论方法通过何种方式完成，方法中调用过的每条`monitorenter`指令都有其对应的`monitorexit`指令，无论是正常结束还是异常结束。
为了保证在方法异常完成时`monitorenter`和`monitorexit`指令依然正确配对执行，编译器会自动生成一个异常处理程序，用于执行`monitorexit`指令。
