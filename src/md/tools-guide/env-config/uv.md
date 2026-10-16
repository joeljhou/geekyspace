---
title: Python 终极包管理器—uv
shortTitle: uv：Python 包与环境管理
description: uv 安装与使用指南，涵盖 Python 版本管理、项目初始化、依赖与虚拟环境管理、旧项目迁移及 uvx 工具运行。
icon: https://docs.astral.sh/uv/assets/logo-letter.svg
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-10-17
category: 包管理器
tags:
  - uv
  - Python
  - 包管理
---

# Python 终极包管理器—uv

主要官方来源：[uv 官方文档](https://docs.astral.sh/uv/) |  [GitHub](https://github.com/astral-sh/uv) |  [项目管理指南](https://docs.astral.sh/uv/guides/projects/)

> uv 是 Astral 使用 Rust 编写的 Python 包和项目管理工具，可以统一完成 Python 安装、版本切换、虚拟环境创建、依赖管理和命令行工具安装。

## 1. 安装

==macOS== 下推荐使用 Homebrew 安装 uv，参考 [uv 官方安装文档](https://docs.astral.sh/uv/getting-started/installation/#homebrew)：

```shell
brew install uv

# 查看版本
uv --version

# 更新（通过 Homebrew 安装时）
brew upgrade uv
```

## 2. Python 环境搭建

### 安装与查看版本

```shell
# 安装指定版本
uv python install 3.12

# 查看本机已安装的 Python
uv python list --only-installed

# 查看可安装及已安装的 Python
uv python list

# 卸载由 uv 安装的指定版本
uv python uninstall 3.12
```

### 指定项目使用的版本

在项目目录中执行：

```shell
# 将版本记录到 .python-version
uv python pin 3.12

# 确认项目实际使用的版本
uv run python --version
```

> `uv python pin` 指定的是当前项目使用的 Python，不会切换系统的 `python` 命令。已有项目还需满足 `pyproject.toml` 中的 `requires-python` 约束。

## 3. 创建与运行项目

```shell
# 创建项目，指定 Python 版本
uv init --python 3.12 hello-uv
cd hello-uv

# 添加依赖
uv add requests

# 运行初始化生成的示例程序
uv run python main.py
```

已有目录时，在目录中执行 `uv init --python 3.12` 即可。

**日常运行优先使用 `uv run`，无需手动激活虚拟环境。**

### 认识项目文件

| 文件 / 目录 | 作用 | 是否提交 Git |
| --- | --- | --- |
| `pyproject.toml` | 项目信息、支持的 Python 版本范围、依赖声明 | 是 |
| `uv.lock` | 锁定解析后的依赖版本，便于复现环境，由 uv 自动维护 | 是 |
| `.python-version` | 当前项目默认使用的 Python 版本 | 通常是 |
| `.venv/` | 项目虚拟环境，存放 Python 解释器和已安装依赖 | 否 |

`uv init` 主要创建项目配置，后续执行 `uv add`、`uv sync` 或 `uv run` 时会按需创建 `.venv`。

> `.python-version` 表示“本地默认使用哪个 Python”，`requires-python` 表示“项目支持哪些 Python 版本”。切换解释器不会自动放宽项目声明的版本范围。

## 4. 依赖管理

### 添加与删除依赖

在包含 `pyproject.toml` 的项目目录下执行：

```shell
# 添加运行依赖
uv add requests

# 指定版本范围：加引号，避免 > 等符号被 shell 解析
uv add 'httpx>=0.27,<1.0'

# 添加开发依赖
uv add --dev pytest ruff

# 删除运行依赖
uv remove requests

# 删除开发依赖
uv remove --dev ruff
```

`uv add` / `uv remove` 会同步修改 `pyproject.toml`、`uv.lock` 和项目环境，不需要再手动执行一次安装。

### 运行 Python 与项目命令

推荐使用 `uv run`，无需先激活虚拟环境：

```shell
# 运行脚本（将 main.py 替换为实际脚本路径）
uv run python main.py

# 进入 Python 交互环境
uv run python

# 运行测试
uv run pytest

# 代码检查与格式化（需先添加 ruff 开发依赖）
uv run ruff check .
uv run ruff format .
```

> `uv run` 会在运行前检查项目锁文件和环境，按需安装依赖。团队项目中的 pytest、Ruff 等工具建议作为开发依赖，通过 `uv run` 执行，以保持版本一致。

### 同步与更新

克隆项目、切换分支或拉取依赖变更后，使用 `uv sync` 恢复环境：

```shell
# 根据项目配置和锁文件同步环境
uv sync

# 要求锁文件存在且与项目配置一致，否则报错（适合 CI）
uv sync --locked

# 更新指定依赖的锁定版本，再同步到环境
uv lock --upgrade-package requests
uv sync

# 更新所有依赖的锁定版本，再同步到环境
uv lock --upgrade
uv sync
```

> 更新不会突破 `pyproject.toml` 中的版本约束。`uv lock` 只更新锁文件，需执行 `uv sync` 才会安装到环境。`uv sync` 默认会移除未被项目声明的额外包，项目依赖应统一使用 `uv add` 管理。

## 5. 虚拟环境与旧项目

### 继续使用 requirements.txt

不想引入 uv 项目配置时，可以只用 uv 创建环境和安装依赖：

```shell
# 创建虚拟环境
uv venv --python 3.12

# 安装单个包 / 安装依赖文件
uv pip install requests
uv pip install -r requirements.txt

# 激活后运行（macOS / Linux）
source .venv/bin/activate
python main.py

# 退出虚拟环境
deactivate
```

Windows PowerShell 激活命令为 `.venv\Scripts\Activate.ps1`。

**两种依赖管理方式不要混淆：**

- `uv add`：管理项目依赖，更新 `pyproject.toml`、`uv.lock` 和环境，**新项目优先使用**。
- `uv pip install`：只向环境安装包，不更新项目依赖声明和锁文件，适合旧项目或临时环境。

### 迁移为 uv 项目

```shell
# 在旧项目根目录初始化（已有 pyproject.toml 时跳过，先检查配置）
uv init --python 3.12

# 导入依赖
uv add -r requirements.txt

# 如有独立的开发依赖文件
uv add --dev -r requirements-dev.txt
```

迁移后以 `pyproject.toml` 和 `uv.lock` 为准，不要再同时手动维护两套依赖声明。

## 6. 独立脚本与命令行工具

### 临时给脚本提供依赖

不想为了一个脚本创建完整项目时，可以临时指定依赖：

```shell
uv run --no-project --with requests script.py
```

`--no-project` 不读取当前项目配置，`--with` 仅为本次运行提供依赖，不会修改项目依赖声明。

### 临时运行工具：uvx

`uvx` 是 `uv tool run` 的简写，适合偶尔使用的命令行工具：

```shell
# 临时执行 Ruff，不添加到当前项目依赖
uvx ruff check .

# 指定工具版本
uvx ruff@0.11.0 check .
```

> **项目内的工具用 `uv run`，偶尔使用的独立工具用 `uvx`。** `uvx` 不会自动使用项目环境，运行依赖项目环境的测试时，应使用 `uv run pytest`。

### 长期安装工具

```shell
# 安装工具，命令可在终端中直接使用
uv tool install ruff

# 查看已安装工具
uv tool list

# 更新与卸载工具
uv tool upgrade ruff
uv tool uninstall ruff

# 安装后找不到工具命令时，更新 shell 的 PATH 配置
uv tool update-shell
```

执行 `uv tool update-shell` 后，按提示重新打开终端。

## 7. 常用配置与排查

### 配置 PyPI 镜像

默认使用官方 PyPI，网络正常时无需修改。需要使用镜像时，可在项目 `pyproject.toml` 中添加：

```toml
[[tool.uv.index]]
name = "tuna"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
```

`default = true` 将默认 PyPI 地址替换为该镜像。镜像可能存在同步延迟，遇到找不到新版本时，先检查镜像是否已同步。

只临时使用镜像，可以通过命令参数指定：

```shell
uv sync --default-index https://pypi.tuna.tsinghua.edu.cn/simple
```

> `uv sync` / `uv add` 不会直接沿用 pip 的镜像配置。uv 项目应使用自己的索引配置；只使用可信的包索引，私有源凭据不要写入 Git。

### 检查解释器与缓存

```shell
# 查看项目实际使用的解释器路径
uv run python -c "import sys; print(sys.executable)"

# 查看当前可发现的 Python 路径
uv python find

# 查看 uv 缓存目录
uv cache dir

# 清理不再需要的缓存
uv cache prune

# 查看具体子命令帮助
uv add --help
uv python --help
```

> IDE 中提示找不到依赖时，先确认解释器指向项目 `.venv`：macOS / Linux 为 `.venv/bin/python`，Windows 为 `.venv\Scripts\python.exe`。切换项目 Python 版本后执行 `uv sync`，再检查 IDE 配置。
