---
title: 用 Docker 部署 WireGuard
date: 2026-07-30
category: 云计算
tags:
  - server
  - docker
  - wireguard
  - wg-easy
shortTitle: WireGuard 部署
description: 用 wg-easy 部署 WireGuard 并配置 SSH 隧道访问管理后台
icon: wg
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 安装 WireGuard

## 一键脚本部署

推荐使用 [nyr/wireguard-install（GitHub）](https://github.com/nyr/wireguard-install)：一个开源的交互式 WireGuard 服务端安装脚本。

运行脚本并按照提示操作：

```shell
wget https://git.io/wireguard -O wireguard-install.sh && bash wireguard-install.sh
```

安装完成后会自动生成客户端配置文件（`.conf`）和二维码。再次运行同一命令，即可在菜单中选择**添加用户**、**删除用户**或**完全卸载 WireGuard**。

```shell
Welcome to this WireGuard road warrior installer!

Which IPv4 address should be used?
     1) 10.0.0.140
     2) 172.17.0.1
IPv4 address [1]:  

This server is behind NAT. What is the public IPv4 address or hostname?
Public IPv4 address / hostname [132.226.105.17]: 

What port should WireGuard listen on?
Port [51820]: 

Enter a name for the first client:
Name [client]: joel-iphone

Select a DNS server for the client:
   1) Default system resolvers
   2) Google
   3) 1.1.1.1
   4) OpenDNS
   5) Quad9
   6) Gcore
   7) AdGuard
   8) Specify custom resolvers
DNS server [1]: 3

WireGuard installation is ready to begin.
Press any key to continue...
Hit:1 https://download.docker.com/linux/ubuntu jammy InRelease
Hit:2 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy InRelease                         
Get:3 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy-updates InRelease [128 kB]
Get:4 http://ports.ubuntu.com/ubuntu-ports jammy-security InRelease [129 kB]
Get:5 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy-backports InRelease [127 kB]
Get:6 http://ports.ubuntu.com/ubuntu-ports jammy-security/main arm64 Packages [3285 kB]
Fetched 3669 kB in 4s (988 kB/s)      
Reading package lists... Done
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  libqrencode4 wireguard-tools
Suggested packages:
  openresolv | resolvconf
The following NEW packages will be installed:
  libqrencode4 qrencode wireguard wireguard-tools
0 upgraded, 4 newly installed, 0 to remove and 0 not upgraded.
Need to get 143 kB of archives.
After this operation, 458 kB of additional disk space will be used.
Get:1 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy/universe arm64 libqrencode4 arm64 4.1.1-1 [23.1 kB]
Get:2 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy/universe arm64 qrencode arm64 4.1.1-1 [24.3 kB]
Get:3 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy/main arm64 wireguard-tools arm64 1.0.20210914-1ubuntu2 [92.5 kB]
Get:4 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy/universe arm64 wireguard all 1.0.20210914-1ubuntu2 [3114 B]
Fetched 143 kB in 1s (239 kB/s)            
Selecting previously unselected package libqrencode4:arm64.
(Reading database ... 130178 files and directories currently installed.)
Preparing to unpack .../libqrencode4_4.1.1-1_arm64.deb ...
Unpacking libqrencode4:arm64 (4.1.1-1) ...
Selecting previously unselected package qrencode.
Preparing to unpack .../qrencode_4.1.1-1_arm64.deb ...
Unpacking qrencode (4.1.1-1) ...
Selecting previously unselected package wireguard-tools.
Preparing to unpack .../wireguard-tools_1.0.20210914-1ubuntu2_arm64.deb ...
Unpacking wireguard-tools (1.0.20210914-1ubuntu2) ...
Selecting previously unselected package wireguard.
Preparing to unpack .../wireguard_1.0.20210914-1ubuntu2_all.deb ...
Unpacking wireguard (1.0.20210914-1ubuntu2) ...
Setting up libqrencode4:arm64 (4.1.1-1) ...
Setting up qrencode (4.1.1-1) ...
Setting up wireguard-tools (1.0.20210914-1ubuntu2) ...
wg-quick.target is a disabled or a static unit not running, not starting it.
Setting up wireguard (1.0.20210914-1ubuntu2) ...
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for libc-bin (2.35-0ubuntu3.14) ...
Scanning processes...                                                                                                                                             
Scanning candidates...                                                                                                                                            
Scanning linux images...                                                                                                                                           

Running kernel seems to be up-to-date.

Restarting services...
 /etc/needrestart/restart.d/systemd-manager
 systemctl restart iscsid.service packagekit.service ssh.service systemd-journald.service systemd-networkd.service systemd-resolved.service systemd-timesyncd.service systemd-udevd.service udisks2.service unified-monitoring-agent.service
Service restarts being deferred:
 systemctl restart systemd-logind.service
 systemctl restart user@1001.service

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
Created symlink /etc/systemd/system/multi-user.target.wants/wg-iptables.service → /etc/systemd/system/wg-iptables.service.
Created symlink /etc/systemd/system/multi-user.target.wants/wg-quick@wg0.service → /lib/systemd/system/wg-quick@.service.

█████████████████████████████████████████████████████████████████████████
█████████████████████████████████████████████████████████████████████████
████ ▄▄▄▄▄ █ █▄  ▀▄ ▀ ██     ▄▄▀█▄ ▀▀▄▄▀█ ▄▄▄▀ ▄▀▄█ ▀ █▄███▄▀█ ▄▄▄▄▄ ████
████ █   █ █ ▀▀▀██ █▄▄ ▀█▄█▄█▀ ▄▀  ▀▀▄ ▀▄▀▄█ ▄▄▀▄▀ ▄███▀ ▄ ▀▄█ █   █ ████
████ █▄▄▄█ █▀█▀▄▀   ▀█▄ ██▀ ▄ ▄█ ▀ ▄▄▄ █▀█▄█▄█  ▀█▀▄▀▄ ▄ ▄▀█▄█ █▄▄▄█ ████
████▄▄▄▄▄▄▄█▄▀ ▀▄█▄█▄█▄█ ▀▄▀ ▀▄▀▄▀ █▄█ ▀ █ █ ▀ ▀▄▀ █▄█ ▀▄▀▄▀▄█▄▄▄▄▄▄▄████
████  █▀▄ ▄▀█ █ ▀▄▄▄█▀▀▀ █▀▀   ▀▀▄  ▄▄ █▄█▀█▀▀▀▄▄▀ ▀██▄▄▀▄█▀█▀█▄█ ▄▄ ████
██████▀ ▄█▄███▀  ██ ▀  █ ▄▀  ▀ ▀██▄▄   ▄▀▄  ▀▀█▀▄ █▄▄█  █ █ ▄▀▀ ▀ ▄ ▄████
██████▀▀ ▀▄ ██  █▄ ▄██▄▀ ▀ ▄ ▀▀▄█▄▀█▄▄    ▀▀▄ █ █▀▄█▄██▀█▄▀▄▀ █▀▄  █▄████
████▀▄ ▄▄█▄▄█ ▄▀█▄▀██▄▄▄█▄ ▀█▀█▀ ▀█▀▀▀ ▄█▄▄  ▄████▀▄▀██▀▀▀▄▄▄ █▄▄▄██▄████
████▀█ ██▀▄ ███▄▀▄▄▀ █▀█▄█▄█▄▀█▄▀▄▄▄██▄▀ █▀█▀▀█▄▄▀▄▀▄ ▄██▄▄ ▀▄▀▀█ ▄█ ████
████▀ ▄█▄█▄█▄▄  ▀ ▀▄█▄█▄█▄ ▀█▀█▀▀▀ ▀█ ▀▄█▄█▄  █▄██▄███ ▄▄███▄ █   █▄█████
████▄█▄███▄ ▀▄▀▄█▀█▄█▀ ▄▀▀███▄ ▀▀▄█▄█▄█▄▄▀▄   ▄█▀▄▄▄█▀▄▀▀▀ ▄▀  ▄▄ █▀█████
████ █  █▀▄█▄ ██▀  ▀ ▄ ▄▄▄▄ ▄▀█▀▀█▄▀█▀  ▄██ █  ██ █  ▄▀ ▄▀ ▄█ ▄▀▀▄▀▄█████
█████▄▀▄█▄▄ █ ▄ ▀▀▀ ▄▀▀ ██ ▄▄▀██▄▄█▄  █▄█▄▀▀▄▄▀█▄▀█▀▄▄ █  ▀▀ ▄▄█▄ ▀▀ ████
████▄▄▄ ▄█▄▄█ ▀█▀█ ▀▀ ▀▄▀▄  ▄█▀▀█▀ █▀▀▀ ███▄▄ ▄▀▀▀▄ ▄▄▀▄▄ ▀██ ▀▄▄▄▄▄▀████
████▄▄█ ▀▀▄█ ▀███ █▀▀▀ ▄▄█ ▀▄ ▀▀▀ ██▄▄▀▀▀▀▄ ███▀▄ ▄  █▄████ ▀ ▄▄▄  ▀█████
████▄ ▄▀ ▄▄▄  ▀▄  ▄▄█ █▀ ▄ ▄ ▀▄▄█▀ ▄▄▄  █▄█▄▀▄█▀█▄▀██▀█  ▄▄  ▄▄▄  ▀█ ████
█████▀▄█ █▄█ ▀ ▄▄ ▄█▀  █▄ ▀ ▀  █▀  █▄█ ▄█ ▄  ██▀▄▀ ██▀ ▄█▀▀  █▄█ ▄█ ▀████
████▄▀▄▀▄ ▄  ▀██▄▀█▀▀▀ ▄█▀█▀█▄  █ ▄▄  ▄▀▄█ ▄ ▀▀ █ ▀▀▀▀█ ▄▀▄█▄ ▄ ▄▀▄█▄████
█████▄█▀█ ▄█▄ █ ▄▀▀█▀▄▀▄▄▄▄▀▄▀▀█▄▄▄ ▄▀▄▀▀█  █▄ █▄██▀▀█ ▀▄▀▀█▀▀▀  ▀▀█ ████
████▀ ▄▄  ▄▄  █   ▄ ▀▄▀▄ ▄▀▀█▀▄▀█ ██ ▀█ ██    ▀█     ██    ▄▀█▄  ▀▄▄▄████
██████ ██▄▄   ██▄█▄ ▀█▀ ▄▀▄█▄   █▀▄ ▄▄ ███▀▀█ ██▄█ ▀▄▄  ▄▄█▄ ▀▄▀▀▀▄▀▀████
█████▀▄▄▀▀▄  █▄█▄▄█ █▄▄▄▀ █ ▄▀  █▄▄█▄▀▀▄ ▄█ ▀ ▀█▀ ▄ █▄▀ █ ▄ ▀   ▄▄ ▀▄████
████ ▀██▄▀▄█▀ █▀▄█▀▄██▀▀ ▀ ▄  ▀▄█▄▄▄▄▀█  ▄▀▀▄ ▄ ▄█ ▀ █▀▀▀▄█ ▄████▀▄▀█████
████▀ ▄ ▀▄▄█ ▄█▄▄▀▄▀  ▀▄█▄▀▀█▀█▀ ▀█▀  ▀▄▄▄▄  ▄█▀█▄▀█▀▀▄   █▄█▀▄▄▀▄█  ████
████ █▀  ▄▄▀▄▀█▀▀▄██▄█▄  █▄█▄ ▀▀██▄  ▀ ▀   █▀ ▀▀▄ ▄▀▄▄▀█  ▄ ▀ ██▀▄ ██████
█████▄▄▀  ▄▄ ▀▄█   ▀▀▄█▄█▄ ▀█▀█ ▀▄▀█▄▀  ▀██   ▄▄█▄ ▀▀▄█ ▀▄█▄ █ ▀ ▀██▄████
████▀█▀ ▄▄▄▄█▄ ▀█▄▄ █▀   ▀█▀▄▄ ▀█ ▄ ▄█▄█▄▀  ▀▄▄█▀▄ ▀▄█ ▄   ▄▀▀ █▄ ▀▀▄████
████▀█▄ █▄▄█▀█▀▀▄ █ ▄▄▀█  █▀▄█▀▀▀███▄█ ▄▀█▀ █ ▀▀█▀▀ ▄▄█▄█▀ ██▀▄▀▄█▄▄█████
█████▄▄█▄█▄█▀ ▄█▀▄▀█ ▀██  ██▄▄▀█▄▀ ▄▄▄ ▀▄▀█ ▄▄ ▄▄▄ ██▄██▀██▄ ▄▄▄  ▀█▀████
████ ▄▄▄▄▄ █▀▀▄▀▀▀▄ █▄██ ▄▀  ▀▀▀▀▀ █▄█  ▄▄▄▄▄ ▀▀▄ ▀  ▄█▄█▀▄▀ █▄█ ▄▄ █████
████ █   █ █▄  ▄█  ▀▀▄█▄▄▀▄▀▄▀▄▀▀▄ ▄ ▄▄▀▀▀▀ ███▀ ▀▄  █  ▀▄█▀▄▄▄ ▄ ▀██████
████ █▄▄▄█ █▀ ███ ▄▄█▄ ▀ ▄ ▄ ▀█▄█▄ ▄█▀  █▀ ▄▀▄▄▀▀▄  ▀ ▄▄ █▄▄▄█▄██ █  ████
████▄▄▄▄▄▄▄█▄▄█▄▄██▄▄▄▄▄█▄█▄██▄█▄█▄▄█▄█▄█▄█▄███▄████▄██▄██▄▄▄█▄▄▄█▄▄█████
█████████████████████████████████████████████████████████████████████████
█████████████████████████████████████████████████████████████████████████
↑ That is a QR code containing the client configuration.

Finished!

The client configuration is available in: /root/joel-iphone.conf
New clients can be added by running this script again.
```

> [!INFO] 为什么候选 IP 里有 172.17.0.1？
> `172.17.0.1` 不是服务器的真实网卡地址，而是 **Docker 的默认网桥 `docker0`**。安装 Docker Engine 后（见 [安装 Docker Engine](05-docker-engine)），Docker 会自动创建该网桥并使用默认网段 `172.17.0.0/16`，网关即为 `172.17.0.1`。安装脚本在枚举本机 IPv4 时把它一并检测了出来，但它**不能用于对外通信**，此处应选择 `10.0.0.140`（真实网卡地址）。

## Docker 部署

基于自带 Web UI 的 [wg-easy（GitHub）](https://github.com/wg-easy/wg-easy) 项目。

> [!TIP] 适用场景
> 如果你管理的用户较多，且**强烈依赖 Web 图形界面**来随时分发和管理客户端配置，或者服务器上已运行大量 Docker 服务、习惯统一的容器化运维，可以考虑使用 Docker 部署 `wg-easy`。需注意提前确认宿主机内核已内置 WireGuard 支持，并妥善配置 Docker 端口与防火墙转发。

> [!TODO] 详细步骤待补充
> [安装 - wg-easy](https://wg-easy.github.io/wg-easy/latest/examples/tutorials/basic-installation/#install-wg-easy)
> 后续实现 `docker-compose.yml` 配置、环境变量、端口映射及反向代理等内容。

---


上一步：[首次登录服务器](01-first-login) ｜ 下一步：[安装 1Panel 面板](06-1panel)
