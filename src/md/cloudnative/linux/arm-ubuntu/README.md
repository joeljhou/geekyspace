---
title: Linux 服务器实战
shortTitle: 专栏导读
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
# Linux 服务器实战

从 Oracle Cloud 注册、服务器初始化，到容器、网络、数据库和自托管应用。目录按用途分组，需要哪项就看哪项。

## 推荐阅读顺序

1. **先搭环境**：注册服务器 → 首次登录 → NVM、Node.js → Docker → 1Panel。
2. **再接入域名**：阅读 Cloudflare Tunnel，给需要通过域名访问的服务配置入口。
3. **按需部署**：根据应用要求准备数据库或存储，再选择 AI 中转、笔记同步、影视等服务；WireGuard、3X-UI 和订阅管理按需阅读。
4. **补齐运维**：掌握 systemd 和防火墙的基本操作，再安排账号备份。

CLIProxyAPI 的 Ubuntu 脚本部署与 Mac Docker 部署是两套独立方案，按运行环境选择。

## 环境搭建

- [甲骨文云注册](/md/cloudnative/linux/arm-ubuntu/setup/01-oracle-cloud-registration.html)
- [首次登录与初始化](/md/cloudnative/linux/arm-ubuntu/setup/02-first-login.html)
- [Node.js 与 NVM](/md/cloudnative/linux/arm-ubuntu/setup/03-nvm-nodejs.html)
- [Docker Engine](/md/cloudnative/linux/arm-ubuntu/setup/04-docker-engine.html)
- [1Panel](/md/cloudnative/linux/arm-ubuntu/setup/05-1panel.html)

## 网络与代理

- [Cloudflare Tunnel](/md/cloudnative/linux/arm-ubuntu/network-proxy/01-cloudflare-tunnel.html)
- [WireGuard](/md/cloudnative/linux/arm-ubuntu/network-proxy/02-wireguard.html)
- [3X-UI](/md/cloudnative/linux/arm-ubuntu/network-proxy/03-3x-ui.html)
- [Sub-Store 与 Sub-Web](/md/cloudnative/linux/arm-ubuntu/network-proxy/04-sub-store-sub-web.html)

## 数据与存储

- [OpenList 网盘](/md/cloudnative/linux/arm-ubuntu/storage/01-openlist.html)
- [PostgreSQL 18](/md/cloudnative/linux/arm-ubuntu/storage/02-postgresql.html)
- [Redis 8](/md/cloudnative/linux/arm-ubuntu/storage/03-redis.html)

## AI 工具

- [Codex CLI](/md/cloudnative/linux/arm-ubuntu/ai/01-codex-cli.html)
- [Sub2API](/md/cloudnative/linux/arm-ubuntu/ai/02-sub2api.html)
- [CLIProxyAPI（Ubuntu）](/md/cloudnative/linux/arm-ubuntu/ai/03-cliproxyapi-ubuntu.html)
- [CLIProxyAPI（Mac Docker）](/md/cloudnative/linux/arm-ubuntu/ai/04-cliproxyapi-mac-docker.html)
- [DeepSeek Harness](/md/cloudnative/linux/arm-ubuntu/ai/05-deepseek-harness.html)

## 自托管应用

- [JoyFlix 影视](/md/cloudnative/linux/arm-ubuntu/apps/01-joyflix.html)
- [Obsidian 笔记同步](/md/cloudnative/linux/arm-ubuntu/apps/02-obsidian-livesync.html)
- [Codex 账号备份（OCI）](/md/cloudnative/linux/arm-ubuntu/apps/03-codex-oci-backup.html)
