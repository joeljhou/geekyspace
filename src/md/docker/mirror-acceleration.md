---
title: Docker镜像加速器
author: 会敲代码的程序猿
isOriginal: true
date: 2024-11-16
category: Docker
tag: Docker
---

# Docker镜像加速器

## 镜像加速器

> [阿里云镜像加速器](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)，有针对Ubuntu，CentOS，Mac，Windows的配置教程

**镜像源配置文件**

* Linux：`/etc/docker/daemon.json`
* Windows: `%USERPROFILE%\.docker\daemon.json`

**Windows配置：**

右上角选择Settings图标，打开配置窗口后选择Docker Engine。编辑JSON串，填写加速器地址：

```shell
{
  "registry-mirrors": ["https://onnxqmp4.mirror.aliyuncs.com"]
}
```

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

