---
title: Maven
shortTitle: Maven
description: Maven 安装、仓库配置、版本标识及创建、编译工程的命令。
author: 流浪码客
isOriginal: true
date: '2019-04-12'
category: SSM
tag:
  - SSM
  - Maven
order: 2
---
# Maven

Maven 安装、仓库配置、版本标识及创建、编译工程的命令。

![Maven 安装、仓库配置、版本标识及创建、编译工程的命令：Maven核心特性](https://img.geekyspace.cn/pictures/2026/202610271647667.png)

![命令行提示 Maven 未加入系统 PATH](https://img.geekyspace.cn/pictures/2026/202610271648192.png)

示例使用 Maven 3.6.0：解压后，将 `bin` 目录加入 `PATH`。实际项目优先使用仓库自带的 Maven Wrapper，以固定构建版本。

![第二章 Maven 快速入门 6 节：Maven 工程结构](https://img.geekyspace.cn/pictures/2026/202610271648193.png)

## 版本标识

| 示例版本           | 含义    |
| -------------- | ----- |
| `1.0-RELEASE`  | 发布版   |
| `1.0-SNAPSHOT` | 开发快照版 |
| `1.0-ALPHA`    | 内部测试版 |
| `1.0-BETA`     | 公开测试版 |

告诉 IDEA 这个文件保存静态文件
![告诉 IDEA 这个文件保存静态文件：maven](https://img.geekyspace.cn/pictures/2026/202610271647668.png)

![告诉 IDEA 这个文件保存静态文件：Maven依赖管理](https://img.geekyspace.cn/pictures/2026/202610271647082.png)

## 仓库配置

```xml
<repositories>
	<!--配置阿里云仓库-->
	<repository>
		<id>aliyun</id>
		<name>aliyun</name>
		<url>https://maven.aliyun.com/repository/public</url>
	</repository>
</repositories>
```
![仓库配置：本地仓库与中央仓库](https://img.geekyspace.cn/pictures/2026/202610271647083.png)

![仓库配置：Maven 构建生命周期](https://img.geekyspace.cn/pictures/2026/202610271647084.png)

## 1. 在 cmd 中先使用 mvn -v 判断 maven 环境变量是否配置成功

![在 cmd 中先使用 mvn -v 判断 maven 环境变量是否配置成功](https://img.geekyspace.cn/pictures/2026/202610271647085.png)

## 2. 使用 mvn archetype:generate 创建 Maven 工程

![使用 mvn archetype:generate 创建 Maven 工程：E本地仓库](https://img.geekyspace.cn/pictures/2026/202610271647086.png)

![Maven archetype 命令行提示选择项目模板和版本](https://img.geekyspace.cn/pictures/2026/202610271647087.png)
直接回车，选择默认版本
![直接回车，选择默认版本](https://img.geekyspace.cn/pictures/2026/202610271647088.png)

## 3. 编译源代码

在 IDEA 的 Maven 工具窗口执行 `compile`。`Ctrl+Shift+F10` 通常运行当前上下文，不等同于 Maven 编译。

也可以在命令行执行 `mvn compile`。

![也可以在命令行执行 mvn compile](https://img.geekyspace.cn/pictures/2026/202610271647089.png)
使用 java 执行

## 4. 执行测试用例

![执行测试用例：amaven-t](https://img.geekyspace.cn/pictures/2026/202610271647927.png)

## 5. 对项目进行打包 mvn package

![对项目进行打包 mvn package](https://img.geekyspace.cn/pictures/2026/202610271647928.png)

## 6. 向本地仓库安装 mvn install

![mvn install 正在编译并运行项目测试](https://img.geekyspace.cn/pictures/2026/202610271647299.png)

![mvn install 显示测试通过和构建成功](https://img.geekyspace.cn/pictures/2026/202610271647661.png)

## 7. 发布 mvn deploy

![发布 mvn deploy](https://img.geekyspace.cn/pictures/2026/202610271647662.png)
