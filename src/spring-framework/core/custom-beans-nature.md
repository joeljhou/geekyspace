---
title: 自定义Bean的性质
author: 会敲代码的程序猿
isOriginal: true
date: 2024-04-08
category: Spring
tag: Spring Framework
---

# 自定义Bean的性质

Spring框架提供了多种接口，你可以使用这些接口来定制Bean的性质。本节将它们分为以下几类：

* [生命周期回调](#生命周期回调) 
* [ApplicationContextAware 和 BeanNameAware](#applicationcontextaware和beannameaware)
* [其他Aware接口](#其他aware接口)

## 生命周期回调

为了与容器管理Bean的生命周期进行交互，你可以实现Spring的`InitializingBean`和`DisposableBean`接口。
容器调用前者的`afterPropertiesSet()`方法以及后者的`destroy()`方法，让Bean在初始化和销毁时执行特定的操作。

::: tip
在现代的Spring应用程序中，通常认为JSR-250的`@PostConstruct`和`@PreDestroy`注解是用于接收生命周期回调最佳实践。
使用这些注解意味着你的Bean不会与Spring特定的接口耦合。参阅 [使用@PostConstruct和@PreDestroy](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/postconstruct-and-predestroy-annotations.html)。

如果你不想使用JSR-250注解，但仍然希望消除耦合，可以考虑使用`init-method`和`destroy-method`的Bean定义元数据。
:::

Spring框架在内部使用`BeanPostProcessor`实现来处理它找到的任何回调接口，并调用适当的方法。
如果你需要自定义功能或其他Spring默认不提供的生命周期行为，你可以自己实现一个`BeanPostProcessor`。 
参阅 [容器扩展点](https://docs.spring.io/spring-framework/reference/core/beans/factory-extension.html)。

除了初始化和销毁回调之外，Spring管理的对象还可以实现`Lifecycle`接口，以便这些对象可以参与由容器自身生命周期驱动的启动和关闭过程。

生命周期回调接口在本节中有详细描述。

### 初始化回调

实现`org.springframework.beans.factory.InitializingBean`接口允许Bean在容器设置了所有必要属性之后执行初始化工作。
`InitializingBean`接口指定了一个方法：

```java
void afterPropertiesSet() throws Exception;
```

我们建议不要使用`InitializingBean`接口，因为它会将代码不必要地耦合到Spring。
相反，我们建议使用`@PostConstruct`注解或指定一个POJO初始化方法。
在基于XML的配置中，你可以使用`init-method`属性来指定具有`void`无参数签名的方法的名称。
对于Java配置，你可以使用`@Bean`的`initMethod`属性。
参阅 [接收生命周期回调](https://docs.spring.io/spring-framework/reference/core/beans/java/bean-annotation.html#beans-java-lifecycle-callbacks)。
考虑以下示例：

```xml
<bean id="exampleInitBean" class="examples.ExampleBean" init-method="init"/>
```

```java
public class ExampleBean {

	public void init() {
		// 做一些初始化工作
	}
}
```

上一个示例与以下示例几乎具有相同的效果：

```xml
<bean id="exampleInitBean" class="examples.AnotherExampleBean"/>
```

```java
public class AnotherExampleBean implements InitializingBean {

	@Override
	public void afterPropertiesSet() {
		// 做一些初始化工作
	}
}
```

然而，前面两个示例中的第一个并未将代码与Spring耦合。

::: note
请注意，`@PostConstruct`和初始化方法一般在容器的单例创建锁内执行。只有在从`@PostConstruct`方法返回后，
Bean实例才被视为完全初始化并准备好发布给其他对象。
这些单独的初始化方法仅用于验证配置状态并可能根据给定的配置准备一些数据结构，但不涉及外部Bean访问相关的进一步活动。
否则，存在初始化死锁的风险。

对于需要触发昂贵的初始化后活动的场景，例如异步数据库准备步骤，你的Bean应该实现
`SmartInitializingSingleton.afterSingletonsInstantiated()`方法，或依赖于上下文刷新事件：实现
`ApplicationListener<ContextRefreshedEvent>`或声明其注解等效的 `@EventListener(ContextRefreshedEvent.class)`。
这些变体在所有常规单例初始化之后，因此不会在任何单例创建锁内。

或者，你可以实现`(Smart)Lifecycle`接口并与容器的整体生命周期管理集成，包括自动启动机制、预销毁停止步骤和潜在的停止/重新启动回调（参见下文）。
:::

### 销毁回调

实现`org.springframework.beans.factory.DisposableBean`接口允许Bean在包含它的容器销毁时获得回调。
`DisposableBean`接口指定了一个方法：

```java
void destroy() throws Exception;
```

我们建议你不要使用 DisposableBean 回调接口，因为它不必要地将代码耦合到Spring。
另外，我们建议使用 @PreDestroy 注解或指定一个bean定义所支持的通用方法。对于基于XML的配置元数据，你可以使用 <bean/> 上的 destroy-method 属性。使用Java配置，你可以使用 @Bean 的 destroyMethod 属性。参见接收生命周期的回调。考虑一下下面的定义。

我们建议不要使用`DisposableBean`回调接口，因为它会将代码不必要地耦合到Spring。
相反，我们建议使用`@PreDestroy`注解或指定一个由Bean定义支持的通用方法。
在基于XML的配置中，你可以在`<bean/>`元素中使用`destroy-method`属性。
在Java配置中，你可以使用`@Bean`的`destroyMethod`属性。
参阅 [接收生命周期回调](https://docs.spring.io/spring-framework/reference/core/beans/java/bean-annotation.html#beans-java-lifecycle-callbacks)。
考虑以下示例：

```xml
<bean id="exampleInitBean" class="examples.ExampleBean" destroy-method="cleanup"/>
```

```java
public class ExampleBean {

    public void cleanup() {
        // 做一些销毁工作(比如释放池连接)
    }
}
```

上一个示例与以下示例几乎具有相同的效果：

```xml
<bean id="exampleInitBean" class="examples.AnotherExampleBean"/>
```

```java
public class AnotherExampleBean implements DisposableBean {

    @Override
    public void destroy() {
        // 做一些销毁工作(比如释放池连接)
    }
}
```

然而，前面两个示例中的第一个并未将代码与Spring耦合。

请注意，Spring还支持推断销毁方法，可以检测到公开的`close`或`shutdown`方法。
这是Java配置类中`@Bean`方法的默认行为，并且自动匹配`java.lang.AutoCloseable`或`java.io.Closeable`实现，也不会将销毁逻辑与Spring耦合。

::: tip
在XML配置中，你可以将`<bean>`元素的`destroy-method`属性设置为一个特殊的(inferred)值。
该值指示Spring自动检测特定Bean类上的public `close`或`shutdown`方法。
另外，你也可以将这个特殊（inferred）值赋给`<beans>`元素的`default-destroy-method`属性，以将此行为应用于一组Bean定义。
（参阅 [默认初始化和销毁方法](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-lifecycle-default-init-destroy-methods)）。
:::

::: note
要实现扩展的关闭阶段，你可以实现`Lifecycle`接口，这样可以在调用任何单例Bean的销毁方法之前接收到早期停止信号。
此外，你还可以实现`SmartLifecycle`接口，用于时间限制的停止步骤，容器将等待所有这类停止处理完成后再继续执行销毁方法。
:::

### 默认的初始化和销毁方法

当你编写初始化和销毁方法时，如果不使用Spring特定`InitializingBean`和`DisposableBean`回调接口，
通常会使用`init()`、`initialize()`、`dispose()`等名称的方法。
理想情况下，这些生命周期回调方法的命名应在项目中标准化，以便所有开发人员使用相同的方法名称并确保一致性。

在Spring中，你可以配置容器来自动"寻找"每个Bean上具有特定名称的初始化和销毁回调方法。
这意味着作为应用开发者，你可以编写应用类并使用名为`init()`的初始化回调，而无需在每个Bean定义中配置`init-method="init"`属性。
Spring IoC容器会在创建Bean时调用该方法
（并且符合[之前描述](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-lifecycle)
的标准生命周期回调约定）。这个特性还可以强制执行初始化和销毁方法回调的一致命名约定。

假设你的初始化回调方法命名为`init()`，销毁回调方法命名为`destroy()`。那么你的类将类似于以下示例中的类：

```java
public class DefaultBlogService implements BlogService {

	private BlogDao blogDao;

	public void setBlogDao(BlogDao blogDao) {
		this.blogDao = blogDao;
	}

	// 这个方法被标记为初始化回调方法
	public void init() {
		if (this.blogDao == null) {
			throw new IllegalStateException("必须设置 [blogDao] 属性");
		}
	}
}
```

然后你可以在一个类似于以下示例的Bean中使用该类：

```xml
<beans default-init-method="init">

    <bean id="blogService" class="com.something.DefaultBlogService">
        <property name="blogDao" ref="blogDao" />
    </bean>

</beans>
```

在顶层`<beans/>`元素中添加`default-init-method`属性会导致Spring IoC容器识别Bean类中名为`init`的方法作为初始化方法的回调。
当创建和组装Bean时，如果Bean类具有这样的方法，它会在适当的时候被调用。

你可以类似地（在XML中）通过在顶层`<beans/>`元素上使用`default-destroy-method`属性来配置销毁方法的回调。

如果现有的Bean类已经有了与约定不符的回调方法的名称，你可以通过在`<bean/>`本身上使用`init-method`和`destroy-method`
属性（在XML中）来覆盖默认值，指定方法的名称。

Spring容器保证在为Bean提供所有依赖项之后立即调用配置的初始化回调。 因此，初始化回调在原始Bean引用上被调用，这意味着AOP拦截器等还没有被应用到Bean上。
首先完全创建目标Bean，然后再应用AOP代理（例如）及其拦截器链。 如果目标Bean和代理是分开定义的，你的代码甚至可以与原始目标Bean交互，绕过代理。
因此，将拦截器应用于`init`方法是不一致的，因为这样做会将目标Bean的生命周期与它的代理或拦截器耦合在一起，当你的代码直接与原始目标Bean交互时，会留下奇怪的语义。

### 组合式生命周期机制

截至Spring 2.5，你有三种选项来控制bean的生命周期行为：

* [InitializingBean](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-lifecycle-initializingbean)
  和[DisposableBean](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-lifecycle-disposablebean)
  回调接口
* 自定义`init()`和`destroy()`方法
* `@PostConstruct`和`@PreDestroy`注解
    1. 你可以组合这些机制来控制Bean的生命周期行为

::: note
如果为一个Bean配置了多种生命周期机制，并且每种机制都配置了不同的方法名称，则每个配置的方法按照本说明后面列出的顺序运行。
然而，如果为这些生命周期机制中的一个或多个配置了相同的方法名称，例如使用`init()`
作为初始化方法的名称，则该方法只会被执行一次，详细说明参考 [上一节](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-lifecycle-default-init-destroy-methods)。
:::

为同一个Bean配置了多个生命周期机制，并且使用了不同的初始化方法时，调用顺序如下：

1. 使用`@PostConstruct`注解的方法
2. 实现`InitializingBean`接口定义的`afterPropertiesSet()`方法
3. 自定义配置的`init()`方法

销毁方法的调用顺序也类似：

1. 使用`@PreDestroy`注解的方法
2. 实现`DisposableBean`接口定义的`destroy()`方法
3. 自定义配置的`destroy()`方法

### 启动和关闭的回调

### 在非Web应用中优雅地关闭Spring IoC容器


## ApplicationContextAware和BeanNameAware



## 其他Aware接口

