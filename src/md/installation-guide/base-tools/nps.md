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
第三方系统（如 Photonpay、Cobo）仅信任固定的腾讯云公网 IP（例如 43.135.40.157）。  
本地开发环境（如 MacBook）需要访问联调环境的商户后台：
- [https://vip1.uat.photontech.cc/account/login](https://vip1.uat.photontech.cc/account/login)
为保证请求通过白名单校验，本地流量将**通过腾讯云中转**，使第三方系统看到的所有访问请求**均来自固定公网 IP 43.135.40.157**。
## 部署架构图
```shell
┌───────────────────────────┐
│  本地开发机 (localhost)   │
│  浏览器访问 https://vip1.uat.photontech.cc │
│  ↓                        │
│  npc 客户端 (tcp/http代理) │
└────────────┬──────────────┘
             │
             │ Encrypted Tunnel
             │
┌────────────┴──────────────┐
│  腾讯云 NPS 服务端         │  ← 固定公网IP：43.135.40.157
│  nps（反向代理）           │
│  转发请求到 photontech.cc │
└────────────┬──────────────┘
             │
             ▼
     https://vip1.uat.photontech.cc
```

## 服务端部署 NPS
**快速部署步骤**
```shell
ssh root@43.135.40.157
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
- 访问： http://43.135.40.157:28081/login/index
**安全配置**
```shell
vim /opt/nps/conf/nps.conf
#web
web_host=a.o.com
web_username=admin_ops
web_password=R3dF7yH9!LmP2

#Web API未认证IP地址（auth_crypt_key的长度必须为16）
auth_key=9f8c3b2a7e1d4c6f
auth_crypt_key =Xp2!9gH4sT3vL0qZ
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
./npc -server=43.135.40.157:28024 -vkey=z6q8ny00mz79kvl0 -type=tcp
# 配置文件启动
./npc -config=config/npc.conf
```


