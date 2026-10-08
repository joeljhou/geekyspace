---
title: 部署 DeepSeek Harness
date: 2026-08-20
updated: 2026-08-25
category: 云计算
tags:
  - server
  - docker
  - 1panel
  - deepseek
  - harness
  - cloudflare
  - tunnel
shortTitle: DeepSeek Harness
description: 在 ARM Ubuntu 上通过 1Panel 部署 DeepSeek Harness，并经 Cloudflare Tunnel 对外访问
icon: robot
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 部署 DeepSeek Harness

## 一、通过 1Panel 安装

1Panel → **应用商店 → AI → DeepSeek Harness → 安装**：

| 配置项        | 填写值                     |
| ---------- | ----------------------- |
| 名称         | `deepseek-harness`      |
| 版本         | `0.1.1-rc.2`            |
| HTTPS 端口   | `10443`                 |
| 访问地址       | `harness.geekyspace.cn` |
| Web 用户名、密码 | 自行设置，不记录在笔记中            |
| 端口外部访问     | 不勾选                     |
| 重启规则       | 未手动停止则重启                |
| 拉取镜像       | 勾选                      |

这里的“访问地址”填写浏览器最终使用的主机名，不带 `https://` 和端口。

![1Panel 安装成功](http://img.geekyspace.cn/pictures/2026/202608200358107.png)

安装完成后，容器应为 `healthy`，并且宿主机端口只绑定到回环地址：

```text
127.0.0.1:10443 -> 8443/tcp
```

![DeepSeek Harness 容器健康状态](http://img.geekyspace.cn/pictures/2026/202608200358383.png)

## 二、配置 Cloudflare Tunnel

在 `arm-ubuntu` Tunnel 中添加已发布的应用程序：

| 配置项    | 填写值                       |
| ------ | ------------------------- |
| 公共主机名  | `harness.geekyspace.cn`   |
| 服务 URL | `https://127.0.0.1:10443` |
| TLS    | 开启“禁用 TLS 证书验证”           |

DeepSeek Harness 的 `10443` 是 HTTPS 端口，不能填成 `http://127.0.0.1:10443`，否则公网访问会返回 HTTP 400。容器使用本地证书，因此 cloudflared 连接源站时需要关闭证书验证。

![Cloudflare Tunnel TLS 设置](http://img.geekyspace.cn/pictures/2026/202608200359540.jpg)

![Cloudflare Tunnel 路由](http://img.geekyspace.cn/pictures/2026/202608200359958.png)

> [!NOTE]
> Cloudflare Tunnel 由服务器主动建立出站连接，且容器端口只绑定 `127.0.0.1`，因此无需在 Oracle Cloud 安全列表中放行 `10443`。

## 三、访问验证

访问：

```text
https://harness.geekyspace.cn/
```

验证结果：

- 容器状态：`healthy`；
- 公网未登录响应：HTTP 401，说明 Basic Auth 正常生效；
- 使用安装时设置的 Web 用户名和密码可以正常登录；
- DeepSeek Harness 工作台可以正常打开。

![DeepSeek Harness 工作台](http://img.geekyspace.cn/pictures/2026/202608200359885.png)

## 四、修复远程域名无法加载模型设置

### 4.1 问题与原因

通过 `https://harness.geekyspace.cn/` 打开 **设置 → 模型** 时可能出现：

```text
加载提供方目录失败: settings are unavailable in this browser
```

这不是容器健康检查或模型目录接口故障。DeepSeek Harness `0.1.1-rc.2` 的浏览器端会用当前页面的 hostname 判断是否为 loopback：只有 `localhost`、`[::1]` 和 `127.0.0.0/8` 被视为本地浏览器。通过域名访问时，设置镜像会进入 `memory/unavailable` 模式，因此模型、凭据等持久化设置不会加载。

本部署已经具备以下外围保护：

- 容器 HTTPS 端口仅绑定宿主机 `127.0.0.1`；
- 公网流量只能经 Cloudflare Tunnel 进入；
- Harness 前置 Basic Auth；
- 只信任精确域名 `harness.geekyspace.cn`。

因此采用一个**实例专用的兼容补丁**：只让浏览器端额外把 `harness.geekyspace.cn` 视为 loopback，不放开其他域名。

> [!WARNING]
> 这不是 DeepSeek Harness 官方支持的远程设置方案，而是主动绕过其 loopback 安全限制。该限制同时保护 `settings.*`、`credentials.*` 等高权限接口。必须保留 Cloudflare 访问控制、Basic Auth 和宿主机回环端口绑定，不能把容器端口直接暴露到公网。

### 4.2 提取当前镜像的前端文件

每个 Harness 版本的构建产物可能不同，必须从**当前运行镜像**重新提取，不能直接复用旧版本文件：

```bash
APP_DIR=/opt/1panel/apps/deepseek-harness/deepseek-harness
CLIENT_PATH=/usr/local/lib/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-client-connection/lib/client.js

mkdir -p /tmp/dsh-remote-settings-fix
docker cp "deepseek-harness:${CLIENT_PATH}" /tmp/dsh-remote-settings-fix/client.js
sudo mkdir -p "${APP_DIR}/patches"
```

确认原始判定代码：

```bash
grep -n -C 4 'function isLoopbackHostname' /tmp/dsh-remote-settings-fix/client.js
```

`0.1.1-rc.2` 的原始代码为：

```javascript
function isLoopbackHostname(hostname) {
  if (hostname === "localhost" || hostname === "[::1]") return true;
  const parts = hostname.split(".");
  return parts.length === 4 && parts[0] === "127" && parts.every(/* ... */);
}
```

只修改条件中的精确域名：

```diff
-if (hostname === "localhost" || hostname === "[::1]") return true;
+if (hostname === "harness.geekyspace.cn" || hostname === "localhost" || hostname === "[::1]") return true;
```

执行精确替换；如果上游源码结构变化，命令会停止并报错，不会模糊修改其他代码：

```bash
python3 - <<'PY'
from pathlib import Path

path = Path("/tmp/dsh-remote-settings-fix/client.js")
source = path.read_text()
old = 'if (hostname === "localhost" || hostname === "[::1]") return true;'
new = 'if (hostname === "harness.geekyspace.cn" || hostname === "localhost" || hostname === "[::1]") return true;'

if source.count(old) != 1:
    raise SystemExit("原始判定代码不是唯一匹配；停止修改，请重新检查当前版本")

path.write_text(source.replace(old, new, 1))
PY
```

把修改后的文件安装到补丁目录：

```bash
sudo install -m 0644 \
  /tmp/dsh-remote-settings-fix/client.js \
  "${APP_DIR}/patches/dsh-client-connection.client.js"
```

### 4.3 使用 Compose 只读挂载补丁

先备份 Compose：

```bash
sudo mkdir -p "${APP_DIR}/backups/manual-remote-settings"
sudo cp "${APP_DIR}/docker-compose.yml" \
  "${APP_DIR}/backups/manual-remote-settings/docker-compose.yml"
```

在 `docker-compose.yml` 的 `volumes` 中增加一行：

```yaml
volumes:
  - ./data/dsh:/data/dsh
  - ./data/workspace:/workspace
  - ./data/caddy:/data/caddy
  - ./patches/dsh-client-connection.client.js:/usr/local/lib/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-client-connection/lib/client.js:ro
  - /etc/localtime:/etc/localtime:ro
```

验证配置并重建容器：

```bash
cd "${APP_DIR}"
docker compose --env-file .env config -q
docker compose up -d --force-recreate
```

本次实际备份保存在：

```text
/opt/1panel/apps/deepseek-harness/deepseek-harness/backups/codex-20260825-remote-settings/docker-compose.yml
```

### 4.4 验证

```bash
docker inspect deepseek-harness \
  --format 'image={{.Config.Image}} health={{.State.Health.Status}}'

docker inspect deepseek-harness \
  --format '{{range .Mounts}}{{if eq .Destination "/usr/local/lib/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-client-connection/lib/client.js"}}{{println .Source "->" .Destination "rw=" .RW}}{{end}}{{end}}'

docker exec deepseek-harness rg -n -C 3 \
  'harness\.geekyspace\.cn' \
  /usr/local/lib/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-client-connection/lib/client.js
```

预期结果：

- 镜像为 `1panel/deepseek-harness:0.1.1-rc.2`；
- 健康状态为 `healthy`；
- 补丁文件以 `rw=false` 只读挂载；
- 浏览器重新加载后，**设置 → 模型** 能显示 DeepSeek 和“添加提供方”，不再出现 `settings are unavailable in this browser`。

> [!SUCCESS] 2026-08-25 实际验证
> 容器状态为 `healthy`，补丁以 `rw=false` 挂载；手动打开网页进入 **设置 → 模型**，提供方目录已正常显示，问题修复。

### 4.5 手动补丁命令

服务器已安装手动命令：

```text
/usr/local/sbin/dsh-enable-remote-settings
```

常用用法：

```bash
# 1Panel 更新完成、容器恢复 healthy 后，重新生成并应用补丁
sudo dsh-enable-remote-settings

# 只检查，不修改文件或重建容器
sudo dsh-enable-remote-settings --status

# 恢复最近保存的未打补丁 Compose，并重建容器
sudo dsh-enable-remote-settings --rollback

# 查看帮助
dsh-enable-remote-settings --help
```

无参数执行时，命令会：

1. 从当前容器使用的镜像提取同版本 `client.js`，不会沿用旧镜像的前端文件；
2. 只在原始 loopback 条件精确匹配时加入 `harness.geekyspace.cn`，源码结构变化时直接停止；
3. 恢复 Compose 的只读挂载，校验配置后按需重建容器；
4. 等待容器变为 `healthy`，再检查域名补丁和只读挂载；
5. 如果补丁、Compose 和运行中容器都正确，则不重建容器，可以安全重复执行。

命令只会手动运行，**没有安装定时器或 systemd 服务**。补丁操作带进程锁，避免同一时间重复执行。

回滚基线与以后手动执行命令时保存的备份位于：

```text
/opt/1panel/apps/deepseek-harness/deepseek-harness/backups/dsh-enable-remote-settings/
```

每次手动执行时，命令都会从当前 Compose 去掉补丁挂载，得到同版本的回滚基线；只有内容变化时才保存新备份并更新 `latest`。查看命令源码：

```bash
sudo less /usr/local/sbin/dsh-enable-remote-settings
```

### 4.6 1Panel 更新后的处理

1Panel 更新应用时可能重新生成 `docker-compose.yml`，新镜像的前端构建产物也可能变化。更新完成并确认容器启动后，执行一次：

```bash
sudo dsh-enable-remote-settings
```

命令会以**更新后的当前镜像**为源重新生成补丁。不要把旧版本 `client.js` 直接挂载到新镜像；客户端插件接口可能已经变化。

如果命令提示源码或 Compose 结构不再精确匹配，不要强行替换。先按 4.2～4.3 节检查新版本的实际结构，再更新命令逻辑。

### 4.7 回滚

优先使用手动命令恢复回滚基线：

```bash
sudo dsh-enable-remote-settings --rollback
```

也可以手动恢复最初的 Compose 并重建：

```bash
APP_DIR=/opt/1panel/apps/deepseek-harness/deepseek-harness

sudo cp \
  "${APP_DIR}/backups/codex-20260825-remote-settings/docker-compose.yml" \
  "${APP_DIR}/docker-compose.yml"

cd "${APP_DIR}"
docker compose up -d --force-recreate
```

回滚后补丁文件可以保留，它没有被 Compose 挂载时不会生效。

---

上一步：[部署 JoyFlix 影视平台](15-joyflix)
