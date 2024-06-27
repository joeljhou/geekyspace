---
title: 方法注入
author: 会敲代码的程序猿
isOriginal: true
date: 2024-03-26
category: Spring
tag: Spring Framework
---

# 方法注入

大多数应用场景中，容器中的大多数Bean都是[单例（singleton）](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-singleton)
的。
当一个单例（singleton）Bean需要与原型（prototype）Bean协作时，传统的注入方式可能不再适用。
这是因为单例Bean在整个应用生命周期内只创建一次，而原型Bean每次请求时都会创建一个新的实例。

一种解决方案是放弃一些控制反转（inversion of control）。
通过实现[ApplicationContextAware](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-aware)
接口使Bean A意识到Spring IoC容器 ，并
[使用容器](https://docs.spring.io/spring-framework/reference/core/beans/basics.html#beans-factory-client)
进行`getBean("B")`调用，每次Bean A需要时请求（新建`new`）Bean B实例。 以下示例展示了这种方法：

```java
package fiona.apple;

// 导入 Spring 框架相关类
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * 使用一个有状态的 Command-style 类来执行一些处理的类。
 */
public class CommandManager implements ApplicationContextAware {

	private ApplicationContext applicationContext;

	public Object process(Map commandState) {
	    // 获取一个适当的 Command 的新实例
		Command command = createCommand();
		// 设置 Command 的状态
		command.setState(commandState);
		return command.execute();
	}

	protected Command createCommand() {
		// 注意 Spring API 的依赖！
		return this.applicationContext.getBean("command", Command.class);
	}

	public void setApplicationContext(
			ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}
}
```

上述方法并不理想，因为业务代码意识到并与Spring框架耦合。
方法注入（Method Injection）是Spring IoC容器的一种高级特性，可以干净地处理这种用例。

> 你可以在[这篇博客文章](https://spring.io/blog/2004/08/06/method-injection/)中阅读更多关于方法注入的动机。

## 查找方法依赖注入

## 任意方法替换


