---
title: Zsh 别名配置
shortTitle: Zsh 别名配置
description: 三步配置 macOS Zsh 别名：独立文件存放、统一加载、立即生效。
author: 流浪码客
isOriginal: true
date: 2026-10-16
category: Mac 技巧
tags:
  - macOS
  - Zsh
  - aliases
---

# Zsh 别名配置

推荐：**别名放在 `~/.aliases/`，`.zshrc` 只负责加载。** 以下配置适用于 macOS 的 Zsh。

## 1. 创建别名文件

```zsh
mkdir -p ~/.aliases
vim ~/.aliases/common
```

粘贴以下内容并保存（Vim 中先按 `i`，粘贴后按 `Esc`，输入 `:wq` 回车）：

```zsh
alias ll='ls -lh'
alias gs='git status'
alias gd='git diff'
alias gl='git log --oneline -20'
alias zreload='source ~/.zshrc'
mkcd() { mkdir -p -- "$1" && cd -- "$1"; }
```

## 2. 配置自动加载

打开 `~/.zshrc` 尾部添加：

```shell
# 编辑
$vim ~/.zshrc

# 加载别名配置
[ -d "$HOME/.aliases" ] && for f in $HOME/.aliases/*; do [ -f "$f" ] && source "$f"; done

# 立即生效
source ~/.zshrc
```

## 3. 创建更多别名文件

按用途拆分文件，`.zshrc` 会统一加载，不用再改加载配置。下面按需添加即可。

### Git

`~/.aliases/git`

```zsh
alias ga='git add'                # 暂存文件
alias gc='git commit -m'          # 提交并填写说明
alias gsw='git switch'            # 切换分支
alias gsc='git switch -c'         # 创建并切换分支
alias gb='git branch'             # 查看本地分支
alias gpl='git pull --ff-only'    # 拉取更新，分叉时停止
alias gp='git push'               # 推送提交
```

### Python

`~/.aliases/python`

```zsh
# === Zsh 配置 ===
zsh.() { echo "source ~/.zshrc"; source ~/.zshrc; }
zsh~() { echo "vim ~/.zshrc"; vim ~/.zshrc; }

# === Python 虚拟环境 ===
v+() { echo "python3 -m venv .venv"; python3 -m venv .venv; }
v++() { echo "v+ && v."; v+ && v.; }
v.() { for d in .venv venv env; do [ -d "$d" ] && echo "source $d/bin/activate" && source "$d/bin/activate" && return; done; }
v-() { [ -n "$VIRTUAL_ENV" ] && echo "deactivate" && deactivate; }
v--() { v-; echo "rm -rf .venv"; rm -rf .venv; }

# === Jupyter 快捷管理 ===
j+() { echo "pip install jupyter"; pip install jupyter; }
j.() { echo "jupyter notebook"; jupyter notebook; }
j++() { echo "j+ && j."; j+ && j.; }
j-() { echo "pkill -f jupyter"; pkill -f jupyter; }
j--() { j-; echo "pip uninstall -y jupyter"; pip uninstall -y jupyter; }
```

在项目目录中使用：

```zsh
v++       # 创建并激活 .venv（首次使用）
v.        # 激活已有的 .venv、venv 或 env
j++       # 安装并启动 Jupyter（先激活虚拟环境）
# 在启动 Jupyter 的终端按 Ctrl+C，按提示停止服务
v-        # 退出虚拟环境
```

注意：`v--` 会删除当前目录的 `.venv`；`j-` 会终止匹配的 Jupyter 进程，可能影响其他项目；`j--` 还会从当前 Python 环境卸载 `jupyter` 包。日常优先使用上面的命令。

### Claude

`~/.aliases/claude`

```zsh
alias yolo="claude --dangerously-skip-permissions"
```

`yolo` 会跳过权限确认，仅建议在无敏感文件、可随时丢弃的隔离环境中使用；日常直接运行 `claude`。

## 4. 保存后统一生效

```zsh
zreload
```

以后新增或修改任意别名文件，都执行一次 `zreload`；新开的终端会自动加载。