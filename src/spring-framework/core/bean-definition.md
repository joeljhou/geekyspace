---
title: Bean 定义
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-18
category: Spring
tag:
  - Spring
  - Spring Framework
---

# Bean 定义

## 概述

> 构建应用程序主干并由Spring IoC 容器管理的对象称为 Bean。
> 由`org.springframework.beans.factory.config.BeanDefinition` 接口表示，定义了Bean的配置元数据。

## BeanDefinition

`BeanDefinition` 包含以下元数据：

* Bean的包限定类名
* Bean的行为配置元素，例如作用域、生命周期回调等
* Bean的依赖关系
* 其他配置信息（如：管理连接池的Bean可以配置池的大小，连接数量等）

该元数据转换为组成每个bean定义的一组属性。 下表介绍了这些属性：

| 属性                       | 描述           |
|--------------------------|--------------|
| Class                    | Bean的全限定类名   |
| Name                     | Bean的名称      |
| Scope                    | Bean的作用域     |
| Constructor arguments    | Bean的构造函数参数  |
| Properties               | Bean的属性      |
| Autowiring mode          | Bean的自动装配模式  |
| Lazy initialization mode | Bean的延迟初始化模式 |
| Initialization method    | Bean的初始化方法   |
| Destruction method       | Bean的销毁方法    |

## 命名Beans

在Spring IoC容器中，每个Bean都必须有一个==唯一的标识符==。

**基于XML的配置元数据中**

使用`id`属性、`name`属性为Bean命名（默认采取小写字母开头的驼峰命名法），通过`ref`属性引用其他Bean

```xml
<!-- 示例XML配置 -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 命名Bean并引用其他Bean -->
    <bean id="userService" class="com.example.UserService">
        <property name="userRepository" ref="userRepo"/>  <!-- 使用别名引用 Bean -->
    </bean>

    <bean id="userRepository" class="com.example.UserRepository"/>
    <!-- 使用别名定义 Bean -->
    <alias name="userRepository" alias="userRepo"/>
</beans>
```

> 如果使用Java Configuration，则可以使用`@Bean`注解为Bean命名。
>
> 详细信息请参阅[使用@Bean注释](https://docs.spring.io/spring-framework/reference/core/beans/java/bean-annotation.html)。

## 实例化Bean

> `Bean`定义实际上是创建一个或多个对象的方法。 当容器被询问时，它会查看指定名称的Bean定义，并使用该定义创建（或获取）一个对象。

### 使用构造函数实例化

在XML配置文件中，可以使用`<constructor-arg>`元素指定构造函数的参数来实例化Bean对象。例如：

```xml
<bean id="myBean" class="com.example.MyBean">
    <constructor-arg value="parameterValue" type="java.lang.String"/>
</bean>

<bean name="anotherBean" class="com.example.BeanTwo">
<constructor-arg ref="parameter"/>
</bean>
```

这里`MyBean`类的构造函数接受一个`String`类型的参数。`BeanTwo`类的构造函数接受一个引用参数。

### 使用静态工厂方法实例化

可以使用`<bean>`元素的`factory-method`属性指定静态工厂方法来实例化Bean对象。例如：

```xml
<bean id="myBean" class="com.example.MyBeanFactory" factory-method="createInstance"/>
```

在`MyBeanFactory`类中，有一个名为`createInstance`的静态工厂方法返回`MyBean`对象。

### 使用实例工厂方法实例化

可以使用`<bean>`元素的`factory-bean`属性和`factory-method`属性结合起来使用实例工厂方法来实例化Bean对象。例如：

```xml
<bean id="myBeanFactory" class="com.example.MyBeanFactory"/>
<bean id="myBean" factory-bean="myBeanFactory" factory-method="createInstance"/>
```

在`MyBeanFactory`类中，有一个非静态的`createInstance`方法返回MyBean对象。

## 确定Bean的运行时类型

确定特定bean的==运行时类型==并非易事。

原因如下：

* Bean 元数据定义中指定的类只是一个**初始类引用**
* 可能与声明的工厂方法结合使用，可能是一个`FactoryBean`类
* AOP代理可能会使用基于接口代理包装bean实例，目标bean的实际类型公开有限（只有其实现的的代理接口）
* 等等

`BeanFactory.getType()` 方法：该方法可以获取bean的实际运行时类型，并且考虑到了上述所有因素。
