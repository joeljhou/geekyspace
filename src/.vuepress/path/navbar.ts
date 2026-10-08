import {navbar} from "vuepress-theme-hope";

export default navbar([
    {text: "首页", icon: "home", link: "/"},
    {text: "时间轴", icon: "list", link: "timeline/"},
    {
        text: "Java 语言核心", icon: "java", children: [
            {
                text: "Java 基础", children: [
                    {text: "快速入门", icon: "java", link: "md/java/basic/java-from-scratch"},
                    {text: "面向对象编程（OOP）", icon: "java", link: "md/java/basic/java-basic-oop"},
                ],
            },
            {
                text: "文章", children: [
                    {text: "Java 多线程与并发", icon: "thread", link: "md/java/thread/thread-concurrency"},
                    {text: "Java 程序员快速掌握 Kotlin", icon: "kotlin", link: "md/java/kotlin/kotlin-quick-for-java"},
                    {text: "Sa-Token 认证鉴权", icon: "sa-token", link: "md/java/safe/sa-token"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "Java日期时间", icon: "java", link: "md/java/datetime/"},
                    {text: "Java新版本特性", icon: "java", link: "md/java/features/"},
                    {text: "深入理解Java虚拟机", icon: "jvm-xx", link: "md/java/jvm/"},
                ],
            },
        ]
    },
    {
        text: "Spring 框架生态", icon: "spring", children: [
            {
                text: "文章", children: [
                    {text: "Springdoc 快速入门", icon: "spring", link: "md/spring/springdoc"},
                    {text: "Spring 反应式编程", icon: "spring", link: "md/spring/webflux/spring-reactive"},
                    {text: "Spring Boot 中各测试框架", icon: "spring", link: "md/spring/test/spring-testing-frameworks"},
                ],
            },
            {
                text: "专栏", children: [
                    {text: "Spring Framework", icon: "spring", link: "md/spring/framework/"},
                    {text: "Spring Boot 教程", icon: "spring", link: "md/spring/boot/"},
                    {text: "Spring Data JPA", icon: "spring", link: "md/spring/data-jpa/"},
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
                    {text: "提示词工程深入实战", icon: "aigc", link: "md/ai/aigc/prompt-engineering"},
                    {text: "Coze：零基础开发对话机器人", icon: "coze", link: "md/ai/coze/coze-chatbot-basics"},
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
        text: "安装大全", icon: "launch", prefix: "md/installation-guide/", children: [
            {
                text: "开发环境", children: [
                    {text: "IDEA 入门", icon: "intellij-idea", link: "https://www.jetbrains.com/help/idea/getting-started.html"},
                    {text: "IDEA 激活", icon: "intellij-idea", link: "dev-env/idea/idea-activation"},
                ],
            },
            {
                text: "常用工具", children: [
                    {text: "Homebrew", link: "base-tools/Homebrew"},
                    {text: "NVM", link: "dev-env/nodejs/nvm"},
                ],
            },
        ]
    },
    {text: "文库汇总", icon: "article", link: "article.html"},
]);
