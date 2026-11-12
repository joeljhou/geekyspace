import {navbar} from "vuepress-theme-hope";

export default navbar([
    {text: "首页", icon: "home", link: "/"},
    {text: "时间轴", icon: "list", link: "/timeline/"},
    {
        text: "Java 核心", icon: "java", prefix: "/md/java/", children: [
            {
                text: "文章", children: [
                    {text: "快速入门", icon: "java", link: "basic/getting-started"},
                    {text: "多线程与并发", icon: "thread", link: "juc/thread-concurrency"},
                    {text: "掌握 Kotlin", icon: "kotlin", link: "langs/kotlin-quick-for-java"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "Java 日期时间", icon: "java", link: "datetime/"},
                    {text: "Java 新版本特性", icon: "java", link: "features/"},
                    {text: "Java 虚拟机（JVM）", icon: "jvm-xx", link: "jvm/"},
                ],
            },
        ],
    },
    {
        text: "Spring 生态", icon: "spring", prefix: "/md/spring/", children: [
            {
                text: "文章", children: [
                    {text: "Spring 初始化", icon: "spring", link: "01-spring-initializr"},
                    {text: "Spring 反应式编程", icon: "spring", link: "02-spring-reactive"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "Spring Framework", icon: "spring", link: "framework/"},
                    {text: "Spring Boot", icon: "spring", link: "boot/"},
                    {text: "SSM 工作案例", icon: "spring", link: "ssm/"},
                ],
            },
        ],
    },
    {
        text: "数据库", icon: "database", prefix: "/md/database/", children: [
            {
                text: "专栏", children: [
                    {text: "MySQL必知必会", icon: "mysql", link: "mysql/"},
                ],
            },
        ],
    },
    {
        text: "AI 指南", icon: "claudecode-fill", prefix: "/md/ai/", children: [
            {
                text: "文章", children: [
                    {text: "Andrej Karpathy 学习资料", icon: "claudecode-fill", link: "karpathy-notes"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "AIGC 生成式 AI", icon: "aigc", link: "aigc/"},
                ],
            },
        ],
    },
    {
        text: "中间件", icon: "middleware", children: [
            {
                text: "专栏", children: [
                    {text: "消息队列", link: "/md/middleware/"},
                ],
            },
        ],
    },
    {
        text: "云原生", icon: "cloudnative", prefix: "/md/cloudnative/", children: [
            {
                text: "文章", children: [
                    {
                        text: "Linux", icon: "linux", link: "linux/",
                        children: [
                            {text: "systemd 服务管理", icon: "linux", link: "linux/basic/01-systemd"},
                            {text: "iptables 防火墙", icon: "linux", link: "linux/basic/02-iptables"},
                        ],
                    },
                ],
            },
            {
                text: "专栏", children: [
                    {text: "Docker 容器化实战", icon: "docker", link: "docker/"},
                    {text: "Ubuntu 服务器折腾", icon: "ubuntu", link: "linux/arm-ubuntu/"},
                ],
            },
        ],
    },
    {
        text: "工具指南", icon: "launch", prefix: "/md/tools-guide/", children: [
            {
                text: "安装激活", prefix: "activation/", children: [
                    {text: "IDEA 激活", icon: "intellij-idea", link: "idea"},
                ],
            },
            {
                text: "环境配置", prefix: "env-config/", children: [
                    {text: "SDKMAN", icon: "java", link: "sdkman"},
                    {text: "NVM", icon: "nodejs", link: "nvm"},
                    {text: "UV", icon: "python", link: "uv"},
                ],
            },
        ],
    },
    {text: "文库汇总", icon: "article", link: "/article"},
]);
