---
order: 5
title: 1Panel 证书申请与 3x-ui Hysteria2 配置
shortTitle: 1Panel 证书与 Hysteria2
description: 在 Oracle Cloud Ubuntu 宿主机上，使用 1Panel、Cloudflare DNS-01 和 3x-ui 配置 Hysteria2
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-11-20
category: 云计算
tags:
  - 1panel
  - cloudflare
  - lets-encrypt
  - dns-01
  - 3x-ui
  - hysteria2
  - oracle-cloud
---

# 1Panel 证书申请与 3x-ui Hysteria2 配置

这篇记录一次实际配置：

- 保留正在使用的 VLESS；
- 复用 3x-ui 现有的 ID 5，配置 Hysteria2；
- 使用 `hy2.geekyspace.cn` 和 UDP `9443`；
- 证书由 1Panel 通过 Cloudflare DNS-01 申请和续签。

::: warning 不要照抄敏感信息
本文不记录 Cloudflare API Token、Hysteria2 客户端密码和完整分享链接。截图中如果出现密码，已省略或不放入文章。
:::

## 环境信息

| 项目 | 值 |
| --- | --- |
| 云服务器 | Oracle Cloud，US West (Phoenix) |
| 公网 IP | `132.226.105.17` |
| 系统 | Ubuntu |
| 1Panel | 已安装 |
| 3x-ui | `v3.11.0`，直接安装在宿主机，不是 Docker |
| Hysteria2 域名 | `hy2.geekyspace.cn` |
| Hysteria2 端口 | `9443/udp` |
| VLESS 入站 | ID 4，`8443/tcp`，正在使用，不能修改 |
| Hysteria2 入站 | ID 5，原备注为 `hysteria` |

## 最终链路

```text
hy2.geekyspace.cn
        ↓ DNS only
132.226.105.17:9443/udp
        ↓ Oracle Cloud UDP 9443
        ↓ Ubuntu UFW UDP 9443
        ↓ 3x-ui / Xray ID 5
        ↓ Hysteria2 + TLS
```

`vpn.geekyspace.cn` 是 Cloudflare Tunnel 的面板域名，不用于 Hysteria2。

---

## 一、1Panel 申请证书

### 1. 准备 DNS 记录

Cloudflare 中添加或确认：

```text
hy2.geekyspace.cn → 132.226.105.17
```

代理状态必须是：

```text
仅 DNS / DNS only
```

Hysteria2 使用 UDP/QUIC，不能依赖普通 Cloudflare 橙色代理。

### 2. 创建 Cloudflare API Token

Cloudflare 路径：

```text
管理帐户 → 帐户 API 令牌 → 创建令牌
```

本次 Token 使用以下策略：

| 项目 | 设置 |
| --- | --- |
| 名称 | `1panel-hy2-dns` |
| 过期时间 | 无过期时间 |
| 资源 | 只选择 `geekyspace.cn` |
| 权限 | `Zone → DNS → Edit`，显示为 `DNS Write` |
| IP 过滤 | 允许 `132.226.105.17` |
| Global API Key | 不使用 |

`Zone → Zone → Read` 先不添加。只有 1Panel 明确提示需要读取 Zone 信息时，才补充该权限。

![Cloudflare Token 审核摘要](https://img.geekyspace.cn/pictures/2026/202611200435708.png)

::: tip Token 填写方式
1Panel 的 API Token 栏只填 Token 原文，不要加 `Bearer`，也不要填 Cloudflare 帐户 ID。
:::

### 3. 在 1Panel 添加 DNS 账号

进入：

```text
网站 → 证书 → DNS 账号
```

填写：

| 字段 | 值 |
| --- | --- |
| 名称 | `cloudflare-hy2` |
| 类型 | `Cloudflare` |
| Email | `joeljhou336@gmail.com` |
| API Token | Cloudflare Token 原文 |

![1Panel 添加 Cloudflare DNS 账号](https://img.geekyspace.cn/pictures/2026/202611200436544.png)

### 4. 申请 Let's Encrypt 证书

进入：

```text
网站 → 证书 → 申请证书
```

填写：

| 字段 | 值 |
| --- | --- |
| 主域名 | `hy2.geekyspace.cn` |
| ACME 账户 | `joeljhou336@gmail.com [Let's Encrypt]` |
| 密钥算法 | `EC 256` |
| 验证方式 | `DNS 账号` |
| DNS 账号 | `cloudflare-hy2 [Cloudflare]` |
| 自动续签 | 勾选 |
| 其他域名 | 留空 |
| IP 证书 | 不勾选 |
| 禁用 CNAME | 不勾选 |
| 跳过 DNS 校验 | 不勾选 |
| DNS 服务器 | 留空 |

首次申请时可以先不勾选「推送证书到本地目录」，等证书申请成功后再设置目录。

![1Panel 申请证书](https://img.geekyspace.cn/pictures/2026/202611200436545.png)

### 5. 等待 DNS-01 验证完成

1Panel 会在 Cloudflare 中临时创建：

```text
_acme-challenge.hy2.geekyspace.cn
```

![Cloudflare ACME TXT 记录](https://img.geekyspace.cn/pictures/2026/202611200436556.png)

日志中反复出现：

```text
dns01: waiting for record propagation
```

属于正常等待，不要在验证过程中手动删除 TXT 记录，也不要反复重复申请。

本次等待约十分钟后，日志显示：

```text
申请 [hy2.geekyspace.cn] 证书成功
```

状态从「申请中」变为「正常」。

![证书申请成功日志](https://img.geekyspace.cn/pictures/2026/202611200436546.png)

证书详情确认：

- 主域名：`hy2.geekyspace.cn`；
- 颁发机构：Let's Encrypt；
- 到期时间：`2027-02-18`；
- 申请方式：DNS 账号。

![证书详情](https://img.geekyspace.cn/pictures/2026/202611200436547.png)

### 6. 推送证书到宿主机

在已签发证书的编辑页面勾选：

```text
推送证书到本地目录
```

目录填写：

```text
/etc/ssl/private/3x-ui/hy2.geekyspace.cn
```

1Panel 会在这个目录生成：

```text
/etc/ssl/private/3x-ui/hy2.geekyspace.cn/fullchain.pem
/etc/ssl/private/3x-ui/hy2.geekyspace.cn/privkey.pem
```

![推送证书到本地目录](https://img.geekyspace.cn/pictures/2026/202611200436548.png)

文件含义：

- `fullchain.pem`：服务器证书和完整证书链；
- `privkey.pem`：证书私钥，只允许 root 或服务进程读取。

本次 1Panel 创建目录后，文件没有自动出现，因此从 1Panel 下载证书 ZIP，再手动上传两个文件到上述目录。手动上传时只需要确认最终路径和权限，不需要重新申请证书。

推荐权限：

```text
fullchain.pem  root:root  0644
privkey.pem    root:root  0600
```

检查文件：

```bash
dir=/etc/ssl/private/3x-ui/hy2.geekyspace.cn
sudo ls -ld -- "$dir" "$dir/fullchain.pem" "$dir/privkey.pem"
```

### 7. 验证证书

确认域名、有效期和 SAN：

```bash
sudo openssl x509 \
  -in /etc/ssl/private/3x-ui/hy2.geekyspace.cn/fullchain.pem \
  -noout -subject -issuer -dates -ext subjectAltName
```

确认私钥和证书匹配：

```bash
sudo openssl x509 -in /etc/ssl/private/3x-ui/hy2.geekyspace.cn/fullchain.pem \
  -pubkey -noout | openssl pkey -pubin -outform DER | openssl dgst -sha256

sudo openssl pkey -in /etc/ssl/private/3x-ui/hy2.geekyspace.cn/privkey.pem \
  -pubout -outform DER | openssl dgst -sha256
```

两条命令输出的摘要应该一致。

---

## 二、3x-ui 配置 Hysteria2

### 1. 只修改现有 ID 5

3x-ui 入站情况：

| ID  | 入站         | 端口     | 处理             |
| --- | ---------- | ------ | -------------- |
| 4   | `vless`    | `8443` | 正在使用，不修改       |
| 5   | `hysteria` | `9443` | 在此配置 Hysteria2 |

界面协议虽然显示 `hysteria`，但传输页的版本是 `2`，所以实际配置的是 Hysteria2。

### 2. 基础配置

进入：

```text
入站 → ID 5 → 编辑 → 基础配置
```

| 字段 | 值 |
| --- | --- |
| 备注 | `hysteria2` |
| 协议 | `hysteria` |
| 地址 | 留空，监听所有 IP |
| 分享地址策略 | `自定义` |
| 自定义分享地址 | `hy2.geekyspace.cn` |
| 订阅排序 | `2` |
| 端口 | `9443` |
| 总流量 | `0` |
| 流量重置 | `从不` |
| 到期时间 | 留空 |

![ID 5 Hysteria2 基础配置](https://img.geekyspace.cn/pictures/2026/202611200436553.png)

VLESS 的订阅排序保持 `1`，Hysteria2 设置为 `2`，这样平时优先看到 VLESS，需要看视频或下载时再切换 Hysteria2。

#### 为什么分享地址必须是域名

这里填：

```text
hy2.geekyspace.cn
```

不要填：

```text
132.226.105.17
```

因为证书签发给 `hy2.geekyspace.cn`，TLS 的 SNI 也使用这个域名。分享地址是给客户端连接用的地址，不等于服务端的监听地址；监听地址留空仍然表示监听所有 IP。

### 3. 传输配置

进入「传输」页：

| 字段 | 值 |
| --- | --- |
| 版本 | `2` |
| UDP 空闲超时 | `60` 秒 |
| 伪装 | 关闭 |
| Sockopt | 关闭 |
| UDP Masks | 不配置，删除 Salamander mask |
| QUIC Params | 关闭 |

第一次先使用最小配置，不要同时加入 Brutal、伪造带宽、端口跳跃或 UDP 混淆。

包含认证密码的截图不放入本文，避免密码进入笔记或 Git 历史。

### 4. 安全配置

进入「安全」页：

| 字段 | 值 |
| --- | --- |
| 安全 | `TLS` |
| SNI | `hy2.geekyspace.cn` |
| 最小 TLS 版本 | `1.2` |
| 最大 TLS 版本 | `1.3` |
| uTLS | `chrome` |
| ALPN | `h3` |
| 公钥/证书 | `/etc/ssl/private/3x-ui/hy2.geekyspace.cn/fullchain.pem` |
| 私钥 | `/etc/ssl/private/3x-ui/hy2.geekyspace.cn/privkey.pem` |
| ECH Sockopt | 关闭 |
| ECH 配置列表 | 留空 |
| ECH key | 留空 |
| 主密钥日志 | 留空 |
| 固定对端证书 SHA-256 | 留空 |
| 按名称验证对端证书 | 留空 |

![3x-ui 面板证书路径](https://img.geekyspace.cn/pictures/2026/202611200436549.png)

![Hysteria2 安全配置](https://img.geekyspace.cn/pictures/2026/202611200436554.png)

#### ECH 和嗅探为什么关闭

当前目标只是先跑通：

```text
Hysteria2 + TLS + UDP/QUIC
```

ECH 不是 Hysteria2 基础连接所必需，暂时不要点击「应用到 ECH 配置列表」，也不要填写 ECH key。

嗅探同样先关闭。先减少变量，等基础连接稳定后再考虑是否有明确需求开启。

### 5. 面板证书导致 Cloudflare Tunnel 502

为了让 3x-ui 面板使用 HTTPS，在「面板设置 → 证书」中填入：

```text
公钥：/etc/ssl/private/3x-ui/hy2.geekyspace.cn/fullchain.pem
私钥：/etc/ssl/private/3x-ui/hy2.geekyspace.cn/privkey.pem
```

重启面板后，面板端口 `2196` 从 HTTP 变成 HTTPS。Cloudflare Tunnel 原来配置的是：

```text
http://127.0.0.1:2196
```

因此返回 502。Tunnel 源站改成：

```text
https://127.0.0.1:2196
```

同时设置源服务器名称：

```text
hy2.geekyspace.cn
```

![Cloudflare Tunnel 使用 HTTPS 访问 3x-ui](https://img.geekyspace.cn/pictures/2026/202611200436550.png)

Cloudflare Tunnel 的具体设置如下：

- 完整主机名：`vpn.geekyspace.cn`
- Service URL：`https://127.0.0.1:2196`
- 源服务器名称：`hy2.geekyspace.cn`
- CA 池：留空

![Cloudflare Tunnel 源站 HTTPS 与服务器名称](https://img.geekyspace.cn/pictures/2026/202611200436551.png)

修复后，下面地址恢复正常：

```text
https://vpn.geekyspace.cn/joeljhou/
```

### 6. 放行 UDP 9443

#### Oracle Cloud

入站规则：

```text
来源：0.0.0.0/0
协议：UDP
目标端口：9443
```

![Oracle Cloud UDP 9443 入站规则](https://img.geekyspace.cn/pictures/2026/202611200436555.png)

#### Ubuntu UFW

服务器本机执行：

```bash
sudo ufw allow 9443/udp
```

检查：

```bash
sudo ufw status numbered
sudo ss -lunp 'sport = :9443'
```

本次确认结果：

```text
9443/udp ALLOW IN Anywhere
*:9443 users:(('xray-linux-arm6', ...))
```

Oracle Cloud 和 Ubuntu UFW 是两层防火墙，两边都要放行。

### 7. 添加 Hysteria2 客户端

Hysteria2 需要自己的认证信息。之前的 3 个客户端只关联了 VLESS，不能直接拿来当 Hysteria2 客户端。

本次最后检查时：

```text
ID 5 users_count=0
```

因此还需要在现有 ID 5 下添加一个客户端：

- 生成随机认证密码；
- 不开启 Brutal；
- 不设置伪造带宽；
- 不把密码写进本文；
- 保存后检查 Xray 配置是否成功加载。

### 8. Shadowrocket 测试

添加客户端并保存后：

1. 刷新 Shadowrocket 中的 `极客空间` 订阅；
2. 确认出现 Hysteria2 节点；
3. 确认地址为：`hy2.geekyspace.cn:9443`；
4. 使用 Shadowrocket 的节点测试功能；
5. 测试网页、视频和大文件下载；
6. 回到 3x-ui 检查 ID 5 的在线状态、速度和流量。

当前 Shadowrocket 还没有完成 Hysteria2 测试，因为 ID 5 尚未添加客户端。

---

# 当前状态

## 已完成

- [x] `hy2.geekyspace.cn` A 记录指向 `132.226.105.17`
- [x] Cloudflare 设置为 DNS only
- [x] Cloudflare API Token 创建完成
- [x] 1Panel DNS 账号 `cloudflare-hy2` 添加完成
- [x] Let's Encrypt DNS-01 证书申请成功
- [x] 证书推送/上传到宿主机
- [x] 证书和私钥验证通过
- [x] 3x-ui ID 5 基础配置完成
- [x] 3x-ui ID 5 TLS 配置完成
- [x] Oracle Cloud UDP 9443 已放行
- [x] Ubuntu UFW UDP 9443 已放行
- [x] Cloudflare Tunnel 已切换为 HTTPS 源站
- [x] `vpn.geekyspace.cn` 恢复访问


## 参考资料

- [1Panel：证书管理](https://1panel-dev.github.io/docs/v2/user_manual/websites/certificate/)
- [Let's Encrypt：DNS-01 验证](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge)
- [Cloudflare：创建 API 令牌](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
- [OpenSSL：证书校验](https://docs.openssl.org/3.0/man1/openssl-verify/)
- [别再直连了！3X-UI 搞定 Hysteria2 终极配置：端口跳跃+Salamander火蜥蜴混淆，晚高峰秒开4K！ - YouTube](https://www.youtube.com/watch?v=xaS9n09bqq0)
