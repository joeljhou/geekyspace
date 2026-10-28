---
title: 第二章 Spring Boot2.x 常用配置
shortTitle: 第二章 常用配置
description: 理清 Web、日期、日志、多环境和自定义属性的配置职责，掌握常用配置与覆盖规则。
icon: spring
author: 流浪码客
isOriginal: true
date: '2019-03-25'
category: Spring Boot
tag:
  - Spring-Boot-2.x
  - 外部化配置
  - Logback
order: 2
---

# 第二章 Spring Boot2.x 常用配置

配置默认放在 `src/main/resources/application.properties` 或 `application.yml`，同一项目尽量统一格式。下面两种写法等价：

```properties
# application.properties
server.port=8081
server.servlet.context-path=/demo
```

```yaml
# application.yml
server:
  port: 8081
  servlet:
    context-path: /demo
```

YAML 使用空格缩进，冒号后面需要空格。下文以 **Spring Boot 2.1.3** 的 `.properties` 写法为主，2.7 的主要差异见第 4 节。

## 1. 常用配置

### 1.1 基础参数

| 配置项                            | 示例值     | 管理什么                                    |
| ------------------------------ | ------- | --------------------------------------- |
| `server.port`                  | `8081`  | 服务监听端口，默认 `8080`                        |
| `server.servlet.context-path`  | `/demo` | 应用访问路径前缀，如 `/demo/hello`，默认根路径          |
| `spring.http.encoding.charset` | `UTF-8` | Servlet 请求、响应的字符编码，不负责配置文件编码            |
| `spring.http.encoding.force`   | `true`  | 强制请求、响应使用配置的字符编码                        |
| `spring.thymeleaf.cache`       | `false` | 是否缓存模板，默认 `true`；仅建议开发环境关闭              |
| `debug`                        | `true`  | 开启部分 Boot 调试信息与自动配置条件报告，不是全局 DEBUG 开关   |
| `spring.jpa.show-sql`          | `true`  | 使用 JPA/Hibernate 时在控制台输出 SQL，默认 `false` |
### 1.2 日期格式

**查询／表单参数走 Spring MVC，JSON 请求／响应通常走 Jackson，两套配置不能互相替代。**

| 配置 / 注解                      | 管理什么                                   | 主要边界                                              |
| ---------------------------- | -------------------------------------- | ------------------------------------------------- |
| `spring.mvc.date-format`     | MVC 查询、表单参数绑定到 `Date` 等传统日期类型时的格式      | 不控制 JSON，也不是 Java Time 类型的通用格式配置                  |
| `spring.jackson.date-format` | Jackson 读写 JSON 时，`Date` 等传统日期类型的字符串格式 | 不控制 MVC 参数绑定，不能统一 `LocalDate`、`LocalDateTime` 的格式 |
| `spring.jackson.time-zone`   | Jackson 日期转换使用的默认时区                    | 不修改 JVM 时区，也不会给 `LocalDateTime` 自动补时区             |
| `@DateTimeFormat`            | 指定字段在 MVC 查询、表单绑定中的日期格式                | 不控制 JSON                                          |
| `@JsonFormat`                | 指定字段在 JSON 序列化、反序列化中的日期格式              | 不控制查询、表单参数绑定                                      |

```properties
# MVC 参数绑定（2.1 写法）
spring.mvc.date-format=yyyy-MM-dd

# Jackson 传统日期类型的格式与时区
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=Asia/Shanghai
```

Java Time 类型需要明确格式时，可在 DTO 字段上配置；同一字段兼顾两种场景，就组合使用两个注解：

```java
@DateTimeFormat(pattern = "yyyy-MM-dd") // 查询 / 表单参数：birthday=2026-10-27
@JsonFormat(pattern = "yyyy-MM-dd")     // JSON 字段："birthday": "2026-10-27"
private LocalDate birthday;
```

**格式决定字符串怎么写，时区决定同一时刻按哪个地区的当地时间表示。**`LocalDateTime` 本身不携带时区，跨时区业务需先约定时间语义，必要时使用 `Instant` 或 `OffsetDateTime`。

## 2. 日志配置

### 2.1 日志体系

默认 Starter 下的调用链：**业务代码 → SLF4J（日志门面）→ Logback（日志实现）→ 控制台／文件**。

![日志门面与日志实现](http://img.geekyspace.cn/pictures/2026/202610271809992.png)

日志级别从低到高为 `TRACE < DEBUG < INFO < WARN < ERROR`。**设置 INFO 表示记录 INFO 及以上级别**；生产环境通常以 INFO 为基线，排查时只对相关包开启 DEBUG。

### 2.2 常用配置

| 配置项（2.1）             | 管理什么                                                   |
| -------------------- | ------------------------------------------------------ |
| `logging.level.root` | 全局基线日志级别，默认 `INFO`                                     |
| `logging.level.<包名>` | 指定包的日志级别，覆盖其继承的级别；可用于查看业务或 MyBatis Mapper 的调试日志        |
| `logging.file`       | 日志文件名或完整路径；默认配置下，设置后同时输出控制台和文件                         |
| `logging.path`       | 日志目录，单独设置时文件名为 `spring.log`；与 `logging.file` 同时设置时后者优先 |
| `logging.config`     | 自定义日志配置文件的位置；一般使用约定的 `logback-spring.xml` 即可           |

```properties
logging.file=./logs/quickstart.log
logging.level.root=INFO
logging.level.cn.geekyspace.quickstart=DEBUG
```

相对日志路径基于**进程工作目录**，不一定是 JAR 所在目录。

```java
private static final Logger log = LoggerFactory.getLogger(HelloController.class);

// 以下放在方法内：使用占位符；记录异常时传入异常对象，保留堆栈
log.info("处理请求，path={}", "/hello");
log.error("处理请求失败", exception);
```

Logger 使用 `org.slf4j` 包；日志中不要记录密码、令牌等敏感信息。

### 2.3 自定义日志

需要定制输出目标、滚动归档、保留天数或按环境切换日志时，可在 `src/main/resources/` 下创建 `logback-spring.xml`，由 Boot 按约定加载。


**这些规则由自定义 XML 决定，不能假定 `logging.file` 会自动覆盖 XML 中写死的路径。**完整 XML、过滤器和 `<springProfile>` 写法在实际使用时再按需生成；应用 Profile 的激活本身不依赖日志文件名。

## 3. 配置管理

### 3.1 多环境配置

**公共配置放主文件，环境差异放 Profile 文件，通过 `spring.profiles.active` 选择环境。**文件均放在 `src/main/resources/`：

| 文件 | 放什么 |
| --- | --- |
| `application.properties` | 各环境共用的配置 |
| `application-dev.properties` | 开发环境：调试日志、关闭模板缓存等 |
| `application-prod.properties` | 生产环境：正常日志、开启模板缓存等 |

```properties
# application-dev.properties
server.port=8081
spring.thymeleaf.cache=false
logging.level.cn.geekyspace.quickstart=DEBUG
```

```bash
# 激活 dev；命令行参数还可覆盖文件里的同名配置，最终监听 8082
java -jar target/quickstart-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev --server.port=8082
```

激活 `dev` 后，**公共配置仍然加载，dev 文件覆盖其中的同名属性**。`spring.profiles.active` 不要写在 Profile 专用文件里；JVM 参数、环境变量和 IDEA 中的激活方式按需查询。

### 3.2 配置优先级

同一个属性出现在多个来源时，以优先级高的为准。普通应用中，常见覆盖关系为：

**命令行参数 > JVM 系统属性 > 操作系统环境变量 > 配置文件。**

例如文件中写了 `server.port=8081`，启动时传入 `--server.port=8082`，最终就是 `8082`。

| 配置项 / 写法 | 管理什么 |
| --- | --- |
| `spring.config.additional-location` | 在默认配置位置之外追加外部配置位置 |
| `spring.config.location` | 替换默认配置位置，误用可能导致原配置不加载 |
| `${DB_PASSWORD}` | 从配置环境中读取值，可用于引用外部注入的密码 |
| `${APP_NAME:quickstart}` | 读取 `APP_NAME`，不存在时使用默认值 `quickstart` |

**不要把真实密码写入仓库，也不要给生产密码设置可用的明文默认值。**JAR 内外、Profile 文件之间的完整覆盖顺序存在版本差异，部署或排查覆盖问题时再核对，不必背完整顺序。

### 3.3 自定义属性

框架配置控制 Spring Boot 行为，业务参数使用自己的前缀即可，**无需另建配置文件**：

```properties
# application.properties
app.name=quickstart
app.page-size=20
```

| 方式 | 适用场景 | 关键点 |
| --- | --- | --- |
| `@Value("${app.name}")` | 读取少量独立属性 | 直接注入到 Spring Bean 中 |
| `@ConfigurationProperties(prefix = "app")` | 将同一前缀下的一组属性绑定到配置对象 | 适合成组配置，支持嵌套结构、松散绑定和配合校验 |

```java
// 少量属性：放在 Spring 管理的 Bean 中
@Value("${app.name}")
private String appName;

@Value("${app.page-size:20}")
private int pageSize;
```

成组配置使用 `@ConfigurationProperties`；在本文的 2.1 中，可用 `@Component` 注册配置类，并通过 setter 绑定属性。`app.page-size` 会映射到 Java 字段 `pageSize`，这叫**松散绑定**。配置类模板、校验及 IDE 提示的接入细节用到时再查。

## 4. 版本兼容：2.1 与 2.7

**先看项目版本，再套配置名。**本文涉及的常用属性变化如下：

| 用途 | 2.1.x 写法 | 2.7 写法 |
| --- | --- | --- |
| 日志文件名 | `logging.file` | `logging.file.name` |
| 日志目录 | `logging.path` | `logging.file.path` |
| MVC 日期参数格式 | `spring.mvc.date-format` | `spring.mvc.format.date` |
| Servlet 字符编码 | `spring.http.encoding.charset` | `server.servlet.encoding.charset` |
| 强制使用字符编码 | `spring.http.encoding.force` | `server.servlet.encoding.force` |

2.4 引入 Config Data 机制，**配置覆盖顺序也有变化**：2.1 中，JAR 内的 Profile 配置可覆盖 JAR 外的普通配置；2.7 默认机制下则是外部普通配置优先。升级时不能只替换属性名。

这些版本均已结束开源维护；本系列用于理解和维护存量项目，新项目应选择仍在维护的版本。

> 本章重点是理解“什么配置管理什么”和配置覆盖关系。滚动日志、IDE 设置、复杂绑定、跨时区处理等具体实现，实际使用时再带上 **Spring Boot 版本、当前配置和目标行为**询问 AI，并结合对应版本的官方文档验证即可。

## 参考资料

- [Spring Boot 2.1.3：外部化配置](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/boot-features-external-config.html)
- [Spring Boot 2.1.3：日志配置](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/boot-features-logging.html)
- [Spring Boot 2.1.3：常用属性表](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/common-application-properties.html)
- [Spring Boot 2.7.18：配置、Profile 与日志](https://docs.spring.io/spring-boot/docs/2.7.18/reference/html/features.html)
- [Spring Boot 2.7.18：属性表](https://docs.spring.io/spring-boot/docs/2.7.18/reference/html/application-properties.html)

上一篇：[第一章 快速上手](01-quickstart.md) · 下一篇：[第三章 模板引擎](03-thymeleaf.md)。
