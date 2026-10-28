import {navbar} from "vuepress-theme-hope";

export default navbar([
    {text: "首页", icon: "home", link: "/"},
    {text: "时间轴", icon: "list", link: "timeline/"},
    {
        text: "Java 语言核心", icon: "java", children: [
            {
                text: "Java 基础", children: [
                    {text: "快速入门", icon: "java", link: "md/java/basic/java-from-scratch"},
                    {text: "面向对象（OOP）", icon: "java", link: "md/java/basic/java-basic-oop"},
                ],
            },
            {
                text: "文章", children: [
                    {text: "Java 多线程与并发", icon: "thread", link: "md/java/thread/thread-concurrency"},
                    {text: "Java 程序员快速掌握 Kotlin", icon: "kotlin", link: "md/java/kotlin/kotlin-quick-for-java"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "Java 新版本特性", icon: "java", link: "md/java/features/"},
                    {text: "深入理解Java虚拟机", icon: "jvm-xx", link: "md/java/jvm/"},
                ],
            },
        ]
    },
    {
        text: "Spring 框架生态", icon: "spring", children: [
            {
                text: "文章", children: [
                    {text: "Spring 初始化", icon: "spring", link: "/md/spring/01-spring-initializr.html"},
                    {text: "Spring 反应式编程", icon: "spring", link: "/md/spring/02-spring-reactive.html"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "Spring Framework", icon: "spring", link: "md/spring/framework/"},
                    {text: "Spring Boot", icon: "spring", link: "md/spring/boot/"},
                    {text: "SSM 工作案例", icon: "spring", link: "/md/spring/ssm/"},
                ],
            },
        ]
    },
    {
        text: "DataBase 数据库", icon: "database", children: [
            {
                text: "专栏", children: [
                    {text: "MySQL必知必会", icon: "mysql", link: "md/database/mysql/"},
                ],
            },
        ]
    },
    {
        text: "AI 与智能应用", icon: "claudecode-fill", children: [
            {
                text: "文章", children: [
                    {text: "Andrej Karpathy 学习资料", icon: "claudecode-fill", link: "md/ai/karpathy-notes"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "AIGC 生成式 AI", icon: "aigc", link: "md/ai/aigc/"},
                ],
            },
        ]
    },
    {
        text: "消息队列与中间件", icon: "middleware", children: [
            {
                text: "专栏", children: [
                    {text: "总目录", link: "md/middleware/"},
                ],
            },
        ]
    },
    {
        text: "云原生与容器", icon: "cloudnative", children: [
            {
                text: "文章", children: [
                    {text: "systemd 服务管理基础", icon: "linux", link: "md/cloudnative/linux/basic/systemd-basics"},
                    {text: "Linux 防火墙与 iptables 基础", icon: "linux", link: "md/cloudnative/linux/basic/iptables-firewall-basics"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "Ubuntu 服务器折腾", icon: "ubuntu", link: "md/cloudnative/linux/oracle-cloud/"},
                    {text: "Docker 容器化实战", icon: "docker", link: "md/cloudnative/docker/"},
                ],
            },
        ]
    },
    {
        text: "工具指南", icon: "launch", prefix: "md/tools-guide/", children: [
            {
                text: "安装激活", children: [
                    {text: "IDEA 激活", icon: "intellij-idea", link: "activation/idea"},
                ],
            },
            {
                text: "环境配置", children: [
                    {text: "SDKMAN", icon: "java", link: "env-config/sdkman"},
                    {text: "NVM", icon: "nodejs", link: "env-config/nvm"},
                    {text: "UV", icon: "python", link: "env-config/uv"},
                ],
            },
        ]
    },
    {text: "文库汇总", icon: "article", link: "article.html"},
]);
