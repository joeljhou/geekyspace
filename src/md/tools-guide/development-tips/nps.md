---
title: nps 内网穿透
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-11-07
category: 内网穿透
tags:
  - Template
---
# nps 内网穿透
主要官方来源：[官方文档](https://ehang-io.github.io/nps) ｜ [Github](https://github.com/ehang-io/nps)
> 一款轻量级、高性能、功能强大的内网穿透代理服务器
## 场景描述
第三方系统仅允许固定的云服务器公网 IP 访问。本地开发机需要通过已授权的云服务器中转，访问联调环境。

本文使用文档示例 IP `203.0.113.10` 和域名 `uat.example.com`。部署时替换为自己的地址；密码、API 密钥和客户端密钥必须独立生成，不要提交到公开仓库。
## 部署架构图
```shell
┌───────────────────────────┐
│  本地开发机 (localhost)   │
│  浏览器访问 https://uat.example.com │
│  ↓                        │
│  npc 客户端 (tcp/http代理) │
└────────────┬──────────────┘
             │
             │ Encrypted Tunnel
             │
┌────────────┴──────────────┐
│  腾讯云 NPS 服务端         │  ← 固定公网IP：203.0.113.10
│  nps（反向代理）           │
│  转发请求到 uat.example.com │
└────────────┬──────────────┘
             │
             ▼
     https://uat.example.com
```

## 服务端部署 NPS
**快速部署步骤**
```shell
ssh root@203.0.113.10
# 1. 下载并解压 NPS 服务端安装包（Linux 64 位）
mkdir -p /opt/nps
cd /opt/nps
wget https://github.com/ehang-io/nps/releases/download/v0.26.10/linux_amd64_server.tar.gz
tar -zxvf linux_amd64_server.tar.gz
# 2. 配置端口（开放防火墙，配置安全组）
vim /opt/nps/conf/nps.conf
vim /etc/nps/conf/nps.conf
http_proxy_port=28080    # 默认80，用于 HTTP 代理（可选，建议修改）
https_proxy_port=28443   # 默认443，用于 HTTPS 代理（可选，建议修改）
bridge_port=28024        # 默认8024，用于内网穿透 TCP 端口（必须开放，客户端连接服务端）
web_port = 28081         # 默认8080，Web 管理后台端口
# 3. 安装启动服务
chmod +x /opt/nps/nps
/opt/nps/nps install
/opt/nps/nps restart
/opt/nps/nps stop
```
- 访问： http://203.0.113.10:28081/login/index
  **安全配置**
```shell
vim /opt/nps/conf/nps.conf
#web
web_host=nps.example.com
web_username=YOUR_ADMIN_USER
web_password=REPLACE_WITH_STRONG_PASSWORD

#Web API未认证IP地址（auth_crypt_key的长度必须为16）
auth_key=REPLACE_WITH_RANDOM_API_KEY
auth_crypt_key=REPLACE_16_CHARS!  # 占位符，必须替换为随机的 16 位密钥
```
**问题：**
[nps配置文件修改后不生效](https://blog.csdn.net/silencespy/article/details/118968313)
腾讯云安全风险
## Mac 客户端部署 NPC
```shell
# 1. 下载 NPS Mac 客户端
wget https://github.com/ehang-io/nps/releases/download/v0.26.10/darwin_amd64_client.tar.gz
# 解压
tar -zxvf darwin_amd64_client.tar.gz
# 客户端命令
./npc -server=203.0.113.10:28024 -vkey=YOUR_CLIENT_VKEY -type=tcp
# 配置文件启动
./npc -config=config/npc.conf
```
