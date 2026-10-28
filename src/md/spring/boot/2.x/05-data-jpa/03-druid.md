---
title: 第五章 Spring Boot2.x 数据访问：Druid 连接池
shortTitle: 5.3 Druid 连接池
date: '2019-03-30'
description: 区分 Druid 手动配置与 Starter 接入，掌握连接池参数含义和监控访问控制。
icon: spring
author: 流浪码客
isOriginal: true
category: Spring Boot
tag:
  - Spring Boot 2.x
  - Druid
order: 4
---

# 第五章 Spring Boot2.x 数据访问：Druid 连接池

Spring Boot 2.x 的 JDBC/JPA Starter 默认优先使用 HikariCP，**不需要为了使用 JPA 切换 Druid**。本页用于维护已经采用 Druid 的项目。

官方链接使用项目当前维护的文档；Starter 坐标与配置方式仍需匹配项目实际的 Spring Boot 版本。

## 1. 先确认接入方式

官方来源：[Spring Boot 连接池选择规则](https://docs.spring.io/spring-boot/reference/data/sql.html) ｜ [Druid Spring Boot Starter](https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter)

==先看项目如何创建 DataSource，再决定配置前缀==。

| 接入方式                        | 如何创建数据源                     | 配置规则                                                                    |
| --------------------------- | --------------------------- | ----------------------------------------------------------------------- |
| 普通 `druid` 依赖 + 手动 Bean     | 自己声明 `DruidDataSource` Bean | 以 `@ConfigurationProperties` 声明的前缀为准                                    |
| `druid-spring-boot-starter` | Starter 自动配置                | 通用连接信息可用 `spring.datasource.*`，Druid 专有参数使用 `spring.datasource.druid.*` |

**本章 Boot 2.x 对应 `druid-spring-boot-starter`；Boot 3.x 对应 `druid-spring-boot-3-starter`。** 不要把不同主版本的 Starter 混用，也不要同时维护两套数据源创建配置。

官方 README 中也可能保留较早的依赖示例，**不要直接照搬旧版本号**，应核对兼容性与安全更新。

## 2. 手动数据源的最小配置

官方来源：[DruidDataSource 配置属性列表](https://github.com/alibaba/druid/wiki/DruidDataSource%E9%85%8D%E7%BD%AE%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8) ｜ [Spring Boot 自定义 DataSource](https://docs.spring.io/spring-boot/reference/data/sql.html)

以下选择**普通 `com.alibaba:druid` 依赖 + 手动 Bean**，假设项目已引入兼容版本：

```java
import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DruidConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DruidDataSource dataSource() {
        return new DruidDataSource();
    }
}
```

沿用[入门实践](00-getting-started.md)的 URL、账号、密码，再补充连接池参数：

```properties
# 连接数量：仅为示例，不是通用调优结论
spring.datasource.initial-size=2
spring.datasource.min-idle=2
spring.datasource.max-active=20

# 获取连接最多等待 30 秒，不是 SQL 执行超时
spring.datasource.max-wait=30000

# 连接有效性检查
spring.datasource.validation-query=SELECT 1
spring.datasource.test-while-idle=true
```

| 参数 | 需要掌握的含义 |
| --- | --- |
| `initial-size` | 数据源初始化时建立的连接数，不一定在应用启动瞬间全部建立 |
| `min-idle` / `max-active` | 最小空闲连接数 / 最大活跃连接数，需结合数据库容量与应用实例数设置 |
| `max-wait` | ==获取连接的等待上限==，单位毫秒；不限制 SQL 执行时长 |
| `test-while-idle` | 借用连接时，若连接空闲时间超过检查间隔，检查连接有效性；不是每次借用都检查 |

**以上前缀来自手动 Bean 的绑定声明。** 如果采用 Starter，应按其文档将专有参数配置在 `spring.datasource.druid.*` 下，不能只复制参数值而忽略前缀。

## 3. 排查连接池与监控风险

官方来源：[连接池参数与校验机制](https://github.com/alibaba/druid/wiki/DruidDataSource%E9%85%8D%E7%BD%AE%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8) ｜ [StatViewServlet 访问控制](https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_StatViewServlet%E9%85%8D%E7%BD%AE) ｜ [WallFilter](https://github.com/alibaba/druid/wiki/%E7%AE%80%E4%BB%8B_WallFilter)

| 检查项 | 重点动作 |
| --- | --- |
| 配置是否生效 | 查看实际 `DataSource` 类型与运行时参数，确认使用的是 Druid，而不是 HikariCP |
| 连接是否耗尽 | 结合活跃连接数、等待线程、慢 SQL、长事务和连接释放情况排查，不要只增大连接池 |
| 监控是否暴露 | `/druid/*` 可能展示 SQL 与运行信息，应同时设置认证和网络访问控制；不需要时关闭 |

使用 Starter 且无需监控页面时，可以显式关闭：

```properties
spring.datasource.druid.stat-view-servlet.enabled=false
```

**该开关只适用于 Starter 管理的监控 Servlet**；手动注册的 `StatViewServlet` 应移除对应注册配置。关闭监控页面不会关闭连接池。

==`allow` 未配置或为空，不代表只允许本机访问==。启用监控时不能只设置访问路径；`wall` 过滤器也不能替代参数化查询与应用权限控制。
