---
title: 安装 CLIProxyAPI 中转站
date: 2026-09-22
category: 云计算
tags:
  - server
  - cliproxyapi
  - ai
  - proxy
  - systemd
  - cloudflare
  - tunnel
shortTitle: CLIProxyAPI 中转站
description: 在 ARM Ubuntu 上通过官方脚本安装 CLIProxyAPI，以 systemd 用户服务运行，并经 Cloudflare Tunnel 发布访问域名
icon: route
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 安装 CLIProxyAPI 中转站

[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) 可以把 Codex、Claude Code、Gemini CLI、Qwen 等命令行工具的 OAuth 登录统一转换为 OpenAI、Claude、Gemini 等兼容 API，方便多个客户端复用服务器上的授权。

> [!WARNING] 合规与账号风险
> 只接入自己有权使用的账号，并遵守上游服务条款。OAuth 凭据、管理密码和 API Key 都属于敏感信息，不要写入公开笔记、截图或聊天记录。

本次实际部署结果：

| 项目    | 值                                           |
| ----- | ------------------------------------------- |
| 服务器架构 | `aarch64`                                   |
| 初装版本  | `7.3.12`                                    |
| 当前版本  | `8.0.2`                                     |
| 安装目录  | `/home/ubuntu/cliproxyapi`                  |
| 运行方式  | `ubuntu` 用户的 systemd user service           |
| 本地监听  | `127.0.0.1:8317`                            |
| 管理页面  | `https://cpa.geekyspace.cn/management.html` |
| 公网入口  | Cloudflare Tunnel                           |

## 一、使用官方脚本安装

### 1. 登录服务器

在 Mac 终端执行：

```bash
ssh arm-ubuntu
```

确认当前用户和架构：

```bash
whoami
uname -m
```

本机输出分别为 `ubuntu` 和 `aarch64`。

### 2. 执行一键安装脚本

```bash
curl -fsSL https://raw.githubusercontent.com/router-for-me/cliproxyapi-installer/refs/heads/master/cliproxyapi-installer | bash
```

> [!IMPORTANT] 命令中只能使用纯 URL
> 不要把网页上的 Markdown 链接语法 `[https://...](https://...)` 复制进终端。`[]()` 不是 Shell 语法，Bash 会在 `(` 处报 `syntax error near unexpected token`，此时 `curl` 根本没有执行。

脚本会自动完成：

1. 识别 `linux_aarch64`；
2. 下载对应架构的最新 Release；
3. 解压到 `~/cliproxyapi/<版本号>/`；
4. 把当前二进制复制为 `~/cliproxyapi/cli-proxy-api`；
5. 从示例生成 `~/cliproxyapi/config.yaml`；
6. 创建 `~/.config/systemd/user/cliproxyapi.service`；
7. 写入 `version.txt` 和 `asset-variant.txt`。

> [!IMPORTANT] 不要使用 `sudo` 运行安装脚本
> 安装目录取自当前用户的 `$HOME`。用 `sudo` 执行会装到 `/root/cliproxyapi`，并生成 root 用户的 systemd 服务，和本文的 `/home/ubuntu/cliproxyapi` 不是同一套实例。

安装脚本只创建服务文件，首次安装后不会自动启动服务。

## 二、启动前收紧基础配置

### 1. 备份配置

```bash
cd ~/cliproxyapi
cp -a config.yaml "config.yaml.before-local-bind-$(date +%Y%m%d%H%M%S)"
```

### 2. 只监听本机回环地址

编辑配置：

```bash
vim ~/cliproxyapi/config.yaml
```

把顶部的 `host` 改为：

```yaml
host: "127.0.0.1"
port: 8317
```

这样 `8317` 不直接暴露到公网，只允许本机的 `cloudflared` 转发请求。Oracle Cloud 安全列表和服务器防火墙都不需要放行 8317。

### 3. 删除公开占位 API Key

安装器会生成随机 API Key，但示例中还可能保留公开占位值：

```yaml
- "your-api-key-3"
```

必须删除这一行。已知占位值一旦保留，任何人都可以拿它调用公网 API。

本次安装保留了脚本生成的两个随机 Key，只删除公开占位值。后续可按「[部署后手动设置密码和 API Key](#四、部署后手动设置密码和-api-key)」替换为自己的 Key。

收紧配置文件权限：

```bash
chmod 600 ~/cliproxyapi/config.yaml
```

## 三、启动 systemd 用户服务

### 1. 启用 linger

CLIProxyAPI 使用的是 **systemd 用户服务**。为了让服务在 SSH 退出后继续运行，并在服务器重启后自动启动，需要为 `ubuntu` 用户启用 linger：

```bash
sudo loginctl enable-linger "$USER"
```

### 2. 启用并启动服务

```bash
systemctl --user daemon-reload
systemctl --user enable --now cliproxyapi.service
```

检查状态：

```bash
systemctl --user status cliproxyapi.service
systemctl --user is-enabled cliproxyapi.service
systemctl --user is-active cliproxyapi.service
loginctl show-user "$USER" -p Linger
ss -lntp | grep ':8317'
```

预期结果：

- 服务状态为 `active (running)`；
- 开机自启状态为 `enabled`；
- `Linger=yes`；
- 端口只监听 `127.0.0.1:8317`，不是 `0.0.0.0:8317`。

查看 systemd 启停日志：

```bash
journalctl --user -u cliproxyapi.service -n 100 --no-pager
journalctl --user -u cliproxyapi.service -f
```

### 3. 本机验证

不带 API Key 请求：

```bash
curl -i http://127.0.0.1:8317/v1/models
```

预期返回 HTTP 401，说明服务已运行且 API 鉴权生效。

带 API Key 验证时，不要把 Key 直接写进 shell 历史：

```bash
read -rsp 'API Key: ' API_KEY; echo
curl -i \
  -H "Authorization: Bearer ${API_KEY}" \
  http://127.0.0.1:8317/v1/models
unset API_KEY
```

预期返回 HTTP 200。尚未导入上游账号时，模型列表可能为空，这不代表服务异常。

### 4. 开启管理面板文件日志

管理中心的 **日志查看** 页面不读取 journald，而是读取 CLIProxyAPI 的本地日志文件。未开启时页面会提示“当前连接的是 CPA，日志查看需要先开启日志记录到文件”。

先备份配置：

```bash
cd ~/cliproxyapi
cp -a config.yaml "config.yaml.before-file-logging-$(date +%Y%m%d%H%M%S)"
```

编辑配置：

```bash
vim ~/cliproxyapi/config.yaml
```

本次使用以下配置：

```yaml
debug: false
logging-to-file: true
logs-max-total-size-mb: 200
error-logs-max-files: 10
```

- `logging-to-file: true`：把应用日志写入轮转文件，供管理中心读取；
- `logs-max-total-size-mb: 200`：日志总量最多 200MB，超出后删除最旧文件；`0` 表示不限制总量，不建议长期使用；
- `error-logs-max-files: 10`：最多保留 10 个错误日志文件；
- `debug: false`：日常运行保持关闭，需要深度排错时再临时开启。

保存后重启：

```bash
systemctl --user restart cliproxyapi.service
systemctl --user status cliproxyapi.service
```

日志实际写在认证数据目录，不是安装目录：

```bash
ls -lh ~/.cli-proxy-api/logs/main.log
tail -f ~/.cli-proxy-api/logs/main.log
```

本次重启后已确认：

- `cliproxyapi.service` 状态为 `active`；
- `~/.cli-proxy-api/logs/main.log` 已生成；
- `https://cpa.geekyspace.cn/management.html` 返回 HTTP 200；
- 刷新管理中心的 **日志查看** 页面后可以读取日志。

> [!NOTE] 文件日志与 journald 的分工
> 开启文件日志后，应用运行日志主要写入 `main.log`；`journalctl --user -u cliproxyapi.service` 仍适合检查 systemd 启停、崩溃和重启记录。管理中心里建议继续开启“屏蔽 `/v0/management` 日志”，避免后台自己的轮询请求淹没有效信息。

## 四、部署后手动设置密码和 API Key

本次先完成程序、systemd 和 Tunnel 部署，**管理密码和自定义 API Key 留到部署成功后手动设置**。

初始状态如下：

```yaml
remote-management:
  allow-remote: false
  secret-key: ""
```

此时 `/management.html` 静态页面可以打开，但管理 API 未启用，无法登录管理中心。

### 1. 先生成并保存密码

在服务器生成一个强随机管理密码：

```bash
openssl rand -base64 36
```

先把输出保存到自己的密码管理器，再编辑配置。CLIProxyAPI 首次加载明文 `secret-key` 后会将它改写为 bcrypt 哈希；以后登录仍使用原始明文密码，不是配置文件中的哈希。

生成自定义 API Key：

```bash
printf 'sk-%s\n' "$(openssl rand -hex 32)"
```

同样先保存到密码管理器。

### 2. 修改配置

```bash
vim ~/cliproxyapi/config.yaml
```

修改管理配置：

```yaml
remote-management:
  allow-remote: true
  secret-key: "这里填写管理密码"
```

再替换 `api-keys`：

```yaml
api-keys:
  - "这里填写以 sk- 开头的自定义 API Key"
```

> [!IMPORTANT] `allow-remote` 和管理密码要一起配置
> Cloudflare Tunnel 转发时，CLIProxyAPI 可能根据代理头识别到真实客户端 IP，因此通过公网域名管理时需要 `allow-remote: true`。安全边界是：`host` 必须继续保持 `127.0.0.1`，并且 `secret-key` 不能为空。

### 3. 重启并登录

```bash
chmod 600 ~/cliproxyapi/config.yaml
systemctl --user restart cliproxyapi.service
systemctl --user status cliproxyapi.service
```

然后打开：

```text
https://cpa.geekyspace.cn/management.html
```

使用刚才保存的**原始管理密码**登录。登录后可在管理中心继续导入 Codex、Claude、Gemini 等 OAuth 凭据，并管理 API Key。

> [!TIP] 登录连续失败时先停手检查密码
> 管理接口会记录失败次数；同一客户端连续失败过多会被临时封禁。不要在不确定密码时反复试错。

## 五、配置 Cloudflare Tunnel 域名

进入 Cloudflare One 控制台：

**网络 → 连接器 → Cloudflare Tunnels → arm-ubuntu → 已发布应用程序路由 → 添加已发布应用程序路由**。

填写：

| 配置项 | 值 |
| --- | --- |
| 子域名 | `cpa` |
| 域 | `geekyspace.cn` |
| 路径 | 留空 |
| 服务类型 | `HTTP` |
| URL | `127.0.0.1:8317` |

保存后对应关系为：

```text
https://cpa.geekyspace.cn
    -> Cloudflare Tunnel
    -> http://127.0.0.1:8317
```

本次已实际创建该路由并验证：

```bash
curl -I https://cpa.geekyspace.cn/management.html
curl -i https://cpa.geekyspace.cn/v1/models
```

预期管理页面返回 HTTP 200，未带 API Key 的模型接口返回 HTTP 401。

> [!NOTE] 不需要开放 8317 入站端口
> `cloudflared` 主动向 Cloudflare 建立出站连接，再从服务器本机访问 `127.0.0.1:8317`。因此不需要在 Oracle Cloud 安全列表、Ubuntu 防火墙或 1Panel 防火墙中开放 8317。

## 六、后续升级

**后续升级仍然使用同一个官方脚本。**

已经登录服务器时执行：

```bash
curl -fsSL https://raw.githubusercontent.com/router-for-me/cliproxyapi-installer/refs/heads/master/cliproxyapi-installer | bash
```

也可以不先进入 SSH 会话，直接在 Mac 上执行：

```bash
ssh -tt arm-ubuntu 'curl -fsSL https://raw.githubusercontent.com/router-for-me/cliproxyapi-installer/refs/heads/master/cliproxyapi-installer | bash'
```

> [!WARNING] 不要复制 Markdown 链接源码
> `curl -fsSL [https://...](https://...) | bash` 不是可执行的 Shell 命令。方括号和圆括号会导致 Bash 在 `(` 处直接报语法错误，升级脚本不会被下载或执行。

升级时必须继续以 `ubuntu` 用户执行，不要加 `sudo`。安装器检测到 `~/cliproxyapi/version.txt` 后会进入升级流程：

1. 读取当前版本并查询最新 Release；
2. 把配置备份到 `~/cliproxyapi/config_backup/config_<时间戳>.yaml`；
3. 记录服务升级前是否正在运行；
4. 停止 `cliproxyapi.service`；
5. 下载并替换对应架构的新二进制；
6. 保留原有 `config.yaml`；
7. 如果升级前服务正在运行，升级完成后自动重新启动。

2026-09-28 实测结果：

- 首次执行纯 URL 命令，成功从 `7.3.12` 升级到 `8.0.2`；
- 安装器识别为 `linux_aarch64`，下载 `CLIProxyAPI_8.0.2_linux_aarch64.tar.gz`；
- 原有 `config.yaml` 得到保留，服务自动重启；
- 再执行一次同样的命令，返回 `CLIProxyAPI is already up to date (version 8.0.2)`；
- 升级后服务为 `active` 和 `enabled`，仍只监听 `127.0.0.1:8317`；
- 管理页返回 HTTP 200，未携带 API Key 请求 `/v1/models` 返回 HTTP 401；
- 文件日志配置、200MB 上限及原有鉴权配置均保留。

升级后检查：

```bash
cat ~/cliproxyapi/version.txt
systemctl --user status cliproxyapi.service
journalctl --user -u cliproxyapi.service -n 100 --no-pager
curl -I https://cpa.geekyspace.cn/management.html
```

> [!TIP] 升级前仍建议额外备份
> 安装器会备份 `config.yaml`，但 OAuth 凭据位于 `~/.cli-proxy-api/`。重要升级前最好同时备份 `~/cliproxyapi/config.yaml` 和 `~/.cli-proxy-api/`。

## 七、常用运维命令

```bash
# 启动、停止、重启
systemctl --user start cliproxyapi.service
systemctl --user stop cliproxyapi.service
systemctl --user restart cliproxyapi.service

# 查看状态与 systemd 日志
systemctl --user status cliproxyapi.service
journalctl --user -u cliproxyapi.service -f

# 查看文件日志
tail -f ~/.cli-proxy-api/logs/main.log
du -sh ~/.cli-proxy-api/logs

# 查看安装版本
cat ~/cliproxyapi/version.txt

# 检查监听地址
ss -lntp | grep ':8317'
```

出现 Cloudflare 502 时按顺序检查：

1. `systemctl --user is-active cliproxyapi.service` 是否返回 `active`；
2. `ss -lntp | grep ':8317'` 是否显示 `127.0.0.1:8317`；
3. `curl -i http://127.0.0.1:8317/v1/models` 是否返回 401；
4. `systemctl is-active cloudflared` 是否返回 `active`；
5. Tunnel 路由是否仍指向 `http://127.0.0.1:8317`。

## 八、参考资料

- [CLIProxyAPI 快速开始](https://help.router-for.me/cn/introduction/quick-start.html)
- [CLIProxyAPI 配置选项](https://help.router-for.me/cn/configuration/options.html)
- [CLIProxyAPI 官方仓库](https://github.com/router-for-me/CLIProxyAPI)
- [CLIProxyAPI Installer](https://github.com/router-for-me/cliproxyapi-installer)

---

上一步：[安装 Sub2API 中转站](11-sub2api) ｜ 下一步：[安装 3X-UI 面板指南](13-3x-ui)
