---
title: Spring Boot 中各测试框架
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-09-24
category: Spring Test
tags:
  - spring-test
---
# Spring Boot 中各测试框架
在 Spring Boot 中，常用的测试框架包括 **JUnit 5、Kotest、Spek 和 TestNG**。下面按框架分别介绍核心概念、用法和依赖示例。
## 1️⃣ JUnit 5
**核心特点**
- 官方推荐，Spring Boot 默认集成
- 注解丰富，可管理测试生命周期
- 支持 Spring 集成测试
**生命周期管理**

|注解|用途|
|---|---|
|`@BeforeEach`|每个测试方法执行前|
|`@AfterEach`|每个测试方法执行后|
|`@BeforeAll`|测试类运行前（静态方法）|
|`@AfterAll`|测试类运行后（静态方法）|
|`@DisplayName`|给测试方法提供可读名称|

**依赖示例**
```kotlin
// build.gradle.kts
dependencies {
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    // Spring Boot Test Starter 已经包含 JUnit 5
}

// 或者单独添加
dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.9.2")
    testImplementation("org.springframework:spring-test")
}
```

**示例代码**
```kotlin
@SpringBootTest
class UserServiceTest {
    @Autowired
    private lateinit var userService: UserService

    @BeforeEach
    fun setUp() { /* 每个测试方法执行前 */ }

    @AfterEach
    fun tearDown() { /* 每个测试方法执行后 */ }

    @Test
    fun `should create user successfully`() {
        val result = userService.createUser("test")
        assertThat(result).isNotNull()
    }

    @Test
    @DisplayName("测试用户创建功能")
    fun testCreateUser() { /* 测试逻辑 */ }
}
```
## 2️⃣ Kotest
**核心特点**
- Kotlin 风格，DSL 语法
- 多种测试风格：`FunSpec`、`StringSpec`、`ShouldSpec` 等
- 支持嵌套测试、属性测试和数据驱动测试

**依赖示例**
```kotlin
// build.gradle.kts
dependencies {
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.kotest:kotest-assertions-core:6.0")  // 核心断言库
    testImplementation("io.kotest:kotest-runner-junit5:6.0")    // JUnit5 Runner
    testImplementation("io.kotest:kotest-property:6.0")         // 属性测试（可选）
    testImplementation("io.kotest:kotest-framework-datatest:6.0") // 数据驱动测试（可选）
}
```

**示例代码**
```kotlin
class UserServiceTest : FunSpec({
    val userService = UserService()

    test("应该成功创建用户") {
        val result = userService.createUser("test")
        result shouldNotBe null
    }

    context("当用户输入无效时") {
        test("should throw exception") {
            shouldThrow<IllegalArgumentException> {
                userService.createUser("")
            }
        }
    }
})
```
## 3️⃣ Spek
**核心特点**
- Kotlin DSL，结构清晰
- `describe` / `it` 组织测试
- 生命周期：`beforeEachTest` / `afterEachTest`

**依赖示例**
```kotlin
// build.gradle.kts
dependencies {
    testImplementation("org.spekframework.spek2:spek-dsl-jvm:2.0.19")
    testImplementation("org.spekframework.spek2:spek-runner-junit5:2.0.19")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
}
```

**示例代码**
```kotlin
object UserServiceTest : Spek({
    val userService = UserService()

    describe("UserService") {
        it("应该成功创建用户") {
            val result = userService.createUser("test")
            assertNotNull(result)
        }

        it("应该对无效输入抛出异常") {
            assertFailsWith<IllegalArgumentException> {
                userService.createUser("")
            }
        }
    }
})
```
## 4️⃣ TestNG
**核心特点**
- Java 测试框架，支持分组、依赖和参数化
- 生命周期注解与 JUnit 不同

**生命周期管理**

|注解|用途|
|---|---|
|`@BeforeMethod`|每个测试方法前执行|
|`@AfterMethod`|每个测试方法后执行|
|`@BeforeClass`|测试类前执行|
|`@AfterClass`|测试类后执行|

**依赖示例**
```kotlin
// build.gradle.kts
dependencies {
    testImplementation("org.testng:testng:7.7.1")
    testImplementation("org.springframework:spring-test")
}
```

**示例代码**
```kotlin
@SpringBootTest
class UserServiceTest {

    @Autowired
    private lateinit var userService: UserService

    @BeforeMethod
    fun setUp() { /* 每个方法前 */ }

    @AfterMethod
    fun tearDown() { /* 每个方法后 */ }

    @Test
    fun testCreateUser() {
        val result = userService.createUser("test")
        assertNotNull(result)
    }
}
```

