---
title: 第五章 Spring Boot Data JPA 快速入门
shortTitle: 快速入门
date: 2019-03-28
description: 使用 Spring Data JPA 连接 MySQL，掌握实体、Repository 和业务事务。
icon: spring
author: 流浪码客
isOriginal: true
category: Spring Boot
tag:
  - Spring Boot 2.x
  - Spring Data JPA
order: 1
---

# 第五章 Spring Boot2.x Data JPA 快速入门

主要官方来源：[Spring Data](https://spring.io/projects/spring-data) ｜ [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
## 1. Spring Data JPA 是什么？

**Spring Data JPA 是 Spring Data 家族中用于简化 JPA 数据访问的模块**。它在 JPA 之上提供 `Repository` 抽象，让我们通过定义接口完成常见的增删改查，减少重复的 DAO 实现代码。

### 1.1 关系示意图（Spring Data、JPA 与 Hibernate）

按“**规范 → 实现 → 项目家族 → 具体封装**”的顺序理解：

| 名称              | 核心定位           | 需要掌握的重点                                                                               |
| --------------- | -------------- | ------------------------------------------------------------------------------------- |
| JPA             | ==定标准：规范==     | 全称 Java Persistence API（Java 持久化 API）；规定对象与表的映射、持久化操作，**本身不提供实现**                     |
| Hibernate       | ==做实现：ORM 框架== | **JPA 的实现之一**，负责实际的持久化操作；Spring Boot JPA Starter 默认使用它                                |
| Spring Data     | ==项目家族==       | 面向不同数据存储提供一致的编程模型，包含 `Spring Data JPA`、`Spring Data Redis`、`Spring Data MongoDB` 等子项目 |
| Spring Data JPA | ==减代码：JPA 封装== | 属于 Spring Data，基于 JPA 提供 **Repository**；底层仍需 Hibernate 等 JPA 实现                       |

**业务代码 → Spring Data JPA → Hibernate（实现 JPA）→ JDBC → 数据库**。

![Spring Data、JPA 与 Hibernate 的关系示意图](http://img.geekyspace.cn/pictures/2026/202610281356486.png)

### 1.2 快速入门🌟

主要是==减少重复的数据访问代码==。具体用法直接对照最新版官方文档：

- **快速入门**：[Getting Started](https://docs.spring.io/spring-data/jpa/reference/jpa/getting-started.html)——看实体与 Repository 如何配合。
- **通用 CRUD**：[Repository 核心概念](https://docs.spring.io/spring-data/jpa/reference/repositories/core-concepts.html)——复用现成的增删改查方法。
- **条件查询**：[方法名派生查询](https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html#repositories.query-methods.query-creation)——如 `findByDname`，无需手写查询语句。
- **分页与排序**：[Paging and Sorting](https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html#repositories.paging-and-sorting)——使用 `Pageable`、`Sort`。
- **自定义查询**：[`@Query`](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.query-methods.at-query)——声明 JPQL 或原生 SQL 查询。

**简化的是重复代码，不是数据库设计与 SQL 优化。**

---

## 2. 实战
本章用部门表演示基本读写，示例类放在 `cn.geekyspace.quickstart` 或其子包下。
### 2.1 依赖与数据源

在第一章的项目中增加：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

这里的 MySQL 驱动坐标对应课程的 2.1.3 父 POM，升级版本时应核对依赖管理，不要混用新旧坐标。
```properties
# 时区问题可以在url后面添加&serverTimezone=GMT%2B8
spring.datasource.url=jdbc:mysql://localhost:3306/demo?serverTimezone=Asia/Shanghai&characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=validate
```

先创建 `demo` 数据库和下表，并在启动环境中设置数据库账号、密码：
```sql
CREATE TABLE dept (
    deptno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dname VARCHAR(100) NOT NULL,
    loc VARCHAR(100)
);
```

`validate` 只校验映射，不自动改表。开发排查时可临时开启 `spring.jpa.show-sql=true`，生产环境不要依靠 `ddl-auto=update` 管理表结构。

### 2.2 实体与 Repository
```java
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "dept")
public class Dept {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deptno;
    private String dname;
    private String loc;

    public Integer getDeptno() { return deptno; }
    public void setDeptno(Integer deptno) { this.deptno = deptno; }
    public String getDname() { return dname; }
    public void setDname(String dname) { this.dname = dname; }
    public String getLoc() { return loc; }
    public void setLoc(String loc) { this.loc = loc; }
}
```

Boot 2 使用 **`javax.persistence.*`**。实体需要无参构造器；上例没有声明构造器，Java 会生成默认无参构造器。
```java
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeptRepository extends JpaRepository<Dept, Integer> {
    List<Dept> findByDname(String dname);
}
```

`JpaRepository<实体类型, 主键类型>` 已提供 `findById`、`findAll`、`save`、`deleteById`，无需自己写实现类。`findByDname` 按实体属性名派生查询。

### 2.3 在 Service 中组织事务
```java
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeptService {
    private final DeptRepository repository;

    public DeptService(DeptRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Dept create(String name, String location) {
        Dept dept = new Dept();
        dept.setDname(name);
        dept.setLoc(location);
        return repository.save(dept);
    }

    @Transactional
    public void rename(Integer id, String name) {
        Dept dept = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("部门不存在"));
        dept.setDname(name);
    }
}
```

- `rename` 中查询到的实体由当前事务管理，属性变化会在提交时同步，不必额外调用 `save`。
- 多次数据库写入要么一起成功、要么一起失败时，将 `@Transactional` 放在统一的 Service 公共方法上。
- 默认对 `RuntimeException` 和 `Error` 回滚；受检异常也需回滚时，使用 `rollbackFor = Exception.class`。
- **调用必须经过 Spring 代理**；同类方法直接调用通常不会触发被调用方法上的事务配置。
- `saveAndFlush` 是同步 SQL，不等于提交事务。

### 2.4 关联映射只记关键点

员工关联部门的典型字段写法，补充到员工实体中：

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "deptno")
private Dept dept;
```

这些注解同样来自 `javax.persistence`。如果需要反向关联，部门集合使用 `@OneToMany(mappedBy = "dept")`；`mappedBy` 指向 Java 属性，不是数据库列。

关联实体不要直接作为接口模型返回：双向关联可能循环序列化，懒加载可能越过事务边界，列表查询还可能触发 N+1 SQL。接口优先返回 DTO，按查询需要选择抓取策略。

## 后续章节

- [5.1 JPA 查询](01-query-methods.md)：方法命名、JPQL 与分页。
- [5.2 MySQL 时区](02-mysql-timezone.md)：区分驱动时区与数据库会话时区。
- [5.3 Druid 连接池](03-druid.md)：仅在旧项目已使用 Druid 时查阅；默认 HikariCP 通常够用。

下一篇：[第六章 MyBatis](../06-mybatis.md)。
