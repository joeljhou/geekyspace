---
title: Java Config
shortTitle: Java Config
description: 通过 Configuration 和 Bean 注解，用 Java 配置替代 XML 进行对象装配的示例。
author: 流浪码客
isOriginal: true
date: '2019-04-14'
category: SSM
tag:
  - SSM
  - Spring 5
  - Spring MVC
order: 4
---
# Java Config

通过 Configuration 和 Bean 注解，用 Java 配置替代 XML 进行对象装配的示例。

## Java 配置示例

![Java 配置示例：Java Config配置套路](https://img.geekyspace.cn/pictures/2026/202610271646899.png)

```java
//替代xml成为IOC容器主要的配置来源
@Configuration
public class SpringConfig {

    // @Bean用来初始化对象
    // 默认方法名是BeanId
    // 在方法的内部手动进行实例化操作，并将对象 return 返回
    @Bean
    public IEmpDAO edao(){
        return new EmpDAO();
    }

    @Bean("hService")
    public HrService hrService(){
        HrService hrService = new HrService();
        hrService.setEmpDAO(this.edao());
        return hrService;
    }
}

public class Application {
    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
        IEmpDAO iEmpDAO = (IEmpDAO) ctx.getBean("edao");
        iEmpDAO.create();

        HrService hrService = (HrService) ctx.getBean("hService");
        hrService.entry();
    }
}
```

![Java 配置示例：可维护性](https://img.geekyspace.cn/pictures/2026/202610271646900.png)
