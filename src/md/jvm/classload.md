---
title: 类加载机制
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2024-07-20
category: JVM
tag: JVM
order: 3
---

# 类加载机制

## 类的生命周期

类的生命周期分为以下7个阶段，其中解析可以在初始化之后，以支持Java的运行时绑定特性。

![类的生命周期](https://img.geekyspace.cn/pictures/2024/202407260441081.png)

**类加载过程中的初始化**

在《Java虚拟机规范》中，“有且只有” 以下6种场景会触发初始化，称为对一个类进行**主动引用**。

1. 遇到`new`、`getstatic`、`putstatic`或`invokestatic`字节码指令时，如果类型尚未初始化，则需要先触发其初始化。
2. 对类型进行反射调用时，如果类型还没有初始化，则需要先触发其初始化。
3. 初始化一个类时，如果其父类还没有初始化，则需要先初始化父类。
4. 虚拟机启动时，需要指定一个包含`main()`方法的主类，虚拟机会先初始化这个主类。
5. 使用JDK 1.7引入的动态语言支持时，如果`java.lang.invoke.MethodHandle`
   实例解析结果为`REF_getStatic`、`REF_putStatic`、`REF_invokeStatic`或`REF_newInvokeSpecial`，并且对应类没有初始化，则需要先触发其初始化。
6. 当接口中定义了JDK 1.8新增的默认方法时，如果实现类初始化，则需要先初始化该接口。

除了这六种场景外，所有其他引用类的方式都不会触发初始化，称为**被动引用**。

> 被动引用的例子

**例子一：通过子类引用父类的静态字段，不会导致子类初始化**

```java
package org.fenixsoft.classloading;
class SuperClass {
   static {
      System.out.println("SuperClass init!");
   }
   public static int value = 123;
}

class SubClass extends SuperClass {
   static {
      System.out.println("SubClass init!");
   }
}

public class NotInitialization {
   public static void main(String[] args) {
      // 运行结果只输出“SuperClass init！”，不会输出“SubClass init！”。
      System.out.println(SubClass.value);
   }
}
```

至于是否要触发子类的加载和验证阶段，取决于虚拟机的具体实现。
对于HotSpot虚拟机（JDK1.8亲测），加入`-XX:+TraceClassLoading`观察，此操作是会导致子类加载的。

**例子二：通过数组定义来引用类，不会触发此类的初始化**

```java
package org.fenixsoft.classloading;
public class NotInitialization {
   public static void main(String[] args) {
      // 运行结果没有输出“SuperClass init！”，说明并没有触发类SuperClass的初始化
      SuperClass[] sca = new SuperClass[10];
   }
}
```

但这段代码触发了另一个名为`[Lorg.fenixsoft.classloading.SuperClass`的类的初始化阶段。
它是由虚拟机自动生成的、直接继承于`java.lang.Object`的子类，由字节码指令`newarray`触发。

* 这个类表示`SuperClass`的一维数组，包含数组应有的属性和方法（如`public`的`length`属性和`clone()`方法）。
* Java语言对数组的访问比C/C++更安全，因为这个类包装了数组元素的访问，C/C++中直接翻译为对数组指针的移动。
  在Java语言里，发生数组越界时会抛出`java.lang.ArrayIndexOutOfBoundsException`异常，避免非法内存访问。

**例子三：常量在编译阶段存入调用类的常量池中，不会触发定义常量的类的初始化**

```java
package org.fenixsoft.classloading;
class ConstClass {
    static {
        System.out.println("ConstClass init!");
    }
    public static final String HELLOWORLD = "hello world";
}

public class NotInitialization {
    public static void main(String[] args) {
        // 运行结果没有输出“ConstClass init！”
        System.out.println(ConstClass.HELLOWORLD);
    }
}
```

---

**接口的加载与初始化**

接口的加载过程与类略有不同，具体情况如下：

* 虽然接口不能使用静态语句块`static{}`来输出初始化信息，编译器仍会为接口生成`<clinit>()`类构造器，用于初始化接口中定义的成员变量。
* 接口与类的主要区别在于接口的初始化触发条件。类的初始化需要其所有父类已经初始化，而接口在初始化时不要求其父接口全部初始化。
  接口只有在实际使用父接口中的成员（如引用接口中定义的常量）时，才会进行初始化。

## 类加载的过程

### 加载

在加载阶段，Java虚拟机需要完成以下三件事情：

1. 通过类的全限定名获取定义此类的二进制字节流。
2. 将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构。
3. 在内存中生成一个代表这个类的`java.lang.Class`对象，作为方法区这个类的各种数据的访问入口。

### 验证

### 准备

### 解析

### 初始化

## 类加载器


