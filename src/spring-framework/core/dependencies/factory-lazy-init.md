---
title: 懒加载（Lazy Initialization）Bean
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-26
category: Spring
tag: Spring Framework
---

# 懒加载（Lazy Initialization）Bean

在Spring框架中，`ApplicationContext`的默认行为是在启动过程中立即创建并配置所有的单例Bean。
这种做法有利于及时发现配置错误或环境问题，避免了错误在应用运行一段时间后才暴露。
然而，如果需要改变这一行为，可以通过设置Bean定义为懒加载（lazy-initialized）来实现。
这样一来，Bean的实例化将被推迟到第一次实际请求该Bean时进行，而不是在应用启动时完成，从而提供了更大的灵活性和控制。

在XML中，通过`<bean/>`元素上的`lazy-init`属性来控制这种行为，如下例所示：

```xml
<!-- 将Bean定义为懒加载 -->
<bean id="lazy" class="com.something.ExpensiveToCreateBean" lazy-init="true"/>
<!-- 默认立即创建Bean -->
<bean name="not.lazy" class="com.something.AnotherBean"/>
```

当上述配置被`ApplicationContext`加载启动时，`lazy` Bean不会立即预实例化，而`not.lazy` Bean则会被急切地预实例化。

然而，当一个懒加载的Bean作为另一个未标记为懒加载单例Bean的依赖项时，`ApplicationContext`会在启动时创建这个懒加载的Bean，
因为它必须满足单例Bean的依赖关系。懒加载的Bean会被注入到一个未标记为懒加载的单例Bean中。

你还可以通过在`<beans/>`元素上使用`default-lazy-init`属性来控制容器级别的懒加载初始化，如下例所示：

```xml
<beans default-lazy-init="true">
	<!-- 不会预实例化任何Bean... -->
</beans>
```
