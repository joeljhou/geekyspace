---
title: Bean定义继承
author: 会敲代码的程序猿
isOriginal: true
date: 2024-04-10
category: Spring
tag: Spring Framework
---

# Bean定义继承

一个Bean定义可以包含大量的配置信息，包括构造函数参数、属性值以及容器特定的信息，比如初始化方法、静态工厂方法名称等等。
一个子Bean定义会从父定义中继承配置数据。子定义可以根据需要覆盖一些值或添加其他值。
使用父子Bean定义可以节省大量的输入工作。实际上，这是一种模板化的形式。

如果你以编程方式使用`ApplicationContext`接口，子Bean定义由`ChildBeanDefinition`类表示。
大多数用户不会在这个层面上直接操作它们。相反，他们会在诸如`ClassPathXmlApplicationContext`之类的类中以声明性方式配置Bean定义。
当你使用基于XML的配置元数据时，可以通过使用`parent`属性指定父Bean来表示子Bean定义，将父Bean作为此属性的值。以下示例展示了如何这样做：

```xml
<!-- 抽象的父Bean定义 -->
<bean id="inheritedTestBean" abstract="true" class="org.springframework.beans.TestBean">
	<property name="name" value="parent"/> <!-- 设置name属性为parent -->
	<property name="age" value="1"/> <!-- 设置age属性为1 -->
</bean>

<!-- 继承父Bean定义的子Bean -->
<bean id="inheritsWithDifferentClass" class="org.springframework.beans.DerivedTestBean"
		parent="inheritedTestBean" init-method="initialize">  
	<property name="name" value="override"/> <!-- 覆盖name属性为override -->
	<!-- age属性的值1将从父Bean继承 -->
</bean>
```

子Bean定义如果未指定Bean类，则会使用父定义中的Bean类，但也可以覆盖它。
在后一种情况下，子Bean类必须与父Bean类兼容（即，它必须接受父Bean的属性值）。

子Bean定义从父Bean继承作用域（Scope）、构造函数参数值、属性值和方法重写，并有添加新值的选项。
你指定的任何作用域、初始化方法、销毁（destroy）方法或静态（static）工厂方法设置都会覆盖相应的父设置。

剩余的设置始终来自于子Bean定义：依赖（depends on）、自动注入（autowire）模式、依赖检查、singleton以及懒加载（lazy init）。

在上面的示例中，通过使用`abstract`属性显式地将父Bean定义标记为抽象。
如果父定义没有指定类，则需要显式地将父Bean定义标记为抽象，如下面的示例所示：

```xml
<!-- 抽象的父Bean定义，未指定类 -->
<bean id="inheritedTestBeanWithoutClass" abstract="true">
    <property name="name" value="parent"/>
    <property name="age" value="1"/>
</bean>

        <!-- 继承父Bean定义的子Bean -->
<bean id="inheritsWithClass" class="org.springframework.beans.DerivedTestBean"
      parent="inheritedTestBeanWithoutClass" init-method="initialize">
    <property name="name" value="override"/> <!-- 覆盖name属性为override -->
    <!-- age 属性将继承父Bean定义中的值1 -->
</bean>
```

父Bean定义不能单独实例化，因为它是不完整的，并且也明确标记为`abstract`。
当一个定义是`abstract`的时候，它只能作为纯模板Bean定义使用，用作子定义的父定义。
尝试单独使用这样的`abstract`父Bean，通过将其作为另一个Bean的`ref`属性引用或者显式地使用`getBean()`方法调用父Bean的ID，都会返回错误。
同样，容器的内部`preInstantiateSingletons()`方法会忽略那些被定义为抽象的Bean定义。

::: note
`ApplicationContext` 默认预设了所有的单例Bean。因此，重要的是（至少对于单例Bean来说），
如果你有一个（父）Bean定义，你打算只作为模板使用，并且这个定义指定了一个类，你必须确保将`abstract`属性设置为
true，否则应用上下文将尝试预实化`abstract` Bean。
:::
