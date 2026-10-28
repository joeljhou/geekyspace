---
title: MVC 配置
shortTitle: MVC 配置
description: Spring MVC 依赖、DispatcherServlet、上下文配置和测试 Controller 的搭建过程。
author: 流浪码客
isOriginal: true
date: '2019-04-18'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 7
---
# MVC 配置

Spring MVC 依赖、DispatcherServlet、上下文配置和测试 Controller 的搭建过程。

## SpringMVC 是什么？

SpringMVC 是 Spring 体系的轻量级 Web MVC 框架
SpringMVC 的核心 Controller 控制器，用于处理请求，产生响应
SpringMVC 基于 SpringIOC 容器运行，所有对象被 IOC 管理

## 搭建步骤

### 1. Maven 依赖 spring-webmvc

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.1.6.RELEASE</version>
</dependency>
```

### 2. web.xml 配置 DispatcherServlet

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd" version="4.0">

<servlet>
    <servlet-name>springmvc</servlet-name>
    <!--用于拦截请求，创建对应的Controller进行处理-->
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </init-param>
    <!--在启动时对Servlet进行加载，0代表优先级最高-->
    <load-on-startup>0</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>

</web-app>
```

### 3. 配置 applicationContext 的 MVC 标记

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:p="http://www.springframework.org/schema/p"
xmlns:context="http://www.springframework.org/schema/context"
xmlns:mvc="http://www.springframework.org/schema/mvc"
xsi:schemaLocation=" http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd
http://www.springframework.org/schema/mvc
http://www.springframework.org/schema/mvc/spring-mvc.xsd">

<!-- 启动Spring注解形式扫描对象 -->
<context:component-scan base-package="com.xhgj"/>
<!--启用SpringMVC的注解模式-->
<mvc:annotation-driven/>
<!-- 将静态资源排除在外，用于提高执行效率 -->
<mvc:default-servlet-handler/>

</beans>
```

### 4. 开发测试用 Controller

```java
package com.xhgj.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestController {

    @GetMapping("/test")
    @ResponseBody
    public String test(){
        return "success";
    }
}
```

### 5. 运行测试

![运行测试：视频＆学习](https://img.geekyspace.cn/pictures/2026/202610271647292.png)
