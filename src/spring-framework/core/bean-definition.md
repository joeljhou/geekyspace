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
>
> 在容器中，Bean的定义表示为`org.springframework.beans.factory.config.BeanDefinition`对象。

**BeanDefinition包含以下元数据：**

* **全路径类名**：通常，被定义为Bean的实现类
* **行为配置元素**：说明了Bean在容器中的行为方式，例如作用域scope、生命周期回调等
* **依赖关系**：描述Bean与其他Bean之间的依赖关系，包括依赖注入，依赖查找等
* 其他配置信息：如：管理连接池的Bean可以配置pool的大小限制，使用的连接数量等

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

在Spring IoC容器中，每个Bean都必须有一个==唯一的标识符==（identifier），如果需要一个以上的标识符，多余的标识符可以被视为==别名==。

**基于XML的配置元数据**

可以使用`id`属性、`name`属性来指定Bean标识符（默认采取小写字母开头的驼峰命名法）

| 属性/元素   | 描述                                     |
|---------|----------------------------------------|
| `id`    | Bean的唯一标识符；                            |
| `name`  | Bean的别名，可以有多个别名；用逗号（`,`）、分号（`;`）或空格分隔  |
| `alias` | 与name作用相同，都是用于指定Bean的别名（Spring 5.0中废弃） |
| `ref`   | 引用其他Bean                               |

建议为每个Bean提供一个唯一的`id`属性，以便使用`ref`属性引用该Bean。
不提供名称的动机与使用[内部Bean](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-properties-detailed.html#beans-inner-beans)
和[自动装配协作者](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-autowire.html)有关

**使用Introspector生成默认Bean名称**

在classpath中的组件扫描，Spring会自动为为命名的组件按照`java.beans.Introspector`的规则生成一个默认的bean名称

* 默认将类名的转为==小写字母开头的驼峰命名法==；如`com.example.MyBean`类的默认bean名称是`myBean`
* 特殊的，如果类名的第一个和第二个字符都是大写字母，则 Spring 会保留原始的大小写; 例如：`URL`类的默认bean名称还是`URL`

> 如果你使用**Java配置**，`@Bean` 注解可以被用来提供别名。
> 参阅 [使用@Bean注释](https://docs.spring.io/spring-framework/reference/core/beans/java/bean-annotation.html)。

## 实例化Bean

`Bean`定义（definition）本质上是创建一个或多个对象的“配方”。
容器在被询问时查看指定名称的bean的“配方”，并使用该Bean定义所封装的元数据来创建（或获取）一个对象。

**使用XML配置元数据实例化Bean**

如果使用基于XML的配置元数据，可以在`<bean>`元素中的`class`属性中指定要实例化对象的类型。
这个`class`属性通常是必需的，用于定义内部`BeanDefinition`对象实例的`Class`属性。
对于一些例外情况，参阅  [使用实例工厂方法实例化](#使用实例工厂方法实例化)
以及 [Bean定义的继承](https://docs.spring.io/spring-framework/reference/core/beans/child-bean-definitions.html)。

**使用`Class`属性**

1. 通过反射调用构造函数创建Bean
    * 这种方式类似于Java中的`new`操作符，容器通过反射调用构造函数来创建Bean
    ```xml
    <bean id="myBean" class="com.example.MyClass"/>
    ```
2. 通过静态工厂方法创建Bean
    * 这种方式不太常见，容器会调用一个类上的`static`工厂方法来创建Bean
   ```xml
   <bean id="myBean" class="com.example.MyFactoryClass" factory-method="createInstance"/>
   ```

**嵌套类的Bean定义**

> 如果要为嵌套类配置bean定义，可以使用嵌套类的==二进制名称==或==源名称==，通过美元符号 (`$`) 或点 (`.`) 分隔。

示例：假设有一个名为`OuterClass`的外围类，其中包含一个名为`InnerClass`的嵌套类

* 二进制名称：`com.example.OuterClass$InnerClass`
* 源名称：`com.example.OuterClass.InnerClass`

### 使用构造函数实例化

在XML配置文件中，可以使用`<constructor-arg>`元素指定构造函数的参数来实例化Bean对象。例如：

```xml
<?xml version="1.0" encoding="UTF-8"?>
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
<?xml version="1.0" encoding="UTF-8"?>

<bean id="myBean" class="com.example.MyBeanFactory" factory-method="createInstance"/>
```

在`MyBeanFactory`类中，有一个名为`createInstance`的静态工厂方法返回`MyBean`对象。

### 使用实例工厂方法实例化

可以使用`<bean>`元素的`factory-bean`属性和`factory-method`属性结合起来使用实例工厂方法来实例化Bean对象。例如：

```xml
<?xml version="1.0" encoding="UTF-8"?>

<bean id="myBeanFactory" class="com.example.MyBeanFactory"/>
<bean id="myBean" factory-bean="myBeanFactory" factory-method="createInstance"/>
```

在`MyBeanFactory`类中，有一个非静态的`createInstance`方法返回MyBean对象。

### 确定Bean的运行时类型

确定特定bean的==运行时类型==并非易事。

原因如下：

* Bean 元数据定义中指定的类只是一个**初始类引用**
* 可能与声明的工厂方法结合使用，可能是一个`FactoryBean`类
* AOP代理可能会使用基于接口代理包装bean实例，目标bean的实际类型公开有限（只有其实现的的代理接口）
* 等等

`BeanFactory.getType()` 方法：该方法可以获取bean的实际运行时类型，并且考虑到了上述所有因素。
