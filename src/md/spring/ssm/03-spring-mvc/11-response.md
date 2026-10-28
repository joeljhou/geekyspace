---
title: 响应
shortTitle: 响应
description: 对比 ResponseBody 文本响应与 ModelAndView 页面渲染，并保存 JSON 序列化配置。
author: 流浪码客
isOriginal: true
date: '2019-04-19'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 11
---
# 响应

对比 ResponseBody 文本响应与 ModelAndView 页面渲染，并保存 JSON 序列化配置。

## 响应处理的两种方式

- ResponseBody - 产生响应文本
- ModelAndView - 利用模板引擎渲染输出

## 1. 添加 Jackson 依赖

```xml
<!--SpringMVC支持JSON序列化工具包Jackson-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.9.8</version>
</dependency>
<!--注解支持-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.9.8</version>
</dependency>
<!--数据绑定包，自动与SpringMVC整合-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.8</version>
</dependency>
```

## 2. 日期类型处理

```java
/*在Date类型属性上需要增加@DateTimeFormat() 说明前端输入的日期格式*/
@DateTimeFormat(pattern = "yyyyMMdd")
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
private Date birthday;
```

下面使用 `User` 演示返回对象。为避免 `password` 一起序列化，在 `User` 的密码字段或 Getter 上添加 `@JsonIgnore`，实际接口也可以返回只含公开字段的 DTO。

## 3. Service 层

```java
@Service
public class UserServer {
    public User registe(){
        User user = new User();
        user.setUsername("admin");
        user.setPassword("123456");
        user.setBirthday(new Date());
        return user;
    }
}
```

## 4. Controller 层

```java
@Controller
@RequestMapping("/url")
public class URIController {

    @Resource
    private UserServer userServer;

    @GetMapping("/reg")
    @ResponseBody
    public User registe(){
        User user = userServer.registe();
        return user;
    }

    @GetMapping("/reg1")
    public ModelAndView registe1(){
        ModelAndView mav = new ModelAndView("/index.jsp");
        User u = userServer.registe();
        mav.addObject("user",u);//指定别名
        return mav;
    }
}
```

## 5. 创建 index.jsp

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Title</title>
    </head>
    <body>
        <%--使用El表达式--%>
        ${user.username}注册已完成
    </body>
</html>
```

![创建 index.jsp：视频&学习](https://img.geekyspace.cn/pictures/2026/202610271647295.png)
