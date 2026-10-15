---
title: Finder 快速操作与效率提升
shortTitle: Finder 快速操作
description: 用 Automator 为 Finder 添加打开终端、IDE、创建文件和符号链接五个快速操作，附创建步骤和可复制的 AI 提示词。
author: 流浪码客
isOriginal: true
date: 2026-10-16
category: Mac 技巧
tags:
  - macOS
  - Finder
  - Automator
  - Quick Action
---

# Finder 快速操作与效率提升

用 macOS 自带的 **Automator（自动操作）**，给 Finder 添加五个常用操作：

| 保存名称 | 功能 | 接收输入 |
| --- | --- | --- |
| 在终端中打开 | 进入选中目录；选中文件则进入其所在目录 | 文件或文件夹 |
| 在 Trae CN 中打开 | 用 Trae CN 打开选中项 | 文件或文件夹 |
| 创建文件 | 在当前 Finder 窗口创建文件并进入重命名 | 无输入 |
| 在 IntelliJ IDEA 中打开 | 用 IDEA 打开选中项 | 文件或文件夹 |
| 创建符号链接… | 为选中项创建符号链接，保存位置自行选择 | 文件或文件夹 |

## 1. 统一创建步骤

**每个操作单独新建、单独保存：**

1. 打开 **Automator → 新建文稿 → 快速操作**。
2. 顶部设置：工作流程接收 **文件或文件夹**，应用选择 **Finder**；只有“创建文件”改为 **没有输入**。
3. 搜索并拖入 **运行 Shell 脚本**。
4. Shell 选择 **`/bin/zsh`**，传递输入选择 **作为自变量**，不要勾选“输出替换所选文本”。
5. 粘贴对应脚本，按 `⌘S`，使用上表名称保存。

保存后位于 `~/Library/Services/`。选中文件或文件夹，右键 → **快速操作 / 服务** 即可使用。

**创建文件不依赖选中项**：先打开目标 Finder 文件夹，再从屏幕顶部 **Finder → 服务 → 创建文件** 执行。

## 2. 三个打开操作：直接复制

### 在终端中打开

```zsh
for item in "$@"; do
  if [ -d "$item" ]; then
    dir="$item"
  else
    dir="$(dirname "$item")"
  fi
  open -a "Terminal" "$dir"
done
```

### 在 Trae CN 中打开

```zsh
"/Applications/Trae CN.app/Contents/Resources/app/bin/trae-cn" "$@" >/dev/null 2>&1 &
```

Trae CN 需安装在 `/Applications`；安装位置不同时修改脚本路径。

### 在 IntelliJ IDEA 中打开

```zsh
open -a "IntelliJ IDEA" "$@"
```

应用名称与本机不同时，替换 `IntelliJ IDEA`。

## 3. 创建文件、符号链接：复制提示词生成

这两项涉及弹窗、重名处理，用下面的提示词让 AI 生成脚本，再按第 1 节分别保存即可。

```text
请为 macOS Automator 编写两个 Finder 快速操作，按操作分别给出：
保存名称、顶部接收输入设置、可直接粘贴到“运行 Shell 脚本”的完整代码。
只给必要步骤和代码，不展开理论。

共同设置：应用为 Finder，Shell 为 /bin/zsh，传递输入为“作为自变量”，
不使用“输出替换所选文本”。允许在 Shell 中通过 osascript 调用 AppleScript。

一、创建文件
- 不接收输入，不依赖 Finder 选中项。
- 在 Finder 最前窗口的目录创建空文件；没有窗口时使用桌面。
- 默认名称为“未命名.txt”；重名时依次使用“未命名 2.txt”等。
- 不覆盖已有文件、目录或符号链接，包括失效符号链接。
- 创建后在 Finder 中选中文件，通过 System Events 发送 Return 进入重命名。
- 说明首次使用可能需要的自动化、辅助功能权限，以及授权位置。
- 创建失败时给出简短提示。

二、创建符号链接…
- 接收 Finder 选中的一个或多个文件或文件夹。
- 弹出“选择符号链接保存目录”文件夹选择框；取消时静默退出。
- 使用 ln -s 创建链接，名称与源文件或文件夹相同，不复制原内容。
- 同名文件、目录或符号链接（包括失效链接）已存在时跳过，不删除、不覆盖。
- 创建失败也跳过，最后统一提示未创建的项目。

路径必须兼容空格、中文和引号；Shell 参数始终加引号，
AppleScript 拼接 Shell 参数时使用 quoted form of，不使用 eval。
只输出配置步骤与脚本，不执行、安装或修改我的系统配置。
```

## 4. 使用前确认

- **先用临时文件测试**，确认目录、重名和取消行为符合预期。
- **菜单没有出现**：检查是否保存为快速操作、应用是否为 Finder、接收输入是否与上表一致；再到系统设置中搜索“扩展”或“服务”，检查是否启用。
- **创建文件不能自动重命名**：按系统提示授权；在“系统设置 → 隐私与安全性”中检查“自动化”和“辅助功能”。
