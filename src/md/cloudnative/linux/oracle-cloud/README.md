---
title: ARM Ubuntu 服务器折腾
shortTitle: Oracle Cloud
description: 从 Oracle Cloud 注册、初始化 ARM Ubuntu 服务器，到 Docker、1Panel、Cloudflare Tunnel 与各类自托管应用的完整折腾记录
icon: oracle
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: true
date: 2026-07-30
category: 云计算
tags:
  - 服务器
  - oracle-cloud
  - ubuntu
  - 自托管
---
# ARM Ubuntu 服务器折腾

> 一个完整的 Oracle Cloud Always Free ARM 服务器折腾系列：从白嫖注册到初始化，再到 Docker、1Panel、Cloudflare Tunnel，最后落地各种自托管应用。

## 1. 开服准备

- [甲骨文云注册教程](00-oracle-cloud-registration)

## 2. 服务器初始化

- [首次登录服务器](01-first-login)
- [安装 WireGuard](02-wireguard)
- [安装 NVM、Node.js](03-nvm-nodejs)
- [安装 Codex CLI](04-codex-cli)

## 3. 应用平台

- [安装 Docker Engine](05-docker-engine)
- [安装 1Panel 面板](06-1panel)
- [创建 Cloudflare Tunnel 隧道](07-cloudflare-tunnel)

## 4. 存储、数据库与网络服务

- [云存储挂载 Openlist 网盘](08-openlist)
- [安装 PostgreSQL 18](09-postgresql)
- [安装 Redis 8.x](10-redis)
- [安装 Sub2API 中转站](11-sub2api)
- [安装 CLIProxyAPI 中转站](12-cliproxyapi)
- [安装 3X-UI 面板指南](13-3x-ui)

## 5. 自托管应用

- [部署 Sub-Store 和 Sub-Web](14-sub-store)
- [部署 JoyFlix 影视平台](15-joyflix)
- [部署 DeepSeek Harness](16-deepseek-harness)

## 通用基础知识

以下两篇不依赖 Oracle Cloud，是折腾任何 Linux 服务器都用得上的通用知识：

- [systemd 服务管理基础](../basic/systemd-basics)
- [Linux 防火墙与 iptables 基础](../basic/iptables-firewall-basics)
