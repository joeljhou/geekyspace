---
title: FreeMarker 整合
shortTitle: FreeMarker 整合
description: FreeMarker 模板语言及 Spring MVC 中的依赖、视图解析器和页面配置。
author: 流浪码客
isOriginal: true
date: '2019-04-20'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
  - FreeMarker
order: 1
---
# FreeMarker 整合

FreeMarker 模板语言及 Spring MVC 中的依赖、视图解析器和页面配置。

## Freemarker 介绍

Freemarker 是免费开源的模板引擎技术
Freemarker 脚本为**F**reemarker **T**emplate **L**anguage（FTL）
FreeMarker 提供了大量内建函数来简化模板开发。

## Spring MVC 集成步骤

1. Maven 依赖 spring-context-support 与 freemarker

```xml
<!--freemarker核心jar-->
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.28</version>
</dependency>
<!--SpringFramework整合第三方支持包-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context-support</artifactId>
    <version>5.1.6.RELEASE</version>
</dependency>
```

2. applicationContext 配置 freemarkerConfig 与 ViewResolver

```xml
<!--FreemarkerViewResolver是Spring-Context-Support提供的整合类，
在IOC容器初始化时通过SpringMVC默认使用Freemarker进行数据展现-->
<bean id="ViewResolver" class="org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver">
    <!--设置响应输出，并解决中文乱码-->
    <property name="contentType" value="text/html;charset=utf-8"/>
    <!--指定Freemarker模板文件拓展名-->
    <property name="suffix" value=".ftl"/>
</bean>

<bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
    <property name="templateLoaderPath" value="/WEB-INF/ftl"/>
    <property name="freemarkerSettings">
        <props>
            <!--设置Freemarker脚本与数据渲染时使用字符集-->
            <prop key="defaultEncoding">UTF-8</prop>
        </props>
    </property>
</bean>
```

3. 在 WEB-INF/ftl 目录下开发 freemarker 模板脚本

![在 WEB-INF/ftl 目录下开发 freemarker 模板脚本](https://img.geekyspace.cn/pictures/2026/202610271647647.png)

```xml
<b>${testString}</b>
```

在 TestController 下

```java
@GetMapping("/test-fm")
public ModelAndView showFreemarkerTestor(){
    ModelAndView mav = new ModelAndView("/test");
    mav.addObject("testString","测试中文");
    return mav;
}
```

访问
![访问：出 应用](https://img.geekyspace.cn/pictures/2026/202610271647648.png)
