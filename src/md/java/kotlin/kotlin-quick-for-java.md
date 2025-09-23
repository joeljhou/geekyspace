---
title: Java 程序员快速掌握 Kotlin
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-09-21
category: Kotlin
tags:
  - Kotlin
  - Java
---
# Java 程序员快速掌握 Kotlin
## 数据类型
下面是 Java 和 Kotlin 数据类型的对比与 Kotlin 示例讲解：

**1️⃣ 基本类型（Primitive Types）**
- **Java**：有原生类型（`int`、`double`）和包装类型（`Integer`、`Double`）。  
- **Kotlin**：所有基本类型都是对象，没有 primitive/wrapper 区分。  
```kotlin
val a: Int = 10      // 显式声明
val b = 20           // 类型推断为 Int
val pi = 3.14        // 类型推断为 Double
val flag: Boolean = true
val ch: Char = 'A'
println("Int: $a, Double: $pi, Boolean: $flag, Char: $ch")
```
---
**2️⃣ 空安全（Null Safety）**
- **Java**：引用类型可为 `null`，容易 NPE。
- **Kotlin**：默认不可空，可空类型用 `?` 声明。
```kotlin
var str: String = "Hello"    // 非空
// str = null  // ❌ 编译错误

var str2: String? = null     // 可空
println(str2?.length ?: 0)   // 安全调用 + Elvis 操作符
```
扩展：
- `?.` 安全调用操作符，避免 NPE。
- `?:` Elvis 操作符，当左侧为 null 时使用右侧默认值。
- `!!` 非空断言，可能抛 NPE，不推荐随意使用。
---
**3️⃣ 字符串（String）**
- **Java**：用 `+` 拼接字符串。
- **Kotlin** 支持字符串模板 `$variable` 和多行字符串 `""" ... """`
```kotlin
val name = "Tom"
val msg = "Hello, $name"
val multiLine = """
    多行字符串示例：
    第一行
    第二行
""".trimIndent()
println(msg)
println(multiLine)
```
---
**4️⃣ 数组（Array）**
- **Java**：`int[] arr = {1, 2, 3};`
- **Kotlin**：统一用 `Array<T>`，也有专门的基本类型数组：`IntArray`, `DoubleArray`。
```kotlin
val arr: Array<Int> = arrayOf(1, 2, 3)
val arr2: IntArray = intArrayOf(4, 5, 6)
```
---
**5️⃣ 集合（Collections）**
- **Java**：默认可变集合。
- **Kotlin**：区分 **只读** 和 **可变** 集合。
	- `List`、`Set`、`Map` → 只读
	- `MutableList`、`MutableSet`、`MutableMap` → 可变
```kotlin
val list: List<String> = listOf("a", "b")
val mList: MutableList<String> = mutableListOf("x", "y")
mList.add("z")
```
---
**6️⃣ 类型检查与智能转换（Smart Cast）**
- **Java**：需要 `(String)obj` 强制转换。
- **Kotlin**：用 `is` 判断类型后，编译器自动推断类型。
```kotlin
val obj: Any = "I am a String"
if (obj is String) {
    println("长度: ${obj.length}")  // 自动转换为 String
}
```
---
**7️⃣ 类型转换**
- **Java**：自动装箱/拆箱。
- **Kotlin** 不会自动扩大或缩小数字类型，需要显式 `toXXX()`。
```kotlin
val x: Int = 100
val y: Long = x.toLong()   // 必须调用
```
---
**8️⃣ 特殊类型**
- **Any**：类似 Java 的 `Object`，所有非空类型的超类 
- **Unit**：类似 Java 的 `void`，但是真正的类型
- **Nothing**：表示“不会有值”，用于抛异常或死循环
```kotlin
fun log(msg: String): Unit { println(msg) }
fun fail(message: String): Nothing { throw IllegalArgumentException(message) }
```
---
**9️⃣ 枚举（Enum）**
- **Java**：`enum`。
- **Kotlin**：`enum class`，功能类似，但可结合 `when` 表达式使用更优雅。
```kotlin
enum class Direction { NORTH, SOUTH, WEST, EAST }
fun move(dir: Direction) = when(dir) {
    Direction.NORTH -> "向北走"
    Direction.SOUTH -> "向南走"
    Direction.WEST -> "向西走"
    Direction.EAST -> "向东走"
}
println(move(Direction.NORTH))
```
---
**Java ↔ Kotlin 数据类型速查表**

| Java    | Kotlin  |
| ------- | ------- |
| int     | Int     |
| long    | Long    |
| double  | Double  |
| float   | Float   |
| short   | Short   |
| byte    | Byte    |
| char    | Char    |
| boolean | Boolean |
| String  | String  |
| Object  | Any     |
| void    | Unit    |

**参考：**
- [代码笔记：Kotlin 数据类型对比示例（Java 程序员专用）](https://pl.kotl.in/28omCucvR?theme=darcula)
- [Kotlin 官方文档-基本类型](https://kotlinlang.org/docs/basic-types.html)
- [Kotlin 与 Java 互操作性](https://kotlinlang.org/docs/java-interop.html)

## 条件与循环控制语句
下面是 Java 和 Kotlin 条件控制语句的对比与 Kotlin 示例讲解：

**1️⃣ if 表达式**  
- Java 和 Kotlin 都有 if，但 Kotlin 的 if 是表达式，可以有返回值。
```kotlin
val a = 10
val b = 20
val max = if (a > b) a else b
println("较大值: $max")
```
---
**2️⃣ when 表达式（替代 switch）**  
- Kotlin 用 `when` 替代 Java 的 `switch`，更强大灵活。
```kotlin
fun describe(obj: Any): String =
    when (obj) {
        in 1..10 -> obj.toString()  // 1~10 返回本身
        "Hello" -> "字符串 Hello"
        is Long -> "Long 类型"
        !is String -> "不是字符串"
        else -> "未知"
    }
println(describe(1))
println(describe("Hello"))
println(describe(100L))
println(describe(3.14))
```
---
**3️⃣ for 循环**  
- Kotlin 没有传统的 `for(;;)` 循环，常用区间和集合遍历。
```kotlin
for (i in 1..5) {
    print("$i ")
}
val list = listOf("a", "b", "c")
for (item in list) {
    println(item)
}
```
---
**4️⃣ while 和 do...while**  
- 用法与 Java 基本一致。
```kotlin
var x = 5
while (x > 0) {
    print("$x ")
    x--
}
```
---
**总结表：**

| Java       | Kotlin     |
| ---------- | ---------- |
| if/else    | if/else    |
| switch     | when       |
| for(;;)    | for-in     |
| while      | while      |
| do...while | do...while |

Kotlin 的条件控制语句更简洁、表达力更强，推荐多用表达式风格。
## In和区间
Kotlin 的 `in` 关键字和区间（Range）用于判断元素是否在某个范围内，常用于条件判断和循环。

**1️⃣ 区间的创建与遍历**
- 使用 `..` 创建闭区间（包含两端）。
- `in` 判断元素是否在区间内。
```kotlin
val range = 1..5         // 1,2,3,4,5
for (i in range) {
    print("$i ")
}
println(3 in range)      // true
println(10 in range)     // false
```
---
**2️⃣ 降序区间与步长**
- `downTo` 创建降序区间，`step` 设置步长。
```kotlin
for (i in 5 downTo 1 step 2) {
    print("$i ")         // 输出: 5 3 1
}
```
---
**3️⃣ until 创建半开区间**
- `until` 创建左闭右开区间（不包含右端）。
```kotlin
for (i in 1 until 5) {
    print("$i ")         // 输出: 1 2 3 4
}
```
---
**4️⃣ 字符和集合也支持 in**
- `in` 可用于判断字符、集合等是否包含某元素。
```kotlin
val chars = 'a'..'z'
println('c' in chars)    // true

val list = listOf("a", "b", "c")
println("a" in list)     // true
```
---
**总结：**
- `in` 用于区间、集合的包含判断。
- 区间常用于循环、条件判断，语法简洁。
## 循环控制
Kotlin 的循环控制语句主要包括 `break`、`continue` 和带标签的跳转，功能比 Java 更灵活。

**1️⃣ break 和 continue**  
- `break`：跳出最近一层循环。  
- `continue`：跳过本次循环，进入下一次。

```kotlin
for (i in 1..5) {
    if (i == 3) break
    print("$i ")   // 输出: 1 2
}

for (i in 1..5) {
    if (i % 2 == 0) continue
    print("$i ")   // 输出: 1 3 5
}
```

**2️⃣ 带标签的 break/continue**  
- Kotlin 支持为循环加标签，配合 `break`/`continue` 跳出多层循环。

```kotlin
tag@ for (i in 1..3) {
    for (j in 1..3) {
        if (i == 2 && j == 2) break@tag
        print("($i,$j) ")
    }
}
// 输出: (1,1) (1,2) (1,3) (2,1)
```

**3️⃣ return 用于 Lambda**  
- 在 Lambda 表达式中，`return` 默认跳出整个函数。  
- 用标签 `return@label` 只跳出当前 Lambda。

```kotlin
listOf(1, 2, 3, 4).forEach {
    if (it == 3) return@forEach
    print("$it ")   // 输出: 1 2 4
}
```
---
**总结：**  
- `break`/`continue` 用于控制循环流程。  
- 标签让多层循环跳转更灵活。  
- Lambda 中用 `return@label` 精确控制跳出范围。
## 函数

Kotlin 的函数（Function）语法简洁，支持多种声明和调用方式，适合 Java 程序员快速上手。

**1️⃣ 基本函数声明与调用**
- 使用 `fun` 关键字定义函数，参数类型在后，返回值类型用 `: 类型` 指定。
```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
println(sum(3, 5))   // 输出: 8
```
---
**2️⃣ 表达式函数体**
- 如果函数体只有一行，可以用 `=` 简化。
```kotlin
fun max(a: Int, b: Int) = if (a > b) a else b
println(max(4, 7))   // 输出: 7
```
---
**3️⃣ 默认参数与命名参数**
- 参数可设置默认值，调用时可按名称传参。
```kotlin
fun greet(name: String = "World") {
    println("Hello, $name")
}
greet()              // 输出: Hello, World
greet("Kotlin")      // 输出: Hello, Kotlin
```
---
**4️⃣ 可变参数（vararg）**
- 用 `vararg` 声明可变参数，类似 Java 的 `...`。
```kotlin
fun printAll(vararg items: String) {
    for (item in items) println(item)
}
printAll("A", "B", "C")
```
---
**5️⃣ 单表达式返回 Unit 可省略**
- 没有返回值时，`Unit` 可省略。
```kotlin
fun log(msg: String) = println(msg)
```
---
**6️⃣ Lambda 表达式**
- 支持匿名函数和 Lambda，常用于集合操作。
```kotlin
val list = listOf(1, 2, 3)
list.forEach { println(it) }
```
---
**总结表：**

| Java                | Kotlin                |
|---------------------|----------------------|
| public int sum(int) | fun sum(a: Int): Int |
| void func()         | fun func()           |
| 可变参数 ...        | vararg               |
| 默认参数无          | 默认参数/命名参数    |

Kotlin 函数语法更灵活，推荐多用表达式和默认参数风格。
## 类和对象
Kotlin 的类和对象语法比 Java 更简洁，支持许多现代特性，适合 Java 程序员快速上手。

**1️⃣ 类的声明与构造函数**
- 用 `class` 关键字声明类，主构造函数直接写在类名后。
```kotlin
// 带主构造函数的类
class Person(val name: String, var age: Int)

val p = Person("Tom", 20)
println("${p.name}, ${p.age}")
```
---
**2️⃣ 属性与方法**
- 属性用 `val`（只读）或 `var`（可变）声明，方法用 `fun`。
```kotlin
class Dog(var name: String) {
    fun bark() = println("$name: 汪汪！")
}
val d = Dog("旺财")
d.bark()
```
---
**3️⃣ 继承与重写**
- 类默认 `final`，要继承需加 `open`。重写方法用 `override`。
```kotlin
open class Animal(open val name: String) {
    open fun sound() = println("动物叫声")
}
class Cat(override val name: String) : Animal(name) {
    override fun sound() = println("$name: 喵喵！")
}
val c = Cat("小花")
c.sound()
```
---
**4️⃣ 数据类（data class）**
- 自动生成 `equals`、`hashCode`、`toString` 等，适合存储数据。
- 使用 `val`（只读属性）会自动生成的 `getter`
- 使用 `var`（可变属性）会自动生成的 `getter`和`setter`
```kotlin
data class User(val id: Int, val name: String)
val u = User(1, "Alice")
println(u)
```
---
**5️⃣ 单例对象（object）**
- 用 `object` 声明单例。
- **本质上是“饿汉式单例”**，但带有 **延迟初始化特性**
- Kotlin 编译器会在背后生成静态字段和 `<clinit>` 方法来保证初始化是线程安全的。
```kotlin
object Counter {
    var count = 0
    fun inc() = ++count
}
Counter.inc()
println(Counter.count)
```
---
**6️⃣ 伴生对象（companion object）**
- 类的静态成员用 `companion object`。
```kotlin
class Utils {
    companion object {
        fun hello() = println("Hello from Utils")
    }
}
Utils.hello()
```
---
**总结表：**

| Java                | Kotlin                      |
|---------------------|----------------------------|
| class               | class                       |
| extends             | : 父类                      |
| final               | 默认 final，需 open 才能继承 |
| static              | companion object            |
| 单例                | object                      |
| 数据类无             | data class                  |

Kotlin 类和对象语法更简洁，支持数据类、单例、伴生对象等现代特性。
## 访问和属性修饰符
Kotlin 的访问和属性修饰符与 Java 类似，但更简洁灵活。常用修饰符如下：

**1️⃣ 访问修饰符（Visibility Modifiers）**
- `public`：默认，任何地方可见。
- `internal`：同一模块内可见（Kotlin 独有）。
- `protected`：子类可见（仅用于类成员）。
- `private`：当前类/文件可见。
```kotlin
class Foo {
    private val a = 1      // 仅 Foo 内可见
    protected val b = 2    // Foo 及子类可见
    internal val c = 3     // 同模块可见
    val d = 4              // public，任何地方可见
}
```
---
**2️⃣ 属性修饰符**
- `val`：只读属性（类似 Java 的 final）。
- `var`：可变属性。
```kotlin
class Person(val name: String, var age: Int)
```
---
**3️⃣ 其他常用修饰符**
- `open`：允许被继承或重写（Kotlin 类默认 final）。
- `final`：禁止继承或重写（默认）。
- `abstract`：抽象类或方法，不能实例化。
- `override`：重写父类成员。
- `lateinit`：延迟初始化（仅用于 var，非基本类型）。
- `const`：编译时常量（只能用于顶层或 object 的 val）。
```kotlin
open class Animal
abstract class Shape { abstract fun draw() }
class Cat : Animal()
```
---
**总结表：**

| Java         | Kotlin         | 说明                   |
|--------------|---------------|------------------------|
| public       | public         | 公开                   |
| protected    | protected      | 受保护                 |
| private      | private        | 私有                   |
| default      | internal       | 同包/同模块可见        |
| final        | final（默认）  | 默认不可继承           |
| abstract     | abstract       | 抽象                   |
| static       | companion obj  | 伴生对象实现静态成员   |
| final field  | val            | 只读属性               |

Kotlin 的修饰符更细致，`internal` 和 `open` 是常用的 Kotlin 特有特性。
## 类的继承与重写
Kotlin 的类继承与重写比 Java 更安全简洁，默认所有类和方法都是 final，需显式声明 `open` 才能被继承或重写。

**1️⃣ 基本继承语法**
- 用 `open` 修饰父类和可重写方法。
- 子类用 `:` 继承父类，重写用 `override`。
```kotlin
open class Animal(open val name: String) {
    open fun sound() = println("动物叫声")
}

class Dog(override val name: String) : Animal(name) {
    override fun sound() = println("$name: 汪汪！")
}
val d = Dog("旺财")
d.sound() // 输出: 旺财: 汪汪！
```
---
**2️⃣ 构造函数与属性重写**
- 子类主构造函数需调用父类构造函数。
- 可以重写父类的 `val`/`var` 属性。
```kotlin
open class Person(open val name: String)
class Student(override val name: String, val grade: Int) : Person(name)
```
---
**3️⃣ 方法重写与 super**
- 用 `override` 重写方法，`super` 调用父类实现。
```kotlin
open class Parent {
    open fun hello() = println("Parent hello")
}
class Child : Parent() {
    override fun hello() {
        super.hello()
        println("Child hello")
    }
}
```
---
**4️⃣ 抽象类与方法**
- 用 `abstract` 声明抽象类/方法，子类必须实现。
```kotlin
abstract class Shape {
    abstract fun area(): Double
}
class Circle(val r: Double) : Shape() {
    override fun area() = Math.PI * r * r
}
```
---
**总结表：**

| Java      | Kotlin          |
| --------- | --------------- |
| extends   | : 父类            |
| @Override | override        |
| abstract  | abstract        |
| super     | super           |
| final     | 默认 final，需 open |

Kotlin 继承机制更安全，需显式声明可继承/可重写，推荐优先使用组合而非继承。
## 抽象，嵌套和内部类
Kotlin 的抽象类、嵌套类和内部类用法简洁，和 Java 有相似也有不同之处。

**1️⃣ 抽象类与抽象方法**
- 用 `abstract` 修饰，不能实例化。
- 抽象方法无方法体，子类必须实现。
```kotlin
abstract class Animal {
    abstract fun sound()
    fun sleep() = println("睡觉")
}

class Dog : Animal() {
    override fun sound() = println("汪汪！")
}
val d = Dog()
d.sound()   // 输出: 汪汪！
d.sleep()   // 输出: 睡觉
```
---
**2️⃣ 嵌套类（Nested Class）**
- 默认静态（类似 Java 的 static class），<u>不能访问外部类成员。</u>
```kotlin
class Outer {
    val x = 1
    class Nested {
        fun foo() = 2
    }
}
val n = Outer.Nested().foo()  // 2
```
不能访问外部类成员
**3️⃣ 内部类（Inner Class）**
- 用 `inner` 修饰，<u>可访问外部类成员。</u>
```kotlin
class Outer {
    val x = 10
    inner class Inner {
        fun foo() = x
    }
}
val o = Outer()
val i = o.Inner()
println(i.foo())  // 输出: 10
```
---
**4️⃣ 匿名内部类**
- 用 `object : 接口/父类 {}` 创建匿名类实例。
```kotlin
interface Clickable {
    fun click()
}
val btn = object : Clickable {
    override fun click() = println("Clicked!")
}
btn.click()
```
---
**总结表：**

| Java                | Kotlin                | 说明                   |
|---------------------|----------------------|------------------------|
| abstract class      | abstract class        | 抽象类                 |
| static class        | class Nested          | 嵌套类，默认静态       |
| inner class         | inner class           | 内部类，访问外部成员   |
| 匿名内部类           | object : ... {}       | 匿名对象/类            |

Kotlin 嵌套类默认静态，内部类需 `inner`，匿名类用 `object`。抽象类和方法用法与 Java 类似。
## 接口与接口实现
Kotlin 的接口（interface）用法与 Java 类似，但更灵活，支持默认实现、多接口继承等。

**1️⃣ 接口声明与实现**
- 用 `interface` 关键字声明接口，方法可有默认实现。
```kotlin
interface Clickable {
    fun click()
    fun showOff() = println("I'm clickable!")
}
```
---
**2️⃣ 类实现接口**
- 用 `:` 实现接口，必须实现未提供默认实现的方法。
```kotlin
class Button : Clickable {
    override fun click() = println("Button clicked")
}
val btn = Button()
btn.click()      // 输出: Button clicked
btn.showOff()    // 输出: I'm clickable!
```
---
**3️⃣ 多接口实现与冲突解决**
- 支持多接口实现，若有<u>同名方法需显式指定实现。</u>
```kotlin
interface Focusable {
    fun showOff() = println("I'm focusable!")
}

class MyButton : Clickable, Focusable {
    override fun click() = println("MyButton clicked")
    override fun showOff() {
        super<Clickable>.showOff()
        super<Focusable>.showOff()
    }
}
```
---
**4️⃣ 接口属性**
- 接口可声明属性，但不能有状态，只能有 `getter`。
```kotlin
interface Named {
    val name: String
}
class Person(override val name: String) : Named
```
---
**总结表：**

| Java       | Kotlin    | 说明       |
| ---------- | --------- | -------- |
| interface  | interface | 接口声明     |
| implements | : 接口      | 实现接口     |
| default    | 默认实现      | 支持方法默认实现 |
| 多接口        | 多接口       | 支持多接口继承  |

Kotlin 接口支持默认实现、多继承，语法更简洁灵活。
## 数据类，伴生类，枚举类
**1️⃣ 数据类（data class）**
- 用 `data class` 声明，自动生成 `equals`、`hashCode`、`toString`、`copy` 等方法，适合只用于存储数据的类。
- 主构造函数参数需用 `val` 或 `var` 修饰。
```kotlin
data class User(val id: Int, val name: String)

val u1 = User(1, "Alice")
val u2 = u1.copy(name = "Bob")
println(u1)         // User(id=1, name=Alice)
println(u2)         // User(id=1, name=Bob)
println(u1 == u2)   // false
```
**特点：**
- 自动实现结构相等（\=\=）、解构、复制等。
- 常用于 DTO、VO、简单实体。
---
 **2️⃣ 伴生对象（companion object）**
- Kotlin 没有 static 关键字，静态成员用 `companion object` 实现。
- 伴生对象内的方法和属性可通过类名直接访问。
```kotlin
class Utils {
    companion object {
        const val VERSION = "1.0"
        fun hello() = println("Hello from Utils")
    }
}

Utils.hello()           // 直接通过类名调用
println(Utils.VERSION)  // 访问常量
```
**特点：**
- 每个类最多一个伴生对象。
- 伴生对象本身是对象，可以实现接口。
---
**3️⃣ 枚举类（enum class）**
- 用 `enum class` 声明，类似 Java 的枚举。
- 可为每个枚举常量定义属性和方法。
```kotlin
enum class Direction(val desc: String) {
    NORTH("北"), SOUTH("南"), WEST("西"), EAST("东");

    fun show() = println("方向: $desc")
}

val d = Direction.NORTH
println(d.name)     // NORTH
println(d.desc)     // 北
d.show()            // 方向: 北
```
**特点：**
- 可结合 `when` 表达式优雅分支。
- 枚举常量可带构造参数和方法。
---
**总结表：**

| Java         | Kotlin                | 说明                   |
|--------------|----------------------|------------------------|
| POJO/VO      | data class           | 数据类，自动方法        |
| static       | companion object     | 伴生对象实现静态成员    |
| enum         | enum class           | 枚举类                 |

Kotlin 语法更简洁，数据类、伴生对象、枚举类常用于简化业务模型和工具类开发。
## 单例和对象表达式
Kotlin 的单例和对象表达式用法非常简洁，适合替代 Java 的 static 工具类、匿名内部类等场景。

**1️⃣ 单例对象（object）**
- 用 `object` 关键字声明单例，线程安全，懒加载。
- 适合全局唯一实例、工具类、管理器等。
```kotlin
object Counter {
    var count = 0
    fun inc() = ++count
}
Counter.inc()
println(Counter.count) // 输出: 1
```
**特点：**
- 编译器自动保证线程安全和唯一性。
- 不能有构造函数。
---
**2️⃣ 伴生对象（companion object）**
- 用于类的“静态成员”，每个类最多一个伴生对象。
- 伴生对象成员可通过类名直接访问。
```kotlin
class Utils {
    companion object {
        const val VERSION = "1.0"
        fun hello() = println("Hello from Utils")
    }
}
Utils.hello()
println(Utils.VERSION)
```
---
**3️⃣ 对象表达式（object expression）**
- 用 `object : 父类/接口 {}` 创建匿名对象，类似 Java 匿名内部类。
- 常用于临时实现接口、回调等。
```kotlin
interface Clickable {
    fun click()
}
val btn = object : Clickable {
    override fun click() = println("Clicked!")
}
btn.click()
```
---
**总结表：**

| Java       | Kotlin            | 说明       |
| ---------- | ----------------- | -------- |
| static 工具类 | object            | 单例对象     |
| static 成员  | companion object  | 伴生对象     |
| 匿名内部类      | object expression | 匿名对象/表达式 |

Kotlin 单例和对象表达式让代码更简洁，推荐多用 object 替代 static/匿名类。
## 密封类和密封接口
Kotlin 的**密封类**（sealed class）和**密封接口**（sealed interface）用于表达受限的继承层次，常用于表达有限集合的状态、结果等，配合 `when` 表达式更安全。

**1️⃣ 密封类（sealed class）**
- 用 `sealed class` 声明，所有子类必须在同一文件中定义。
- 适合表达有限状态、结果类型等。
- 配合 `when`，编译器能检查分支是否覆盖所有情况。
```kotlin
sealed class Result
data class Success(val data: String) : Result()
data class Error(val code: Int) : Result()
object Loading : Result()

fun handle(result: Result) = when (result) {
    is Success -> println("成功: ${result.data}")
    is Error -> println("错误: ${result.code}")
    Loading -> println("加载中")
}
```
---
**2️⃣ 密封接口（sealed interface）**
- 用 `sealed interface` 声明，所有实现类也需在同一文件中。
- 适合需要多继承的受限类型体系。
```kotlin
sealed interface UiState
data class ShowText(val text: String) : UiState
object ShowLoading : UiState
object ShowError : UiState
```
---
**3️⃣ 特点与优势**
- 受限继承，所有子类/实现类可知，`when` 分支更安全。
- 可用于表达状态机、网络请求结果、UI 状态等。
---
**总结表：**

| Java                | Kotlin                | 说明                   |
|---------------------|----------------------|------------------------|
| 无直接等价           | sealed class          | 密封类，受限继承        |
| 无直接等价           | sealed interface      | 密封接口，受限多继承    |
| enum                | enum/sealed class     | 枚举/密封类表达有限集合 |

Kotlin 密封类/接口让状态建模更安全，推荐用于有限状态、结果类型等场景。
## 扩展函数
扩展函数是 Kotlin 的一大特色，允许你为现有类添加新函数，而无需继承或修改原类，非常适合工具方法、DSL 等场景。下面是扩展函数的核心知识点和示例：

**1️⃣ 基本语法**
- 扩展函数的声明格式为：  `fun 接收者类型.函数名(参数): 返回类型 { ... }`
- 扩展函数在调用时和普通成员函数调用一样，但它**不会真正改变类**。
```kotlin
// 为 String 添加扩展函数
fun String.hello(): String = "Hello, $this"

val msg = "Kotlin".hello()  // Hello, Kotlin
println(msg)
```
---
**2️⃣ 扩展属性**
- 扩展不仅限于函数，也可以添加属性（只能有 getter，没有 backing field）。
- 扩展属性不能存储状态，只能通过现有数据计算得到值。
```kotlin
val String.lastChar: Char
    get() = this[this.length - 1]

println("Kotlin".lastChar)  // n
```
---
**3️⃣ 泛型扩展函数**
- 扩展函数支持泛型，让工具方法更通用。
```kotlin
fun <T> List<T>.second(): T = this[1]
println(listOf(1, 2, 3).second())  // 2
```
---
**4️⃣ 作用域与静态解析**
- 扩展函数**不会真正修改类**，调用取决于变量的**声明类型**。
- 可以定义在：
	- 顶层函数（常用）
	- 类内部（成员扩展函数）
	- 伴生对象
```kotlin
open class Parent
class Child: Parent()

fun Parent.foo() = "Parent"
fun Child.foo() = "Child"

val p: Parent = Child()
println(p.foo())  // 输出: Parent，静态解析
```
---
**5️⃣ Java 互操作**
- 在 Java 中，Kotlin 扩展函数表现为 **静态方法**：
```kotlin
// Kotlin
fun String.hello() = "Hello, $this"

// Java 调用方式
String result = MyKotlinFileKt.hello("Kotlin");
```
---
**6️⃣ 常见应用：简化统一响应封装**
```kotlin
// 假设有一个 R<T> 响应类
class R<T>(val data: T, val success: Boolean) {
    companion object {
        fun <T> success(data: T) = R(data, true)
    }
}
```
- 为任意对象添加扩展函数，将其快速包装成 `R<T>`：
```kotlin
// 为任意对象添加扩展函数，将其包装成 R<T>
fun <T : Any?> T.rs(): R<T> = R.success(this)

val result = "Hello".rs()
println(result.success)  // 输出: true
println(result.data)     // 输出: Hello
```
- 这样就可以直接使用 `对象.rs()` 来快速生成统一响应，代码更简洁。