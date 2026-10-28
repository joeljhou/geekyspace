---
title: 第四章 Spring Boot Web 开发
shortTitle: 第四章 Web 开发
date: 2019-03-27
description: 掌握 Spring MVC 页面与接口开发、AJAX、文件上传、复杂表单、错误页、Filter 注册及内嵌容器替换。
icon: spring
author: 流浪码客
isOriginal: true
category: Spring Boot
tag:
  - Spring-Boot-2.x
  - Spring-MVC
  - Servlet
order: 4
---

# 第四章 Spring Boot Web 开发

> [!info] Spring Boot 与 Spring MVC
> Spring Boot 简化了依赖管理与配置过程，但在 Web 开发层面，仍然沿用 **Spring MVC** 的开发方式，核心是开发 **Controller 控制器**。

> [!warning] 版本兼容
> Spring Boot 2 使用 `javax.servlet.*`，Spring Boot 3+ 使用 `jakarta.servlet.*`。本章示例基于 Boot 2，注意不要混用。

## 1. Controller 传值给 Thymeleaf

Spring MVC 可以通过 `ModelAndView`、`Model` 或请求属性向 Thymeleaf 模板传递数据，模板通过 `${name}` 读取。

| 方式                                  | 核心写法                                | 使用建议                 |
| ----------------------------------- | ----------------------------------- | -------------------- |
| `ModelAndView`                      | `mv.addObject("name", value)`       | **本章推荐**，同时封装视图名与数据  |
| `Model`                             | `model.addAttribute("name", value)` | 常用且简洁，方法另行返回视图名      |
| `WebRequest` / `HttpServletRequest` | `request.setAttribute(...)`         | 仅为向模板传数据时不推荐，优先使用前两种 |

### 1.1 Controller 传值

创建 `PageController.java`，演示四种数据传递方式：

```java
@Controller
@RequestMapping("/mvc")
public class PageController {

    // 1. ModelAndView：封装视图和数据
    @GetMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("index");
        mv.addObject("name", "Spring MVC");
        return mv;
    }

    // 2. Model：添加数据，返回视图名称
    @GetMapping("/index2")
    public String index2(Model model) {
        model.addAttribute("name", "Spring MVC");
        return "index";
    }

    // 3. WebRequest：设置请求属性
    @GetMapping("/index3")
    public String index3(WebRequest request) {
        request.setAttribute("name", "Spring MVC", RequestAttributes.SCOPE_REQUEST);
        return "index";
    }

    // 4. HttpServletRequest：设置请求属性
    @GetMapping("/index4")
    public String index4(HttpServletRequest request) {
        request.setAttribute("name", "Spring MVC");
        return "index";
    }
}
```

### 1.2 Thymeleaf 读取

创建 `src/main/resources/templates/index.html`，引入 Thymeleaf 命名空间：

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <p th:text="|你好，${name}！|">你好，访客！</p>
</body>
</html>
```

其中，`th:text` 用于设置标签文本，`${name}` 用于读取数据，`|...|` 用于拼接文本与表达式。

### 1.3 请求参数绑定

Spring MVC 可以自动将 HTTP 请求数据绑定到 Controller 方法参数。

| 注解 / 类型           | 数据来源           | 示例                 |
| ----------------- | -------------- | ------------------ |
| `@PathVariable`   | URL 路径变量       | `/users/10`        |
| `@RequestParam`   | 查询参数、表单字段      | `?name=Tom`        |
| `@ModelAttribute` | 查询参数、表单字段绑定为对象 | `name=Tom&age=20`  |
| `@RequestBody`    | 请求体（JSON）      | `{"name":"Tom"}`   |
| `MultipartFile`   | 上传文件           | `file=@avatar.png` |
```java
@RestController
@RequestMapping("/users")
public class UserController {

    // 路径参数：GET /users/10
    @GetMapping("/{id}")
    public String get(@PathVariable Long id) {
        return "用户 ID：" + id;
    }

    // 查询参数：GET /users?name=Tom
    @GetMapping
    public String search(@RequestParam String name) {
        return "用户名：" + name;
    }

    // 表单对象：POST /users/form
    @PostMapping("/form")
    public UserForm form(@ModelAttribute UserForm form) {
        return form;
    }

    // JSON 请求体：POST /users
    @PostMapping
    public UserForm create(@RequestBody UserForm form) {
        return form;
    }

    // 文件上传：POST /users/upload
    @PostMapping("/upload")
    public String upload(@RequestParam MultipartFile file) {
        return file.getOriginalFilename();
    }
}
```

`UserForm` 为包含 `name`、`age` 等属性的 Java Bean。

> 记忆： 路径用 `@PathVariable`，参数用 `@RequestParam`，表单对象用 `@ModelAttribute`，JSON 用 `@RequestBody`，文件用 `MultipartFile`。

## 2. AJAX

AJAX 用于浏览器异步发送 HTTP 请求，无需刷新整个页面即可获取或提交数据。下面使用 **jQuery** 实现部门与岗位二级联动。

### 2.1 Controller 接口

创建 `AjaxController.java`，使用 `@RestController` 返回 JSON 数据。
```java
@RestController
@RequestMapping("/api")
public class AjaxController {

    // 获取部门列表：GET /api/depts
    @GetMapping("/depts")
    public List<String> getDepts() {
        return List.of("RESEARCH", "SALES", "ACCOUNTING");
    }

    // 根据部门获取岗位：GET /api/jobs?dept=SALES
    @GetMapping("/jobs")
    public List<String> getJobs(@RequestParam String dept) {
        return switch (dept) {
            case "RESEARCH" -> List.of("CTO", "Programmer");
            case "SALES" -> List.of("CSO", "Salesperson");
            case "ACCOUNTING" -> List.of("CFO", "Cashier");
            default -> List.of();
        };
    }
}
```

### 2.2 AJAX 调用

在前面的 `PageController` 中增加页面路由（类级别已配置 `@RequestMapping("/mvc")`）：
```java
// 页面入口：GET /mvc/ajax
@GetMapping("/ajax")
public String ajax() {
    return "ajax";
}
```

创建 `src/main/resources/templates/ajax.html`：
```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>AJAX 二级联动</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
    <label for="dept">部门：</label>
    <select id="dept">
        <option value="">请选择部门</option>
    </select>

    <label for="job">岗位：</label>
    <select id="job">
        <option value="">请选择岗位</option>
    </select>

    <script th:inline="javascript">
        const deptsUrl = /*[[@{/api/depts}]]*/ '/api/depts';
        const jobsUrl = /*[[@{/api/jobs}]]*/ '/api/jobs';

        // AJAX 获取部门列表
        $.getJSON(deptsUrl, function (data) {
            data.forEach(name => $('#dept').append(new Option(name, name)));
        });

        // 部门变化时，动态加载岗位
        $('#dept').change(function () {
            const dept = $(this).val();
            $('#job').empty().append(new Option('请选择岗位', ''));

            if (!dept) return;

            $.getJSON(jobsUrl, {dept}, function (data) {
                // 避免较早请求的响应覆盖当前部门对应的岗位
                if ($('#dept').val() !== dept) return;
                data.forEach(name => $('#job').append(new Option(name, name)));
            });
        });
    </script>
</body>
</html>
```

## 3. 文件上传

### 3.1 上传表单

以**上传员工照片**为例，表单需要满足三个条件：**1. POST 提交、2. 文件控件、3. multipart 编码**。

在前面的 `PageController` 中增加上传页面入口：
```java
@GetMapping("/upload")
public String uploadPage() {
    return "upload";
}
```

创建 `src/main/resources/templates/upload.html`：
```html
<!-- 网页具备文件上传的3个条件：
    1. post提交
    2. 具备file组件
    3. 设置表单的enctype="mutipart/form-data",默认表单的enctype是 x-www.urlencoding
-->
<!-- th:action 生成提交地址，自动带上应用的上下文路径 -->
<form action="/create" method="post" enctype="multipart/form-data">

    <div class="form-group">
        <label for="photo">员工照片</label>
        <!-- name="photo" 对应后端 @RequestParam("photo")；accept 仅用于文件选择提示 -->
        <input type="file" id="photo" name="photo" accept=".jpg,.png" required>
    </div>
    <div class="form-group" style="text-align: center;">
        <button type="submit" class="btn btn-primary">保存</button>
    </div>
</form>

<!-- 上传成功后，显示后端通过重定向传递的提示 -->
<p th:if="${message != null}" th:text="${message}"></p>
```

**`name` 用于后端参数绑定，`id` 用于关联标签和脚本。** `label` 的 `for="photo"` 应与文件控件的 `id="photo"` 一致。

### 3.2 后端接口实现

创建 `FileController.java`，按**接收照片 → 检查后缀 → 生成文件名 → 保存文件 → 重定向**的流程处理。保留原案例的时间戳命名和 `FileCopyUtils` 复制方式，文件保存到进程工作目录下的 `uploads/`：

```java
@Controller
public class FileController {

    @PostMapping("/create")
    public ModelAndView create(@RequestParam("photo") MultipartFile photo,
                               RedirectAttributes redirectAttributes) throws IOException {
        // MultipartFile 表示上传的文件，内容可能暂存在内存或临时磁盘中
        // @RequestParam("photo") 与表单文件控件的 name="photo" 对应
        if (photo.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "请选择员工照片");
        }

        // 获取客户端提交的原始文件名，先检查是否包含后缀，避免截取异常
        String originalFilename = photo.getOriginalFilename();
        int dotIndex = originalFilename == null ? -1 : originalFilename.lastIndexOf('.');
        if (dotIndex < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "文件缺少后缀");
        }
        String suffix = originalFilename.substring(dotIndex).toLowerCase(Locale.ROOT);
        if (!".jpg".equals(suffix) && !".png".equals(suffix)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "仅支持 .jpg 或 .png 图片");
        }

        // 使用时间戳生成服务端文件名，保留通过检查的后缀
        String filename = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        Path directory = Paths.get("./uploads").toAbsolutePath().normalize();
        Files.createDirectories(directory); // 目录不存在时自动创建
        Path target = directory.resolve(filename + suffix);

        // 将上传内容复制到目标文件，完成文件保存（归档）
        // try-with-resources 确保打开流或复制失败时，已打开的资源仍能关闭
        try (InputStream input = photo.getInputStream();
             OutputStream output = new FileOutputStream(target.toFile())) {
            FileCopyUtils.copy(input, output);
        }

        // 保存成功后回到上传页；Flash 属性只供重定向后的请求使用
        redirectAttributes.addFlashAttribute("message", "照片上传成功");
        return new ModelAndView("redirect:/mvc/upload");
    }
}
```

访问 `/mvc/upload`，选择 `.jpg` 或 `.png` 文件并保存，成功后回到上传页显示提示。也可在项目运行时验证：

```bash
# 将路径替换为本地图片；如果配置了上下文路径，请同步修改 URL
curl -i -F 'photo=@/path/to/example.png' http://localhost:8080/create
```

**控件的 `name="photo"` 必须与 `@RequestParam("photo")` 一致。** 接收多个同名文件时，可使用 `MultipartFile[]` 或 `List<MultipartFile>`，逐一处理。

### 3.3 大小限制与保存边界

在 `application.properties` 中配置：
```properties
spring.servlet.multipart.max-file-size=2MB
spring.servlet.multipart.max-request-size=10MB
```

- Boot 2.1 默认单文件上限为 **1MB**、单次 multipart 请求上限为 **10MB**；请求总上限还需容纳其他表单字段和 multipart 开销。
- 超限可能在进入 Controller 前失败，不能只在上传方法中判断 `photo.getSize()`；可通过统一异常处理返回合适的状态码和提示。
- 不直接使用 `getOriginalFilename()` 拼接保存路径，避免路径穿越。本例仅提取并检查后缀，主文件名由服务端生成。
- 时间戳命名便于理解，但并发上传可能重名并覆盖文件；生产环境可改用 UUID，并配合拒绝覆盖的写入方式。
- `./uploads` 相对于**进程工作目录**，不是固定的 JAR 所在目录；生产环境使用配置化的持久目录或对象存储，不写入 `classpath:/static/`。
- 上例只演示接收和保存。上线前还需鉴权、配额、大小及内容校验；图片应检查实际格式，不能只相信后缀或客户端提交的 `Content-Type`。
- AJAX 上传使用 `FormData` 时，**不要手工设置 `Content-Type`**，由浏览器生成包含 boundary 的 multipart 请求头。

## 4. 复杂表单绑定

**表单字段的 `name` 决定绑定到哪个属性，`id` 主要供标签和脚本使用。** 多个字段可绑定到一个对象；嵌套对象使用 `dept.id`，集合使用同名字段或 `items[0].name` 这样的索引形式。

### 4.1 表单对象与 Controller

创建 `EmployeeForm.java`，只定义允许提交的字段。为缩短样板代码，下面将简单访问器写在一行；实际项目也可按团队习惯展开或使用 Lombok：

```java
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;

public class EmployeeForm {
    private String name;
    private BigDecimal salary;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate hireDate;

    private DepartmentForm dept = new DepartmentForm();
    private List<String> skills = new ArrayList<>();

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }
    public LocalDate getHireDate() { return hireDate; }
    public void setHireDate(LocalDate hireDate) { this.hireDate = hireDate; }
    public DepartmentForm getDept() { return dept; }
    public void setDept(DepartmentForm dept) { this.dept = dept; }
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public static class DepartmentForm {
        private Long id;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }
}
```

创建 `EmployeeController.java`：

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class EmployeeController {
    @GetMapping("/employees/new")
    public String createForm(Model model) {
        model.addAttribute("employee", new EmployeeForm());
        return "employee-form";
    }

    @PostMapping("/employees")
    public String submit(@ModelAttribute("employee") EmployeeForm form,
                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "employee-form";
        }
        // 演示绑定结果；实际业务应先校验、保存，再重定向到详情页
        return "employee-result";
    }
}
```

**`BindingResult` 紧跟被绑定的对象参数**，这里用它接收日期、数字等类型转换错误。尚未添加必填、金额范围等业务约束；使用 `@Valid` 和约束注解的方式见[第九章 数据校验](09-validation.md)。

### 4.2 表单与结果页面

创建 `src/main/resources/templates/employee-form.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>新增员工</title>
</head>
<body>
<form th:action="@{/employees}" th:object="${employee}" method="post">
    <ul th:if="${#fields.hasErrors('*')}">
        <li th:each="error : ${#fields.errors('*')}" th:text="${error}">绑定错误</li>
    </ul>
    <p><label>姓名：<input type="text" th:field="*{name}"></label></p>
    <p><label>工资：<input type="number" step="0.01" th:field="*{salary}"></label></p>
    <p><label>入职日期：<input type="date" th:field="*{hireDate}"></label></p>
    <p>
        <label>部门：
            <select th:field="*{dept.id}">
                <option value="">请选择</option>
                <option value="10">研发部</option>
                <option value="20">运维部</option>
            </select>
        </label>
    </p>
    <p>
        技能：
        <label><input type="checkbox" th:field="*{skills}" value="Java">Java</label>
        <label><input type="checkbox" th:field="*{skills}" value="SQL">SQL</label>
    </p>
    <button type="submit">提交</button>
</form>
</body>
</html>
```

创建 `src/main/resources/templates/employee-result.html`，通过 `@ModelAttribute("employee")` 暴露的对象显示结果：

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>绑定结果</title>
</head>
<body>
<p th:text="|姓名：${employee.name}|">姓名</p>
<p th:text="|工资：${employee.salary}|">工资</p>
<p th:text="|入职日期：${employee.hireDate}|">入职日期</p>
<p th:text="|部门编号：${employee.dept.id}|">部门编号</p>
<ul>
    <li th:each="skill : ${employee.skills}" th:text="${skill}">技能</li>
</ul>
</body>
</html>
```

访问 `/employees/new`，填写并提交后可以查看绑定结果。

### 4.3 日期与常见问题

| 场景          | 处理方式                                                               |
| ----------- | ------------------------------------------------------------------ |
| 查询 / 表单日期绑定 | `@DateTimeFormat(pattern = "yyyy-MM-dd")`，示例 `hireDate=2019-03-27` |
| JSON 日期转换   | Jackson 的 `@JsonFormat` 或 Jackson 配置，不能用 `@DateTimeFormat` 代替      |
| 金额字段        | 优先使用 `BigDecimal`，而非 `float` / `double`                            |
| 多选框         | 同名 `skills` 字段绑定为列表；Thymeleaf `th:field` 会生成对应字段名及辅助隐藏字段           |
| 数字、日期格式不正确  | 通过紧随对象的 `BindingResult` 检查并回显错误                                    |
| 成功提交后刷新重复提交 | 真正保存业务数据后采用 POST → Redirect → GET，而非一直直接返回结果页                      |

全局 MVC 日期格式与 Jackson 日期配置的职责及版本差异见[第二章 常用配置](02-configuration.md)。

## 5. 自定义 404 / 500 错误页面

Spring Boot 默认通过 `/error` 处理错误，**浏览器请求 HTML 时显示错误页，接口请求通常返回 JSON 错误信息**，具体取决于内容协商与应用配置。

在templates下新建`error`文件夹，新建 500.html 和 404.html

![Pasted image 20261028130444](http://img.geekyspace.cn/pictures/2026/202610281304399.png)


例如 `404.html`：
```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>页面不存在</title>
</head>
<body>
<h1>404：页面不存在</h1>
<p>请检查地址，或返回首页。</p>
<a th:href="@{/}">返回首页</a>
</body>
</html>
```

`500.html`、`5xx.html` 可复用相同结构，提示“服务暂时不可用”。

- **自动匹配状态码**，通常无需编写错误页 Controller；同一位置下，精确状态码页面优先于 `4xx.html` / `5xx.html`。
- **纯静态页面**放在 `src/main/resources/public/error/` 或 `static/error/`，不支持 `th:*`。
- **验证流程**：访问不存在的路径测试 404，触发未处理异常测试 500；直接打开 HTML 不算。
- **接口错误**用 `@RestControllerAdvice` / `@ExceptionHandler` 设置状态码和响应体，不依赖 HTML 错误页。
- **不对外暴露内部细节**，堆栈等排查信息只保留在服务端日志中。

## 6. 注册 Filter 过滤器

**Filter（过滤器）是 Servlet 规范提供的请求过滤机制**，可以在请求进入 Controller 之前、响应返回时执行公共逻辑。
### 6.1 Filter 与 Interceptor 的区别

| 对比   | Filter（过滤器）          | Interceptor（拦截器）                                 |
| ---- | -------------------- | ------------------------------------------------ |
| 所属   | Servlet 规范           | Spring MVC                                       |
| 执行位置 | DispatcherServlet 之前 | DispatcherServlet 内部                             |
| 拦截范围 | 匹配的 Servlet 请求       | Spring MVC Handler 请求                            |
| 核心方法 | `doFilter()`         | `preHandle()`、`postHandle()`、`afterCompletion()` |
| 常见用途 | CORS、编码、请求日志         | Controller 日志、业务拦截                               |
**记忆：Filter 负责 Servlet 层，Interceptor 负责 Spring MVC 层。**

### 6.2 实现 Filter

创建 `TimingFilter.java`，统计请求耗时：
```java
public class TimingFilter implements Filter {
    private static final Logger log = LoggerFactory.getLogger(TimingFilter.class);

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("TimingFilter 初始化");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        long start = System.nanoTime();
        try {
            chain.doFilter(request, response);  // 放行请求
        } finally {
            long elapsedMs = (System.nanoTime() - start) / 1_000_000;
            String uri = ((HttpServletRequest) request).getRequestURI();
            log.info("请求处理结束，uri={}，耗时={}ms", uri, elapsedMs);
        }
    }

    @Override
    public void destroy() {
        log.info("TimingFilter 销毁");
    }
}
```

**核心：** `chain.doFilter()` 负责放行请求；不调用则请求不会继续传递。前置逻辑在调用前执行，后置逻辑在调用后执行。

### 6.3 注册 Filter

**方式一：FilterRegistrationBean（推荐）**
```java
@Configuration
public class WebFilterConfig {
    @Bean
    public FilterRegistrationBean<TimingFilter> timingFilterRegistration() {
        FilterRegistrationBean<TimingFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new TimingFilter());
        registration.setName("timingFilter");
        registration.addUrlPatterns("/*");         // 拦截所有 URL
        registration.setDispatcherTypes(DispatcherType.REQUEST);
        registration.setOrder(10);                 // 数值越小，优先级越高
        return registration;
    }
}
```

**方式二：@WebFilter**
在 `TimingFilter` 类上添加：
```java
import javax.servlet.annotation.WebFilter;

@WebFilter(filterName = "timingFilter", urlPatterns = "/*")
public class TimingFilter implements Filter {
    // 实现与前面相同，省略
}
```
在SpringBoot启动类上增加扫描注解：
```java
@SpringBootApplication
@ServletComponentScan  // 新增
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

**两种注册方式二选一**，避免重复注册；需要控制过滤器顺序时推荐 `FilterRegistrationBean`。

> **注意：** Spring Boot 2.x 使用 `javax.servlet.*`，Spring Boot 3.x 及之后使用 `jakarta.servlet.*`。正式项目的认证与授权建议使用 Spring Security。

## 7. 替换内嵌 Tomcat

### 7.1 支持三种内嵌Web容器

| 容器       | 特点与边界                |
| -------- | -------------------- |
| Tomcat   | **默认容器**，生态成熟，通常无需替换 |
| Jetty    | 性能优秀的内嵌Web容器，适用于长链接  |
| Undertow | 非阻塞Web容器，性能优异，适用于高并发 |
**不能笼统断言某种容器一定更快或更省内存。** 选择应依据应用负载、并发模型、连接配置、兼容性和压测结果。

### 7.2 替换
**1）剔除spring-boot-starter-web中默认的tomcat依赖**

![Show Dependencies...](http://img.geekyspace.cn/pictures/2026/202610280203015.png)

**2）找到spring-boot-starter-tomcat，剔除Exclude**

![Exclude](http://img.geekyspace.cn/pictures/2026/202610280203231.png)

- **pom.xml中的spring-boot-starter-web会相应变化**
	![pom.xml跟随变化](http://img.geekyspace.cn/pictures/2026/202610280203076.png)


**3）添加其他Web容器**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!-- 剔除Exclude -->
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- 二选一：这里使用 Undertow -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```
如果选择 Jetty，将上面的 Undertow 依赖替换为：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

## 参考资料

- [Spring Boot 2.1.3：开发 Web 应用](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/boot-features-developing-web-applications.html)（MVC 自动配置、错误页、Servlet 组件注册）
- [Spring Boot 2.1.3：Spring MVC How-to](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/howto-spring-mvc.html)（文件上传）
- [Spring Boot 2.1.3：内嵌 Web 服务器](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/howto-embedded-web-servers.html)（替换容器及 Jetty 的 Servlet API 版本要求）

上一篇：[第三章 模板引擎](03-thymeleaf.md) · 下一篇：[第五章 数据访问](05-data-jpa/README.md)。
