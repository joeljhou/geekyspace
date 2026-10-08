---
title: 首次登录服务器
date: 2026-07-30
category: 云计算
tags:
  - server
  - ubuntu
  - ssh
shortTitle: Ubuntu 首次登录
description: 使用 SSH 首次登录 ARM Ubuntu 服务器并完成基础系统检查与初始化
icon: ubuntu
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 首次登录服务器

> 连接 Ubuntu 服务器前，将 `SERVER_IP`、用户名和私钥路径替换为真实值。

## 登录服务器

```shell
# 方式一：直接登录
ssh ubuntu@SERVER_IP

# 方式二：使用私钥登录
chmod 600 ~/.ssh/server-key.pem
ssh -i ~/.ssh/server-key.pem ubuntu@SERVER_IP

# 方式三：使用 SSH 别名登录
# 将以下配置写入本地 ~/.ssh/config

Host arm-ubuntu
    HostName SERVER_IP
    User ubuntu
    IdentityFile ~/.ssh/server-key.pem
    ServerAliveInterval 60
    ServerAliveCountMax 3

# 后续使用别名登录
ssh arm-ubuntu
```

## 防火墙提醒

> [!DANGER] 不要清空防火墙
> 不要为了“开放端口”执行下面这些命令：
> ```bash
> sudo iptables -P INPUT ACCEPT
> sudo iptables -P FORWARD ACCEPT
> sudo iptables -P OUTPUT ACCEPT
> sudo iptables -F
> ```
> 它们会把默认策略改为全部放行并清空过滤规则，不是正常的端口开放方式。

具体的 INPUT、OUTPUT、FORWARD、远程自动回滚和规则持久化见 [Linux 防火墙与 iptables 基础](../basic/iptables-firewall-basics)。

## Ubuntu 服务器执行

查看服务器的系统、硬件、资源、磁盘、网络和服务状态：

```shell
# 系统信息
hostnamectl                  # 主机名、操作系统和内核信息
cat /etc/os-release          # Ubuntu 版本
uname -m                     # CPU 架构
uname -r                     # Linux 内核版本
uptime                       # 运行时间和系统负载
timedatectl                  # 时间和时区

# CPU 与内存
nproc                        # CPU 核心数
lscpu                        # CPU 详细信息
free -h                      # 内存和 Swap 使用情况

# 磁盘
df -h                        # 文件系统磁盘使用情况
lsblk                        # 磁盘和分区结构
du -sh ~                     # 当前用户目录占用空间

# 网络
ip -br addr                  # 网卡和 IP 地址
ip route                     # 默认网关和路由
ss -tulpn                    # 正在监听的端口

# 服务与进程
systemctl --failed           # 启动失败的系统服务
ps aux --sort=-%mem | head   # 内存占用最高的进程
ps aux --sort=-%cpu | head   # CPU 占用最高的进程
```

> [!check] 重点检查
> 
> - ARM 服务器的 `uname -m` 通常应为 `aarch64`。
>     
> - `nproc` 应与购买的 CPU 核心数一致。
>     
> - 使用 `free -h` 和 `df -h` 确认内存、磁盘空间是否正常。
>     
> - `systemctl --failed` 最好显示 `0 loaded units listed`。
>     

更新软件包索引并升级系统：

```shell
sudo apt update
sudo apt full-upgrade -y
```

安装常用基础工具：

```shell
sudo apt install -y ca-certificates curl git vim htop jq unzip tree
```

查看是否需要重启：

```shell
test -f /var/run/reboot-required && cat /var/run/reboot-required
```

> [!warning] 重启会断开 SSH  
> 执行重启后，等待几十秒再重新连接服务器。

```shell
sudo reboot
```

---
上一步：[甲骨文云注册教程](00-oracle-cloud-registration) ｜ 下一步：[安装 NVM、Node.js](03-nvm-nodejs)
