---
title: 前端工程之美
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-12-13
category:
  - 阿里技术
  - 前端
tags:
  - 前端
shortTitle: 前端工程
description: 从依赖管理、语言特性、框架、Node.js 与浏览器能力，理解现代前端工程的技术栈与演进。
icon: article
copyright: 学习笔记由流浪码客整理，课程、截图与引用内容的权利归各自权利人所有。
---

# 前端工程之美

::: info 学习笔记
本文为「阿里技术 · 从0开始学终端」专题的个人学习整理，并非官方文档或课程逐字稿。课程、截图和引用内容的权利归各自权利人所有，不适用本站默认的 MIT 授权；已知参考资料见文末。
:::

## 现代前端技术栈的最小集

**什么是 Web 前端开发？**

通常来说，Web 前端开发是指在浏览器中使用 HTML、CSS 和 JavaScript 来编写 Web 应用或网页。

![什么是 Web 前端开发](https://img.geekyspace.cn/pictures/2025/202512132223660.png)

**浏览器与 Web 运行环境**

- **狭义浏览器**：指我们常见的浏览器，如 Chrome、Safari、Edge，以及历史上的 IE。
- **广义的 Web 运行环境**：也包括移动应用中嵌入的 Web 容器，如淘宝、钉钉、微信等应用中的 H5 页面；这些页面同样使用 Web 前端技术栈开发。

**前端开发的变化**

曾经，前端开发容易上手，可以直接编写页面并在浏览器中打开。

![低得令人发指的上手门槛](https://img.geekyspace.cn/pictures/2025/202512132224710.png)

随着应用规模与交互复杂度增加，前端工程中的名词也越来越多：Node.js、ES6、TypeScript、React、SSR、Vue、webpack、esbuild、Babel、LESS、WebGL、CSS Modules、Service Worker、WebAssembly、Flutter。

> 为什么 Web 前端开发变得如此复杂？可以从依赖管理、语言能力、UI 组织、工程工具和运行环境五个方面理解。

### 依赖管理与构建：npm / webpack

随着软件规模逐渐增大，依赖管理变得愈加复杂。早期只需要通过 `script` 标签引入别人写好的模块，例如：

- 模块通过 CDN 发布，页面直接引用。
- 模块下载后放在本地服务器，通过全局变量进行通信。

之后出现了 Bower、RequireJS 和国内的 SeaJS 等方案。它们分别从包管理、模块加载等角度改善协作，并非完全相同的一类工具。

课程涉及的工程工具包括 npm 与 webpack：前者管理依赖包，后者负责构建与打包。

![webpack & npm](https://img.geekyspace.cn/pictures/2025/202512132227857.png)

npm 负责依赖包的安装与版本管理；webpack 从 `import`、`require` 等声明构建依赖图，并按配置打包为一个或多个产物。Vite、esbuild 等工具则提供了不同的开发与构建方案。

### 语言特性：ECMAScript / TypeScript / Babel

随着应用规模增大，早期 JavaScript 的模块组织、语言表达和静态类型检查能力逐渐难以满足复杂工程的需要。JavaScript 也不断演进：TC39 推动了 ES5、ES6 等版本，以及此后按年发布的新特性。

![ES6 & TypeScript](https://img.geekyspace.cn/pictures/2025/202512132238985.png)

ES6 引入了大量新特性，TypeScript 则作为支持静态类型检查的 JavaScript 超集得到广泛应用。为兼容目标运行环境，可以按需使用 Babel 或 TypeScript 编译器（`tsc`）转换部分语法；缺失的运行时 API 还需另外评估 polyfill。

![Babel & TypeScript](https://img.geekyspace.cn/pictures/2025/202512132243451.png)

### UI 库与框架：React / Angular / Vue

- **HTML 与 DOM**：最初主要围绕文档展示设计。
- **Web 应用的需求**：复杂交互需要组织状态、界面与数据流，催生了不同的应用架构与框架。
- **常见选择**：React、Angular、Vue。

React 更准确的定位是 UI 库，专注于组件与界面表达，而不是独自解决完整应用的所有问题。路由、状态管理、服务端渲染等能力需要结合具体方案选择；Redux、RxJS 等是可选的生态工具，并非每个 React 应用的必需依赖。

### 工程基础：Node.js

Node.js 让 JavaScript 不仅能在浏览器端运行，也能用于服务端和命令行工具。包管理、开发服务器与构建工具由此获得了统一的工程基础。

### 浏览器的大发展

浏览器不再只是展示 HTML，还提供了更丰富的应用能力：

- **图形能力**：WebGL、Canvas。
- **多媒体能力**：音视频播放、直播与媒体处理等。
- **网络能力**：如 WebSocket 支持实时互动应用，HTTP Range 等机制支持断点续传。
- **沙箱和线程能力**：安全隔离、Worker 并行任务、WebAssembly 执行，以及离线存储等。

![浏览器的发展](https://img.geekyspace.cn/pictures/2025/202512132253357.png)

浏览器能力与工程工具共同发展，使复杂 Web 应用成为可能。选择工具时应先明确要解决的问题，而不是为了技术栈完整而引入所有工具。

![目标与对应的解法](https://img.geekyspace.cn/pictures/2025/202512132320510.png)

## Web 开发实战

使用 React + TypeScript 实现计算器，将组件拆分、状态管理和类型约束放到一个小型应用中理解。

- [React + TypeScript 计算器实践视频](https://www.bilibili.com/video/BV1WV4y1L7C1/)

## 学习资源

1. [HTTP 概述](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
2. [浏览器如何工作](https://web.dev/articles/howbrowserswork)
