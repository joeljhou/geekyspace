---
order: 3
title: Codex 账号备份到 OCI 对象存储
shortTitle: Codex 账号备份（OCI）
description: 使用 OCI 私有桶、限定前缀的 PAR 和 MyUrls 短链，在 macOS 与 Windows 上一行命令备份 Codex 账号
icon: cloud
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-11-09
category: 云计算
tags:
  - server
  - oracle
  - 对象存储
  - codex
  - redis
  - docker
---

# Codex 账号备份到 OCI 对象存储

通过 MyUrls 短链下载脚本，使用 `codex-auth` 导入、导出本地账号，再通过仅写入 PAR 上传 JSON 到 OCI 私有桶。

> 下方命令直接使用现有脚本短链。脚本内含上传 PAR，持有脚本的人可向授权目录上传或覆盖对象，应按凭据保管。

私有桶和 PAR 控制访问权限；本流程导出并上传 JSON，没有演示上传前的客户端加密。

## 一、使用方法

**macOS 终端：**

```bash
curl -fsSL https://s.geekyspace.cn/codex-auth-macos | bash
```

**Windows PowerShell：**

```powershell
irm https://s.geekyspace.cn/codex-auth-windows | iex
```

- **本地目录**：macOS 为 `~/.codex-auth/`，Windows 为 `$HOME\.codex-auth\`，不受当前工作目录影响；上传后保留本地 JSON。
- **执行顺序**：`import --purge` → `export --cpa <本地目录>` → 逐个上传 JSON，成功显示 `HTTP 200`，失败即停止；同名远端对象会被覆盖。
- **运行依赖**：支持 x64、ARM64。有 Node.js 时使用 `npx -y @loongphy/codex-auth`；无 Node.js 时从 [官方 Releases](https://github.com/Loongphy/codex-auth/releases/latest) 下载原生程序到临时目录，用后清理。有 Node.js 但缺少 npx 时会报错。

## 二、存储与权限

在 OCI 存储桶控制台的「管理 → 预先验证的请求」中配置两条 PAR，桶保持私有：

| PAR 名称 | 对象前缀 | 权限与用途 |
| --- | --- | --- |
| `codex-auth-download` | `config/scripts/codex-auth/` | 仅读取，关闭对象列出；存放 `macos.sh`、`windows.ps1`、`README.md` |
| `codex-auth-upload` | `security/personal/ai/codex-auth/` | 仅写入；存放工具导出的账号 JSON，沿用原文件名 |

创建 PAR 时分别设置有效期。权限按对象前缀限制：下载 PAR 不能读取账号，上传 PAR 不能读取账号或修改脚本。

## 三、短链与 Redis

MyUrls 容器为 `myurls`，Redis 容器为 `redis8`，使用数据库 **0**。

| 短链后缀 / Redis key | 目标 |
| --- | --- |
| `codex-auth-macos` | 下载 PAR 下的 `macos.sh` |
| `codex-auth-windows` | 下载 PAR 下的 `windows.ps1` |

MyUrls 页面先生成随机短链，再检查目标和 key 冲突，用 `RENAMENX` 改为上述名称。在已认证的 Redis 命令行中取消过期：

```redis
SELECT 0
PERSIST codex-auth-macos
PERSIST codex-auth-windows
TTL codex-auth-macos
TTL codex-auth-windows
```

两条 `TTL` 应均为 `-1`。`PERSIST` 只取消 key 的过期时间，不会延长 PAR，也不能替代 Redis 持久化与备份。

## 四、维护要点

- **更新脚本**：覆盖桶内同路径文件，执行命令不变。
- **更换上传 PAR**：修改两份脚本的上传地址并覆盖测试，无需改短链。
- **更换下载 PAR**：更新两条 Redis key 的目标地址，并确认 `TTL = -1`。
- **延长 PAR 有效期**：不能直接修改现有到期时间；须新建 PAR、更新引用、验证后撤销旧 PAR。
- **数据保留**：PAR 到期或撤销不会删除对象；另行管理桶生命周期和 Redis 备份。

**待优化**：确认旧导出 JSON 是否会被重复上传；为网络操作增加超时与有限重试；固定工具版本并校验发布包。以上尚未修改线上脚本。

相关笔记：[云存储挂载 OpenList 网盘](/md/cloudnative/linux/arm-ubuntu/storage/01-openlist.html)、[安装 Redis 8.x](/md/cloudnative/linux/arm-ubuntu/storage/03-redis.html)。

## 参考资料

- [OCI：预先验证的请求（PAR）](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/usingpreauthenticatedrequests.htm)
- [codex-auth 官方 Releases](https://github.com/Loongphy/codex-auth/releases/latest)
