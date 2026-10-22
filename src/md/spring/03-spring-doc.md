---
title: Springdoc 快速入门：生成 OpenAPI 文档并导入 Apifox
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-09-23
category: Spring
tags:
  - springdoc
  - openapi
  - Swagger
  - Apifox
---
# Springdoc 快速入门：生成 OpenAPI 文档并导入 Apifox
- 官网地址： https://springdoc.org/
- Kotlin支持： https://springdoc.org/#kotlin-support
- 从 SpringFox 迁移（掌握注解使用）： https://springdoc.org/#migrating-from-springfox
**基本使用**


```kotlin
// OpenAPI Documentation  
// 官网：https://springdoc.org/  
// Kotlin支持：https://springdoc.org/#kotlin-support  
// - http://localhost:9090/swagger-ui.html  
implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.13")  
  
// 使用 Apifox 替代 Swagger UI
// - 上传 http://localhost:9090/v3/api-docs JSON 文件  
// implementation("org.springdoc:springdoc-openapi-starter-webmvc-api:2.8.13")
```