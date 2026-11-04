---
title: Obsidian 笔记 LiveSync 配置
date: 2026-11-02
updated: 2026-11-02
category: 工具指南
tags:
  - server
  - docker
  - 1panel
  - couchdb
  - obsidian
  - livesync
  - cloudflare
  - tunnel
shortTitle: Obsidian 笔记同步
description: 在 ARM Ubuntu 上通过 Docker 部署 CouchDB，经 Cloudflare Tunnel 为 Obsidian Self-hosted LiveSync 提供同步服务
icon: database
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# Obsidian 笔记 LiveSync 配置

CouchDB 保存同步数据，Obsidian 的 **Self-hosted LiveSync** 插件负责文件分块、加密和同步。访问链路：

```text
Mac / iPhone Obsidian → HTTPS → couchdb.geekyspace.cn
                     → Cloudflare Tunnel → http://127.0.0.1:5984 → CouchDB
```

## 一、Docker 部署 CouchDB

### 1. 部署信息

| 配置项        | 本次使用值                                |
|------------|--------------------------------------|
| SSH        | `ssh arm-ubuntu`                     |
| 服务器架构      | ARM64 / `aarch64`                    |
| 部署目录       | `/opt/1panel/docker/compose/couchdb` |
| 容器名        | `couchdb`                            |
| CouchDB 版本 | `3.5.3`，固定镜像 digest                  |
| 宿主端口       | `127.0.0.1:5984`                     |
| 公网地址       | `https://couchdb.geekyspace.cn`      |
| 数据库        | `obsidian`、`obsidian_personal`       |
| 管理员与插件用户名  | `joeljhou`                           |
| 登录密码       | 私密凭据中保存的 16 位随机密码                    |
| 插件版本       | Self-hosted LiveSync `1.0.44`        |

服务器已有 Docker，`cloudflared` 运行在宿主机。部署文件按 1Panel 的 Compose 目录习惯存放。

### 2. 准备目录与密码文件

```bash
# 1. 登录服务器
ssh arm-ubuntu

# 2. 创建部署目录（仅 root 可进入），以及数据和配置子目录
sudo install -d -o root -g root -m 700 /opt/1panel/docker/compose/couchdb
sudo mkdir -p /opt/1panel/docker/compose/couchdb/{data,config}

# 3. 将目录归属设为 CouchDB 用户（UID/GID：5984），供容器读写
sudo chown -R 5984:5984 /opt/1panel/docker/compose/couchdb/{data,config}

# 4. 进入 root shell，再进入部署目录
sudo -i
cd /opt/1panel/docker/compose/couchdb

# 5. 创建密码文件，仅允许文件所有者读写
sudo touch .env
sudo chmod 600 .env
sudo vim .env
```

在 `.env` 中写入以下内容，保存退出；密码建议使用至少 16 位的随机大小写字母和数字：
```shell
COUCHDB_USER=joeljhou
COUCHDB_PASSWORD=替换为你的随机密码
```

### 3. Docker Compose

`docker-compose.yml`：
```yaml
name: couchdb
services:
  couchdb:
    image: couchdb:3@sha256:bed314d10cdf58c0fff63352db4c3f168df58a185a773c0e2295105375c5ef10
    container_name: couchdb
    user: "5984:5984"
    restart: unless-stopped
    environment:
      COUCHDB_USER: ${COUCHDB_USER}
      COUCHDB_PASSWORD: ${COUCHDB_PASSWORD}
    ports:
      - "127.0.0.1:5984:5984"
    volumes:
      - ./data:/opt/couchdb/data
      - ./config:/opt/couchdb/etc/local.d
    healthcheck:
      test: ["CMD-SHELL", 'curl -fsS -u "$$COUCHDB_USER:$$COUCHDB_PASSWORD" http://127.0.0.1:5984/_up >/dev/null']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```
参考：[配置一个 CouchDB 服务器](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/setup_own_server.md#b-using-docker-compose)

### 4. CouchDB 与 CORS 配置

`config/10-livesync.ini`：
```ini
[couchdb]
single_node = true
max_document_size = 50000000

[chttpd]
bind_address = 0.0.0.0
require_valid_user = true
enable_cors = true
max_http_request_size = 4294967296

[chttpd_auth]
require_valid_user = true

[httpd]
enable_cors = true
WWW-Authenticate = Basic realm="couchdb"

[cors]
credentials = true
origins = app://obsidian.md,capacitor://localhost,http://localhost
methods = GET,PUT,POST,HEAD,DELETE
headers = accept,authorization,content-type,origin,referer
```
参考：[LiveSync 作者提供的 `conf/local.ini` 示例](https://github.com/vrtmrz/self-hosted-livesync-server/blob/main/conf/local.ini)

### 5. 启动与服务器检查

```bash
cd /opt/1panel/docker/compose/couchdb
# 1. 校验配置
sudo docker compose --env-file .env config -q
# 2. 后台启动容器
sudo docker compose up -d
# 3. 查看运行状态
sudo docker compose ps
# 4. 查看 CouchDB 最近 50 行日志
sudo docker compose logs --tail 50 couchdb
```

容器应显示 `healthy`，端口映射应为 `127.0.0.1:5984->5984/tcp`。

下面的 `curl --user joeljhou` 会交互提示输入密码，避免把密码写在命令或历史记录中：
```bash
# curl --fail --user joeljhou http://127.0.0.1:5984/_up
Enter host password for user 'joeljhou': <替换为你的随机密码>
{"seeds":{},"status":"ok"}

# curl --fail --user joeljhou http://127.0.0.1:5984/_all_dbs
Enter host password for user 'joeljhou': <替换为你的随机密码>
["_global_changes","_replicator","_users"]
```

## 二、配置 Cloudflare Tunnel

### 1. 添加域名路由

进入已登录的 Cloudflare，打开已有的 **`arm-ubuntu` Tunnel → 路由 → 已发布的应用程序 → 添加**：

| 配置项    | 填写值                     |
| ------ | ----------------------- |
| 子域名    | `couchdb`               |
| 域      | `geekyspace.cn`         |
| 路径     | 留空                      |
| 服务类型   | `HTTP`                  |
| 服务 URL | `http://127.0.0.1:5984` |

保存后，检查该 Tunnel 的连接状态，以及 `couchdb.geekyspace.cn` 对应的代理 DNS 记录。

![Cloudflare Tunnel 已发布 CouchDB 域名路由](http://img.geekyspace.cn/pictures/2026/202611021900881.png)

### 2. 验证域名访问

**1. 访问健康检查接口**

浏览器打开：[https://couchdb.geekyspace.cn/_up](https://couchdb.geekyspace.cn/_up)

在弹出的认证窗口中，输入 CouchDB 用户名 `joeljhou` 和部署时设置的登录密码。

![访问健康检查接口](http://img.geekyspace.cn/pictures/2026/202611030000568.png)

认证通过后，应返回 `{"seeds":{},"status":"ok"}`，说明域名访问链路与 CouchDB 服务正常。

**2. 打开 Web 管理界面**

继续访问：[https://couchdb.geekyspace.cn/_utils/](https://couchdb.geekyspace.cn/_utils/)

该地址为 CouchDB 的 **Fauxton 管理界面**，可用于查看和管理数据库。若提示登录，使用同一组 CouchDB 用户名和密码。

![CouchDB Fauxton 管理界面](http://img.geekyspace.cn/pictures/2026/202611021904731.png)

## 三、创建数据库

可通过 **API** 或 **Fauxton 网页管理界面**创建数据库，**两种方式任选其一**，不需要重复创建。

以下以 `obsidian_personal` 为例，实际使用时替换为对应 Vault 的数据库名；后续权限配置与 LiveSync 中填写的名称也要保持一致。
### 1. 通过 API 创建

通过 `ssh arm-ubuntu` 登录服务器，执行以下命令，并按提示输入 `joeljhou` 的 CouchDB 登录密码：

```bash
curl --user joeljhou --include --request PUT \
  http://127.0.0.1:5984/obsidian_personal
```

首次创建应返回 **201 Created** 与 `{"ok":true}`。若返回 **412 file_exists**，说明数据库已存在。

### 2. 通过网页创建

浏览器打开：[https://couchdb.geekyspace.cn/_utils/](https://couchdb.geekyspace.cn/_utils/)，使用 CouchDB 管理员账号登录。

1. 进入 **Databases（数据库）** 页面，点击 **Create Database（创建数据库）**。
2. 数据库名称填写 `obsidian_personal`，点击 **Create（创建）**。
3. 创建完成后，在数据库列表中确认该数据库已出现。

![通过 Fauxton 网页管理界面创建数据库](http://img.geekyspace.cn/pictures/2026/202611021913883.png)

### 3. 设置访问权限🔒（可选）

本文使用服务器管理员 `joeljhou`，无需额外配置数据库权限，跳过不影响同步。只有改用普通同步账号，或需要限制不同用户访问指定数据库时，才需配置相应权限。

![指定数据库访问权限](http://img.geekyspace.cn/pictures/2026/202611021923770.png)


## 四、Mac Obsidian 安装 LiveSync

### 1. 安装社区插件

在 **设置 → 第三方插件** 中开启社区插件，搜索并安装 **vrtmrz** 的 `Self-hosted LiveSync`，**启用**后即可使用。

![Self-hosted LiveSync 插件安装](http://img.geekyspace.cn/pictures/2026/202611021940827.png)



Obsidian 本体与 LiveSync 插件有各自的语言设置。 在 LiveSync 插件外观中**下拉选择“简体中文”。**

![步骤24：显示语言已切换为简体中文](http://img.geekyspace.cn/pictures/2026/202611030001318.png)

### 2. 运行引导向导

- **步骤 01：打开插件设置，运行引导向导。**
	- 若向导已自动弹出，直接进入下一步。

	![步骤01：个人库 LiveSync 设置与引导向导入口](http://img.geekyspace.cn/pictures/2026/202611022146992.png)

- **步骤 02：选择“我是第一次进行设置”。**
	- 后续设备应加入现有同步配置，见第 5 节。

	![步骤02：将 Mac 个人库设为首台同步设备](http://img.geekyspace.cn/pictures/2026/202611022144290.png)

- **步骤 03：选择“手动输入服务器信息”。**

	![步骤03：选择手动输入服务器信息](http://img.geekyspace.cn/pictures/2026/202611022154731.png)

### 3. 配置端到端加密（可选）

- **步骤 04：启用端到端加密，设置 E2EE 口令并妥善保管。**

	![步骤04：启用 E2EE；口令输入区域已遮挡](http://img.geekyspace.cn/pictures/2026/202611022155184.png)

- **步骤 05：勾选“混淆属性”(可选)，选择生成随机 ID 密钥。**
	- 仅新库生成；后续设备通过 `Setup URI` 沿用同一密钥。

	![步骤05：属性加密与随机 ID 密钥选项](http://img.geekyspace.cn/pictures/2026/202611022219133.png)

- **步骤 06：保留“加密内部文件属性”勾选。**
	- 仅适用于CouchDB，需要端到端加密、V2算法和属性加密（混淆属性）

	![步骤06：确认加密内部文件属性](http://img.geekyspace.cn/pictures/2026/202611022157925.png)

- **步骤 07：展开“高级”，保持 V2 算法，点击“继续”。**

	![步骤07：高级设置中的 V2 加密算法](http://img.geekyspace.cn/pictures/2026/202611022158286.png)

### 4. 连接 CouchDB 并检查

- **步骤 08：服务器类型选择 CouchDB。**

	![步骤08：选择 CouchDB 作为远端服务器](http://img.geekyspace.cn/pictures/2026/202611022159067.png)

- **步骤 09：填写个人库连接参数。**

	![步骤09：CouchDB 地址、用户名与个人数据库名称](http://img.geekyspace.cn/pictures/2026/202611022159942.png)

- **步骤 10：检查服务器要求，通过后连接数据库并继续。**

	![步骤10：所有服务器检查通过，继续连接数据库](http://img.geekyspace.cn/pictures/2026/202611022200990.png)
### 5. 初始化服务器数据

- **步骤 11：核对目标数据库，开始初始化。**

	![步骤11：准备初始化新的个人数据库](http://img.geekyspace.cn/pictures/2026/202611022201414.png)

- **步骤 12：备份本地库，阅读初始化警告。**

	![步骤12：初始化警告与需要逐项阅读的确认项](http://img.geekyspace.cn/pictures/2026/202611022201864.png)

- **步骤 13：理解并勾选三条确认项。**

	![步骤13：三条初始化确认全部勾选](http://img.geekyspace.cn/pictures/2026/202611022202002.png)

- **步骤 14：确认已备份，执行初始化。**
	- 仅对本次新空库执行，不要直接覆盖已有数据的数据库。

	![步骤14：确认已备份个人库后执行初始化](http://img.geekyspace.cn/pictures/2026/202611022202113.png)

- **步骤 15：使用此设备的设置**
	- 未检测到远程设备同步设置。选择“`Use this device's settings`”初始化，或“**取消**”以加载现有设置。

	![步骤 15：使用此设备的设置](http://img.geekyspace.cn/pictures/2026/202611022251421.png)

- **步骤 16：等待初始化完成 `Initialize done!`**

	![步骤16：初始化完成提示与处理中状态](http://img.geekyspace.cn/pictures/2026/202611022203956.png)

- **步骤 17：所有可选功能均被禁用，点击“OK”。**

	![步骤17：确认隐藏文件与配置同步保持关闭](http://img.geekyspace.cn/pictures/2026/202611030001722.png)

- **步骤18：配置远端存储体积提醒**

### 6. 日常同步模式与文件上限

- **步骤 19：将同步模式切为 `LiveSync`。**
	- ⚠️ 不要用 **预设 → 应用** 代替，1.0.44 的 LiveSync 预设会关闭启动同步。

	![步骤19：同步模式切为 LiveSync；此图记录过程，当前最终开关仍待复核](http://img.geekyspace.cn/pictures/2026/202611022318338.png)

- **步骤 20：在“常规设置 → 扩展菜单”中启用高级功能。**

	![步骤20：扩展菜单中启用高级功能入口](http://img.geekyspace.cn/pictures/2026/202611022321195.png)

- **步骤 21：在“扩展功能 → Selector → Normal Files”中，将文件大小上限设为 100 MiB。**

	![步骤21：最大文件大小设为 100 MiB](http://img.geekyspace.cn/pictures/2026/202611022323961.png)


> [!TIP] 文件上限不等于分块大小
> 分块设置保持默认；超过 100 MiB 的文件会被跳过，大附件同步仍需实测。

### 7. 导出配置
22. **步骤22: 将当前设置复制为设置 URI**
	- `The passphrase to encrypt the setup URI` 后填写自定义密钥，例如：`123456`。
	- 默认选择 `Time-bound`, 访问 URI 有时间限制
![将当前设置复制为设置 URI](http://img.geekyspace.cn/pictures/2026/202611022329017.png)

**设置 URI / 二维码相当于整套连接配置的搬家箱。** 含凭据的二维码若未加密，不应截图存入这篇笔记。生成或关闭二维码本身不会开启、关闭或恢复实时同步开关。

## 五、iPhone 加入同一个个人库

> [!INFO] 本节状态
> 本节给出完整操作方法，**尚未确认 iPhone 已加入 `obsidian_personal`**。以下 iPhone 截图来自此前 `Obsidian-Mobile` 的安装演示，只用于展示按钮位置；仓库名要改为本次 Personal，不能当作本次已连接成功的证据。

### 1. 创建或打开个人 Vault

1. 在 iPhone 打开 Obsidian，创建或打开独立 Vault **`Obsidian-Personal`**。
2. 第一次加入优先使用空 Vault，避免把两套已有内容混到一起。
3. 确认没有其他同步工具同时同步这个 Vault，再进入社区插件设置。

旧安装演示：创建 Vault、允许社区插件、打开插件浏览页。

![iPhone 旧安装示例：创建仓库与打开社区插件；本次名称应改为 Obsidian-Personal](http://img.geekyspace.cn/pictures/2026/202611022327382.png)

### 2. 安装插件，导入 Mac Personal 配置

1. 进入 **设置 → 第三方插件 / 社区插件 → 浏览**。
2. 搜索 **Self-hosted LiveSync**，确认作者 **vrtmrz**；

	![iPhone 旧安装示例：搜索、安装、启用及插件设置入口](http://img.geekyspace.cn/pictures/2026/202611022327537.png)

3. 向导选择 **我要将设备加入现有同步配置**，连接方式选择 **使用 Setup URI**。
4. 粘贴 Mac **Obsidian-Personal** 最新导出的 URI，输入的是 **URI 加密口令**。
5. 核对 URL 为 `https://couchdb.geekyspace.cn`，数据库为 **`obsidian_personal`**；继承 Mac 的 E2EE V2、属性加密与 ID 密钥。
6. 连接检查通过后，选择 **重启并获取远程数据**，等待下载、解密和文件还原结束。手机不要执行“初始化服务器”或“覆盖服务器”。
7. 如需配置设备名，使用能区分设备的名称，例如 `iPhone-Personal`；再核对 LiveSync、启动同步和 100 MiB 文件上限。

	![iPhone 旧操作示例：设置 URI 入口与空白输入表单，未表示本次 Personal 已导入](http://img.geekyspace.cn/pictures/2026/202611022328321.png)

### 3. 验证笔记、修改和附件

完成两端配置后依次验证：

- [ ] Mac 个人库新建一篇测试笔记，iPhone 出现同名笔记且内容相同。
- [ ] iPhone 修改该笔记，Mac 自动收到修改。
- [ ] 选取附件验证两端文件大小和内容一致；较大附件单独验证。
- [ ] 关闭再重新打开两端 Vault，确认仍能连接并继续同步。
- [ ] 查看插件日志，确认没有连接失败、加密错误、缺少分块或设置不匹配。

iOS 会限制后台运行；首次下载和大附件同步时，保持 Obsidian 前台，等待队列完成。

### 4. 参考

- [LiveSync 官方服务器部署](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/setup_own_server.md)
- [LiveSync 首次设置与添加设备](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/quick_setup.md)
