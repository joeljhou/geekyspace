---
title: Java 9 新特性：交互式编程环境JShell
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2023-12-21
category: Java Features
tag:
  - java
order: 222
---

# Java 9 新特性：交互式编程环境JShell

JShell 是 Java 9 引入的一个**交互式编程环境**，它是 Java 编程语言的 REPL（Read-Eval-Print Loop）实现。
REPL 是一种编程环境，允许用户输入表达式并立即看到结果，而无需事先编写和编译完整的程序。
JShell 的目标是提供一个轻量级、灵活且易于使用的工具，使得 Java 开发者能够更直观地编写和测试代码。

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

执行 `/help intro` 命令以获取有关 JShell 工具的简要介绍，**intro** 是主题，提供了关于 jshell 工具的核心概念和使用方法的信息。

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

### 定义变量、方法、类

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

### 执行表达式、调用方法

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

## 查看定义的变量：/vars

```java
jshell> /vars
|    int x = 8
|    int $4 = 16
|    int $5 = 25
|    Message messageObj = Message@6d4b1c02
|    String $7 = "Hello, JShell!"
```

## 查看定义的方法：/methods

```java
jshell> /methods
|    int square(int)
```

## 查看定义的类：/types

```java
jshell> /types
|    class Message

```

## 列出输入源条目：/list

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

## 编辑源条目：/edit

上面通过`/list`列出了输入的条目信息，下面试试通过`/edit`编辑下，比如：

```java
jshell> /edit 2
```

这将打开编辑器，修改先前定义的 `square` 方法。

修改完成后，点击 **accept** 即可

## 删除源条目：/drop

使用 `/drop` 命令可以删除之前输入的源代码块。可以通过指定**名称**或 **ID** 删除特定的源代码块。例如：

```java
jshell> /drop Message
|  已删除 类 Message
```

这将删除之前定义的 `Message` 类。

## 保存文件：/save

通过 `/save` 命令，您可以将 JShell 中的源代码保存到文件中，以便将其保留或与他人共享。例如：

```java
jshell> /save myCode.java
```

这将把当前所有的源代码保存到一个名为 `myCode.java` 的文件中。

## 打开文件：/open

使用 `/open` 命令可以将文件的内容导入到 JShell 中，以便重新使用或修改。例如：

```java
jshell> /open myCode.java
```

这将导入之前保存的 `myCode.java` 文件中的源代码。

## 重置jshell：/reset

使用 `/reset` 命令可以清空 JShell 的状态，包括所有定义的变量、方法和类。例如：

```java
jshell> /reset
|  正在重置状态
```

这将重置 JShell 并清除所有之前定义的内容。

## 查看引入的包：/imports

使用 `/imports` 命令可以查看当前已经导入的包。这对于确保您在 JShell 中能够访问所需的类和方法非常有用。例如：

```java
jshell> /imports
|    import java.util.*
```

这表明已经导入了 `java.util` 包。

## 退出jshell：/exit

使用 `/exit` 命令可以退出 JShell。如果需要，在命令后可以添加一个整数表达式片段作为退出代码。例如：

```java
jshell> /exit 0
```

这将以退出代码 0 退出 JShell。

## 查看命令：/help

最后，使用 `/help` 命令可以随时查看 JShell 的帮助信息，了解各种命令和主题的使用方法。例如：

```java
jshell> /help
|  键入 Java 语言表达式, 语句或声明。
|  或者键入以下命令之一:
|  /list [<名称或 id>|-all|-start]
|  	列出您键入的源
|  /edit <名称或 id>
|  	编辑源条目
|  /drop <名称或 id>
|  	删除源条目
|  /save [-all|-history|-start] <文件>
|  	将片段源保存到文件
|  /open <file>
|  	打开文件作为源输入
|  /vars [<名称或 id>|-all|-start]
|  	列出已声明变量及其值
|  /methods [<名称或 id>|-all|-start]
|  	列出已声明方法及其签名
|  /types [<名称或 id>|-all|-start]
|  	列出类型声明
|  /imports 
|  	列出导入的项
|  /exit [<integer-expression-snippet>]
|  	退出 jshell 工具
|  /env [-class-path <路径>] [-module-path <路径>] [-add-modules <模块>] ...
|  	查看或更改评估上下文
|  /reset [-class-path <路径>] [-module-path <路径>] [-add-modules <模块>]...
|  	重置 jshell 工具
|  /reload [-restore] [-quiet] [-class-path <路径>] [-module-path <路径>]...
|  	重置和重放相关历史记录 -- 当前历史记录或上一个历史记录 (-restore)
|  /history [-all]
|  	您键入的内容的历史记录
|  /help [<command>|<subject>]
|  	获取有关使用 jshell 工具的信息
|  /set editor|start|feedback|mode|prompt|truncation|format ...
|  	设置配置信息
|  /? [<command>|<subject>]
|  	获取有关使用 jshell 工具的信息
|  /! 
|  	重新运行上一个片段 -- 请参阅 /help rerun
|  /<id> 
|  	按 ID 或 ID 范围重新运行片段 -- 参见 /help rerun
|  /-<n> 
|  	重新运行以前的第 n 个片段 -- 请参阅 /help rerun
|  
|  有关详细信息, 请键入 '/help', 后跟
|  命令或主题的名称。
|  例如 '/help /list' 或 '/help intro'。主题:
|  
|  intro
|  	jshell 工具的简介
|  keys
|  	类似 readline 的输入编辑的说明
|  id
|  	片段 ID 以及如何使用它们的说明
|  shortcuts
|  	片段和命令输入提示, 信息访问以及
|  	自动代码生成的按键说明
|  context
|  	/env /reload 和 /reset 的评估上下文选项的说明
|  rerun
|  	重新评估以前输入片段的方法的说明

jshell> 
```

这将显示 JShell 的主要帮助信息。
