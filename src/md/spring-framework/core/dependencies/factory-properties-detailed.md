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

以下示例使用了[p-命名空间](#使用p-命名空间的xml快捷方式)，使得 XML 配置更加简洁：

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

::: note
4.0 版Bean XSD中，不再支持`idref`元素上的`local`属性，因为它与常规的Bean引用没有区别。
在升级到4.0模式时，将你现有的`idref`局部引用改为`idref bean`。
:::

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

::: note
4.0 版Bean XSD中，`ref`元素上的`local`属性不在支持，因为它与常规的Bean引用没有区别。
在升级到4.0模式时，将你现有的`ref`局部引用改为`idref bean`。
:::

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

`<list/>`、`<set/>`、`<map/>`和`<props/>` 元素分别用于设置 Java 集合类型`List`、`Set`、`Map`和`Properties`的属性和参数。

以下示例展示了如何使用它们：

```xml
<bean id="moreComplexObject" class="example.ComplexObject">
    <!-- 调用 setAdminEmails(java.util.Properties) 方法 -->
    <property name="adminEmails">
        <props>
            <prop key="administrator">administrator@example.org</prop>
            <prop key="support">support@example.org</prop>
            <prop key="development">development@example.org</prop>
        </props>
    </property>
    <!-- 调用 setSomeList(java.util.List) 方法 -->
    <property name="someList">
        <list>
            <value>a list element followed by a reference</value>
            <ref bean="myDataSource" />
        </list>
    </property>
    <!-- 调用 setSomeMap(java.util.Map) 方法 -->
    <property name="someMap">
        <map>
            <entry key="an entry" value="just some string"/>
            <entry key="a ref" value-ref="myDataSource"/>
        </map>
    </property>
    <!-- 调用 setSomeSet(java.util.Set) 方法 -->
    <property name="someSet">
        <set>
            <value>just some string</value>
            <ref bean="myDataSource" />
        </set>
    </property>
</bean>
```

`Map`的键值对中的值、或者`Set`中的元素，可以是以下任一元素：

```
bean | ref | idref | list | set | map | props | value | null
```

### 集合合并（merging）

Spring 容器还支持集合合并。开发者可以定义一个父级`<list/>`、`<map/>`、`<set/>`或`<props/>`元素，
并让子级`<list/>`、`<map/>`、`<set/>` 或 `<props/>`元素继承并覆盖父集合中的值。

也就是说，子集合的值是合并父子集合的元素后的结果，其中子集合的元素会覆盖在父集合中指定的值。
这部分关于合并（merging）的内容讨论了父子Bean机制。对于不熟悉父子Bean定义的读者，建议在继续阅读之前阅读[相关章节](https://docs.spring.io/spring-framework/reference/core/beans/child-bean-definitions.html)。

以下示例演示了集合合并（merging）：

```xml
<beans>
    <!-- 父 Bean 定义 -->
    <bean id="parent" abstract="true" class="example.ComplexObject">
        <property name="adminEmails">
            <props>
                <prop key="administrator">administrator@example.com</prop>
                <prop key="support">support@example.com</prop>
            </props>
        </property>
    </bean>
    <!-- 子 Bean 继承父 Bean 定义 -->
    <bean id="child" parent="parent">
        <property name="adminEmails">
            <!-- merge 在子集合定义上进行了指定 -->
            <props merge="true">
                <prop key="sales">sales@example.com</prop>
                <prop key="support">support@example.co.uk</prop>
            </props>
        </property>
    </bean>
<beans>
```

请注意，在子Bean定义的`adminEmails`属性的`<props/>`元素上使用了`merge=true`属性。
当容器解析并实例化子Bean时，生成的实例具有一个`adminEmails Properties`集合，
该集合是合并子Bean的 `adminEmails`集合与父Bean的`adminEmails`集合的结果。

以下列表显示了合并的结果：

```properties
administrator=administrator@example.com
sales=sales@example.com
support=support@example.co.uk
```

子代`Properties`集合的值集继承了父`<props/>`中的所有属性元素，并且子集合中对于`support`键的值会覆盖父代集合中的值。

这种合并行为同样适用于`<list/>`、`<map/>` 和 `<set/>`等集合类型。在`<list/>`元素的特定情况下，与List集合类型相关的语义（即有序值集合的概念）被保留。
父集合的值位于子列表所有值之前。对于Map、Set和Properties集合类型，不存在任何排序。因此，在容器内部使用的关于
Map、Set和Properties实现的集合类型，没有排序语义。

### 集合合并的限制

你不能合并不同的集合类型（例如 Map 和 List）。如果你试图这样做，会抛出一个适当的`Exception`异常。
合并属性（merge attribute）必须在较低层级、被继承的子定义上指定。
在父级集合定义上指定`merge`属性是多余的，不会产生期望的合并行为。

### 强类型集合

得益于Java的泛型特性，你能够创建特定类型的强类型的集合（Collection）。
例如，可以声明一个Collection类型，使其只能包含（例如）String元素。
当你通过Spring进行依赖注入时，Spring的类型转换功能将确保Collection中的元素在添加之前被自动转换为正确的类型。

以下示例 Java 类和 Bean 定义展示了如何实现这一点：

```java
public class SomeClass {

    private Map<String, Float> accounts;

    public void setAccounts(Map<String, Float> accounts) {
        this.accounts = accounts;
    }
}
```

```xml
<beans>
    <bean id="something" class="x.y.SomeClass">
        <property name="accounts">
            <map>
                <entry key="one" value="9.99"/>
                <entry key="two" value="2.75"/>
                <entry key="six" value="3.99"/>
            </map>
        </property>
    </bean>
</beans>
```

当准备注入`something` Bean 的`accounts`属性时，关于强类型`Map<String, Float>`的元素类型的泛型信息可通过反射获得。 
因此，Spring 的类型转换基础设施能够识别出这些值元素属于 `Float` 类型，并将字符串值（9.99、2.75 和 3.99）转换为实际的 `Float` 类型。

## Null和空字符串值

Spring 将属性等的空参数视为空字符串。下面这个基于XML的配置元数据片段将`email`属性设置为空字符串值（`""`）。

```xml
<bean class="ExampleBean">
	<property name="email" value=""/>
</bean>
```

上述示例等同于以下Java代码：

```java
exampleBean.setEmail("");
```

## 使用 p-命名空间

p-命名空间提供了一种便捷的XML配置方式，允许你直接在`bean`
元素的属性中定义属性值或引用其他Bean，而无需使用嵌套的`<property/>`标签。

Spring框架支持通过XML Schema定义的扩展配置格式和命名空间。
虽然`beans`的配置格式在XML Schema文档中有所定义，但p-命名空间并未在XSD文件中声明，它是Spring框架内部的一个特性。

**简化bean属性设置**

以下是一个示例，展示了两种不同的XML配置片段（标准XML格式和使用p-命名空间的格式），它们将产生相同的配置结果：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 用于bean设置的标准XML配置 -->
    <bean name="classic" class="com.example.ExampleBean">
        <property name="email" value="someone@somewhere.com"/>
    </bean>

    <!-- 用于bean设置的p-命名空间快捷方式 -->
    <bean name="p-namespace" class="com.example.ExampleBean"
          p:email="someone@somewhere.com"/>
</beans>
```

这个示例展示了在Bean定义中，p-命名空间中有一个名为`email`的属性。这告诉Spring要包含一个属性声明。
如前所述，p-命名空间没有Schema定义，所以你可以直接使用属性名作为属性值，而无需按照常规方式指定属性值。

**简化bean属性引用**

以下示例包含了两个bean定义，它们都引用了另一个bean：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 用于bean引用的标准XML配置 -->
    <bean name="john-classic" class="com.example.Person">
        <property name="name" value="John Doe"/>
        <property name="spouse" ref="jane"/>
    </bean>

    <!-- 用于bean引用的p-命名空间快捷方式 -->
    <bean name="john-modern"
          class="com.example.Person"
          p:name="John Doe"
          p:spouse-ref="jane"/>

    <!-- 另一个bean定义，名称为jane -->
    <bean name="jane" class="com.example.Person">
        <property name="name" value="Jane Doe"/>
    </bean>
</beans>
```

此示例不仅使用p-命名空间声明了属性值，还使用了一种特殊的格式来声明属性的引用。
第一个bean定义使用了传统的<property/>标签来创建从john到jane的引用，
而第二个bean定义则使用了`p:spouse-ref="jane"`属性，以更简洁的方式实现了相同的依赖注入。

* `p:name`：这是使用p-命名空间设置name属性值的简洁方式
* `p:spouse-ref`：这是使用p-命名空间声明spouse属性的引用，`-ref`后跟被引用Bean

::: note
注意⚠️：p-命名空间不如标准XML格式灵活。例如，声明属性引用的格式与以`Ref`结尾的属性发生冲突，而标准XML格式则不会。
我们建议你谨慎选择这种方式，并将此决策传达给你的团队成员，以避免同时使用这三种格式的XML文档。
:::

## 使用 c-命名空间

与带有[p-命名空间的XML快捷方式](#使用-p-命名空间)类似，
Spring 3.1中引入的c-命名空间，允许使用内联属性来配置构造函数参数，而不是嵌套的`constructor-arg`元素。

以下示例使用c-命名空间来实现与基于构造函数依赖注入相同的功能：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:c="http://www.springframework.org/schema/c"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="beanTwo" class="x.y.ThingTwo"/>
	<bean id="beanThree" class="x.y.ThingThree"/>

	<!-- 传统的声明，可以使用可选的参数名称 -->
	<bean id="beanOne" class="x.y.ThingOne">
		<constructor-arg name="thingTwo" ref="beanTwo"/>
		<constructor-arg name="thingThree" ref="beanThree"/>
		<constructor-arg name="email" value="something@somewhere.com"/>
	</bean>

	<!-- 使用c-命名空间声明参数名称 -->
	<bean id="beanOne" class="x.y.ThingOne" c:thingTwo-ref="beanTwo"
		c:thingThree-ref="beanThree" c:email="something@somewhere.com"/>

</beans>
```

c-命名空间与p-命名空间使用相同的约定（以`-ref`结尾表示Bean引用）来通过名称设置构造函数参数。
同样，即使c-命名空间在XSD模式中未定义（它存在于Spring核心中），但在XML文件中仍然需要声明。

对于构造函数参数名称不可用的罕见情况（通常是因为字节码是在没有调试debug信息的情况下编译的），可以使用参数索引（下标）作为备用，如下所示：

```xml
<!-- c-namespace索引声明 -->
<bean id="beanOne" class="x.y.ThingOne" c:_0-ref="beanTwo" c:_1-ref="beanThree"
      c:_2="something@somewhere.com"/>
```

::: note
由于XML语法限制，索引表示法需要以下划线（_）开头，因为XML属性名不能以数字开头（尽管一些IDE允许这样做）。
对于`<constructor-arg>`元素，也有相应的索引表示法可用，但并不常用，因为通常情况下，普通的声明顺序已经足够了。
:::

在实践中，构造函数解析机制在匹配参数方面非常高效，因此除非确实需要，我们建议在整个配置中始终使用名称标记。

## 复合属性名

在设置Bean属性时，只要路径中除最终属性名外的所有组件不为null，就可以使用复合或嵌套的属性名称。以下是一个Bean定义的示例：

```xml
<bean id="something" class="things.ThingOne">
    <property name="fred.bob.sammy" value="123"/>
</bean>
```

在这个示例中，`something` Bean有一个`fred`属性，该属性又有一个`bob`属性，属性下又有一个`sammy`属性，最终`sammy`属性被设置为值 123。
为了使这个设置生效，除了最终的属性名`sammy`外，要保证路径中的所有属性不为 `null`。否则，将抛出 NullPointerException 异常。
