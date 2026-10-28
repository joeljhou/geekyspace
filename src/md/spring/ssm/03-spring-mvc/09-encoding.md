---
title: 乱码处理
shortTitle: 乱码处理
description: Spring MVC 响应、GET 和 POST 请求的字符编码配置。
author: 流浪码客
isOriginal: true
date: '2019-04-19'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 9
---
# 乱码处理

Spring MVC 响应、GET 和 POST 请求的字符编码配置。

## 中文乱码配置

## Response 响应乱码 - Spring 配置 StringHttpMessageConverter

在 applicationContext.xml 的 `mvc:annotation-driven` 中添加 `mvc:message-converters` 配置。

```xml
<!--启用SpringMVC的注解模式-->
<mvc:annotation-driven>
    <mvc:message-converters>
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <!--配置支持的媒体类型（MIME）-->
            <property name="supportedMediaTypes">
                <list>
                    <!--响应输出的文本被浏览器作为html进行解释，使用字符集为UTF-8-->
                    <value>text/html;charset=utf-8</value>
                </list>
            </property>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>
```

## GET 请求编码：URIEncoding

在 Connector 上设置 `URIEncoding="UTF-8"`。

![GET 请求编码：URIEncoding：快速访问](https://img.geekyspace.cn/pictures/2026/202610271647666.png)

![GET 请求编码：URIEncoding](https://img.geekyspace.cn/pictures/2026/202610271648194.png)

## POST 请求编码：CharacterEncodingFilter

在 `web.xml` 中配置过滤器。`CharacterEncodingFilter` 不限于 Tomcat，Jetty 同样可以使用；出现无效时应检查过滤器顺序、请求是否已被读取，以及客户端是否声明了编码。

```xml
<filter>
    <filter-name>characterFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>characterFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```
