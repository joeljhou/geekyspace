---
title: Docker安装
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2024-11-15
category: Docker
tag:
  - docker
---

# Docker安装&配置

您可以在多个平台上下载并安装 Docker。请参阅以下部分并选择最适合您的安装路径。

> [适用于Mac的Docker桌面](https://docs.docker.com/desktop/setup/install/mac-install/)

> [适用于Windows的Docker桌面](https://docs.docker.com/desktop/setup/install/windows-install/)

> [适用于Linux的Docker桌面](https://docs.docker.com/desktop/setup/install/linux/)

**验证是否安装成功：**

```shell
$ docker version           # 查看版本
$ docker info              # 查看信息
```

**运行测试镜像**

```shell
$ docker run hello-world
$ docker run -it ubuntu bash  
```

可能会遇到如下网络错误，这个时候就需要配置[镜像源加速器](/md/docker/mirror-acceleration.html)

`docker: error pulling image configuration: download failed after attempts=6: EOF.`