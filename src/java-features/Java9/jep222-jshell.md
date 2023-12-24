---
# 信息 Frontmatter 配置
title: Java 9 新特性：交互式编程环境JShell
description:
author: 会敲代码的程序猿
isOriginal: true
date: 2023-12-24
category: Java
tag:
  - Java
order: 222
---

Java 9 引入了许多新特性，其中之一就是 JShell，这是一个交互式编程环境，也被称为 REPL（Read-Eval-Print Loop）。
JShell 的目标是使 Java 编程更加互动和易学，尤其是对于初学者和快速原型开发。

## JShell快速入门

### 启动JShell

打开终端，然后执行命令：`jshell`，执行效果如下：

```java
➜  ~ jshell
|  欢迎使用 JShell -- 版本 9
|  要大致了解该版本, 请键入: /help intro

jshell>
```

### 帮助介绍 /help intro

```
jshell> /help intro
|
|                                   intro
|                                   =====
|
|  使用 jshell 工具可以执行 Java 代码，从而立即获取结果。
|  您可以输入 Java 定义（变量、方法、类等等），例如：int x = 8
|  或 Java 表达式，例如：x + x
|  或 Java 语句或导入。
|  这些小块的 Java 代码称为“片段”。
|
|  这些 jshell 工具命令还可以让您了解和
|  控制您正在执行的操作，例如：/list
|
|  有关命令的列表，请执行：/help

jshell>
```

### 定义（变量、方法、类等等）

```java
// 定义变量
jshell> int x = 8
x ==> 8

// 定义方法
jshell> int square(int num) {
   ...>     return num * num;
   ...> }
|  已创建 方法 square(int)

// 定义类
jshell> public class Message{
   ...>     private String msg;
   ...>     public Message(String msg){
   ...>         this.msg = msg;
   ...>     }
   ...>     public String getMessage(){
   ...>         return msg;
   ...>     }
   ...> }
|  已创建 类 Message

jshell>
```

### 执行（表达式、调用方法）

```java
// 执行 Java 表达式
jshell> x + x
$4 ==> 16

// 调用方法
jshell> square(5)
$5 ==> 25

    
// 创建类实例并调用方法
jshell> Message messageObj = new Message("Hello, JShell!");
messageObj ==> Message@6d4b1c02

jshell> messageObj.getMessage()

$7 ==> "Hello, JShell!"
```

### 列出输入源条目：/list

执行后，可以看到之前在`jshell`中输入的内容清单：

```java
jshell> /list

   1 : int x = 8;
   2 : int square(int num) {
           return num * num;
       }
   3 : public class Message{
           private String msg;
           public Message(String msg){
               this.msg = msg;
           }
           public String getMessage(){
               return msg;
           }
       }
   4 : x + x
   5 : square(5)
   6 : Message messageObj = new Message("Hello, JShell!");
   7 : messageObj.getMessage()

jshell>
```

### 查看定义 /methods、/vars

```java
// 查看定义的函数：/methods
jshell> /methods
|    int square(int)

jshell>
    
// 查看定义的变量：/vars
jshell> /vars
|    int x = 8
|    int $4 = 16
|    int $5 = 25
|    Message messageObj = Message@6d4b1c02
|    String $7 = "Hello, JShell!"

jshell>
```

### 
