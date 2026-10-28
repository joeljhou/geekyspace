---
title: 第七章 Spring Boot2.x 热部署、打包与发布
shortTitle: 第七章 打包部署
description: 掌握 DevTools 开发重启、可执行 JAR 打包与 Linux 后台运行，以及外部 Tomcat 的 WAR 部署。
icon: spring
author: 流浪码客
isOriginal: true
date: '2019-03-31'
category: Spring Boot
tag:
  - Spring-Boot-2.x
  - DevTools
  - Maven
  - Tomcat
order: 7
---

# 第七章 Spring Boot2.x 热部署、打包与发布

开发时希望修改代码后快速看到效果，发布时则需要把应用打成可独立运行的部署包。
本章按 **开发重启 → JAR 打包运行 → WAR 容器部署** 展开。

| 场景                | 推荐方式               | 谁提供 Web 容器  |
| ----------------- | ------------------ | ----------- |
| 本地开发，修改代码后快速验证    | IDEA 启动 + DevTools | 应用内嵌 Tomcat |
| 独立发布、Linux 部署     | 可执行 JAR            | 应用内嵌 Tomcat |
| 旧系统要求部署到现有 Tomcat | WAR                | 外部 Tomcat   |

> **常规部署优先使用可执行 JAR**，不需要额外安装 Tomcat。只有明确需要外部 Servlet 容器时，再选择 WAR。本文版本用于旧项目学习与维护，已停止开源维护，不建议新生产项目直接采用。

## 1. 热部署：使用 DevTools 自动重启

### 1.1 引入依赖

在 `pom.xml` 的 `<dependencies>` 中加入，版本由 Spring Boot 父 POM 管理：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

- `runtime`：开发运行时可用，业务代码不需要引用 DevTools 的 API。
- `optional`：其他项目依赖当前项目时，不会传递引入 DevTools；**不表示当前项目不加载它**。

重新加载 Maven 项目后，在 IDEA 中运行 `Application.main()`。

### 1.2 IDEA 编译与验证

DevTools 监控的是 **classpath 中的文件变化，而不是编辑器中的源码变化**。完整过程是：

```text
修改 Java 源码 → IDEA 编译 → target/classes 中的 .class 更新 → DevTools 重启应用
```

按下面的步骤验证：

1. 访问 <http://localhost:8080/hello>，确认接口正常。
2. 修改 `HelloController` 的返回值，例如改成 `Hello DevTools`。
3. 执行 **Build → Build Project**，等待编译完成。
4. 观察控制台中的应用重启日志，再次请求 `/hello`，确认返回值变化。

如果希望减少手动编译，可在 IDEA 的 **Settings → Build, Execution, Deployment → Compiler** 中开启 **Build project automatically**。
![Compiler](http://img.geekyspace.cn/pictures/2026/202610271646351.png)

运行期间是否允许自动构建还取决于 IDEA 版本，部分版本需要在 **Advanced Settings** 中开启 **Allow auto-make to start even if developed application is currently running**。
![Allow auto-make to start even if developed application is currently running](http://img.geekyspace.cn/pictures/2026/202610282241071.png)

### 1.3 自动重启不等于代码热替换

DevTools 通过两个类加载器加快重启：第三方依赖通常由基础类加载器加载，开发中的项目类由重启类加载器加载；发生变化时重建后者并重新初始化应用，避免每次都从头加载全部依赖。

| 修改内容                                   | 默认行为                   |
| -------------------------------------- | ---------------------- |
| Java 类编译结果更新                           | 触发应用重启                 |
| `static/`、`public/`、`templates/` 等资源更新 | 默认不重启应用，可触发 LiveReload |
| 修改 POM、增加依赖                            | 重新加载 Maven 后，通常应手动重启   |

模板和静态文件也需要复制到运行时 classpath 才会被检测到。LiveReload 要自动刷新浏览器，通常还需浏览器扩展配合；它与 Java 应用重启是两回事。

**DevTools 不是任意代码的无感热替换，更不是生产部署机制。**Spring Boot Maven 插件默认从重新打包的归档中排除 DevTools；完整打包应用通过 `java -jar` 启动时，开发工具也默认禁用，不要为生产部署启用远程 DevTools。

## 2. JAR 打包与发布

Spring Boot 可以将业务代码、依赖和内嵌 Tomcat 一起打成**可执行 JAR**。目标服务器只需准备兼容的 Java 运行环境，**无需安装 Maven 或独立 Tomcat**。

本节按 **打包 → 启动验证 → 外部配置 → Linux 后台运行** 完成一次发布。命令统一使用 `quickstart-0.0.1-SNAPSHOT.jar`；截图沿用早期的 `deploy` 示例项目，操作时请替换成自己的文件名和接口路径。

### 2.1 配置插件并打包

Maven 默认打包类型就是 `jar`，可以省略 `<packaging>`。在 `pom.xml` 中保留第一章使用的插件：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

本系列继承了 `spring-boot-starter-parent`，父 POM 已配置插件的 `repackage` 执行，因此声明插件后执行 `package` 即可。若未继承该父 POM，还需自行配置 `repackage`，不能认为只声明插件就一定能生成可执行 JAR。

**方式一：命令行打包。** 在包含 `pom.xml` 的项目根目录执行：

```bash
# 清理旧产物，编译、测试并打包
mvn clean package

# 看到 BUILD SUCCESS 后，查看构建产物
ls -lh target/
```

**方式二：在 IDEA 中保存 Maven 打包配置。** 与命令行打包任选一种即可，也可直接使用 **Maven → Lifecycle** 执行 `clean`、`package`。

① 点击顶部运行配置下拉框，选择 **Edit Configurations…**。

![IDEA：打开 Edit Configurations 编辑运行配置](http://img.geekyspace.cn/pictures/2026/202610282246155.png)

② 点击左上角 **+ → Maven**。这里执行的是 Maven 构建命令，不是启动应用，因此不要选择 JAR Application。

![IDEA：新增 Maven 类型的运行配置](http://img.geekyspace.cn/pictures/2026/202610282246184.png)

③ **Working directory** 选择项目根目录，**Command line** 填写 `clean package`，**Name** 可自定义为 `quickstart [package]`。截图中填的是 `package`，加上 `clean` 可先清理旧产物。

![IDEA：设置 Maven 工作目录、配置名称与打包命令](http://img.geekyspace.cn/pictures/2026/202610282248250.png)

④ 保存后，在顶部选中该 Maven 配置，点击绿色运行按钮执行打包。

![IDEA：选中 Maven 打包配置并执行构建](http://img.geekyspace.cn/pictures/2026/202610282248920.png)

⑤ 控制台出现 `BUILD SUCCESS`，并执行了 Spring Boot 的 `repackage`，说明打包完成。日志中的 `Building jar` 指向生成文件的位置，通常位于项目的 `target/` 下。

![构建日志：生成 JAR 的路径、repackage 执行结果与 BUILD SUCCESS](http://img.geekyspace.cn/pictures/2026/202610282250951.png)

典型产物如下，部署时选择 `.jar`，不要误用 `.jar.original`：

```text
target/
├── quickstart-0.0.1-SNAPSHOT.jar           # Spring Boot 可执行 JAR
└── quickstart-0.0.1-SNAPSHOT.jar.original  # 重新打包前的普通 JAR
```

可执行 JAR 中，`BOOT-INF/classes/` 存放应用类与资源，`BOOT-INF/lib/` 存放依赖。打包失败应先处理编译、测试或环境错误，不要把跳过测试当作默认做法。

> **Maven 配置的运行按钮只负责打包，不会启动 Web 服务。** 生成 JAR 后，还需要执行 `java -jar`。

### 2.2 启动 JAR 并验证

在项目根目录启动，临时使用 `8081` 端口，便于与开发时的 `8080` 区分：

```bash
java -jar target/quickstart-0.0.1-SNAPSHOT.jar --server.port=8081
```

下图演示在终端中运行已经复制到当前目录的 `deploy-0.0.1-SNAPSHOT.jar`。重点是 **`java -jar` 后跟实际 JAR 路径**，不需要再从 IDEA 启动项目。

![终端：通过 java -jar 独立启动 Spring Boot 应用](http://img.geekyspace.cn/pictures/2026/202610282251367.png)

看到应用启动成功日志后，在**另一个终端**验证接口，也可以用浏览器访问同一地址：

```bash
curl http://localhost:8081/hello
```

截图中的旧示例使用 **80 端口和根路径 `/`**，因此浏览器显示为 `localhost`；本节命令对应的是 `http://localhost:8081/hello`，应以实际端口和接口路径为准。

![浏览器：旧示例通过 localhost 的根路径访问页面](http://img.geekyspace.cn/pictures/2026/202610282252220.png)

如果希望在 IDEA 中运行已打好的包，可进入 **Run → Edit Configurations → + → JAR Application**，填写：

| 配置项 | 示例 |
| --- | --- |
| Path to JAR | `target/quickstart-0.0.1-SNAPSHOT.jar` 的绝对路径 |
| JRE | 与项目兼容的 JDK，如本例 JDK 8 |
| VM options | `-Xms256m -Xmx512m` |
| Program arguments | `--server.port=8081` |
| Working directory | 显式选择项目根目录，确定相对配置、日志等路径的基准 |

**JVM 参数放在 `-jar` 前，Spring Boot 应用参数放在 JAR 路径后**，等价命令为：

```bash
java -Xms256m -Xmx512m -jar target/quickstart-0.0.1-SNAPSHOT.jar --server.port=8081
```

堆大小只是演示值，应按实际资源调整。**JAR 运行的是已有构建产物，修改源码后必须重新打包并重启**，不会像 DevTools 那样自动使用编译后的新代码。前台运行时按 `Ctrl+C` 停止应用。

### 2.3 修改外部配置，无需重新打包

修改端口、数据库地址等环境配置时，可以保留同一份 JAR，改用外部配置文件。先通过“修改端口”理解最简单的用法，再扩展到服务器部署。

**① 在启动工作目录中放置 `application.properties`。** 本例将它与 JAR 放在同一目录，并先切换到该目录再启动。

![外部配置：在 JAR 同级目录创建 application.properties](http://img.geekyspace.cn/pictures/2026/202610282252863.png)

**② 将端口设置为 `8080`。** 配置文件只需包含需要覆盖的属性，不必完整复制包内配置：

```properties
server.port=8080
```

![配置文件：将 server.port 修改为 8080](http://img.geekyspace.cn/pictures/2026/202610282253751.png)

截图还包含 `spring.thymeleaf.cache=false`，这是模板开发调试配置，**与修改端口无关，不要直接照搬到生产配置**。

**③ 停止旧进程，重新启动同一份 JAR。** 不要继续携带上一节的 `--server.port=8081`，否则命令行参数会覆盖文件中的 `8080`：

```bash
# 在 application.properties 与 JAR 所在目录执行
java -jar quickstart-0.0.1-SNAPSHOT.jar
```

重启后，本系列接口改用 `http://localhost:8080/hello`；截图中的旧示例访问根路径，所以地址为 `http://localhost:8080`。

![验证结果：重启后通过 localhost:8080 访问旧示例页面](http://img.geekyspace.cn/pictures/2026/202610282254696.png)

> **不重新打包 ≠ 不重启。** 普通 Spring Boot 应用不会因为编辑了外部文件就自动刷新端口。默认外部搜索位置与**进程工作目录**有关，并非自动定位到 JAR 所在目录；如果从其他目录执行 `java -jar /path/to/app.jar`，不能假定 JAR 旁边的配置一定会被加载。

**服务器部署时，建议显式指定配置目录与 Profile。** 例如：

```text
/opt/quickstart/
├── quickstart-0.0.1-SNAPSHOT.jar
├── config/
│   └── application-prod.properties
└── logs/
```

外部文件 `/opt/quickstart/config/application-prod.properties`：

```properties
server.port=8080

# 仅在应用包含数据源时配置，账号与密码由部署环境提供
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

准备好所需环境变量后，启动时指定：

```bash
java -jar /opt/quickstart/quickstart-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=prod \
  --spring.config.additional-location=file:/opt/quickstart/config/
```

- `spring.profiles.active=prod`：激活 `prod`，加载公共配置和 `prod` 配置；不要只把激活参数写进待激活的 `application-prod.properties`。
- `spring.config.additional-location`：在默认位置之外追加配置位置，外部同名属性可覆盖包内配置；目录路径需以 `/` 结尾。
- `spring.config.location`：替换默认配置搜索位置，不要将它误当成追加配置使用。

更完整的优先级和版本差异见[第二章：常用配置](02-configuration.md)。密码不要写进版本库，也不要直接拼在启动命令里。

### 2.4 Linux 后台运行、日志与停止

将 JAR 上传至 `/opt/quickstart/`，准备好外部配置和环境变量，并确认运行账号具有相应权限。不要长期使用 root 运行应用；本例使用 `8080`，截图中的 `80` 端口只是旧示例。

**① 检查环境与端口。** 进入部署目录，确认 Java 版本，并检查将要使用的端口：

```bash
java -version
cd /opt/quickstart
mkdir -p logs

# 查看 8080 端口的 TCP 监听情况；进程信息是否可见取决于权限
ss -ltnp 'sport = :8080'
```

旧系统也可使用截图中的 `netstat -tulpn` 查看监听端口。若端口已占用，应先确认进程归属，再决定停止旧实例或换端口，不能直接结束不明进程。

![Linux：进入部署目录并使用 netstat 检查端口占用](http://img.geekyspace.cn/pictures/2026/202610282256066.png)

**② 使用 `nohup` 后台启动。** 直接前台执行 `java -jar` 时，退出 XShell / SSH 会话可能导致应用收到挂断信号而终止；这不是 Linux 系统关闭。先停止前台测试实例，再执行：

```bash
# 后台启动，将标准输出和错误输出追加到同一个日志文件
nohup java -jar quickstart-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=prod \
  --spring.config.additional-location=file:/opt/quickstart/config/ \
  >> logs/quickstart.log 2>&1 &

# 立即记录本次后台任务的 PID
printf '%s\n' "$!" > quickstart.pid
```

截图使用 `stdout.log` 保存输出，本节统一放入 `logs/quickstart.log`；日志文件名可以自定义，但后续查看时必须保持一致。

![Linux：通过 nohup 后台启动应用并将输出追加到日志文件](http://img.geekyspace.cn/pictures/2026/202610282257627.png)

| 写法 | 作用 |
| --- | --- |
| `nohup` | 忽略终端挂断信号，避免应用仅因会话挂断而退出 |
| `>> logs/quickstart.log` | 追加日志，不覆盖已有内容 |
| `2>&1` | 将标准错误合并到标准输出，异常也进入同一日志文件 |
| `&` | 将命令放到后台执行 |
| `$!` | 最近一次启动的后台任务 PID；记录 PID 不代表应用启动成功 |

**③ 查看日志并验证服务。** 在当前部署目录执行：

```bash
# 持续查看日志，按 Ctrl+C 退出追踪
tail -f logs/quickstart.log
```

![Linux：使用 tail -f 实时查看应用日志](http://img.geekyspace.cn/pictures/2026/202610282257591.png)

`tail -f` **只是实时追踪日志，不是实现“静默运行”或后台运行的命令**。对它按 `Ctrl+C` 只会停止追踪，不会停止后台应用。确认本次启动日志无错误后，在另一个终端执行 `curl http://localhost:8080/hello` 验证。

远程访问还需检查监听地址、防火墙和安全组；本机可访问不代表外部网络一定可达。

**④ 核对进程后停止。** 可结合端口信息和 PID 文件定位应用，但不要直接照抄截图中的 PID：

```bash
cd /opt/quickstart
PID=$(cat quickstart.pid)
ps -p "$PID" -o pid=,user=,args=
```

![Linux：通过监听端口定位 Java 进程；图中的 kill -9 不作为默认停止方式](http://img.geekyspace.cn/pictures/2026/202610282258859.png)

**确认用户、JAR 路径和参数确实属于本应用后**，再在同一终端执行 `kill "$PID"`，发送默认的 `SIGTERM`，让应用有机会执行退出清理。旧 PID 可能失效或被复用，不要只凭 PID 文件结束进程，也不要模糊匹配并批量结束 Java 进程。

截图使用的 `kill -9` 会强制终止进程，无法执行正常退出清理，不应作为常规停止方式；仅在正常停止无效、确认原因与影响后考虑。停止后可再次检查端口和进程，确认旧实例已退出。

> **生产部署不要只依赖 `nohup`。** 它不负责故障重启、开机自启和日志轮转，应由 [systemd](/md/cloudnative/linux/basic/systemd-basics.md) 或容器平台管理进程生命周期。发布新版本前先验证新包并保留可回退版本，按部署流程停止或切换旧实例，**不要覆盖仍在运行的 JAR**。

## 3. WAR 打包与外部 Tomcat 部署

当运行环境要求把应用放入已有 Tomcat 时，可以改用 WAR 部署。以下是在 JAR 项目基础上的**另一种部署选择**，适用于本系列的 Spring MVC / Servlet 应用，不适用于 WebFlux。

完整过程是 **修改打包方式 → 声明容器依赖 → 增加初始化入口 → 构建 WAR → 交给外部 Tomcat 部署**。截图仍使用 `deploy` 项目，以下命令统一使用 `quickstart.war`。

### 3.1 修改打包方式与容器依赖

在 `pom.xml` 的 `<project>` 下，将打包方式设置为 `war`：

```xml
<packaging>war</packaging>
```

![POM：将 packaging 设置为 war](http://img.geekyspace.cn/pictures/2026/202610282259676.png)

保留 `spring-boot-starter-web`，并在 `<dependencies>` 中显式声明 Tomcat 为 `provided`：

```xml
<!-- 外部部署时由目标 Tomcat 提供 Servlet 容器 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

这里调整的是 **Tomcat 依赖的作用域，不是删除 Maven 插件**。`provided` 让编译和测试时仍可使用相关类型，外部部署时由容器提供运行环境，避免将内嵌 Tomcat 当成普通依赖放入 `WEB-INF/lib/`。

继续保留 `spring-boot-maven-plugin`。为便于后续访问，本例还在已有的 `<build>` 中添加：

```xml
<finalName>quickstart</finalName>
```

这样产物名固定为 `quickstart.war`。未设置 `finalName` 时，默认文件名通常包含版本号，后续部署文件名和访问路径也要相应调整；**仅重命名运行配置，不会改变构建产物类型或名称**。

### 3.2 增加 Servlet 容器初始化入口

独立运行时由 `main()` 启动应用，部署到外部 Tomcat 时则需要 Servlet 容器初始化入口。在 `DemoApplication` 所在包中新增 `ServletInitializer.java`：

```java
package cn.geekyspace.quickstart;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(DemoApplication.class);
    }
}
```

`builder.sources(DemoApplication.class)` 指定应用的配置源，请替换为项目实际的 `@SpringBootApplication` 启动类。

在 IDEA 中，也可以先让类继承 `SpringBootServletInitializer`，再使用 **Code → Override Methods…** 生成重写方法：

![IDEA：通过 Code 菜单选择 Override Methods](http://img.geekyspace.cn/pictures/2026/202610282301265.png)

选中 `configure(SpringApplicationBuilder builder)`，确认后将方法体改为上面的 `builder.sources(...)`：

![IDEA：选择重写 SpringBootServletInitializer 的 configure 方法](http://img.geekyspace.cn/pictures/2026/202610282301679.png)

截图在启动类上直接继承 `SpringBootServletInitializer`，本例选择单独的 `ServletInitializer`，两种写法任选一种，**不需要同时添加两个初始化入口**。

保留原来的 `DemoApplication` 和 `main()` 方法。两种启动路径如下：

```text
独立运行：java -jar → Spring Boot 启动器 → DemoApplication.main()
外部部署：Tomcat → ServletInitializer → 创建 Spring 应用上下文
```

因此，不是“`main()` 失效”，而是**外部容器部署不通过 `main()` 启动**。截图中的“War包启动”只是示例在 `configure()` 中手动添加的输出，不是 Spring Boot 必须出现的日志。

### 3.3 构建并确认 WAR 产物

在项目根目录执行，也可以复用第 2 节的 IDEA Maven 打包配置：

```bash
mvn clean package
ls -lh target/quickstart.war
```

![IDEA：复用 Maven package 配置构建 WAR](http://img.geekyspace.cn/pictures/2026/202610282301728.png)

打包命令仍然是 `package`，产物类型由 POM 的 `<packaging>war</packaging>` 决定。控制台应出现 `Building war` 和 `BUILD SUCCESS`：

![构建日志：Maven 根据 packaging 生成 WAR，并执行 Spring Boot repackage](http://img.geekyspace.cn/pictures/2026/202610282302459.png)

到 `target/` 中找到本次生成的 `.war` 文件。截图未配置 `finalName`，因此产物为 `deploy-0.0.1-SNAPSHOT.war`；本例则是 `quickstart.war`。

![构建产物：在 target 目录中选择生成的 WAR 文件](http://img.geekyspace.cn/pictures/2026/202610282302932.png)

截图同时留有旧的 JAR，这是未清理旧产物的结果，不代表一次构建会同时产出两种主包；执行 `clean package` 可减少这类混淆。部署时选择本次生成的 `.war`，不要误用 `.war.original`。

### 3.4 部署到外部 Tomcat 并验证

本例使用与 Boot 2.1.3 / JDK 8 兼容的 **Tomcat 9**。Spring Boot 2 使用 `javax.servlet`，**不能把 WAR 直接放入使用 `jakarta.servlet` 的 Tomcat 10/11**。截图沿用旧的 Tomcat 8.0.53，只用于说明操作位置，不作为当前版本选型建议。

将产物上传至服务器后，放入 Tomcat 的 **`webapps/`** 目录，注意不是 `webapp/`。下面以独立安装在 `/opt/tomcat9`、尚未启动的练习容器为例；执行前先确认没有需要保留的同名 WAR 或应用目录：

```bash
# 单实例练习环境：安装目录与实例目录相同
export CATALINA_HOME=/opt/tomcat9
export CATALINA_BASE="$CATALINA_HOME"

# 按实际上传位置修改源路径
cp /opt/quickstart/quickstart.war "$CATALINA_BASE/webapps/"

# 启动 Tomcat 并观察部署日志
"$CATALINA_HOME/bin/startup.sh"
tail -f "$CATALINA_BASE/logs/catalina.out"
```

下图展示 Windows 中从 Tomcat 的 `bin/` 目录执行 `startup.bat`；Linux 对应 `startup.sh`。本步骤启动的是**外部 Tomcat**，不是通过 `java -jar` 启动 WAR。

![外部容器：从 Tomcat 的 bin 目录执行启动脚本](http://img.geekyspace.cn/pictures/2026/202610282302436.png)

Tomcat 默认配置下会展开 WAR 并初始化应用。看到 Spring Boot 横幅说明应用开始初始化，**不代表部署已经成功**，还需确认后续日志没有异常并验证接口。

![部署过程：Tomcat 加载 WAR 后进入 Spring Boot 初始化流程](http://img.geekyspace.cn/pictures/2026/202610282302509.png)

若未启用自动展开，或日志输出方式经过调整，以实际容器配置为准。在另一个终端验证：

```bash
curl http://localhost:8080/quickstart/hello
```

访问地址通常由 **Tomcat 端口 + WAR 上下文路径 + 接口路径** 组成：

| WAR 文件名 | 默认上下文路径 | `/hello` 的访问地址 |
| --- | --- | --- |
| `quickstart.war` | `/quickstart` | `http://localhost:8080/quickstart/hello` |
| `quickstart-0.0.1-SNAPSHOT.war` | `/quickstart-0.0.1-SNAPSHOT` | `http://localhost:8080/quickstart-0.0.1-SNAPSHOT/hello` |
| `ROOT.war` | 根路径 | `http://localhost:8080/hello` |

不要为消除路径前缀就覆盖 Tomcat 已有的 `ROOT` 应用。外部部署的端口由 Tomcat 的 `conf/server.xml` 等容器配置控制，上下文路径由 WAR 文件名或容器的 Context 配置控制，**不能照搬内嵌容器的 `server.port`、`server.servlet.context-path` 来修改它们**。

> 保留 Boot 重新打包插件且 Tomcat 声明为 `provided` 时，生成的**可执行 WAR 也可以通过 `java -jar quickstart.war` 独立运行**。所需的 provided 依赖位于 `WEB-INF/lib-provided/`，既支持独立启动，也避免干扰外部容器。它与放入 `webapps/` 是两种运行方式，不需要同时执行。

### 3.5 遇到 EL 或 Servlet 依赖冲突怎么办

**不要把“删除 Tomcat 的 `el-api.jar`”当作通用修复方式。** 它是容器的标准 API 组件，盲目删除可能破坏容器或同一 Tomcat 下的其他应用。

优先按以下顺序排查：

1. **看完整异常链**：先区分是 `javax.*` / `jakarta.*` 不兼容、重复 API，还是具体实现版本冲突，不能只凭“EL 报错”判断。
2. **核对版本组合**：检查 Spring Boot、JDK 和 Tomcat 是否兼容，不要把 Boot 2 的 WAR 直接部署到 Tomcat 10/11。
3. **检查依赖与 WAR 内容**：确认 Tomcat 为 `provided`，没有额外引入不匹配的 Servlet、EL API 或实现；检查 `WEB-INF/lib/` 是否混入容器本应提供的冲突依赖。
4. **从项目依赖修复**：根据异常定位多余依赖，调整作用域、排除冲突项或对齐版本，然后重新打包，在干净的兼容容器中验证。

可在项目根目录查看依赖树，辅助追踪依赖来源：

```bash
mvn dependency:tree
```

## 4. 常见问题与检查顺序

| 现象 | 优先检查 |
| --- | --- |
| 保存 Java 文件后没有自动重启 | 是否引入 DevTools；执行 Build Project 后，`target/classes` 是否更新 |
| 修改源码后，JAR 运行结果还是旧的 | 是否重新执行了 `mvn clean package`，启动路径是否指向新产物 |
| 提示 `no main manifest attribute` | 是否运行了普通 JAR 或 `.jar.original`；`repackage` 是否实际执行 |
| 启动失败，提示端口已占用 | 是否有旧实例或其他应用占用端口；先确认进程归属，再停止或换端口 |
| 外部配置未生效 | Profile、目录尾部 `/`、文件名及启动参数是否正确；是否误用 `spring.config.location` |
| WAR 部署后访问 404 | 先确认部署日志成功，再核对 WAR 上下文路径和接口路径 |
| WAR 初始化失败或出现 Servlet 类异常 | 是否配置 `ServletInitializer`、Tomcat `provided`，以及容器是否兼容 `javax.servlet` |

记住三点：**开发时编译后重启，独立部署优先 JAR，外部 WAR 部署由 Tomcat 管理容器参数。**

参考：[Spring Boot 2.1.3 DevTools](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/using-boot-devtools.html) · [传统 WAR 部署](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/howto-traditional-deployment.html)

下一篇：[第八章 Lombok](08-lombok.md)。
