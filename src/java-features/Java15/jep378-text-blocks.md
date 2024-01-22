---
title: Java 15 新特性：文本块
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2023-12-27
category: Java
tag:
  - Java
  - Java 15
order: 378
---

# Java 15 新特性：文本块

Java 15(JEP 378)引入了**文本块**（Text Blocks）这一新特性，旨在简化多行字符串的表示，提高代码可读性，并减少在字符串中使用转义符的需求。
文本块通过引入三个双引号的**胖分隔符**（`"""`）来实现，同时支持转义序列，为开发人员提供更直观、易读的字符串处理方式。

## 快速上手

**HTML示例**

```java
// 使用“一维”字符串文字
String html = "<html>\n" +
              "    <body>\n" +
              "        <p>Hello, world</p>\n" +
              "    </body>\n" +
              "</html>\n";

// 使用“二维”文本块
String html = """
              <html>
                  <body>
                      <p>Hello, world</p>
                  </body>
              </html>
              """;
```

**SQL示例**

```sql
// 使用“一维”字符串文字
String query = "SELECT \"EMP_ID\", \"LAST_NAME\" FROM \"EMPLOYEE_TB\"\n" +
               "WHERE \"CITY\" = 'INDIANAPOLIS'\n" +
               "ORDER BY \"EMP_ID\", \"LAST_NAME\";\n";

// 使用“二维”文本块
String query = """
               SELECT "EMP_ID", "LAST_NAME" FROM "EMPLOYEE_TB"
               WHERE "CITY" = 'INDIANAPOLIS'
               ORDER BY "EMP_ID", "LAST_NAME";
               """;
```

**Polyglot语言示例**

```polyglot
// 使用“一维”字符串文字
ScriptEngine engine = new ScriptEngineManager().getEngineByName("js");
Object obj = engine.eval("function hello() {\n" +
                         "    print('\"Hello, world\"');\n" +
                         "}\n" +
                         "\n" +
                         "hello();\n");

// 使用“二维”文本块
ScriptEngine engine = new ScriptEngineManager().getEngineByName("js");
Object obj = engine.eval("function hello() {\n" +
                         "    print('\"Hello, world\"');\n" +
                         "}\n" +
                         "\n" +
                         "hello();\n");
```

## 编译时处理

文本块是String类型的常量表达式，类似于字符串字面量。然而，与字符串字面值不同，文本块的内容在编译时经历三个步骤的处理：==行终止符的规范化==、==附带白色空间的移除==和==解释转义序列==：

1. 转换内容的行终止符
    * 行终止符从CR（\u000D）和CRLF（\u000D\u000A）规范化为`LF（\u000A）`
2. 删除内容周围附带的白色空间（用于匹配Java源代码的缩进）
3. 解释内容中的转义序列，执行解释作为最后一步开发人员可以编写转义序列，如\n，而不会被前面的步骤修改或删除

处理后的内容以`CONSTANT_String_info`形式记录在**类文件的常量池**中，运行时，文本块被计算为String的实例。

## 新增转义序列

为了更精细地控制==换行符==和==空格==的处理，引入了两个新的转义序列：\ <line-terminator\> 和 \s。

### 换行符 \ <line-terminator\>

```java
// 传统方式
String literal = "Lorem ipsum dolor sit amet, consectetur adipiscing " +
                 "elit, sed do eiusmod tempor incididunt ut labore " +
                 "et dolore magna aliqua.";

// 使用 \ <line-terminator\>
String text = """
              Lorem ipsum dolor sit amet, consectetur adipiscing \
              elit, sed do eiusmod tempor incididunt ut labore \
              et dolore magna aliqua.\
              """;
```

> Tips： 因为字符和传统字符串不允许嵌入换行符，所以\ <line-terminator\> 转义序列只适用于文本块

### 单个空格 \s

新的 \s 转义序列简单地转换为单个空格（\u0020）

```java
// 使用 \s 保持固定长度
String colors = """
    red  \s
    green\s
    blue \s
    """;
```

转义序列直到去除无意义的空格后才被解释，\s 可以作为栅栏，防止尾随空格被去除。
在这个示例中，每行末尾使用 \s 可以确保每行长度恰好为六个字符。

## 文本块连接

文本块的连接是引入的一个方便的特性，使得字符串的拼接变得更加简洁。
在连接时，相邻的文本块将自动合并，无需显式使用加号连接操作符。

```java
// 字符串和文本块连接
String code = "public void print(Object o) {" +
              """
                  System.out.println(Objects.toString(o));
              }
              """;
                      
// 相邻的文本块将自动合并，无需显式使用加号连接操作符
String code = """
              public void print(Object o) {
              """
              """
                  System.out.println(Objects.toString(o));
              }
              """;
```

在上述示例中，两个相邻的文本块会自动连接，形成一个整体的字符串。
这种自动连接的特性让代码更加清晰，减少了冗余的拼接操作。

## 文本块新方法

文本块引入了一些新方法，以便更方便地处理多行字符串：

- `String::stripIndent()`：去除多行字符串的前导空格
- `String::translateEscapes()`：转义多行字符串中的转义字符
- `String::formatted()`：在文本块中使用占位符进行值替换
- `String::lines()：`：将多行字符串拆分为行的流，方便逐行处理。
