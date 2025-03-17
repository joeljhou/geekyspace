---
title: Top20常用命令
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2024-11-23
category: Docker
tag:
  - docker
---

# Top20常用命令

作为一款领先的容器化工具，Docker 提供了强大的功能，让开发者和运维人员能够快速构建、部署和管理应用。
在这篇文章中，我们将介绍 20 条最常用的 Docker 命令，并结合详细说明，帮助大家轻松掌握 Docker 的基本操作。

* [1. Docker version](#docker-version)
* [2. Docker search](#docker-search)
* [3. Docker pull](#docker-pull)
* [4. Docker run](#docker-run)
* [5. Docker ps](#docker-ps)
* [6. Docker stop](#docker-stop)
* [7. Docker restart](#docker-restart)
* [8. Docker kill](#docker-kill)
* [9. Docker exec](#docker-exec)
* [10. Docker login](#docker-login)
* [11. Docker commit](#docker-commit)
* [12. Docker push](#docker-push)
* [13. Docker network](#docker-network)
* [14. Docker history](#docker-history)
* [15. Docker rmi](#docker-rmi)
* [16. Docker ps -a](#docker-ps--a)
* [17. Docker copy](#docker-copy)
* [18. Docker logs](#docker-logs)
* [19. Docker volume](#docker-volume)
* [20. Docker logout](#docker-logout)

**相关文档**

* [Docker 命令参考文档](https://docs.docker.com/engine/reference/commandline/cli/)
* [Dockerfile 镜像构建参考文档](https://docs.docker.com/engine/reference/builder/?spm=5176.8351553.0.0.4ef81991wFvDZm)

## Docker version

用途：显示 Docker 的版本信息。

```bash
docker version
```

![docker version](http://img.geekyspace.cn/pictures/2024/202411231416702.png)

## Docker search

用途: 用于搜索 Docker Hub 上的镜像。

```shell
docker search nginx
```

![docker search nginx](http://img.geekyspace.cn/pictures/2024/202411231425169.png)

## Docker pull

用途：从 Docker Hub 下载镜像。

```shell
docker pull nginx
```

![docker pull nginx](http://img.geekyspace.cn/pictures/2024/202411231427300.png)

## Docker run

用途：运行一个镜像，并创建一个容器。

```shell
docker run -d --name my-mysql -e MYSQL_ROOT_PASSWORD=root -p 3307:3306 mysql:8.0
```

参数解释：

* `-d`：后台运行容器，并返回 Shell。
* `-e MYSQL_ROOT_PASSWORD=root`：设置环境变量，用于设置 MySQL 的 root 用户密码。
* `-p 3306:3306`：将主机的端口 3306 映射到容器的端口 3306。
* `mysql:8.0`：要下载的镜像的名称。

![docker run mysql](http://img.geekyspace.cn/pictures/2024/202411231444798.png)

## Docker ps

用途：列出当前正在运行的容器。

```shell
docker ps
```

## Docker stop

用途：停止一个正在运行的容器。

```shell
docker stop <container_id>
```

## Docker restart

用途：重启一个容器。

```shell
docker restart <container_id>
```

## Docker kill

用途：强制停止一个容器。

```shell
docker kill <container_id>
```

## Docker exec

用途：在运行中的容器中执行命令。

```shell
docker exec -it <container_id> bash
```

参数解释：

* `-it`：保持 STDIN 打开并允许使用键盘输入。
* `<container_id>`：要进入的容器的ID。
* `bash`：要执行的命令。

![docker exec -it <container_id> bash](http://img.geekyspace.cn/pictures/2024/202411231506412.png)

## Docker login

用途：登录 Docker Hub，用于推送私有镜像。

```shell
docker login
```

![docker login](http://img.geekyspace.cn/pictures/2024/202411231511727.png)

## Docker commit

用途：创建一个镜像，该镜像包含一个容器的当前状态。

```shell
docker commit <container_id> <image_name>
```

参数解释：

* `<container_id>`：要提交为镜像的容器的ID。
* `<image_name>`：新镜像的名称。

## Docker push

用途：将镜像推送到 Docker Hub。

```shell
docker push <image_name>
```

## Docker network

用途：管理 Docker 网络。

```shell
docker network create <network_name>
docker network inspect <network_name>
docker network rm <network_name>
docker network connect <network_name> <container_id>
docker network disconnect <network_name> <container_id>
```

参数解释：
* `<network_name>`：要创建、查看、删除或连接的 Docker 网络的名称。
* `<container_id>`：要连接到或断开连接的网络的容器的ID。

## Docker history

用途：显示镜像的创建历史。

```shell
docker history <image_name>
```

参数解释：
* `<image_name>`：要查看其创建历史的镜像的名称。

## Docker rmi

用途：删除镜像。

```shell
docker rmi <image_id>
```

## Docker ps -a

用途：列出所有容器，包括已停止的容器。

```shell
docker ps -a
```

![docker ps -a](http://img.geekyspace.cn/pictures/2024/202411231500573.png)

## Docker copy

用途：复制文件或文件夹到容器。

```shell
docker cp <host_path> <container_id>:<container_path>
```

参数解释：
* `<host_path>`：主机上的文件或文件夹的路径。
* `<container_id>`：要复制文件的容器的ID。
* `<container_path>`：容器内的目标路径。

## Docker logs

用途：查看容器的日志。

```shell
docker logs <container_id>
```

参数解释：

* `<container_id>`：要查看其日志的容器的ID。

## Docker volume

用途：管理 Docker 卷。

```shell
docker volume create <volume_name>
docker volume inspect <volume_name>
docker volume rm <volume_name>
docker run -v <volume_name>:/data nginx
```

参数解释：
* `<volume_name>`：要创建、查看或删除的卷的名称。 
* `nginx`：要运行的镜像名称。 
* `/data`：要挂载到容器内的卷的挂载点。

## Docker logout

用途：注销 Docker Hub。

```shell
docker logout
```

