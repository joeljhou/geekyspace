---
title: Flutter入门指南
shortTitle:
description: Flutter是一个跨端的平台开发框架
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2025-09-26
category: Flutter
tags:
  - Flutter
---
# Flutter入门
> Flutter 是 Google 推出的跨平台 UI 框架，使用 **Dart** 语言，可一次开发同时运行在 **Android / iOS / Web / 桌面端**。
- 核心理念：**一切皆为组件（Widget）**。
## 环境搭建
### 安装 Flutter SDK
- [Flutter 官方网站](https://flutter.dev) ｜ [Flutter 中文站点](https://flutter.cn)
- [SDK 归档列表](https://docs.flutter.cn/release/archive?tab=macos)
- [国内镜像加速配置](https://docs.flutter.cn/community/china/)

**解压与环境变量配置**
```shell
# 假设解压路径为 ~/Development/sdk/flutter
export PATH="$HOME/Development/sdk/flutter/bin:$PATH"
# 国内镜像
export PUB_HOSTED_URL="https://pub.flutter-io.cn"
export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"

# 配置生效
source ~/.zshrc
```
**检查安装是否成功**
```shell
flutter --version
dart --version
```
**环境诊断命令：`flutter doctor`**
```shell
$ flutter doctor

Doctor summary (查看详细信息，请运行 flutter doctor -v):
[✓] Flutter (稳定通道, 版本 3.35.4, 运行于 macOS 15.6.1 24G90 darwin-arm64, 语言环境 zh-Hans-CN)
[✗] Android 工具链 - 用于开发 Android 设备
    ✗ 无法找到 Android SDK。
      请从 https://developer.android.com/studio/index.html 安装 Android Studio
      首次启动会协助你安装 Android SDK 组件。
      （或者访问 https://flutter.dev/to/macos-android-setup 获取详细说明）。
      如果 Android SDK 已安装在自定义路径，请使用
      `flutter config --android-sdk` 更新该路径。

[✗] Xcode - 用于开发 iOS 和 macOS
    ✗ Xcode 安装不完整；iOS 和 macOS 开发需要完整安装。
      下载地址: https://developer.apple.com/xcode/
      或通过 App Store 安装 Xcode。
      安装完成后运行：
        sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
        sudo xcodebuild -runFirstLaunch
    ✗ 未安装 CocoaPods。
        CocoaPods 是 iOS 或 macOS 平台的包管理工具。
        没有 CocoaPods，插件无法在 iOS 或 macOS 上正常工作。
        更多信息请见 https://flutter.dev/to/platform-plugins
        安装说明请见 https://guides.cocoapods.org/using/getting-started.html#installation
[✓] Chrome - 用于 Web 开发
[!] Android Studio (未安装)
[✓] IntelliJ IDEA Ultimate 版本 (2025.1.3)
[✓] VS Code 版本 (1.104.2)
[✓] 已连接设备 (2 个可用)
[✓] 网络资源

! Doctor 在 3 个类别中发现问题。
```
### 安装 Android Studio
==搭建<u>安卓</u>环境==
1. [下载 Android Studio](https://developer.android.com/studio?hl=zh-cn)
2. 安装 Dart 和 Flutter 插件
3. 安装 SDK Command-line Tools

![安装 SDK Command-line Tools](http://img.geekyspace.cn/pictures/2025/202510071608696.png)

4. 接受 Android SDK 许可证
```shell
$ flutter doctor --android-licenses
# 根据提示逐条输入 y 接受许可证
```
### 安装 XCode
==搭建<u>iOS/macOS</u>环境==
- 通过 [App Store安装 Xcode](https://developer.apple.com/xcode/)
- 安装完成后，在终端执行：
```shell
# 指定 Xcode 路径（支持安装多个）
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
# 首次启动初始化（确保命令行工具可用）
sudo xcodebuild -runFirstLaunch
```
### 安装 CocoaPods
CocoaPods 是 iOS/macOS 平台的依赖管理工具，用于管理 Flutter 插件的本地依赖。
```shell
# 1. 安装 ruby（Mac系统自带，但建议使用 brew 安装新版）
brew install ruby
# 配置 ruby 环境变量
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
# 验证 ruby 是否安装成功
ruby --version

# 2. 安装 CocoaPods
gem install cocoapods
# 配置 gems 环境变量
export PATH="/opt/homebrew/lib/ruby/gems/3.4.0/bin:$PATH"
source ~/.zshrc
```
