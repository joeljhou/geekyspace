---
title: IDEA 代码模板
date: 2019-01-07
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: 代码模板
description: Live Templates 与 Postfix Completion 的常用缩写，以及修改和自定义代码模板的方法。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2020-01-17T16:17:04
created: 2019-01-07T20:20:20
---

# IDEA 代码模板

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

Live Templates 与 Postfix Completion 的常用缩写，以及修改和自定义代码模板的方法。

## 1. Live Templates(实用代码模板)功能介绍

Live Templates 将缩写展开为预定义的代码片段。例如，在 Java 中输入 `sout`，即可生成 `System.out.println();`。
官方介绍 Live Templates：
<https://www.jetbrains.com/help/idea/using-live-templates.html>

## 2. 已有的常用模板

Postfix Completion 默认如下：
![Editor Postfix Completion 页面中的代码后缀模板](https://img.geekyspace.cn/pictures/2026/202610151616696.png)
Live Templates 默认如下：
![Editor Live Templates 页面中的内置模板分组](https://img.geekyspace.cn/pictures/2026/202610151616697.png)
Live Templates 通过缩写生成代码片段；Postfix Completion 根据已有表达式补全代码，例如 `list.for`。原课程使用的版本支持自定义 Live Templates；Postfix 模板的可配置范围取决于 IDEA 版本。

### 2.1 主方法：psvm

```java
public static void main(String[] args) {
}
```

### 2.2 sout：`System.out.println();`

类似的：
![sout 系列模板展开为 System.out.println 的示例](https://img.geekyspace.cn/pictures/2026/202610151616698.png)

| 缩写           | 展开示例                                         |
| ------------ | -------------------------------------------- |
| `soutp`      | `System.out.println("args=[" + args + "]");` |
| `soutv`      | `System.out.println("args=" + args);`        |
| `soutm`      | `System.out.println("Templates.main");`      |
| `"abc".sout` | `System.out.println("abc");`                 |

### 2.3 fori：可生成 for 循环

类似的：
- `iter`：生成增强 for 循环。
- `itar`：生成数组遍历循环。

### 2.4 list.for：可生成集合 list 的 for 循环

`List<String> list = new ArrayList<>();`
输入：list.for 即可输出
```java
for (String s : list) {
}
```
又如：list.fori 或 list.forr

### 2.5 ifn：可生成 if(xxx==null)

类似的：
inn：可生成 if(xxx!=null) 或 xxx.nn 或 xxx.null

### 2.6 prsf：可生成 private static final

类似的：
- `psf`：生成 `public static final`。
- `psfi`：生成 `public static final int`。
- `psfs`：生成 `public static final String`。

## 3. 修改现有模板

如果对象现有的模板，感觉不习惯，不适应，可以修改：

### 修改 1

例如，将 `psvm` 的缩写改为 `main`，保持与 Eclipse 的使用习惯一致。
![Live Templates 中 main 方法模板的缩写与内容](https://img.geekyspace.cn/pictures/2026/202610151616699.png)

### 修改 2
![Live Templates 中 psf 私有静态常量模板](https://img.geekyspace.cn/pictures/2026/202610151616700.png)
类似的还可以修改 psfs。

## 4. 自定义模板

IDEA 提供了很多现有的 Templates。但是你也可以根据自己的需要创建新的 Template。
![Live Templates 中新增模板分组的菜单](https://img.geekyspace.cn/pictures/2026/202610151616701.png)
先定义一个模板的组
![Create New Group 对话框中填写自定义分组名称](https://img.geekyspace.cn/pictures/2026/202610151621270.png)

![Live Templates 列表中的自定义模板分组](https://img.geekyspace.cn/pictures/2026/202610151621271.png)
选中自定义的模板组，点击“+”来定义模板
![自定义 Live Template 的缩写、描述与代码内容](https://img.geekyspace.cn/pictures/2026/202610151621272.png)

1. Abbreviation 模板的缩略名称
2. Description 模板的描述
3. Template text 模板的代码片段
4. 应用范围：点击 **Define**，选择模板适用的语言或代码位置。

可以如上的方式定义个测试方法，然后在 java 类文件中测试即可。
类似的可以再配置如下的几个 Template

1. ![自定义 private int 字段模板的变量占位符](https://img.geekyspace.cn/pictures/2026/202610151621273.png)
2. ![自定义 private String 字段模板的变量占位符](https://img.geekyspace.cn/pictures/2026/202610151621274.png)
![Live Template 适用语言列表中选择 Java](https://img.geekyspace.cn/pictures/2026/202610151621275.png)
