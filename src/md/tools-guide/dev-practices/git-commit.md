---
title: Git 提交描述规范
shortTitle: Git 提交描述规范
description: Git 提交信息速查：统一格式、常用类型与简明示例。
author: 流浪码客
isOriginal: true
date: 2023-02-03
category: 开发实践
tags:
  - Git
  - 提交规范
---

# Git 提交描述规范

提供 Git 提交信息格式的规范和示例，旨在提高提交信息的可读性和项目的可维护性。

## 关键词

| 类型         | 用途          | 示例                      |
|------------|-------------|-------------------------|
| `feat`     | 新增功能        | `feat: 添加用户登录功能`        |
| `fix`      | 修复 Bug      | `fix: 修复订单重复提交`         |
| `docs`     | 文档变更        | `docs: 更新 API 文档`       |
| `style`    | 代码格式（不改逻辑）  | `style: 统一缩进和空格`        |
| `refactor` | 代码重构（不改逻辑）  | `refactor: 提取公共校验方法`    |
| `perf`     | 性能优化        | `perf: 为查询字段添加索引`       |
| `test`     | 测试相关        | `test: 补充订单单元测试`        |
| `chore`    | 日常杂务（项目维护）  | `chore: 更新依赖包版本`        |
| `ci`       | 持续集成（CI 配置） | `ci: 修改 GitHub Actions` |
| `build`    | 构建打包（外部依赖）  | `build: 升级 Vite 版本`     |
| `revert`   | 回滚提交        | `revert: 撤销短信登录功能`      |

## 格式

```text
<type>: <subject>

<body>
```

- **type**：提交类型（如 feat, fix 等）
- **subject**：简要描述变更
- **body**：详细描述变更（可选）

body 可选，例如 `fix(login): 修复登录后跳转失败`。简单变更只写标题即可。

## 参考

- [Conventional Commits 约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
