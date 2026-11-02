---
title: IDEA 插件、缓存与其他设置
date: 2019-01-08
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: 插件、缓存与其他设置
description: IDEA 生成 Javadoc、清理缓存与索引、设置更新及管理插件的方法。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2019-01-11T03:48:08
created: 2019-01-08T21:17:39
---

# IDEA 插件、缓存与其他设置

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

IDEA 生成 Javadoc、清理缓存与索引、设置更新及管理插件的方法。

## 1. 生成 javadoc

![IDEA Tools 菜单中的 Generate JavaDoc 命令](https://img.geekyspace.cn/pictures/2026/202610151623391.png)


![Generate JavaDoc 对话框中的输出目录、编码和区域设置](https://img.geekyspace.cn/pictures/2026/202610220306704.png)

输入：

Output directory：选择输出路径
Locale：输出语言类型：zh_CN
Other command line arguments：-encoding UTF-8 -charset UTF-8

## 2. 缓存和索引的清理

IntelliJ IDEA 首次加载项目的时候，都会创建索引，而创建索引的时间跟项目的文件多少成正比。在 IntelliJ IDEA 创建索引过程中即使你编辑了代码也是编译不了、运行不起来的，所以还是安安静静等 IntelliJ IDEA 创建索引完成。
缓存和索引用于加快文件查找、代码导航和代码提示。
但是，IntelliJ IDEA 的索引和缓存并不是一直会良好地支持 IntelliJ IDEA 的，某些特殊条件下，IntelliJ IDEA 的缓存和索引文件也是会损坏的，比如：断电、蓝屏引起的强制关机，当你重新打开 IntelliJ IDEA，很可能 IntelliJ IDEA 会报各种莫名其妙错误，甚至项目打不开，IntelliJ IDEA 主题还原成默认状态。即使没有断电、蓝屏，也会有莫名奇怪的问题的时候，也很有可能是 IntelliJ IDEA 缓存和索引出现了问题，这种情况还不少。遇到此类问题也不用过多担心。我们可以清理缓存和索引。如下：
![IDEA File 菜单中的 Invalidate Caches and Restart 命令](https://img.geekyspace.cn/pictures/2026/202610151623392.png)

![Invalidate Caches 对话框中的清理并重启选项](https://img.geekyspace.cn/pictures/2026/202610151624035.png)

- 一般建议点击 Invalidate and Restart，这样会比较干净。
- 上图警告：清除索引和缓存会使得 IntelliJ IDEA 的 Local History 丢失。所以如果你项目没
有加入到版本控制，而你又需要你项目文件的历史更改记录，那你最好备份下你的 Local History 目录。目录地址在：C:Users\当前登录的系统用户名\\lntelliJldea14\system\LocalHistory 建议使用硬盘的全文搜索，这样效率更高。

- 通过上面方式清除缓存、索引本质也就是去删除 c 盘下的 system 目录下的对应的文件而己，所以如果你不用上述方法也可以删除整个 system 当 IntelliJ IDEA 再次启动项目的时候会重新创建新的 system 目录以及对应项目缓存和索引。

## 3. 取消更新

![Updates 页面中关闭自动检查更新](https://img.geekyspace.cn/pictures/2026/202610151624036.png)

取消相应选项，关闭自动更新。

## 4. 插件的使用

在 IntelliJ IDEA 的安装讲解中我们其实己经知道，IntelliJ IDEA 本身很多功能也都是通过插件的方式来实现的。
官网插件库： <https://plugins.jetbrains.com/>
![Plugins 页面中搜索和安装插件](https://img.geekyspace.cn/pictures/2026/202610151624037.png)
如上图演示，在线安装 IntelliJ IDEA 插件库中的插件。安装完以后会提示重启， 才可以使用插件。
常用插件推荐：

| 插件名称 | 插件介绍 |
|----|----|
| Key promoter | 快捷键提示 |
| CamelCase | 驼峰式命名和下划线命名交替变化 |
| CheckStyle-lDEA | 代码样式检查 |
| FindBugs-lDEA | 代码 Bug 检查 |
| Statistic | 代码统计 |
| JRebel Plugin | 热部署 |
| CodeGlance | 在编辑代码最右侧，显示一块代码小地图 |
| Eclipse Code Formatter | 使用 Eclipse 的代码格式化风格，在一个团队中如果公司有规定格式化风格，这个可以使用。 |
| Gson Format | 把 JSON 字符串直接实例化成类 |

### 输入动画插件

1. [activate-power-mode](https://github.com/ViceFantasyPlace/activate-power-mode)
activate-power-mode 为输入过程添加动画效果，可按个人喜好启用。
![IDEA 编辑器中的输入动画插件效果](https://img.geekyspace.cn/pictures/2026/202610151624038.gif)
