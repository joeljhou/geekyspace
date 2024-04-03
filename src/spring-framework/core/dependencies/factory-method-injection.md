---
title: 方法注入
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-26
category: Spring
tag: Spring Framework
---

# 方法注入

在大多数应用场景中，容器中的大多数Bean都是[单例](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-singleton)
的。
当一个单例Bean需要与另一个单例Bean或非单例Bean协作时，通常通过将一个Bean定义为另一个Bean的属性来处理这种依赖关系。
当Bean的生命周期不同时，问题就出现了。 假设单例Bean A 需要在每次调用其方法时使用非单例**原型**（prototype）Bean B。
容器只创建一次单例Bean A，因此只有一次设置属性的机会。容器不能在每次需要Bean B的时候为Bean A提供一个新的实例。

一种解决方案是放弃一些控制反转（inversion of control）。
你可以通过实现[ApplicationContextAware](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-aware)
接口使BeanA意识到容器，并通过[对容器进行`getBean("B")`调用](https://docs.spring.io/spring-framework/reference/core/beans/basics.html#beans-factory-client)
，每次Bean A需要时请求（new一个新的）Bean B实例。 以下示例展示了这种方法：

```java
package fiona.apple;

// Spring-API imports
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * 使用一个具有状态的Command-style类来执行一些处理的类。
 */
public class CommandManager implements ApplicationContextAware {

	private ApplicationContext applicationContext;

	public Object process(Map commandState) {
		// 获取适当Command的新实例
		Command command = createCommand();
		// 在（希望是全新的）Command实例上设置状态
		command.setState(commandState);
		return command.execute();
	}

	protected Command createCommand() {
		// 注意Spring API的依赖！
		return this.applicationContext.getBean("command", Command.class);
	}

	public void setApplicationContext(
			ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}
}
```

上述方法并不理想，因为业务代码意识到并与Spring框架耦合。方法注入（Method Injection）是Spring IoC容器的一种高级特性，可以干净地处理这种用例。

> 你可以在[这篇博客文章](https://spring.io/blog/2004/08/06/method-injection/)中阅读更多关于方法注入的动机。



