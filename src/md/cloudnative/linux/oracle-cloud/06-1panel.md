---
title: 安装 1Panel面板
date: 2026-07-31
category: 云计算
tags:
  - server
  - 1panel
  - docker
  - 面板
shortTitle: 1Panel 安装
description: 在 Ubuntu arm64 服务器安装 1Panel 面板
icon: 1panel
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 安装 1Panel面板

> [!NOTE] 前置条件
> 1Panel 通过 Docker 管理应用，安装前请先完成 [安装 Docker Engine](05-docker-engine)。

## 安装 1Panel

使用官方一键安装脚本：

```bash
bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"
```

按照提示记录：

- 面板监听端口；
- 安全入口；
- 管理员用户名；
- 管理员密码。

忘记入口或账号密码时执行：

```bash
sudo 1pctl user-info
```

面板安装完成后，不需要为面板端口配置公网入站规则。下一篇统一使用 Cloudflare Tunnel 提供域名入口和 HTTPS：[创建 Cloudflare Tunnel 隧道](07-cloudflare-tunnel)。

## 绑定 1Panel 域名

确认 Tunnel 路由可用后，进入 **1Panel → 设置 → 安全 → 面板域名**，填写：
![image.png](http://img.geekyspace.cn/pictures/2026/202608012059161.png)

忘记入口、用户名或密码时，在服务器执行：

```bash
sudo 1pctl user-info
```

> [!WARNING] Tunnel 不会取消 1Panel 安全入口
> 绑定域名后，只访问域名根路径仍可能无法进入登录页，这是 1Panel 的安全设计，不是 Tunnel 故障。


## 参考资料

- [1Panel 官网](https://1panel.cn/)
- [1Panel v2 在线安装文档](https://1panel.cn/docs/v2/installation/online_installation/)
- [1Panel GitHub](https://github.com/1Panel-dev/1Panel)

---

上一步：[安装 Docker Engine](05-docker-engine) ｜ 下一步：[创建 Cloudflare Tunnel 隧道](07-cloudflare-tunnel)
