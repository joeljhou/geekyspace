---
title: Java 16 新特性：record类
description:
author: 流浪码客
isOriginal: true
date: 2023-12-29
category: Java
tag: Java Features
order: 395
---

# Java 16 新特性：record类

Java 16 引入的**记录类**（Records Classes）是一种用于简化不可变数据管理的特殊类。
它通过紧凑的语法提供了对不可变数据的支持，并自动生成常见的方法，
如`equals()`、`hashCode()`和`toString()`等，从而减少了开发者的样板代码。

## 传统Java Bean问题

在处理不可变数据时，传统的Java Bean存在“==繁琐==”和“==冗长==”的问题。
为了管理少量值的不可变数据，开发者需要编写大量低价值、重复且容易出错的代码，
包括`构造函数`、`访问器(getter/setter)`、`equals`、`hashCode`、`toString`等。

例如，用于携带x和y坐标的类通常会演变成以下繁琐形式：

```java
class Point {
    private final int x;
    private final int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    int x() { return x; }
    int y() { return y; }

    public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point other = (Point) o;
        return other.x == x && other.y == y;
    }

    public int hashCode() {
        return Objects.hash(x, y);
    }

    public String toString() {
        return String.format("Point[x=%d, y=%d]", x, y);
    }
}
```

## 引入record类

**语法如下**：使用 `record`==关键字==，指定==类名称==为 Point，定义==参数列表== x 和 y 作为组件

```java
record Point(int x, int y) { }
```

record申明的类，具备这些特点：

1. 它是一个`final`类
2. 自动实现`equals`、`hashCode`、`toString`函数
3. 成员变量均为`public`属性

所以，对于之前写的Point类，它等价于一个这样的类：

```java
// Record类声明，使用record关键字，名称为Point，带有两个参数x和y
public final class Point {
    // 1. 自动生成成员变量（fields）
    final int x;
    final int y;

    // 2. 自动生成构造函数(constructor)
    public Point( int x, int y){
        this.x = x;
        this.y = y;
    }

    // 3. 自动生成的访问方法
    public int x () {
        return x;
    }

    public int y () {
        return y;
    }

    // 4. 自动生成equals和hashCode方法
    @Override
    public boolean equals (Object obj){
        // 实现相等性比较的逻辑
    }

    @Override
    public int hashCode () {
        // 生成哈希码的逻辑
    }

    // 5. 自动生成toString方法
    @Override
    public String toString () {
        return "Point{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
```

通过使用record类，你可以更专注于业务逻辑而不是样板代码，提高了代码的可读性和可维护性。

## 显示声明紧凑构造函数

未显式声明构造函数时，系统会自动生成包含所有成员变量的隐式构造函数。
当显式声明紧凑构造函数可以==省略形式参数列表==、编译后在构造函数的末尾==自动分配==给相应的形式参数（this.x = x;）。

* **验证参数**的紧凑构造函数

    ```java
    record Book(String title, String author, int pageCount) {
        Book {
            if (pageCount <= 0) {
                throw new IllegalArgumentException("页数必须大于零.");
            }
        }
    }
    ```

* **规范**的紧凑构造函数

    ```java
    // 记录类 Rational 表示有理数，包含分子（num）和分母（denom）两个成员变量
    record Rational(int num, int denom) {
        Rational {
            int gcd = gcd(num, denom);  // 计算最大公约数
            num /= gcd;                 // 将分子除以最大公约数
            denom /= gcd;               // 将分母除以最大公约数
        }
    }
    ```

    这个声明等同于传统的构造函数形式：

    ```java
    record Rational(int num, int denom) {
        Rational(int num, int demon) {
            // 逻辑代码
            int gcd = gcd(num, denom);
            num /= gcd;
            denom /= gcd;
            // 赋值代码
            this.num = num;
            this.denom = denom;
        }
    }
    ```

* 记录类**语义一致性**

    例如，考虑以下方式声明的记录类R：
    
    ```java
    record R(T1 c1, ..., Tn cn){ }
    ```
    
    如果通过以下方式复制R的实例r1：
    
    ```java
    R r2 = new R(r1.c1(), r1.c2(), ..., r1.cn());
    ```
    
    则假设 r1 不是空引用，表达式 r1.equals(r2) 总是为 true。
    这是因为记录类的隐式声明的 equals 方法保证了相同字段值的两个记录实例相等。

    > Tips: 程序员需要谨慎确保显式声明的方法维持语义一致性

* 避免不良风格的代码

    ```java
    record SmallPoint(int x, int y) {
        public int x() { return this.x < 100 ? this.x : 100; }
        public int y() { return this.y < 100 ? this.y : 100; }
    }
    ```
    
    这是一个不良风格的代码，违反了语义一致性的原则，访问器`x()`,`y()`方法调整类实例的状态；
    **改进建议**， 如果需要限制坐标值的范围，应该在构造函数或其他明确的位置处理。
    
    ```java
    record SmallPoint(int x, int y) {
      // 紧凑构造函数中限制坐标值的范围
      public SmallPoint {
          this.x = Math.min(x, 100);
          this.y = Math.min(y, 100);
      }
    }
    ```

## 发展脉络

`record` 类最初在JDK 14预览版(JEP 359)提出，随后在JDK 15预览版(JEP 384)再次推出。
最终，它在JDK 16中(JEP 395)正式发布，成为Java语言的一项重要特性。







