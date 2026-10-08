---
title: 安装 Codex CLI
date: 2026-07-30
category: 云计算
tags:
  - server
  - codex
shortTitle: Codex CLI 安装
description: 在 ARM Ubuntu 服务器安装并配置 Codex CLI 开发环境
icon: codex
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 安装 Codex CLI

> 通过 npm 安装 Codex CLI，用于 AI 代码辅助。
> Codex CLI 可以安装在本地电脑或远程服务器上，并支持通过设备码或 API Key 完成认证。

## 安装 Codex CLI

```shell
# 全局安装 Codex CLI（注意：不要使用 sudo）
npm install -g @openai/codex
codex --version

# 登录 Codex
codex login --device-auth              # 使用设备码登录
export OPENAI_API_KEY=<你的-Token>
codex login --token                    # 使用 API Key 登录

# 检查 Codex 登录状态
codex login status
```

## 远程连接操作
### 本地 Codex客户端
本地 Codex 客户端 SSH 设置：支持在 `设置 → 编码 → 连接 → SSH` 中直接选择 `~/.ssh/config` 主机别名。

![image.png](http://img.geekyspace.cn/pictures/2026/202607311241956.png)

随后可点击“**添加远程项目**”开始工作，或通过“**通过手机或其他设备控制**”功能由其他设备进行操作。

### 添加远程项目
```shell
# 在服务器创建目录
ssh arm-ubuntu
mkdir -p ~/workspace/{code,docx}
mkdir -p ~/workspace/code/sandbox
```

![image.png](http://img.geekyspace.cn/pictures/2026/202607311326581.png)

---

上一步：[安装 NVM、Node.js](03-nvm-nodejs) ｜ 下一步：[安装 Docker Engine](05-docker-engine)
