---
title: Docker镜像加速器
author: 会敲代码的程序猿
isOriginal: true
date: 2024-11-16
category: Docker
tag: Docker
---

# Docker镜像加速器

## 阿里云镜像加速器

> [阿里云镜像加速器](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)，有针对`Ubuntu`，`CentOS`，`Mac`，`Windows`的操作文档

![阿里云镜像加速器](http://img.geekyspace.cn/pictures/2024/202411270006564.png)

## 配置文件

* Linux：`/etc/docker/daemon.json`
* Windows: `%USERPROFILE%\.docker\daemon.json`

## Windows配置

点击`docker desktop`右上角**齿轮**图标，打开配置窗口后选择`Docker Engine`。<br/>
编辑JSON串，填写加速器地址：

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

## Linux配置

针对，`Ubuntu`或`CentOS`系统，编辑`/etc/docker/daemon.json`文件，添加如下内容：

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://onnxqmp4.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

**相关文档**

* [Docker 命令参考文档](https://docs.docker.com/engine/reference/commandline/cli/)
* [Dockerfile 镜像构建参考文档](https://docs.docker.com/engine/reference/builder/?spm=5176.8351553.0.0.4ef81991wFvDZm)
