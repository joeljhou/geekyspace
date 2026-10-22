---
title: IDEA 快捷键配置
date: 2019-01-06
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: 快捷键配置
description: IDEA 快捷键方案的切换、修改、导入方式，并整理常用快捷键。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2019-01-07T22:15:05
created: 2019-01-06T03:49:47
---

# IDEA 快捷键配置

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

IDEA 快捷键方案的切换、修改、导入方式，并整理常用快捷键。

## 1. 设置快捷键为 Eclipse 的快捷键

![Keymap 页面切换到 Eclipse 快捷键方案](https://img.geekyspace.cn/pictures/2026/202610151623377.png)

## 2. 通过快捷键功能修改快捷键设置

![Keymap 页面搜索 Duplicate Line 并查看现有快捷键](https://img.geekyspace.cn/pictures/2026/202610151623378.png)

![Keymap 中为 Duplicate Line 设置自定义快捷键](https://img.geekyspace.cn/pictures/2026/202610220254006.png)

## 3. 通过指定快捷键，查看或修改其功能

![Keymap 中通过 Find Shortcut 搜索按键对应的操作](https://img.geekyspace.cn/pictures/2026/202610151623379.png)

![Keymap 中输入按键查看或修改对应操作](https://img.geekyspace.cn/pictures/2026/202610220254563.png)

## 4. 导入已有的设置

![File 菜单中的 Import Settings 命令](https://img.geekyspace.cn/pictures/2026/202610151623380.png)

![导入设置对话框中选择 keymap 配置文件](https://img.geekyspace.cn/pictures/2026/202610151623381.png)
点击 OK 后，重启 IDEA 即可

## 5. 常用快捷键

| 原课程序号 | 操作 | 快捷键调整 |
| --- | --- | --- |
| 1 | 执行(run) | ctrl+shift+f10 --\> 改成 alt+r |
| 10 | 向上开始新的一行 | ctrl+alt+enter --\> 改成 ctrl+shift+enter |
| 13 |  | Eclipse 中的 ctrl+1 == IDEA 中的 alt+enter |
| 17 | 提示方法参数类型 | 添加 ctrl+alt+/快捷键 |
| 27 | 查看类的结构 | ctrl+o 类似于 Eclipse 中的 outline |
| 30 | 生成构造器 | alt+insert --\> 改成 ctrl+shift+s |
| 32 | 收起所有方法 Collapse All | ctrl+shift+numpad/--\> 改成 alt+shift+c |
| 33 | 打开所有方法 Expand All | ctrl+numpad\*--\> 改成 alt+shift+x |
| 34 | 打开代码所在的硬盘文件夹 Show in Explorer | 添加 ctrl+shift+x |
| 36 | 局部变量抽取为成员变量 Field | ctrl+alt+f --\> alt+shift+f |
| 40 | 查找类的继承结构图 Show UML Diagram | ctrl+alt+shift+u --\> ctrl+shift+u |
| 41 | 查看方法的多重重写结构 | ctrl+shift+h --\> ctrl+alt+h |
| 42 | 添加到收藏夹 Add to Favorites | 添加 ctrl+alt+f 快捷键 |
| 45 | 关闭当前打开的代码 Close | ctrl+f4 --\> ctrl+w |
| 47 | 快速搜索类中间的错误 Next Highlighted Error | ctrl+shift+q |
| 49 | 查找方法在哪里被调用 Call Hierarchy | 添加 ctrl+shift+h |

![IDEA 常用快捷键表第一部分：运行与编辑](https://img.geekyspace.cn/pictures/2026/202610151623382.png)
![IDEA 常用快捷键表第二部分：格式化与重构](https://img.geekyspace.cn/pictures/2026/202610151623383.png)
![IDEA 常用快捷键表第三部分：导航与查找](https://img.geekyspace.cn/pictures/2026/202610151623384.png)
