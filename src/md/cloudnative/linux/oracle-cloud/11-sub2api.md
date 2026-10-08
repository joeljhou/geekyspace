---
title: 安装 Sub2API 中转站
date: 2026-08-02
category: 云计算
tags:
  - server
  - sub2api
  - docker
  - ai
  - cloudflare
  - tunnel
  - gateway
shortTitle: Sub2API 安装
description: 通过 1Panel 在 Ubuntu arm64 部署 Sub2API（AI API 网关），经 Cloudflare Tunnel 统一内网穿透对外
icon: robot
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 安装 Sub2API 中转站

[Sub2API](https://github.com/Wei-Shaw/sub2api) 是一个开源 **AI API 网关**，把 Claude、OpenAI、Gemini、Grok 等订阅统一接入，对外分发 API Key，由平台负责鉴权、计费、负载均衡和请求转发，支持多账号拼车分摊成本。

> [!WARNING] 合规与风险提示
> 此类中转可能违反 Anthropic 等上游服务的服务条款，账号封禁、服务中断、数据丢失等风险自负。仅作个人学习研究用途，遵守所在地法律法规，请勿用于商业转售。

> [!NOTE] 复用 1Panel 数据库服务
> 1Panel 版 Sub2API 连接已有的 PostgreSQL 18 和 Redis 8 服务，不会再启动一套内置数据库。安装前先在 1Panel 中准备好 `postgresql18` 和 `redis8`。

## 一、部署 Sub2API

### 1. 从应用商店安装 Sub2API

1Panel 控制台 → **应用商店**，搜索 `Sub2API`，点击 **安装**。

| 配置项        | 填写值                           | 说明                           |
| ---------- | ----------------------------- | ---------------------------- |
| 名称         | `sub2api`                     | 1Panel 应用名称                  |
| 版本         | 选择当前最新版                       | 本次安装时为 `0.1.168`             |
| 数据库服务      | `PostgreSQL` / `postgresql18` | 复用 1Panel 已安装的 PostgreSQL 18 |
| 数据库名       | `sub2api`                     | 自动在 PostgreSQL 中创建           |
| 数据库用户      | `joeljhou`                    | Sub2API 专用数据库用户              |
| 数据库用户密码    | 从密码管理器填写                      | 不要记录在笔记或截图中                  |
| Redis 服务   | `redis8`                      | 复用 1Panel 已安装的 Redis 8       |
| Redis 服务密码 | 从密码管理器填写                      | 必须与 Redis 实例密码一致             |
| Web 访问端口   | `38145`                       | 宿主机端口，容器内仍使用 8080            |
| 时区         | `Asia/Shanghai`               | 与服务器时区一致                     |
| 服务模式       | `release`                     | 正式运行模式                       |
| 运行模式       | `standard`                    | 完整功能模式                       |
| 管理员邮箱      | `2371425251@qq.com`           | 首次登录使用                       |
| 管理员密码      | 从密码管理器填写                      | 不要记录明文                       |
| JWT 密钥     | 留空                            | 由安装程序自动生成                    |
| TOTP 加密密钥  | 留空                            | 由安装程序自动生成                    |
| 更新代理地址     | 留空                            | 无特殊需求不填                      |

检查无误后单击 **确认**。1Panel 会拉取镜像、生成 Compose 配置、创建数据库用户并启动容器。

> [!IMPORTANT] 不要随意更换自动生成的密钥
> JWT 密钥变化会让所有登录会话失效；TOTP 加密密钥变化会导致已绑定的 2FA 无法使用。备份或迁移时应连同 1Panel 生成的应用配置一起保存。

### 2. 在 1Panel 中验证

进入 **应用商店 → 已安装 → Sub2API**：

1. 状态应为 **已启动**；
2. 打开日志，确认数据库迁移完成且没有持续报错；
3. 在 **容器** 页面确认 `sub2api` 状态为 `healthy`；
4. 需要命令行复核时，只执行下面的只读检查：

```bash
docker ps --filter name=sub2api
ss -lntp | grep 38145
curl -i http://127.0.0.1:38145/health
```

预期端口监听为 `127.0.0.1:38145`，健康检查返回 HTTP 200。

## 二、经 Cloudflare Tunnel 对外

Cloudflare 控制台 → **Tunnels → arm-ubuntu → 路由 → 添加路由 → 已发布的应用程序**：

| 应用      | 子域名       | 域               | 服务类型   | 服务 URL                   |
| ------- | --------- | --------------- | ------ | ------------------------ |
| Sub2API | `sub2api` | `geekyspace.cn` | `HTTP` | `http://127.0.0.1:38145` |

发布后访问 `https://sub2api.geekyspace.cn`，HTTPS 由 Cloudflare 终结，宿主机 38145 仍只绑定 `127.0.0.1`，无需对公网放行。

> [!TIP] 客户端 Base URL
> Claude Code / Codex / Gemini CLI 等客户端把 Base URL 指向 `https://ai.geekyspace.cn`（网关接口带 `/v1`），API Key 用后台生成的，**不是上游官方 Key**。

## 三、初始化与客户端接入

浏览器登录后台（首次用管理员账号），按顺序：

1. **创建分组**：分组是路由层，决定请求落到哪些上游账号；
2. **导入账号**：OAuth（Claude / Gemini / Grok 订阅）或 API Key 类型，按上游类型选择；
3. **创建 API Key**：绑定到分组，客户端用这个 Key 调用；
4. **客户端接入**：在 API Key 页点「Use Key」，会给出 Claude Code / Codex / Gemini CLI 的配置片段与 Base URL。

Claude Code 示例：

```bash
export ANTHROPIC_BASE_URL="https://ai.geekyspace.cn"
export ANTHROPIC_AUTH_TOKEN="sk-后台生成的Key"
```

## 四、AI 建议

### 1. 常用运维操作

- 启动、停止、重启：**应用商店 → 已安装 → Sub2API → 操作**；
- 查看日志：进入 Sub2API 应用详情后打开 **日志**；
- 升级：应用商店出现可升级提示后，先备份再单击 **升级**；
- 查看 Compose：应用详情中打开 **编辑 Compose 文件**。平时不要直接修改 1Panel 生成的文件，优先使用 **参数** 页面。

### 2. 备份与迁移

1Panel 版需要同时备份三部分：

1. Sub2API 应用数据与配置：`/opt/1panel/apps/sub2api/sub2api/`；
2. PostgreSQL 中的 `sub2api` 数据库；
3. Redis 数据（若接受缓存和临时状态丢失，可降低 Redis 备份频率）。

在 1Panel 的 **数据库 → PostgreSQL → 备份** 中创建数据库备份，并使用 1Panel 的文件备份或计划任务备份应用目录。只备份应用目录不等于完整备份，因为核心业务数据在 PostgreSQL 中。

### 3. Codex CLI 多账号粘性会话失效

经反向代理用 Codex CLI 时，多账号粘性路由依赖 `session_id` 这类**带下划线**的请求头。Nginx 默认丢弃下划线头，需在 `http` 块加 `underscores_in_headers on;`。Cloudflare Tunnel 一般会透传自定义头；若出现会话串号或粘性失效，先用「单账号分组」验证，排除是否头被丢弃。

### 4. ARM 架构与个人模式

- `weishaw/sub2api`、PostgreSQL 18 和 Redis 8 均提供 `linux/arm64`，ARM Ubuntu 可直接通过 1Panel 拉取并运行。
- 纯个人自用、不需要计费与 SaaS 功能时，可在 Sub2API 的 **参数** 页面把运行模式改为 `simple`；生产环境还需确认对应的 simple 模式安全选项。若 1Panel 模板没有暴露该参数，再通过 **编辑 Compose 文件** 调整环境变量。

## 五、参考资料

- [Sub2API 官方仓库](https://github.com/Wei-Shaw/sub2api)
- [Sub2API 中文文档](https://github.com/Wei-Shaw/sub2api/blob/main/README_CN.md)
- [Sub2API Releases](https://github.com/Wei-Shaw/sub2api/releases)
- [1Panel 官方文档](https://1panel.cn/docs/)

---

上一步：[安装 Redis 8.x](10-redis) ｜ 下一步：[安装 CLIProxyAPI 中转站](12-cliproxyapi)
