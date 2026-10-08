---
title: systemd 服务管理基础
date: 2026-08-01
category: 云计算
tags:
  - server
  - linux
  - systemd
shortTitle: systemd 服务管理
description: 理解 Ubuntu systemd 单元、服务状态、开机启动、日志和临时任务
icon: linux
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# systemd 服务管理基础

本篇只讲可复用的 systemd 知识。Cloudflare Tunnel 的安装、unit、日志和运维命令统一放在 [创建 Cloudflare Tunnel 隧道](../oracle-cloud/07-cloudflare-tunnel)。

## systemd 是什么

systemd 是 Ubuntu 的系统与服务管理器，负责：

- 系统启动时按依赖顺序拉起服务；
- 监督长期运行的进程；
- 在进程异常退出后按策略重启；
- 收集服务的标准输出和错误日志；
- 运行定时器和临时任务。

Docker 与 systemd 都能管理进程，但层次不同：Docker 管理容器生命周期，systemd 主要管理宿主机服务。

## unit 文件的三个部分

典型的 service unit：

```ini
[Unit]
Description=Example service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/example
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

| 部分          | 用途               |
| ----------- | ---------------- |
| `[Unit]`    | 描述服务及其启动顺序、依赖关系  |
| `[Service]` | 定义要运行的程序和重启策略    |
| `[Install]` | 定义启用后挂接到哪个系统启动目标 |

常见配置：

| 配置 | 含义 |
| --- | --- |
| `After=network-online.target` | 网络在线目标之后再启动 |
| `Wants=network-online.target` | 启动时同时拉起网络在线目标 |
| `ExecStart=...` | 真正执行的命令 |
| `Restart=on-failure` | 异常退出时自动重启 |
| `RestartSec=5s` | 失败后等待 5 秒再启动 |
| `WantedBy=multi-user.target` | 启用后随正常多用户系统启动 |

## enabled 和 active 不一样

- `enabled`：已经设置以后开机自动启动；
- `active`：进程此刻正在运行。

```bash
systemctl is-enabled <服务名>
systemctl is-active <服务名>
```

服务可能已启用但当前启动失败，也可能正在运行但下次开机不会自动启动，所以排错时两项都要看。

## 常用服务命令

### 查看状态

```bash
sudo systemctl status <服务名> --no-pager
```

重点查看：

- `Loaded`：unit 是否加载；
- `Active`：当前状态；
- `Main PID`：主进程；
- 最下面的近期日志。

### 启动、停止和重启

```bash
sudo systemctl start <服务名>
sudo systemctl stop <服务名>
sudo systemctl restart <服务名>
```

### 设置开机启动

```bash
sudo systemctl enable <服务名>
sudo systemctl disable <服务名>

# 设置开机启动并立即启动
sudo systemctl enable --now <服务名>
```

### 查看实际配置

```bash
sudo systemctl cat <服务名>

systemctl show <服务名> \
  -p FragmentPath \
  -p ActiveState \
  -p UnitFileState \
  -p MainPID
```

不要凭记忆猜服务从哪个路径启动，`systemctl cat` 和 `systemctl show` 能显示 systemd 实际使用的配置。

## daemon-reload 与 restart 的区别

手动修改 unit 文件后执行：

```bash
sudo systemctl daemon-reload
```

它只让 systemd 重新读取 unit，不会自动重启进程。修改 `ExecStart` 等运行参数后通常还要执行：

```bash
sudo systemctl restart <服务名>
```

记忆方式：

```text
daemon-reload：让管理器重新读文件
restart：让服务进程重新运行
```

## journalctl 查看服务日志

systemd 启动的服务，其标准输出和错误输出默认进入 journal：

```bash
# 最近 100 行
sudo journalctl -u <服务名> --no-pager -n 100

# 持续追踪新日志，类似 tail -f
sudo journalctl -u <服务名> -f
```

`-u` 表示只查看指定 unit。

## systemd-run 临时任务

`systemd-run` 可以临时创建 service 或 timer，不需要手写永久 unit。例如：

```bash
sudo systemd-run \
  --unit=example-rollback \
  --on-active=2m \
  /usr/local/sbin/example-rollback-command
```

含义是两分钟后执行指定命令。验证变更成功后取消计时器：

```bash
sudo systemctl stop example-rollback.timer
```

它适合远程修改防火墙、网络或 SSH 配置：先安排自动撤销，再进行可能导致失联的操作。本次防火墙使用的具体命令见 [Linux 防火墙与 iptables 基础](iptables-firewall-basics)。

## reset-failed 为什么可能提示 unit 不存在

```bash
sudo systemctl reset-failed <服务名>
```

这个命令只清除已加载 unit 的失败状态。如果服务已经被卸载并执行过 `daemon-reload`，可能看到：

```text
Unit <服务名>.service not loaded
```

这通常表示 unit 已经不在 systemd 中，不是卸载失败。继续结合下面两条检查：

```bash
systemctl status <服务名>
systemctl list-unit-files | grep <服务名>
```

## 推荐掌握顺序

1. 先区分 `enabled` 与 `active`；
2. 会用 `status` 和 `journalctl` 判断故障；
3. 会用 `cat` 确认真正的启动命令；
4. 理解 `daemon-reload` 不等于 `restart`；
5. 实际做远程高风险修改前，再复习 `systemd-run`。

## 参考资料

- [systemd.service 手册](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html)
- [systemctl 手册](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
- [journalctl 手册](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
- [systemd-run 手册](https://www.freedesktop.org/software/systemd/man/latest/systemd-run.html)

---

