---
order: 2
title: Linux 防火墙与 iptables 基础
shortTitle: Linux 防火墙基础
description: 掌握防火墙三条链、监听与规则查询、按来源放行端口，以及 Docker 和远程修改的注意事项
icon: linux
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-08-01
category: 云计算
tags:
  - server
  - linux
  - firewall
  - iptables
  - docker
---
# Linux 防火墙与 iptables 基础

目标：看懂流量走哪条链，会查看规则、按来源放行端口，并知道 Docker 为什么要单独检查。

## 1. 先分清三层

| 层次 | 管什么 |
| --- | --- |
| 云防火墙：OCI 安全列表 / NSG | 流量能否到达云服务器 |
| 主机防火墙：Linux Netfilter | 到达主机后的数据包过滤、转发和 NAT |
| 服务监听地址 | 哪些地址接受连接，如 `127.0.0.1` 或 `0.0.0.0` |

`iptables` 是配置 Netfilter 规则的工具；IPv6 对应 `ip6tables`。如果规则由 UFW、1Panel 等工具管理，优先在同一工具里修改，避免混用后互相覆盖。

`127.0.0.1` 是本机回环地址；`0.0.0.0` 表示所有 IPv4 接口。服务只监听本机时，开放云端口也不会让它直接接受公网连接。

## 2. 只需先记住三条链

| 链 | 处理的流量 | 例子 |
| --- | --- | --- |
| `INPUT` | 发给服务器自身 | 连接宿主机 SSH |
| `OUTPUT` | 服务器自身发出 | 系统更新、调用外部 API |
| `FORWARD` | 经服务器转发 | Docker 容器流量、VPN 转发 |

规则按顺序匹配，遇到 `ACCEPT`、`DROP` 等终止动作就停止；全部未命中才使用链的默认策略。

- `ACCEPT`：放行；`DROP`：丢弃。
- `-I INPUT 1`：插到 INPUT 第一条；`-A INPUT`：追加到末尾。
- `-P`：修改默认策略。不要把更改默认策略当成开端口操作。

## 3. 常用操作

### 查看监听、策略和规则

```bash
sudo ss -lntup                                  # 谁在监听哪个地址和端口
sudo iptables -S                               # IPv4 过滤规则及默认策略
sudo ip6tables -S                               # IPv6 规则，独立检查
sudo iptables -L INPUT -n -v --line-numbers      # INPUT 顺序、计数和行号
sudo iptables -t nat -S                         # NAT 规则，排查 Docker 端口转发
```

`-S` 便于看完整规则，`-L -n -v` 便于看匹配计数。计数增长说明有流量命中该规则。

### 仅放行指定来源访问一个宿主机端口

下面以 TCP `5432` 为例。`203.0.113.10/32` 是文档示例地址，执行前替换为自己的公网 IP。

```bash
sudo iptables -I INPUT 1 -p tcp -s 203.0.113.10/32 --dport 5432 -j ACCEPT
```

这表示“允许该来源”，**只有链已有默认拒绝或后续拒绝规则时，才构成来源限制**。默认 `ACCEPT` 时，其他来源仍可能访问。已有的全网放行规则也需一并检查。

撤销刚才那条规则，用同样的条件：

```bash
sudo iptables -D INPUT -p tcp -s 203.0.113.10/32 --dport 5432 -j ACCEPT
```

不要反复插入重复规则；`-D` 每次只删除一条匹配规则。这组命令针对宿主机服务，Docker 发布端口要看下一节；需要公网直连时，OCI 安全列表 / NSG 也应限定来源。

## 4. Docker 要单独看端口映射

常见的 bridge / NAT 模式下，已发布端口的流量大致经过：

```text
公网 → DNAT → FORWARD → 容器
```

所以 **`INPUT DROP` 不能单独保护 Docker 发布端口**。先检查：

```bash
docker ps --format 'table {{.Names}}	{{.Ports}}'
```

经宿主机上的 Cloudflare Tunnel 转发的服务，Compose 优先绑定本机：

```yaml
ports:
  - "127.0.0.1:5244:5244"
```

这样 cloudflared 从宿主机访问 `127.0.0.1:5244`，无需对公网发布该服务端口。Docker 使用 iptables 后端时，需要额外过滤转发流量可使用 `DOCKER-USER` 链；不要直接改 Docker 自动生成的规则。

相关实践：[创建 Cloudflare Tunnel 隧道](/md/cloudnative/linux/arm-ubuntu/network-proxy/01-cloudflare-tunnel.html)。

## 5. 修改防火墙时必须记住

准备收紧 INPUT 前，先确认这些流量有合适的放行规则：

- **本机通信**：回环接口 `lo`。
- **已有连接的返回包**：`ESTABLISHED,RELATED`。服务器主动发出的请求，回包也要进入 INPUT。
- **新的 SSH 连接**：实际 SSH 端口；当前会话还在不代表能重新登录。
- **ICMP / ICMPv6**：包含网络错误反馈、路径 MTU 发现等功能，ICMPv6 还关系到 IPv6 正常通信。

远程修改的顺序：**备份规则、准备带外控制台或自动恢复 → 小步修改 → 新开 SSH 验证 → 检查业务 → 最后保存**。

```bash
sudo iptables-save | sudo tee /root/iptables-before.rules > /dev/null
sudo ip6tables-save | sudo tee /root/ip6tables-before.rules > /dev/null
```

备份文件本身不会自动恢复规则。需要远程收紧默认策略时，要另行准备恢复方式。

- IPv4、IPv6 分别检查；只配置 `iptables` 不代表 IPv6 已受限制。
- 不要为了排错执行 `iptables -F`，它可能清掉系统和 Docker 需要的过滤规则。
- 不要照抄 `INPUT DROP`、`FORWARD DROP`；后者尤其可能切断容器和 VPN 转发。
- 规则通常先作用于运行时。已使用 `iptables-persistent` 管理规则时，验证后可执行 `sudo netfilter-persistent save` 持久化；由其他工具管理时，使用对应工具保存。避免用旧的全量快照覆盖 Docker 当前规则。

## 6. 网络不通，按这个顺序查

```text
服务是否运行 → 监听地址和端口 → 本机能否访问 → 代理 / 路由
           → 云防火墙与主机规则 → Docker 端口映射和转发路径
```

还应会用 [systemd 服务管理基础](/md/cloudnative/linux/basic/01-systemd.html) 查看服务状态和日志。

## 参考资料

- [Docker：防火墙与数据包过滤](https://docs.docker.com/engine/network/packet-filtering-firewalls/)
- [Docker：iptables 防火墙规则](https://docs.docker.com/engine/network/firewall-iptables/)
- [Debian：netfilter-persistent 手册](https://manpages.debian.org/trixie/netfilter-persistent/netfilter-persistent.8.en.html)
