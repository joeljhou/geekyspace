---
title: Docker安装
author: 会敲代码的程序猿
isOriginal: true
date: 2024-11-15
category: Docker
tag: Docker
---

# Docker安装&配置

## 多平台安装

安装软件这种基础的操作，直接 参考官方文档即可：

* [在Mac上安装Docker Desktop](https://docs.docker.com/desktop/setup/install/mac-install/)
* [在Windows上安装Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)
* [在Linux上安装Docker Desktop](https://docs.docker.com/desktop/setup/install/linux/)

验证是否安装成功：

```shell
$ docker version
$ docker info
$ docker hello-world
# 可能会遇到如下网络错误，需要配置国内镜像源
$ docker run -it ubuntu bash  
docker: error pulling image configuration: download failed after attempts=6: EOF.
```