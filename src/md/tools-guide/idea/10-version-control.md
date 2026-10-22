---
title: IDEA Git 与版本控制
date: '2019-01-08'
category: 历史归档
tags:
  - IntelliJ-IDEA
  - 历史教程
  - Java
shortTitle: Git 与版本控制
description: IDEA 连接 Git 与 GitHub、克隆项目、提交代码和查看本地历史的操作。
icon: intellij-idea
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: '2019-01-10T01:24:52'
created: '2019-01-08T21:07:45'
---

# IDEA Git 与版本控制

::: warning 历史归档
本文为旧版 IntelliJ IDEA 教程，以 Windows 和 IDEA 2018.3 一代界面为主，部分内容补充至 2020.1。菜单、快捷键及集成配置可能已变化，仅供历史参考，不作为最新版操作指南。
:::

IDEA 连接 Git 与 GitHub、克隆项目、提交代码和查看本地历史的操作。

不管是个人开发还是团队开发，版本控制都会被使用。而 IDEA 也很好的集成了版本控制的相关结构。

![IDEA Version Control 设置页面中的 Git 与 GitHub 配置入口](https://img.geekyspace.cn/pictures/2026/202610151623385.png)

- 很多人认为 IntelliJ IDEA 自带了 SVN 或是 Git 等版本控制工具，认为只要安装了 IntelliJ IDEA 就可以完全使用版本控制应有的功能。这完全是一种错误的解读，IntelliJ IDEA 是自带对这些版本控制工具的插件支持，但是该装什么版本控制客户端还是要照样装的

![Plugins 页面中的 Git Integration 和 GitHub 插件](https://img.geekyspace.cn/pictures/2026/202610220258238.png)

- IntelliJ IDEA 对版本控制的支持是以插件化的方式来实现的。旗舰版默认支持目前主流的版本控制软件：CVS、Subversion (SVN)、Git、Mercurial、Perforce 、TFS。又因为目前太多人使用 Github 进行协同或是项目版本管理，所以 IntelliJ IDEA 同时自带了 Github 插件，方便 Checkout 和管理你的 Github 项目。
- 在实际开发中，发现在 IDEA 中使用 SVN 的经历不算愉快，经常会遇到很多问题，比如紧急情况下 IDEA 无法更新、提交等。所以这里，谈下在 IDEA 中使用 Git。

## 1. 提前安装 Git 客户端

Git 的 msysGit 官网下载： <https://git-scm.com/>
Git 客户需 TortoiseGit 官网下载： <http://download.tortoisegit.org/tgit/>

## 2. 关联 git.exe

![Git 设置页面中指定 git.exe 并测试版本](https://img.geekyspace.cn/pictures/2026/202610220258256.png)

## 3. 关联 GitHub 上的账号，并测试连接

点击 Add account


![IDEA 登录 GitHub 的账号输入对话框](https://img.geekyspace.cn/pictures/2026/202610220258479.png)


![Version Control GitHub 页面显示已关联账号](https://img.geekyspace.cn/pictures/2026/202610220258542.png)

## 4. 在 GitHub 上创建账号下的一个新的仓库作为测试

![GitHub 页面中创建新仓库的菜单](https://img.geekyspace.cn/pictures/2026/202610220259527.png)

填写创建仓库信息

![GitHub 新建仓库表单中的名称、公开选项与 README](https://img.geekyspace.cn/pictures/2026/202610220259947.png)

创建成功

![GitHub 上已创建的 GitIDEATest 仓库页面](https://img.geekyspace.cn/pictures/2026/202610220259858.png)


## 5. 支持从当前的 GitHub 账号上直接 Checkout 项目

![IDEA VCS 菜单中的 Checkout from Version Control Git](https://img.geekyspace.cn/pictures/2026/202610220300498.png)

## 6. 在 IDEA 中 clone GitHub 上仓库

Directory 必须是空的且存在的

![IDEA Clone Repository 对话框中的仓库 URL 与本地目录](https://img.geekyspace.cn/pictures/2026/202610220259439.png)

这里需要在 GitHub 的自己的账户下，复制项目仓库路径，填写到上图 Git Repository URL 中。如下：

![GitHub 仓库页面中的 Clone or download 地址](https://img.geekyspace.cn/pictures/2026/202610220259032.png)

## 7. 连接成功以后，会下载 github 上的项目

![克隆完成后 IDEA 询问是否创建工程](https://img.geekyspace.cn/pictures/2026/202610220300428.png)

![导入克隆工程时选择从已有源码创建工程](https://img.geekyspace.cn/pictures/2026/202610220300633.png)

创建一个新的工程，选择 Next

![导入工程向导中填写项目名称与路径](https://img.geekyspace.cn/pictures/2026/202610220301081.png)

Next

![导入工程向导中选择要添加的源码目录](https://img.geekyspace.cn/pictures/2026/202610220300484.png)

Next

![导入工程向导提示未检测到框架](https://img.geekyspace.cn/pictures/2026/202610220300320.png)

Finish

![导入完成时选择当前窗口或新窗口打开工程](https://img.geekyspace.cn/pictures/2026/202610220300082.png)

选择以哪一种方式打开这个项目
This Window 覆盖当前项目
New Window 新窗口打开

## 8. 除此之外，还可以通过如下方式的方式连接 Github

![IDEA 从已有源码创建工程的菜单入口](https://img.geekyspace.cn/pictures/2026/202610220301423.png)

## 9. 本地代码分享到 Github

![IDEA VCS 菜单中的 Share Project on GitHub](https://img.geekyspace.cn/pictures/2026/202610220301948.png)

![工程已在 GitHub 上的提示对话框](https://img.geekyspace.cn/pictures/2026/202610220302910.png)

点击 Share Anyway

![Share Project on GitHub 对话框中的仓库名称和远端](https://img.geekyspace.cn/pictures/2026/202610220302842.png)

点击 Share

![首次提交时选择要加入 Git 的文件](https://img.geekyspace.cn/pictures/2026/202610220301625.png)

Add 进行提交

![将 vcs.xml 文件加入 Git 的确认对话框](https://img.geekyspace.cn/pictures/2026/202610220302093.png)

此时会在 GitHub 上创建一个新的仓库，而非更新一存在的仓库

![GitHub 上新建的 Project01 仓库列表](https://img.geekyspace.cn/pictures/2026/202610220303829.png)

## 10. Git 的常用操作

![IDEA 右键 Git 菜单中的提交、分支与推送操作](https://img.geekyspace.cn/pictures/2026/202610220303361.png)

- `clone`：将远程仓库克隆到本地。
- `commit`：将本地更改提交到仓库。
- `push`：将本地提交推送到远程仓库。
- `pull`：获取并整合远程更新。

## 11. 没有使用 Git 时本地历史记录的查看

![IDEA Local History 菜单中的 Show History](https://img.geekyspace.cn/pictures/2026/202610151623386.png)

![IDEA 本地历史的代码修改对比视图](https://img.geekyspace.cn/pictures/2026/202610151623387.png)
即使我们项目没有使用版本控制功能，IntelliJ IDEA 也给我们提供了本地文件历史记录
