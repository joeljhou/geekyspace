---
title: 第五章 Spring Boot2.x 数据访问：JPA 查询
shortTitle: 5.1 JPA 查询
date: '2019-03-30'
description: 区分方法名派生查询、JPQL 与原生 SQL，掌握分页返回类型及其使用场景。
icon: spring
author: 流浪码客
isOriginal: true
category: Spring Boot
tag:
  - Spring Boot 2.x
  - Spring Data JPA
order: 2
---

# 第五章 Spring Boot2.x 数据访问：JPA 查询

**简单条件用方法名，固定查询难以清晰表达时用 `@Query`，列表查询按需分页。** 以下方法添加到[入门实践](00-getting-started.md)的 `DeptRepository` 中，按需选用。

官方链接使用当前文档；代码沿用本章 Spring Boot 2.x 的写法，不直接套用新版新增 API。

## 1. 方法名派生查询

官方来源：[查询创建与关键字](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.query-methods.query-creation) ｜ [属性路径解析](https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html#repositories.query-methods.query-property-expressions)

==方法名写实体属性，不写数据库列名==。Spring Data JPA 会解析方法名并创建查询，无需自己编写实现。

| 方法示例 | 查询含义 |
| --- | --- |
| `findByDname` | 名称相等 |
| `findByDnameContaining` | 名称包含关键字 |
| `findByDeptnoIn` | 编号在给定集合中 |
| `findByDeptnoGreaterThan` | 编号大于给定值 |
| `findByLocIsNull` | 位置为空 |
| `findByDnameAndLoc` | 名称和位置同时满足条件 |
| `findByDnameOrderByDeptnoDesc` | 按名称筛选，再按编号倒序 |

```java
List<Dept> findByDnameContaining(String keyword);
```

- **`Containing`**：传入普通关键字，框架补上包含匹配所需的 `%`，并转义参数中的 `%`、`_` 等通配符。
- **`Like`**：调用方传入 `%关键字%` 这样的匹配模式。

方法名过长、难以阅读时，不必继续堆叠关键字，改用下面的显式查询。

## 2. 使用 @Query 声明查询

官方来源：[`@Query` 用法](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.query-methods.at-query) ｜ [原生 SQL 查询](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.query-methods.at-query.native)

==JPQL 写实体名和属性名，原生 SQL 写数据库表名和列名==。

```java
// JPQL：Dept 是实体名，dname、deptno 是实体属性
@Query("select d from Dept d where d.dname = :name order by d.deptno desc")
List<Dept> findByName(@Param("name") String name);

// 原生 SQL：dept 是数据库表名
@Query(value = "select * from dept where dname = :name", nativeQuery = true)
List<Dept> findByNameNative(@Param("name") String name);
```

`@Query` 来自 `org.springframework.data.jpa.repository`，`@Param` 来自 `org.springframework.data.repository.query`。

**参数通过 `:name` 绑定，不拼接用户输入。** 最新文档也会使用 `@NativeQuery`，本章 Boot 2.x 示例仍使用 `@Query(nativeQuery = true)`。

## 3. 分页与排序

官方来源：[分页与排序](https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html#repositories.paging-and-sorting) ｜ [返回类型与查询开销](https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html#repositories.special-parameters)

Repository 声明与调用：

```java
// Repository：按位置筛选，分页条件由调用方传入
Page<Dept> findByLoc(String loc, Pageable pageable);

// Service：第 1 页，每页 20 条，按编号倒序
Page<Dept> page = repository.findByLoc(
        "Shanghai", PageRequest.of(0, 20, Sort.by("deptno").descending()));
```

`Page`、`Slice`、`Pageable`、`PageRequest`、`Sort` 均来自 `org.springframework.data.domain`。

| 返回类型 | 适用场景 | 总数查询 |
| --- | --- | --- |
| `Page<Dept>` | 需要总条数、总页数 | 通常需要额外执行 `count` |
| `Slice<Dept>` | 只需知道有没有下一页 | 不统计总数 |
| `List<Dept>` + `Pageable` | 只需当前范围的数据 | 不统计总数，也不提供分页元数据 |

**页码从 0 开始**；分页时使用明确、稳定的排序。本例按唯一的 `deptno` 排序，避免相同排序值导致顺序不确定。
