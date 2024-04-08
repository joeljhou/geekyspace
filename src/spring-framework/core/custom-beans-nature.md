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

在内部，Spring框架使用 BeanPostProcessor 实现来处理它能找到的任何回调接口并调用相应的方法。
如果你需要自定义功能或其他Spring默认不提供的生命周期行为，你可以自己实现一个 BeanPostProcessor。
欲了解更多信息，请参见 容器扩展点。

Spring框架在内部使用`BeanPostProcessor`实现来处理它找到的任何回调接口，并调用适当的方法。
如果你需要自定义功能或其他Spring默认不提供的生命周期行为，你可以自己实现一个`BeanPostProcessor`。 
参阅 [容器扩展点](https://docs.spring.io/spring-framework/reference/core/beans/factory-extension.html)。

除了初始化和销毁回调之外，Spring管理的对象还可以实现`Lifecycle`接口，以便这些对象可以参与由容器自身生命周期驱动的启动和关闭过程。

生命周期回调接口在本节中有详细描述。

### 初始化回调

`org.springframework.beans.factory.InitializingBean`接口允许Bean在容器设置了所有必要属性之后执行初始化工作。
`InitializingBean`接口指定了一个方法：

```java
void afterPropertiesSet() throws Exception;
```

我们建议不要使用`InitializingBean`接口，因为它会将代码不必要地耦合到Spring。
相反，我们建议使用`@PostConstruct`注解或指定一个POJO初始化方法。
在基于XML的配置元数据中，你可以使用`init-method`属性来指定具有`void`无参数签名的方法的名称。
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

上一个示例与以下示例几乎具有相同的效果，以下示例分为两个部分：

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

然而，前面两个示例中的第一个并未将代码与Spring耦合在一起。

::: tip
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




### 默认的初始化和销毁方法

### 结合生命周期机制

### 启动和关闭的回调

### 在非Web应用中优雅地关闭Spring IoC容器


## ApplicationContextAware和BeanNameAware



## 其他Aware接口

