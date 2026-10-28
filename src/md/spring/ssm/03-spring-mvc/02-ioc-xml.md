---
title: XML 配置
shortTitle: XML 配置
description: Spring Context Maven 依赖及通过 XML 配置 IoC 容器的步骤。
author: 流浪码客
isOriginal: true
date: '2019-04-13'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 2
---
# XML 配置

Spring Context Maven 依赖及通过 XML 配置 IoC 容器的步骤。

![Spring Context Maven 依赖及通过 XML 配置 IoC 容器的步骤](https://img.geekyspace.cn/pictures/2026/202610271647293.png)

## XML 方式

### 1. 在 pom.xml 中引入 spring-context

```xml
<!--https://mvnrepository.com/artifact/org.springframework/spring-context-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.1.6.RELEASE</version>
</dependency>
```

### 2. 配置 applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd">
<!--在Spring创建的时候自动的创建EmpDao对象-->
<bean id="edao" class="com.xhgj.spring.dao.EmpDAO"/>

<bean id="hrService" class="com.xhgj.spring.service.HrService">
<!--在IOC容器初始化时，Spring会自动通过setEmpDao()将edao对象注入到empDao属性中-->
<property name="empDAO" ref="edao"/>
</bean>
</beans>
```

### 3. IEmpDAO 接口

```java
public interface IEmpDAO{
    public void create();
}
```

### 4. EmpDAO 实现

```java
public class EmpDAO implements IEmpDAO {

    public EmpDAO() {
        System.out.println("正在初始..."+this);
    }

    @Override
    public void create() {
        System.out.println(this+"员工创建成功");
    }
}
```

### 5. HrService

```java
/**
 * Create by 周宇
 * 2019-04-13 13:40
 * 人力资源业务
 */
public class HrService {
    public HrService() {
        System.out.println("正在创建："+this);
    }
    // IEmpDAO empDAO = new EmpDAO();//原始

    IEmpDAO empDAO = null;
    public IEmpDAO getEmpDAO() { return empDAO;}
    public void setEmpDAO(IEmpDAO empDAO) {
        System.out.println("调用setEmpDAO："+empDAO);
        this.empDAO = empDAO;
    }

    public void entry(){
        empDAO.create();
    }
}
```

### 6. Application

```java
/**
 * Create by 周宇
 * 2019-04-13 13:33
 */
public class Application {
    public static void main(String[] args) {
        //初始化Spring IOC容器，同时根据Xml来创建对象
        ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");

        IEmpDAO empDAO = (IEmpDAO) ctx.getBean("edao");
        empDAO.create();

        HrService hrService = (HrService) ctx.getBean("hrService");
        hrService.entry();
    }
}
```

![//初始化Spring IOC容器，同时根据Xml来创建对象：利用Spring将引用解耦](https://img.geekyspace.cn/pictures/2026/202610271647294.png)

## 依赖查询

- [Spring Context Maven 坐标](https://mvnrepository.com/artifact/org.springframework/spring-context)
