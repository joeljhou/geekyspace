---
title: 使用depends-on
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-26
category: Spring
tag: Spring Framework
---

# 使用depends-on

如果一个Bean是另一个Bean的依赖项，这意味着一个Bean被设置为另一个Bean的属性。
可以通过[<ref\/>元素](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-dependson.html#beans-ref-element)
来实现这一点。 然而，有时Bean之间的依赖关系并不那么直接。

举个例子：当一个类中的静态初始化器需要被触发时，比如数据库驱动程序的注册。
`depends-on`属性可以强制容器在初始化`beanOne` Bean之前先初始化指定的`manager` Bean。
以下示例使用`depends-on`属性来表达对单个Bean的依赖：

```xml
<bean id="beanOne" class="ExampleBean" depends-on="manager"/>
<bean id="manager" class="ManagerBean"/>
```

要表达对多个Bean的依赖，可以将多个Bean名称作为`depends-on`属性的值提供（通过逗号、空格和分号进行分隔）：

```xml
<bean id="beanOne" class="ExampleBean" depends-on="manager,accountDao">
    <property name="manager" ref="manager"/>
</bean>

<bean id="manager" class="ManagerBean"/>
<bean id="accountDao" class="x.y.jdbc.JdbcAccountDao"/>
```

> `depends-on`属性不仅可以指定初始化时的依赖关系，而且在
> [单例](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-singleton)
> Bean的情况下，还可以指定相应的销毁时依赖关系。
> `depends-on`指定的依赖Bean会在给定Bean本身被销毁之前被首先销毁。因此，`depends-on`也可以控制关闭顺序。
