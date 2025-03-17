---
title: npm源切换加速利器—nrm
shortTitle: 
description: 
icon: 
cover: 
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-03-17
category: 包管理器
tags:
  - nrm
  - 镜像
---

# npm源切换加速利器—nrm

主要官方来源：[npmjs-nrm](https://www.npmjs.com/package/nrm)

> `nrm`可以帮助您轻松快速地切换不同的 npm 注册表。它支持 `npm` 、 `cnpm` 、 `taobao` 、 `yarn` 、 `tencent` 、 `npmMirror`和`huawei` 。

## 安装nrm
```shell
# npm 安装
npm install -g nrm
```
安装成功后，使用`nrm --version`查看命令，验证是否安装正常。

## 使用指南
### nrm ls
查看源列表
```shell
$ nrm ls

* npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
  huawei ------- https://repo.huaweicloud.com/repository/npm/
```
### nrm use
切换镜像
```shell
$ nrm use taobao

SUCCESS The registry has been changed to 'taobao'.
```
### nrm current
查看当前源
```shell
$ nrm current

You are using taobao registry.
```
### nrm test
测试所有源的响应时间
```shell
$ nrm test
  npm ---------- 823 ms
  yarn --------- 799 ms
  tencent ------ 964 ms
  cnpm --------- 1882 ms
* taobao ------- 184 ms
  npmMirror ---- 871 ms
  huawei ------- 845 ms
```
### nrm add
添加镜像源
```shell
$ nrm add <源名> <源URL>
```
### nrm del
删除镜像源
```shell
nrm del <源名>
```

## 统一切换npm，pnpm，yarn镜像源

```
nrm use huawei
```

```shell
npm config get registry
```

```shell
pnpm config get registry
```
