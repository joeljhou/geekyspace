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

## 对其他Bean的引用（合作者）

## 内部 Bean

## 集合（Collection）

## Null和空字符串值

## 使用p命名空间的XML快捷方式

## 使用c命名空间的XML快捷方式

## 复合属性名


