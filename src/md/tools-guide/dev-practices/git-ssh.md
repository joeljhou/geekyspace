---
title: 简单配置实现多个 GitHub 和 Gitee 账号的 SSH 管理
shortTitle: 多账号 SSH 配置
description: 通过 SSH 主机别名和独立密钥，在同一台电脑上管理多个 GitHub 与 Gitee 账号。
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2023-06-20
category: 环境配置
tags:
  - Git
  - GitHub
  - Gitee
  - SSH
---

# 简单配置实现多个 GitHub 和 Gitee 账号的 SSH 管理

> 本文整理自我的 CSDN 原文：[简单配置实现多个 GitHub 和 Gitee 账号的 SSH 管理](https://blog.csdn.net/qq_40174960/article/details/131298464)，首次发布于 2023 年 6 月 20 日。

## 1. 创建密钥目录

执行以下命令，为每个账号创建独立目录：

```shell
mkdir "$HOME/.ssh/github-joeljhou336"
mkdir "$HOME/.ssh/github-rwzhouyu"
mkdir "$HOME/.ssh/gitee-joeljhou"
```

## 2. 生成 SSH 密钥对

为每个账号生成SSH密钥对：

```shell
# Github账号1
ssh-keygen -t ed25519 -C "joeljhou336@gmail.com" -f "$HOME/.ssh/github-joeljhou336/id_ed25519"

## Github账号2
ssh-keygen -t ed25519 -C "zhouyu@liquido.cn" -f "$HOME/.ssh/github-rwzhouyu/id_ed25519"

# Gitee 账号（rsa算法）
ssh-keygen -t rsa -C "2371425251@qq.com" -f "$HOME/.ssh/gitee-joeljhou/id_rsa"
```

## 3. 修改SSH配置文件

打开SSH配置文件 `$HOME/.ssh/config`（如果文件不存在，则可以创建它），并添加以下内容：

```ssh-config
# GitHub 账号 1
Host github-joeljhou336
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-joeljhou336/id_ed25519

# GitHub 账号 1（配置改用 443）
#Host github.com
#    HostName ssh.github.com
#    Port 443
#    User git
#    IdentityFile ~/.ssh/github-joeljhou336/id_ed25519

# GitHub 账号 2
Host github-rwzhouyu
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-rwzhouyu/id_ed25519

# Gitee 账号
Host gitee-joeljhou
    HostName gitee.com
    User git
    IdentityFile ~/.ssh/gitee-joeljhou/id_rsa
```

## 4. 添加公钥到对应账号

### 4.1 Github账号

登录您的 GitHub 账号，进入 **Settings → SSH and GPG keys → New SSH key**，填写标题，并将对应的 `.pub` 文件内容粘贴到 **Key** 字段中。用于 Git 操作时，密钥类型选择 **Authentication Key**，最后点击 **Add SSH key**。

![GitHub 添加 SSH 公钥的设置页面](http://img.geekyspace.cn/pictures/2026/202610160216228.png)

### 4.2 Gitee账号

登录 Gitee 账号，进入 **个人设置 → SSH 公钥**，填写标题，并粘贴对应公钥的完整内容后保存。

![Gitee 添加 SSH 公钥的设置页面](http://img.geekyspace.cn/pictures/2026/202610160216284.png)

## 5. 测试 SSH 连接

使用配置的主机别名分别测试：

```powershell
ssh -T github-joeljhou336
Hi joeljhou! You've successfully authenticated, but GitHub does not provide shell access.

ssh -T github-rwzhouyu
Hi rwzhouyu! You've successfully authenticated, but GitHub does not provide shell access.


ssh -T gitee-joeljhou
Hi joeljhou(@joeljhou)! You've successfully authenticated, but GITEE.COM does not provide shell access.
```

## 6. 克隆仓库

将仓库 SSH 地址中的平台域名替换成对应的 `Host` 别名：

```powershell
# GitHub 账号 1
git clone git@github-joeljhou336:owner/repo.git

# GitHub 账号 2
git clone git@github-rwzhouyu:owner/repo.git

# Gitee 账号
git clone git@gitee-joeljhou:owner/repo.git
```

如果仓库已经克隆，在仓库目录中修改远程地址即可：

```powershell
git remote -v
git remote set-url origin git@github-rwzhouyu:owner/repo.git
```

后续执行 `git pull`、`git push` 时，Git 就会通过该别名使用相应的密钥。若仍使用 `git@github.com:owner/repo.git` 或 HTTPS 地址，则不会匹配这里配置的别名。

## 补充：区分 SSH 账号与提交身份

SSH 密钥决定访问仓库时认证哪个账号，`user.name` 和 `user.email` 决定提交记录中的作者信息，两者相互独立。

个人和工作仓库需要使用不同提交身份时，可以在各自仓库目录中配置，不加 `--global`：

```powershell
git config user.name "Your Name"
git config user.email "work@example.com"

# 检查当前仓库实际生效的提交身份
git config user.name
git config user.email
```

这样即可在同一台电脑上隔离不同账号的仓库访问凭据与提交身份。
