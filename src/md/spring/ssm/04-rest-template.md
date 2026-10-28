---
title: RestTemplate
shortTitle: RestTemplate
description: 介绍 RestTemplate 同步 HTTP 请求模板，并保存常见 Java HTTP 客户端的对比资料。
icon: spring
author: 流浪码客
isOriginal: true
date: '2020-04-15'
category: SSM
tag:
  - SSM
order: 4
---

# RestTemplate

介绍 RestTemplate 同步 HTTP 请求模板，并保存常见 Java HTTP 客户端的对比资料。

## 学习资料

**RestTemplate 简介** <https://www.bilibili.com/video/av80147197/>
常见的 Http 客户端请求工具：

- JDK HttpURLConnection
- Apache HttpClient 非常常用
- OKHttp 非常常用

RestTemplate 是一个同步的 Web Http 客户端请求模板工具。

## Boot 2.x 中的基本用法

下面是最小调用片段。通过 Boot 提供的 `RestTemplateBuilder` 创建客户端，显式设置超时；请求地址替换为实际服务：

```java
import java.time.Duration;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class HttpClientConfig {
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                .setConnectTimeout(Duration.ofSeconds(3))
                .setReadTimeout(Duration.ofSeconds(5))
                .build();
    }
}
```

在业务组件中通过构造器注入 `RestTemplate`，再调用：

```java
String result = restTemplate.getForObject(
        "https://example.com/api/items/{id}", String.class, 1);
```

`RestTemplate` 是同步客户端，调用期间会占用当前线程。生产代码还需要处理非 2xx 响应、连接失败和超时，重试则要考虑写操作是否幂等。

## 新版本如何选择

维护 Boot 2 项目时，可以继续理解原有的 RestTemplate 调用；在 Framework 6.1（Boot 3.2）起的新代码中，可评估同步的 `RestClient`；响应式链路可评估 `WebClient`。Framework 7 已将 RestTemplate 标为弃用，Boot 4 新代码优先参考 [REST 客户端文档](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html)。
