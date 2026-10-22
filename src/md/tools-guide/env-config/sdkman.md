---
title: Java生态版本管理神器—SDKMAN
shortTitle: SDKMAN：Java 版本管理
description: SDKMAN 安装、升级与使用指南，涵盖工具自身更新、Java 发行版查询、JDK 安装与卸载、当前会话版本切换及全局默认版本设置。
icon: https://sdkman.io/assets/img/sdkman-pattern.svg
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: true
date: 2025-03-15
category: 包管理器
tags:
  - SDKMAN
---
# Java生态版本管理神器—SDKMAN

主要官方来源：[SDKMAN官网](https://sdkman.io/) | [Github](https://github.com/sdkman)

> SDKMAN! 是一个轻量级、支持多平台，开源的，用于管理多个 SDK（如 `Java`、`Kotlin`、`Gradle`、`Maven` 等）的工具。

## 安装SDKMAN

**安装 SDKMAN!**
* 只需启动一个新终端并输入：
```shell
curl -s "https://get.sdkman.io" | bash
```
**初始化并配置环境变量**
* 按照屏幕上的说明完成安装。然后，打开一个新终端或在同一 shell 中运行以下命令：
```shell
source "$HOME/.sdkman/bin/sdkman-init.sh"
```
最后，运行以下代码片段来确认安装成功：
```shell
sdk version
```
您应该看到包含最新脚本和本机版本的输出：
```shell
SDKMAN!
script: 5.19.0
native: 0.6.0 (macos aarch64)
```

## 升级 SDKMAN

**升级 SDKMAN 工具本身**
```shell
sdk selfupdate
```
升级完成后，运行 `sdk version` 查看版本，确认升级结果。

如果提示已经是最新版，但需要强制重新安装最新版，可以运行：
```shell
sdk selfupdate force
```

注意区分以下命令：

| 命令 | 作用 |
| --- | --- |
| `sdk selfupdate` | 升级 SDKMAN 工具本身 |
| `sdk update` | 刷新本地 SDK 候选项元数据，不升级 SDKMAN 或已安装的 JDK |
| `sdk upgrade java` | 检查并交互式升级已安装且有可用更新的 Java 版本 |

## 使用指南

以下是基于 SDKMAN! 文档整理的 **Java SDK 管理命令及详细解释**，按照使用流程排列：
### 查看Java版本
```shell
sdk list java
```
查看所有 [Java 发行版](https://sdkman.io/jdks)（如 Zulu、AdoptOpenJDK、Amazon Corretto 等）及版本列表。
![sdk list java](http://img.geekyspace.cn/pictures/2025/20250313021115034.png)
* **关键字段**：`Identifier` 是安装时使用的唯一标识符（如 `21.0.6-tem`）。

### JDK的安装与卸载

**安装指定版本的 Java**
```shell
sdk install java $Identifier
```
* 如果不输入`$Identifier`的话，会自动安装最新的稳定版本。
* Eclipse Temurin 作为默认 JDK，因为它被广泛认为是 OpenJDK 发行版的事实标准。


**卸载已安装的 Java 版本**
```shell
sdk uninstall java $Identifier
```
### JDK版本管理

**切换 Java 版本（当前会话有效）**
```shell
sdk use java $Identifier
```

**设置全局默认 Java 版本**
```shell
sdk default java $Identifier
```

**查看当前 Java 版本**
```shell
sdk current java
```
