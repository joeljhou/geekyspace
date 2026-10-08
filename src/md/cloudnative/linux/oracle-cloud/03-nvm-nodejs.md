---
title: 安装 NVM、Node.js
date: 2026-07-30
category: 云计算
tags:
  - server
  - nvm
  - nodejs
shortTitle: Node.js 环境
description: 在 Ubuntu 中使用 NVM 安装和管理 Node.js 与 npm
icon: nodejs
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 安装 NVM、Node.js

> 通过 NVM 安装 Node.js 环境。

## 安装 NVM

[NVM 安装指南 - NVM中文网](https://www.nvmnode.com/zh/guide/installation.html#linux-macos-%E5%AE%89%E8%A3%85) 

```shell
# 安装 NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash

# 加载 NVM
source ~/.bashrc

# 确认 NVM 已可用
command -v nvm

# 查看 NVM 版本
nvm --version
```

## 安装 Node.js

[NVM 使用指南 - NVM中文网](https://www.nvmnode.com/zh/guide/usage.html)

```shell
# 安装 Node.js LTS
nvm install --lts

# 设置默认 Node.js 版本
nvm alias default 'lts/*'nvm ls

# 切换到默认 Node.js
nvm use default

# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 检查 Node.js 架构（ARM 服务器应输出 arm64）
node -p "process.arch"
```

> [!check] 重点检查
> ARM 服务器上 `node -p "process.arch"` 应输出 `arm64`。

## 更新 Node.js LTS

```shell
nvm install --lts
nvm use default
```


> [!WARNING] 重要提醒  
> NVM 是用户级 Node.js，**不要混用 sudo npm**

---

上一步：[安装 WireGuard](02-wireguard) ｜ 下一步：[安装 Codex CLI](04-codex-cli)
