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

## ApplicationContextAware和BeanNameAware



## 其他Aware接口

