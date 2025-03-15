---
title: Corepack核心包管理工具
description:
author: 流浪码客
isOriginal: true
date: 2025-03-15
category: 安装大全
tag:
  - nodejs
  - npm
  - pnpm
  - yarn
  - 包管理器
---

# Corepack核心包管理工具

[Nodejs官网文档](https://nodejs.org/api/corepack.html) ｜ [Github](https://github.com/nodejs/corepack)

> Corepack 是一个零运行时依赖性的 Node.js 脚本，它充当 Node.js 项目与开发过程中要使用的包管理器之间的桥梁。实际上， **Corepack 允许您使用 Yarn、npm 和 pnpm，而无需安装它们**。

## Corepack安装

从 Node.js 14.19 / 16.9 开始，所有官方 Node.js 版本都包含 Corepack。需要[手动安装](https://github.com/nodejs/corepack?tab=readme-ov-file#manual-installs)参考Github。

由于 [Corepack 中的签名过时](https://github.com/nodejs/corepack/issues/612) 问题，请先将 Corepack 更新至最新版本：
```shell
npm install --global corepack@latest
```

**验证 Corepack 版本**
* 通过 NVM 安装 Node.js 后，默认情况下 Corepack 会随着 Node.js 一起安装。
```shell
corepack -v
```

**启用该功能**
* [Corepack](https://github.com/nodejs/corepack) 是一款*实验性*工具，需要手动启用，它可帮助您管理软件包管理器的版本。
```shell
corepack enable
```

**禁用 Corepack**
* 通过 Corepack 启用的包管理器（如 `pnpm` 和 `yarn`）将不再自动切换。
```shell
corepack disable
```

## 安装和管理pnpm/Yarn

### [pnpm](https://pnpm.io/zh/)

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
这会添加一个 `packageManager` 字段到你本地的 `package.json`，指示 Corepack 始终在该项目上使用特定的版本。 如果你想要可复现性，这可能很有用，因为所有使用 Corepack 的开发人员都将使用与你相同的版本。 当一个新版本的 pnpm 发布时，你可以重新运行上述命令。
### [Yarn](https://yarn.nodejs.cn/)

> Yarn 是 Facebook 开发的一个快速、安全、稳定的包管理器，特别适用于大型项目。

**安装并启用：**
```shell
corepack prepare yarn@latest --activate
```

**验证安装：**
```shell
yarn --version
```
