---
order: 1
title: systemd 服务管理基础
shortTitle: systemd 服务管理
description: 掌握 Ubuntu 服务的启停、自启、日志，以及系统服务与用户服务的区别
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
  - systemd
---
# systemd 服务管理基础

systemd 负责管理 Ubuntu 上的服务：启动程序、按策略重启，并收集日志。日常主要用 `systemctl` 管服务，用 `journalctl` 查日志。

## 1. 先分清两种服务

| 类型 | 管理命令 | 自建配置位置 | 本系列例子 |
| --- | --- | --- | --- |
| 系统服务 | `sudo systemctl ...` | `/etc/systemd/system/` | cloudflared |
| 当前用户的服务 | `systemctl --user ...` | `~/.config/systemd/user/` | CLIProxyAPI |

同名服务也可能属于不同范围。管理 CLIProxyAPI 时，以安装它的用户登录，再用 `--user`；不要改成 `sudo systemctl`。

## 2. 日常操作

以下将 `example.service` 换成实际服务名，系统服务命令为：

```bash
# 看当前状态与近期日志
sudo systemctl status example.service --no-pager

# 启动、停止、重启
sudo systemctl start example.service
sudo systemctl stop example.service
sudo systemctl restart example.service

# 开机启动并立即启动
sudo systemctl enable --now example.service

# 取消开机启动，当前进程继续运行
sudo systemctl disable example.service

# 查看实际加载的配置
sudo systemctl cat example.service
```

`status` 重点看 `Loaded`（配置是否加载）、`Active`（运行状态）和底部报错。看到 `failed`，接着查日志。

**正在运行和开机自启是两回事：**

```bash
systemctl is-active example.service    # 此刻是否运行
systemctl is-enabled example.service   # 是否已设置自启
```

长期运行的服务通常显示 `active (running)`。`enabled` 只表示已设置自启，不保证启动成功。

## 3. 查日志

```bash
# 最近 100 行
sudo journalctl -u example.service -n 100 --no-pager

# 持续查看新日志，Ctrl+C 退出
sudo journalctl -u example.service -f
```

用户服务用下面这组，例如 CLIProxyAPI：

```bash
systemctl --user status cliproxyapi.service --no-pager
journalctl --user -u cliproxyapi.service -n 100 --no-pager
systemctl --user restart cliproxyapi.service
```

journal 收集的是服务输出到标准输出、标准错误的日志；应用自行写入的日志文件要另外查看。

## 4. 修改配置后做什么

修改 `.service` 文件后，先让 systemd 重新读配置，再重启服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart example.service
```

用户服务对应为 `systemctl --user daemon-reload` 和 `systemctl --user restart 服务名`。

记住：`daemon-reload` 更新管理器读到的配置，`restart` 重新运行程序。只改应用自己的配置文件时，通常按应用说明重启或重载，无须 `daemon-reload`。

## 5. 读懂 service 配置

不必背完整模板，先认识这几个字段：

| 配置 | 含义 |
| --- | --- |
| `[Unit]` 下的 `Description` | 服务说明 |
| `[Service]` 下的 `ExecStart` | 程序路径和启动参数 |
| `Restart=on-failure` | 异常退出后重启 |
| `RestartSec=5s` | 等 5 秒再重试 |
| `[Install]` 下的 `WantedBy` | `enable` 时挂接的启动目标 |

系统常驻服务的 `WantedBy` 常用 `multi-user.target`，用户服务常用 `default.target`。`ExecStart` 不自动经过 Shell；复杂命令写进脚本，再执行脚本。

## 6. 用户服务在退出 SSH 后继续运行

用户服务要在无人登录时运行，并随系统启动，需要启用 linger。以 `ubuntu` 用户为例：

```bash
sudo loginctl enable-linger ubuntu
```

再以该用户执行 `systemctl --user enable --now 服务名`，设置服务自启。CLIProxyAPI 的完整配置见 [安装 CLIProxyAPI 中转站](/md/cloudnative/linux/arm-ubuntu/ai/03-cliproxyapi-ubuntu.html)；cloudflared 的实际例子见 [创建 Cloudflare Tunnel 隧道](/md/cloudnative/linux/arm-ubuntu/network-proxy/01-cloudflare-tunnel.html)。

## 参考

- [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
- [journalctl](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
- [loginctl：enable-linger](https://www.freedesktop.org/software/systemd/man/latest/loginctl.html)
