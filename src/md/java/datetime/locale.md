---
title: 获取用户的区域设置、国际化
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-02-04
category: Java Dates
tags:
  - date-time
  - 国际化
---
# 获取用户的区域设置、国际化
> 此文参考文献：
> 
> * [【howtodoinjava】- 在 Java 中获取当前区域设置](https://howtodoinjava.com/java/date-time/how-to-get-current-user-locale-in-java/)
> * [【howtodoinjava】- Java 本地化：一份全面的指南](https://howtodoinjava.com/java/date-time/java-locale-api-examples/)

## 1. Locale 简介
`java.util.Locale` 是 Java 国际化 (i18n) 的核心类，用于标识特定的**语言**和**地区**。它是所有**区域设置敏感**类（如 `DateFormat`, `NumberFormat`, `MessageFormat`）的基础配置对象。
### 1.1 核心组成
`Locale` 对象在逻辑上由语言、国家、脚本、变体和扩展等字段组成（遵循 [IETF BCP 47](https://www.rfc-editor.org/info/bcp47) 标准）

| 组成部分                | 描述                      | 示例                                                |
| :------------------ | :---------------------- | :------------------------------------------------ |
| **语言** (Language)   | ISO 639-1 两字母代码         | `en` (英语), `zh` (中文)                              |
| **国家/地区** (Country) | ISO 3166-1 两字母代码        | `US` (美国), `CN` (中国)                              |
| 脚本（Script）          | ISO 15924 四字母代码         | `"Latn"` (拉丁字母), `"Hans"` (简体中文), `"Hant"` (繁体中文) |
| 变体 (Variant)        | 特定方言或版本 (可选)            | `Traditional_WIN`, `POSIX`                        |
| 扩展（Extensions）      | 额外信息，遵循 BCP 47 扩展语法（可选） | `u-ca-gregory`（使用公历）, `x-lvariant-POSIX`（私有扩展）    |
### 1.2 获取用户区域设置
![Java 获取用户的区域设置（Locale）](http://img.geekyspace.cn/pictures/2025/202602051846868.png)
**Web 应用**：通常根据 HTTP 请求头 `Accept-Language` 获取用户偏好：
```java
Locale locale = request.getLocale();
System.out.println(locale.getDisplayName()); // 例如: 中文 (中国)
```
**桌面/服务端应用**：默认使用 JVM 或操作系统的设置：
```java
// 获取默认 Locale
Locale defaultLocale = Locale.getDefault();
// 或者通过系统属性
String lang = System.getProperty("user.language");
String region = System.getProperty("user.country");
```
## 2. 创建 Locale 实例
### 2.1 推荐方式 (Java 19+)
从 Java 19 开始，推荐使用静态工厂方法 `Locale.of()`：
```java
Locale us = Locale.of("en", "US");
Locale zh = Locale.of("zh", "CN");
```
> **注意**：`new Locale("en", "US")` 构造函数在 Java 19 中已被弃用，建议改用 `Locale.of()`。
### 2.2 内置常量
对于主要国家和语言，直接使用内置常量：
```java
Locale us = Locale.US;
Locale china = Locale.CHINA;
Locale simplifiedChinese = Locale.SIMPLIFIED_CHINESE;
```
### 2.3 构建器与标签解析
针对复杂场景或标准标签：
```java
// 1. 使用 Builder (更灵活，自带校验)
Locale locale = new Locale.Builder()
        .setLanguage("en")
        .setRegion("US")
        .build();

// 2. 解析 BCP 47 语言标签
Locale usLocale = Locale.forLanguageTag("en-US");
Locale fromTag = Locale.forLanguageTag("zh-cmn-Hans-CN");
```
## 3. 设置默认 Locale
虽然通常**不建议**修改全局默认值，但在某些特定场景下需要强制指定：
```java
// 全局设置
Locale.setDefault(Locale.US);

// 分类设置 (Java 7+)：独立控制显示与格式化
Locale.setDefault(Locale.Category.DISPLAY, Locale.US);    // 影响 UI 界面/日志语言
Locale.setDefault(Locale.Category.FORMAT, Locale.FRANCE); // 影响 日期/货币格式
```
## 4. 常见应用场景
### 4.1 格式化 (日期/数字/货币)
`Locale` 决定了数据的展示格式：
```java
Locale us = Locale.US;
double num = 123456.789;

// 1. 数字格式化
System.out.println(NumberFormat.getInstance(us).format(num)); 
// 输出: 123,456.789

// 2. 货币格式化
System.out.println(NumberFormat.getCurrencyInstance(us).format(num)); 
// 输出: $123,456.79

// 3. 日期格式化
System.out.println(DateFormat.getDateInstance(DateFormat.LONG, us).format(new Date()));
// 输出示例: February 5, 2026
```
### 4.2 国际化消息 (ResourceBundle)
根据 `Locale` 加载对应的资源文件（如 `msg_en.properties`, `msg_zh.properties`）：
```java
Locale zhCN = Locale.SIMPLIFIED_CHINESE;   //简化中文
Locale enUS = Locale.US;                   //美式英语

// 加载 resources/i18n 包下的 
// messages_zh_CN.properties 和 messages_en_US.properties
ResourceBundle bundleZh = ResourceBundle.getBundle("i18n.messages", zhCN);  
ResourceBundle bundleEn = ResourceBundle.getBundle("i18n.messages", enUS);  
System.out.println("中文消息: " + bundleZh.getString("greeting"));  
System.out.println("英文消息: " + bundleEn.getString("greeting"));
```
---
**参考资料：**
* [Java国际化实践实现多语言及日期货币本地化-开发者社区-阿里云](https://developer.aliyun.com/article/1556409)
* [Java学习路线-21：国际化Locale、ResourceBundle、MessageFormat-阿里云开发者社区](https://developer.aliyun.com/article/1008126)

**资源：**
* [ISO 国家代码](https://www.iso.org/obp/ui/#search)
* [ISO 语言代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)