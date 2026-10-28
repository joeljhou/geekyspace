---
title: 第九章 Spring Boot2.x 参数校验
shortTitle: 第九章 参数校验
description: 使用 Bean Validation 校验请求对象、嵌套字段和路径参数，并返回客户端错误。
icon: spring
author: 流浪码客
isOriginal: true
date: '2019-04-24'
category: Spring Boot
tag:
  - Spring Boot 2.x
order: 9
---

# 第九章 Spring Boot2.x 参数校验

在实体或请求 DTO 的属性上声明校验规则，在 API 接收对象的参数上添加 `@Valid`，即可由 Spring MVC 触发对象校验。`@Valid` 本身不定义校验规则，也不是给实体加上后就会自动执行校验；具体规则由 `@NotNull`、`@Size` 等约束注解声明。

Boot 2 使用 **`javax.validation.*`**，不要混入 Boot 3+ 的 `jakarta.validation.*`。`@Valid` 来自 `javax.validation.Valid`，下表中的约束注解均来自 `javax.validation.constraints`（Bean Validation 2.0）。

## 1. 校验依赖与常用注解

显式声明校验依赖，避免依赖 Web Starter 间接提供；Boot 2.3 起 Web Starter 不再默认引入校验：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

| 注解 | 校验规则 | 适用类型 |
| --- | --- | --- |
| `@Null` | 值必须为 `null` | 引用类型 |
| `@NotNull` | 值不能为 `null`，但不检查空字符串或空集合 | 引用类型 |
| `@NotEmpty` | 不能为 `null`，且长度或大小必须大于 0 | `CharSequence`、集合、Map、数组 |
| `@NotBlank` | 不能为 `null`，且至少包含一个非空白字符 | `CharSequence`，如 `String` |
| `@AssertFalse` | 值必须为 `false` | `boolean`、`Boolean` |
| `@AssertTrue` | 值必须为 `true` | `boolean`、`Boolean` |
| `@Min(value = …)` | 值必须大于等于指定的最小值，注解参数为 `long` | 整数基本类型及其包装类、`BigInteger`、`BigDecimal` |
| `@Max(value = …)` | 值必须小于等于指定的最大值，注解参数为 `long` | 整数基本类型及其包装类、`BigInteger`、`BigDecimal` |
| `@DecimalMin(value = "…")` | 值默认大于等于指定下限；`inclusive = false` 时必须严格大于 | 整数基本类型及其包装类、`BigInteger`、`BigDecimal`、数字字符串 |
| `@DecimalMax(value = "…")` | 值默认小于等于指定上限；`inclusive = false` 时必须严格小于 | 整数基本类型及其包装类、`BigInteger`、`BigDecimal`、数字字符串 |
| `@Digits(integer = …, fraction = …)` | 整数部分和小数部分的位数分别不超过指定上限，不要求必须有小数部分 | 整数基本类型及其包装类、`BigInteger`、`BigDecimal`、数字字符串 |
| `@Size(min = …, max = …)` | 长度或大小在指定区间内，包含边界 | `CharSequence`、集合、Map、数组 |
| `@Past` | 日期或时间必须早于当前时刻，不包含当前值 | `Date`、`Calendar` 及支持的 `java.time` 类型 |
| `@Future` | 日期或时间必须晚于当前时刻，不包含当前值 | `Date`、`Calendar` 及支持的 `java.time` 类型 |
| `@Pattern(regexp = "…")` | 必须匹配指定的正则表达式，可通过 `flags` 设置匹配选项 | `CharSequence` |
| `@Email` | 必须符合邮箱格式，可通过 `regexp` 和 `flags` 增加约束；不保证邮箱真实存在 | `CharSequence` |

**容易混淆的细节：**

- **非空不等于非空白**：`@NotNull` 允许 `""` 和 `"   "`；`@NotEmpty` 拒绝 `""`，但允许 `"   "`；`@NotBlank` 两者都拒绝。它校验是否包含非空白字符，不会修改或自动裁剪原字符串。
- **多数约束允许 `null`**：除 `@NotNull`、`@NotEmpty`、`@NotBlank` 等非空约束外，上表中的格式、范围、日期和布尔约束均将 `null` 视为合法；必填字段需要组合非空约束，例如 `@NotBlank` 配合 `@Email`。
- **注解必须与字段类型匹配**：`int` 上不能使用 `@Size`，应使用 `@Min`、`@Max` 校验数值范围。类型不匹配通常会抛出 `UnexpectedTypeException`，而不是产生普通的字段校验错误。
- **必填数值优先用包装类**：例如 `@NotNull @Min(1) Integer age` 可以同时检查是否传值和数值下限；`int` 无法表示 `null`，不能靠 `@NotNull` 判断是否缺失。
- **小数边界用字符串表达**：例如 `@DecimalMin("0.01")`；金额等精确小数优先使用 `BigDecimal`。不要依赖 `@Min`、`@Max`、`@DecimalMin`、`@DecimalMax` 对 `float`、`double` 的支持，规范不保证这些浮点类型的可移植性。

## 2. 请求对象与嵌套校验

创建 `UserRequest.java`：

```java
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserRequest {
    @NotBlank(message = "姓名不能为空")
    @Size(max = 50, message = "姓名不能超过 50 个字符")
    private String name;

    @Valid
    @NotNull(message = "地址不能为空")
    private Address address;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public static class Address {
        @NotBlank(message = "城市不能为空")
        private String city;

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }
    }
}
```

**嵌套字段上的 `@Valid` 与 `@NotNull` 作用不同**：前者递归校验内部属性，后者要求对象本身存在。

Controller 中接收 JSON 的方法：

```java
@PostMapping("/users")
public UserRequest create(@Valid @RequestBody UserRequest request) {
    return request;
}
```

方法放在 `@RestController` 中，`@PostMapping`、`@RequestBody` 来自 `org.springframework.web.bind.annotation`。测试请求体 `{"name":"", "address":{"city":""}}` 应得到 HTTP 400；上例只验证输入，不包含持久化业务。

普通表单对象去掉 `@RequestBody`。若要手动处理错误，`BindingResult` 必须紧跟被校验对象参数；不手动接收时，可通过全局异常处理统一响应格式。

## 3. 路径参数校验

Boot 2 的方法参数约束需要在 Controller 类上添加 `@Validated`，并使用非 `final` 的类和可代理的公共方法：

```java
@Validated
@RestController
public class AccountController {
    @GetMapping("/accounts/{id}")
    public String find(@PathVariable("id") @Size(min = 10, max = 32) String id) {
        return id;
    }
}
```

`@Validated` 来自 `org.springframework.validation.annotation`，映射注解来自 `org.springframework.web.bind.annotation`，`@Size` 来自 `javax.validation.constraints`。

方法校验失败通常抛出 `ConstraintViolationException`，需显式转换成 400，避免被当作服务端错误：

```java
@RestControllerAdvice
public class ValidationHandler {
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleConstraintViolation(ConstraintViolationException exception) {
        return "请求参数不合法";
    }
}
```

异常来自 `javax.validation`，`HttpStatus` 来自 `org.springframework.http`，其他注解来自 `org.springframework.web.bind.annotation`。JSON 对象校验的 `MethodArgumentNotValidException` 默认已映射为 400；需要统一响应体时，再增加对应处理方法。
