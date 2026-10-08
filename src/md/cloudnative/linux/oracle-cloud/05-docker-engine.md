---
title: 安装 Docker Engine
date: 2026-07-30
category: 云计算
tags:
  - server
  - docker
  - ubuntu
  - arm64
shortTitle: Docker Engine 安装
description: Ubuntu arm64 下通过官方 apt 仓库安装 Docker Engine 和 Compose
icon: docker
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---

# Docker Engine 安装（Ubuntu arm64）

> 通过 Docker 官方 apt 仓库安装 **Docker Engine + Docker Compose**。

## 安装方法
### 添加官方 apt 仓库

```shell
# 1. 安装依赖工具
sudo apt update
sudo apt install -y ca-certificates curl

# 2. 添加 GPG 密钥
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 3. 创建源配置文件（arm64 架构）
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

# 4. 更新索引
sudo apt update
```

### 安装 Docker 软件包

```bash
# Docker 引擎
# Docker 命令行客户端
# 容器运行时
# 多架构镜像构建插件
# Docker Compose 插件
sudo apt install -y \
  docker-ce \
  docker-ce-cli \
  containerd.io \
  docker-buildx-plugin \
  docker-compose-plugin

# 查看版本
docker --version                    # Docker version 29.7.0
docker compose version              # v5.3.1

# 服务状态检查
sudo systemctl status docker        # 确认 Docker daemon 运行中
sudo systemctl start docker         # 如服务未启动，可执行启动


sudo docker run --rm hello-world    # Hello from Docker!
```

## 安装后步骤

### 非 root 身份执行

> [!TIP]  
> **尝试在未获得 root 权限的情况下运行程序时收到错误提示？**
> 
> `docker` 用户组已存在但尚未添加用户，因此您需要使用 `sudo` 来运行 Docker 命令。

```shell
# 将用户加入 docker 组
sudo usermod -aG docker $USER      # 1. 将当前用户添加到 docker 组
newgrp docker                      # 2. 激活组更改（无需重启，切换 shell 会话）
docker run hello-world             # 3. 验证：无需 sudo 即可运行 Docker 命令

# 相关命令
sudo groupadd docker               # 如果 docker 组不存在则创建
sudo gpasswd -d $USER docker       # 将当前用户从 docker 组中移除 
groups $USER                       # 查看当前用户所属的所有组
grep docker /etc/group             # 查看 docker 组是否有成员
```

> [!WARNING] 重要提醒  
> 将用户加入 `docker` 组相当于授予 root 权限，请根据安全策略决定是否配置。

### systemd 配置自动启动（默认行为）

```shell
# 检查是否已启用开机自启动
sudo systemctl is-enabled docker containerd         # enabled：已启用/disabled：未启用
# 检查服务当前是否正在运行
sudo systemctl is-active docker containerd          # active：运行/inactive：未运行/failed：失败

# enable 启用开机自启动
sudo systemctl enable docker containerd
# disable 停止开机自启动
sudo systemctl disable docker containerd

# 常见命令
status       # 查看服务详细状态
start        # 启动服务
stop         # 停止服务
restart      # 重启服务
enable       # 启用开机自启动
disable      # 取消开机自启动
```

**参考资料：**
- [Docker 官方 Ubuntu 安装指南](https://docs.docker.com/engine/install/ubuntu/)  
- [Docker 官方安装脚本（GitHub）](https://github.com/docker/docker-install)  
- [卸载 Docker Engine](https://docs.docker.com/engine/install/ubuntu/#uninstall-docker-engine)
- [Docker Engine 的 Linux 安装后步骤](https://docs.docker.com/engine/install/linux-postinstall)

---

上一步：[安装 Codex CLI](04-codex-cli) ｜ 下一步：[安装 1Panel 面板](06-1panel)
