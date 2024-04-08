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

::: note
线程作用域（Thread Scope）在Spring框架中是可用的，但默认情况下并没有注册。参阅 [SimpleThreadScope](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/SimpleThreadScope.html)。
关于如何注册此Scope或任何其他自定义Scope的说明，参阅 [自定义Scope](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-custom-using)。
:::

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

对于Web作用域的Bean，即`request`、`session`、`application`和`websocket`的Bean，需要进行特定的作用域范围设置，
初始设置取决于你的特定Servlet环境。
对于标准作用域，如`singleton`和`prototype`则不需要进行这些初始设置。

如果你在Spring Web MVC中访问作用域内的Bean，实际上是在Spring `DispatcherServlet`处理的请求中进行访问，
无需进行特殊设置。`DispatcherServlet`已经暴露了所有相关状态。

如果你使用Servlet Web容器，在Spring的`DispatcherServlet`之外处理请求（例如，使用`JSF`），需要进行以下配置：

* 注册`org.springframework.web.context.request.RequestContextListener` `ServletRequestListener`，
  可以通过使用`WebApplicationInitializer`接口以编程方式完成
* 或者，在你的Web应用程序的`web.xml`文件中添加以下声明：

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

其中`DispatcherServlet`、`RequestContextListener`和`RequestContextFilter`都实现相同的作用，
即把HTTP请求对象绑定到正在处理该请求的线程（Thread）上。
这使得请求范围（request-scoped）和会话范围（session-scoped）的Bean在整个调用链下游可用。

### 请求作用域（request）

以下XML示例中Bean的作用域是HTTP请求（request）级别的：

```xml
<bean id="loginAction" class="com.something.LoginAction" scope="request"/>
```

* 对于每个HTTP请求，Spring容器会创建一个新的`LoginAction`实例
* 每个实例独立，状态改变不会影响其他实例
* 请求结束后，相关实例被销毁

可以使用`@RequestScope`注解可将组件限定在请求作用域内：

```java
@RequestScope
@Component
public class LoginAction {
	// ...
}
```

###  会话作用域（session）

以下XML示例中Bean的作用域是HTTP会话（Session）级别的：

```xml
<bean id="userPreferences" class="com.something.UserPreferences" scope="session"/>
```

* 对于单个HTTP会话（Session），Spring容器会创建一个新的`UserPreferences`实例
* 允许会话内状态更改，但不会影响其他会话
* 当HTTP会话（Session）结束时，相关联的Bean实例也会被销毁

可以使用`@SessionScope`注解将组件限定在会话作用域内：

```java
@SessionScope
@Component
public class UserPreferences {
	// ...
}
```

### 应用程序作用域（application）

以下XML示例中Bean的作用域是`ServletContext`级别的：

```xml
<bean id="appPreferences" class="com.something.AppPreferences" scope="application"/>
```

* 对于整个Web应用程序，Spring容器仅会创建一个`AppPreferences`实例，存储在`ServletContext`属性中
* 这类似于Spring的单例Bean，但在两个重要方面有所不同：
    1. 它是每个`ServletContext`的单例，而不是每个Spring `ApplicationContext`
       （在任何给定的Web应用程序中可能有多个`ApplicationContext`）
    2. 它实际上是作为`ServletContext`属性暴露和可见的

可以使用`@ApplicationScope`注解将组件限定在应用程序作用域内：

```java
@ApplicationScope
@Component
public class AppPreferences {
	// ...
}
```

### WebSocket作用域

WebSocket作用域与WebSocket会话的生命周期相关联，适用于基于WebSocket的STOMP应用程序，
详情参阅：[WebSocket作用域](https://docs.spring.io/spring-framework/reference/web/websocket/stomp/scope.html)

### Bean Scope作为依赖项

Spring IoC容器不仅管理对象（Bean）的实例化，还管理协作对象（或依赖项）的注入。
当需要将生命周期较短的Bean（HTTP请求作用域的Bean）注入到生命周期较长的Bean中，可以选择**注入一个AOP代理对象**。
换句话说，你需要注入一个代理对象，具有与被代理Bean相同的接口，能够从相关作用域获取实际的Bean实例，并代理其方法调用。

::: note
你还可以在定义`singleton`作用域的Bean之间使用 `<aop:scoped-proxy/>`，
这样引用就会通过一个可序列化的中间代理进行，因此能够在反序列化时重新获取目标`singleton` Bean。

当对`prototype`作用域的Bean声明`<aop:scoped-proxy/>`时，对共享代理的每个方法调用都会导致创建一个新的目标实例，并将调用转发到新创建的实例上。

此外，作用域代理并不是以生命周期安全的方式从较短作用域中访问Bean的唯一方法。
你还可以将注入点（即构造函数或setter参数或autowired字段）声明为`ObjectFactory<MyTargetBean>`，
允许在每次需要时通过调用`getObject()`来获取当前实例，而无需持有实例或将其分开存储。

作为一个扩展变体，你还可以声明`ObjectProvider<MyTargetBean>`，它提供了几个额外的访问变体，包括`getIfAvailable`
和`getIfUnique`。

JSR-330的变体被称为Provider，使用`Provider<MyTargetBean>`声明，并且每次检索尝试时都需要对应的`get()`调用。有关JSR-330的更多细节，
请参阅[此处](https://docs.spring.io/spring-framework/reference/core/beans/standard-annotations.html)。
:::

以下示例中的配置只有一行，但理解其“为什么（why）”以及“如何（how）”背后的原因同样重要：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/aop
		https://www.springframework.org/schema/aop/spring-aop.xsd">

	<!-- 一个以代理方式暴露的HTTP Session作用域的bean -->
	<bean id="userPreferences" class="com.something.UserPreferences" scope="session">
		<!-- 指示容器对周围的bean进行代理 -->
		<aop:scoped-proxy/> (1) 定义代理的行
	</bean>

	<!-- 一个以单例方式作用域的bean，使用对上述bean的代理进行注入 -->
	<bean id="userService" class="com.something.SimpleUserService">
		<!-- 对代理的userPreferences bean的引用 -->
		<property name="userPreferences" ref="userPreferences"/>
	</bean>
</beans>
```

要创建`userPreferences`代理，需要在作用域Bean定义中插入一个子元素`<aop:scoped-proxy/>`
（参阅[选择要创建的代理类型](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-other-injection-proxies)
和[基于XML模式的配置](https://docs.spring.io/spring-framework/reference/core/appendix/xsd-schemas.html)）。

**为什么在`request`、`session`和自定义作用域层次上的Bean定义需要使用`<aop:scoped-proxy/>`元素？**

考虑以下单例Bean定义，并将其与上述作用域所需的定义进行对比：

```xml
<bean id="userPreferences" class="com.something.UserPreferences" scope="session"/>

<bean id="userManager" class="com.something.UserManager">
    <property name="userPreferences" ref="userPreferences"/>
</bean>
```

如上，单例Bean（`userManager`）被注入了对HTTP会话作用域的Bean（`userPreferences`）的引用。
这里**关键点是**：
* 单例Bean（`userManager`）它在容器中只被实例化一次，并且它的依赖项`userPreferences` Bean也只被注入一次
* 这意味着`userManager` Bean始终操作同一个的`userPreferences`对象（即最初注入时的对象），这不是期望的行为

**问题描述：单例与会话作用域的交互**

当把一个生命周期较短的作用域Bean注入到一个生命周期较长的作用域Bean时，这不是你想要的行为
（例如，在单例Bean中注入一个HTTP Session作用域的协作Bean作为依赖项）。
相反，你需要一个单例的`userManager`对象，而且，在HTTP Session的生命周期内，你需要一个特定于HTTP Session的`userPreferences`对象。

**解决方案：使用代理对象**

因此，容器会创建一个代理对象，具有与被代理Bean相同的接口（最好是一个`UserPreferences`实例），能够从相关作用域获取实际的Bean实例，并代理其方法调用。
容器将这个代理对象注入到`userManager` Bean中，而这个`userManager` Bean并不知道这个`UserPreferences`引用是一个代理。
在这个例子中，当`UserManager`实例调用依赖注入的`UserPreferences`对象上的方法时，实际上是在调用代理上的方法。
然后，代理从HTTP Session中获取真实的`UserPreferences`对象，并将方法调用委托给真实的`UserPreferences`对象。

以下是将请求作用域和会话作用域的 Bean 注入到协作对象中的**正确完整配置**：

```xml
<bean id="userPreferences" class="com.something.UserPreferences" scope="session">
	<aop:scoped-proxy/>
</bean>

<bean id="userManager" class="com.something.UserManager">
	<property name="userPreferences" ref="userPreferences"/>
</bean>
```

#### 选择要创建的代理类型

默认情况下，当Spring容器为使用`<aop:scoped-proxy/>`元素标记的Bean创建代理时，会创建一个基于CGLIB的类代理。

::: note
CGLIB代理只拦截public方法的调用! 不要在这样的代理上调用非public的方法。它们不会被委托给实际的作用域目标对象。
:::

另外，你也可以通过在`<aop:scoped-proxy/>`元素的`proxy-target-class`属性中指定`false`的方式，
配置Spring容器为这些作用域Bean创建基于JDK接口的标准代理。
使用基于JDK接口的代理，意味着你的应用程序 classpath 中不需要额外的库来影响这种代理。
然而，这也意味着作用域Bean的类**必须实现至少一个接口**，并且所有注入该作用域Bean的协作对象必须通过其中一个接口引用该Bean。
以下示例展示了基于接口的代理：

```xml
<!-- DefaultUserPreferences 实现了 UserPreferences 接口 -->
<bean id="userPreferences" class="com.stuff.DefaultUserPreferences" scope="session">
    <aop:scoped-proxy proxy-target-class="false"/>
</bean>

<bean id="userManager" class="com.stuff.UserManager">
    <property name="userPreferences" ref="userPreferences"/>
</bean>
```

关于选择基于类或基于接口的代理的更多详细信息，请参阅 [代理机制](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)。

### 直接注入`request`/`session`引用

作为**工厂作用域的替代方案**，Spring `WebApplicationContext`还支持将
`HttpServletRequest`、`HttpServletResponse`、`HttpSession`、`WebRequest` 
和（如果存在 JSF）`FacesContext`和`ExternalContext`直接注入到Spring管理的Bean中，
只需通过基于类型的自动装配即可，与普通Bean的其他注入点一起。
Spring 通常为这些请求和会话对象注入代理，这样做的好处是可以在单例Bean和可序列化Bean中正常工作，类似于工厂作用域Bean的作用域代理。

## 自定义作用域

Bean作用域机制是可扩展的。你可以定义自己的作用域，甚至重新定义现有的作用域，尽管后者被认为是不良实践，而且你不能覆盖内置的`singleton`和`prototype`作用域。

### 创建自定义 Scope

要将自定义作用域集成到Spring容器中，你需要实现`org.springframework.beans.factory.config.Scope`接口，该接口在本节中有详细描述。
要了解如何实现自定义作用域，请参阅Spring框架自带的Scope实现以及[Scope](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/beans/factory/config/Scope.html)
javadoc，其中更详细地解释了你需要实现的方法。

Scope 接口有四个方法用于从作用域中获取对象、将它们从Scope中移除，以及让对象被销毁。

**获取作用域内的对象**

例如，会话作用域的实现会返回会话作用域的Bean（如果不存在，则该方法会返回该Bean的新实例，并将其绑定到会话中以供将来引用）。
以下方法返回底层作用域中的对象：

```xml
Object get(String name, ObjectFactory<?> objectFactory)
```

**移除作用域内的对象**

例如，会话作用域的实现会从底层会话中移除会话作用域的Bean。
应该返回对象，但如果找不到指定名称的对象，则可以返回`null`。以下方法从底层作用域中移除对象：

```xml
Object remove(String name)
```

**注册销毁回调**

以下方法注册一个回调（callback），该回调在作用域被销毁 或 作用域中的指定对象被销毁时调用：

```xml
void registerDestructionCallback(String name, Runnable destructionCallback)
```

参阅 [javadoc](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/beans/factory/config/Scope.html#registerDestructionCallback)
或 Spring Scope 的实现，以了解更多关于销毁callback的信息。

**获取会话标识符**

以下方法获取底层作用域的会话标识符（conversation id）：

```java
String getConversationId()
```

对于每个作用域，这个标识符是不同的。对于会话作用域的实现，这个标识符（id）可以是会话标识符（session id）。

### 使用自定义 Scope

在编写和测试一个或多个自定义Scope实现之后，你需要让Spring容器知道你的新作用域。
下面的方法是向Spring容器注册新Scope的核心方法：

```java
void registerScope(String scopeName, Scope scope);
```

该方法声明在`ConfigurableBeanFactory`接口上，可以通过大多数Spring ApplicationContext实现中的BeanFactory属性访问到。

`registerScope(..)`方法的第一个参数是与作用域相关联的唯一名称。
Spring容器本身中的示例名称包括`singleton`和`prototype`。
`registerScope(..)`方法的第二个参数是你希望注册和使用的自定义Scope实现的实际实例。

假设你编写了自定义的Scope实现，并按下面的示例进行注册：

::: note
下面的示例使用了`SimpleThreadScope`，它包含在Spring中，但不是默认注册的。对于你自己的自定义Scope实现，注册的步骤是相同的。
:::

```java
Scope threadScope = new SimpleThreadScope();
beanFactory.registerScope("thread", threadScope);
```

接下来可以创建符合你自定义Scope规则的Bean定义，示例如下：

```xml
<bean id="..." class="..." scope="thread">
```

使用自定义Scope实现，你不仅可以通过编程方式注册作用域，还可以通过使用`CustomScopeConfigurer`类进行声明性的作用域注册，示例如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/aop
		https://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean class="org.springframework.beans.factory.config.CustomScopeConfigurer">
        <property name="scopes">
            <map>
                <entry key="thread">
                    <bean class="org.springframework.context.support.SimpleThreadScope"/>
                </entry>
            </map>
        </property>
    </bean>

    <bean id="thing2" class="x.y.Thing2" scope="thread">
        <property name="name" value="Rick"/>
        <aop:scoped-proxy/>
    </bean>

    <bean id="thing1" class="x.y.Thing1">
        <property name="thing2" ref="thing2"/>
    </bean>

</beans>
```

::: note
当你将`<aop:scoped-proxy/>`放置在`FactoryBean`实现的`<bean>`声明内部时，作用域的是工厂Bean本身，而不是从`getObject()`返回的对象。
:::
