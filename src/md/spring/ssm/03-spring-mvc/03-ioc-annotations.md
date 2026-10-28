---
title: 注解配置
shortTitle: 注解配置
description: Resource 与 Autowired 的对象注入规则和注解配置示例。
author: 流浪码客
isOriginal: true
date: '2019-04-13'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 3
---
# 注解配置

Resource 与 Autowired 的对象注入规则和注解配置示例。

## 注解注入规则

![注解注入规则：@Repository - 持久层类](https://img.geekyspace.cn/pictures/2026/202610271647664.png)

![注解注入规则：使用@XXX注解让Spring IOC创建对象](https://img.geekyspace.cn/pictures/2026/202610271647665.png)

| 注解 | 默认规则 |
| --- | --- |
| `@Resource` | 指定 name 时按名称查找；未指定时先按属性名查找，再按类型匹配。 |
| `@Autowired` | 按类型查找；有多个候选对象时需结合 Qualifier、Primary 等规则。 |
