---
title: URL 映射
shortTitle: URL 映射
description: RequestMapping、GetMapping 和 PostMapping 的 URL 绑定及表单请求示例。
author: 流浪码客
isOriginal: true
date: '2019-04-19'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 8
---
# URL 映射

RequestMapping、GetMapping 和 PostMapping 的 URL 绑定及表单请求示例。

## Spring URL Mapping

- @RequestMapping -通用绑定
- @GetMapping - 绑定 GET 请求，常通过路径或查询参数传值
- @PostMapping - 绑定 POST 请求，可通过请求体传输表单、JSON 或二进制数据。

传输是否加密取决于是否使用 HTTPS，不能根据 GET/POST 判断。

## Controller

```java
package com.xhgj.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/url")
public class URLController {

    @GetMapping("/get")
    @ResponseBody
    public String doGet(){
        return "doGet";
    }

    @PostMapping("/post")
    @ResponseBody
    public String doPost(){
        return "doPost";
    }
}
```

## form.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <form action="/url/get" method="get">
            <input name="username"/>
            <input type="submit"/>
        </form>

        <form action="/url/post" method="post">
            <input name="username"/>
            <input type="submit"/>
        </form>
    </body>
</html>
```
