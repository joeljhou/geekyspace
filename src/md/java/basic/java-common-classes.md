---
title: Java 常用类与工具
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-09-13
category: Java
tags:
  - JavaBasic
---
# Java 常用类与工具
## Object 通用方法
`Object` 类是Java编程语言中的根类（基类），具有以下特点：
- **继承关系**：所有类都直接或间接继承自 `Object` 类
- **默认父类**：如果一个类没有明确指定父类，它会自动继承 `Object` 类
- **核心方法**：提供了所有对象都具备的基本方法

![Object 通用方法](http://img.geekyspace.cn/pictures/2025/202509150047796.png)

## 对象包装器与自动装箱
Java 为每种基本数据类型提供了对应的**包装类（Wrapper Class）**，其特点如下：
- 所有包装类位于 `java.lang` 包中，均为 `final` 类
- 包装类是引用类型，可以像对象一样使用基本类型

![对象包装器类图结构](http://img.geekyspace.cn/pictures/2025/202509150129780.png)

从 Java 5 开始，JDK 支持了**自动装箱/拆箱（Autoboxing / Unboxing）**，简化了基本类型与包装类之间的转换：
```java
Integer i = 100;  // 装箱：基本类型 → 包装类对象
int j = i;        // 拆箱：包装类对象 → 基本类型
```
根据 Java 自动装箱规范，部分包装类在特定范围内使用**缓存池（CachePool）** 复用对象，提高性能，避免重复创建：
- Boolean：缓存 `true` / `false`
- Character：缓存 `\u0000 ~ \u007F`（0 ~ 127）
- Byte：缓存所有取值范围 `[-128, 127]`
- Short / Integer/Long：默认缓存 `[-128, 127]`，其中 `Integer` 上限可通过 JVM 参数调整（`-XX:AutoBoxCacheMax=<size>`）
- Float / Double：不使用缓存
## String
String 是 Java 中最常用的**引用类型**之一，使用`final`修饰，具有**不可变性**（`Immutable`）。
- 位于 `java.lang` 包中
- **线程安全**，可被多个线程共享
- JDK8 底层使用`char`数组实现，JDK9+ 改用`byte`数组+ `coder`编码标志
### String API
```java
1️⃣ 字符串创建
String s = "..."               → 字面量创建（常量池复用）
new String(...)                → 构造函数创建（堆中新建对象）
2️⃣ 长度与空值判断
length()                       → 获取字符串的长度
isEmpty()                      → 判断是否为空（即：length == 0）
isBlank()                      → 判断是否为空白
3️⃣ 字符串查找
indexOf(...)                   → 查找子字符串首次出现位置
lastIndexOf(...)               → 查找子字符串最后出现位置
contains(...)                  → 判断是否包含某子串
4️⃣ 字符串截取
substring(begin)               → 截取子字符串（从 begin 到 结尾）
substring(begin, end)          → 截取子字符串（从 begin 到 end-1）
charAt(index)                  → 获取指定位置字符
5️⃣ 字符串拼接
+                              → 最常用
concat(...)                    → 辅助拼接
String.join(delimiter, ...)    → 多字符串拼接
6️⃣ 字符串替换
replace(old, new)              → 替换字符或子串
replaceAll(regex, replacement) → 正则全局替换
7️⃣ 大小写转换
toUpperCase()                  → 转大写
toLowerCase()                  → 转小写
8️⃣ 字符串比较
equals(...)                    → 精确比较
equalsIgnoreCase(...)          → 忽略大小写
compareTo(...)                 → 字典序比较（负数/0/正数表示小于/相等/大于）
9️⃣ 类型转换与格式化
String.valueOf(...)            → 基本类型转字符串
String.format(...)             → 模板格式化
toCharArray()                  → 字符串转字符数组（char[]）
```
### JDK9+ Compact Strings
- [JEP 254: Compact Strings](https://openjdk.org/jeps/254)
- 前面提到：<u>JDK8 底层使用`char`数组实现，JDK9+ 改用`byte`数组+`coder`编码标志</u>。
- **背景**：JDK8 String 使用 `char[]`，每字符占 2 字节，存储 ASCII/Latin1 时存在内存浪费。
- **优化方案**：JDK9 起改为 `byte[] + coder`，根据字符串内容自动选择最优编码方式：
    - `Latin1` 编码 → 每个字符占 1 字节
    - `UTF-16` 编码 → 每个字符占 2 字节
- **效果**：减少内存占用，提高缓存命中率，且 API 保持兼容。
### [Java21  String Templates](/md/java/features/Java21/jep430-string-templates.html)
### 内存分配演进

1. 在 Java 中，String 是引用类型，其引用存放在**栈（Stack）** 中，对象内容存放在**堆（Heap）** 中。 
2. 通过**字符串常量池（String Pool）** 缓存已创建的字面量，避免重复创建对象，提高内存利用率。 
3. 利用`String.intern()`方法，将字符串对象**放入常量池**，并返回常量池中的对象引用。

**HotSpot中字符串常量池保存哪里？**

| JDK 版本 | 常量池位置                          | 说明                                                                   |
|--------|--------------------------------|----------------------------------------------------------------------|
| ≤ JDK6 | **方法区（Method Area / PermGen）** | 字符串常量池在类加载阶段创建，固定大小，存储在永久代中                                          |
| JDK7   | **堆（Heap）**                    | 为了扩展灵活性，字符串常量池移到了堆，JVM 管理更方便                                         |
| ≥ JDK8 | **堆（Heap）**                    | 方法区被移除（PermGen 被 Metaspace 替代），字符串常量池仍在堆上，`String.intern()` 的对象存储在堆中 |
## Arrays
`Arrays` 类位于 `java.util` 包，是 Java 提供的**数组工具类**，特点如下：
* 方法均为 `static`，无需创建对象即可调用
* 提供对数组的排序、搜索、填充、复制、比较等操作
* 支持基础类型数组与对象数组

**Arrays API**
```java
1️⃣ 排序
Arrays.sort(arr);                             → 升序排序
Arrays.sort(arr, from, to);                   → 指定区间排序 [from, to)
Arrays.sort(arr, Collections.reverseOrder()); → 降序（对象数组）
Arrays.parallelSort(arr);                     → 并行排序（大数组更快）
2️⃣ 搜索
Arrays.binarySearch(arr, key);                → 二分查找，数组需已排序
Arrays.binarySearch(arr, from, to, key);      → 在 [from, to) 区间查找
3️⃣ 比较与哈希
Arrays.equals(arr1, arr2);                    → 数组内容是否相等
Arrays.deepEquals(arr1, arr2);                → 多维数组内容是否相等
Arrays.hashCode(arr);                         → 一维数组哈希
Arrays.deepHashCode(arr);                     → 多维数组哈希
4️⃣ 填充与复制
Arrays.fill(arr, value);                      → 将数组元素全部填充为指定值
Arrays.fill(arr, from, to, value);            → 填充区间 [from, to)
Arrays.copyOf(arr, newLength);                → 复制并改变长度（扩容/缩容）
Arrays.copyOfRange(arr, from, to);            → 复制区间 [from, to)
5️⃣ 转字符串/集合
Arrays.toString(arr);                         → 一维数组转字符串
Arrays.deepToString(arr);                     → 多维数组转字符串
Arrays.asList(arr);                           → 数组 → 固定大小 List 视图
6️⃣ 并行/批量操作（Java 8+）
Arrays.setAll(arr, i -> i * 2);               → 顺序初始化数组
Arrays.parallelSetAll(arr, i -> i * 2);       → 并行初始化数组
Arrays.parallelPrefix(arr, Integer::sum);     → 前缀和计算
7️⃣ 流式 API（Java 8+）
Arrays.stream(arr);                           → 数组 → Stream
Arrays.stream(arr, from, to);                 → [from, to) 区间 → Stream
```
## Math
Math 类位于 `java.lang` 包，是 Java 提供的**数学工具类**。特点如下：
- 使用`final`修饰，具有**不可变性**（`Immutable`），线程安全
- 方法均为 `static`，无需创建对象即可调用 
- 用途：支持基本运算（如加减乘除、取绝对值）、幂运算、三角函数、对数与指数运算、舍入操作，以及生成随机数等

**Math API**
```java
1️⃣ 基本数学运算
Math.abs(x)                    → 绝对值
Math.max(a, b)                 → 最大值
Math.min(a, b)                 → 最小值
Math.signum(x)                 → 符号函数 (-1/0/1)
2️⃣ 幂运算与开方
Math.pow(a, b)                 → a 的 b 次幂
Math.sqrt(x)                   → 平方根
Math.cbrt(x)                   → 立方根
Math.hypot(x, y)               → √(x² + y²)
3️⃣ 指数与对数
Math.exp(x)                    → e 的 x 次幂
Math.expm1(x)                  → e^x - 1
Math.log(x)                    → 自然对数 ln(x)
Math.log10(x)                  → 以 10 为底的对数
Math.log1p(x)                  → ln(1+x)，高精度
4️⃣ 三角函数
Math.sin(x) / Math.cos(x) / Math.tan(x)      → 正弦/余弦/正切
Math.asin(x) / Math.acos(x) / Math.atan(x)   → 反三角函数
Math.atan2(y, x)                             → y/x 的角度（弧度）
5️⃣ 舍入与取整
Math.ceil(x)                   → 向上取整
Math.floor(x)                  → 向下取整
Math.rint(x)                   → 返回最接近 x 的整数（double）
Math.round(x)                  → 四舍五入
Math.floorDiv(a, b)            → 整数除法向下取整
Math.floorMod(a, b)            → 向下取整取模
6️⃣ 随机数与常量
Math.random()                  → 返回 [0~1） 之间随机 double
Math.PI                        → π 常量
Math.E                         → e 常量
```
**常见用法**
```java
1️⃣ 分页计算
int pages = (int) Math.ceil(totalItems / (double) pageSize);  → 向上取整
2️⃣ 随机数生成
int randInt = (int) (Math.random() * n);                      → 0 ~ n-1
double randDouble = Math.random() * (max - min) + min;        → min ~ max
boolean flip = Math.random() < 0.5;                           → 随机布尔
3️⃣ 数值比较与约束
int value = Math.max(minValue, Math.min(maxValue, inputValue)); → 限定范围 [minValue, maxValue]
4️⃣ 取整与舍入
double d = 2.7;
double ceil = Math.ceil(d);   → 3.0 向上取整
double floor = Math.floor(d); → 2.0 向下取整
long round = Math.round(d);   → 3 四舍五入
5️⃣ 几何与距离计算
double distance = Math.hypot(x2 - x1, y2 - y1); → 两点间欧几里得距离
6️⃣ 幂运算
double area = Math.pow(radius, 2) * Math.PI;    → 圆面积
```
## Random
`Random` 类位于 `java.util` 包，是 Java 提供的**伪随机数生成器**，基于 **线性同余算法（LCG）** 实现。特点如下：
- **伪随机**：由确定算法生成，种子相同会得到相同序列。
- **线程不安全**：每个 `Random` 实例在多线程中使用可能会有竞争问题。
  - JDK 8 引入 `ThreadLocalRandom` 解决。 
- **可复现性**：使用相同种子可生成相同随机序列。
- **多种数据类型支持**：可生成 `int`、`long`、`float`、`double`、`boolean` 等随机值。

**Random API**

![Random API](http://img.geekyspace.cn/pictures/2025/202509161341118.png)

**常见用法及扩展**

```java
// Random（单线程随机数）
Random random = new Random();
int min = 10, max = 20;
int randInt = random.nextInt(max - min) + min;                // 区间随机整数 [min, max)
double randDouble = random.nextDouble() * (max - min) + min;  // 区间随机浮点数 [min, max)
List<String> prizes = List.of("奖品A","奖品B","奖品C");
String winner = prizes.get(random.nextInt(prizes.size()));    // List 随机选择
// Java 8+ 流式生成随机整数/双精度
random.ints(5, 50, 100).forEach(System.out::println);
random.doubles().limit(5).forEach(System.out::println);
// ThreadLocalRandom（多线程安全）
int tRand = ThreadLocalRandom.current().nextInt(0, 100);      // 区间随机整数 [0, 100)
double tDouble = ThreadLocalRandom.current().nextDouble();    // 区间浮点数 [0.0, 1.0)
// SplittableRandom（高性能/并行流）
SplittableRandom sr = new SplittableRandom();
sr.ints(5, 50, 100).forEach(System.out::print);
sr.doubles().limit(5).forEach(System.out::println);
```

## 时间日期（Date、Calendar、LocalDateTime 等）

* [Java 日期时间API](https://www.yuque.com/yublog/nokuzy/xkk0xf)

## 序

* [lombok 使用及技巧](https://www.yuque.com/yublog/nokuzy/wmmc6g)
* [stream 使用及其技巧](https://www.yuque.com/yublog/nokuzy/dioi46)
* [lambda 使用及其技巧](https://www.yuque.com/yublog/nokuzy/mtonym)
* [自定义注解(元注解)](https://www.yuque.com/yublog/nokuzy/qb14q0)
* [反射专题-框架的灵魂](https://www.yuque.com/yublog/nokuzy/gff0zc)