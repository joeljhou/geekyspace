---
title: Docker概述
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

# Docker概述

## 什么是Docker？

`Docker`是`dotCloud`团队在2013年发布的开源项目。 使用`Go`语言开发，是一个轻量级的虚拟机容器解决方案。

## 为什么使用Docker？

Docker跟传统虚拟机相比，具有以下优势：

* 更高效的利用系统资源
* 更快速的启动速度
* 一致的运行环境
* 持续交付和部署
* 更轻松的迁移
* 更轻松的维护和扩展

**`Docker` VS `传统虚拟机`**

| 特性    | 容器        | 虚拟机    |
|-------|-----------|--------|
| 启动    | 秒级        | 分钟级    |
| 硬盘使用  | 一般为 MB    | 一般为 GB |
| 性能    | 接近原生      | 弱于     |
| 系统支持量 | 单机支持上千个容器 | 一般几十个  |

## 基本概念

* **镜像（Image）**：Docker镜像是一个只读的模板，包含了运行容器所需的所有文件。
  * 本质是==文件系统==
  * 基于`Union FS`设计，**分层存储**，可以叠加
* **容器（Container）**：Docker容器是可独立运行的一个或一组应用，是Docker镜像的运行实例。
  * 实质是==进程==
  * 拥有自己的`root`文件系统，网络配置，进程空间等
  * 最佳实践：文件写入操作使用**数据卷（Volume）**，避免文件写入到容器中
* **仓库（Repository）**：Docker Registry是一个集中存储、分发镜像服务。
    * [Docker Hub](https://hub.docker.com/) 官方镜像仓库
    * [Google Container Registry](https://cloud.google.com/artifact-registry/docs?hl=zh-cn) K8s 镜像仓库
    * [Amazon ECR](https://aws.amazon.com/cn/ecr/) AWS 镜像仓库
    * [VMWare Harbor](https://github.com/goharbor/harbor) 和 [Sonatype Nexus](https://www.sonatype.com/docker)
      三方软件实现了Docker Registry API

## Docker执行流程

* 客户端发指令 → 守护进程接收指令 → 检查镜像(本地/Docker Hub) → 创建容器 → 启动并运行。

![Docker执行流程](http://img.geekyspace.cn/pictures/2024/202411152359021.png)

## Docker架构

Docker 的架构设计基于 **客户端-服务器模型**，主要包含以下核心组件：

![Docker架构](http://img.geekyspace.cn/pictures/2024/202411262315598.webp)

1. **Client（客户端）** ：用户与Docker交互的界面，通过命令行或API发送指令给Docker daemon。
   * `docker run`：创建并启动一个容器。
   * `docker build`：根据Dockerfile构建一个新的镜像。
   * `docker pull`：从注册中心拉取一个镜像。
   * `docker push`：将本地镜像推送到注册中心。
2. **Docker daemon（守护进程）** ：Docker引擎的核心，负责监听、处理客户端的指令，并管理Docker对象（镜像、容器等）。
   * `镜像管理`：管理本地镜像，包括存储、加载和删除。
   * `容器管理`：创建、启动、停止、删除容器。
   * `网络管理`：为容器提供网络接口。
   * `存储管理`：管理容器的数据卷。
3. **Images（镜像）** ：Docker镜像是一个只读的模板，包含了运行容器所需的所有文件
   * `分层结构`：镜像由多层组成，每一层代表一个构建步骤。
   * `只读`：镜像是只读的，保证了镜像内容的不可变性。
4. **Containers（容器）** ：Docker容器是镜像的运行实例，是应用程序的运行环境。
   * `隔离性`：每个容器都有独立的文件系统、网络配置和进程空间。
   * `可复用性`：基于同一个镜像可以创建多个容器实例。
5. **Registry（注册中心）** ：用于存储和分发Docker镜像的仓库。
   * `集中存储`：将镜像存储在集中式的仓库中，方便管理和共享。
   * `版本控制`：支持镜像的版本管理。