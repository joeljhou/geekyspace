---
title: 第六章 Spring Boot与MyBatis
shortTitle: 第六章 MyBatis
description: 按整合、编码、查询、新增、更新和删除的顺序，通过员工管理案例掌握 Spring Boot 2.x 与 MyBatis。
icon: spring
author: 流浪码客
isOriginal: true
category: Spring Boot
tag:
  - Spring-Boot-2.x
  - MyBatis
  - MySQL
order: 6
---

# 第六章 Spring Boot与MyBatis

![MyBatis](http://img.geekyspace.cn/pictures/2026/202610281556466.png)

MyBatis 是一款持久层框架：**自己编写 SQL，由框架完成参数绑定和结果映射**，减少手动操作 JDBC 的代码。

本章以员工管理为例，按 **整合环境 → 搭建代码 → 查询 → 新增 → 更新 → 删除** 的顺序完成。

## 1.Spring Boot 与 MyBatis 整合

### 1. 创建项目与引入依赖

创建 Spring Boot Web 项目，选择 **Spring Web Starter** 和 **MySQL Driver**：

![Spring Web Starter](http://img.geekyspace.cn/pictures/2026/202610281608433.png)

![MySQL Driver](http://img.geekyspace.cn/pictures/2026/202610281608828.png)

在 `pom.xml` 中确认以下依赖，已有的不要重复添加：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```
### 2. 准备数据库

使用 `scott` 数据库中的员工表 `emp` 和部门表 `dept`。没有课程数据时，可在本地执行以下初始化语句；**已有同名表时先核对结构，不要重复建表或插入数据**。

```sql
-- 创建并切换数据库
CREATE DATABASE IF NOT EXISTS scott DEFAULT CHARACTER SET utf8mb4;
USE scott;

CREATE TABLE dept (
    deptno INT PRIMARY KEY COMMENT '部门编号',
    dname VARCHAR(50) NOT NULL COMMENT '部门名称',
    loc VARCHAR(50) COMMENT '部门所在地'
) ENGINE=InnoDB COMMENT='部门表';

-- InnoDB 支持事务；DECIMAL(10, 2) 表示共 10 位数字、含 2 位小数
CREATE TABLE emp (
    empno INT AUTO_INCREMENT PRIMARY KEY COMMENT '员工编号，自增',
    ename VARCHAR(50) NOT NULL COMMENT '员工姓名',
    job VARCHAR(50) COMMENT '职位',
    mgr INT COMMENT '直属上级的员工编号',
    hiredate DATE COMMENT '入职日期',
    sal DECIMAL(10, 2) COMMENT '工资',
    comm DECIMAL(10, 2) COMMENT '佣金',
    deptno INT COMMENT '部门编号，对应 dept.deptno'
) ENGINE=InnoDB COMMENT='员工表';

-- 初始化部门：20 研发部，30 销售部
INSERT INTO dept (deptno, dname, loc) VALUES
    (20, 'RESEARCH', 'DALLAS'), (30, 'SALES', 'CHICAGO');

-- 员工编号自动生成；未提供的 mgr、comm 默认为 NULL
INSERT INTO emp (ename, job, hiredate, sal, deptno) VALUES
    ('SMITH', 'CLERK', '2019-03-01', 800.00, 20),
    ('ALLEN', 'SALESMAN', '2019-03-02', 1600.00, 30);
```

### 3. 配置数据源与 MyBatis

**`src/main/resources/application.properties`**：

```properties
# 数据源：在运行配置的环境变量中设置 DB_USERNAME、DB_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/scott?serverTimezone=Asia/Shanghai&characterEncoding=UTF-8
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# MyBatis：全局配置、SQL 映射文件、实体别名包
mybatis.config-location=classpath:mybatis/mybatis-config.xml
mybatis.mapper-locations=classpath:mybatis/mapper/*.xml
mybatis.type-aliases-package=cn.geekyspace.springbootmybatis.entity

# 开发调试：打印 SQL，格式化 JSON
logging.level.cn.geekyspace.springbootmybatis.mapper=debug
spring.jackson.serialization.indent-output=true
```

**`src/main/resources/mybatis/mybatis-config.xml`**：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```

`mapUnderscoreToCamelCase` 支持 `hire_date → hireDate` 这样的映射，本例列名与属性名一致，不依赖它。若改用 `mybatis.configuration.*` 配置设置项，需要移除 `config-location`，两种方式不能同时使用。

## 2.编码：搭建基础结构

这一节只创建实体、接口和类的骨架，**具体业务方法在后续操作中追加**。

### 1. 项目结构

![目录结构](http://img.geekyspace.cn/pictures/2026/202610281609448.png)

本例统一使用包名 `cn.geekyspace.springbootmybatis`，文件对应如下：

```text
src/main/
├── java/cn/geekyspace/springbootmybatis/
│   ├── SpringbootMybatisApplication.java
│   ├── entity/Emp.java
│   ├── mapper/EmpMapper.java
│   ├── service/EmpService.java
│   └── controller/EmpController.java
└── resources/
    ├── application.properties
    └── mybatis/
        ├── mybatis-config.xml
        └── mapper/emp.xml
```

启动类放在根包下，沿用项目生成的 `@SpringBootApplication`。调用关系为：

`HTTP 请求 → EmpController → EmpService → EmpMapper → emp.xml → 数据库`

### 2. 员工实体

**`entity/Emp.java`**：

```java
package cn.geekyspace.springbootmybatis.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Emp {
    private Integer empno;
    private String ename;
    private String job;
    private Integer mgr;
    private LocalDate hiredate;
    private BigDecimal sal;
    private BigDecimal comm;
    private Integer deptno;

    // 使用 IDE 为以上全部字段生成 Getter、Setter
}
```

金额使用 `BigDecimal`，日期使用 `LocalDate`，JSON 日期格式为 `yyyy-MM-dd`。普通 Java 实体即可，不需要 JPA 注解。

### 3. Mapper 接口与 XML

**`mapper/EmpMapper.java`**：

```java
package cn.geekyspace.springbootmybatis.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmpMapper {
    // 后续追加查询、新增、更新和删除方法
}
```

`@Mapper` 使接口被扫描并注册到 Spring，由 MyBatis 生成代理实现，不需要手写实现类。

**`src/main/resources/mybatis/mapper/emp.xml`**：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.geekyspace.springbootmybatis.mapper.EmpMapper">
    <!-- 后续追加 select、insert、update、delete 节点 -->
</mapper>
```

映射规则只需记住三点：

- `namespace` = Mapper 接口的**全限定名**。
- SQL 节点的 `id` = 接口**方法名**。
- `resultType` = 每条查询结果的类型；实体别名 `Emp` 来自前面的 `type-aliases-package`。

### 4. Service 与 Controller

**`service/EmpService.java`**：

```java
package cn.geekyspace.springbootmybatis.service;

import cn.geekyspace.springbootmybatis.mapper.EmpMapper;
import org.springframework.stereotype.Service;

@Service
public class EmpService {
    private final EmpMapper empMapper;

    public EmpService(EmpMapper empMapper) {
        this.empMapper = empMapper;
    }
}
```

**`controller/EmpController.java`**：

```java
package cn.geekyspace.springbootmybatis.controller;

import cn.geekyspace.springbootmybatis.service.EmpService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emps")
public class EmpController {
    private final EmpService empService;

    public EmpController(EmpService empService) {
        this.empService = empService;
    }
}
```

> 下文按文件名追加代码，省略的 `import` 由 IDE 补齐；XML 片段放在现有 `<mapper>` 内，不要再创建根节点。事务注解统一使用 Spring 的 `org.springframework.transaction.annotation.Transactional`。

## 3.查询数据 Query

### 1. 按编号查询员工

**EmpMapper**：

```java
Emp findById(@Param("empno") Integer empno);
```

**emp.xml**：

```xml
<select id="findById" resultType="Emp">
    SELECT empno, ename, job, mgr, hiredate, sal, comm, deptno
    FROM emp
    WHERE empno = #{empno}
</select>
```

`@Param("empno")` 与 `#{empno}` 对应。**`#{}` 用于预编译参数绑定，不要用 `${}` 拼接用户输入**。

**EmpService**：

```java
public Emp findById(Integer empno) {
    return empMapper.findById(empno);
}
```

**EmpController**：

```java
@GetMapping("/{empno}")
public Emp findById(@PathVariable("empno") Integer empno) {
    Emp emp = empService.findById(empno);
    if (emp == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "员工不存在");
    }
    return emp;
}
```

启动项目后访问 `GET http://localhost:8080/emps/1`，存在则返回员工 JSON，不存在则返回 `404`。

### 2. 按部门和工资动态查询

查询**指定部门中工资大于指定值的员工**，两个条件都可选，同时返回部门信息。

**EmpMapper**：

```java
List<Map<String, Object>> findEmps(@Param("dname") String dname,
                                 @Param("sal") BigDecimal sal);
```

**emp.xml**：

```xml
<select id="findEmps" resultType="java.util.LinkedHashMap">
    SELECT e.empno, e.ename, e.job, e.mgr, e.hiredate,
           e.sal, e.comm, e.deptno, d.dname, d.loc
    FROM emp e
    LEFT JOIN dept d ON e.deptno = d.deptno
    <where>
        <if test="dname != null and dname != ''">
            AND d.dname = #{dname}
        </if>
        <if test="sal != null">
            AND e.sal &gt; #{sal}
        </if>
    </where>
    ORDER BY e.empno
</select>
```

- `<if>`：有参数时才追加条件；`<where>`：自动生成 `WHERE` 并去掉开头多余的 `AND`。
- `resultType="java.util.LinkedHashMap"`：每一行映射成一个 Map，键为列名，值为对应数据；不需要为本例额外创建部门实体。
- 多参数用 `@Param` 命名，比手动构造参数 Map 更直观。

**EmpService**：

```java
public List<Map<String, Object>> findEmps(String dname, BigDecimal sal) {
    return empMapper.findEmps(dname, sal);
}
```

**EmpController**：

```java
@GetMapping
public List<Map<String, Object>> findEmps(
        @RequestParam(name = "dname", required = false) String dname,
        @RequestParam(name = "sal", required = false) BigDecimal sal) {
    return empService.findEmps(dname, sal);
}
```

验证查询，控制台可查看实际 SQL 和绑定参数：

```bash
# 查询全部员工及其部门信息
curl 'http://localhost:8080/emps'

# 查询 SALES 部门中工资大于 1000 的员工
curl 'http://localhost:8080/emps?dname=SALES&sal=1000'
```

无匹配结果返回 `[]`；真实业务列表还应增加分页。

## 4.新增数据 Insert

### 1. Mapper 与主键回填

**EmpMapper**：

```java
int create(Emp emp);
```

**emp.xml**：

```xml
<insert id="create" useGeneratedKeys="true" keyProperty="empno">
    INSERT INTO emp (ename, job, mgr, hiredate, sal, comm, deptno)
    VALUES (#{ename}, #{job}, #{mgr}, #{hiredate}, #{sal}, #{comm}, #{deptno})
</insert>
```

`empno` 必须是自增主键。`useGeneratedKeys` 获取数据库生成的编号，`keyProperty` 将编号写回 `emp.empno`。

**方法返回的 `int` 是受影响行数，主键通过 `emp.getEmpno()` 获取。** MySQL 也可用 `<selectKey>` 执行 `SELECT LAST_INSERT_ID()` 获取自增主键，本例不再重复配置。

### 2. Service 与 Controller

**EmpService**：

```java
@Transactional(rollbackFor = Exception.class)
public Emp create(Emp emp) {
    emp.setEmpno(null); // 主键由数据库生成
    empMapper.create(emp);
    return emp;
}
```

写操作的事务放在 Service 公共方法上，通过 Spring Bean 调用才会经过事务代理。`rollbackFor = Exception.class` 将受检异常也纳入回滚；不要吞掉需要触发回滚的异常。

**EmpController**：

```java
@PostMapping
public ResponseEntity<Emp> create(@RequestBody Emp emp) {
    if (emp.getEname() == null || emp.getEname().trim().isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "员工姓名不能为空");
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(empService.create(emp));
}
```

### 3. 验证新增

```bash
curl -i -X POST 'http://localhost:8080/emps' \
  -H 'Content-Type: application/json' \
  -d '{"ename":"Tom","job":"SALESMAN","hiredate":"2019-03-30","sal":2000.00,"deptno":30}'
```

返回 `201 Created`，响应对象中包含回填的 `empno`。**记下实际编号，后续更新和删除均使用该测试员工**，不要假定编号一定为 `3`。

## 5.更新数据 Update

### 1. Mapper 与 SQL

**EmpMapper**：

```java
int update(Emp emp);
```

**emp.xml**：

```xml
<update id="update">
    UPDATE emp
    SET ename = #{ename}, job = #{job}, mgr = #{mgr},
        hiredate = #{hiredate}, sal = #{sal}, comm = #{comm}, deptno = #{deptno}
    WHERE empno = #{empno}
</update>
```

本例是**完整字段更新**：未提供的可空字段会写成 `NULL`，不是只更新非空字段。`WHERE` 用于限定目标员工，不能遗漏。

### 2. Service 与 Controller

**EmpService**：

```java
@Transactional(rollbackFor = Exception.class)
public boolean update(Emp emp) {
    if (empMapper.findById(emp.getEmpno()) == null) {
        return false;
    }
    empMapper.update(emp);
    return true;
}
```

先查存在性，避免将“字段值未变化”误判为“员工不存在”；该写法仅用于演示，不保证并发安全。

**EmpController**：

```java
@PutMapping("/{empno}")
public Emp update(@PathVariable("empno") Integer empno, @RequestBody Emp emp) {
    if (emp.getEname() == null || emp.getEname().trim().isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "员工姓名不能为空");
    }
    emp.setEmpno(empno); // 以 URL 中的编号为准
    if (!empService.update(emp)) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "员工不存在");
    }
    return emp;
}
```

### 3. 验证更新

```bash
# 替换为新增接口实际返回的编号
EMPNO=3

# 更新测试员工，预期返回 200 和更新后的对象
curl -i -X PUT "http://localhost:8080/emps/$EMPNO" \
  -H 'Content-Type: application/json' \
  -d '{"ename":"Tom","job":"SALESMAN","mgr":null,"hiredate":"2019-03-30","sal":2500.00,"comm":null,"deptno":30}'

# 再查询，确认 sal 已变为 2500.00
curl "http://localhost:8080/emps/$EMPNO"
```

## 6.删除数据 Delete

### 1. Mapper 与 SQL

**EmpMapper**：

```java
int delete(@Param("empno") Integer empno);
```

**emp.xml**：

```xml
<delete id="delete">
    DELETE FROM emp WHERE empno = #{empno}
</delete>
```

### 2. Service 与 Controller

**EmpService**：

```java
@Transactional(rollbackFor = Exception.class)
public boolean delete(Integer empno) {
    return empMapper.delete(empno) > 0;
}
```

受影响行数大于 `0` 表示删除到记录。

**EmpController**：

```java
@DeleteMapping("/{empno}")
public ResponseEntity<Void> delete(@PathVariable("empno") Integer empno) {
    if (!empService.delete(empno)) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "员工不存在");
    }
    return ResponseEntity.noContent().build();
}
```

### 3. 验证删除

沿用上一节的 `EMPNO`，只删除本次新增的测试员工：

```bash
# 删除成功返回 204 No Content
curl -i -X DELETE "http://localhost:8080/emps/$EMPNO"

# 再次查询返回 404 Not Found
curl -i "http://localhost:8080/emps/$EMPNO"
```

---

排错时依次检查：**Mapper 是否被扫描 → XML 路径是否正确 → `namespace`、`id`、参数名是否对应**。

本例用于本地学习；生产环境还需 DTO、参数校验和权限控制，并避免打印敏感 SQL 参数。

参考：[MyBatis Spring Boot Starter](https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/)

上一篇：[第五章 数据访问](05-data-jpa/README.md) · 下一篇：[第七章 打包部署](07-deployment.md)。
