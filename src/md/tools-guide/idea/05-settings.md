---
title: IDEA 常用配置
date: 2019-01-06
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: 常用配置
description: 汇总 IDEA 的主题、字体、自动导包、代码格式、文件编码和自动编译等常用设置。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2021-06-01T21:39:14
created: 2019-01-06T03:41:49
---

# IDEA 常用配置

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

汇总 IDEA 的主题、字体、自动导包、代码格式、文件编码和自动编译等常用设置。

下面按 Settings 的菜单分类整理常用设置。菜单位置来自原课程版本，升级后可能有所变化。
进入设置界面

![IDEA 工程界面打开 Settings 的菜单入口](https://img.geekyspace.cn/pictures/2026/202610151623719.png)

目录结构如下

![IDEA Settings 左侧各配置分类说明](https://img.geekyspace.cn/pictures/2026/202610220239823.png)

## 1. Appearance & Behavior

### 1.1 设置主题

![Appearance 页面中切换 IDEA 主题](https://img.geekyspace.cn/pictures/2026/202610220241117.png)


这里默认提供了三套主题：IntelliJ，Darcula，High contrast。这里根据自己的喜好选择

### 1.2 设置窗口及菜单的字体及字体的大小

![Appearance 页面中设置菜单字体和字号](https://img.geekyspace.cn/pictures/2026/202610220241779.png)

### 1.3 补充：设置编辑区主题(可忽略)

IDEA 默认提供了 2 个编辑区主题，可以通过如下方式进行选择

![Editor Color Scheme 页面中选择编辑器配色](https://img.geekyspace.cn/pictures/2026/202610220241599.png)

如果想要更多的主题效果的话，可以到如下网站下载：
<http://www.riaway.com/>
下载之后，导入主题(方式一)
File --> import Settings --> 选中下载的主题 jar 文件 --> 一路确认 --> 重启

![File 菜单中的导入设置入口](https://img.geekyspace.cn/pictures/2026/202610220242723.png)

重启以后，新主题会自动启用。如果没有启用，可以选择如下方式选择

![Editor Color Scheme 页面选择导入的配色主题](https://img.geekyspace.cn/pictures/2026/202610220242763.png)

下载之后，导入主题(方式二)

![Color Scheme 菜单中的导入配色方案命令](https://img.geekyspace.cn/pictures/2026/202610220242773.png)

### 1.4 补充:通过插件(plugins)更换主题

喜欢黑色主题的话，可以下载插件：Material Theme UI

![Plugins 页面中的插件仓库入口](https://img.geekyspace.cn/pictures/2026/202610220243795.png)

点击按钮后，在联网环境下搜索如下插件-安装-重启 IDEA 即可：

![插件仓库中搜索并安装 Material Theme UI](https://img.geekyspace.cn/pictures/2026/202610220243325.png)

如果对安装的主题插件不满意，还可以找到此插件，进行卸载 - 重启 IDEA 即可

## 2. Editor-General

### 2.1 设置鼠标滚轮修改字体大小

![Editor General 中用 Ctrl 加滚轮改变字体大小的选项](https://img.geekyspace.cn/pictures/2026/202610220244886.png)

我们勾选此设置后，增加 Ctrl+鼠标滚轮 快捷键开控制代码字体大小显示

### 2.2 设置鼠标悬浮提示

![Editor General 中鼠标悬停显示文档的选项](https://img.geekyspace.cn/pictures/2026/202610220244065.png)

### 2.3 设置自动导包功能

![Auto Import 页面中的自动导入与优化导包设置](https://img.geekyspace.cn/pictures/2026/202610220244666.png)

- Add unambiguous imports on the fly：自动导入没有歧义的类
- Optimize imports on the fly：自动帮我们优化导入的包

### 2.4 设置显示行号和方法间的分割符

![Editor Appearance 页面中的行号和方法分隔线选项](https://img.geekyspace.cn/pictures/2026/202610220244785.png)

- 如上图红圈所示，可以勾选 Show line numbers：显示行数。我建议一般这个要勾选上
- 如上图红圈所示，可以勾选 Show method separators：显示方法分隔线。这种线有助于我们区分开方法，所以建议勾选上

### 2.5 忽略大小写提示

![Code Completion 页面中的大小写匹配设置](https://img.geekyspace.cn/pictures/2026/202610220245248.png)

IntelliJ IDEA 的代码提示和补充功能有一个特性：区分大小写。
如上图标注所示，默认就是 First letter 区分大小写的 ，区分大小写的情况是这样的：
比如我们在 Java 代码文件中输入 stringBuffer，IntelliJ IDEA 默认是不会帮我们提示或是代码补充的，
但是如果我们输入 StringBuffer 就可以进行代码提示和补充

- 如果不想区分大小写，把 Match case 的勾勾去掉即可

### 2.6 设置取消单行显示 tabs 的操作，Tab 靠右，最多显示 30 个 Tab

![Editor Tabs 页面取消单行标签和限制标签数量](https://img.geekyspace.cn/pictures/2026/202610220245058.png)

如上图标注所示，在打开很多文件的时候，IntelliJ IDEA 默认是把所有打开的文件名 Tab 单行显示的。
但是我个人现在的习惯是使用多行，多行效率比单行高，因为单行会隐藏超过界面部分 Tab，这样找文件不方便

### 2.7 修改默认单行注释格式

原本风格

![修改前的 Java 单行注释默认缩进样式](https://img.geekyspace.cn/pictures/2026/202610220246505.png)

修改 在注释开始处添加空格

![Code Style Java 页面中的单行注释缩进设置](https://img.geekyspace.cn/pictures/2026/202610220246758.png)

调整后的风格

![修改后的 Java 单行注释缩进样式](https://img.geekyspace.cn/pictures/2026/202610220246984.png)

## 3. Editor-Font

### 3.1 设置默认的字体，字体大小，字体间距

![Editor Font 页面中设置字体、字号和行间距](https://img.geekyspace.cn/pictures/2026/202610220246910.png)

## 4. Editor-Color Scheme

### 4.1 修改当前主题的字体，字体大小，字体行间距(可忽略)

如果当前主题不希望使用默认字体，字体大小，字体行间距，还可以设置：

![当前配色主题的编辑器字体设置](https://img.geekyspace.cn/pictures/2026/202610220247891.png)

### 4.2 修改当前主题的控制台输出的字体及字体大小(可忽略)

![Console Font 页面中设置控制台输出字体](https://img.geekyspace.cn/pictures/2026/202610220247989.png)

### 4.3 修改代码中注释的字体颜色

![Language Defaults 页面中设置代码注释颜色](https://img.geekyspace.cn/pictures/2026/202610220247590.png)

- DocComment-Text：修改文档注释的字体颜色
- Blockcomment ：修改多行注释的字体颜色
- Line comment ：修改单行注释的字体颜色

## 5. Editor-Code Style

### 5.1 设置超过指定 import 个数，改为\*(可忽略)

![Java Imports 页面中调整星号导入阈值](https://img.geekyspace.cn/pictures/2026/202610220247751.png)

## 6. Editor-File and Code Templates

### 6.1 修改类头的文档注释信息

![File and Code Templates 中编辑 Java 类文件头注释](https://img.geekyspace.cn/pictures/2026/202610220248195.png)

```java
/**
@author 周宇
@create ${YEAR}-${MONTH}-${DAY} ${TIME}
 */

/**
 * Create by 周宇
 * ${YEAR}-${MONTH}-${DAY} ${TIME}
 */
```

常用的预设的变量，这里直接贴出官网给的


![类文件头模板可用的包名、日期和项目变量列表](https://img.geekyspace.cn/pictures/2026/202610151623720.png)



## 7. Editor-File Encodings

### 7.1 设置项目文件的编码

![File Encodings 页面中设置全局和工程 UTF-8 编码](https://img.geekyspace.cn/pictures/2026/202610220248958.png)

说明：Transparent native-to-ascii conversion 主要用于转换 ascii,一般要勾上， 不然 Properties 文件中的注 释显示的都不会是中文。

### 7.2 设置当前源文件的编码(可忽略)

![IDEA 状态栏中的当前文件编码选择菜单](https://img.geekyspace.cn/pictures/2026/202610220248047.png)

![更改当前文件编码时的 Reload 或 Convert 提示](https://img.geekyspace.cn/pictures/2026/202610220249796.png)

对单独文件的编码修改还可以点击右下角的编码设置区。如果代码内容中包含中文，则会弹出如上的操作选择。其中：
1. Reload 表示使用新编码重新加载，新编码不会保存到文件中，重新打开此文件，旧编码是什么依旧还是什么。
2. Convert 表示使用新编码进行转换，新编码会保存到文件中，重新打开此文件，新编码是什么则是什么。
3. 含有中文的代码文件，Convert 之后可能会使中文变成乱码，所以在转换成请做好备份，不然可能出现转换过程变成乱码，无法复原。

## 8. Build,Execution,Deployment

### 8.1 设置自动编译

![Compiler 页面中启用自动编译与并行模块编译](https://img.geekyspace.cn/pictures/2026/202610220250879.png)

构建
就是以我们编写的 java 代码、框架配置文件、国际化等其他资源文件、JSP 页面和图片等资源作为“原材料”，去“生产” 出一个可以运行的项目的过程。
Intellij Idea 默认状态为不自动编译状态，Eclipse 默认为自动编译：

![IDEA 的 Build Automatically 菜单选项](https://img.geekyspace.cn/pictures/2026/202610220250868.png)

## 9. 设置为省电模式(可忽略)

![File 菜单中的省电模式 Power Save Mode](https://img.geekyspace.cn/pictures/2026/202610220250259.png)

如上图所示，IntelliJ IDEA 有一种叫做省电模式的状态，开启这种模式之后 IntelliJ IDEA 会关掉代码检查和代码提示等功能。所以一般也可认为这是一种阅读模式，如果你在开发过程中遇到突然代码文件不能进行检查和提示，可以来看看这里是否有开启该功能。

## 10. 设置代码水平或垂直显示

![编辑器标签右键菜单中的水平和垂直拆分](https://img.geekyspace.cn/pictures/2026/202610220250897.png)

## 11. IDEA 2020.1 补充设置

### 11.1 安装与配置 Cmder
官网：<https://cmder.net/>
windows 下最好的命令行工具
添加环境变量 path
配置右键快捷启动

```shell
// 设置任意地方鼠标右键启动Cmder
Cmder.exe /REGISTER ALL
```

简书 Cmder 安装教程：<https://www.jianshu.com/p/5b7c985240a7>
"cmd.exe" /k ""%CMDER_ROOT%\vendor\init.bat""
![Terminal 页面中将终端 Shell 路径设置为 Cmder](https://img.geekyspace.cn/pictures/2026/202610151623721.png)

### 11.2 取消自动更新
![Updates 页面中的自动检查更新选项](https://img.geekyspace.cn/pictures/2026/202610151623722.png)

### 11.3 取消自动打开工程
![System Settings 页面中的自动打开上次工程选项](https://img.geekyspace.cn/pictures/2026/202610151623723.png)

### 11.4 背景图片
![Appearance 页面中的背景图片设置入口](https://img.geekyspace.cn/pictures/2026/202610151623724.png)

### 11.5 内存设置与卡顿排查
![IDEA 菜单中打开自定义 VM 选项文件](https://img.geekyspace.cn/pictures/2026/202610151623725.png)

![VM 选项文件中设置 -Xms 和 -Xmx 内存大小](https://img.geekyspace.cn/pictures/2026/202610151623726.png)

### 11.6 显示内存使用情况
![IDEA 状态栏启用内存使用情况显示](https://img.geekyspace.cn/pictures/2026/202610151623727.png)

### 11.7 自定义 Spring Boot 启动 Banner
修改图标步骤
在 src/main/resources 目录下创建一个 banner.txt 文件；
在线生成字符图标工具
<http://patorjk.com/software/taag/>
<http://www.network-science.de/ascii/>

### 11.8 Eclipse Console 查找
![Keymap 页面中查找 Eclipse Console 操作的快捷键](https://img.geekyspace.cn/pictures/2026/202610151623728.png)

![编辑器中使用 Eclipse Console 方式查找文本](https://img.geekyspace.cn/pictures/2026/202610151623729.png)
