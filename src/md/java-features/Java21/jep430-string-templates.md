---
title: Java 21 新特性：字符串模版(Preview)
description:
author: 流浪码客
isOriginal: true
date: 2024-01-06
category: Java
tag: Java Features
order: 430
---

# Java 21 新特性：String Templates（字符串模版）

Java 21 中引入了**字符串模版**（String Templates），它是一种新的字符串字面量，用于更简洁地构建字符串。

## 字符串组合的机制

在之前，Java 提供了几种字符串组合的机制，但不幸的是，它们都存在一些缺点

1. 使用 `+` 操作符, 代码难以阅读
    ```java
    String s = x + " plus " + y + " equals " + (x + y);
    ```
2. 使用 `StringBuilder` 和 `StringBuffer`，代码冗长
    ```java
    String s = new StringBuilder（）
                    .append（x）
                    .append（“plus“）
                    .append（y）
                    .append（“equals“）
                    .append（x + y）
                    .println（）;
    ```
3. 使用 `String::format` 和 `String::formatted`，容易出现参数数量和类型不匹配的问题
    ```java
    String s = String.format("%2$d plus %1$d equals %3$d", x, y, x + y);
    String t = "%2$d plus %1$d equals %3$d".formatted(x, y, x + y);
    ```
4. 使用 `java.text.MessageFormat` 格式化消息，语法复杂对一些人来说可能不太熟悉
    ```java
    MessageFormat mf = new MessageFormat("{0} plus {1} equals {2}");
    String s = mf.format(x, y, x + y);
    ```

下面，我们将学习Java 21中的字符串模版，以及它的使用方法。

## 模版表达式（插值）

在Java 21中处理字符串的新方法称为：`Template Expressions`，即：**模版表达式**。

* 优点：模版表达式可以执行**字符串插值**，插值不仅比串联更方便，而且在阅读代码时也更清晰
* 缺点：但插值是危险的，尤其是对于SQL语句，因为它可能导致注入攻击

```java
String name = "Joan";
String info = STR."My name is \{name}";
assert info.equals("My name is Joan");   // true
```

上述代码中的第2行就是一个模版表达式，其中主要包含三个部分：

1. 模板处理器`STR`;
2. 一个`.`字符，类似于方法调用
3. 包含嵌入表达式（`\{name}`）的模版

运行时，计算模板表达式，模板处理器将模板中的文本与嵌入表达式的值组合在一起，以产生结果。

## STR模版处理器

> STR模板处理器用于将模板中的每个==嵌入表达式==替换成==表达式的（字符串）值==来执行字符串插值

* STR是一个`public static final`字段，它会自动导入到每个Java源文件中

使用STR模板处理器的模板表达式示例。符号 `|` 后显示前一条语句的值，类似于`jshell`。

```java
// 嵌入式表达式可以是字符串
String firstName = "Bill";
String lastName  = "Duck";
String fullName  = STR."\{firstName} \{lastName}";
| "Bill Duck"
String sortName  = STR."\{lastName}, \{firstName}";
| "Duck, Bill"

// 嵌入式表达式可以执行算术运算
int x = 10, y = 20;
String s = STR."\{x} + \{y} = \{x + y}";
| "10 + 20 = 30"

// 嵌入式表达式可以调用方法和访问字段
String s = STR."You have a \{getOfferType()} waiting for you!";
| "You have a gift waiting for you!"
String t = STR."Access at \{req.date} \{req.time} from \{req.ipAddress}";
| "Access at 2022-03-25 15:34 from 8.8.8.8"
```

* 为了帮助重构，嵌入式表达式中可以使用双引号字符，而无需将它们转义为`"`

   ```java
   String filePath = "tmp.dat";
   File file = new File(filePath);
   String old = "The file " + filePath + " " + (file.exists() ? "does" : "does not") + " exist";
   String msg = STR."The file \{filePath} \{file.exists() ? "does" : "does not"} exist";
   | "The file tmp.dat does exist" 或 "The file tmp.dat does not exist"
   ```

* 为了提高可读性，在源文件中，嵌入式表达式可以跨越多行而不会引入新的换行符

   ```java
   String time = STR."The time is \{
       // java.time.format包非常有用
       DateTimeFormatter
         .ofPattern("HH:mm:ss")
         .format(LocalTime.now())
   } right now";
   // "The time is 12:34:56 right now"
   ```

* 字符串模板表达式中嵌入表达式的数量没有限制

   ```java
   // 嵌入式表达式可以是后缀递增表达式
   int index = 0;
   String data = STR."\{index++}, \{index++}, \{index++}, \{index++}";
   // "0, 1, 2, 3"
   ```

* 任何Java表达式都可以用作嵌入式表达式，甚至是模板表达式。例如：

   ```java
   // 嵌入式表达式是（嵌套的）模板表达式
   String[] fruit = { "apples", "oranges", "peaches" };
   String s = STR."\{fruit[0]}, \{STR."\{fruit[1]}, \{fruit[2]}"}";
   // "apples, oranges, peaches"
   ```

* 在这里，模板表达式 `STR."\{fruit[1]}, \{fruit[2]}"` 嵌入到另一个模板表达式的模板中。
  由于存在大量的 `"` `,` `\` 和 `{ }` 字符，这段代码很难阅读，因此最好将其格式化为：

   ```java
   String s = STR."\{fruit[0]}, \{
       STR."\{fruit[1]}, \{fruit[2]}"
   }";
   ```

## 多行模板表达式

模板表达式的模板可以跨越多行源代码，类似于Java 15中的[文本块](/java-features/Java15/jep378-text-blocks)的语法。
开发者可以用它来方便的组织`html`、`json`、`xml`等字符串内容，比如下面这样：

```java
// 多行模板表达式示例：HTML文档
String title = "My Web Page";
String text  = "Hello, world";
String html = STR."""
        <html>
          <head>
            <title>\{title}</title>
          </head>
          <body>
            <p>\{text}</p>
          </body>
        </html>
        """;
| 输出结果：
| """
| <html>
|   <head>
|     <title>My Web Page</title>
|   </head>
|   <body>
|     <p>Hello, world</p>
|   </body>
| </html>
| """

// 多行模板表达式示例：JSON文档
String name    = "Joan Smith";
String phone   = "555-123-4567";
String address = "1 Maple Drive, Anytown";
String json = STR."""
    {
        "name":    "\{name}",
        "phone":   "\{phone}",
        "address": "\{address}"
    }
    """;
| 输出结果：
| """
| {
|     "name":    "Joan Smith",
|     "phone":   "555-123-4567",
|     "address": "1 Maple Drive, Anytown"
| }
| """

record Rectangle(String name, double width, double height) {
    double area() {
        return width * height;
    }
}
Rectangle[] zone = new Rectangle[] {
    new Rectangle("Alfa", 17.8, 31.4),
    new Rectangle("Bravo", 9.6, 12.4),
    new Rectangle("Charlie", 7.1, 11.23),
};
// 多行模板表达式示例：表格
String table = STR."""
    Description  Width  Height  Area
    \{zone[0].name}  \{zone[0].width}  \{zone[0].height}     \{zone[0].area()}
    \{zone[1].name}  \{zone[1].width}  \{zone[1].height}     \{zone[1].area()}
    \{zone[2].name}  \{zone[2].width}  \{zone[2].height}     \{zone[2].area()}
    Total \{zone[0].area() + zone[1].area() + zone[2].area()}
    """;
| 输出结果：
| """
| Description  Width  Height  Area
| Alfa  17.8  31.4     558.92
| Bravo  9.6  12.4     119.03999999999999
| Charlie  7.1  11.23     79.733
| Total 757.693
| """
```

## FMT模板处理器

除了STR模版处理器之外，Java中还提供了另外一个模版处理器：FMT。
FMT与STR相似之处在于它执行插值，但还提供了==格式化处理==能力。

* 格式说明符与`java.util.Formatter`中定义的格式说明符相同

```java
record Rectangle(String name, double width, double height) {
    double area() {
        return width * height;
    }
}
Rectangle[] zone = new Rectangle[] {
    new Rectangle("Alfa", 17.8, 31.4),
    new Rectangle("Bravo", 9.6, 12.4),
    new Rectangle("Charlie", 7.1, 11.23),
};
// 多行模板表达式示例：表格
String table = FMT."""
    Description     Width    Height     Area
    %-12s\{zone[0].name}  %7.2f\{zone[0].width}  %7.2f\{zone[0].height}     %7.2f\{zone[0].area()}
    %-12s\{zone[1].name}  %7.2f\{zone[1].width}  %7.2f\{zone[1].height}     %7.2f\{zone[1].area()}
    %-12s\{zone[2].name}  %7.2f\{zone[2].width}  %7.2f\{zone[2].height}     %7.2f\{zone[2].area()}
    \{" ".repeat(28)} Total %7.2f\{zone[0].area() + zone[1].area() + zone[2].area()}
    """;
| 输出结果：
| """
| Description     Width    Height     Area
| Alfa            17.80    31.40      558.92
| Bravo            9.60    12.40      119.04
| Charlie          7.10    11.23       79.73
|                              Total  757.69
| """
```
