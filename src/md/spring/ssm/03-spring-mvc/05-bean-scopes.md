---
title: Bean 作用域
shortTitle: Bean 作用域
description: Spring 对象作用域，以及 XML、注解与 Java Config 中的单例和多例配置。
author: 流浪码客
isOriginal: true
date: '2019-04-14'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 5
---
# Bean 作用域

Spring 对象作用域，以及 XML、注解与 Java Config 中的单例和多例配置。

![Spring 对象作用域，以及 XML、注解与 Java Config 中的单例和多例配置](https://img.geekyspace.cn/pictures/2026/202610271647701.png)

![Spring 对象作用域，以及 XML、注解与 Java Config 中的单例和多例配置：request - Web请求中单例](https://img.geekyspace.cn/pictures/2026/202610271647707.png)

无状态对象通常适合单例。对象保存可变状态时，需要结合并发访问方式选择作用域；多例作用域也不会自动解决单例依赖的状态问题。

`singleton` 是每个容器、每个 Bean 定义对应一个实例；`prototype` 是每次向容器获取时创建新实例。单例 Bean 直接注入多例 Bean 时，通常仍只在注入时取得一个实例。

## XML 配置

```xml
<!--在Spring创建的时候自动的创建EmpDao对象-->
<bean id="edao" class="com.xhgj.spring.dao.EmpDAO" scope="prototype"/>
<bean id="hrService" class="com.xhgj.spring.service.HrService" scope="prototype">
<!--在IOC容器初始化时，Spring会自动通过setEmpDao()将edao对象注入到empDao属性中-->
<property name="empDAO" ref="edao"/>
</bean>
```

## 注解

```java
@Service
@Scope("prototype")
public class HrService {
    // 业务方法
}
```

## Java Config 配置

```java
@Bean
@Scope("prototype")
public IEmpDAO edao(){
return new EmpDAO();
}

@Bean("hService")
@Scope("prototype")
public HrService hrService(){
HrService hrService = new HrService();
hrService.setEmpDAO(this.edao());
return hrService;
}
```
