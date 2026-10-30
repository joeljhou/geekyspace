---
title: 可落地的整洁代码
date: 2026-10-29
category:
  - 阿里技术
  - 软件工程
tags:
  - 整洁代码
  - 简单设计
  - 演进式架构
  - TDD
  - 重构
  - 代码评审
  - 持续集成
shortTitle: 整洁代码
description: 以简单设计为起点，通过测试、重构、代码评审和持续集成，让代码在长期演进中保持清晰、可维护。
author: 流浪码客
isOriginal: true
sticky: false
star: false
icon: article
copyright: 学习笔记由流浪码客整理，课程、截图与引用内容的权利归各自权利人所有。
---

# 可落地的整洁代码

::: info 学习笔记
本文为「阿里技术 · 从0开始学终端」专题的个人学习整理，并非官方文档或课程逐字稿。课程、截图和引用内容的权利归各自权利人所有，不适用本站默认的 MIT 授权；已知课程来源与参考资料见下文。
:::

::: info 课程信息
- 系列：工程卓越之旅
- 视频：[阿里工程师带你学如何写好可落地的整洁代码](https://www.bilibili.com/video/BV1XA411r7Rm)
- 发布：阿里技术_AlibabaTech，2023-02-01
- 分享者：格茸扎西（格茸），数字供应链事业部
:::

::: tip 核心观点

**先用简单设计满足当前需求，再在测试保护下持续重构。**

整洁代码不是格式漂亮、代码最短或模式最多，而是让团队容易理解、修改和长期维护。
:::

## 1. 整洁代码的意义价值

- **编程关注实现，软件工程关注长期演进**：代码需要经受多人协作、版本迭代和业务变化。
- **复杂度会侵蚀效率**：逻辑越混乱，理解与修改成本越高，开发速度就越慢。
- **设计是权衡**：既不能放任代码腐化，也不能为不确定的未来提前堆砌抽象。

**Hyrum 定律**：当 API 使用者足够多时，任何可观察的行为都可能被依赖。例如，接口虽未承诺返回顺序，下游仍可能依赖当前顺序，因此改动时不能只看文档契约。

## 2. 什么是整洁代码？

![什么是整洁代码](https://img.geekyspace.cn/pictures/2026/202610291857267.png)

核心特征：**意图清晰、逻辑直接、职责单一、依赖适当、易于测试和修改。**

- **可读性**：命名表达业务含义，结构体现设计意图，减少阅读者的猜测。
- **可维护性**：修改尽量局部化，不牵动大量无关代码。
- **简单设计**：消除重复与不必要的复杂性，而非追求模式数量。
- **测试保障**：用及时反馈支持修改和重构；测试通过不等于绝无缺陷。

> **童子军军规：每次签入的代码，都比签出时更整洁一点。**

## 3. 走向整洁代码

### 1️⃣ 编码规约

<u>团队代码像一个人写的</u>：统一代码风格，兼顾可读性、可维护性、健壮性、可移植性、互操作性及性能与并发。

- **命名清晰**（术语统一，表达意图）。
- **注释恰当**（解释“为什么”，不重复“做什么”）。
- **短小专注**（函数和类职责单一）。
- **层次一致**（统一抽象层次，提取方法组合）。
- **实践统一**（异常处理、并发控制、链路追踪等）。
- **自动检查**（CI 集成 SonarQube，启用质量门禁）。

### 2️⃣ 简单设计

> Unix 编程哲学：**一个程序只做一件事，并做好。**

<u>满足需求，不为设计而设计</u>：简单设计遵循四项原则，**重要程度依次降低⬇️**：

1. **通过所有测试**（正确性，满足功能）。
2. **尽可能消除重复**（代码质量，减少重复）。
3. **尽可能清晰表达**（可读性，术语统一）。
4. **使用更少的代码元素**（避免过度设计）。

简单不等于代码少：不能为了精简而牺牲功能与表达，也不能为了去重而强行抽象不同的业务逻辑。

### 3️⃣ 持续演进的架构

<u>模型与业务同步变化</u>：架构没有终态，应随团队对领域的认知持续演进，并保护重要的架构特征。

1. **明确领域愿景与能力**：确定要解决什么问题、提供哪些能力，以及职责边界。
2. **统一领域语言，模型可视化**：用一致的术语和可视化模型形成团队共识。
3. **代码表达设计意图**：让代码的命名、结构与领域模型保持一致。
4. **模型与业务共同演进**：将业务变化和新的领域认知及时反映到模型与代码中。
5. **技术债可视化管理**：记录问题、评估影响，定期安排治理。
6. **用架构适应度函数持续验证**：通过质量、设计、业务等指标，检查演进后是否仍满足关键要求。

### 4️⃣ TDD 测试驱动开发

TDD 是**极限编程**倡导的开发方法：**先写测试，再编写满足测试的实现。** 测试既帮助拆分需求、从使用者角度检验接口设计，也是随代码演进的“活文档”。

![TDD循环](https://img.geekyspace.cn/pictures/2026/202610291947739.png)

**两顶帽子，一次只戴一顶：**

1. **实现功能**：在测试辅助下完成当前目标，让测试通过。
2. **重构代码**：在测试保护下消除冗余、改善结构，保持既有行为不变，不同时新增功能。

**测试实践：**

1. **清晰聚焦**：用名称说明场景与预期，每个测试只关注一个行为。
2. **面向公开行为**：通过 `public` API 验证，避免绑定私有实现细节。
3. **适度使用替身**：用 Mock、Stub、Fake 隔离依赖，兼顾保真度与维护成本，避免测试因实现细节变化而脆弱。
4. **先复现再修复**：将 Bug 转化为失败的回归测试，再修改实现。
5. **同等维护**：测试代码与生产代码一样，需要保持清晰并持续改进。

![测试实践](https://img.geekyspace.cn/pictures/2026/202610292001808.png)

### 5️⃣ 重构到模式

**概念：**

1. **重构**：保持外部行为不变，改善代码结构、消除坏味道。
2. **先简单实现，再按需引入模式**：在测试保护下，根据实际变化逐步引入策略、工厂等模式，避免为套用模式而重构。

![重构与模式之间的关系](https://img.geekyspace.cn/pictures/2026/202610292012230.png)

| 类型        | 目标  | 常见动作           |
| --------- | --- | -------------- |
| **理解性重构** | 更好懂 | 重命名、提取方法、移动方法  |
| **设计性重构** | 更易改 | 拆分职责、整理依赖、引入多态 |

**实践要点：**

- **适时整理**：发现重复、理解困难或功能难以扩展时，考虑**重构**。
- **小步验证**：确保相关行为有测试保护，每次改动后运行测试。
- **团队共建**：用 `@WTF` 标记疑问与建议，定期共同评审、重构。

#### `@WTF`注解

`@WTF` 标记示例：**用自定义注解记录问题描述与票数**。

```java
import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({
    ElementType.TYPE, ElementType.METHOD, ElementType.FIELD,
    ElementType.CONSTRUCTOR, ElementType.LOCAL_VARIABLE,
    ElementType.ANNOTATION_TYPE, ElementType.PACKAGE, ElementType.PARAMETER
})
public @interface WTF {
    // 问题描述与改进建议
    String value() default "";

    // 票数
    long vote() default 1;
}
```

使用示例：

```java
@WTF(value = "订单校验与持久化耦合，建议拆分职责", vote = 3)
public void createOrder() {
    // 原有业务实现
}
```

**注解仅作标记**：`vote` 需手动填写，问题汇总与投票统计需另行实现。

### 6️⃣ Code Review

<u>提升质量，共享知识</u>：代码评审是团队对待合入代码进行系统性检查的活动，关注**代码整洁度、设计与性能**，并交流业务知识与设计取舍。

1. **保障质量**：检查逻辑、设计与性能风险。
2. **落地规约**：落实编码规约与最佳实践。
3. **统一风格**：统一代码与设计风格。
4. **共享知识**：促进团队交流与成员成长。
5. **及时改进**：落实评审意见，及时修改问题。
6. **自动化准入**：可自动检查的规则交给 CI。

### 7️⃣ 持续集成：小步提交，尽早反馈

极限编程的“极限”，是将**有效实践做到极致**：既然集成有益，就**每天多次集成，并在每次提交后自动构建、测试**，尽早发现问题，降低集中集成的成本。

**越是痛苦的事，越要小步、频繁地做，让问题更早暴露、更易解决。**

## 4. 两个反例：把握设计的度

**反例一：贷款规则频繁变化，却集中在一个方法中**

以下用 `double` 简化结构演示，公式不代表真实金融规则；生产金额计算应使用 `BigDecimal`，并校验额度、期限等参数。改进代码使用 Java 17 的 `record` 简化数据定义。

```java
// 设计不足：定期贷款与循环额度共用参数，部分参数只对某一类型有效
// 新增类型或修改规则，都要回到这个方法中修改
class LoanCalculator {
    enum Type { TERM, REVOLVING }

    double capital(Type type, double commitment, double outstanding,
                   double years, double riskFactor, double unusedRiskFactor) {
        if (type == Type.TERM) {
            return commitment * years * riskFactor;
        } else if (type == Type.REVOLVING) {
            return (outstanding * riskFactor
                    + (commitment - outstanding) * unusedRiskFactor) * years;
        }
        throw new IllegalArgumentException("不支持的贷款类型：" + type);
    }
}
```

**改进：当两类规则需要独立演进时，让各类型只持有自己的数据与计算逻辑。**

```java
interface Loan {
    double capital();
}

record TermLoan(double commitment, double years, double riskFactor) implements Loan {
    @Override
    public double capital() {
        return commitment * years * riskFactor;
    }
}

record RevolvingLoan(double commitment, double outstanding, double years,
                     double riskFactor, double unusedRiskFactor) implements Loan {
    @Override
    public double capital() {
        double usedCapital = outstanding * riskFactor;
        double unusedCapital = (commitment - outstanding) * unusedRiskFactor;
        return (usedCapital + unusedCapital) * years;
    }
}
```

关键不是消灭 `if/else`，而是**隔离独立变化的规则**。如果只是两条稳定、清晰的分支，保留条件判断即可。

**反例二：只输出 Hello World，却先搭建策略与工厂**

```java
// 过度设计：没有多种输出方式的需求，却预先引入策略接口与工厂层次
interface MessageStrategy {
    void send();
}

abstract class MessageFactory {
    abstract MessageStrategy create();
}

class ConsoleMessageFactory extends MessageFactory {
    @Override
    MessageStrategy create() {
        return () -> System.out.println("Hello World!");
    }
}

public class HelloWorld {
    public static void main(String[] args) {
        MessageFactory factory = new ConsoleMessageFactory();
        MessageStrategy strategy = factory.create();
        strategy.send();
    }
}
```

**改进：当前只有固定文本输出，直接表达意图。**

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

**不是所有分支都要替换成模式，也不是所有未来变化都值得提前设计。**

## 5. 课程回顾

- **整洁代码**：逻辑直接、清晰可读，以简单设计满足需求，而非追求代码最短或模式最多。
- **简单设计**：通过测试 → 消除重复 → 清晰表达 → 避免过度设计，四项原则的重要性依次降低。
- **七项实践**：编码规约、简单设计、持续演进的架构、TDD、重构到模式、Code Review、持续集成。
- **设计尺度**：设计不足时拆分职责，过度设计时删减抽象；以当前需求与真实变化为依据。

**推荐阅读**（以下链接均为英文原版；前四本完整阅读需 O’Reilly 订阅，最后一本为官方免费全文）：

- [《代码整洁之道》](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [《重构：改善既有代码的设计》](https://www.oreilly.com/library/view/refactoring-improving-the/9780134757681/)
- [《重构与模式》](https://www.oreilly.com/library/view/refactoring-to-patterns/0321213351/)
- [《演进式架构》](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/)
- [《Google 软件工程》](https://abseil.io/resources/swe-book/html/toc.html)

> **简单设计是起点，测试提供信心，重构推动演进，评审与持续集成让质量持续落地。**
