---
title: 第八章 Spring Boot2.x Lombok
shortTitle: 第八章 Lombok
description: 使用 Lombok 减少样板代码，关注注解处理和 JPA 实体的使用边界。
icon: spring
author: 流浪码客
isOriginal: true
date: '2019-04-08'
category: Spring Boot
tag:
  - Spring Boot 2.x
  - Lombok
order: 8
---

# 第八章 Spring Boot2.x Lombok

Lombok 在编译阶段生成 Getter、Setter 等代码，不是 Spring Boot 功能。旧项目已使用时看懂常用注解即可，不必为此改造全部实体。

## 1. 引入依赖

使用 Spring Boot 父 POM 管理版本时，无需手写历史版本号：

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>
```

编译依赖注解处理器；IDE 若无法识别生成的方法，再检查 Lombok 支持和 Annotation Processing。只安装 IDE 插件不能替代 Maven 依赖。

## 2. 常用注解

| 注解                         | 作用                                     |
| -------------------------- | -------------------------------------- |
| `@Getter` / `@Setter`      | 生成属性访问器                                |
| `@NoArgsConstructor`       | 生成无参构造器                                |
| `@RequiredArgsConstructor` | 为未初始化的 `final` 字段等生成构造器                |
| `@Data`                    | 组合访问器、`equals`、`hashCode`、`toString` 等 |
| `@Slf4j`                   | 生成名为 `log` 的 SLF4J 日志字段                |

普通 DTO 示例：

```java
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeptRequest {
    private String name;
    private String location;
}
```

不要对 JPA 实体无脑使用 **`@Data`**：自动生成的 `toString`、`equals`、`hashCode` 可能遍历关联对象，引发递归或额外查询。按需使用 `@Getter`、`@Setter` 更容易控制。

下一篇：[第九章 参数校验](09-validation.md)。
