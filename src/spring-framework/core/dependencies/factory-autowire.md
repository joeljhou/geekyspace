---
title: 自动装配协作者
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-26
category: Spring
tag: Spring Framework
---

# 自动装配协作者（Autowiring Collaborators）

Spring容器可以自动装配协作Bean之间的关系。
你可以通过检查`ApplicationContext`的内容，让Spring自动为你的Bean解析协作对象（其他Bean）。

**自动装配的优势**

* **减少手动配置**：自动装配可以显著减少对手动指定属性或构造方法参数的需求。
  [其他机制](https://docs.spring.io/spring-framework/reference/core/beans/child-bean-definitions.html)
  ，如bean模板，在这方面也是非常有价值的。
* **动态更新配置**：随着项目的发展，对象可能会增加新的依赖。自动装配能够适应这种变化，自动满足新的依赖关系，而无需手动更新配置。
  这一点在项目的迭代开发过程中尤为有用。同时，当项目稳定下来后，开发者仍然可以选择切换到显式装配，以获得更精确的控制。

**四种自动装配模式**

在使用XML配置时，
（参阅 [依赖注入](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)），
可以通过`<bean/>`元素的`autowire`属性来定义Bean的自动装配模式。
Spring提供了四种自动装配模式，允许你为每个Bean单独指定使用哪种模式。以下是这四种模式的详细描述：

| 模式          | 描述                                                                                                                                           |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| no          | **默认模式**：<br />不执行自动装配。开发者需要使用`ref`标签显式声明依赖关系。                                                                                               |
| byName      | **按名称自动装配**：<br />容器会寻找一个属性名称或setter方法名称相匹配的Bean定义将其注入。<br />例如：Bean的属性名为`master`（也就是说，它有一个`setMaster(..)`方法），Spring会寻找名为`master`的Bean定义来注入。 |                    
| byType      | **按类型自动装配**：<br />容器会寻找与属性类型相匹配的Bean定义将其注入。如果存在多个相同类型的Bean，将抛出异常。                                                                            |                                                                                
| constructor | **按构造函数参数类型自动装配**：<br />容器会寻找与构造函数参数类型相匹配的Bean定义将其注入。如果没有匹配的Bean定义，将抛出异常。这种模式确保了Bean在创建时其必需的依赖就已经被满足。                                        |

利用`byType`或`constructor`自动装配模式，你可以装配数组（`array`）和泛型集合（`collection`）。
在这种模式下，Spring容器会自动寻找所有与所需类型相匹配的Bean，并将其注入到定义的数组或集合中，从而满足配置的依赖关系。
此外，当预期的键（key）类型为`String`时，还可以自动装配一个强类型化的`Map`实例。
在这个`Map`中，键（key）将是Bean的名称，而值（value）则是所有匹配期望类型的Bean实例。

> 这样的自动装配`Map`实例，为我们提供了一种便捷的方式来管理和访问一组具有相同类型的Bean，特别是当我们需要根据名称快速查找特定的Bean时。

## 自动装配的局限和缺点

自动装配在项目中保持一致性时效果最佳。如果自动装配没有被普遍采用，而只有少数Bean定义使用它，可能会引起开发人员的困惑。
以下是考虑自动装配时需要注意的限制和缺点：

1. **显式依赖优先**：当存在显式依赖（`property`或`constructor-arg`）时，自动装配将被忽略
2. **不适用于基本类型**：自动装配不适用于基本类型，如`int`、`long`、`String`等，因为它们没有Bean名称
3. **精确性问题**：自动装配不如显式注入精确，因为它依赖于类型匹配，而不是Bean的名称或其他限定符，这可能导致意外的结果
4. **文档化缺失**：自动装配的依赖关系可能不会自动包含在生成的文档中，因此开发者需要额外的文档或注释来解释Bean之间的依赖关系
5. **多重匹配问题**：当存在多个Bean定义与自动装配的属性类型匹配时，Spring将抛出异常。
6. **歧义性**：当存在多个Bean定义与自动装配的属性类型匹配时，Spring将无法确定哪个Bean是首选的,就会抛出异常

你有以下几种方法来解决**多重匹配问题和歧义性**：

* 放弃自动装配，使用显式装配
* 通过将Bean定义的`autowire-candidate`属性设置为`false`来排除Bean
* 通过将Bean定义的`primary`属性设置为`true`来指定首选Bean
* 实现更细粒度的控制，可以使用基于注解的配置方式，
  参阅 [基于注解的容器配置](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html)

## 从自动装配中排除Bean

