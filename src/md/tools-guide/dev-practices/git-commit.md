---
title: Git 提交描述规范
shortTitle: Git 提交描述规范
description: Git 提交信息速查：常用格式、类型说明和可直接参考的中文示例。
author: 流浪码客
isOriginal: true
date: 2023-02-03
category: 开发实践
tags:
  - Git
  - 提交规范
---

# Git 提交描述规范

## 提交格式

```text
类型(范围): 具体做了什么
```

范围可省略，冒号后留一个空格。直接照着写：

```shell
git commit -m "feat(login): 新增短信验证码登录"
git commit -m "fix(order): 修复订单重复提交的问题"
git commit -m "docs: 补充项目启动说明"
```

## 类型速查

| 类型 | 什么时候用 | 示例 |
| --- | --- | --- |
| `feat` | 新功能 | `feat(search): 支持按标签搜索` |
| `fix` | 修复问题 | `fix(login): 修复登录后跳转失败` |
| `docs` | 文档修改 | `docs: 补充部署步骤` |
| `style` | 代码格式，不改逻辑 | `style: 统一缩进和空格` |
| `refactor` | 代码重构 | `refactor(user): 提取公共校验方法` |
| `perf` | 性能优化 | `perf(list): 优化列表查询速度` |
| `test` | 新增或修改测试 | `test(order): 补充订单取消测试` |
| `build` | 构建或依赖调整 | `build: 升级 Vite 版本` |
| `ci` | 自动化流程调整 | `ci: 添加构建检查` |
| `chore` | 其他维护 | `chore: 更新忽略文件配置` |

## 描述怎么写

写清楚“改了什么”，不要只写“更新”“修改代码”。一次提交尽量只做一件事。

```text
❌ fix: 修复问题
✅ fix(upload): 修复大文件上传超时

❌ docs: 更新
✅ docs(git): 补充 SSH 多账号配置示例
```

## 参考与版权声明

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- 原文：[Git 提交描述规范](https://blog.csdn.net/qq_40174960/article/details/128870307)

版权声明：本文为 CSDN 博主「流浪码客」的原创文章，遵循 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 版权协议，转载请附上原文出处链接及本声明，并以相同方式共享。
