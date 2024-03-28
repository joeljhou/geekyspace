---
title: IoC 容器
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-18
category: Spring
tag: Spring Framework
---

# IoC 容器

## 概述

> Spring IoC（控制反转）容器是Spring框架的核心。
> `org.springframework.context.ApplicationContext`接口代表Spring IoC容器，负责实例化、配置和组装`Bean`。

Spring提供了几个 ApplicationContext 接口的实现，在独立应用程序中，最常用的是：

* [ClassPathXmlApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html)
* [FileSystemXmlApplicationContext](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html)
* 等等

**支持以XML、Java注释或Java代码作为配置元数据的格式**

虽然`XML`一直是定义配置元数据的传统格式， 但您可以通过提供少量的`XML`配置来指定容器使用`Java注解`或`Java代码`作为元数据格式。
以声明式方式启用对这些元数据格式的支持，从而更灵活地定义应用程序的配置信息。

**为Web应用程序提供方便的ApplicationContext实例化**

在大多数应用场景中，无需手动编写代码来实例化**Spring IoC**容器；
例如：在Web应用场景中，通常只需要在应用程序的`web.xml`文件中编写 8
行（或更多）[模板式的Web描述符](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-create)
即可初始化`ApplicationContext`

**解析Spring框架的工作原理：==应用程序类==与==配置元数据==的整合**

下图表展示了Spring框架的工作原理高层视图。通过将您的应用程序类与配置元数据结合起来，
一旦`ApplicationContext`被创建和初始化，您就获得了一个完全配置且可执行的系统或应用程序。

![Spring IoC容器](https://img.geekyspace.cn/pictures/2024/202403181756387.png)

## 配置元数据

如上图所示，Spring IoC容器消费一种配置元数据。
这种配置元数据代表了你作为一个应用开发者，如何告诉Spring容器在你的应用中实例化、配置和组装对象。

> **注意⚠️**：Spring IoC容器本身与实际配置元数据的编写格式完全解耦。
> 如今，许多开发者选择使用[基于Java的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/java.html)
> 来构建他们的Spring应用程序。

有关在`Spring`容器中使用其他形式的元数据信息，参阅：

* [基于XML的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)
* [基于注解的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html)（Spring
  2.5开始支持）
* [基于Java的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/java.html)（Spring
  3.0开始支持；参阅 [@Configuration](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/annotation/Configuration.html), [@Bean](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/annotation/Bean.html),
  [@Import](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/annotation/Import.html),
  和 [@DependsOn](https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/annotation/DependsOn.html)
  注解）

Spring的配置包含至少一个，通常是多个`<bean>`元素。容器必须管理这些定义的bean。

* XML配置：将这些Bean配置为顶层 `<beans/>` 元素内的 `<bean/>` 元素
* Java配置：将这些Bean配置为`@Configuration`类中的`@Bean`注解的方法

这些Bean的定义对应于构成应用程序的实际对象，
如服务层对象，持久层对象（Dao），表示层对象（Web控制器），基础设施对象（JPA EntityManagerFactory），JMS队列等。
通常，人们不会在容器中配置细粒度的`domain`对象，因为创建和加载`domain`对象的通常是`repository`和`service`层逻辑的责任。

下面的例子显示了基于XML的配置元数据的基本结构：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">(1) (2)
        <!-- 这个bean的协作者和配置在这里 -->
    </bean>

    <bean id="..." class="...">
        <!-- 这个bean的协作者和配置在这里 -->
    </bean>

    <!-- 更多bean 定义在这里 -->

</beans>
```

1. `id`属性是一个字符串，用于==唯一标识==Bean
2. `class`属性是一个字符串，用于指定Bean的==完整类名==（包括包名）

`id`属性的值可以用来指代其他Bean的`ref`属性，从而实现Bean之间的依赖关系。
参阅 [依赖](https://docs.spring.io/spring-framework/reference/core/beans/dependencies.html)。

## 实例化容器

提供给`ApplicationContext`
构造函数的一条或多条路径是==资源字符串==，它让容器从各种外部资源（如本地文件系统、Java `CLASSPATH`
等）加载配置元数据。

```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```

> 了解更多关于[资源加载](https://docs.spring.io/spring-framework/reference/core/resources.html)的信息；
> 它提供了一种简单的方法，可以从`URI`语法中定义的位置读取`InputStream`。 特别是，`Resource`路径被用来构建应用程序上下文， 如
> [Application Context和资源路径](https://docs.spring.io/spring-framework/reference/core/resources.html#resources-app-ctx)
> 中所述。

以下示例显示了**服务层对象**`services.xml` 配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- services -->
    <bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
        <property name="accountDao" ref="accountDao"/>
        <property name="itemDao" ref="itemDao"/>
        <!-- 这个bean的协作者和配置在这里 -->
    </bean>

    <!-- 更多服务的bean 定义在这里 -->

</beans>
```

以下示例显示**数据访问对象**（data access object）`daos.xml` 文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accountDao"
          class="org.springframework.samples.jpetstore.dao.jpa.JpaAccountDao">
        <!-- 这个bean的协作者和配置在这里 -->
    </bean>

    <bean id="itemDao" class="org.springframework.samples.jpetstore.dao.jpa.JpaItemDao">
        <!-- 这个bean的协作者和配置在这里 -->
    </bean>

    <!-- 更多数据访问对象的bean 定义在这里 -->

</beans>
```

在前面的示例中，服务层由 `PetStoreServiceImpl` 类和两个类型为 `JpaAccountDao` 和 `JpaItemDao` 的数据访问对象组成（基于JPA对象-关系映射标准）。

* `property name` 元素指的是`JavaBean`属性的名称
* `ref` 元素指的是引用另一个`Bean`定义的名称

`id` 和 `ref`元素之间的这种联系，表达了协作对象之间的依赖关系。
有关配置对象依赖项的详细信息，参阅 [依赖](https://docs.spring.io/spring-framework/reference/core/beans/dependencies.html)。

## 使用容器

`ApplicationContext`是一个高级工厂的接口，能够维护不同Bean及其依赖关系的注册表。
通过使用方法 `T getBean(String name, Class<T> requiredType)`，你可以检索到Bean的实例。

`ApplicationContext`可以让你读取Bean定义（definition）并访问它们，如下例所示。

```java
// 创建和配置Bean
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// 检索配置的实例
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// 使用配置的实例
List<String> userList = service.getUsernameList();
```

**不直接依赖于 Spring 的 API**

> 理想情况下，应用程序代码不应该直接依赖于Spring的API，而是通过元数据（如自动装配`@Autowired`注解）声明对特定Bean的依赖。

虽然 ApplicationContext 接口提供了一些检索 Bean 的方法，如 getBean() 等，但在设计上，应该避免直接依赖这些方法。

例如，Spring与Web框架的集成为各种**Web框架组件**（如Controller控制器和JSF管理的Bean）提供了依赖注入的能力，
使得你可以通过元数据（如`@Autowired`注解）声明对特定`Bean`的依赖，而不必直接调用`getBean()`等方法。
这样可以使代码更加模块化、可维护性更高。
