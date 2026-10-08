---
title: 创建 Cloudflare Tunnel 隧道
date: 2026-08-01
category: 云计算
tags:
  - server
  - cloudflare
  - tunnel
  - systemd
  - docker
  - firewall
shortTitle: Cloudflare Tunnel 内网穿透
description: 在 ARM Ubuntu 宿主机安装 cloudflared，由 systemd 运行并通过 localhost 统一发布 1Panel 与 OpenList
icon: cloudflare
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 创建 Cloudflare Tunnel 隧道

## 一、创建隧道 Tunnel


Cloudflare 控制台 → **联网 → Tunnels → 创建隧道**：

1. 类型选择 `Cloudflared`；
2. 名称例如 `arm-ubuntu`；
3. 在“设置环境 / 添加副本 / 安装连接器”中选择 `Debian`；
4. 复制控制台提供的**安装 cloudflared 连接器**命令。
## 二、安装 cloudflared 并建立连接
```shell
# 确认版本
cloudflared --version

# 建立连接，直接复制命令到服务器粘贴
sudo cloudflared service install '<TUNNEL_TOKEN>'
```
![image.png](http://img.geekyspace.cn/pictures/2026/202608011922874.png)

> [!IMPORTANT] **APT 与 Docker 安装 cloudflared 的区别**
> 
> `127.0.0.1` 始终指向 cloudflared 当前所在的网络环境：
> 
> - **宿主机 cloudflared**：`127.0.0.1` 指向 Ubuntu 宿主机
>     
> - **Docker cloudflared**：`127.0.0.1` 指向 cloudflared 容器自己
>     

## 三、发布应用程序

Cloudflare 控制台 → **联网 → Tunnels → arm-ubuntu → 路由 → 添加路由 → 已发布的应用程序**。

依次添加以下两个应用：

| 应用       | 子域名     | 域               | 路径  | 服务类型   | 服务 URL                   |
| -------- | ------- | --------------- | --- | ------ | ------------------------ |
| 1Panel   | `panel` | `geekyspace.cn` | 留空  | `HTTP` | `http://127.0.0.1:11075` |
| OpenList | `drive` | `geekyspace.cn` | 留空  | `HTTP` | `http://127.0.0.1:5244`  |

发布完成后，Cloudflare 会自动创建并维护类似下面的代理 DNS 记录：

```text
panel.geekyspace.cn
  CNAME → <Tunnel-UUID>.cfargotunnel.com

drive.geekyspace.cn
  CNAME → <Tunnel-UUID>.cfargotunnel.com
```

> [!INFO] HTTPS 说明  
> Tunnel 内部由 `cloudflared` 通过 HTTP 访问本机服务：
> 
> ```text
> cloudflared → http://127.0.0.1:<端口>
> ```
> 
> 用户浏览器到 Cloudflare 边缘节点之间仍然使用 HTTPS：
> 
> ```text
> 浏览器 → HTTPS → Cloudflare → Tunnel → HTTP → 本机服务
> ```
> 
> 因此，不需要为 1Panel 和 OpenList 单独配置公网 HTTPS 证书，也不需要向公网开放 `11075` 和 `5244` 端口。

## 四、访问测试

发布完成后，直接在浏览器中访问。预期结果：

- `panel.geekyspace.cn` 可以正常打开 1Panel 登录页面。
- `drive.geekyspace.cn` 可以正常打开 OpenList 页面。
- 浏览器地址栏显示 HTTPS 安全连接。
- 即使服务器防火墙没有向公网开放 `11075` 和 `5244` 端口，仍然可以通过 Tunnel 正常访问。
    

> [!TIP] 如果刚发布后无法访问  
> DNS 和 Tunnel 路由可能需要几十秒生效，可以稍后刷新页面再次测试。同时检查：
> 
> ```bash
> # 检查 cloudflared 服务状态
> sudo systemctl status cloudflared
> 
> # 检查本机服务是否正常监听
> sudo ss -lntp | grep -E '11075|5244'
> 
> # 在服务器本机测试服务
> curl -I http://127.0.0.1:11075
> curl -I http://127.0.0.1:5244
> ```

---
## 五、AI 建议
### 1. Cloudflare Access 要按用途决定

[一行代码不写实现零信任！CF不止是最好的CDN！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1a59CB3EPk)

纯个人网盘可以给 `drive.geekyspace.cn` 增加 Cloudflare Access，形成“Access 身份验证 + OpenList 登录”两道门。

如果需要公开分享文件或让普通 WebDAV 客户端访问，不要直接保护整个域名，否则非浏览器客户端可能无法完成交互式登录。可以改用 OpenList 自身权限，或为自动化客户端单独配置 Access Service Token。

### 2. Tunnel 与防火墙的关系

cloudflared 是服务器主动向 Cloudflare 建立出站连接，因此不需要为 Tunnel 对公网开放：

```text
11075、5244、5246、80、443
```

当前主机防火墙要点：

- IPv4/IPv6 `INPUT` 默认 `DROP`；
- 允许 loopback、已有连接、SSH 和 ICMP/ICMPv6；
- `OUTPUT` 保持 `ACCEPT`，允许 cloudflared 主动出站；
- `FORWARD` 暂时保持 `ACCEPT`，避免破坏 Docker 转发；
- Docker 应用端口必须继续绑定 `127.0.0.1`。

完整原理和本次执行命令见 [Linux 防火墙与 iptables 基础](../basic/iptables-firewall-basics)。

> [!WARNING] Docker 端口可能绕过 INPUT
> Docker 发布端口会经过 NAT/FORWARD，不能只依赖 INPUT 防火墙。限制 Docker 端口监听地址和设置主机防火墙解决的是两条不同流量路径。

### 3. 502 排错顺序

Cloudflare 错误页若显示：

```text
Browser     Working
Cloudflare  Working
Host        Error
```

说明问题多半发生在 Connector 到本地源站之间。固定顺序：

1. `systemctl is-active cloudflared`；
2. `journalctl -u cloudflared` 是否出现源站错误；
3. `ss -lntp` 是否监听目标端口；
4. `curl http://127.0.0.1:<端口>` 是否能访问；
5. Published application 是否填写正确的 localhost 端口；
6. Docker 应用是否运行，端口是否发布到 loopback；
7. 最后才检查防火墙路径和规则。

常见日志：

| 日志                                                        | 原因                                    |
| --------------------------------------------------------- | ------------------------------------- |
| `dial tcp 127.0.0.1:<port>: connect: connection refused`  | 服务未启动、端口错误或没有发布到宿主机                   |
| `dial tcp 172.17.0.1:<port>: connect: connection refused` | 仍使用旧 Docker bridge 地址，或服务只绑定 loopback |
| `Registered tunnel connection` 后仍 502                     | Connector 正常，继续检查路由和本地源站              |

不要一看到 502 就执行 `iptables -F`。清空防火墙会撤掉安全保护，且通常不能解决监听地址或路由错误。

## 六、参考资料

- [Cloudflare：Debian/Ubuntu APT 安装](https://developers.cloudflare.com/tunnel/advanced/local-management/create-local-tunnel/)
- [Cloudflare：创建 Tunnel](https://developers.cloudflare.com/tunnel/setup/)
- [Cloudflare：以 Linux 服务运行](https://developers.cloudflare.com/tunnel/advanced/local-management/as-a-service/linux/)
- [Cloudflare：Tunnel Token](https://developers.cloudflare.com/tunnel/advanced/tunnel-tokens/)
- [Cloudflare：Tunnel 工作原理](https://developers.cloudflare.com/tunnel/)
- [Docker：Bridge network driver](https://docs.docker.com/engine/network/drivers/bridge/)

---

上一步：[安装 1Panel 面板](06-1panel) ｜ 下一步：[云存储挂载 Openlist 网盘](08-openlist)
