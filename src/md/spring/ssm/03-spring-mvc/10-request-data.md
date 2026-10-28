---
title: 请求参数
shortTitle: 请求参数
description: Controller 通过参数、对象和 Map 接收请求数据的表单与 Java 示例。
author: 流浪码客
isOriginal: true
date: '2019-04-19'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 10
---
# 请求参数

Controller 通过参数、对象和 Map 接收请求数据的表单与 Java 示例。

## 接收请求数据

## 1. 通过方法参数接收

### form.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <form action="/url/post" method="post">
            <input name="username"/>
            <input name="pass_word" type="password"/>
            <input type="submit"/>
        </form>
    </body>
</html>
```

Controller

```java
@PostMapping("/url/post")
@ResponseBody
public String doPost(String username, @RequestParam("pass_word") String password) {
    return "收到用户：" + username;
}
```

以上与下方是两种替代写法，同一 Controller 中只保留一个 `/url/post` 映射。密码使用字符串接收，响应中不回显密码。

## 2. 通过 Java Bean 接收
将表单字段 `pass_word` 修改回 `password`。
新增 User 类

```java
public class User {
    private String username;
    private String password;

    /*在Date类型属性上需要增加@DateTimeFormat()说明前端输入的日期格式*/
    @DateTimeFormat(pattern="yyyyMMdd")
    private Date birthday;

    //Getter and Setter Method
}
```

Controller

```java
/**
 *1.参数接收数据适用场景，小数据的快速处理
 *2.使用实体（JavaBean）进行数据接收，适合接收结构化数据,适合大量数据量的接收
 *3.路径变量是在Restful开发风格中最常用做法
 */
@PostMapping("/url/post")
@ResponseBody
public String doPost(User user) {
    return "收到用户：" + user.getUsername();
}
```

![路径变量是在Restful开发风格中最常用做法：name匹配，自动注入](https://img.geekyspace.cn/pictures/2026/202610271646898.png)

## 3. 通过路径变量接收
路径变量是 Restful 开发风格中最常用做法

```java
/*192.168.1.32/article/123.html*/
@GetMapping("/article/{aid}.html")
@ResponseBody
public String article(@PathVariable("aid") Integer artId) {
    return String.valueOf(artId);
}
```
