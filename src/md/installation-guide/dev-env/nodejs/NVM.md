---
title: NVM快速安装，管理Node.js
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
tag:
  - nvm
---

# SDKMAN快速安装，管理JDK

主要官方来源：[nvm Github](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

> `nvm`是 [node.js](https://nodejs.org/zh-cn) 的版本管理器，允许您通过命令行快速安装和使用不同版本的 node。

## NVM安装

手动下载并运行 [安装脚本](https://github.com/nvm-sh/nvm/blob/v0.40.2/install.sh)，或使用**命令行安装**（`cURL` 或 `Wget`）：
```shell
# 使用 curl 安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# 使用 wget 安装
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

脚本会自动**配置环境变量**（`~/.zshrc`下）：
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # 加载 nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # 加载 nvm bash_completion
```
* 自行修改后，需执行 `source ~/.zshrc` 

**验证安装**
```shell
nvm --version
```

> 注意：[nvm](https://github.com/nvm-sh/nvm) 的维护者明确表示 `brew` 不是官方推荐的安装方式。

## 使用指南

### 查看所有可用版本

```shell
nvm ls-remote --lts   # 查看所有长期支持 (LTS) 版本
nvm ls-remote         # 查看所有可用版本
```
### 安装
```shell
nvm install <version>    # 安装指定版本（如 nvm install 20）
nvm install --lts        # 安装最新的 LTS 版本
nvm install node         # 安装最新的稳定版本
```
### 切换版本
```shell
nvm use <version>    # 切换到指定版本（如 nvm use 16）
nvm use default      # 切换到默认版本
```
### 设置默认版本
```shell
nvm alias default <version>   # 设置默认版本（如 nvm alias default 18）
```
### 列出已安装的版本
```shell
nvm list      # 列出本地已安装的 Node.js 版本
nvm ls        # 同上，显示已安装的版本
```
### 当前版本
```shell
node -v     # 显示当前 Node.js 版本
nvm current # 显示当前 NVM 管理的 Node.js 版本
```
### 卸载
```shell
nvm uninstall <version>   # 卸载指定版本（如 nvm uninstall 16）
```




