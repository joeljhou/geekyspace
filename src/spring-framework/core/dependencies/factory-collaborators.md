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

**基于构造函数的依赖注入**是容器（如Spring框架）调用具有多个参数的构造函数来实现，每个参数代表一个依赖项，容器负责在创建Bean时注入这些依赖项。
**与静态工厂方法的比较**构造Bean几乎是等价的。

以下示例通过构造函数进行依赖注入：

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

这个类并没有什么特别之处。它是一个普通的POJO（简单的Java对象），不依赖于容器特定的接口、基类或注解。

### 构造函数参数解析

**1.按定义的顺序传递构造函数的参数（参数无歧义时）**

构造函数参数的解析匹配是通过使用参数的类型来完成的。
如果Bean定义中的构造函数参数不存在歧义， 那么构造函数参数的顺序就是Bean定义中的定义顺序。
这样在实例化Bean时，Spring IoC容器就会按照定义的顺序传递参数。 请考虑以下这个类：

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

**ApplicationContext的依赖注入支持**：`ApplicationContext`在管理的`Bean`时支持基于构造函数和基于Setter的依赖注入（DI）。
此外，它还支持通过构造函数注入依赖项后，再使用Setter方法注入其他依赖项。
**配置依赖关系和属性转换**：你可以通过`BeanDefinition`来配置依赖关系，并利用`java.beans.PropertyEditor`
接口实例将属性值从一种格式转换为另一种格式。
**Spring用户的使用方式**：然而，大多数Spring用户并不直接使用这些类（即以编程方式），而是使用XML Bean定义、
注解组件（即使用`@Component`、`@Controller`等注解的类），
或基于Java的`@Configuration`类中的`@Bean`方法。
**内部转换为BeanDefinition**：然后，这些来源在内部被转换为`BeanDefinition`的实例，并用于加载整个Spring IoC容器实例。

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

1. **容器初始化**：
    * `ApplicationContext` 是 Spring 容器的接口，用于创建和管理 Bean
    * 配置元数据可以是 XML、Java 代码或注解，它们描述了 Bean 的配置信息
2. **依赖表达方式**：
    * 依赖可以表达为属性、构造函数参数或静态工厂方法的参数
    * Spring 会根据依赖表达方式来创建和注入依赖的 Bean
3. **属性和构造函数参数定义**：
    * 属性或构造函数参数可以是值的定义，也可以是对容器中另一个 Bean 的引用
    * **属性值转换**：对于值的定义，Spring 会将以字符串格式提供的值转换为所有内置类型，如`int`、`long`、`String`、`boolean`等等
4. **容器验证和Bean创建**:
    * 容器在创建时，会验证每个Bean的配置
    * 容器被创建时，单例作用域并被设置为预实例化的Bean（默认）被创建。
      作用域范围在[Bean Scope](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)中定义
    * 非单例Bean只有在被请求时才会被创建
5. **Bean的依赖项解析**：
    * 创建Bean可能会导致创建Bean Graph，因为Bean的依赖项及其依赖项的依赖项（以此类推）会被创建和分配
6. **注意⚠️：解析不匹配问题**
    * 依赖项之间的解析不匹配可能会在创建受影响的 Bean 时才会出现问题

::: tip 循环依赖

循环依赖是指在使用主要基于构造函数的依赖注入时，可能会创建一个无法解决的循环依赖场景。

例如：Class A通过构造函数注入需要Class B的实例，而Class B通过构造函数注入需要Class A的实例。
如果配置Bean A和Bean B相互注入对方，Spring IoC容器会在运行时检测到这种循环引用，并抛出`BeanCurrentlyInCreationException`
异常。

解决这种问题的一个可能方法是编辑某些类的源代码，改为通过Setter方法配置，而不是构造函数。
另一个方法是避免构造函数注入，只使用Setter注入。换句话说，虽然不推荐，但你可以通过Setter注入配置循环依赖。

与典型情况（没有循环依赖）不同，Bean A和Bean B之间的循环依赖会导致其中一个Bean在自身完全初始化之前被注入到另一个Bean中（经典的鸡生蛋蛋生鸡的情况）。
:::

**Spring容器的行为**： 通常情况下，你可以相信Spring会做正确的事情。
它在容器加载时检测配置问题，例如引用不存在的Bean或存在循环依赖等。
**异常生成可能性**： Spring会尽可能地延迟设置属性和解析依赖，直到真正创建Bean时才会进行。
这意味着，一个正确加载的Spring容器在请求对象时可能会生成异常；例如在创建该对象或其依赖关系时出现问题，Bean由于缺少或无效属性而抛出异常。
**ApplicationContext的预实例化**： 这种潜在的延迟暴露一些配置的情况，是`ApplicationContext`实现默认预先实例化单例Bean的原因。
在实际创建这些Bean之前，尽管需要花费一些前期时间和内存代价，但这样做可以在创建`ApplicationContext`时发现配置问题，而不是之后。
**覆盖默认行为**： 你仍然可以覆盖这种默认行为，使得单例Bean延迟（懒加载）初始化，而不是预先实例化。

## 依赖注入的例子

### Setter依赖注入

以下示例使用基于XML的配置元数据来实现基于Setter的依赖注入。Spring XML配置文件的一小部分如下所示，指定了一些`Bean`定义：

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- 使用嵌套的 ref 元素进行Setter注入 -->
    <property name="beanOne">
        <ref bean="anotherExampleBean"/>
    </property>

    <!-- 使用更简洁的 ref 属性进行Setter注入 -->
    <property name="beanTwo" ref="yetAnotherBean"/>
    <property name="integerProperty" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

以下示例展示了相应的`ExampleBean`类：

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public void setBeanOne(AnotherBean beanOne) {
        this.beanOne = beanOne;
    }

    public void setBeanTwo(YetAnotherBean beanTwo) {
        this.beanTwo = beanTwo;
    }

    public void setIntegerProperty(int i) {
        this.i = i;
    }
}
```

### 构造函数依赖注入

在上面的例子中，Setter 方法被声明来匹配 XML 文件中指定的属性。以下示例使用基于构造函数依赖注入（DI）：

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- 使用嵌套的ref元素进行构造函数注入 -->
    <constructor-arg>
        <ref bean="anotherExampleBean"/>
    </constructor-arg>

    <!-- 使用更简洁的ref属性进行构造函数注入 -->
    <constructor-arg ref="yetAnotherBean"/>
    <constructor-arg type="int" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

对应的`ExampleBean`类如下所示：

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public ExampleBean(
        AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {
        this.beanOne = anotherBean;
        this.beanTwo = yetAnotherBean;
        this.i = i;
    }
}
```

在`Bean`定义中指定的构造函数参数将作为`ExampleBean`的构造函数参数使用。

### 静态工厂方法依赖注入

现在考虑这个示例的一个变体，在这个变体中，不是使用构造函数，而是告诉 Spring 调用一个静态工厂方法来返回对象的实例：

```xml
<bean id="exampleBean" class="examples.ExampleBean" factory-method="createInstance">
    <constructor-arg ref="anotherExampleBean"/>
    <constructor-arg ref="yetAnotherBean"/>
    <constructor-arg value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

以下示例展示了相应的`ExampleBean`类：

```java
public class ExampleBean {

	// 私有构造函数
	private ExampleBean(...) {
		...
	}

	// 静态工厂方法；该方法的参数可以被视为返回的Bean的依赖项，
	// 不管这些参数实际上是如何使用的。
	public static ExampleBean createInstance (
		AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {

		ExampleBean eb = new ExampleBean (...);
		// 其他操作...
		return eb;
	}
}
```

静态工厂方法的参数由`<constructor-arg/>`元素提供，与实际使用构造函数时完全相同。
被工厂方法返回的类的类型不一定与包含静态工厂方法的类的类型相同（尽管在这个例子中，它是相同的）。
实例（非静态）工厂方法可以以基本相同的方式使用（除了使用`factory-bean`属性而不是`class`属性），因此我们不在此讨论这些细节。

