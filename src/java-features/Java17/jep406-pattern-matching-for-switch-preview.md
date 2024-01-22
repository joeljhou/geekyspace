---
title: Java 17 新特性：switch的模式匹配（Preview）
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2023-12-30
category: Java
tag:
  - Java
  - Java 17
order: 406
---

# Java 17 新特性：switch的模式匹配（Preview）

当case标签可以有模式时，有如下四个主要的设计问题，我们一一来看：

1. 增强类型检查
2. switch表达式和语句的完整性
3. 模式变量声明的作用域
4. 处理null

## 模式匹配设计

### 增强类型检查

通过扩展`switch`模式匹配的`case`标签，现在支持除了**原始数据类型**（`char`、`byte`、`short` 或 `int`）之外，
相应的**包装类**（`Character`、`Byte`、`Short` 或 `Integer`）、`String` 以及`Enum`类型等**任何引用类型**。

```java
record Point(int i, int j) {}
enum Color { RED, GREEN, BLUE; }

static void typeTester(Object o) {
    switch (o) {
        case null     -> System.out.println("null");
        case String s -> System.out.println("String");
        case Color c  -> System.out.println("Enum，颜色具有 " + Color.values().length + " 个值");
        case Point p  -> System.out.println("Record Class: " + p.toString());
        case int[] ia -> System.out.println("Array，长度为" + ia.length);
        default       -> System.out.println("其他情况");
    }
}
```

> **注意：要避免模式标签支配**（编译异常）
>
> 如果一个模式标签在switch块中被先前的模式标签支配, 或者存在多个全匹配的标签（default 和 total类型模式）, 则会产生编译时错误。

* 例1: 模式 `case CharSequence cs` 支配 `case String s` ,因为 String 是 CharSequence 的子类
* 例2: 总模式的情况，如 `case p` 支配 `case null` 模式,因为总模式匹配所有值，包括null
* 例3: 模式 `case p` 支配 `case p && e` ,因为满足第一个模式的值也满足第二个模式
* 例4: 模式 `case String s` 支配了带条件的模式 `case String s && s.length() > 0`

```java
switch(o) {
    case CharSequence cs ->
        System.out.println("一个长度为" + cs.length() + "的序列");
    case String s ->    // 编译错误 - 模式被前一个模式支配
        System.out.println("一个字符串：" + s);
    default -> {
        break;
    }
}
```

### switch表达式和语句的完整性

通常情况下，通过添加`default`标签，可以确保`switch`块的完整性。

```java
static void printType(Object o) {
    switch (o) {
        case String s -> System.out.println("String");
        case Integer i -> System.out.println("Integer");
        default -> System.out.println("Other");
    }
}
```

如果switch表达式的类型是**密封类**([JEP 409](https://openjdk.org/jeps/409))，
则类型覆盖检查会考虑密封类的permits子句，以确保switch块的完整性。

以下是一个密封接口Animal的示例，包括Dog和Cat两个允许的子类：

```java
sealed interface Animal permits Dog, Cat {}
class Dog implements Animal {}
class Cat implements Animal {}

static String getSound(Animal animal) {
    return switch (animal) {
        case Dog d -> "Woof!";
        case Cat c -> "Meow!";
        // no default needed!
    };
}
```

在这种情况下，由于编译器知道只有Dog和Cat是可能的类型，所以可以不需要`default`标签。
同样，对于枚举类，每个常量都有一个子句，也不需要default标签。

### 模式变量声明的作用域

`instanceof`([JEP 394](https://openjdk.org/jeps/394))进行**模式匹配**，
**模式变量**的作用域限定在`匹配的条件表达式`和相应的`then`块中。 如果匹配失败，模式变量在`else`块中不可见。

```java
static void test(Object o) {
    if ((o instanceof String s) && s.length() > 3) {
        System.out.println(s);
    } else {
        System.out.println("Not a string");
    }
}
```

`switch`语句的`case`标签进行**模式匹配**，有以下两条规则：

1. `->`形式：作用域包括箭头右侧的表达式、块或 throw 语句
   ```java
   static void test(Object o) {
       switch (o) {
           case Character c -> {
               if (c.charValue() == 7) {
                   System.out.println("Ding!");
               }
               System.out.println("Character");
           }
           case Integer i ->
               throw new IllegalStateException("Invalid Integer argument of value " + i.intValue());
           default -> {
               break;
           }
       }
   }
   ```

2. `:`形式，则其作用域包括语句组的块语句，直到遇到下一个`switch`标签或其他控制流语句

   ```java
   static void test(Object o) {
       switch (o) {
           case Character c:
               if (c.charValue() == 7) {
                   System.out.print("Ding ");
               }
               if (c.charValue() == 9) {
                   System.out.print("Tab ");
               }
               System.out.println("character");
           default:
               System.out.println();
       }
   }
   ```

### 处理null

引入新的`null`标签，用于明确处理选择表达式为`null`的情况

```java
// test(null) 不再抛出NullPointerException，而是打印 "null!"
static void test(Object o) {
    switch (o) {
        case null     -> System.out.println("null!");
        case String s -> System.out.println("String");
        default       -> System.out.println("Something else");
    }
}
```

由空标签产生的新标签形式， JDK 16中，`switch`块支持两种风格，
1. `:` 形式，允许`fallthrough`，多个标签通常写为`case l1: case l2:`
2. `->`形式，不允许`fallthrough`，多个标签写为`case l1, l2->`

```java
// 处理 null 和 String 标签，使用 : 形式
switch (o) {
   case null: case String s:
       System.out.println("String, including null");
       break;
   // 更多的 cases...

}

// 结合 null case 和 default 标签，使用 -> 形式
switch (o) {
   // 更多的 cases...
   case null, default ->
       System.out.println("The rest (including null)");
}
```

## 保护模式和括号模式

为了提高代码可读性，引入了 **guarded patterns**`(p && e)` 和 **parenthesized patterns**`(p)`，其中`p`是模式，`e`是布尔表达式。

如下示例代码存在可读性问题：

```java
static void test(Object o) {
    switch (o) {
    case String s:
        if (s.length() == 1) { ... }
        else { ... }
        break;
    ...
    }
}
```

使用**guarded patterns**改进，允许在 `case` 标签中结合模式和布尔表达式，使条件逻辑更加清晰：

```java
static void test(Object o) {
    switch (o) {
        case String s && (s.length() == 1) -> ...
        case String s                      -> ...
    }
}
```



