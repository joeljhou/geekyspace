---
title: Java 18 新特性：新增@snipppet标签
description:
author: 流浪码客
isOriginal: true
date: 2024-01-03
category: Java
tag: Java Features
order: 413
---

# Java 18 新特性：新增@snipppet标签

Java 18 引入了`@snippet`标签，用于在API文档中嵌入代码片段，以便更好地展示API的使用方法。

主要特点：

* 有效性检查，代码包含语法错误时，会出现错误提示
* 启用现代样式，例如语法高亮显示，以及名称与声明的自动链接
* 为创建和编辑代码段提供更好的IDE支持

## 存在的@code标签

用于单独的小段代码, 当代码片段复杂时, 使用复合模式的文档注释，如下所示：

```java
 * <pre>{@code
 *     源代码行1
 *     ...
 *     源代码行n
 * }</pre>
```

## 引入@snippet标签

解决了`@code`标签的不足，允许在API文档中直接嵌入代码片段，以便更好地展示API的使用方法。

```java
/**
 * 以下代码显示了如何使用 {@code Optional.isPresent}:
 * {@snippet :
 * if (v.isPresent()) {
 *     System.out.println("v: " + v.get());
 * }
 * }
 */
```

作为外部片段导入

```java
/**
 * 以下代码显示了如何使用 {@code Optional.isPresent}:
 * {@snippet file="ShowOptional.java" region="example"}
 */
```

其中`ShowOptional.java`是一个包含以下内容的文件：

```java
public class ShowOptional {
    void show(Optional<String> v) {
        // @start region="example"
        if (v.isPresent()) {
            System.out.println("v: " + v.get());
        }
        // @end
    }
}
```



