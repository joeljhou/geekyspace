---
title: 依赖注入
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-26
category: Spring
tag: Spring Framework
---

# 依赖注入

## 依赖注入（DI）是什么？

**Spring IoC（控制反转）也被称为依赖注入（DI）**

它是一个过程，对象仅通过构造参数、工厂方法参数或在**对象实例**被构造函数或工厂方法返回后，在其上设置的属性来定义它们的依赖关系。
在IoC容器创建Bean时，它会自动注入这些依赖项。 不再需要通`直接构造依赖项`或使用`服务定位器模式`等方式来管理对象的实例化或位置，
而是交由IoC容器来管理，因此称为**控制反转**。

**DI解耦**

采用依赖注入（DI）原则，可以使代码更干净简洁，同时也更有效地解耦。
通过DI，对象不需要查找其依赖，也不知道依赖的位置或类别。
因此，你的类变得更易于测试，特别是当依赖是在接口或抽象基类上时，可以使用`stub`或`mock`进行单元测试。
这种方式使代码更加整洁，同时也更符合面向对象的设计原则。

DI有两个主要的变体。 基于[构造器的依赖注入](#基于构造函数的依赖注入)和[基于Setter的依赖注入](#基于setter的依赖注入)。

## 基于构造函数的依赖注入

**基于构造函数的DI**是通过容器调用具有多个参数的构造函数来实现的，每个参数代表一个依赖项。
与调用**带有特定参数的静态工厂方法**来构造`Bean`几乎是等价的。

本讨论对构造函数和静态工厂方法的==参数==进行类似处理。
以下示例显示了一个只能通过构造函数进行依赖注入的类。

```java
public class SimpleMovieLister {

    // SimpleMovieLister 依赖于 MovieFinder
    private final MovieFinder movieFinder;

    // 构造函数，以便Spring容器可以注入MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // 省略了实际使用注入的 MovieFinder 的业务逻辑...
}
```

请注意，这个类并没有什么特别之处。它是一个普通的POJO（简单的Java对象），不依赖于容器特定的接口、基类或注解。

### 构造函数参数解析

**1.按定义的顺序传递构造函数的参数（参数无歧义时）**

构造函数参数的解析匹配是通过使用参数的类型来完成的。
如果`Bean`定义中的构造函数参数不存在歧义， 那么**构造函数参数的顺序**就是`Bean`定义中的定义顺序。
这样在实例化Bean时，Spring IoC容器就会按照定义的顺序传递参数。

请考虑以下这个类：

```java
package x.y;

public class ThingOne {

    public ThingOne(ThingTwo thingTwo, ThingThree thingThree) {
        // ...
    }
}
```

假设`ThingTwo`和`ThingThree`类没有继承关系，不存在潜在的歧义。
因此，下面的配置可以正常工作，你不需要在`<constructor-arg/>`元素中显示指定构造函数参数的索引或类型。

```xml

<beans>
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg ref="beanTwo"/>
        <constructor-arg ref="beanThree"/>
    </bean>

    <bean id="beanTwo" class="x.y.ThingTwo"/>
    <bean id="beanThree" class="x.y.ThingThree"/>
</beans>
```

**2.使用`type`属性显式指定构造函数参数的类型**

当引用另一个Bean时，类型是已知的，并且可以进行匹配（就像前面的例子那样）。
但是，当使用简单类型时，比如`<value>true</value>`，Spring不能确定值的类型，所以在没有帮助的情况下不能通过类型进行匹配。
请考虑以下这个类：

```java
package examples;

public class ExampleBean {

	// 用于计算终极答案的年数
	private final int years;

	// 生命、宇宙和万物的终极答案
	private final String ultimateAnswer;

	public ExampleBean(int years, String ultimateAnswer) {
		this.years = years;
		this.ultimateAnswer = ultimateAnswer;
	}
}
```

在上述情况下，可以通过使用`type`属性显式指定构造函数参数的类型，容器就对简单类型进行类型匹配，如下例所示：

```xml

<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

**3.使用`index`属性显示指定构造函数参数的索引**

你还可以使用`index`属性显示指定构造函数参数的索引，如下例所示：

```xml

<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>
```

除了解决多个简单值的歧义外，指定索引还可以解决构造函数具有两个相同类型参数的歧义问题。

> **注意⚠️**：索引（下标）从0开始。

你还可以使用构造函数的参数名称来消除值的歧义，如下例所示：

```xml

<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>
```

**4.使用`@ConstructorProperties`指定构造函数参数名称**

请记住，要使这一方法开箱即用，代码在编译时必须启用`debug`标志，以便Spring可以从构造函数中查找参数名称。

如果你不想用`debug`标志编译你的代码，
可以使用[@ConstructorProperties](https://download.oracle.com/javase/8/docs/api/java/beans/ConstructorProperties.html)
JDK注解来显式命名你的构造函数参数。 示例类将如下所示：

```java
package examples;

public class ExampleBean {

	// 省略字段

    // 指定构造函数属性，以便Spring容器可以注入参数
	@ConstructorProperties({"years", "ultimateAnswer"})
	public ExampleBean(int years, String ultimateAnswer) {
		this.years = years;
		this.ultimateAnswer = ultimateAnswer;
	}
}
```

## 基于Setter的依赖注入

**基于Setter的依赖注入（DI）** 是指容器在调用`无参构造函数`或`无参静态工厂方法`实例化Bean后，调用Setter方法来实现的。

以下示例展示了一个只能通过Setter进行依赖注入的类。这个类是传统的Java类，是一个普通的POJO，不依赖于容器特定的接口、基类或注解。

```java
public class SimpleMovieLister {

    // SimpleMovieLister 依赖于 MovieFinder
    private MovieFinder movieFinder;

    // Setter方法，以便Spring容器可以注入MovieFinder
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // 省略了实际使用注入的 MovieFinder 的业务逻辑...
}
```

`ApplicationContext`在管理的`Bean`时支持基于构造函数和基于Setter的依赖注入（DI）。
此外，它还支持通过构造函数注入依赖项后，再使用Setter方法注入其他依赖项。

你可以通过`BeanDefinition`来配置依赖关系，并利用`java.beans.PropertyEditor`接口实例将属性值从一种格式转换为另一种格式。
然而，大多数Spring用户并不直接使用这些类（即以编程方式），而是使用XML Bean定义、
注解组件（即使用`@Component`、`@Controller`等注解的类），
或基于Java的`@Configuration`类中的`@Bean`方法。
然后，这些来源在内部被转换为`BeanDefinition`的实例，并用于加载整个Spring IoC容器实例。

::: tip 基于构造器的DI还是基于Setter的DI？

通常建议对于必要的依赖项使用构造函数注入（DI），对于可选的依赖项使用Setter方法或配置方法进行注入。
需要注意的是，在Setter方法上使用[@Autowired](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired.html)
注解也可以使属性标记为必需的依赖项；但是，带有参数的程序化验证的构造函数注入更为推荐。

Spring团队倡导使用构造函数注入，它允许你将应用程序组件实现为不可变`final`对象，并确保了所需的依赖项不是`null`。
此外，构造函数注入组件总是以完全初始化的状态返回给客户端，这有利于提高稳定性和可预测性。

另一方面，Setter注入适用于可选的依赖项，可以在类内部设置默认值。
但是，它需要在整个代码库使用依赖性的地方进行额外的`null`值检查，以处理依赖项未设置的情况。
通过[JMX MBean](https://docs.spring.io/spring-framework/reference/integration/jmx.html)进行管理是Setter注入的一个很好的用例。

在某些情况下，选择构造函数注入或Setter注入可能由类本身决定，特别是当处理没有源代码的第三方类时。
例如，如果第三方类没有暴露任何Setter方法，则构造函数注入可能是唯一可用的DI形式。
:::

## 依赖的解析过程

容器执行Bean依赖解析的步骤如下：

1. `ApplicationContext` 是用描述所有Bean的配置元数据创建和初始化的。配置元数据可以由XML、Java代码或注解来指定
2. 对于每个Bean来说，它的依赖是以属性、构造函数参数或静态工厂方法的参数（如果你用它代替正常的构造函数）的形式表达的。在实际创建Bean时，这些依赖被提供给Bean。
3. 每个属性或构造函数参数都是要设置的值的实际定义，或对容器中另一个Bean的引用。
4. 每个作为值的属性或构造函数参数都会从其指定格式转换为该属性或构造函数参数的实际类型。
   默认情况下，Spring 可以将以字符串格式提供的值转换为所有内置类型，如`int`、`long`、`String`、`boolean`等等。

Spring容器在创建时，会验证每个Bean的配置。 然而，直到实际创建Bean之后，才会设置Bean的属性值。
当容器被创建时，那些具有单例作用域并被设置为预实例化的Bean（默认）被创建。
作用域范围在[Bean Scope](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)中定义。
否则，Bean只有在被请求时才会被创建。
创建Bean有可能导致创建Bean Graph，因为Bean的依赖项及其依赖项的依赖项（以此类推）会被创建和分配。
请注意，这些依赖项之间的解析不匹配可能会在创建受影响的Bean时才会出现问题。

::: tip 循环依赖

循环依赖是指在使用主要基于构造函数的依赖注入时，可能会创建一个无法解决的循环依赖场景。

例如：Class A通过构造函数注入需要Class B的实例，而Class B通过构造函数注入需要Class A的实例。
如果配置Bean A和Bean B相互注入对方，Spring IoC容器会在运行时检测到这种循环引用，并抛出`BeanCurrentlyInCreationException`
异常。

解决这种问题的一个可能方法是编辑某些类的源代码，改为通过Setter方法配置，而不是构造函数。
另一个方法是避免构造函数注入，只使用Setter注入。换句话说，虽然不推荐，但你可以通过Setter注入配置循环依赖。

与典型情况（没有循环依赖）不同，Bean A和Bean B之间的循环依赖会导致其中一个Bean在自身完全初始化之前被注入到另一个Bean中（经典的鸡生蛋蛋生鸡的情况）。

实际开发过程中，还可以使用`@Lazy`注解或`<lazy-init>`属性来解决循环依赖问题。
:::

## 依赖注入的例子
