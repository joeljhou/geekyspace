---
title: 第三章 Thymeleaf 模板引擎入门
shortTitle: 第三章 模板引擎
description: 掌握 Thymeleaf 页面渲染、常用语法和公共片段，分清模板与静态资源，避开配置和使用中的常见问题。
icon: spring
author: 流浪码客
isOriginal: true
date: 2026-10-27
category: Spring Boot
tag:
  - Spring-Boot-2.x
  - Thymeleaf
  - 服务端渲染
order: 3
---

# 第三章 Thymeleaf

主要官方来源：[Thymeleaf 官网](https://www.thymeleaf.org/)
## 1. 概述

**Thymeleaf 是服务端模板引擎，将 HTML 模板与数据组合成完整页面。** 纯 JSON 接口不需要使用模板引擎。

![Thymeleaf 是什么？](http://img.geekyspace.cn/pictures/2026/202610272040442.png)

- **自然模板**：通过 `th:*` 属性增强 HTML。直接打开模板可查看静态原型，经服务端渲染后才会显示动态数据。
- **开箱即用**：Spring Boot 提供 Starter 和自动配置，可配合 Spring MVC 的 Model、表单绑定、国际化使用。
- **片段复用**：公共页头、导航、页脚可提取为模板片段。

> Thymeleaf 3 的 **HTML 模式不要求严格遵循 XML 规范**，`<meta>`、`<input>` 等标签不必写成 XML 自闭合形式。

## 2. 快速上手

### 2.1 添加依赖

在已有 `spring-boot-starter-web` 的项目中添加依赖，版本由 Spring Boot 管理；如果已引入，不要重复添加：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

资源目录分工：

| 目录（位于 `src/main/resources/` 下） | 用途                  | 访问方式                                                      |
| ------------------------------ | ------------------- | --------------------------------------------------------- |
| `templates/`                   | 模板页面，如 `names.html` | 由 Controller 返回视图名后渲染，默认不能通过 `/templates/names.html` 直接访问 |
| `static/`                      | CSS、JS、图片等静态资源      | `static/css/app.css` 对应 `/css/app.css`，URL 不带 `/static`   |

### 2.2 Controller

在启动类所在包或其子包下创建 `PageController.java`：

```java
package cn.geekyspace.quickstart;

import java.util.Arrays;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/names")
    public String names(Model model) {
        model.addAttribute("title", "员工列表");
        model.addAttribute("names", Arrays.asList("CLARK", "KING"));
        return "names";
    }
}
```

- **`Model` 传数据**：页面通过 `${title}`、`${names}` 读取。
- **返回值是视图名**：`"names"` 默认对应 `classpath:/templates/names.html`，不必写路径和后缀。
- **页面用 `@Controller`**：误用 `@RestController` 或 `@ResponseBody`，浏览器只会收到字符串 `names`。

### 2.3 页面html

创建 `src/main/resources/templates/names.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title th:text="${title}">员工列表预览</title>
</head>
<body>
<h1 th:text="${title}">员工列表预览</h1>
<ul>
    <li th:each="name, stat : ${names}">
        <span th:text="${stat.count}">1</span>
        <span th:text="${name}">示例姓名</span>
    </li>
</ul>
<p th:if="${#lists.isEmpty(names)}">暂无数据</p>
<a th:href="@{/names}" href="names.html">刷新列表</a>
</body>
</html>
```

启动项目，访问 `http://localhost:8080/names`，页面显示“员工列表”和 `1 CLARK`、`2 KING`。若已修改端口或上下文路径，访问地址也要相应调整。

模板中的“员工列表预览”“示例姓名”是**静态占位内容**，渲染时会被 `th:text` 替换。

## 3. 常用语法

**表达式取值，`th:*` 属性控制渲染。** 例如 `th:text="${title}"`：`${title}` 读取变量，`th:text` 将结果写入标签内容。

### 3.1 表达式

| 表达式      | 用途                     | 示例                                                       |
| -------- | ---------------------- | -------------------------------------------------------- |
| `${...}` | 读取变量或对象属性              | `${title}`、`${user.name}`                                |
| `*{...}` | 读取 `th:object` 选中对象的属性 | `th:object="${user}"` 范围内的 `*{name}` 等价于 `${user.name}`  |
| `#{...}` | 读取国际化消息                | `#{page.title}`，对应 `messages.properties` 中的 `page.title` |
| `@{...}` | 构建 URL，自动处理上下文路径       | `@{/names}`、`@{/names(page=1)}`                          |
| `~{...}` | 引用模板片段                 | `~{fragments/common :: footer}`                          |

**优先掌握 `${...}` 和 `@{...}`**。例如应用上下文路径为 `/demo` 时，`@{/names}` 会生成 `/demo/names`，避免硬编码路径。

### 3.2 属性

| 属性 | 示例 | 作用 |
| --- | --- | --- |
| `th:text` | `th:text="${title}"` | 替换标签内容，自动转义 HTML |
| `th:utext` | `th:utext="${trustedHtml}"` | 输出不转义的 HTML |
| `th:href` / `th:src` | `th:href="@{/names}"` | 设置链接 / 资源地址 |
| `th:value` | `th:value="${keyword}"` | 设置表单控件值 |
| `th:each` | `th:each="name, stat : ${names}"` | 遍历集合，重复当前元素及其内容 |
| `th:if` / `th:unless` | `th:if="${loggedIn}"` | 条件成立 / 不成立时渲染当前元素及其内容 |

> **用户输入默认用 `th:text`。** `th:utext` 不会转义 HTML，可能引入 XSS；显示富文本前应先进行可靠的 HTML 清洗。

文本与变量组合可使用 `|...|`，不必手工拼接：

```html
<p th:text="|当前页面：${title}|">当前页面</p>
```

### 3.3 遍历状态

页面示例中的 `name` 是当前元素，`stat` 是可选的迭代状态变量：

| 属性 | 含义 |
| --- | --- |
| `stat.index` / `stat.count` | 下标从 **0** 开始 / 序号从 **1** 开始 |
| `stat.size` | 集合大小 |
| `stat.first` / `stat.last` | 是否为第一项 / 最后一项 |
| `stat.odd` / `stat.even` | 当前序号是否为奇数 / 偶数 |

### 3.4 日期

| Java 类型 | 模板写法 |
| --- | --- |
| `java.util.Date` | `${#dates.format(createdAt, 'yyyy-MM-dd HH:mm:ss')}` |
| `java.time.LocalDate` | `${#temporals.format(birthday, 'yyyy-MM-dd')}` |
| `java.time.LocalDateTime` | `${#temporals.format(createdAt, 'yyyy-MM-dd HH:mm:ss')}` |

**`Date` 用 `#dates`，Java Time 类型用 `#temporals`，不要混用。** 本文版本的 Starter 已包含 `thymeleaf-extras-java8time`，由自动配置注册对应方言，可直接使用 `#temporals`。

## 4. 公共片段

在 `templates/fragments/common.html` 中定义页脚：

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<body>
<footer th:fragment="footer">本站页尾</footer>
</body>
</html>
```

在其他模板的 `<body>` 中引用，只提取指定片段，不会引入整个页面：

```html
<div th:replace="~{fragments/common :: footer}"></div>
```

- **`th:replace` 替换当前元素**：结果为 `<footer>本站页尾</footer>`。
- **`th:insert` 保留当前元素**：若改用它，结果为 `<div><footer>本站页尾</footer></div>`。

## 5. 配置

默认配置通常不必修改，了解视图名前后缀即可：

```properties
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
```

开发时在 `application-dev.properties` 中关闭模板缓存，并激活 `dev` 环境：

```properties
spring.thymeleaf.cache=false
```

**关闭缓存不等于自动构建。** 修改 HTML 后，仍需通过 IDE 构建或资源同步，将文件更新到运行时 classpath（如 `target/classes/templates/`），再刷新浏览器。生产环境通常保持默认的 `cache=true`。

## 参考资料

- [Thymeleaf 官网](https://www.thymeleaf.org/)
- [Thymeleaf 3.0 官方教程](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)
- [Tutorial: Thymeleaf + Spring](https://www.thymeleaf.org/doc/tutorials/3.1/thymeleafspring.html)（Thymeleaf 3.1，Spring 集成教程）
- [Spring Boot 2.1.3：开发 Web 应用](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/boot-features-developing-web-applications.html)

上一篇：[第二章 常用配置](02-configuration.md) · 下一篇：[第四章 Web 开发](04-spring-mvc.md)。
