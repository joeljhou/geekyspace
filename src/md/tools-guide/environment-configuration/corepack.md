---
title: Corepack核心包管理工具
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-03-15
category: 包管理器
tag:
  - npm
  - pnpm
  - yarn
---

# Corepack核心包管理工具

主要官方来源：[Nodejs官网文档](https://nodejs.org/api/corepack.html) |  [Github](https://github.com/nodejs/corepack)

> Corepack 作为一个内置于 Node.js 工具，为开发者解决了包管理器（`Yarn`、`npm` 和 `pnpm` ）版本不一致和兼容性问题。

## 安装Corepack
从 Node.js 16.x 开始，Corepack 已经内置在 Node.js 中，所以只要安装 Node.js，就可以直接使用 Corepack。如果需要手动安装，可以参考 [Github 官方文档](https://github.com/nodejs/corepack?tab=readme-ov-file#manual-installs)。
**验证安装**
```shell
corepack -v
```
**Corepack更新**
* 用于解决 [Corepack 中的签名过时](https://github.com/nodejs/corepack/issues/612) 问题
```shell
npm install --global corepack@latest
```
## 启用/禁用 Corepack
* [Corepack](https://github.com/nodejs/corepack) 默认是实验性工具，需要手动启用。
```shell
# 启用
corepack enable
```
启用后，它会自动为你管理所需的包管理器版本。
```shell
# 禁用
corepack disable
```
## 管理包管理器的版本
Corepack 使得你能够轻松管理不同版本的包管理器。比如你可以为项目指定特定版本的 `npm`、`Yarn` 或 `pnpm`。
### 安装[pnpm](https://pnpm.io/zh/)

> 快速的，节省磁盘空间的包管理工具。pnpm 比 npm 快 2 倍。

**安装并启用：**
```shell
corepack prepare pnpm@latest --activate
```
**验证安装：**
```shell
pnpm --version
```

**固定项目使用的版本：**
```shell
corepack use pnpm@latest-10
```
这会将 `pnpm` 的版本信息添加到 `package.json` 中的 `packageManager` 字段。
### 安装[Yarn](https://yarnpkg.com/)

[Github](https://github.com/yarnpkg/yarn)

> Yarn 是 Facebook 开发的一个快速、安全、稳定的包管理器，特别适用于大型项目。

**安装并启用：**
* 稳定版本：1.22.22
```shell
corepack prepare yarn@1.22.22 --activate
```
**验证安装：**
```shell
yarn --version
```
**固定项目使用的版本：**
```shell
corepack use yarn@1.22.22
```
在 `package.json` 中，会看到类似以下内容：
```shell
{
  "packageManager": "yarn@1.22.22"
}
```
这样，Corepack 会根据该配置自动管理 Yarn 的版本。