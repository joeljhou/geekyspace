---
order: 4
title: CLIProxyAPI：Mac Docker 部署
shortTitle: CLIProxyAPI（Mac Docker）
description: 在本地 Mac 上使用 Docker Compose 部署 CLIProxyAPI，持久化配置、OAuth 凭据、日志和插件，并通过 ClashX 出网
icon: container
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-10-13
category: 云计算
tags:
  - macos
  - docker
  - cliproxyapi
  - ai
  - proxy
  - clashx
---
# CLIProxyAPI：Mac Docker 部署

本文记录在本地 Mac 上使用 OrbStack、Docker Compose 和 ClashX 部署 [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) 的过程。服务器上的部署方案见 [CLIProxyAPI：Ubuntu 脚本部署](/md/cloudnative/linux/arm-ubuntu/ai/03-cliproxyapi-ubuntu.html)。

这套部署有几个明确目标：

1. 服务只允许本机访问，不暴露到局域网；
2. `config.yaml` 映射到 Mac，方便直接修改；
3. OAuth 凭据、日志和插件全部持久化；
4. 容器通过 Mac 上的 ClashX 访问外网；
5. 管理后台密码由自己手动设置；
6. 首次部署时暂不创建 API 调用密钥，后续再从管理后台添加。

::: warning 不要在笔记中保存密码和 API Key

本文只记录配置位置和设置方法。管理密码、API Key 和 OAuth 凭据都应保存在密码管理器中，不要提交到 Git。

:::

## 一、部署环境

| 项目 | 值 |
| --- | --- |
| 首次部署日期 | `2026-10-13` |
| 当前部署核查日期 | `2026-11-11` |
| 运行环境 | 本地 Mac + OrbStack（Docker Compose） |
| CLIProxyAPI 版本（核查时） | `v8.0.27` |
| Docker 镜像 | `eceasy/cli-proxy-api:latest` |
| Compose 项目 | `cpa-deploy` |
| Compose 服务名 / 容器名 | `CPA` |
| 本机地址 | `http://127.0.0.1:8317` |
| 管理页面 | `http://127.0.0.1:8317/management.html` |
| 部署目录 | `~/Workspace/infra/services/cpa-deploy` |
| 配置文件 | `~/Workspace/infra/services/cpa-deploy/config.yaml` |
| Compose 文件 | `~/Workspace/infra/services/cpa-deploy/compose.yaml` |
| ClashX HTTP 代理 | `http://127.0.0.1:7890` |
| 容器访问 ClashX | `http://host.docker.internal:7890` |

::: note 当前部署位置已更新

2026-11-11 核查时，运行环境为 OrbStack，部署目录为 `~/Workspace/infra/services/cpa-deploy`，服务名和容器名均为 `CPA`。旧目录 `~/CLIProxyAPI` 和旧容器名 `cli-proxy-api` 已不再用于当前部署；`cli-proxy-api` 仅保留为容器网络别名。后续升级、重启和登录命令均从新目录执行。

:::

## 二、为什么使用 `host.docker.internal`

Mac 上的 ClashX 监听：

```text
http://127.0.0.1:7890
```

但是容器里的 `127.0.0.1` 指向容器自己，不是 Mac。当前 OrbStack 部署使用 `host.docker.internal` 访问宿主机上的 ClashX：

```text
http://host.docker.internal:7890
```

这是最容易踩的坑：**同一个 `127.0.0.1`，在 Mac 和容器中代表两台不同的网络主机。**

## 三、创建本地持久化目录

以下创建目录和配置示例用于首次部署。已有实例升级时保留现有 `config.yaml` 与 `data/`，直接使用第十节的更新命令。

```bash
mkdir -p ~/Workspace/infra/services/cpa-deploy/data/{auths,logs,plugins,static}
cd ~/Workspace/infra/services/cpa-deploy
touch config.yaml compose.yaml
```

最终目录结构：

```text
~/Workspace/infra/services/cpa-deploy/
├── compose.yaml
├── config.yaml
└── data/
    ├── auths/      # OAuth 登录凭据
    ├── logs/       # 文件日志
    ├── plugins/    # 管理后台安装的插件
    └── static/     # 管理页面静态文件
```

官方特别提醒需要映射插件目录，否则通过插件商店安装的插件会在容器重建后丢失。

## 四、配置 CLIProxyAPI v8

编辑配置：

```bash
nano ~/Workspace/infra/services/cpa-deploy/config.yaml
```

写入：

```yaml
config-version: 8

server:
  host: "0.0.0.0"
  port: 8317

management:
  # Docker 转发进来的请求不会被容器视作 localhost。
  # 真正的访问边界由 compose.yaml 的 127.0.0.1 端口绑定控制。
  allow-remote: true
  secret-key: ""
  disable-control-panel: false
  panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"

access:
  # API 调用密钥暂不创建，后续再从管理后台添加。
  api-keys: []

requests:
  proxy-url: "http://host.docker.internal:7890"

oauth:
  auth-dir: "/cpa-deploy/auths"

routing:
  strategy: "round-robin"
  retry:
    request-retry: 3
    max-retry-credentials: 0
    max-retry-interval: 30

observability:
  logs:
    debug: false
    logging-to-file: false
    logs-max-total-size-mb: 200
    request-log: false
  usage:
    usage-statistics-enabled: false

plugins:
  enabled: true
  dir: "/cpa-deploy/plugins"
```

### v8 配置与旧版配置的区别

CLIProxyAPI v8 调整了配置层级。不要直接把旧教程的字段原样复制过来：

| 旧写法 | v8 写法 |
| --- | --- |
| `host`、`port` | `server.host`、`server.port` |
| `remote-management` | `management` |
| 根级客户端 `api-keys` 列表 | `access.api-keys` |
| `proxy-url` | `requests.proxy-url` |
| `auth-dir` | `oauth.auth-dir` |

根级 `api-keys` 在 v8 中已经用于配置上游提供商，客户端访问密钥必须放在 `access.api-keys`。

## 五、配置 Docker Compose

编辑：

```bash
nano ~/Workspace/infra/services/cpa-deploy/compose.yaml
```

写入：

```yaml
name: cpa-deploy

services:
  CPA:
    image: eceasy/cli-proxy-api:latest
    container_name: CPA
    pull_policy: always
    restart: unless-stopped
    working_dir: /cpa-deploy
    command: ["/CLIProxyAPI/CLIProxyAPI", "-config", "/cpa-deploy/config.yaml"]

    ports:
      # 只监听本机，避免管理接口暴露到局域网。
      - "127.0.0.1:8317:8317"

    environment:
      TZ: Asia/Shanghai
      HTTP_PROXY: "http://host.docker.internal:7890"
      HTTPS_PROXY: "http://host.docker.internal:7890"
      NO_PROXY: "localhost,127.0.0.1,cli-proxy-api,CPA"

    networks:
      default:
        aliases:
          - cli-proxy-api

    volumes:
      - ./config.yaml:/cpa-deploy/config.yaml
      - ./data/auths:/cpa-deploy/auths
      - ./data/logs:/cpa-deploy/logs
      - ./data/plugins:/cpa-deploy/plugins
      - ./data/static:/cpa-deploy/static
```

容器工作目录是 `/cpa-deploy`，启动命令通过 `-config /cpa-deploy/config.yaml` 指定配置文件。宿主机的 `data/auths`、`data/logs`、`data/plugins` 和 `data/static` 分别映射到容器内对应目录；程序本身仍位于 `/CLIProxyAPI/CLIProxyAPI`。

这里同时配置了两层代理：

- `HTTP_PROXY` / `HTTPS_PROXY`：供容器内的普通 HTTP 客户端使用，例如下载管理面板；
- `requests.proxy-url`：供 CLIProxyAPI 的上游模型请求使用。

`management.allow-remote: true` 看起来像是“允许公网访问”，但这里不是。Docker 转发后的宿主机请求在容器中不一定被识别为 localhost，因此管理接口需要打开该选项；真正限制访问范围的是：

```yaml
ports:
  - "127.0.0.1:8317:8317"
```

此配置将发布端口限制在 Mac 本机；若额外配置了反向代理或隧道，还需要检查它们提供的访问入口。

## 六、拉取镜像并启动

```bash
cd ~/Workspace/infra/services/cpa-deploy
docker compose config
docker compose pull CPA
docker compose up -d CPA
```

检查状态和日志：

```bash
docker compose ps
docker compose logs --tail=100 CPA
```

::: note docker compose pull 与容器代理是两回事

拉取镜像发生在容器启动之前，因此 `compose.yaml` 中的代理环境变量还没有生效。如果拉取 Docker Hub 镜像失败，应先检查 OrbStack 的出网代理是否能通过 ClashX 访问 Docker Hub；容器内的代理环境变量不控制镜像拉取。

:::

## 七、手动设置管理后台密码

首次部署示例将管理密码留空：

```yaml
management:
  secret-key: ""
```

空密码会禁用管理 API，因此暂时不能登录管理后台。

打开配置文件：

```bash
nano ~/Workspace/infra/services/cpa-deploy/config.yaml
```

把密码填入双引号中：

```yaml
management:
  secret-key: "替换为你自己生成的管理密码"
```

建议密码至少 16 位，并包含大小写字母和数字。为了减少 YAML 转义问题，密码中尽量不要直接使用双引号 `"` 和反斜杠 `\`。

保存后重启：

```bash
cd ~/Workspace/infra/services/cpa-deploy
docker compose restart CPA
docker compose logs --tail=100 CPA
```

打开：

```text
http://127.0.0.1:8317/management.html
```

使用刚才填写的原始密码登录。

::: important 配置里的密码可能变成哈希

CLIProxyAPI 加载明文 `secret-key` 后可能把它自动改写为哈希。以后登录仍使用最初设置的原始密码，不要拿配置文件里的哈希值登录。

:::

## 八、后续创建 API 调用密钥

首次部署示例中的客户端密钥列表为：

```yaml
access:
  api-keys: []
```

这意味着客户端 API 暂时没有密钥保护。由于端口只绑定在本机 `127.0.0.1`，当前风险范围有限；在开放给局域网、反向代理或公网之前，必须先创建 API Key。

设置完管理密码并登录后台后，可以在客户端密钥页面创建。也可以直接修改本地配置：

```yaml
access:
  api-keys:
    - "这里填写后续创建的 API Key"
```

配置文件和 `data/auths` 目录支持热加载，通常保存后会自动生效。保险起见也可以重启：

```bash
docker compose restart CPA
```

创建 API Key 后，在 Bash 中验证：

```bash
read -rsp 'API Key: ' API_KEY; echo
curl -i \
  -H "Authorization: Bearer ${API_KEY}" \
  http://127.0.0.1:8317/v1/models
unset API_KEY
```

把 API Key 通过 `read -s` 输入，可以避免它直接出现在 Shell 历史中。

## 九、登录上游账号

### Codex

```bash
cd ~/Workspace/infra/services/cpa-deploy
docker compose exec CPA \
  /CLIProxyAPI/CLIProxyAPI -config /cpa-deploy/config.yaml -no-browser --codex-login
```

### Claude

```bash
docker compose exec CPA \
  /CLIProxyAPI/CLIProxyAPI -config /cpa-deploy/config.yaml -no-browser --claude-login
```

### Antigravity

```bash
docker compose exec CPA \
  /CLIProxyAPI/CLIProxyAPI -config /cpa-deploy/config.yaml -no-browser --antigravity-login
```

命令会输出授权地址。在浏览器中完成授权后，凭据会写入映射到 Mac 的：

```text
~/Workspace/infra/services/cpa-deploy/data/auths/
```

所以更新镜像、重建或删除容器不会删除 OAuth 凭据。

## 十、常用运维命令

```bash
cd ~/Workspace/infra/services/cpa-deploy

# 查看容器状态
docker compose ps

# 实时查看日志
docker compose logs -f --tail=200 CPA

# 重启
docker compose restart CPA

# 更新镜像并重建容器
docker compose pull CPA
docker compose up -d CPA

# 停止并删除容器，保留本地配置和数据
docker compose down

# 再次启动
docker compose up -d CPA
```

检查实际端口绑定：

```bash
docker port CPA
lsof -nP -iTCP:8317 -sTCP:LISTEN
```

预期只能看到 `127.0.0.1:8317`，不应出现 `0.0.0.0:8317`。

## 十一、参考资料

- [CLIProxyAPI Docker 快速开始](https://help.router-for.me/cn/introduction/quick-start.html#docker)
- [CLIProxyAPI Docker Compose](https://help.router-for.me/cn/docker/docker-compose.html)
- [CLIProxyAPI v8 配置示例](https://raw.githubusercontent.com/router-for-me/CLIProxyAPI/main/config.example.yaml)
- [CLIProxyAPI Web UI](https://help.router-for.me/cn/management/webui.html)
- [Docker Desktop：容器访问宿主机](https://docs.docker.com/desktop/features/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host)
- [CLIProxyAPI 热更新](https://help.router-for.me/cn/configuration/hot-reloading.html)
- [CLIProxyAPI 官方仓库](https://github.com/router-for-me/CLIProxyAPI)
