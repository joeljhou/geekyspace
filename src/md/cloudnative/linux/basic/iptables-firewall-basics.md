---
title: Linux 防火墙与 iptables 基础
date: 2026-08-01
category: 云计算
tags:
  - server
  - linux
  - firewall
  - iptables
  - docker
shortTitle: Linux 防火墙基础
description: 结合服务器防火墙收口，理解 Netfilter、iptables、数据包路径、安全回滚和规则持久化
icon: linux
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# Linux 防火墙与 iptables 基础

本篇只讲可复用的 Linux 防火墙知识。Cloudflare Tunnel 为什么不需要开放入站端口，统一放在 [Cloudflare Tunnel：Tunnel 与防火墙的关系](../oracle-cloud/07-cloudflare-tunnel#_2-tunnel-与防火墙的关系)。

建议先读 [systemd 服务管理基础](systemd-basics)，再阅读本篇。

先理解流量走哪条路，再学习规则。不要从背命令开始。

## Netfilter、iptables 和防火墙是什么关系

```text
Linux 内核中的 Netfilter
  └── 提供数据包过滤、NAT、连接跟踪能力
        └── iptables / ip6tables
              └── 管理员用于查看和配置规则的命令
```

- “防火墙”是整体功能的叫法；
- Netfilter 是 Linux 内核里的机制；
- `iptables`、`ip6tables` 是配置这个机制的传统命令行工具。

## INPUT、OUTPUT、FORWARD 分别管什么

```text
发往服务器自身的包 ───────────────→ INPUT
服务器自身产生并发出的包 ─────────→ OUTPUT
服务器代其他设备或容器转发的包 ───→ FORWARD
```

| 链         | 当前服务器的例子                 |
| --------- | ------------------------ |
| `INPUT`   | 公网访问 SSH 或其他宿主机监听端口      |
| `OUTPUT`  | 系统更新、应用访问外部 API 或对象存储    |
| `FORWARD` | Docker 容器经过宿主机访问外网或已发布端口 |

当前策略是：

```text
INPUT   DROP
OUTPUT  ACCEPT
FORWARD ACCEPT
```

原因：

- `INPUT DROP`：阻止公网直接连接没有明确放行的宿主机端口；
- `OUTPUT ACCEPT`：保留应用和系统更新所需的出站访问；
- `FORWARD ACCEPT`：Docker 依赖转发和 NAT，贸然改成 DROP 可能让容器断网。

这不是所有服务器通用的终极模板，而是当前单机 Docker 架构下的保守收口。

## 一条 iptables 规则怎样阅读

例如：

```bash
sudo iptables -I INPUT 1 \
  -m conntrack \
  --ctstate ESTABLISHED,RELATED \
  -j ACCEPT
```

| 参数 | 含义 |
| --- | --- |
| `-I INPUT 1` | 插入 INPUT 链第 1 条 |
| `-m conntrack` | 使用连接跟踪模块 |
| `--ctstate ESTABLISHED,RELATED` | 匹配已有连接及关联流量 |
| `-j ACCEPT` | 命中后允许通过 |

规则按顺序匹配，遇到终止动作后不再继续。因此允许规则必须排在默认拒绝之前。

## 当前为什么允许这些流量

### loopback

```bash
sudo iptables -I INPUT 1 -i lo -j ACCEPT
```

`lo` 是回环接口，`127.0.0.1` 的本机通信经过这里。许多本机服务之间会通过 loopback 互相访问，通常不应阻止。

### 已建立和关联的连接

```bash
sudo iptables -I INPUT 1 \
  -m conntrack --ctstate ESTABLISHED,RELATED \
  -j ACCEPT
```

服务器主动连出去后，返回包方向属于 INPUT。不允许已有连接的返回流量，DNS、HTTPS、软件更新和应用的外部连接都会异常。

### SSH

```bash
sudo iptables -I INPUT 1 -p tcp --dport 22 -j ACCEPT
```

允许新的 SSH 连接，否则现有会话断开后无法重新登录。如果以后修改 SSH 端口，这条规则也要同步调整。

### ICMP 和 ICMPv6

```bash
sudo iptables -I INPUT 1 -p icmp -j ACCEPT
sudo ip6tables -I INPUT 1 -p ipv6-icmp -j ACCEPT
```

ICMP 不只是 `ping`，还参与路径 MTU 发现和网络错误反馈。ICMPv6 更是 IPv6 正常工作的必要组成部分，不应简单全部封禁。

### 默认拒绝

```bash
sudo iptables -P INPUT DROP
sudo ip6tables -P INPUT DROP
```

`-P` 修改链的默认策略。没有匹配前面允许规则的数据包最终被丢弃。

## 为什么之前那组命令很危险

服务器部署后曾执行：

```bash
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -F
```

它等价于“默认全部放行，并清空当前过滤规则”：

- `-P ... ACCEPT` 把默认策略改为允许；
- `-F` flush 当前表中的规则链；
- 还可能清除 Docker、1Panel 或系统预置的过滤链跳转；
- OCI 安全列表暂时挡住公网，也不代表主机防火墙应该全部放开。

不要把它当成网络不通时的通用修复。它只是撤掉安全检查，往往会掩盖真正的监听地址、端口或路由错误。

## IPv4 和 IPv6 是两套规则

```bash
iptables    # IPv4
ip6tables   # IPv6
```

只把 IPv4 INPUT 改成 DROP，不代表 IPv6 也受到保护。服务如果监听 `[::]:端口`，且服务器有公网 IPv6，就可能绕过仅 IPv4 的规则。

本次检查到有服务监听 IPv6 地址，因此 IPv6 INPUT 也同步收紧。

## Docker 为什么可能绕过 INPUT

Docker 发布容器端口时会增加 NAT 和 FORWARD 规则：

```text
公网数据包
  → Docker DNAT
  → FORWARD
  → 容器 IP:容器端口
```

这类流量不一定经过宿主机 INPUT，因此 `INPUT DROP` 不能替代 Docker 端口绑定控制。

当前 OpenList 的安全边界首先是：

```text
127.0.0.1:5244->5244/tcp
127.0.0.1:5246->5246/tcp
```

而不是：

```text
0.0.0.0:5244->5244/tcp
```

先从监听地址限制为只有宿主机能访问，再用 INPUT 保护宿主机自己的服务。两层处理的是不同路径。

## 远程修改前为什么要自动回滚

直接把 INPUT 改成 DROP 可能切断 SSH。操作前先创建一个两分钟后自动执行的临时 systemd 任务：

```bash
sudo systemd-run \
  --unit=firewall-rollback \
  --on-active=2m \
  /usr/sbin/iptables -P INPUT ACCEPT
```

含义是：两分钟后把 IPv4 INPUT 默认策略恢复为 ACCEPT。

如果新 SSH 会话无法建立，什么都不做，计时器会自动回滚。验证成功后主动取消：

```bash
sudo systemctl stop firewall-rollback.timer
```

IPv6 使用独立任务：

```bash
sudo systemd-run \
  --unit=ipv6-firewall-rollback \
  --on-active=2m \
  /usr/sbin/ip6tables -P INPUT ACCEPT

sudo systemctl stop ipv6-firewall-rollback.timer
```

关键思路：**先安排撤销操作，再执行高风险变更，最后用全新的 SSH 连接验证。**

## 本次完整执行顺序

### IPv4

```bash
sudo systemd-run \
  --unit=firewall-rollback \
  --on-active=2m \
  /usr/sbin/iptables -P INPUT ACCEPT

sudo iptables -I INPUT 1 -i lo -j ACCEPT
sudo iptables -I INPUT 1 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -I INPUT 1 -p tcp --dport 22 -j ACCEPT
sudo iptables -I INPUT 1 -p icmp -j ACCEPT
sudo iptables -P INPUT DROP
```

打开全新的 SSH 会话验证成功后：

```bash
sudo systemctl stop firewall-rollback.timer
```

### IPv6

```bash
sudo systemd-run \
  --unit=ipv6-firewall-rollback \
  --on-active=2m \
  /usr/sbin/ip6tables -P INPUT ACCEPT

sudo ip6tables -I INPUT 1 -i lo -j ACCEPT
sudo ip6tables -I INPUT 1 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo ip6tables -I INPUT 1 -p tcp --dport 22 -j ACCEPT
sudo ip6tables -I INPUT 1 -p ipv6-icmp -j ACCEPT
sudo ip6tables -P INPUT DROP
```

再次验证新 SSH 会话后：

```bash
sudo systemctl stop ipv6-firewall-rollback.timer
```

## 为什么还要 netfilter-persistent

直接执行 `iptables` 修改的是内核运行时状态，重启后可能丢失。全部验证无误后执行：

```bash
sudo netfilter-persistent save
```

它保存 IPv4 和 IPv6 规则，并在以后启动时恢复。

正确顺序：

1. 设置自动回滚；
2. 添加允许规则；
3. 修改默认策略；
4. 新开 SSH 会话验证；
5. 确认业务正常；
6. 取消回滚；
7. 最后持久化。

不要先保存一套尚未验证、可能锁死 SSH 的规则。

## 查看当前规则

```bash
sudo iptables -S INPUT
sudo ip6tables -S INPUT
```

`-S` 以接近命令行的格式显示策略和规则，适合排错和记录。

查看 Docker 端口映射：

```bash
docker ps
docker inspect --format '{{json .HostConfig.PortBindings}}' openlist
```

## 遇到网络问题时的判断顺序

```text
进程是否运行
  → 端口是否监听
  → 本地源站是否能访问
  → 代理或应用路由是否正确
  → 最后才检查防火墙路径和规则
```

防火墙应是排错的一层，不是所有网络故障的第一嫌疑人。尤其不要为了测试而执行 `iptables -F`。

## 自测

读完后应能回答：

1. INPUT、OUTPUT、FORWARD 分别处理什么流量；
2. 为什么当前只把 INPUT 默认策略改成 DROP；
3. 为什么必须允许 loopback、已有连接和 SSH；
4. 为什么 Docker 发布端口可能不经过 INPUT；
5. 为什么先回滚、再改规则、最后持久化。

## 参考资料

- [Netfilter 项目](https://www.netfilter.org/)
- [Docker：Bridge network driver](https://docs.docker.com/engine/network/drivers/bridge/)
- [Docker：Packet filtering and firewalls](https://docs.docker.com/engine/network/packet-filtering-firewalls/)

---

上一步：[systemd 服务管理基础](systemd-basics) ｜ 下一步：无
