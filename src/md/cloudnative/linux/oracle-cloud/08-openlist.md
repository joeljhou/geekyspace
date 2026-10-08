---
title: 云存储挂载 Openlist 网盘
date: 2026-08-01
category: 云计算
tags:
  - server
  - openlist
  - oracle
  - 对象存储
  - s3
  - docker
shortTitle: OpenList 挂载对象存储
description: 将甲骨文云免费 20G 对象存储经 S3 协议绑定到 VPS 上的 OpenList
icon: openlist
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 云存储挂载 Openlist 网盘

> [!INFO] Oracle 官方  
Oracle Cloud 每个租户提供总计 **20 GB 免费对象存储空间**，对象存储与归档存储共用该额度。
> 
> **相关文档：**
> 
> - [免费资源 — Always Free Resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm#objectstorage)
> - [快速开始 - OpenList 文档](https://doc.oplist.org/guide)

## 实现原理

甲骨文云对象存储（Object Storage）原生兼容 **Amazon S3 协议**，而 [OpenList](https://github.com/OpenListTeam/OpenList)（AList 的社区维护分支）内置 **S3 驱动**。因此不需要在操作系统层面挂载磁盘，只需让 OpenList 通过 S3 协议直连对象存储即可：

```
VPS(OpenList) ──S3 API──▶ 甲骨文对象存储 (20 GB)
        │
        └──▶ 网页 / WebDAV 访问
```

这种方式不需要将对象存储挂载到 Ubuntu 文件系统，配置简单，稳定性也更高。

## 一、部署 OpenList

可根据服务器环境选择以下方式安装：

1. [使用 Docker 🐋](https://doc.oplist.org/guide/installation/docker)
2. [使用 1Panel 📟](https://doc.oplist.org/guide/installation/1panel)
	- **版本号**：选择最新的稳定版本
	- **WebUI 端口**：默认为 `5244`，可按需修改
	- **S3 端口**：默认为 `5246`，可按需修改
	- **预装环境**：
	    - `缩略图`：预装 ffmpeg
	    - `离线下载`：预装 aria2
	    - `以上所有`：预装 ffmpeg & aria2
	- **时区**：建议设置为 `Asia/Shanghai`
	- **容器名称**：openlist
	- **重启规则**：未手动停止则重启 `unless-stopped`
	- **高级设置**：不要勾选**端口外部访问**，让端口只绑定到 `127.0.0.1`

**设置密码**
```bash
# 随机生成新密码
docker exec -it openlist ./openlist admin random

# 或手动设置新密码
docker exec -it openlist ./openlist admin set '<NEW_PASSWORD>'
```

> [!NOTE]
> 若实际容器名不是 `openlist`，先执行 `docker ps`，再将命令中的容器名替换为实际名称。

**配置访问域名**

OpenList 部署完成后，域名入口、服务 URL、端口安全和 502 排错统一按照 [Cloudflare Tunnel：发布应用程序配置](07-cloudflare-tunnel#三、发布应用程序) 配置，本篇不再重复。

进入 **1Panel → 应用商店 → 已安装 → OpenList → 参数**，将「Web 访问地址」设置为最终域名：

```text
https://drive.geekyspace.cn
```

## 二、准备甲骨文对象存储与 S3 凭证

### 1. 创建存储桶（Bucket）

OCI 控制台 → **存储 → 存储桶 → 创建存储桶**。

建议配置：
1. 名称：`openlist-disk`
2. 存储层：**标准（Standard）**
3. 可见性：**私有**
    

> [!NOTE]  
> 不要选择归档层。归档文件需要先恢复才能读取，不适合作为日常网盘使用。

### 2. 生成 S3 兼容密钥

右上角头像 → **用户设置 → 令牌和密钥 → 客户密钥 → 生成密钥**。

1. 名称填写 `openlist-s3`；
2. 创建后立即复制 **Secret Key**；
3. 在客户密钥列表中复制对应的 **Access Key**。
    

> [!WARNING]  
> Secret Key 只显示一次，关闭页面后无法再次查看。  
> 如果丢失，只能删除旧密钥并重新生成。

### 3. 拼接 S3 端点（Endpoint）

```shell
# 格式：https://<namespace>.compat.objectstorage.<region>.oraclecloud.com

# namespace：对象存储命名空间
# 查看路径：右上角头像 → 租户名称 → 对象存储命名空间
# CLI 查询：oci os ns get
namespace="axaxvdhqbttc"

# region：必须与存储桶所在区域一致
# 常用区域：ap-singapore-1（新加坡）、ap-tokyo-1（东京）、ap-seoul-1（首尔）
#          us-phoenix-1（凤凰城）、us-ashburn-1（阿什本）
region="us-phoenix-1"

# 拼接结果
https://axaxvdhqbttc.compat.objectstorage.us-phoenix-1.oraclecloud.com
```

> [!IMPORTANT]  
> Endpoint 中的 `region` 必须与存储桶所在区域一致。  
> 存储桶位于凤凰城时，使用 `us-phoenix-1`，不要按访问者所在位置选择其他区域。


完成后，需要准备以下 4 个参数：

1. **Bucket**：`openlist-disk`
2. **Endpoint**：`https://axaxvdhqbttc.compat.objectstorage.us-phoenix-1.oraclecloud.com`
3. **Access Key**：OCI 客户密钥列表中的 **访问密钥**（不是密钥名称 `openlist-s3`）
4. **Secret Access Key**：生成客户密钥时保存的 Secret Key（不写入文档）

## 三、在 OpenList 中挂载 S3 存储

登录管理后台 → 左侧 **存储 → 添加**，驱动选择 **`S3`**，按下表填写：

| **核心字段**    | **实际填写值**                                                                | **关键说明**                              |
| ----------- | ------------------------------------------------------------------------ | ------------------------------------- |
| **驱动**      | `对象存储`                                                                   | OpenList 的标准 S3 兼容驱动。                 |
| **挂载路径**    | `/arm-ubuntu`                                                            | OpenList 中的访问路径，唯一。                   |
| **根文件夹路径**  | `/`                                                                      | 挂载整个存储桶。                              |
| **存储桶**     | `openlist-disk`                                                          | OCI 中已创建的 Bucket 名称。                  |
| **端点**      | `https://axaxvdhqbttc.compat.objectstorage.us-phoenix-1.oraclecloud.com` | 由 Namespace 和 Region 拼接。              |
| **地区**      | `us-phoenix-1`                                                           | 必须与存储桶所在区域一致。                         |
| **访问密钥 ID** | 已配置（不记录明文）                                                               | 填 OCI 客户密钥的“访问密钥”，不是名称 `openlist-s3`。 |
| **访问密钥**    | 已配置（不记录明文）                                                               | 填生成客户密钥时保存的 Secret Key。               |
| **强制路径样式**  | **开启**                                                                   | OCI 命名空间级 Endpoint 的关键开关。             |

其余缓存、代理、排序、预签名和前端直传等选项保持默认值或留空即可。

> [!WARNING] 必须启用「强制路径风格」
> 配置的是 `<namespace>.compat...` 这种**命名空间级**端点，必须用路径风格访问：`https://<ns>.compat.../<bucket>/<object>`。
> 若关闭该项，OpenList 会改用虚拟主机风格 `https://<bucket>.<endpoint>`，与该端点不匹配，将返回 403/404。甲骨文虽同时支持虚拟主机风格，但那需要换成桶专属的 `vhcompat` 域名，不适合 OpenList 这种「一个桶一个通用端点」的模式。

保存后回到 **存储** 列表，该条记录的**状态**显示为 `工作正常`（绿色）即挂载成功。打开首页 `/arm-ubuntu` 路径，桶内文件就会以网盘形式列出，可直接上传、下载、预览、分享。

> [!TIP] 下载提速
> OpenList 支持**单文件多线程下载加速**：在存储编辑页可设置 `分片大小` 等参数，大文件场景下能显著提升吞吐。

## 四、（可选）挂载到 VPS 文件系统

若后续需要在 Shell 中像本地目录一样访问 OCI Object Storage，可以使用 rclone 或 s3fs 进行 FUSE 挂载。

### rclone（推荐）

- [rclone 官方安装文档](https://rclone.org/install/)
- [rclone S3 后端配置](https://rclone.org/s3/)
- [rclone mount 挂载文档](https://rclone.org/commands/rclone_mount/)
- [rclone 挂载 Oracle Object Storage 教程](https://rclone.org/oracleobjectstorage/tutorial_mount/)

### s3fs

- [s3fs-fuse GitHub 仓库](https://github.com/s3fs-fuse/s3fs-fuse)
    
### Oracle Cloud
- [Oracle Object Storage S3 兼容接口](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)
    

> [!NOTE]  
> 对象存储不是真正的本地文件系统。后续需要挂载时，应以官方文档为准，并先在测试目录验证，不建议用于数据库、Docker 数据目录或频繁随机读写的业务目录。
## 参考资料

- [Oracle：Always Free 资源（对象存储）](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
- [Oracle：S3 兼容性 API](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)
- [Oracle：理解命名空间](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/understandingnamespaces.htm)
- [Oracle：使用客户密钥](https://docs.oracle.com/en-us/iaas/Content/Identity/access/to_create_a_Customer_Secret_key.htm)
- [Oracle：区域标识符](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm)
- [OpenList 官方仓库](https://github.com/OpenListTeam/OpenList)
- [OpenList 文档](https://doc.oplist.org) ｜ [中文镜像](https://doc.oplist.org.cn)
- [OpenList：使用 1Panel 安装](https://doc.oplist.org/guide/installation/1panel)
- [OpenList：反向代理](https://doc.oplist.org/guide/installation/reverse-proxy)
- [rclone S3 后端](https://rclone.org/s3/) ｜ [rclone mount](https://rclone.org/commands/rclone_mount/)
- [s3fs-fuse（非 Amazon S3 配置）](https://github.com/s3fs-fuse/s3fs-fuse/wiki/Non-Amazon-S3)

---

上一步：[创建 Cloudflare Tunnel 隧道](07-cloudflare-tunnel) ｜ 下一步：[安装 PostgreSQL 18](09-postgresql)
