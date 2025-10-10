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
## 常用命令
```shell
# 🌟 检查环境
flutter doctor                      # 检查 SDK、IDE、工具链
flutter doctor -v                   # 显示详细信息
# 🌟 设备管理
flutter devices                     # 列出已连接设备/模拟器
flutter emulators                   # 查看可用模拟器
flutter emulators --launch <id>     # 启动指定模拟器
# 🌟 运行项目
flutter run                         # 在默认设备运行
flutter run -d <device_id>          # 指定设备运行
flutter run -d all                  # 所有设备同时运行
# 🌟 管理依赖
flutter pub get                     # 下载依赖（pubspec.yaml 中的包）
flutter pub upgrade                 # 升级依赖
# 🌟 清理与构建
flutter clean                       # 清理缓存和临时文件
flutter build apk                   # 构建 Android APK
flutter build apk --debug           # 构建调试 APK
flutter build apk --split-per-abi   # 按 CPU 架构分包，减小 APK 大小
# 🌟 代码检查与格式化
flutter analyze                     # 静态分析代码
flutter format .                    # 格式化项目代码
# 🌟 iOS 模拟器（仅 macOS）
open -a Simulator                   # 启动 Xcode iOS 模拟器
flutter run -d ios                  # 在 iOS 模拟器运行
```
## 组件（Widget）
### 理解 Flutter 应用
* [🐟代码小抄-理解 Flutter 应用](https://codecopy.cn/post/19cdjq)
	- 1️⃣ StatelessWidget —— 无状态组件
	- 2️⃣ StatefulWidget —— 有状态组件
### StatefulWidget 生命周期
![StatefulWidget 生命周期](http://img.geekyspace.cn/pictures/2025/202510081301653.png)
StatefulWidget 的生命周期可分为 **4 个阶段**：
1. **初始化阶段**：`createState()` → `initState()`
2. **依赖变化与首次构建阶段**：`didChangeDependencies()` → `build()`
3. **状态更新阶段**：`setState()`、`didUpdateWidget()`、`reassemble()`
4. **销毁阶段**：`deactivate()` → `dispose()`

**🧩 各阶段方法说明**
1. `createState()`
	- 当 StatefulWidget 第一次被创建时调用
	- 用于创建对应的 `State` 实例
2. `initState()`
	- State 初始化时调用（仅执行一次）
	- 常用于：
	    - 初始化变量
	    - 发起网络请求 / 初始化数据
	- ⚠️ 不要在此直接调用 `BuildContext` 相关操作（如 `Provider.of`）
3. `didChangeDependencies()`
	- 当依赖的对象（如 `InheritedWidget`）发生变化时调用
	- 在 `initState()` 之后 **会被调用一次**
	- 通常用于依赖外部数据的初始化
4. `build()`
	- 返回要渲染的界面
	- 可能会被调用多次（如 `setState()`、父组件重建）
	- ⚠️ 避免在此执行耗时或带副作用的操作
5. `reassemble()`
	- **仅在 Debug 模式下热重载（Hot Reload）** 时调用
	- 用于调试时更新状态
6. `didUpdateWidget()`
	- 当父组件重建并传入新的配置时调用
	- Flutter 通过 `Widget.canUpdate` 判断是否需要调用此方法
	- 调用后一定会触发 `build()` 重新渲染
7. `setState()`
	- 用于触发状态更新并重新调用 `build()`
	- 只更新当前组件，不影响父组件
8. `deactivate()`
	- 当组件从 Widget 树中**暂时移除**时调用
	- 有可能会再次被插入（如路由切换）
9. `dispose()`
	- 当组件 **永久从树中移除** 时调用
	- 用于：
	    - 释放资源（如 `Controller`、`Stream`、`Timer`）
	    - 取消订阅、关闭动画等
	- 2️⃣ StatefulWidget —— 有状态组件
### Widget/UI布局/交互
![基础Widget/UI布局/交互](http://img.geekyspace.cn/pictures/2025/202510082217670.png)
## 页面跳转（Navigator）
![页面跳转](http://img.geekyspace.cn/pictures/2025/202510100153600.png)
## 网络请求和序列化数据
![网络请求和序列化数据](http://img.geekyspace.cn/pictures/2025/202510100156407.png)



## 参考：
* [Flutter 开发文档](https://docs.flutter.dev/) | [Flutter 中文开发文档](https://docs.flutter.cn/)
* [手动安装Flutter](https://docs.flutter.cn/install/manual) | [安装常见问题](https://docs.flutter.cn/install/troubleshoot#cmdline-tools-component-is-missing)
* [在 Android Studio 或 IntelliJ 里开发 Flutter 应用](https://docs.flutter.cn/tools/android-studio)
* [女程序猿带你从0开始学Flutter：认识Flutter](https://www.bilibili.com/video/BV1p14y1T79R/
* [一个面向初学者的 Flutter 示例项目](https://github.com/joeljhou/hello_flutter)