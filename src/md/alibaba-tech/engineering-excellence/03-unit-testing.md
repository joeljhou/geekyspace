---
title: 手把手教你单元测试
date: 2026-10-29
category:
  - 阿里技术
  - 软件工程
tags:
  - 单元测试
  - JUnit
  - Mockito
  - 测试设计
  - 重构
  - 持续集成
shortTitle: 单元测试
description: 从测试分层与单测价值出发，掌握四大步骤、八大方法，通过用户保存案例理解依赖隔离、结果断言与交互验证。
author: 流浪码客
isOriginal: true
sticky: false
star: false
icon: article
copyright: 学习笔记由流浪码客整理，课程、截图与引用内容的权利归各自权利人所有。
---

# 手把手教你单元测试

::: info 学习笔记
本文为「阿里技术 · 从0开始学终端」专题的个人学习整理，并非官方文档或课程逐字稿。课程、截图和引用内容的权利归各自权利人所有，不适用本站默认的 MIT 授权；已知课程来源与参考资料见下文。
:::

::: info 课程信息
- 系列：工程卓越之旅
- 视频：[阿里工程师带你学如何做好单元测试](https://www.bilibili.com/video/BV1S24y177g6)
- 发布：阿里技术_AlibabaTech，2023-03-27
- 分享者：泊静（数字供应链事业部）、常意（高德共享出行业务中心）
:::

::: tip 核心观点

**单元测试是缩短反馈周期、建立修改信心的工具，不是追求覆盖率的目标。**

隔离外部依赖，用可自动执行的断言与必要的交互验证，保护业务行为，让缺陷更早暴露，让重构更有把握。
:::

## 1. 单元测试是什么？

> **单元测试**：针对方法、类等小范围代码，==验证其行为是否符合预期==，重点覆盖**业务逻辑、边界条件与异常分支**。遵循 **AIR 原则**：`Automatic`（自动化）、`Independent`（独立性）、`Repeatable`（可重复）。执行应**快速**，并通过**自检查**判断对错。

### 1.1 AAA 结构

每个测试围绕一个明确的场景与预期，按三个步骤编写：

```java
@Test
void shouldReturnTrueWhenNumberIsPositive() {
    int number = 1;  // 1. Arrange 准备：构造对象、输入和依赖行为
    boolean result = NumberUtils.isPositive(number);  // 2. Act 执行：调用被测方法
    assertTrue(result);  // 3. Assert 验证：检查结果、状态或异常
}
```

### 1.2 测试金字塔

按验证范围分为三个层次：各层测试**互补而非替代**。投入比例取决于成本、反馈速度与业务风险，不必机械照搬。

![测试金字塔](https://img.geekyspace.cn/pictures/2026/202610301954683.png)

### 1.3 与集成测试的区别

> **单测验逻辑，集成验协作，系统验完整业务。** 区分依据是测试范围与真实依赖，而不是框架或注解。

| 维度      | 单元测试       | 集成测试        | 系统级测试         |
| ------- | ---------- | ----------- | ------------- |
| 编写人员    | 开发         | 开发          | 开发 / 测试       |
| 代码位置    | 生产代码仓库内    | 生产代码仓库内     | 仓库内 / 外       |
| 编写时机    | 开发时，可先于实现  | 通常发布前       | 发布前，发布后可补充    |
| 成本 / 难度 | 低          | 中           | 高             |
| 反馈速度    | 快，毫秒～秒级    | 较慢，秒～分钟级    | 通常更慢，取决于链路与环境 |
| 覆盖重点    | 局部逻辑、边界、异常 | 正常路径及关键协作异常 | 核心业务链路        |
| 环境依赖    | 无需外部服务     | 本地 / 测试环境   | 部署后的系统环境      |
| 外部依赖模拟  | 全部模拟       | 部分模拟        | 真实环境          |

- **JUnit ≠ 单元测试**：访问真实数据库，仍属于集成测试。
- **系统测试 ≠ UI 测试**：也可通过 API 验证完整业务。

## 2. 单元测试的价值

### 2.1 对组织

> **核心价值：越早发现问题，通常越容易定位，修复成本也越低。**

![尽早测试，让反馈更快、修复更省](https://img.geekyspace.cn/pictures/2026/202610310048714.png)

1. **案例：摆脱“==祈祷式编程==”，建立团队信任。**
	- **现象**：不敢改别人的代码，宁愿重复实现；也不放心别人改自己的代码。
	- **原因**：缺少能快速反馈的回归保护，问题发现太晚，难以建立修改信心。
	- **改进**：用单元测试固化业务意图与关键规则，修改后立即验证已覆盖的行为。
	- **组织收益**：减少对原作者的依赖，让团队更有把握地复用、重构和交接代码，降低重复开发与维护成本。
2. **保证质量的前提下提升软件交付的速度**
	- 写单测虽需投入时间，但能减少反复修改。长期来看，不仅总交付时间不增，反而会缩短。
	![团队效率对比](https://img.geekyspace.cn/pictures/2026/202610302143796.png)

### 2.2 对个人

![单元测试的五大价值](https://img.geekyspace.cn/pictures/2026/202610302151476.png)

## 3. 如何编写单元测试？

### 3.1 工具选择

| 工具            | 主要职责                  | 常见用法                                                             | 选型建议                                            |
| ------------- | --------------------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| **JUnit**     | **运行测试、断言结果**         | `@Test`、`@BeforeEach`、`assertEquals(...)`、`assertThrows(...)`    | 基础测试框架，通常与 Mockito 配合                           |
| **Mockito**   | **隔离依赖、模拟行为、验证调用**    | `mock(...)`、`spy(...)`、`when(...).thenReturn(...)`、`verify(...)` | **优先使用**；新版也支持静态、构造及 final 等模拟，注意版本与配置          |
| **PowerMock** | **扩展特殊模拟能力**，主要用于遗留代码 | `PowerMockito.whenNew(...)`、`PowerMockito.verifyPrivate(...)`    | **Mockito 无法满足时，先优化代码设计，再评估 PowerMock**；注意版本兼容性 |

### 3.2 四大步骤（流程）

**四大步骤是流程，八大方法是工具，按场景选用即可。**

![四个步骤，八大方法](https://img.geekyspace.cn/pictures/2026/202610310111679.png)

#### S1. 定义对象

定义被测对象 → 模拟依赖对象（类成员）→ 注入依赖对象。**重点：明确测谁、依赖谁。**

![步骤1：定义被测对象、模拟并注入成员依赖](https://img.geekyspace.cn/pictures/2026/202610310201175.png)

#### S2. 模拟方法

准备依赖方法的参数、返回数据 → 设定返回值或异常。**重点：控制依赖如何响应。**

![步骤2：准备参数与返回值，模拟依赖方法](https://img.geekyspace.cn/pictures/2026/202610310201932.png)

#### S3. 调用方法

准备输入参数 → 调用真实被测方法 → 验证返回值。**重点：业务逻辑真实执行，结果必须断言。**

![步骤3：准备输入、调用被测方法并验证返回值](https://img.geekyspace.cn/pictures/2026/202610310201433.png)

#### S4. 验证方法

验证依赖调用 → 检查调用参数 → 检查不应发生的交互。**重点：不仅调用正确，传递的数据也要正确。**

![步骤4：验证依赖方法、调用参数与依赖对象](https://img.geekyspace.cn/pictures/2026/202610310201183.jpg)

### 3.3 八大方法（工具）

#### M1. 定义测试对象

**优先直接 `new` 真实对象**；需要部分模拟时再使用 `spy`／`@Spy`。`@InjectMocks` 可辅助创建对象并注入依赖，**不会把被测对象变成 Mock**。

![方法1：直接构造、Spy 与 InjectMocks](https://img.geekyspace.cn/pictures/2026/202610310201334.png)

#### M2. 模拟依赖对象

准备类成员、方法参数和返回值。**普通数据优先真实构造或反序列化，复杂协作对象才按需 Mock。** `@Mock`、`@Spy` 等注解需要初始化；JUnit 5 可使用 `MockitoExtension`。

![方法2：构造、反序列化、Mock 与 Spy](https://img.geekyspace.cn/pictures/2026/202610310201222.png)

#### M3. 注入依赖对象

**优先构造器注入**，也可使用 Setter 或 `@InjectMocks`；反射、`Whitebox` 作为遗留代码的过渡手段。**不要把修改 `static final` 字段当成常规方案。**

![方法3：Setter、反射、Whitebox 与 InjectMocks 注入](https://img.geekyspace.cn/pictures/2026/202610310201774.png)

#### M4. 模拟依赖方法

为指定条件设置返回值、异常或真实调用。**模拟依赖的响应，不替换被测业务逻辑。**

① **按返回行为模拟**：无返回值、固定值、连续返回值、动态结果、异常、调用真实实现。

![方法4：按返回行为模拟依赖方法](https://img.geekyspace.cn/pictures/2026/202610310201096.jpg)

> **图中动态返回值的 `thenReturn(invocation -> ...)` 应改为 `thenAnswer(invocation -> ...)`。** 对 Spy 打桩优先使用 `doReturn(...).when(spy)...`，避免准备阶段执行真实方法。

② **按参数匹配模拟**：无参数、指定值、任意值、可空值、必空值及可变参数。

![方法4：按参数匹配模拟依赖方法](https://img.geekyspace.cn/pictures/2026/202610310201186.jpg)

> **同一次调用中使用了 matcher，其他参数也要使用 matcher。** `anyString()` 等带类型匹配不匹配 `null`，可用 `isNull()` 或 `nullable(Type.class)`；图中可变参数写法需按 Mockito 版本核对。

③ **模拟特殊方法**：final、私有、构造及静态方法。

![方法4：模拟 final、私有、构造及静态方法](https://img.geekyspace.cn/pictures/2026/202610310201285.png)

> **不必一遇到特殊方法就引入 PowerMock。** Mockito 5 默认的 inline Mock Maker 支持多类上述场景；静态与构造 Mock 应及时关闭。私有逻辑优先通过公开行为验证。

#### M5. 调用被测方法

覆盖构造方法、普通方法与静态方法。**有访问权限时直接调用；不可访问的逻辑优先通过公开行为验证**，避免为了测试而大量使用反射。

![方法5：调用构造方法、普通方法与静态方法](https://img.geekyspace.cn/pictures/2026/202610310201376.png)

#### M6. 验证依赖方法

确认依赖方法是否按预期调用，关注**参数、次数与必要的调用顺序**。

① **按参数验证调用**：直接传入预期值，或使用匹配器。

![方法6：按参数验证方法调用](https://img.geekyspace.cn/pictures/2026/202610310201766.png)

② **验证调用次数**：默认一次，也可使用 `never()`、`times(n)`、`atLeast(n)`、`atMost(n)` 等。

![方法6：验证方法调用次数](https://img.geekyspace.cn/pictures/2026/202610310201918.png)

③ **捕获参数**：使用 `ArgumentCaptor`／`@Captor`，再断言实际传入的数据；多次调用可用 `getAllValues()`。④ **特殊方法验证**见图右侧，按需使用，不绑定无关的内部实现。

![方法6：捕获调用参数与验证特殊方法](https://img.geekyspace.cn/pictures/2026/202610310201399.jpg)

#### M7. 验证数据对象

验证返回值、状态、异常，以及捕获的调用参数。**返回正确，不代表传给下游的数据也正确。**

①～③ **空值、布尔值、对象引用**：`assertNull`／`assertNotNull`、`assertTrue`／`assertFalse`、`assertSame`／`assertNotSame`。

![方法7：验证空值、布尔值与对象引用](https://img.geekyspace.cn/pictures/2026/202610310201356.png)

④ **数据值**：简单值、浮点数、数组、集合与复杂对象。**引用相同用 `assertSame`，值相等用 `assertEquals`；浮点断言明确误差范围。**

![方法7：验证简单值、集合与复杂对象](https://img.geekyspace.cn/pictures/2026/202610310201604.jpg)

> 复杂对象优先逐字段或按业务语义比较；**直接比较 JSON 字符串容易受格式、字段顺序等影响**，不作为默认方案。

⑤ **异常内容**：优先用 `assertThrows` 捕获异常，再按业务契约检查消息或错误码，而不只验证异常类型。

![方法7：验证异常类型与异常内容](https://img.geekyspace.cn/pictures/2026/202610310201616.png)

#### M8. 验证依赖对象

从对象整体检查交互：**`verifyNoInteractions` 验证没有调用；`verifyNoMoreInteractions` 验证没有尚未验证的调用。** 后者不代表“从未调用”，也不必每个用例都添加。

![方法8：验证依赖对象的交互与清除调用记录](https://img.geekyspace.cn/pictures/2026/202610310201474.png)

> **图中两点需注意**：`verifyZeroInteractions` 已废弃，新代码按验证意图选择上述两个 API；`clearInvocations()` 不传对象**不会清除所有 Mock**，必须显式指定对象，且只清除调用记录、保留打桩行为。

### 3.4 接入 CI 平台

**Aone 是阿里内部的一站式研发协同平台**，课程在其上演示了单测任务：提交／合并请求自动触发、固定环境、分层执行、查看覆盖率报告、质量门禁阻断回归。内部平台外部无法使用，但流程是通用的，同类产品均可落地：

| 产品                             | 定位           | 说明                                                          |
| ------------------------------ | ------------ | ----------------------------------------------------------- |
| **阿里云云效**                      | 商业 DevOps 平台 | 出自阿里同一套研发体系，Aone 最接近的对外等价物                                  |
| **GitLab CI / GitHub Actions** | 代码托管平台内置     | 配置随仓库走，迁移成本低，新项目默认选项                                        |
| **Jenkins**                    | 自建开源 CI      | 插件生态最全，内网与定制化场景主流，需自行维护                                     |
| **TeamCity / Azure DevOps**    | 商业一体化 DevOps | 与 IDE、项目管理套件集成紧密，常见于企业采购                                    |
| **JaCoCo + SonarQube**         | 覆盖率与质量门禁     | 平台无关的工具链；“新增代码覆盖率”对应 SonarQube New Code 门槛或 diff-cover 增量工具 |

## 4. 案例教学

### 4.1 案例一：最简单的单元测试——判断正数

**被测代码：无状态、无外部依赖，直接根据输入返回结果。**

```java
// NumberHelper.java
import java.util.Objects;

public final class NumberHelper {
    public static final int INT_ZERO = 0;

    public static boolean isPositive(Integer value) {
        return Objects.nonNull(value)
                && Integer.compare(value, INT_ZERO) > 0;
    }
}
```

```java
// NumberHelperTest.java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class NumberHelperTest {
    @Test
    void shouldIdentifyPositiveNumbers() {
        // int 实参会自动装箱为 Integer
        assertFalse(NumberHelper.isPositive(-1), "负数不是正数");
        assertFalse(NumberHelper.isPositive(0), "零不是正数");
        assertTrue(NumberHelper.isPositive(1), "正数应返回 true");

        // 空值与显式构造的 Integer 实参
        assertFalse(NumberHelper.isPositive(null), "null 应返回 false");
        assertFalse(NumberHelper.isPositive(Integer.valueOf(-1)), "负数不是正数");
        assertFalse(NumberHelper.isPositive(Integer.valueOf(0)), "零不是正数");
        assertTrue(NumberHelper.isPositive(Integer.valueOf(1)), "正数应返回 true");
    }
}
```

**重点：==覆盖输入分类与边界，不需要 Mock==。**

- 正数返回 `true`，负数、零和 `null` 返回 `false`；**零是正负之间的关键边界**。
- `&&` 会短路：输入为 `null` 时，不执行后面的比较，避免自动拆箱引发空指针异常。
- 自动装箱与 `Integer.valueOf` 最终调用的是同一个方法，不是两套业务分支。这里保留截图中的两种传参方式；实际项目可用参数化测试减少重复。

### 4.2 案例二：无外部依赖的单元测试——矩形面积

**被测代码：先创建对象，再验证实例方法。** `Shape` 是接口，不是必须 Mock 的外部依赖。

```java
// Shape.java
public interface Shape {
    double getArea();
}

// Rectangle.java
public class Rectangle implements Shape {
    private final double width;
    private final double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double getArea() {
        return width * height;
    }
}
```

```java
// RectangleTest.java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RectangleTest {
    @Test
    void shouldCalculateAreaFromWidthAndHeight() {
        // 准备：宽为 3，高为 4
        Rectangle rectangle = new Rectangle(3.0D, 4.0D);

        // 执行：计算面积
        double area = rectangle.getArea();

        // 验证：预期面积为 12，允许误差为 10^-6
        assertEquals(12.0D, area, 1E-6D, "面积不一致");
    }
}
```

**重点：==被测对象使用真实实例，浮点断言明确误差范围==。**

- 直接 `new Rectangle(...)`，无需 Spring 容器，也无需 Mockito。
- 浮点数计算可能存在精度误差，使用 `assertEquals(expected, actual, delta)`，不要一律用 `==` 判断。
- 截图实现只计算面积，未定义尺寸校验。若业务要求拒绝负数或非有限值，应先明确契约、补充实现，再编写对应异常测试。

### 4.3 案例三：有外部依赖的单元测试——保存用户

**被测代码：保留截图中的 Spring 字段注入形式，观察依赖与业务分支。** 此处仅展示服务类，假定项目已定义以下协作类型：

| 类型            | 本例使用的成员                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| `UserDAO`     | `Long getIdByName(String name)`、`create(UserDO user)`、`modify(UserDO user)` |
| `IdGenerator` | `Long next()`                                                               |
| `UserVO`      | `getName()`、`getDescription()`                                              |
| `UserDO`      | 无参构造器，以及 `setId`、`setName`、`setDescription`                                 |

```java
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;

    @Autowired
    private IdGenerator idGenerator;

    @Value("${userService.canModify}")
    private Boolean canModify;

    public Long saveUser(UserVO userSave) {
        // 按名称查询已有用户 ID
        Long userId = userDAO.getIdByName(userSave.getName());

        if (Objects.isNull(userId)) {
            // 不存在：生成 ID 并创建用户
            userId = idGenerator.next();
            UserDO userCreate = new UserDO();
            userCreate.setId(userId);
            userCreate.setName(userSave.getName());
            userCreate.setDescription(userSave.getDescription());
            userDAO.create(userCreate);
        } else if (Boolean.TRUE.equals(canModify)) {
            // 已存在且允许修改：沿用原 ID
            UserDO userModify = new UserDO();
            userModify.setId(userId);
            userModify.setName(userSave.getName());
            userModify.setDescription(userSave.getDescription());
            userDAO.modify(userModify);
        } else {
            // 已存在且禁止修改：拒绝操作
            throw new UnsupportedOperationException("不支持修改");
        }

        return userId;
    }
}
```

**重点：==业务逻辑真实执行，外部依赖按需隔离==。**

- **隔离对象**：Mock `UserDAO` 和 `IdGenerator`，不访问真实数据库或 ID 服务；`UserVO`、`UserDO` 使用真实数据对象。
- **控制配置**：分别设置允许修改与禁止修改；`Boolean.TRUE.equals(canModify)` 在配置为 `null` 时也不会抛出空指针异常，而是按“不允许修改”处理。
- **覆盖分支**：用户不存在时创建、已存在且允许时修改、已存在且禁止时抛异常。
- **验证结果与副作用**：不仅断言返回 ID 或异常，还要检查写入字段，以及“不生成新 ID”“不进行写入”等禁止行为。

### 4.4 编写案例：保存用户

**用同一个服务方法，串起“准备对象 → 模拟依赖 → 调用方法 → 验证行为”的完整过程。**

#### 例子服务代码

`saveUser` 先按名称查询用户，再决定创建、修改或拒绝操作。测试时隔离 **`UserDAO`、`IdGenerator`**，并控制 **`canModify`** 配置。

![保存用户：服务代码与三个业务分支](https://img.geekyspace.cn/pictures/2026/202610310201854.jpg)

**先列业务分支，再写对应测试：**

| 场景 | 条件 | 返回／异常 | 关键行为 |
| --- | --- | --- | --- |
| **创建** | 查不到同名用户 | 返回新 ID | 生成 ID，调用 `create`，不调用 `modify` |
| **修改** | 用户已存在，允许修改 | 返回原 ID | 调用 `modify`，不创建用户、不生成 ID |
| **异常** | 用户已存在，禁止修改 | 抛出“不支持修改”异常 | 只查询，不写入、不生成 ID |

#### 单元测试用例

**① 搭建单测测试框架**

- **模拟依赖**：`@Mock` 创建 DAO 与 ID 生成器，`@InjectMocks` 创建被测服务并注入依赖，**不启动 Spring 容器**。
- **准备配置**：每个用例执行前，将 `canModify` 设为 `true`；异常用例再单独改为 `false`。
- **准备数据**：JSON 测试资源放在 `src/test/resources/testUserService/` 下，按用例划分目录，分别保存输入数据和预期写入数据。

![搭建测试框架：Mock 依赖、注入被测对象、初始化配置](https://img.geekyspace.cn/pictures/2026/202610310201052.png)

> 截图使用 **JUnit 4 + Mockito**，由 `MockitoJUnitRunner` 初始化注解；`Whitebox` 仅用于设置私有配置字段，**不代表必须使用 PowerMockRunner**。新代码优先构造器注入；迁移到 JUnit 5 时使用 `MockitoExtension`、`@BeforeEach` 和对应断言 API。

**② 测试：保存用户—创建**

- **准备**：查询返回 `null`，ID 生成器返回 `123L`，读取待保存用户数据。
- **执行**：调用 `saveUser`，断言返回新 ID `123L`。
- **验证**：查询、生成 ID、创建用户各调用一次；用 `ArgumentCaptor` 检查写入数据，并确认无额外交互。

**重点：==不仅返回新 ID，还要以正确的 ID、名称和描述创建用户。==**

![创建用例：模拟用户不存在，验证新 ID 与创建参数](https://img.geekyspace.cn/pictures/2026/202610310201654.jpg)

**③ 测试：保存用户—修改**

- **准备**：查询返回已有 ID `123L`，保留允许修改配置，读取修改请求。
- **执行**：调用 `saveUser`，断言返回原 ID `123L`。
- **验证**：捕获 `modify` 参数，检查原 ID 与更新字段；ID 生成器没有调用，DAO 没有其他未验证调用。

**重点：==沿用原 ID，只修改、不创建，也不生成新 ID。==**

![修改用例：验证原 ID、修改参数与禁止生成新 ID](https://img.geekyspace.cn/pictures/2026/202610310201901.jpg)

**④ 测试：保存用户—异常**

- **准备**：将 `canModify` 设为 `false`，查询返回已有用户 ID。
- **执行**：用 `assertThrows` 捕获 `UnsupportedOperationException`，断言消息为“不支持修改”。
- **验证**：只允许查询用户；不调用 ID 生成器，不发生创建或修改。

**重点：==异常类型与消息都要验证，拒绝操作后不能产生写入副作用。==**

![异常用例：禁止修改时验证异常与无写入副作用](https://img.geekyspace.cn/pictures/2026/202610310201329.jpg)

> **案例小结：返回结果要断言，写入参数要检查，禁止行为也要验证。** 图中使用 JSON 字符串比较写入数据，实际项目优先逐字段或按业务语义比较，避免格式差异造成误判。

## 5. 常见问题

> **三类问题：工具用不对、测试层次分不清、只追求覆盖率而不验证行为。**

1. 工具问题：测试框架使用不当
2. 认知问题：把集成测试当成单元测试
3. 实践问题：只执行，不验证

## 6. 回顾

> **好的单元测试，不只是证明代码运行过，而是证明重要的业务行为符合预期，并在行为被破坏时及时报警。**

**参考书籍**

1. 《单元测试的艺术》
2. 《测试驱动开发》
3. 《有效的单元测试》
4. 《重构，改善既有代码的设计》
