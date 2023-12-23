---
# 信息 Frontmatter 配置
title: Java 9 新特性：交互式编程环境JShell
#shortTitle: 交互式编程环境JShell
order: 222
---

## JShell快速入门
**代码复制**
```java
写一段冒泡排序的代码，然后在JShell中执行。
int[] arr = {1, 3, 2, 5, 4};
for (int i = 0; i < arr.length - 1; i++) {
    for (int j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
System.out.println(Arrays.toString(arr));
```

### 启动JShell

### 执行计算

## 查看命令：/help
