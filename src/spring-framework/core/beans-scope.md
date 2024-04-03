---
title: Bean作用域（Scope）
author: 会敲代码的程序猿
isOriginal: true
date: 2024-04-03
category: Spring
tag: Spring Framework
---

# Bean作用域（Scope）

当你创建一个Bean定义时，实际上是在创建Bean定义所定义类的实际实例的配方。
将Bean定义视为“配方”的概念非常重要，因为它意味着，就像一个类一样，你可以从一个单一的“配方”中创建多个对象实例。

你不仅可以控制Bean定义中的各种依赖项和配置值，还可以控制由Bean定义创建的对象的作用域（scope）。
这种方法是强大且灵活的，因为你可以通过配置选择创建的对象的作用域，而不必在Java类级别上固定对象的作用域。
Bean定义可以是多种作用域之一。Spring框架支持六种作用域，其中四种仅在使用Web感知（aware）的`ApplicationContext`时才可用。
你还可以创建[自定义作用域](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-custom)。

| Bean作用域（Scope） | 描述                                   |
|----------------|--------------------------------------|
| singleton      | (默认) 在整个应用程序中只创建一个Bean实例             |
| prototype      | 每次请求时，创建一个新的Bean实例                   |
| request        | Web程序中，为每个HTTP请求创建一个Bean实例           |
| session        | Web程序中，为每个HTTP会话创建一个Bean实例           |
| application    | Web程序中，为每个`ServletContext`创建一个Bean实例 |
| websocket      | Web程序中，为每个`WebSocket`连接创建一个Bean实例    |

> 线程作用域（Thread
> Scope）在Spring框架中是可用的，但默认情况下并没有注册。参阅 [SimpleThreadScope](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/SimpleThreadScope.html)。
> 关于如何注册此Scope或任何其他自定义Scope的说明，参阅 [自定义Scope](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-custom-using)。


