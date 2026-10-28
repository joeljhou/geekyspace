---
title: 判断与循环
shortTitle: 判断与循环
description: 参考资料：FreeMarker 分支判断、列表循环及页面模板示例。
author: 流浪码客
isOriginal: true
date: '2019-04-20'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
  - FreeMarker
order: 2
---
# 判断与循环

参考资料：FreeMarker 分支判断、列表循环及页面模板示例。

## 分支判断

![分支判断：条件1成立执行代码](https://img.geekyspace.cn/pictures/2026/202610271647932.png)

```html
<#if (user.salary <= 1000)> <#-- 前提：user 与 salary 已有值 -->
    <h3>低收入人群需要政策补贴</h3>
<#elseif (user.salary>1000 && user.salary<10000)>
    <h3>中等收入人群鼓励创业</h3>
<#else>
    <h3>高收入人群要多做公益</h3>
</#if>

<#-- ??代表属性是否存在，对象存在返回true，不存在放回false -->
<#if manager??>
    manager已存在
<#else>
    manager不存在
</#if>

<#-- FreeMarker 根据布尔表达式选择字符串 -->
${(user.salary<1500)?string("低收入人群","高收入人群")}
```

![manager不存在：list循环迭代](https://img.geekyspace.cn/pictures/2026/202610271647933.png)

## FreemarkerController 下

```java
@GetMapping("/fm/list")
public ModelAndView showList() {
    List<User> list = new ArrayList<>();
    for (int i = 0; i < 100; i++) {
        User user = new User();
        user.setUsername("un" + i);
        user.setName("name" + i);
        user.setSalary(i * 10f);
        list.add(user);
    }
    ModelAndView mav = new ModelAndView("/list");
    mav.addObject("users",list);
    return mav;
}
```

## 在 WEB-INF/ftl 下新建 list.ftl

```html
<ul>
    <#list users as u>
        <li>${u_index +1 }-${u.username}-${u.name}</li>
    </#list>
</ul>
```
