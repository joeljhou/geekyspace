---
title: 部署 JoyFlix 影视平台
date: 2026-08-13
category: 云计算
tags:
  - server
  - docker
  - joyflix
  - nextjs
  - redis
  - 1panel
shortTitle: JoyFlix
description: 在 ARM Ubuntu 上从源码构建 JoyFlix，并复用 1Panel redis8
icon: film
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
---
# 部署 JoyFlix 影视平台

[JoyFlix](https://github.com/jeffernn/joyflix) 是一个基于 Next.js 的影视搜索和播放平台。本次在 ARM Ubuntu 上从官方源码构建，并复用 1Panel 已有的 `redis8`。

## 一、从源码构建 ARM64 镜像

官方的 `latest` 标签不存在，README 提供的固定镜像又只有 amd64，无法在 ARM64 服务器运行：

```text
no matching manifest for linux/arm64/v8
```

因此锁定官方提交 `7ef1beeba1c6efe7e80a7dd33f28098446659e1b`，在服务器上原生构建：

```bash
cd /opt/1panel/docker/compose/joyflix

# 将 JoyFlix 官方源码克隆到 src 目录
sudo git clone https://github.com/jeffernn/joyflix.git src

# 拉取本次部署使用的固定提交，避免后续 main 分支变化影响构建
sudo git -C src fetch --depth=1 origin 7ef1beeba1c6efe7e80a7dd33f28098446659e1b
# 将源码切换到该提交；detach 状态表示不跟随任何分支继续变化
sudo git -C src checkout --detach 7ef1beeba1c6efe7e80a7dd33f28098446659e1b
```

## 二、Docker Compose

`/opt/1panel/docker/compose/joyflix/docker-compose.yml`：

```yaml
networks:
  1panel-network:
    external: true

# JoyFlix 官方仓库与镜像：
# https://github.com/jeffernn/joyflix
# 官方发布镜像仅有 amd64；本机从锁定的官方提交原生构建 ARM64 镜像。
services:
  joyflix:
    image: joyflix:7ef1beeba1c-arm64
    build:
      context: ./src
      dockerfile: Dockerfile
    container_name: joyflix
    restart: unless-stopped
    environment:
      # 管理员账号（redis 多用户模式必填，建议从密码管理器生成）
      USERNAME: ${JOYFLIX_USERNAME}
      PASSWORD: ${JOYFLIX_PASSWORD}
      # 站点配置（服务端运行时读取）
      NEXT_PUBLIC_SITE_NAME: JoyFlix
      NEXT_PUBLIC_STORAGE_TYPE: redis
      # 复用 1Panel 已有的 redis8，DB 1 隔离键空间
      REDIS_URL: "redis://:${PANEL_REDIS_ROOT_PASSWORD}@redis8:6379/1"
      # 默认通过 JoyFlix 服务器代理豆瓣海报，避免 HTTP 418
      NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE: server
    ports:
      - "127.0.0.1:3000:3000"
    # volumes:
    #   # 可选：自定义影片源/分类。首次部署可先注释掉，按第五节精简 config.json 后再挂载。
    #   - ./config.json:/app/config.json:ro
    networks:
      - 1panel-network
```

`.env`：

```shell
JOYFLIX_USERNAME=<管理员用户名>
JOYFLIX_PASSWORD=<管理员密码>
PANEL_REDIS_ROOT_PASSWORD=<redis8密码>
```

保护 `.env`：

```bash
# 仅允许文件所有者读写，防止其他用户读取管理员和 Redis 密码
sudo chmod 600 .env
```

构建并启动：

```bash
# 检查 Compose 配置是否存在语法或变量错误，不启动容器
sudo docker compose config --quiet

# 使用 src 目录中的 Dockerfile 构建 JoyFlix ARM64 镜像
sudo docker compose build joyflix

# 使用刚构建的镜像在后台启动容器，不再重复构建
sudo docker compose up -d --no-build
```

## 三、配置 Cloudflare Tunnel

使用服务器上已有的 `cloudflared`，将 JoyFlix 发布到以下域名：

```text
https://joyflix.geekyspace.cn/
```

在 Cloudflare Tunnel 中添加公共主机名：

| 公共主机名 | 服务地址 |
| --- | --- |
| `joyflix.geekyspace.cn` | `http://127.0.0.1:3000` |

配置完成后，通过浏览器访问：

```text
https://joyflix.geekyspace.cn/
```

## 四、修复 Bangumi 图片 Mixed Content

首页的每日放送图片来自 Bangumi API。部分图片地址仍以 `http://lain.bgm.tv/` 开头，在 HTTPS 页面中会触发 Mixed Content 警告。

修改文件：

```text
/opt/1panel/docker/compose/joyflix/src/src/lib/bangumi.client.ts
```

在 `GetBangumiCalendarData` 上方增加：

```ts
function upgradeImageUrl(url: string): string {
  return url.replace(/^http:/, 'https:');
}
```

将原来的函数改为：

```ts
export async function GetBangumiCalendarData(): Promise<BangumiCalendarData[]> {
  const response = await fetch('https://api.bgm.tv/calendar');
  const data = (await response.json()) as BangumiCalendarData[];

  // 将 Bangumi 图片地址统一升级为 HTTPS，避免 Mixed Content
  data.forEach((weekday) => {
    weekday.items.forEach((item) => {
      if (!item.images) return;

      item.images.large = upgradeImageUrl(item.images.large);
      item.images.common = upgradeImageUrl(item.images.common);
      item.images.medium = upgradeImageUrl(item.images.medium);
      item.images.small = upgradeImageUrl(item.images.small);
      item.images.grid = upgradeImageUrl(item.images.grid);
    });
  });

  return data;
}
```

重新构建并替换容器：

```bash
cd /opt/1panel/docker/compose/joyflix

# 使用修改后的源码重新构建 ARM64 镜像
sudo docker compose build joyflix

# 使用新镜像强制重建容器
sudo docker compose up -d --no-build --force-recreate
```

实际验证结果：

```text
Next.js 编译和类型检查：通过
前端构建产物：包含 replace(/^http:/,"https:")
Bangumi HTTPS 图片：HTTP 200
本地登录页面：HTTP 200
公网首页：https://joyflix.geekyspace.cn/，HTTP 200
容器重启次数：0
```

> [!NOTE]
> 这是官方源码上的本地修改，后续切换 JoyFlix 版本时需要检查并重新应用。

## 五、影片源

官方 `config.json` 内置 27 个第三方源，但**不建议全部启用**。JoyFlix 会并发查询所有启用源；单个源的首个请求超时为 8 秒，非流式搜索还会等待所有源结束。源越多不等于越快，失效源只会增加连接数、日志噪音和最坏等待时间。

### 1. 从美国服务器实测影片源

应从运行 JoyFlix 的容器内测速，而不是在本地电脑上测。两处出口不同，得到的延迟和可用性也不同。

2026-08-14 从本机美国 Oracle Cloud 容器内，以 `流浪地球`、`庆余年`、`海贼王` 各请求一次搜索接口，结果如下：

| 源 | 中位响应时间 | 成功/命中 | 结论 |
| --- | ---: | ---: | --- |
| 最大资源 | 32 ms | 3/3 | 主源 |
| U酷资源 | 49 ms | 3/3 | 备用源 |
| 量子资源站 | 70 ms | 3/3 | 主源 |
| 暴风资源 | 100 ms | 3/3 | 主源 |
| iKun资源 | 107 ms | 3/3 | 备用源 |
| 无尽资源 | 166 ms | 3/3 | 备用源 |
| 红牛资源 | 202 ms | 3/3 | 可选备用 |
| 极速资源 | 210 ms | 3/3 | 可选备用 |

内置源中另有 9 个在本次测试中返回 HTML、HTTP 403、业务错误码或连接失败，不应继续启用。这个结果只是当前美国机房到各 API 的快照，第三方源换域名、限流或下线后需要重新测试。

### 2. 精简 `config.json`

先从容器导出官方配置：

```bash
cd /opt/1panel/docker/compose/joyflix
sudo docker cp joyflix:/app/config.json ./config.json
sudo chown root:root config.json
sudo chmod 644 config.json
```

将 `config.json` 的 `api_site` 精简为 4～6 个通过实测的 HTTPS 源。当前美国服务器推荐：

```json
{
  "cache_time": 7200,
  "api_site": {
    "zuid": {
      "api": "https://api.zuidapi.com/api.php/provide/vod",
      "name": "最大资源"
    },
    "lzi": {
      "api": "https://cj.lziapi.com/api.php/provide/vod",
      "name": "量子资源站"
    },
    "bfzy": {
      "api": "https://bfzyapi.com/api.php/provide/vod",
      "name": "暴风资源"
    },
    "ikun": {
      "api": "https://ikunzyapi.com/api.php/provide/vod",
      "name": "iKun资源"
    },
    "wujin": {
      "api": "https://api.wujinapi.me/api.php/provide/vod",
      "name": "无尽资源"
    },
    "uk": {
      "api": "https://api.ukuapi88.com/api.php/provide/vod",
      "name": "U酷资源"
    }
  },
  "custom_category": []
}
```

这里故意没有选响应同样很快的电影天堂资源，因为其 API 使用明文 HTTP。搜索请求由服务端发出，虽然不会在浏览器触发 Mixed Content，但仍不如全 HTTPS 配置稳妥。

示例把 `custom_category` 设为空数组，只影响豆瓣自定义分类，不影响影片源。如果需要保留“经典、华语、美剧”等分类，沿用导出文件中原有的 `custom_category` 即可。

检查 JSON 语法：

```bash
python3 -m json.tool config.json >/dev/null
```

取消 `docker-compose.yml` 中相关行的注释，启用只读挂载：

```yaml
volumes:
  - ./config.json:/app/config.json:ro
```

重新创建容器即可，**不用重新构建镜像**：

```bash
sudo docker compose config --quiet
sudo docker compose up -d --no-build --force-recreate
sudo docker logs joyflix --tail 50
```

日志出现以下内容说明运行时配置已成功加载：

```text
load dynamic config success
```

首次从完整的 27 源配置切换时，还需要处理 Redis 中的旧记录：

1. 登录 JoyFlix 管理后台，打开**视频源配置**；
2. 确认上述 6 个源已启用；
3. 不在新 `config.json` 中的旧源会被标记为自定义源，将它们删除；
4. 点击“测试全部”，失败或明显偏慢的源继续删除或禁用。

> [!IMPORTANT]
> 当前锁定版本在 Redis 模式下，每次启动都会把 `config.json` 中列出的源写回管理配置，并将这些源设为启用；文件中删除的旧源也不会自动从 Redis 消失，而会变成可删除的自定义源。因此完整迁移是“精简并挂载文件 → 重建容器 → 后台删除遗留源”。只在后台禁用文件内置源，容器下次启动后会被重新启用。

### 3. 减少每个源的搜索页数

JoyFlix 默认会对每个源最多搜索 5 页。精确搜片名通常第一页就够，多抓几页只会放大请求数。在管理后台的**站点配置**中，将“搜索接口最大页数”设为 `1`；确实经常搜索模糊关键词时再设为 `2`。

环境变量也可以设置默认值：

```yaml
environment:
  NEXT_PUBLIC_SEARCH_MAX_PAGE: 1
```

但 Redis 中已经存在管理配置时，以后台保存的值为准；仅修改环境变量不一定覆盖旧值。

### 4. 查询快不代表播放快

JoyFlix 的搜索请求走以下路径：

```text
浏览器 → JoyFlix 美国服务器 → 各影片源 API
```

而 M3U8 和视频分片通常由浏览器直连媒体域名：

```text
浏览器 → 影片源的 M3U8/CDN
```

所以美国服务器主要决定**搜索 API**的速度，不会自动给视频流加速。播放速度取决于观看设备到媒体 CDN 的网络质量。保留多个稳定源后，可在播放页开启线路优选；如果某个源搜索很快但播放经常卡顿，就从候选中移除。不要用美国 VPS 反向代理所有视频分片：这通常会把 VPS 带宽变成瓶颈，还可能引入额外延迟和流量风险。

`cache_time` 只是搜索响应的浏览器/CDN缓存头，默认 `7200` 秒已经够用；它不会让第一次搜索变快，也不是 Redis 查询缓存。Cloudflare Tunnel 本身也不会保证动态 API 被边缘缓存，因此没有必要靠盲目调大它解决慢源问题。

第三方影片源的授权、稳定性和安全性无法保证，仅建议个人测试使用。

## 参考资料

- [JoyFlix 官方仓库](https://github.com/jeffernn/joyflix)
- [JoyFlix Dockerfile](https://github.com/jeffernn/joyflix/blob/main/Dockerfile)

---

上一步：[部署 Sub-Store 和 Sub-Web](14-sub-store) ｜ 下一步：[部署 DeepSeek Harness](16-deepseek-harness)
