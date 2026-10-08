---
title: 安装 PostgreSQL 18
date: 2026-08-02
category: 云计算
tags:
  - server
  - postgresql
  - 1panel
  - docker
  - database
  - oracle
  - firewall
shortTitle: PostgreSQL 18 安装
description: 通过 1Panel 应用商店安装 PostgreSQL 18，开放 5432 端口，从本地 Mac 用 Navicat 直连测试
icon: postgresql
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 安装 PostgreSQL 18

PostgreSQL 18 于 2025-09-25 正式发布，带来异步 I/O、UUIDv7、虚拟生成列等更新。本篇通过 1Panel 应用商店在 ARM Ubuntu 服务器上安装 PostgreSQL 18，并**开启端口外部访问**，把 `5432` 直接暴露给本地 Mac 的 Navicat 连接。

> [!WARNING] 与既有安全策略的差异
> 本机的 1Panel、OpenList 都只绑定 `127.0.0.1`，再由 [创建 Cloudflare Tunnel 隧道](07-cloudflare-tunnel) 对外提供入口。数据库不走 Tunnel（Tunnel 只服务 HTTP），改为**公网直连 5432**，因此需要在防火墙层显式放行，并强烈建议把来源收口到自己的 IP。防火墙背景见 [Linux 防火墙与 iptables 基础](../basic/iptables-firewall-basics)。

## 一、安装 PostgreSQL 18

1Panel 控制台 → **应用商店**，搜索 `PostgreSQL`，点击 **安装**。

| 参数            | 填写值              | 说明                                       |
| ------------- | ---------------- | ---------------------------------------- |
| **名称**        | `postgresql18`   | 容器与应用名称，保持默认或自定义。                        |
| **版本**        | `18`             | 选择应用商店提供的最新稳定版；如列表暂无 18，可先升级应用索引或更换镜像标签。 |
| **Root 用户密码** | 随机生成（可改）         | 即 `postgres` 超级用户密码，Navicat 连接时使用。       |
| **端口**        | `5432`           | 建议保持默认，避免非标端口触发建库异常。                     |
| **端口外部访问**    | **开启**           | 绑定 `0.0.0.0:5432`，允许 Mac 公网直连。           |
| **容器名称**      | `postgresql18`   | 后续 `docker exec` 命令以该名称为准。               |
| **重启规则**      | `unless-stopped` | 未手动停止则自动重启。                              |

> [!IMPORTANT] 「端口外部访问」的含义
> 开启后端口映射变为 `0.0.0.0:5432->5432/tcp`（不再只是 `127.0.0.1:5432`）。但「监听到 0.0.0.0」≠「公网可达」，下面两层防火墙还要放行。

## 二、放行 5432 端口（两层防火墙）

服务器在甲骨文云上，外部流量要进容器，需要依次穿过两层。

```text
Mac ──公网──▶ ① Oracle 安全列表（VCN）──▶ ② 宿主机 iptables ──▶ Docker 容器 5432
```

### 1. Oracle Cloud 安全列表（主要闸门）

甲骨文云默认只放行 SSH(22)，5432 必须手动加。强烈建议**来源收口到自己的 IP**，不要对全网开放。

OCI 控制台 → **网络 → 虚拟云网络(VCN) → <你的 VCN> → 安全列表(Security Lists) → Default Security List → 添加入站规则**：

| 字段     | 填写值                                     |
| ------ | --------------------------------------- |
| 源 CIDR | `<Mac公网IP>/32`（仅自己）；如需任意来源则 `0.0.0.0/0` |
| IP 协议  | `TCP`                                   |
| 目标端口范围 | `5432`                                  |
| 说明     | `pgsql-navicat`                         |

Mac 上查询公网 IP：

```bash
curl ifconfig.me
```

> [!WARNING] 建议收口来源 IP
> 数据库不像 Web 服务，开放给 `0.0.0.0/0` 等于邀请全网爆破。来源填 `<Mac公网IP>/32` 是性价比最高的收口；家庭宽带 IP 变动时回来改这一条即可。

### 2. 宿主机 iptables（Docker 已绕过 INPUT）

当前策略 `INPUT DROP / FORWARD ACCEPT`。

Docker 发布的端口走 **DNAT + FORWARD**，不经过 INPUT，所以**不需要也不应该**靠加 INPUT 规则来放行 5432——一旦 `0.0.0.0` 绑定 + Oracle 安全列表放行，容器就已经可达。

## 三、从 Mac 用 Navicat 直连

在 Navicat 新建 **PostgreSQL** 连接，**「常规」标签页**：

| 字段    | 填写值                | 说明                            |
| ----- | ------------------ | ----------------------------- |
| 连接名   | `arm-pg18`         | 仅本地标识。                        |
| 主机    | 服务器公网 IP           | 直连公网，不再是 `127.0.0.1`。         |
| 端口    | `5432`             |                               |
| 初始数据库 | `postgres`         | 默认维护库。                        |
| 用户名   | 1Panel「连接信息」管理员用户名 | 不是固定的 `postgres`，先用 `env` 查出。 |
| 密码    | 安装时设置的 Root 密码     | 来自 1Panel「连接信息」。              |

「SSH」标签页**不勾选**。点击 **测试连接**，成功即完成。

命令行先验证链路：

```bash
# Mac 本地直连公网 5432
psql -h <服务器公网IP> -p 5432 -U <管理员用户名> -d postgres
```

> [!TIP] 凭据安全：scram-sha-256
> PostgreSQL 18 默认用 `scram-sha-256` 挑战-应答认证，**密码不会以明文经过网络**，即便不启用 SSL 也无法直接嗅探到密码。如需对查询数据本身加密，再在 Navicat「SSL」标签页启用 SSL。

## 四、AI 建议
### 1. 连接失败排查顺序

1. Mac 能否 `telnet <服务器IP> 5432`（端口是否通）；
2. Oracle 安全列表是否加了 TCP 5432 入站，源 CIDR 是否覆盖当前 Mac IP；
3. 服务器上 `docker ps` 端口是否 `0.0.0.0:5432`、`pg_isready` 是否 accepting；
4. Navicat「常规」主机是否填**公网 IP**（不是 `127.0.0.1`）、密码是否正确；
5. `pg_hba.conf` 是否拒绝了该来源。

常见报错：

| 报错                                              | 原因                                         |
| ----------------------------------------------- | ------------------------------------------ |
| `FATAL: role "postgres" does not exist`         | 用户名填错：1Panel 超级用户不是 `postgres`，按上节方法查真实用户名 |
| 连接超时 / `telnet` 不通                              | Oracle 安全列表未放行 5432，或源 IP 不在放行 CIDR 内      |
| `password authentication failed for user "..."` | 密码填错，回 1Panel「连接信息」核对                      |
| `no pg_hba.conf entry for host <IP>`            | 该来源未被 pg_hba 允许，需追加放行（见下）                  |

若命中 `pg_hba.conf` 报错，追加一行放行并重载（1Panel 数据目录通常在 `/opt/1panel/apps/postgresql/postgresql18/data/`）：

```bash
# 把 <Mac_IP>/32 加入放行，认证方式与现有行保持一致
echo "host all all <Mac_IP>/32 scram-sha-256" | \
  sudo tee -a /opt/1panel/apps/postgresql/postgresql18/data/pg_hba.conf

# 容器内重载配置
sudo docker exec -it postgresql18 psql -U <管理员用户名> -c "SELECT pg_reload_conf();"
```

### 2.（可选）创建业务数据库与账号

连接成功后，建议为业务单独建库建号，避免长期使用 `postgres` 超级用户：

```sql
CREATE DATABASE appdb;
CREATE USER appuser WITH ENCRYPTED PASSWORD '<强密码>';
GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;
```

也可直接在 1Panel **数据库 → PostgreSQL** 界面图形化创建。

## 六、参考资料

- [PostgreSQL 18 发布公告](https://www.postgresql.org/about/news/postgresql-18-released-3142/)
- [PostgreSQL 18 新特性（Bytebase）](https://www.bytebase.com/blog/what-is-new-in-postgres-18/)
- [PostgreSQL 官方 Docker 镜像](https://hub.docker.com/_/postgres)
- [PostgreSQL：客户端认证 pg_hba.conf](https://www.postgresql.org/docs/18/auth-pg-hba-conf.html)
- [1Panel：PostgreSQL 文档](https://1panel.cn/docs/v1/user_manual/databases/postgresql/)
- [Oracle Cloud：VCN 安全列表](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securitylists.htm)
- [Docker：Packet filtering and firewalls](https://docs.docker.com/engine/network/packet-filtering-firewalls/)

---

上一步：[云存储挂载 Openlist 网盘](08-openlist) ｜ 下一步：[安装 Redis 8.x](10-redis)
