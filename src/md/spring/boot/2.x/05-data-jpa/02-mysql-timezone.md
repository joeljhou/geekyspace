---
title: 第五章 Spring Boot2.x 数据访问：MySQL 时区
shortTitle: 5.2 MySQL 时区
date: '2019-03-30'
description: 区分 JDBC 驱动、MySQL 会话与 JSON 输出时区，按层定位时间偏差。
icon: spring
author: 流浪码客
isOriginal: true
category: Spring Boot
tag:
  - Spring Boot 2.x
  - MySQL
order: 3
---

# 第五章 Spring Boot2.x 数据访问：MySQL 时区

**时间偏差不一定是数据库时区错误。** 先检查字段类型、Java 时间类型和各层时区，再决定修改哪一处配置。

官方链接使用当前文档；涉及 Connector/J 新参数时，需先核对项目实际驱动版本。

## 1. 检查数据库与驱动

官方来源：[MySQL 时区机制](https://dev.mysql.com/doc/refman/en/time-zone-support.html) ｜ [Connector/J 日期时间参数](https://dev.mysql.com/doc/connector-j/en/connector-j-connp-props-datetime-types-processing.html)

先在数据库连接中执行：

```sql
SELECT NOW(), UTC_TIMESTAMP(),
       @@session.time_zone, @@global.time_zone, @@system_time_zone;
```

- **`@@session.time_zone`**：当前连接使用的时区；命令行连接的结果不一定等于应用连接池中的结果。
- **`@@global.time_zone`**：新连接默认继承的时区。
- **`@@system_time_zone`**：MySQL 启动时识别的系统时区；`SYSTEM` 表示使用系统时区，`CST` 这类缩写有歧义。

本章旧版 Connector/J 8.0 示例使用：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/demo?serverTimezone=Asia/Shanghai&characterEncoding=UTF-8
```

**从 Connector/J 8.0.23 起，`serverTimezone` 是 `connectionTimeZone` 的别名。** 当前文档主要使用后者，但不要未经核对就把新参数复制到旧驱动中。

==指定驱动时区，不等于修改 MySQL 会话时区==。驱动解释时间时采用的时区，应与数据库连接实际使用的时区一致。

## 2. 按需设置会话时区

官方来源：[会话与全局时区设置](https://dev.mysql.com/doc/refman/en/time-zone-support.html) ｜ [HikariCP 的 connectionInitSql](https://github.com/brettwooldridge/HikariCP#gear-configuration-knobs-baby) ｜ [驱动时区转换规则](https://dev.mysql.com/doc/connector-j/en/connector-j-time-instants.html)

如果应用约定使用东八区，可先对**当前连接**设置：

```sql
SET time_zone = '+08:00';
```

使用默认 HikariCP 时，可在每次新建物理连接后执行同一条 SQL：

```properties
spring.datasource.hikari.connection-init-sql=SET time_zone = '+08:00'
```

需要记住的边界：

- **连接初始化 SQL**：仅对新建物理连接执行，不是每次从池中借用连接都执行。
- **全局时区**：通常影响后续新连接，已有连接不会自动同步；确需修改默认值时再由管理员操作。
- **命名时区**：MySQL 使用 `Asia/Shanghai` 等名称前，需要加载时区表；固定 `+08:00` 偏移量不依赖时区表，但不表达夏令时规则。
- **较新驱动的替代方式**：Connector/J 8.0.23+ 可通过 `forceConnectionTimeZoneToSession=true` 将 `connectionTimeZone` 应用到会话，默认不会强制设置；与初始化 SQL 按需选择，避免配置冲突。

## 3. 区分存储、转换与展示

官方来源：[MySQL 日期时间类型](https://dev.mysql.com/doc/refman/en/datetime.html) ｜ [Connector/J 时间点转换](https://dev.mysql.com/doc/connector-j/en/connector-j-time-instants.html) ｜ [Spring Boot JSON 时区属性](https://docs.spring.io/spring-boot/appendix/application-properties/index.html#application-properties.json.spring.jackson.time-zone)

| 层次 | 重点掌握 | 不能替代什么 |
| --- | --- | --- |
| MySQL 字段类型 | `TIMESTAMP` 按会话时区与 UTC 互转；`DATETIME` 保存日期时间字段值，不自带时区 | 不能只看显示值就断定时间点正确 |
| MySQL 会话时区 | 影响 `NOW()`、`TIMESTAMP` 的存取转换 | 不会给 `DATETIME` 自动补上时区信息 |
| Java 类型与 JDBC 驱动 | `LocalDateTime` 不带时区，`Instant` 表达时间点；驱动行为还取决于目标 SQL 类型与版本 | 不是所有时间类型都会进行同样的转换 |
| JSON 输出 | `spring.jackson.time-zone` 影响支持该设置的日期序列化；效果取决于 Java 类型及序列化配置 | **不能修复已经存错的数据**，也不能让 `LocalDateTime` 自动获得时区 |

==先确认业务要保存“某个时间点”，还是“当地钟表时间”==。再对照字段类型、Java 类型与转换规则排查，不要把所有时区配置都改一遍。
