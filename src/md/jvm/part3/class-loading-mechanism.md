---
title: 类加载机制
description:
author: 流浪码客
isOriginal: true
date: 2024-07-20
category: JVM
tag: JVM
order: 7.3
---

# 类加载机制

## 类的生命周期

> 类的生命周期将会经历**加载** （Loading）、**验证**（Verification）、**准备**（Preparation）、**解析**（Resolution）、**初始化**（Initialization）、**使用**（Using）和**卸载**（Unloading）七个阶段

* 其中加载、验证、准备、初始化和卸载这五个阶段的顺序是确定的，按部就班地开始。
* 解析阶段不一定，某些情况下可以在初始化之后，以支持Java的运行时绑定（动态绑定）特性。

![类的生命周期](https://img.geekyspace.cn/pictures/2024/202407260441081.png)

* 注：并非所有的类都会经历完整的生命周期，有些类可能在某些阶段就结束其在JVM中的生涯。

## Class实例何时被创建

在Java虚拟机(JVM)规范中，类的**加载**过程是由JVM自行决定的，但**初始化**过程则必须严格按照规范执行。
（在初始化之前，类的加载、验证、准备阶段必然已经完成）。

### 主动引用（六种情况）

> 在Java虚拟机规范中，“有且只有”以下六种情况会触发类的初始化，称为对一个类的<u>**主动引用**</u>：

1. 创建对象实例、访问静态字段（非常量）、调用静态方法
   * 即遇到`new`、`getstatic`、`putstatic`或`invokestatic`这 4 种字节码指令。
2. **反射调用** 使用`java.lang.reflect`对类型（类和接口）进行反射调用
3. 初始化子类时，先初始化父类
4. **启动主类**，JVM启动时，先初始化包含`main()`方法的主类。
5. **JDK 1.7的动态语言支持**
   * [周志明-解析 JDK 7 的动态类型语言支持](https://www.infoq.cn/article/jdk-dynamically-typed-language/)
   * JDK 1.7 引入`java.lang.invoke.MethodHandle` 动态语言支持，解析静态字段/方法或构造方法时
   * 即解析的句柄属于`REF_getStatic`、`REF_putStatic`、`REF_invokeStatic`或`REF_newInvokeSpecial`四种情况时，会触发目标类初始化。
6. **接口默认方法**初始化规则
   * JDK 1.8 新增`default`默认方法，若实现类初始化，则需要先初始化该接口。

### 被动引用（不触发）

> 除了以上六种场景外，所有其他引用类的方式都不会触发初始化，称为<u>**被动引用**</u>。

* **例1：通过子类引用父类的静态字段，不会导致子类初始化，只有父类会被初始化**
    * 子类是否加载和验证，取决于虚拟机的具体实现。
    * 在HotSpot虚拟机（JDK 1.8 亲测）中，使用`-XX:+TraceClassLoading`观察到此操作会导致子类加载。
* **例2：通过数组定义来引用类，不会触发此类的初始化**
    * 例如，`MyClass[] sca = new MyClass[10];`，不会初始化`MyClass`类
    * 但这段代码触发了另一个名为`[L包名.MyClass`的类的初始化阶段。它是由虚拟机自动生成的、继承自`java.lang.Object`
      的子类，由字节码指令`newarray`触发。这个类表示`MyClass`的一维数组，包含数组应有的属性和方法（如`public`的`length`
      属性和`clone()`方法）。
    * Java语言对数组的访问比C/C++更安全，因为这个类包装了数组元素的访问，C/C++中直接翻译为对数组指针的移动。
      在Java语言里，发生数组越界时会抛出`java.lang.ArrayIndexOutOfBoundsException`异常，避免非法内存访问。
* **例3：引用常量不会触发定义常量的类的初始化**
    * 因为常量在编译阶段就会被存入调用类的常量池中。


### 接口和类“加载与初始化”的差异

**相同点**

* 类 & 接口都经历：加载 → 验证 → 准备 → 解析 → **初始化（`<clinit>()`）**

**差异**

* 接口不能使用`static{}`语句块，但编译器仍会生成`<clinit>()`方法用于初始化静态变量。
* 类在初始化时，其父类必须先初始化。 
* 接口在初始化时不要求父接口初始化，只有在真正使用到父接口的常量等成员时才会触发其初始化。

## 类加载的过程

Java类加载过程主要分为**加载**、**连接**（验证、准备、解析）、**初始化**三个阶段。

### 加载（Loading）

> 1. 通过类的全限定名**读取类的二进制字节流**。
> 2. 并将字节流所代表的 静态存储结构转化为**方法区**的运行时数据结构。
> 3. 在**堆**内存中生成`java.lang.Class`对象，作为方法区这个类的各种数据的的访问入口。

* **类文件来源：**
    * 通常包括本地文件系统、压缩文件（如JAR、WAR）、网络、数据库、加密文件（防止反编译）、运行时动态生成，以及由其他文件生成（如JSP应用生成的Class文件）。
* **数组类加载：**
    * 数组类本身不通过类加载器创建，而是由Java虚拟机直接在内存中构建出来。但数组类的元素类型最终还是靠类加载器来完成加载。

<img src="http://img.geekyspace.cn/pictures/2025/image-20250302011909381.png" alt="image-20250302011909381" style="zoom: 60%;" />

### 连接（Linking）

分为三个阶段：

* **验证**（Verify）：确保字节码符合虚拟机要求 
* **准备**（Prepare）：为字段赋予初始值 
* **解析**（Resolve）：符号引用转换为直接引用

> **验证**（Verify）是连接阶段的第一阶段，目的是确保字节码的正确性和安全性，包括文件格式验证、元数据验证、字节码验证和符号引用验证四个阶段。

验证阶段大致上会完成下面四个阶段的检验动作：

1. **文件格式验证：** 检查字节流是否符合Class文件的格式规范。
2. **元数据验证：** 对类的元数据信息进行语义校验，确保其符合Java语言的语法和语意规则。
3. **字节码验证：** 通过数据流分析和控制流分析，确保字节码指令的合法性和逻辑正确性。
4. **符号引用验证：** 在解析阶段之前，检查符号引用是否能被正确解析。

![验证阶段](http://img.geekyspace.cn/pictures/2025/image-20250302022044718.png)

> **准备**（Prepare）阶段为类中的静态变量分配内存并设置初始值。

静态变量的内存分配发生在**方法区**中。

* 在 JDK 7及之前，HotSpot使用**永久代**（PerGen）来实现方法区，存放在堆内存中。
* 在 JDK 8及之后，永久代被移除，取而代之的是**元空间**（Metaspace），存放在操作系统本地内存中。

<img src="http://img.geekyspace.cn/pictures/2025/image-20250302023259231.png" alt="准备阶段" style="zoom: 60%;" />

> **解析**（Prepare）阶段是Java虚拟机将常量池内的符号引用替换为直接引用的过程。

* **符号引用（Symbolic References）：** 字符串形式表示的对目标的逻辑引用
* **直接引用（Direct References）：** 是直接定位到目标内存位置的指针、偏移量或句柄。

解析动作主要针对<u>类或接口</u>、<u>字段</u>、<u>类方法</u>、<u>接口方法</u>、<u>方法类型</u>、<u>方法句柄</u>和<u>调用点限定符</u>这 7 类符号引用进行。

### 初始化（Initialization）

> 类加载过程的最后一个阶段，负责执行类构造器方法 `<clinit>`。

* **自动生成：** 由javac编译自动生成`<clinit>`，是所有静态变量赋值和静态代码块的集合。
* **非法前向引用：** 静态语句块中只能访问定义在其之前的变量。
* 父类的 `<clinit>` 方法会先于子类的 `<clinit>` 方法执行。
* 如果一个类没有静态语句块和静态变量的赋值操作，那么编译器可能不会生成 `<clinit>` 方法。
* `+TraceClassLoading` 查看类加载过程
* 多线程环境下，类的初始化可能会出现并发问题，JVM会保证`<clinit>`方法的线程安全执行。

## 类加载器

> 加载阶段“通过一个类的全限定名来获取描述该类的二进制字节流”，这个动作的代码被称为“类加载器”（Class Loader）。

### 类与类加载器

一个类在JVM中由其完全限定名和对应的类加载器共同确定唯一性。
即使两个类具有相同的完全限定名，由不同的类加载器加载的，JVM也会将它们视为两个“不相等”的类。

* “不相等” 包括Class对象的`equals`方法，`isAssignableFrom()`方法，`isInstance()`方法的返回结果。

**不同的类加载器对instanceof关键字运算的结果的影响**

```java
/**
 * 类加载器与instanceof关键字演示
 *
 * @author zzm
 */
public class ClassLoaderTest {
    public static void main(String[] args) throws Exception {
        // 创建一个自定义的类加载器
        ClassLoader myLoader = new ClassLoader() {
            @Override
            public Class<?> loadClass(String name) throws ClassNotFoundException {
                try {
                    // 获取类名对应的文件名（去除包名，只保留类名）
                    String fileName = name.substring(name.lastIndexOf(".") + 1) + ".class";
                    // 从当前类路径中加载Class文件
                    InputStream is = getClass().getResourceAsStream(fileName);
                    if (is == null) {
                        // 如果找不到文件，则调用父类加载器加载
                        return super.loadClass(name);
                    }
                    byte[] b = new byte[is.available()];
                    is.read(b);
                    return defineClass(name, b, 0, b.length);
                } catch (IOException e) {
                    throw new ClassNotFoundException(name);
                }
            }
        };

        Object obj = myLoader.loadClass("org.fenixsoft.classloading.ClassLoaderTest").newInstance();
        System.out.println(obj.getClass());
        System.out.println(obj instanceof org.fenixsoft.classloading.ClassLoaderTest);
    }
}
```

运行结果：

```shell
class org.fenixsoft.classloading.ClassLoaderTest
false
```

### 双亲委派模型

双亲委派模型是Java类加载机制的一种设计模式 ，用于确保类的唯一性和安全性。
它规定，类加载器在接收到类加载请求时，首先将该请求委派给父类加载器处理。
如果父类加载器无法完成加载，子类加载器才会尝试加载该类。

![类加载器双亲委派模型（JDK 8及之前）](https://img.geekyspace.cn/pictures/2024/202408100244787.png)

* 从Java虚拟机的角度，类加载器分为两类：
  * 启动类加载器（Bootstrap ClassLoader）：这是Java虚拟机的一部分，使用`C++`实现，负责加载核心类库，如`rt.jar`中的类。这个类加载器不可被Java程序直接引用。
  * 其他类加载器：这些是由Java实现的类加载器，继承自`java.lang.ClassLoader`，并且独立存在于虚拟机之外。
* 从Java开发人员的角度，可以细分为三层类加载器：
  * **启动类加载器**（Bootstrap ClassLoader）：加载`<JAVA_HOME>\lib`目录中的核心类库。
  * **扩展类加载器**（Extension ClassLoader）：加载`<JAVA_HOME>\lib\ext`目录或通过java.ext.dirs指定路径中的扩展类库。
  * **应用程序类加载器**（Application ClassLoader）：加载用户类路径（ClassPath）上的所有类库，通常是程序的默认类加载器。

**双亲委派模型的实现**

```java
protected synchronized Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
    // 首先，检查请求的类是否已经被加载过了
    Class<?> c = findLoadedClass(name);
    
    if (c == null) {  // 如果该类还未被加载
        try {
            if (parent != null) {  // 如果存在父类加载器
                c = parent.loadClass(name, false);  // 让父类加载器尝试加载该类
            } else {
                c = findBootstrapClassOrNull(name);  // 如果没有父类加载器，尝试用引导类加载器加载
            }
        } catch (ClassNotFoundException e) {
            // 如果父类加载器抛出 ClassNotFoundException
            // 说明父类加载器无法完成加载请求，继续在本加载器中寻找
        }

        if (c == null) {
            // 在父类加载器无法加载时
            // 调用本加载器的 findClass 方法来加载类
            c = findClass(name);
        }
    }
    
    if (resolve) {
        resolveClass(c);
    }
    
    return c;  // 返回加载的类
}
```

### 破坏双亲委派模型

双亲委派模型并不是强制性约束的模型，直到Java模块化出现为止，出现过3次较大规模“被破坏”的情况。

**第 1 次被破坏：**

在JDK 1.2之前，由于没有双亲委派模型的约束，开发者可以直接覆盖 `loadClass()` 方法。
为了兼容现有代码并引导开发者遵循双亲委派模型，JDK 1.2引入了 `findClass()`
方法，建议开发者重写该方法而非直接覆盖 `loadClass()`。

* **loadClass()：** 双亲委派模型的实现，父类加载异常时，调用 `findClass()` 方法进行加载。
* **findClass()：** 自定义类加载器具体实现。

---

**第 2 次被破坏：** 

由于基础类型有时需调用用户代码，如JNDI（Java命名和目录接口）加载SPI（服务提供者接口）代码，这打破了双亲委派模型的层次结构来逆向使用类加载器。

* Java引入一个不太优雅的设计：线程上下文类加载器，来实现SPI加载。当SPI的服务提供者多于一个的时候，代码就只能根据具体提供者的类型来硬编码判断。
* 为了消除这种极不优雅的实现方式，在JDK 6时，引入了 `java.util.ServiceLoader`，以 `META-INF/services`
  中的配置信息，辅以责任链模式，提供了更合理的SPI加载方式。

---

**第 3 次被破坏：**

由于用户对程序动态性的追求，如代码热替换（Hot Swap）和模块热部署（Hot Deployment），导致双亲委派模型在OSGi中再次“被破坏”。
这种“动态性”在大型系统或企业级软件中尤其重要，因为频繁重启生产系统可能会被视为生产事故。

* **OSGi中的类加载器机制：** 
  * 每个OSGi模块（Bundle）都有一个独立的类加载器。更换 Bundle 时，同时替换其类加载器，实现代码热替换。
* **类加载顺序：**
    * 以 `java.*` 开头的类由父类加载器加载。
    * 委派列表内的类由父类加载器加载。
    * Import 列表中的类由 Export 该类的 Bundle 加载器加载。
    * 当前 Bundle 的 ClassPath 中的类由自己的类加载器加载。
    * Fragment Bundle 中的类由对应的类加载器加载。
    * Dynamic Import 列表中的类由对应 Bundle 的类加载器加载。
    * 若以上均失败，则类加载失败。