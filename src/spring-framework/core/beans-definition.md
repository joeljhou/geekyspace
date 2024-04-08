---
title: Bean 定义
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-18
category: Spring
tag: Spring Framework
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

该元数据转换为组成每个Bean定义的一组属性。 下表介绍了这些属性：

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

在Spring IoC容器中，每个Bean都必须有一个**唯一的标识符**（identifier），如果需要一个以上的标识符，多余的标识符可以被视为**别名**。

**基于XML的配置元数据**

| 属性/元素   | 描述                                     |
|---------|----------------------------------------|
| `id`    | Bean的唯一标识符；默认采取小写字母开头的驼峰命名法            |
| `name`  | Bean的别名，可以有多个别名；用逗号（`,`）、分号（`;`）或空格分隔  |
| `alias` | 与name作用相同，都是用于指定Bean的别名（Spring 5.0中废弃） |
| `ref`   | 引用其他Bean                               |

建议为每个Bean提供一个唯一的`id`属性，以便使用`ref`属性引用该Bean。
不提供Bean名称的动机与使用[内部Bean](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-properties-detailed.html#beans-inner-beans)
和[自动装配协作者](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-autowire.html)有关。

**使用`Introspector`生成默认Bean名称**

在classpath中的组件扫描，Spring会自动为未命名的组件按照`java.beans.Introspector`的规则生成一个默认的bean名称

默认将类名的转为==小写字母开头的驼峰命名法==；如`com.example.MyBean`类的Bean名称是`myBean`。
特殊的，如果类名的第一个和第二个字符都是大写字母，则 Spring 会保留原始的大小写；如`URL`类的默认Bean名称还是`URL`

> 如果你使用**Java配置**，`@Bean` 注解可以被用来提供别名。
> 参阅 [使用@Bean注释](https://docs.spring.io/spring-framework/reference/core/beans/java/bean-annotation.html)。

## 实例化Bean

Bean定义（definition）本质上是创建一个或多个对象的“配方”。
容器在被询问时查看指定名称的Bean的“配方”，并使用该Bean定义所封装的元数据来创建（或获取）一个对象。

**使用XML配置元数据实例化Bean**

如果使用基于XML的配置元数据，可以在`<bean>`元素中的`class`属性中指定要实例化对象的类型。
这个`class`属性通常是必需的，用于定义内部`BeanDefinition`对象实例的`Class`属性。
对于一些例外情况，参阅 [使用实例工厂方法实例化](#使用实例工厂方法实例化)
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

> 如果要为嵌套类配置Bean定义，可以使用嵌套类的==二进制名称==或==源名称==，通过美元符号 (`$`) 或点 (`.`) 分隔。

假设有一个名为`OuterClass`的外围类，其中包含一个名为`InnerClass`的嵌套类

* 二进制名称：`com.example.OuterClass$InnerClass`
* 源名称：`com.example.OuterClass.InnerClass`

### 使用构造函数实例化

通过构造函数方法创建`Bean`时，所有普通的类都可以被`Spring`使用并与之兼容

* 被开发的类不需要实现任何特定的接口，或以特定的方式进行编码。只需指定`Bean`类就足够了
* 根据你对该特定`Bean`使用的`IoC`类型，可能需要一个==默认（空）构造函数==

通过基于XML的配置元数据，你可以按以下方式指定你的bean类。

```xml

<bean id="exampleBean" class="examples.ExampleBean"/>

<bean name="anotherExample" class="examples.ExampleBeanTwo"/>
```

关于向==构造函数传递参数==和==对象被构造后设置对象实例属性==的机制的详细信息，请参阅 [依赖注入](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)。

### 使用静态工厂方法实例化

定义一个静态工厂方法创建Bean时，使用`class`属性指定工厂类，使用`factory-method`属性指定工厂方法。
这种Bean定义的一个用途是在遗留代码中调用`static`工厂，做到==无侵入性==。

示例Bean定义，它使用静态工厂方法创建Bean：

```xml
<bean id="clientService"
      class="examples.ClientService"
      factory-method="createInstance"/>
```

下面的例子展示了一个与Bean定义（definition）一起工作的类：

```java
public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```

关于向==工厂方法提供（可选）参数==以及==从工厂返回对象后设置对象实例属性==的机制，参阅 [依赖和配置详解](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-properties-detailed.html)。

### 使用实例工厂方法实例化

使用**实例工厂方法**进行的实例化，与[使用静态工厂方法实例化](#使用静态工厂方法实例化)类似；
通过从容器中调用现有`Bean`的非静态方法来创建一个新的`Bean`。
要使用这种机制，请将`class`属性留空，`factory-bean`属性指定工厂Bean，`factory-method`属性指定工厂方法。

```xml
<!-- 工厂Bean，包含一个名为 createInstance() 的方法 -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- 注入此定位器Bean所需的任何依赖项 -->
</bean>

        <!-- 通过工厂Bean创建的Bean -->
<bean id="clientService"
      factory-bean="serviceLocator"
      factory-method="createClientServiceInstance"/>

<bean id="accountService"
      factory-bean="serviceLocator"
      factory-method="createAccountServiceInstance"/>
```

以下示例显示了相应的类：

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    private static AccountService accountService = new AccountServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }

    public AccountService createAccountServiceInstance() {
        return accountService;
    }
}
```

这种方法表明，工厂Bean本身可以通过依赖注入（DI）进行管理和配置。参阅 [依赖和配置详解](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-properties-detailed.html)。

::: note
在 Spring 文档中，“`factory bean`”是指Spring容器中配置的Bean，它通过[实例](#使用实例工厂方法实例化)
或[静态](#使用静态工厂方法实例化)工厂方法创建对象。 相比之下，`FactoryBean`（注意大小写）是Spring特定
[FactoryBean](https://docs.spring.io/spring-framework/reference/core/beans/factory-extension.html#beans-factory-extension-factorybean)
接口的实现，它允许自定义实例化逻辑。
:::

### 确定Bean的运行时类型

在 Spring 应用程序中，要确定特定`Bean`的==运行时类型==可能会有些复杂。
这是因为`Bean`的类型可能受到多种因素的影响，包括但不限于以下几点：

1. **Bean 元数据定义**
    * Bean元数据定义中指定的`class`类只是一个初始的类引用
2. **静态工厂方法和 FactoryBean**
    * 与静态工厂方法或者FactoryBean的实现结合使用，可能会导致Bean的实际类型与`class`属性指定的类型不同
3. **实例工厂方法**
    * 与实例工厂方法结合使用，根本不会使用`class`属性指定的类型，而是通过指定的`factory-bean`名称来解决
4. **AOP 代理**
    * AOP代理可能会使用基于接口代理包装Bean实例，目标Bean的实际类型公开有限（只有其实现的的代理接口）

考虑到上述所有情况，要了解某个特定Bean的实际运行时类型。
推荐的方法是使用`BeanFactory`接口的`getType()`方法， 并返回与`BeanFactory.getBean()`调用返回的对象类型相同的类型。
