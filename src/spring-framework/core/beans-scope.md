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
>
Scope）在Spring框架中是可用的，但默认情况下并没有注册。参阅 [SimpleThreadScope](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/SimpleThreadScope.html)。
>
关于如何注册此Scope或任何其他自定义Scope的说明，参阅 [自定义Scope](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-custom-using)。

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

当你在单例作用域的Bean中使用对原型作用域Bean的依赖时，请注意依赖关系是在实例化时解析的。
因此，如果你将一个原型作用域的Bean注入到一个单例作用域的Bean中，将会实例化一个新的原型Bean，然后将其依赖注入到单例Bean中。
这个原型实例是唯一供给单例作用域Bean的实例。

然而，假设你希望单例作用域的Bean在运行时重复获取原型作用域的Bean的新实例。
你不能将一个原型作用域的Bean注入到你的单例Bean中，因为这种注入只会在Spring容器实例化单例Bean并解析并注入其依赖时发生一次。
如果你需要在运行时多次获取原型Bean的新实例，参阅 [方法注入（Method Injection）](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-method-injection.html)。

## 请求、会话、应用程序和WebSocket作用域

`request`、`session`、`application`和`webSocket`作用域只有在使用Web感知（aware）的Spring应用程序上下文实现，
如`XmlWebApplicationContext`时才可用。
如果你在常规的Spring IoC容器中使用这些作用域，比如`ClassPathXmlApplicationContext`，
将会抛出一个IllegalStateException异常，提示未知的Bean作用域。

### 初始Web配置

为了支持对`request`、`session`、`application`和`websocket`级别的Bean进行作用域范围设置（即Web作用域的Bean），
在定义Bean之前需要进行一些简单的初始配置。（对于标准作用域：单例（`singleton`）和原型（`prototype`）则不需要进行这些初始设置。）

你如何完成这个初始设置取决于你的特定Servlet环境。

如果你在Spring Web MVC中访问作用域内的Bean，实际上是在一个由Spring `DispatcherServlet`处理的请求（request）中进行访问，
无需进行特殊设置。`DispatcherServlet`已经暴露了所有相关状态。

如果你使用Servlet Web容器，在Spring的 DispatcherServlet 之外处理请求（例如，在使用JSF时），
你需要注册 org.springframework.web.context.request.RequestContextListener ServletRequestListener。
这可以通过使用 WebApplicationInitializer 接口以编程方式完成。或者，在你的Web应用程序的 web.xml 文件中添加以下声明。

如果你使用Servlet Web容器，在Spring的`DispatcherServlet`之外处理请求（例如，使用JSF），
你需要注册`org.springframework.web.context.request.RequestContextListener` `ServletRequestListener`。
可以通过使用`WebApplicationInitializer`接口以编程方式完成。或者，在你的Web应用程序的`web.xml`文件中添加以下声明：

```xml
<web-app>
    ...
    <listener>
        <listener-class>
            org.springframework.web.context.request.RequestContextListener
        </listener-class>
    </listener>
    ...
</web-app>
```

如果你在设置监听器（listener）时遇到问题，可以考虑使用Spring的`RequestContextFilter`。
过滤器（filter）的映射取决于周围Web应用程序的配置，因此你需要根据实际情况进行适当的调整。
以下示例展示了Web应用中过滤器的部分配置：

```xml
<web-app>
    ...
    <filter>
        <filter-name>requestContextFilter</filter-name>
        <filter-class>org.springframework.web.filter.RequestContextFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>requestContextFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    ...
</web-app>
```

`DispatcherServlet`、`RequestContextListener`和`RequestContextFilter`都执行着相同的作用，即把HTTP请求对象绑定到正在处理该请求的线程（Thread）上。
这使得**请求范围**（request-scoped）和**会话范围**（session-scoped）的Bean在整个调用链中更下游可用。

### Request Scope

以下是一个用于定义Bean的XML配置的示例：

```xml
<bean id="loginAction" class="com.something.LoginAction" scope="request"/>
```

Spring容器使用`loginAction` Bean定义为每个HTTP请求创建一个新的`LoginAction` Bean实例。
换句话说，`loginAction` Bean的作用域是HTTP请求级别的。
你可以随意更改创建的实例的内部状态，因为从同一个`loginAction` Bean定义中创建的其他实例不会看到这些状态的变化。
它们是针对单个请求的特定状态。当请求完成处理时，该请求所涉及的Bean会被丢弃。

当使用注解驱动（annotation-driven）的组件或Java配置时，你可以使用`@RequestScope`注解将组件分配到请求作用域（Request Scope）。
以下示例展示了如何实现：

```java
@RequestScope
@Component
public class LoginAction {
	// ...
}
```

### Session Scope

以下是一个用于定义Bean的XML配置的示例：

```xml
<bean id="userPreferences" class="com.something.UserPreferences" scope="session"/>
```

Spring容器使用`userPreferences` Bean定义为单个HTTP 会话（Session）的生命周期创建一个新的`UserPreferences` Bean实例。
换句话说，`userPreferences` Bean的作用域实际上是HTTP会话级别的。
与[请求作用域](#request-scope)的Bean一样，你可以随意更改创建的实例的内部状态，
因为其他使用相同`userPreferences` Bean定义创建的实例所在的HTTP会话实例不会看到这些状态的变化，因为它们是针对单个HTTP会话的特定状态。
当HTTP会话（Session）最终被丢弃时，与该特定HTTP会话范围关联的Bean也会被丢弃。

当使用注解驱动（annotation-driven）的组件或Java配置时，你可以使用`@SessionScope`注解将组件分配到会话作用域（Session Scope）。
以下示例展示了如何实现：

```java
@SessionScope
@Component
public class UserPreferences {
	// ...
}
```

### Application Scope

以下是一个用于定义Bean的XML配置的示例：

```xml
<bean id="appPreferences" class="com.something.AppPreferences" scope="application"/>
```

Spring容器使用`appPreferences` Bean定义为整个Web应用程序创建一个新的`AppPreferences` Bean实例。
换句话说，`appPreferences` Bean的作用域是`ServletContext`级别，并作为常规的`ServletContext`属性存储。
这与Spring的单例Bean有些类似，但有两个重要区别：

1. 它是每个`ServletContext`的单例，而不是每个Spring `ApplicationContext`（在任何给定的Web应用程序中可能有多个ApplicationContext） 
2. 并且它实际上是作为`ServletContext`属性暴露和可见的

当使用注解驱动（annotation-driven）的组件或Java配置时，你可以使用`@ApplicationScope`注解将组件分配到应用程序作用域（Application Scope）。
以下示例展示了如何实现：

```java
@ApplicationScope
@Component
public class AppPreferences {
	// ...
}
```

### WebSocket Scope

WebSocket作用域与WebSocket会话的生命周期相关联，适用于基于WebSocket的STOMP应用程序，
详情参阅：[WebSocket作用域](https://docs.spring.io/spring-framework/reference/web/websocket/stomp/scope.html)

### Bean Scope作为依赖项

## 自定义作用域

### 创建自定义 Scope

### 使用自定义 Scope

