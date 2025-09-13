---
title: Java基础 - 从零开始学习Java
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-09-09
category: Java
tags:
  - JavaBasic
---
# 从零开始学习Java
## 1.Java语言的发展历史

### Java特征
Java语言是美国Sun公司（Stanford University Network），在1995年推出的高级的编程语言。
**特征：**
- 面向对象（OOP）
- 跨平台性强（“一次编写，到处运行”）
- 安全性高、可移植性强
### Java之父
![Java之父](http://img.geekyspace.cn/pictures/2025/202509092327337.png)
詹姆斯·高斯林 （James Gosling）是一名软件专家，1955年5月19日出生于加拿大，Java编程语言的共同创始人之一，一般公认他为“Java之父”。
1977年获得了加拿大卡尔加里大学计算机科学学士学位，1983年获得了美国卡内基梅隆大学计算机科学博士学位。
### 发展历史
![Java语言发展史](http://img.geekyspace.cn/pictures/2025/202509092328789.png)
* 2004年推出了Java 1.5版本
* 2009年Sun公司被Oracle甲骨文公司收购
* 2014年推出了Java 8.0版本
### 计算机语言发展历史
1. 第一代**机器语言** 打孔机 二进制010101
2. 第二代**汇编语言** 助记符
3. 第三代**高级编程语言** C、C++、Java、Python 、php、c#等
![机器>汇编>高级语言发展](http://img.geekyspace.cn/pictures/2025/202509092328775.png)
### Java跨平台原理
* **平台** = 操作系统（`Windows`，`Linux`，`Mac`） 
* Java的程序可以在任意的操作系统上运行
![Java跨平台的原理](http://img.geekyspace.cn/pictures/2025/202509092329828.png)
## 2.下载安装使用JDK
### 下载JDK11

JDK11的下载官方网站:
[https://www.oracle.com/java/technologies/javase-jdk11-downloads.html](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
注意：需要注意下载对应不同操作系统版本的JDK

![jdk-11安装包](http://img.geekyspace.cn/pictures/2025/202509092330631.png)


### 安装后目录介绍
傻瓜式安装，下一步

![JDK常见目录](http://img.geekyspace.cn/pictures/2025/202509092330060.png)

![JDK常见目录](http://img.geekyspace.cn/pictures/2025/202509092331631.png)

### 配置JDK环境变量
**1. 为什么需要配置JDK环境变量？**

不配置JDK环境变量的话，就需要每次到JDK安装路径下的Bin目录执行对应的exe文件； 
在环境变量中加入软件的安装路径后，即使没有在该软件的安装目录下，我们在命令行输入软件的名称也可启动该软件。

**2.如何配置环境变量**

右键“此电脑”>>“属性”，在弹出的页面上点击高“高级系统设置”

![环境变量-高级系统设置](http://img.geekyspace.cn/pictures/2025/202509092332594.png)

在弹出的“系统属性”窗口中“高级”标签下点击“环境变量”按钮

![环境变量](http://img.geekyspace.cn/pictures/2025/202509092332253.png)

在弹出的“环境变量”窗口中，点击下方的“新建”按钮，在弹出的“新建系统变量”窗口中，新建一个名为`JAVA_HOME`的环境变量，设置`Path`环境变量

![设置Path环境变量](http://img.geekyspace.cn/pictures/2025/202509092333174.png)

验证是否配置成功，进入win+r输入cmd，输入指令`java -version`

![java -version指令验证](http://img.geekyspace.cn/pictures/2025/202509092333155.png)

JDK8之后的版本只需要配置`JAVA_HOME`，在PATH中添加`JAVA_HOME/bin`即可。

### JRE，JDK，JVM之间的关系
![JDK，JRE，JVM之间的关系](http://img.geekyspace.cn/pictures/2025/202509092330293.png)

### JavaSE，JavaEE，JavaME之间的区别
Java总共有三个版本
1. **标准版Java SE**
	* Java SE 以前称为 J2SE。它允许开发和部署在桌面、服务器、嵌入式环境和实时环境中使用的 Java 应用程序。Java SE 包含了支持 Java Web 服务开发的类；
2. **企业版Java EE**
	* JavaEE是在JavaSE的基础上构建的，用来开发B/S架构软件，也就是开发企业级应用，所以称为企业版帮助开发和部署可移植、健壮、可伸缩且安全的服务器端 Java 应用程序。Java EE 是在 Java SE 的基础上构建的，它提供 Web 服务、组件模型、管理和通信 API；
3. **微型Java ME**
	* Java ME为在移动设备和嵌入式设备（比如手机、PDA、电视机顶盒和打印机）上运行的应用程序提供一个健壮且灵活的环境。Java ME包括灵活的用户界面、健壮的安全模式、许多内置的网络协议以及对于动态下载的连网和离线应用程序的丰富支持。基于Java ME规范的应用程序只需要编写一次，就可以用于许多设备，而且可以利用每个设备的本级功能。

**简而言之**
* JavaSE是Java的基础，主要针对桌面程序开发；
* JavaEE是针对企业级应用开发；
* JavaME是主要针对嵌入式设备软件开发。

### Dos常用命令
![Dos常用命令](http://img.geekyspace.cn/pictures/2025/202509092331468.png)

### 编译运行Java程序
开发java程序，需要三个步骤：**1.编写程序（源代码）>> 2.编译程序 >> 3.运行程序**
1. 新建文本文件，修改名称为`HelloWorld.java`
2. 用记事本打开，编写以下程序
```java
public class HelloWorld{
	public static void main(String[] args){
		System.out.println("HelloWorld!");
	}
}
```
3. 打开命令提示窗口，进入`HelloWorld`所在目录，输入编译和执行命令
```shell
# 编译，生成 .class 字节码文件
javac -encoding UTF-8 HelloWorld.java
# 运行程序（执行字节码）
java HelloWorld
```
![Java程序编译运行流程](http://img.geekyspace.cn/pictures/2025/202509092334223.png)

## 3.Java基础语法
### Java注释
注释是指在程序指定的位置添加的说明信息，不参与运行。**Java 支持三种注释方式：**
1. 单行：`// 注释内容`
2. 多行：`/* 注释内容 */`
3. 文档注释：`/** 注释内容 */`
![Java注释的使用](http://img.geekyspace.cn/pictures/2025/202509092335176.png)
### 什么是关键字
**Java关键字**是电脑语言里事先定义的，**有特别意义的标识符**，有时又叫保留字。
一律用**小写字母标志**，根据用途分为如下分组：
1. **数据类型**：`boolean`、`byte`、`char`、 `double`、 `false`、`float`、`int`、`long`、`new`、`short`、`true`、`void`、`instanceof`。
2. **语句控制**： `break`、`case`、 `catch`、 `continue`、 `default` 、`do`、 `else`、 `for`、 `if`、`return`、`switch`、`try`、 `while`、 `finally`、 `throw`、`this`、 `super`。
3. **修饰符**： `abstract`、`final`、`native`、`private`、 `protected`、`public`、`static`、`synchronized`、`transient`、 `volatile`。
4. **用于类，方法，包，接口和异常**：`class`、 `extends`、 `implements`、`interface`、 `package`、`import`、`throws`。
### 常量与变量
- **常量**：Java中使用`final` 修饰，表示运行中不可变化的量。
- **变量**：在程序运行过程中，可以取不同数值的量；可变，需先声明后使用。
	- 语法：变量的数据类型 变量名称 = 变量的值（赋值操作）；
	- 为整数常量，浮点数常量，字符常量，字符串常量，布尔常量（true，false），NULL是常量
- 命名规则：字母、数字、下划线 `_`、$ 符号开头，不能以数字开头，遵循驼峰命名法
### Java变量命名规则
1. 不能使用Java中的关键字，比如public class void int char等等..
2. 变量名必须以 字母 下划线_ 或者 $ 符号开头
3. 变量名可以包含数字，但是不能够以数字开头
4. 变量名除了 下划线_ 或者 $ 符号以外不能包含其他任何特殊字符

**驼峰命名法**

![驼峰命名法](http://img.geekyspace.cn/pictures/2025/202509092335719.png)
### 存储单位与数据类型
**常见存储单位换算**

数据必须首先在计算机内被表示，然后才能被计算机处理。计算机表示数据的部件主要是存储设备；而存储数据的具体单位是**存储单元**；因此，了解存储单元的结构是十分必要的。
```shell
1 Byte（字节)= 8 bit（位）
1 KB = 1024 Byte
1 MB = 1024 KB
1 GB = 1024 MB
1 TB = 1024 GB
1 PB = 1024 TB
1 EB = 1024 PB
1 ZB = 1024 EB
```
* 计算机中存储设备的最小单元叫”位（bit）”，又称为“比特位”，用小写字母b表示。 
* 计算机中最小存储单元叫”字节（byte）”，用大写字母B表示，字节由8个位组成。

**Java中的数据类型**

Java语言是强类型语言，对于每一个数据都给出明确的数据类型，不同的数据类型也分配了不同的内存空间，所以它们表示的数据大小也是不一样的。
![Java数据类型](http://img.geekyspace.cn/pictures/2025/202509092337025.png)

| **数据类型** | **类型**         | **内存占用** | **取值范围**                                                         |
| -------- | -------------- | -------- | ---------------------------------------------------------------- |
| **整数**   | **byte**       | 1字节      | －128～127                                                         |
|          | **short**      | 2字节      | -32768-32767                                                     |
|          | **int（默认）**    | 4字节      | -2的31次方到2的31次方-1                                                 |
|          | **long**       | 8字节      | -2的63次方到2的63次方-1                                                 |
| **浮点数**  | **float**      | 4字节      | 负数：-3.402823E+38到-1.401298E-45<br>正数：-1.401298E-45到3.402823E+38  |
|          | **double（默认）** | 8字节      | 负数：-1.797693E+308到-4.9000000E-324<br>正数：4.9000000E到1.797693E+308 |
| **字符**   | **char**       | 2字节      | 0-65535                                                          |
| **布尔**   | **boolean**    | 1字节      | true，false                                                       |

说明：E+38表示是乘以10的38次方，同样，E-45表示乘以10的-45次方。
### 类型转换
在 java 程序中，不同的基本类型的值经常需要进行相互类型转换，类型转换分为**自动类型转换**和**强制类型转换**。

![Java数据类型的数据范围从小到大](http://img.geekyspace.cn/pictures/2025/202509092337491.png)

**自动类型转换**： <u>把一个表示数据范围小的数值或者变量赋值给另一个表示数据范围大的变量。</u>
* 例如：`double a = 10；`
* **规律**
	- 小的类型自动转化为大的类型
	- 整数类型可以自动转化为浮点类型，可能会产生舍入误差
	- 字符可以自动提升为整数

**强制类型转换**：<u>把一个表示数据范围大的数值或者变量赋值给另一个表示数据范围小的变量。</u>
* 例如：`int j = (int) 99.99;`
* 在要强制类型转换的前面加上括号，然后在括号里面加上你要转换的类型（强制转换需要程序员手动处理）
### 运算符
* **运算符**：对常量或者变量进行操作的符号
* **表达式**：用运算符吧常量或者变量连接起来的符号
#### 算术运算符

| **操作符** | **说明** | **举例**          |
| ------- | ------ | --------------- |
| **+**   | **加**  | **加法**          |
| **-**   | **减**  | **减法**          |
| **\***  | **乘**  | **乘法**          |
| **/**   | **除**  | **除法**          |
| **%**   | **取余** | **得到两个数做除法的余数** |
| **++**  | **自增** | **变量的值+1**      |
| **--**  | **自减** | **变量的值-1**      |

**搞清楚`i++`，`++i`，`i--`，`--i`的区别?**
* `++i`，表示参与运算之前先自加1.
* `i++`，表示参与运算以后再加1.
* `--i`，`i--` 类似。
#### 关系运算符

| **操作符** | **说明**                               |
| ------- | ------------------------------------ |
| **==**  | **检查如果两个操作数的值是否相等，如果相等则条件为真。**       |
| **!=**  | **检查如果两个操作数的值是否相等，如果值不相等则条件为真。**     |
| **>**   | **检查左操作数的值是否大于右操作数的值，如果是那么条件为真。**    |
| **<**   | **检查左操作数的值是否小于右操作数的值，如果是那么条件为真。**    |
| **>=**  | **检查左操作数的值是否大于或等于右操作数的值，如果是那么条件为真。** |
| **<=**  | **检查左操作数的值是否小于或等于右操作数的值，如果是那么条件为真。** |
* 注意事项：关系运算符的结果都是boolean类型，要么是true，要么是false。
* 千万不要把“==”误写成“=”，“==”是判断是否相等的关系，“=”是赋值。
#### 位运算符

| **操作符** | **说明**                                 |
| ------- | -------------------------------------- |
| **＆**   | 如果相对应位都是1，则结果为1，否则为0                   |
| \|      | 如果相对应位都是 0，则结果为 0，否则为 1                |
| **〜**   | 按位取反运算符翻转操作数的每一位，即0变成1，1变成0。           |
| **^**   | 如果相对应位值相同，则结果为0，否则为1                   |
| **<<**  | 按位左移运算符。左操作数按位左移右操作数指定的位数。左移一位相当于将原数*2 |
| **>>**  | 按位右移运算符。左操作数按位右移右操作数指定的位数。右移一位相当于将原数/2 |
#### 逻辑运算符
逻辑运算符把各个运算的关系表达式联系起来组成一个复杂的逻辑表达式，以判断程序中的表达式是否成立，判断结果是`true`或`false`。

| **操作符** | **说明**    | **举例**                                  |
| ------- | --------- | --------------------------------------- |
| **＆&**  | 逻辑与 运算符。  | 当且仅当两个操作数都为真，条件才为真。                     |
| \|\|    | 逻辑或 操作符。  | 如果任何两个操作数任何一个为真，条件为真。                   |
| **^**   | 逻辑异或 操作符。 | 如果任意两个操作数结构不相同，条件为真，否则条件假               |
| **!**   | 逻辑非 运算符。  | 用来反转操作数的逻辑状态。如果条件为true，则逻辑非运算符将得到false。 |
#### 短路运算符

| **操作符** | **说明** | **举例**            |
| ------- | ------ | ----------------- |
| **＆&**  | 短路与    | 作用和 & 相同，但是有短路效果  |
| \|\|    | 短路或    | 作用和 \| 相同，但是有短路效果 |
* 短路与 &&：如果左边为真，右边执行；如果左边为假，右边不执行。
* 短路或 ||：如果左边为假，右边执行；如果左边为真，右边不执行。
#### 三元运算符 ( ? : )
* **语法是：“条件表达式 ? 表达式1 : 表达式2”；**
	* `?`前面的位置是判断的条件，判断结果为`boolean`型
	* 为`true`时调用**表达式1**，为`false`时调用**表达式2**

![三元运算符](http://img.geekyspace.cn/pictures/2025/202509092339610.png)
### Scanner打印机用法
```java
import java.util.Scanner;  // ① 导包

public class ScannerDemo {
    public static void main(String[] args) {
        // ② 创建对象
        Scanner scan = new Scanner(System.in);

        // ③ 接收数据
        System.out.print("请输入你的名字：");
        String name = scan.nextLine();   // 接收字符串

        System.out.print("请输入你的年龄：");
        int age = scan.nextInt();        // 接收整数

        System.out.print("请输入你的身高(米)：");
        double height = scan.nextDouble(); // 接收小数

        // 输出结果
        System.out.println("------ 信息展示 ------");
        System.out.println("姓名：" + name);
        System.out.println("年龄：" + age);
        System.out.println("身高：" + height + " 米");

        // 关闭Scanner（养成好习惯）
        scan.close();
    }
}
```
### 流程控制语句
#### 顺序结构
是程序中最简单的流程控制，按照代码执行的先后顺序，依次执行，程序中的大多数代码都是这样执行的。

![顺序结构](http://img.geekyspace.cn/pictures/2025/202509092339308.png)
#### 分支结构（if，switch）
选择结构也被称为分支结构。选择结构有特定的语法规则，代码要执行具体的逻辑运算进行判断，逻辑运算的结果有两个，所以产生选择，按照不同的选择执行不同的代码。
##### if语句
```java
// 语法
if(布尔表达式){
    语句体
}
```
![if语句](http://img.geekyspace.cn/pictures/2025/202509092339003.png)
##### if-else语句
```java
// 语法
f(关系表达式) {
    语句体1;
} else {
    语句体2;
}
```
![if-else语句](http://img.geekyspace.cn/pictures/2025/202509092340316.png)
##### 多重if-else语句
```java
// 语法
if (判断条件1) {
    执行语句1
} else if (判断条件2) {
    执行语句2
}
...
else if (判断条件n) {
    执行语句n
} else {
    执行语句n+1
}
```
![多重if-else语句](http://img.geekyspace.cn/pictures/2025/202509092340867.png)
##### switch语句
```java
// 语法
switch(表达式) {
   case目标值1:
	   语句体1;
	   break;
   case目标值2:
	   语句体2;
	   break;
   …
   default:
	   语句体n+1;
	   break;
} 
```
![switch语句](http://img.geekyspace.cn/pictures/2025/202509092340042.png)
#### 循环结构（for，while，do..while）
循环语句可以在满足循环条件的情况下，反复执行某一段代码，这段被重复执行的代码被称为循环体语句，当反复执行这个循环体时，需要在合适的时候把循环判断条件修改为false，从而结束循环，否则循环将一直执行下去，形成死循环。
##### for循环
```java
// 语法
for(初始化表达式;布尔表达式;步进表达式){
	循环体
}
```
![for循环](http://img.geekyspace.cn/pictures/2025/202509092341599.png)
##### **while循环**
```java
// 语法
while(布尔表达式) {
	循环体语句;
}
// 扩展格式
初始化表达式①
while(布尔表达式②){
	循环体③
	步进表达式④
}
```
![while循环](http://img.geekyspace.cn/pictures/2025/202509092341956.png)

##### **do while循环**
```java
// 语法
do{
	循环体语句;
}while(布尔表达式);
// 扩展格式
初始化表达式①
do{
	循环体③
    步进表达式④
}while(布尔表达式②);
```
![do while循环](http://img.geekyspace.cn/pictures/2025/202509092341691.png)

##### 三种不同循环的区别
* `do…while`循环至少会执行一次循环体。
* `for`循环和`while`循环只有在条件成立的时候才会去执行循环体
* `for`循环语句和while循环语句的小区别：
**使用区别：** 控制条件语句所控制的那个变量，在for循环结束后，就不能再被访问到了，而while循环结束还可以继续使用，如果你想继续使用，就用while，否则推荐使用for。原因是for循环结束，该变量就从内存中消失，能够提高内存的使用效率。
#### break和contiune区别
* `break`直接中断当前的整个循环，`continue`跳出本次的循环进入下一次。
* `continue`只能在循环中进行使用。
#### 嵌套for循环语句
可以通过带**标记**的`break`和`continue`结束或跳出多重循环。

![带标签的 break tag](http://img.geekyspace.cn/pictures/2025/202509092342106.png)
## 4.Java 方法
### 什么是方法？
方法的本意是**功能块**，就是实现某个功能的语句块的集合。
### 方法的定义与调用
```java
// 语法
修饰符 返回类型 方法名(参数列表) {
    // 方法体：具体执行的代码
    return 返回值; // 如果有返回类型，必须返回相应类型的值
}
```
各部分解释：
1. 修饰符（modifier）：如 `public`, `private`, `static`，控制方法的访问范围和行为
2. 返回类型（return type）：方法执行后返回的数据类型，如果不返回值则写 `void`
3. 方法名（method name）：方法的名字，命名规则和变量名类似
4. 参数列表（parameters）：方法执行所需的外部数据，可以没有参数
5. 方法体（body）：实际执行的操作
6. 返回值（return）：方法执行后返回的结果，如果返回类型是 `void`，则无需 `return`
**方法的调用**
```java
public class MethodInvoke {
	// 静态方法
    public static void staticMethod() {
        System.out.println("这是静态方法");
    }
    // 无参数、无返回值
    public void sayHello() {
        System.out.println("Hello, Java!");
    }
    // 有参数
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
    // 有返回值
    public int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        // 调用静态方法
        MethodInvoke.staticMethod();

        // 创建对象，调用非静态方法
        MethodInvoke invoke = new MethodInvoke();
        invoke.sayHello();          // 输出问候
        invoke.greet("Alice");      // 输出个性化问候
        System.out.println(invoke.add(5, 7)); // 输出 12
    }
}
```
### 方法的重载
**定义：** 重载就是在一个类中，有相同的函数名称，但形参不同的函数。
* 返回类型可以相同，也可以不同
* **仅靠返回类型不同不能构成重载**
```java
public class OverloadDemo {
    public void show() {
        System.out.println("无参数方法");
    }
    public void show(String name) {
        System.out.println("一个参数：" + name);
    }
    public void show(String name, int age) {
        System.out.println("两个参数：" + name + ", " + age);
    }

    public static void main(String[] args) {
        OverloadDemo demo = new OverloadDemo();

        demo.show();                // 调用无参数方法
        demo.show("Alice");         // 调用一个参数方法
        demo.show("Bob", 25);       // 调用两个参数方法
    }
}

输出：
无参数方法
一个参数：Alice
两个参数：Bob, 25
```
### 命令行传参
有时候你希望运行一个程序时候再传递给它消息。这要靠传递命令行参数给`main()`函数实现。
```java
public class CommandLine {
    public static void main(String[] args) {
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "]: " + args[i]);
        }
    }
}
```
运行方式（文件名为 `CommandLine.java`）：
```shell
javac CommandLine.java
java CommandLine hello world 123
输出结果：
args[0]: hello
args[1]: world
args[2]: 123
```
### 可变参数(...)
在 Java 里，**可变参数（varargs）** 用来让方法接收不定数量的参数。
```java
// 语法
返回类型 方法名(参数类型... 参数名) { }
```
**可变参数求最大值案例：**
```java
public class VarArgsMax {
    // 使用可变参数求最大值
    public static void printMax(double... numbers) {
        if (numbers.length == 0) {
            System.out.println("未传递参数");
            return;
        }
        double result = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > result) {
                result = numbers[i];
            }
        }
        System.out.println("最大值是 " + result);
    }

    public static void main(String[] args) {
        printMax(1.2, 3.4, 0.5);   // 多个参数
        printMax(10);              // 单个参数
        printMax();                // 没有参数
        printMax(new double[]{7.7, 9.9, 8.8}); // 传数组
    }
}
```
### 递归（recursion）
👉 递归本质就是就是：**方法自己调用自己**。
递归结构包含两个部分：
- **递归头**：终止条件（避免无限调用）
- **递归体**：继续调用自身（问题规模要缩小）
#### 阶乘（Factorial）
```java
public class RecursionDemo {
    // 计算 n 的阶乘：n! = n * (n-1) * (n-2) * ... * 1
    public static int factorial(int n) {
        if (n == 1) return 1;            // 递归头
        return n * factorial(n - 1);     // 递归体
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5)); // 输出 120
    }
}
```
#### 斐波那契（Fibonacci Sequence）
```java
public class FibonacciDemo {
    /**
     * 斐波那契数列（Fibonacci Sequence）
     * 特点：
     *   1. 第1项 = 1，第2项 = 1（固定）
     *   2. 从第3项开始，每一项 = 前两项之和
     * 数学公式：
     *   F(1) = 1
     *   F(2) = 1
     *   F(n) = F(n-1) + F(n-2)   (n >= 3)
     *
     * 示例：
     *   第1项：1
     *   第2项：1
     *   第3项：2   (1+1)
     *   第4项：3   (2+1)
     *   第5项：5   (3+2)
     *   数列：1, 1, 2, 3, 5, 8, 13, 21, 34, ...
     */

    // 使用递归实现斐波那契
    public static int fib(int n) {
        // 递归出口：第1项或第2项，直接返回1
        if (n == 1 || n == 2) return 1;
        // 递归体：第n项 = 前两项之和
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        // 输出前10项
        for (int i = 1; i <= 10; i++) {
            System.out.print(fib(i) + " ");
        }
    }
}
```
## 5.Java 数组（Array）
### 什么是数组？
定义：数组是**相同数据类型元素**的有序集合，具有以下特点：
- **连续存储**：数组在内存中占用连续的存储空间。
- **下标访问**：每个元素通过唯一索引访问，下标从0开始。
- **长度固定**：一旦创建，长度不可改变。
- **类型统一**：数组中的所有元素必须是相同类型，可以是基本类型或引用类型。
- **数组是对象**：在Java中，数组属于引用类型，存储在堆内存中，数组元素类似对象的成员变量。
### 数组声明与创建
**声明**
```java
// 声明，以 int 为例
int[] numbers;      // ✅ 推荐写法
int numbers2[];
```
**创建**
```java
int[] numbers = new int[5]; // 创建一个长度为5的int数组
```
**访问元素**
* 数组索引从 0 开始，到 length - 1 结束。
* 使用 `数组名[索引]` 访问元素。
```java
numbers[0] = 10;         // 修改第一个元素
int first = numbers[0];  // 访问第一个元素
System.out.println(numbers[0]);
```
注意：数组下标范围 `[0, length-1]`，越界会抛出 `ArrayIndexOutOfBoundsException`。
### 数组初始化方式
```java
① 静态初始化
int[] a = {1, 2, 3};
Man[] mans = {new Man(1,1),new Man(2,2)};
② 动态初始化
int[] a = new int[2];
a[0] = 1;
a[1] = 2;
③ 数组的默认初始化
当使用动态初始化时，数组元素会自动被赋予该类型的默认值
```
### 数组内存分析

**先了解Java 内存模型**

![Java内存模型](http://img.geekyspace.cn/pictures/2025/202509100119499.png)

数组对象存储在**堆内存**中。
数组变量本身在栈内存中保存**堆地址引用**。
每个线程都有独立的程序计数器（PC），控制执行流程。

![内存分析](http://img.geekyspace.cn/pictures/2025/202509100130746.png)
### 反转数组
```java
public void reverse(int[] nums) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left++;
        right--;
    }
}
```
### java.util.Arrays 类
```java
import java.util.Arrays;  
  
public class ArraysDemo {  
    public static void main(String[] args) {  
        // 初始化一个数组  
        int[] a = {1, 6, 8, 19, 1000, 999, 178, -1, 0, 5};  
        System.out.println("原始数组: " + Arrays.toString(a));  
  
        // 1. 排序（升序）  
        Arrays.sort(a);  
        System.out.println("排序后: " + Arrays.toString(a));  
  
        // 2. 二分查找（前提是数组已排序）  
        int index = Arrays.binarySearch(a, 19);  
        System.out.println("数字 19 的索引: " + index);  
  
        // 3. 填充数组  
        int[] b = new int[5];  
        Arrays.fill(b, 7);  
        System.out.println("填充后的数组: " + Arrays.toString(b));  
  
        // 4. 数组复制（扩容）  
        int[] c = Arrays.copyOf(a, 15);  
        System.out.println("扩容后的数组: " + Arrays.toString(c));  
  
        // 5. 部分复制  
        int[] d = Arrays.copyOfRange(a, 2, 6); // 下标 [2,6)        System.out.println("部分复制: " + Arrays.toString(d));  
  
        // 6. 比较数组是否相等  
        int[] e = { -1, 0, 1, 5, 6, 8, 19, 178, 999, 1000 };  
        Arrays.sort(e); // 确保顺序一致  
        System.out.println("数组a与数组e是否相等: " + Arrays.equals(a, e));  
  
        // 7. 多维数组打印  
        int[][] f = {{1, 2}, {3, 4, 5}};  
        System.out.println("二维数组: " + Arrays.deepToString(f));  
  
        // 8. 并行排序（大数组时更快）  
        int[] g = {10, 9, 8, 7, 6, 5};  
        Arrays.parallelSort(g);  
        System.out.println("并行排序结果: " + Arrays.toString(g));  
    }  
}
```
### 冒泡排序
冒泡的代码还是相当简单的。两层循环，外层冒泡轮数，里层依次比较，江湖中人人尽皆知。
```java
import java.util.Arrays;  
  
// 冒泡排序  
public class BubbleSortDemo {  
    public static void main(String[] args) {  
        int[] a = {1, 6, 8, 19, 1000, 999, 178, -1, 0, 5};  
        bubbleSort(a);  
        System.out.println("冒泡排序后: " + Arrays.toString(a));  
    }  
  
    public static void bubbleSort(int[] array) {  
        // 外层循环控制轮数  
        for (int i = 0; i < array.length - 1; i++) {  
            boolean swapped = false; // 标记本轮是否发生过交换  
            // 内层循环控制比较和交换  
            for (int j = 0; j < array.length - 1 - i; j++) {  
                if (array[j] > array[j + 1]) {  
                    int temp = array[j];  
                    array[j] = array[j + 1];  
                    array[j + 1] = temp;  
                    swapped = true;  
                }  
            }  
            if (!swapped) break;  
        }  
    }  
}
```
