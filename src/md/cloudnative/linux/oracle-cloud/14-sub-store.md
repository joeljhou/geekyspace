---
title: 部署 Sub-Store
date: 2026-08-05
category: 云计算
tags:
  - server
  - docker
  - sub-store
  - sub-web
  - subconverter
  - vite
shortTitle: Sub-Store
description: Sub-Store + Subconverter + Sub-Web 容器编排，sub-web 源码构建并在构建期注入后端环境变量
icon: link
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 部署 Sub-Store

Sub-Store 套件编排：**Sub-Store**（订阅管理）+ **Subconverter**（订阅转换后端）+ **Sub-Web**（转换前端）。其中 Sub-Web 是 Vite 静态前端，必须从源码构建，后端地址在构建期注入。

## 一、容器编排

编排目录：`/opt/1panel/docker/compose/sub-store`

```yaml
networks:
  1panel-network:
    external: true

services:
  sub-store:
    # 官方项目与镜像说明：https://hub.docker.com/r/xream/sub-store
    image: xream/sub-store:2.36.29
    container_name: sub-store
    restart: unless-stopped
    environment:
      SUB_STORE_FRONTEND_BACKEND_PATH: /joeljhou
      SUB_STORE_BACKEND_SYNC_CRON: "55 23 * * *"
    ports:
      - "127.0.0.1:3001:3001"
    volumes:
      - ./data:/opt/app/data

  subconverter:
    image: tindy2013/subconverter:latest
    container_name: subconverter
    restart: unless-stopped
    ports:
      - "127.0.0.1:25500:25500"
    volumes:
      - ./subconverter/pref.yml:/base/pref.yml

  # sub-web 不使用预编译镜像：
  #   image: careywong/subweb:latest
  # 而是从本地源码构建，以便在构建期注入 VITE_* 变量。
  sub-web:
    build:
      context: ./sub-web
      dockerfile: Dockerfile
      args:
        VITE_MYURLS_API: ${VITE_MYURLS_API}
        VITE_SUBCONVERTER_DEFAULT_BACKEND: ${VITE_SUBCONVERTER_DEFAULT_BACKEND}
    container_name: sub-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:3002:80"
```

`.env`：

```shell
# Subconverter 后端地址（只需到域名，代码会自动追加 /sub?）
VITE_SUBCONVERTER_DEFAULT_BACKEND=https://subconvert.geekyspace.cn
# 短链接后端（须与 Sub-Web 同源，由 Cloudflare Tunnel 转发到 MyUrls）
VITE_MYURLS_API=https://sub-web.geekyspace.cn/short
```

> [!IMPORTANT] 环境变量只在构建期生效
> Sub-Web 是 Vite 静态前端，`VITE_*` 变量在 `yarn build` 时写入 JS 产物；容器运行时只跑 Nginx，不再读取这些变量。因此不能用运行时 `environment:` 注入，必须通过 `build.args` 在构建期写入——**修改变量后必须重新构建**。

## 二、MyUrls 短链服务

Sub-Web 的"生成短链"功能调用 MyUrls 后端（`.env` 里的 `VITE_MYURLS_API` 即指它）。MyUrls 依赖 Redis，因此**单独编排**（不与 Sub-Store 套件放在一起），并加入 `1panel-network` 以复用 1Panel 管理的 Redis 容器（容器名 `redis8`）。

```yaml
networks:
  1panel-network:
    external: true

# MyUrls 官方 Docker 部署参考：
# https://github.com/CareyWang/MyUrls#docker
services:
  myurls:
    image: careywong/myurls:latest
    container_name: myurls
    restart: unless-stopped
    environment:
      MYURLS_PORT: "8002"
      MYURLS_DOMAIN: s.geekyspace.cn
      MYURLS_PROTO: https
      MYURLS_REDIS_CONN: redis8:6379
      MYURLS_REDIS_PASSWORD: "${PANEL_REDIS_ROOT_PASSWORD}"
    ports:
      - "127.0.0.1:8002:8002"
    networks:
      - 1panel-network
```

要点：

- `MYURLS_DOMAIN=s.geekyspace.cn`：生成的短链形如 `https://s.geekyspace.cn/xxxx`，因此该域名必须解析到本服务。
- `MYURLS_REDIS_CONN=redis8:6379`：`redis8` 是 1Panel 管理的 Redis 容器，通过 `1panel-network` 网络互通。
- `MYURLS_REDIS_PASSWORD`：直接复用 1Panel 注入的 `PANEL_REDIS_ROOT_PASSWORD` 环境变量，无需另配密码。
- 端口仅绑 `127.0.0.1:8002`，公网访问全部走 Cloudflare Tunnel。

## 三、Sub-Web 源码构建

Sub-Web 是 Vite 静态前端，后端地址（Subconverter、MyUrls）在 `yarn build` 时就被写死进 JS 产物。原生镜像 `careywong/subweb:latest` 里的静态文件已用官方默认地址编译固化，容器运行时只跑 Nginx 提供这些文件，不会再读取任何环境变量。因此要换成自建后端，只能拉源码、在构建期注入自己的 `VITE_*` 变量重新打包，无法通过运行时 `environment:` 覆盖。

拉取源码到编排目录下：

```bash
cd /opt/1panel/docker/compose/sub-store
git clone https://github.com/CareyWang/sub-web.git sub-web
```

修改 `sub-web/Dockerfile`，在 `RUN yarn build` 之前接收并设置构建参数：

```dockerfile
# ---- Build ----
FROM node:24-alpine AS build

WORKDIR /app
COPY . .
RUN yarn install

# 接收 Docker Compose 传入的构建参数，转为 Vite 构建时环境变量
ARG VITE_MYURLS_API
ARG VITE_SUBCONVERTER_DEFAULT_BACKEND
ENV VITE_MYURLS_API=${VITE_MYURLS_API}
ENV VITE_SUBCONVERTER_DEFAULT_BACKEND=${VITE_SUBCONVERTER_DEFAULT_BACKEND}

# 构建前端静态文件（VITE_* 在此写入产物）
RUN yarn build

# ---- Runtime ----
FROM nginx:1.24-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

> [!IMPORTANT] `ARG`/`ENV` 必须在 `RUN yarn build` 之前
> 否则变量不会进入构建产物，前端仍使用默认后端地址。

## 四、修改环境变量后重新构建

修改 `.env` 后，`docker compose restart sub-web` 不会重新执行 `yarn build`，必须重新构建镜像并强制重建容器：

```bash
cd /opt/1panel/docker/compose/sub-store

docker compose build --no-cache sub-web
docker compose up -d --force-recreate sub-web
```

随后浏览器强制刷新（macOS `⌘ + Shift + R` / Windows `Ctrl + F5`）。

## 五、Cloudflare Tunnel 路由

所有服务端口都只绑 `127.0.0.1`，公网入口统一由 `cloudflared`（Cloudflare Tunnel）转发。在 1Panel「Cloudflare Tunnel → 已发布的应用程序」中按下表配置公共主机名：

| 公网域名                       | 路径匹配       | 本地地址              | 对应服务             |
| -------------------------- | ---------- | ----------------- | ---------------- |
| `sub.geekyspace.cn`        | /          | `127.0.0.1:3001`  | Sub-Store        |
| `sub-web.geekyspace.cn`    | /          | `127.0.0.1:3002`  | Sub-Web          |
| `sub-web.geekyspace.cn`    | `^/short$` | `127.0.0.1:8002`  | MyUrls（创建短链 API） |
| `s.geekyspace.cn`          | /          | `127.0.0.1:8002`  | MyUrls（短链跳转）     |
| `subconvert.geekyspace.cn` | /          | `127.0.0.1:25500` | Subconverter     |
![](http://img.geekyspace.cn/pictures/2026/202608051820205.png)
> [!IMPORTANT] `/short` 路径与 Sub-Web 同源
> Sub-Web 前端把短链后端地址写死为 `https://sub-web.geekyspace.cn/short`（见 `.env` 的 `VITE_MYURLS_API`）。Cloudflare Tunnel 在**同一域名** `sub-web.geekyspace.cn` 上用路径规则 `^/short$` 把该请求转发到 MyUrls（8002），从而**避免跨域**——这正是 `.env` 注释里"须与 Sub-Web 同源"的含义。
> 而 `s.geekyspace.cn` 是 MyUrls 自己的域名，用于访问/跳转生成的短链，对应 `MYURLS_DOMAIN`。

## 参考资料

- [Sub-Store 官方镜像](https://hub.docker.com/r/xream/sub-store)
- [Sub-Web 官方仓库](https://github.com/CareyWang/sub-web)
- [Subconverter 官方仓库](https://github.com/tindy2013/subconverter)
- [MyUrls 官方仓库](https://github.com/CareyWang/MyUrls)
- [Vite 环境变量与模式](https://cn.vitejs.dev/guide/env-and-mode.html)

---

上一步：[安装 3X-UI 面板指南](13-3x-ui) ｜ 下一步：[部署 JoyFlix 影视平台](15-joyflix)
