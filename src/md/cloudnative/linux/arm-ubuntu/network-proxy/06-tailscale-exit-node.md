---
order: 6
title: 用 Oracle Cloud ARM Ubuntu 搭建 Tailscale 退出节点
shortTitle: Tailscale 退出节点
description: 将美国 Oracle Cloud 的 ARM Ubuntu 配置为 Tailscale 退出节点，让 iPhone 和 Mac 共用美国公网出口，并验证两台设备的私网互访
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-11-22
category: 云计算
tags:
  - tailscale
  - oracle-cloud
  - ubuntu
---

# 用 Oracle Cloud ARM Ubuntu 搭建 Tailscale 退出节点

在 iPhone 和 Mac 上选中美国 Oracle Cloud 服务器 `arm-ubuntu` 作为退出节点（Exit Node）后，两台设备访问公网都从这台服务器出去。访问彼此的 Tailscale IP 或 MagicDNS 名称时，流量仍走 Tailscale 私有网络（tailnet）。Tailscale 会尝试点对点直连，无法直连时可通过 DERP 中继通信。

## 1. 在服务器上安装 Tailscale

先在 Mac 上通过 SSH 登录服务器。

```bash
ssh arm-ubuntu
```

在 Ubuntu 上执行以下命令。服务器已经安装并加入同一个 tailnet 时，可跳过这一步。

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

打开终端打印的登录链接，用 iPhone 和 Mac 当前使用的 Tailscale 账号登录，确认 `arm-ubuntu` 出现在同一个 tailnet 的设备列表里。

## 2. 开启 IP 转发并批准退出节点

在服务器上把 IPv4 和 IPv6 转发写入 `/etc/sysctl.d/`，让设置在重启后仍然生效。加载配置后，再把服务器发布为退出节点。

```bash
# 持久化 IPv4 和 IPv6 转发设置
sudo tee /etc/sysctl.d/99-tailscale-exit-node.conf >/dev/null <<'EOF'
net.ipv4.ip_forward = 1
net.ipv6.conf.all.forwarding = 1
EOF

# 立即生效，成功后发布退出节点
sudo sysctl -p /etc/sysctl.d/99-tailscale-exit-node.conf &&
sudo tailscale set --advertise-exit-node
```

在管理后台找到 `arm-ubuntu`，依次点击 **⋯ → Edit route settings**，勾选 **Use as exit node** 后点 **Save**。批准后，客户端就能选择这台服务器。[Tailscale 管理后台 · Machines](https://login.tailscale.com/admin/machines)

![Use as exit node](http://img.geekyspace.cn/pictures/2026/202611221115823.png)

## 3. 在 iPhone 和 Mac 上选择出口

如果正在使用 Shadowrocket，先断开它，再确认 Tailscale 已连接。

| 设备 | 操作 |
| --- | --- |
| iPhone | 打开 Tailscale → **Exit Node** → 选择 `arm-ubuntu` |
| Mac | 打开 Tailscale 菜单 → **Exit Nodes** → 选择 `arm-ubuntu` |

- 要访问当前 Wi-Fi 下的 NAS、打印机或路由器，在对应客户端打开 **Allow Local Network Access**。通过 Tailscale IP 或 MagicDNS 互访时，保持默认设置即可。
- 要让 iPhone 在切换 Wi-Fi 或蜂窝网络后自动连接，可在 Tailscale 设置里按需配置 **VPN On Demand**。

![Mac 选择出口节点](http://img.geekyspace.cn/pictures/2026/202611221116373.png)

## 4. 验证公网出口与设备互访

**公网出口**。在服务器和 Mac 上各运行一次下面的命令。`--noproxy '*'` 让这次检查跳过 `curl` 的 HTTP 代理配置，流量依然由系统路由转发。

```bash
curl -4 --noproxy '*' https://api.ipify.org
```

两边应得到相同的公网 IPv4。iPhone 可以在浏览器打开同一地址，确认看到的 IPv4 也一致。[查看当前公网 IPv4](https://api.ipify.org)

**设备互访**。让 iPhone 切到蜂窝网络并保持 Tailscale 连接。把下方的示例地址换成 iPhone 的 Tailscale IP，再从 Mac 测试。

```bash
tailscale ping 100.x.y.z
```

输出 `via <IP>:<端口>` 表示点对点直连，`via DERP(...)` 表示走中继。有时前几次 ping 会先走 DERP，等直连建立后再切过去。

## 切回本地公网出口

在 iPhone 或 Mac 的退出节点菜单选 **None**，保留 Tailscale 连接。这样该设备的公网流量恢复走当前网络，仍可用 Tailscale IP 或 MagicDNS 名称访问另一台设备。

## 参考资料

- [Tailscale：在 Linux 上安装](https://tailscale.com/docs/install/linux)
- [Tailscale：配置退出节点](https://tailscale.com/docs/features/exit-nodes/how-to/setup?tab=linux)
- [Tailscale：退出节点](https://tailscale.com/docs/features/exit-nodes)
