---
title: Docker镜像加速器
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2024-11-16
category: Docker
tag:
  - docker
---

# Docker镜像加速器

国内从`Docker Hub`拉取镜像有时会遇到困难，此时可以配置镜像加速器。

## 阿里云镜像加速器

> [阿里云镜像加速器](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)，有针对`Ubuntu`，`CentOS`，`Mac`，`Windows`的操作文档

![阿里云镜像加速器](http://img.geekyspace.cn/pictures/2024/202411270006564.png)

## Linux

对于使用`Ubuntu`或`CentOS`的系统，请在`/etc/docker/daemon.json`文件中写入如下内容（如果文件不存
在请新建该文件）

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://onnxqmp4.mirror.aliyuncs.com"]
}
EOF

# 之后重新启动服务
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Windows

对于使用Windows的系统，在`docker desktop`右上角**齿轮**图标，打开配置窗口后选择`Docker Engine`。<br/>
编辑JSON串，填写加速器地址：

Windows: `%USERPROFILE%\.docker\daemon.json`

![Windows配置镜像加速](http://img.geekyspace.cn/pictures/2024/202411160051539.png)

**完整的`daemon.json`配置示例：**

```shell
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://onnxqmp4.mirror.aliyuncs.com",
    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn",
    "https://docker.chenby.cn",
    "https://docker.ckyl.me",
    "http://mirror.azure.cn",
    "https://hub.rat.dev"
  ]
}
```

## MacOS

![MacOS配置Docker镜像加速器](http://img.geekyspace.cn/pictures/2024/202412041859454.png)
