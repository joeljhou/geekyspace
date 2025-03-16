---
title: macOS必备包管理工具—Homebrew
shortTitle: 
description: 
icon: 
cover: 
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-03-15
category: 包管理器
tags:
  - Homebrew
---

# macOS必备包管理工具—Homebrew

主要官方来源：[Homebrew官网](https://brew.sh/zh-cn/) |  [Github](https://github.com/homebrew)

> Homebrew 是 macOS 和 Linux 上的包管理器，可以帮助用户轻松安装和管理各种软件包。

## 安装Homebrew

### 官网脚本

![安装Homebrew](http://img.geekyspace.cn/pictures/2025/20250312024222153.png)

**安装 Homebrew**

将以下命令粘贴至终端：
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
运行此命令将安装最新版本的Homebrew，自动处理MacOS环境中`Xcode Command Tools`的安装。
- **`git`**（用于版本控制，拉取 Homebrew 软件包）
- **`gcc` / `clang`**（用于编译部分软件包）
- **`make`**（用于构建和安装依赖）

安装完成后，按照终端提示，添加 Homebrew 环境环境变量到 `.zprofile` 或 `.bash_profile`。
```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
source ~/.zprofile
```
 
**卸载 Homebrew**
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

**验证 Homebrew 安装**
安装完成后，可以运行以下命令来检查 Homebrew 是否正确安装：
```shell
brew --version
```

### 国内脚本

由于国内网络访问 GitHub 可能较慢，可以使用国内的 Homebrew 安装脚本，加快安装速度。
**安装步骤**
1. 访问 [HomebrewCN](https://gitee.com/cunkai/HomebrewCN)。
2. 按照说明执行相应的安装命令。

### .pkg包（macOS）

如果您使用的是 macOS，并希望通过图形化方式安装 Homebrew，可以使用官方提供的 `.pkg` 安装器。
**安装步骤：**
1. 访问 [Homebrew 最新 GitHub 发行版](https://github.com/Homebrew/brew/releases/latest)。
2. 下载 `.pkg` 文件。
3. 双击安装并按照提示完成安装。

## 使用指南

以下是一些常见的 Homebrew 命令：

| 操作               | 命令                                  |
| ---------------- | ----------------------------------- |
| 安装命令行软件包         | `brew install <soft-name>`          |
| 安装图形界面软件         | `brew install --cask <soft-name>`   |
| 搜索软件             | `brew search <soft-name>`           |
| 卸载命令行软件包         | `brew uninstall <soft-name>`        |
| 卸载图形界面软件         | `brew uninstall --cask <soft-name>` |
| 更新 Homebrew 本身   | `brew update`                       |
| 更新所有已安装软件        | `brew upgrade`                      |
| 更新具体软件           | `brew upgrade <soft-name>`          |
| 显示已安装的软件         | `brew list`                         |
| 查看软件信息           | `brew info <soft-name>`             |
| 查看需要更新的软件        | `brew outdated`                     |
| 清理不再使用的旧版本       | `brew cleanup`                      |
| 显示软件安装路径         | `brew --prefix <soft-name>`         |
| 测试软件是否正常运行       | `brew test <soft-name>`             |
| 检查 Homebrew 运行状态 | `brew doctor`                       |
| 列出所有可用的 cask     | `brew list --cask`                  |
| 列出所有依赖项          | `brew deps <soft-name>`             |
| 显示详细依赖树          | `brew deps --tree <soft-name>`      |
| 查看软件安装日志         | `brew log <soft-name>`              |
## 默认安装路径

在 Apple M1 (M4) 芯片的 Mac 上，Homebrew 默认安装路径有所不同。对于 M1 芯片，Homebrew 会安装在 `/opt/homebrew` 目录下，而不是像 Intel 芯片那样安装在 `/usr/local`。

- **Homebrew** 安装路径：`/opt/homebrew`
- **Homebrew 安装的软件** 默认路径：`/opt/homebrew/Cellar/`
- **软链接** 默认路径：`/opt/homebrew/bin`（软链接会创建在这个目录中，以便更方便地在命令行中调用安装的软件）

通过以下命令确认安装路径：
```shell
which brew
```
检查某个软件包的安装路径，可以使用 `brew list <软件名>`。
