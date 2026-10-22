---
title: Windows 重装系统
date: 2019-03-15
category:
  - 工具指南
  - Windows 技巧
tags:
  - Windows
  - 系统重装
  - U盘启动
shortTitle: 系统重装
description: Windows 重装实战索引，包含启动盘制作、启动按键、引导顺序调整、分区安装及对应截图。
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
updated: 2026-10-22
created: 2019-03-15T22:23:58
---

# Windows 重装系统

::: danger 操作前
**备份重要文件，保存 BitLocker 恢复密钥，拔掉无关的移动硬盘。** 认不清分区就停止；复制文件时不要拔 U 盘或断电。

图片为旧版 Windows 10 案例，按键和界面以实际设备为准；新装优先选择仍在支持期内的系统。
:::

## 1. 制作启动盘

从 [MSDN](https://msdn.itellyou.cn/) 或 [微软官网](https://www.microsoft.com/zh-cn/software-download/windows11) 下载 ISO → 用 [Rufus](https://rufus.ie/zh/) 选择目标 U 盘和 ISO → 开始。MSDN 为第三方索引站，下载后核对校验值。

U 盘至少 8 GB，制作会清空数据；现代电脑通常选 **GPT + UEFI**，旧式 BIOS 按机型确认。

## 2. 关闭快速启动

参考 [联想说明](https://iknow.lenovo.com.cn/detail/133130) 或 [华硕说明](https://www.asus.com.cn/support/faq/1045548/)。找不到选项或原系统无法进入时可跳过；Windows 快速启动与 BIOS 的 Fast Boot 不同。

## 3. 进入启动菜单（Boot Menu）
插入安装 U 盘，开机时连续点按对应按键。==优先使用一次性启动菜单；需要调整启动顺序时再进 BIOS==。

| 品牌 / 类型     | BIOS 设置            | 一次性启动菜单            |
| ----------- | ------------------ | ------------------ |
| 联想 ThinkPad | `F1`，部分先按 `Enter`  | `F12`              |
| 联想消费级笔记本    | `F2`               | `F12`，部分支持 Novo 菜单 |
| 戴尔 Dell     | `F2`               | `F12`              |
| 惠普 HP       | `Esc` → `F10`      | `Esc` → `F9`       |
| 华硕 ASUS     | 笔记本 `F2`，主板 `Del`  | 笔记本 `Esc`，主板 `F8`  |
| 宏碁 Acer     | 笔记本 `F2`，台式机 `Del` | `F12`，部分需先启用       |
| 微星 MSI      | `Del`              | `F11`              |
| 技嘉 GIGABYTE | `Del`              | `F12`              |

按键以具体机型为准，部分笔记本需要配合 `Fn`。

![原案例：开机画面](http://img.geekyspace.cn/pictures/2026/202610151634991.png)

![原案例：进入 BIOS 或启动菜单](http://img.geekyspace.cn/pictures/2026/202610151634992.png)

## 4. 选择 U 盘启动

在一次性启动菜单中选择 U 盘，现代电脑通常显示为 **`UEFI: U盘名称`**。

**如果通过 BIOS 修改引导优先级，按下面的案例操作；已从启动菜单选中 U 盘的可跳过。**

**① 找到启动顺序，选中 `USB Device`。**

![原案例：查看启动顺序](http://img.geekyspace.cn/pictures/2026/202610151634993.png)

**② 按 `+`，将 `USB Device` 向上移动。** 不同 BIOS 可能使用 `F5 / F6` 等按键，以界面提示为准。

![原案例：按加号上移 USB Device](http://img.geekyspace.cn/pictures/2026/202610151634225.png)

确认 `USB Device` 已排在硬盘启动项之前。

![原案例：USB Device 上移后的顺序](http://img.geekyspace.cn/pictures/2026/202610151634226.png)

**③ 按 `F10`，在“是否保存并退出”的提示中选择 `Yes`，按 `Enter` 确认。**

![原案例：确认保存并退出](http://img.geekyspace.cn/pictures/2026/202610151634227.png)

电脑重启后等待安装程序加载；首次提示“按任意键从 USB 启动”时，按键继续。

![原案例：加载安装程序](http://img.geekyspace.cn/pictures/2026/202610151634228.png)

## 5. 安装设置

**选择语言和键盘 → 下一步 → 现在安装。**

![原案例：语言与键盘设置](http://img.geekyspace.cn/pictures/2026/202610151634229.png)

![原案例：现在安装](http://img.geekyspace.cn/pictures/2026/202610151634230.png)

![原案例：安装程序启动中](http://img.geekyspace.cn/pictures/2026/202610151634231.png)

输入有效密钥；已有数字许可证且页面提供跳过选项时，可选 **我没有产品密钥**，装好后联网检查激活。

![原案例：输入产品密钥](http://img.geekyspace.cn/pictures/2026/202610151634232.png)

![原案例：我没有产品密钥](http://img.geekyspace.cn/pictures/2026/202610151634271.png)

**选择与授权一致的版本**，如家庭版、专业版。部分设备会自动识别并跳过此页。

![原案例：选择系统版本](http://img.geekyspace.cn/pictures/2026/202610151634272.png)

接受许可条款，再选择 **自定义：仅安装 Windows**。

![原案例：接受许可条款](http://img.geekyspace.cn/pictures/2026/202610151634273.png)

![原案例：自定义安装](http://img.geekyspace.cn/pictures/2026/202610151634274.png)

## 6. 分区安装

**按容量、分区大小和卷标核对目标，不要只认“C 盘”或“磁盘 0”。** 保留其他数据时，只处理已确认的原系统分区；空白硬盘选未分配空间，再点击“下一步”。

原案例：选中已确认的原系统分区，点击 **格式化**。此操作会清除该分区的数据。

![原案例：格式化目标分区](http://img.geekyspace.cn/pictures/2026/202610151634275.png)

核对警告，确认目标无误、备份完成后，点击 **确定**。

![原案例：确认格式化](http://img.geekyspace.cn/pictures/2026/202610151634276.png)

选中目标分区，点击 **下一步**。

![原案例：选择目标并继续](http://img.geekyspace.cn/pictures/2026/202610151634277.png)

等待文件复制和安装完成。

![原案例：复制 Windows 文件](http://img.geekyspace.cn/pictures/2026/202610151634278.png)

![原案例：安装进度](http://img.geekyspace.cn/pictures/2026/202610151634206.png)

![原案例：安装更新](http://img.geekyspace.cn/pictures/2026/202610151634207.png)

## 7. 硬盘启动

安装程序提示并开始首次自动重启后，可拔出 U 盘；若再次提示“按任意键从 USB 启动”，**不要按键**。

![原案例：自动重启](http://img.geekyspace.cn/pictures/2026/202610151634208.png)

![原案例：重启阶段拔出 U 盘](http://img.geekyspace.cn/pictures/2026/202610151634209.png)

如果又进入安装界面，**不要重复格式化**，进入启动菜单或 BIOS 改选硬盘启动。

![原案例：进入 BIOS](http://img.geekyspace.cn/pictures/2026/202610151634210.png)

现代电脑通常选择 **Windows Boot Manager**；原案例将 **Hard Disk Drive** 调回优先位置。已经正常进入系统的，无需再改。

![原案例：恢复硬盘启动优先级](http://img.geekyspace.cn/pictures/2026/202610151634211.png)

按 `F10` 保存，在确认框中选择 `Yes`，按 `Enter` 退出。

![原案例：F10 保存](http://img.geekyspace.cn/pictures/2026/202610151634212.png)

![原案例：确认退出](http://img.geekyspace.cn/pictures/2026/202610151634213.png)

## 8. 装后配置

联网 → 更新系统与驱动（缺失驱动到品牌官网按机型下载）→ 检查激活 → 安装软件、恢复文件。

**保持 UAC、防火墙和系统防护开启。下图仅保留旧案例，不建议照图关闭 UAC。**

![旧案例：UAC 设置，建议保持开启](http://img.geekyspace.cn/pictures/2026/202610151635212.png)
