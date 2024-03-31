---
title: 依赖和配置详解
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-26
category: Spring
tag: Spring Framework
---

# 依赖和配置详解

正如前一节所述，您可以将`Bean`属性和构造函数参数定义为对其它==托管Bean（协作者）的引用==或==内联定义的值==。
Spring基于XML的配置元数据支持`<property/>`和`<constructor-arg/>`元素内的子元素类型，以达到这个目的。

## 字面值 (基本类型、 String 等)

`<property/>`元素的`value`属性指定了一个属性或构造函数参数的可读字符串表示。
Spring使用 [转换服务](https://docs.spring.io/spring-framework/reference/core/validation/convert.html#core-convert-ConversionService-API)
来将这些值从字符串转换为属性或参数的实际类型。以下示例展示了设置各种值的方式：

```xml
<bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <!-- 调用 setDriverClassName(String) 方法 -->
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
    <property name="username" value="root"/>
    <property name="password" value="misterkaoli"/>
</bean>
```

以下示例使用了[p命名空间](#使用p命名空间的xml快捷方式)，使得 XML 配置更加简洁：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource"
          destroy-method="close"
          p:driverClassName="com.mysql.jdbc.Driver"
          p:url="jdbc:mysql://localhost:3306/mydb"
          p:username="root"
          p:password="misterkaoli"/>
</beans>
```

前面的 XML 更加简洁。但是，拼写错误是在运行时而不是设计时被发现。
除非你使用支持在创建 Bean 定义时进行自动属性完成的集成开发环境（例如[IntelliJ IDEA](https://www.jetbrains.com/idea/)
或[Spring Tools for Eclipse](https://spring.io/tools)），强烈建议使用这类 IDE 的帮助。

你也可以配置一个`java.util.Properties`实例，示例如下：

```xml
<bean id="mappings"
      class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">

    <!-- 作为 java.util.Properties 类型 -->
    <property name="properties">
        <value>
            jdbc.driver.className=com.mysql.jdbc.Driver
            jdbc.url=jdbc:mysql://localhost:3306/mydb
        </value>
    </property>
</bean>
```

Spring容器会利用JavaBeans的`PropertyEditor`机制，将`<value/>`元素内的文本转换为`java.util.Properties`实例。
这是一个很好的快捷方式，Spring团队中在一些场景中更倾向于使用嵌套的`<value/>`元素而不是`value`属性的方式。

### idref元素

`idref`元素仅仅是将容器中另一个`Bean`的id（一个字符串值，而不是引用）
传递给`<constructor-arg/>`或`<property/>`元素的一种防错方式。下面的例子展示了如何使用它。

```xml
<bean id="theTargetBean" class="..."/>

<bean id="theClientBean" class="...">
    <property name="targetName">
        <idref bean="theTargetBean"/>
    </property>
</bean>
```

上面的 Bean 定义片段（在运行时）与以下代码片段完全等价：

```xml
<bean id="theTargetBean" class="..."/>

<bean id="client" class="...">
    <property name="targetName" value="theTargetBean"/>
</bean>
```

第一种形式比第二种形式好，使用`idref`标签可以在部署时验证引用的`Bean`是否存在，
避免在第二种情况下，当实例化时才发现拼写错误或不存在的引用（并且可能导致致命的结果）。这提高了配置文件的可靠性和易读性。

> 4.0 版Bean XSD中，不再支持`idref`元素上的`local`属性，因为它与常规的Bean引用没有区别。
> 在升级到4.0模式时，将你现有的`idref`局部引用改为`idref bean`。

`<idref/>`元素带来价值的一个常见地方（至少在早于Spring 2.0的版本中）是在`ProxyFactory` Bean
定义中配置 [AOP interceptor（拦截器）](https://docs.spring.io/spring-framework/reference/core/aop-api/pfb.html#aop-pfb-1)
。当你指定拦截器名称时，使用`<idref/>`元素可以防止你把拦截器的ID拼错。

## 对其他Bean的引用（协作者）

**`ref`元素使用`bean`属性引用其他Bean**

`ref`元素作为`<constructor-arg/>`或`<property/>`定义元素的子元素，可以将一个Bean的属性值设置为容器管理的另一个Bean（协作者）的引用。
这个被引用的Bean是依赖项，它将在属性设置之前被初始化。（如果这个协作者Bean是单例的，可能被容器进行预先初始化）
作用域（scope）和验证取决于你是否通过`bean`或`parent`属性指定了其他对象的ID或名称。

最常见的使用方式是通过`<ref/>`标签的`bean`属性来指定目标Bean。
这样做可以创建对同一容器或父容器中任何`Bean`的引用，无论它们是否定义在同一个XML文件中。
使用`bean`属性时，你可以指定目标Bean的`id`或`name`属性中的一个值。

以下是一个使用`<ref/>`元素的例子：

```xml
<ref bean="someBean"/>
```

**`ref`元素使用`parent`属性引用父容器中的Bean**

通过`parent`属性，可以创建对当前容器的父容器中的Bean的引用。
`parent`属性的值可以与目标`Bean`的`id`属性或`name`属性中的一个值相同。 目标`Bean`必须在当前容器的父容器中。
这种方式特别适用于当你有一个容器层次结构，并且希望在子容器中引用父容器中的 Bean 时，且代理具有与父 Bean 具有相同名称的 Bean。

以下是如何使用`parent`属性的示例：

```xml
<!-- 在父容器中 -->
<bean id="accountService" class="com.something.SimpleAccountService">
    <!-- 根据需要在此处插入依赖项 -->
</bean>
```

```xml
<!-- 在子容器（后代）上下文中 -->
<bean id="accountService" <!-- bean名称与父bean相同 -->
    class="org.springframework.aop.framework.ProxyFactoryBean">
    <property name="target">
        <ref parent="accountService"/> <!-- 注意我们是如何引用父bean的 -->
    </property>
    <!-- 插入其他配置和依赖项 -->
</bean>
```

> 4.0 版Bean XSD中，`ref`元素上的`local`属性不在支持，因为它与常规的Bean引用没有区别。
> 在升级到4.0模式时，将你现有的`ref`局部引用改为`idref bean`。

## 内部 Bean

在`<property/>`或`<constructor-arg/>`元素内部使用`<bean/>`元素定义了一个内部Bean，如下例所示。

```xml
<bean id="outer" class="...">
    <!-- 不使用对目标 Bean 的引用，而是直接内联定义目标 Bean -->
    <property name="target">
        <bean class="com.example.Person"> <!-- 这是内部 Bean -->
            <property name="name" value="Fiona Apple"/>
            <property name="age" value="25"/>
        </bean>
    </property>
</bean>
```

内部Bean定义不需要指定ID或名称。如果指定了，容器不会将它们作标识符。
容器在创建时也会忽略作用域（scope）标志，因为内部Bean总是匿名的，并且始终与外部Bean一起创建。
无法独立地访问内部Bean，也无法将其注入到除封闭Bean之外的其他协作Bean中。

作为一个特例，可以从自定义作用域（scope）中接收销毁回调，例如，对于包含在单例Bean中的请求作用域（scope）的内层Bean。
内层Bean实例的创建与其包含的Bean相关联，但是销毁回调允许它参与到请求作用域（scope）的生命周期中。
这并不是一种常见的情况。内层Bean通常只是简单地共享其包含Bean的作用域（scope）。

## 集合（Collection）

## Null和空字符串值

## 使用p命名空间的XML快捷方式

## 使用c命名空间的XML快捷方式

## 复合属性名


