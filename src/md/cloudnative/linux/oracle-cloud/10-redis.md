---
title: 安装 Redis
date: 2026-08-02
category: 云计算
tags:
  - server
  - redis
  - 1panel
  - docker
  - database
  - oracle
  - firewall
shortTitle: Redis 安装
description: 通过 1Panel 应用商店安装 Redis 8.8.1，默认只绑回环，按需从 Mac 用 RedisInsight / redis-cli 连接
icon: redis
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 安装 Redis

Redis 8 把 JSON、Search、TimeSeries、Bloom、Vector Set 等原本需要模块（module）的能力**内置进核心**，不再单独装 RedisJSON / RediSearch。本篇通过 1Panel 应用商店在 ARM Ubuntu 服务器上安装 Redis 8.8.1，默认只绑 `127.0.0.1` 供本机应用使用；需要从 Mac 连接时再按二、开启外部访问。

## 一、安装 Redis 8.x

### 1. 应用商店安装

1Panel 控制台 → **应用商店**，搜索 `Redis`，点击 **安装**。

| 参数         | 填写值              | 说明                                       |
| ---------- | ---------------- | ---------------------------------------- |
| **名称**     | `redis8`          | 容器与应用名称。                                 |
| **版本**     | `8.8.1`          | 选择应用商店提供的版本。                             |
| **密码**     | 随机生成（可改）         | Redis 的 `requirepass`，连接时用。**务必设置且足够强**。 |
| **端口**     | `6379`           | Redis 默认端口。                              |
| **端口外部访问** | **关闭**           | 只绑 `127.0.0.1`，供本机应用访问；Mac 连接见二、。        |
| **容器名称**   | `redis8`          | 后续 `docker exec` 以此为准。                   |
| **重启规则**   | `unless-stopped` | 未手动停止则自动重启。                              |
### 2. 放行 6379 端口（两层防火墙）

服务器在甲骨文云上，外部流量要进容器，需要依次穿过两层。

```text
Mac ──公网──▶ ① Oracle 安全列表（VCN）──▶ ② 宿主机 iptables ──▶ Docker 容器 5432
```


## 三、参考资料

- [Redis 8 发布说明](https://redis.io/blog/redis-8/)
- [Redis 官方文档](https://redis.io/docs/latest/)
- [RedisInsight（官方 GUI）](https://redis.io/insight/)
- [Redis 安全指南](https://redis.io/docs/management/security/)


---

上一步：[安装 PostgreSQL 18](09-postgresql) ｜ 下一步：[安装 Sub2API 中转站](11-sub2api)
