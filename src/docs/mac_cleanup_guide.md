---
title: Java开发工程师离职前Mac电脑清理指南
author: 会敲代码的程序猿
isOriginal: true
date: 2024-05-31
category: Mac
tag: Mac
---

# Java开发工程师离职前Mac电脑清理指南

[使用“时间机器”备份你的 Mac](https://support.apple.com/zh-cn/104984)

[在 Mac 上更改登录密码](https://support.apple.com/zh-cn/guide/mac-help/mchlp1550/mac)

[抹掉Mac并重新安装MacOS](https://support.apple.com/zh-cn/102655)

[退出登录 Apple ID](https://support.apple.com/zh-cn/guide/mac-help/mchla99dc8da/mac)

[从 Chrome 中退出账号](https://support.google.com/chrome/answer/9159867)

照片清除

[安装最新! CleanMyMac X v4.13.4 中文破解版 Mac优化清理工具](https://www.yuque.com/fengzheng-esndh/althb7/ysszdpbde20glv6u)

[注销 Office](https://support.microsoft.com/zh-cn/office/%E6%B3%A8%E9%94%80-office-5a20dc11-47e9-4b6f-945d-478cb6d92071)

[取消链接OneDrive](https://support.microsoft.com/zh-cn/office/%E5%8F%96%E6%B6%88%E9%93%BE%E6%8E%A5%E5%B9%B6%E9%87%8D%E6%96%B0%E9%93%BE%E6%8E%A5-onedrive-3c4680bf-cc36-4204-9ca5-e7b24cdd23ea)

[OneNote删除笔记本](https://support.microsoft.com/zh-cn/topic/%E5%9C%A8-onenote-for-mac-%E4%B8%AD%E5%88%A0%E9%99%A4%E7%AC%94%E8%AE%B0%E6%9C%AC-d3dd3df2-5ecc-43b8-92c5-4c311d226076)

Adobe Creative Cloud 注销

删除`.ssh`,`.aws`,`.SwitchHosts`文件夹

[备份微信聊天记录](https://support.weixin.qq.com/cgi-bin/readtemplate?t=weixin_winbakup_upgrade)

[备份Typora个性化主题](https://wwi.lanzoup.com/i90iK20austa)

备份`.zshrc`

```shell
# Homebrew
export PATH=/opt/homebrew/bin:/opt/homebrew/sbin:$PATH

# Java
# export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

# Python
export PATH="/Library/Frameworks/Python.framework/Versions/3.11/bin:$PATH"

# Maven
export MAVEN_HOME=/Users/joeljhou/Development/maven/apache-maven-3.9.4
export PATH=$MAVEN_HOME/bin:$PATH

# Gradle
export GRADLE_HOME=/Users/joeljhou/Development/gradle/gradle-8.3
export PATH=$GRADLE_HOME/bin:$PATH
```

账号退出，数据清除

* QQ/微信/Telegram
* QQ音乐/网易云音乐
* Lark/飞书/腾讯会议/百度网盘...
* Shadowrocket小火箭/ClashX机场节点
* Bob翻译软件内秘钥
* 贝瑞向日葵/ToDesk远程账号退出
* Docker容器账号退出
* Termius/Navicat/RDM
* IDEA/WebStorm/DataGrip/VSCode
  * 账号退出
  * 插件账号，Github，Gitee...
  * 数据库连接密码等退出

*  Postman账号退出并移除本地数据
* PicGo清除图传设置
  * 七牛云
    * AccessKey/SecretKey
    * Bucket：`usmap`
    * 访问地址：`http://img.geekyspace.cn` 
    * 存储区域：`na0`

