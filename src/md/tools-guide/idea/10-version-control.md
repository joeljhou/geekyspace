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

![image1](https://img.geekyspace.cn/pictures/2026/202610151623385.png)

- 很多人认为 IntelliJ IDEA 自带了 SVN 或是 Git 等版本控制工具，认为只要安装了 IntelliJ IDEA 就可以完全使用版本控制应有的功能。这完全是一种错误的解读，IntelliJ IDEA 是自带对这些版本控制工具的插件支持，但是该装什么版本控制客户端还是要照样装的

![Pasted image 20261022025816](https://img.geekyspace.cn/pictures/2026/202610220258238.png)

- IntelliJ IDEA 对版本控制的支持是以插件化的方式来实现的。旗舰版默认支持目前主流的版本控制软件：CVS、Subversion (SVN)、Git、Mercurial、Perforce 、TFS。又因为目前太多人使用 Github 进行协同或是项目版本管理，所以 IntelliJ IDEA 同时自带了 Github 插件，方便 Checkout 和管理你的 Github 项目。
- 在实际开发中，发现在 IDEA 中使用 SVN 的经历不算愉快，经常会遇到很多问题，比如紧急情况下 IDEA 无法更新、提交等。所以这里，谈下在 IDEA 中使用 Git。

## 1. 提前安装 Git 客户端

Git 的 msysGit 官网下载： <https://git-scm.com/>
Git 客户需 TortoiseGit 官网下载： <http://download.tortoisegit.org/tgit/>

## 2. 关联 git.exe

![f6b8c9e7-8049-4979-b205-fdc6450d879e](https://img.geekyspace.cn/pictures/2026/202610220258256.png)

## 3. 关联 GitHub 上的账号，并测试连接

点击 Add account


![Pasted image 20261022025838](https://img.geekyspace.cn/pictures/2026/202610220258479.png)


![d7330fbf-de30-4021-9e41-775a5d86ca73](https://img.geekyspace.cn/pictures/2026/202610220258542.png)

## 4. 在 GitHub 上创建账号下的一个新的仓库作为测试

![Pasted image 20261022025907](https://img.geekyspace.cn/pictures/2026/202610220259527.png)

填写创建仓库信息

![Pasted image 20261022025912](https://img.geekyspace.cn/pictures/2026/202610220259947.png)

创建成功

![286d8aa1-9545-46aa-878d-e133ffc9085b](https://img.geekyspace.cn/pictures/2026/202610220259858.png)


## 5. 支持从当前的 GitHub 账号上直接 Checkout 项目

![Pasted image 20261022025939](https://img.geekyspace.cn/pictures/2026/202610220300498.png)

## 6. 在 IDEA 中 clone GitHub 上仓库

Directory 必须是空的且存在的

![Pasted image 20261022025945](https://img.geekyspace.cn/pictures/2026/202610220259439.png)

这里需要在 GitHub 的自己的账户下，复制项目仓库路径，填写到上图 Git Repository URL 中。如下：

![Pasted image 20261022025949](https://img.geekyspace.cn/pictures/2026/202610220259032.png)

## 7. 连接成功以后，会下载 github 上的项目

![Pasted image 20261022030011](https://img.geekyspace.cn/pictures/2026/202610220300428.png)

![Pasted image 20261022030014](https://img.geekyspace.cn/pictures/2026/202610220300633.png)

创建一个新的工程，选择 Next

![Pasted image 20261022030019](https://img.geekyspace.cn/pictures/2026/202610220301081.png)

Next

![Pasted image 20261022030029](https://img.geekyspace.cn/pictures/2026/202610220300484.png)

Next

![Pasted image 20261022030032](https://img.geekyspace.cn/pictures/2026/202610220300320.png)

Finish

![Pasted image 20261022030037](https://img.geekyspace.cn/pictures/2026/202610220300082.png)

选择以哪一种方式打开这个项目
This Window 覆盖当前项目
New Window 新窗口打开

## 8. 除此之外，还可以通过如下方式的方式连接 Github

![Pasted image 20261022030118](https://img.geekyspace.cn/pictures/2026/202610220301423.png)

## 9. 本地代码分享到 Github

![Pasted image 20261022030135](https://img.geekyspace.cn/pictures/2026/202610220301948.png)

![Pasted image 20261022030138](https://img.geekyspace.cn/pictures/2026/202610220302910.png)

点击 Share Anyway

![Pasted image 20261022030143](https://img.geekyspace.cn/pictures/2026/202610220302842.png)

点击 Share

![Pasted image 20261022030147](https://img.geekyspace.cn/pictures/2026/202610220301625.png)

Add 进行提交

![Pasted image 20261022030219](https://img.geekyspace.cn/pictures/2026/202610220302093.png)

此时会在 GitHub 上创建一个新的仓库，而非更新一存在的仓库

![Pasted image 20261022030244](https://img.geekyspace.cn/pictures/2026/202610220303829.png)

## 10. Git 的常用操作

![Pasted image 20261022030222](https://img.geekyspace.cn/pictures/2026/202610220303361.png)

- `clone`：将远程仓库克隆到本地。
- `commit`：将本地更改提交到仓库。
- `push`：将本地提交推送到远程仓库。
- `pull`：获取并整合远程更新。

## 11. 没有使用 Git 时本地历史记录的查看

![image26](https://img.geekyspace.cn/pictures/2026/202610151623386.png)

![image27](https://img.geekyspace.cn/pictures/2026/202610151623387.png)
即使我们项目没有使用版本控制功能，IntelliJ IDEA 也给我们提供了本地文件历史记录
