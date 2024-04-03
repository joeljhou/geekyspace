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

## 单例作用域（singleton）

单例作用域（singleton scope）是Spring框架中Bean定义的默认作用域。
当你将一个Bean定义为单例作用域时，对所有具有匹配ID或名称的Bean的调用都会返回这个特定的Bean实例。

下图说明了单例作用域：

![singleton](http://img.geekyspace.cn/pictures/2024/singleton.png)

Spring的单例Bean概念与《设计模式》GoF（四人帮）书中定义的单例模式有所不同。

* GoF单例模式通过硬编码对象的作用域，确保每个类加载器（ClassLoader）下，仅有一个特定类的实例被创建
* Spring单例的作用域最好被描述为每个容器（per-container）和每个bean（per-bean）

单例作用域是Spring中的默认作用域。要在XML中将一个Bean定义为单例，参考按照以下示例：

```xml
<bean id="accountService" class="com.something.DefaultAccountService"/>

<!-- 以下是等效的冗余写法（因为单例作用域是默认的） -->
<bean id="accountService" class="com.something.DefaultAccountService" scope="singleton"/>
```

## 原型作用域（prototype）

原型作用域（prototype scope）的Bean部署，意味着每次请求该特定Bean时都会创建一个新的Bean实例。
也就是说，当一个Bean被注入到另一个Bean中，或者通过容器上的`getBean()`方法调用请求它，每次都会产生一个新的实例。
作为一项规则，将原型（prototype）作用域用于所有有状态的Bean，将单例（singleton）作用域用于无状态的Bean。

下图说明了原型作用域：

![prototype](http://img.geekyspace.cn/pictures/2024/prototype.png)

（注意⚠️：以上图片中的数据访问对象（DAO）通常不配置为原型作用域，因为典型的DAO不持有任何会话状态。）

以下示例展示了如何在XML中将一个Bean定义为原型作用域：

```xml
<bean id="accountService" class="com.something.DefaultAccountService" scope="prototype"/>
```

与其他作用域相比，Spring并不管理原型（prototype）Bean的完整生命周期。
容器实例化、配置并组装原型对象，然后将其交给客户端，之后就不会对那个原型实例保持任何记录。
因此，尽管初始化生命周期回调方法（如`@PostConstruct`）会在所有对象上调用，而不考虑作用域，
但在原型作用域的情况下，配置的销毁生命周期回调方法（如`@PreDestroy`）则不会被调用。
客户端代码必须清理原型作用域的对象，并释放原型Bean所持有的昂贵资源。
要让Spring容器释放原型作用域Bean所持有的资源，可以尝试使用一个自定义的[Bean后置处理器](https://docs.spring.io/spring-framework/reference/core/beans/factory-extension.html#beans-factory-extension-bpp)
，该后置处理器持有需要清理的Bean的引用。

在某些方面，Spring容器对于原型（prototype）作用域Bean的角色类似于Java中的`new`运算符。
但是，一旦Spring容器创建并交付原型Bean给客户端，所有生命周期管理的工作都需要由客户端自行处理。
有关Spring容器中Bean的生命周期的详细信息，参阅 [生命周期回调](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-lifecycle)

## 单例Bean与原型Bean依赖

## 请求、会话、应用程序和WebSocket作用域

## 自定义作用域
