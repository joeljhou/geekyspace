import {navbar} from "vuepress-theme-hope";

export default navbar([
    {text: "首页", icon: "home", link: "/"},
    {text: "时间轴", icon: "list", link: "timeline/"},
    {
        text: "Java", icon: "java", children: [
            {
                text: "Java 基础", children:[
                    {text: "快速入门", icon: "java", link: "md/java/basic/java-from-scratch"},
                    {text: "面向对象编程（OOP）", icon: "java", link: "md/java/basic/java-basic-oop"},
                ],
            },
            {
                text: "Java 集合框架", children:[

                ],
            },
            {
                text: "Java 多线程与并发", children:[
                    {text: "核心概念", icon: "thread", link: "md/java/thread/core-concepts"},
                ],
            },
            {
                text: "Java IO框架", children:[

                ],
            },
            {
                text: "Java 新特性", children:[
                    {text: "Java8+ 新特性", icon: "java", link: "md/java-features/"},
                ],
            },
            {
                text: "Java进阶 深入理解JVM", children:[
                    {text: "深入理解Java虚拟机", icon: "jvm-xx", link: "md/jvm/"},
                ],
            }
        ]
    },
    {
        text: "Spring", icon: "spring", children: [
            {text: "Spring 框架", icon: "spring", link: "md/spring-framework/core/"},
            // {text: "Spring Boot 教程", icon: "spring", link: "md/spring-boot/"},
            {text: "Spring Data JPA", icon: "spring", link: "md/spring-data-jpa/jetbrains/getting-started"},
        ]
    },
    {text: "安装大全", icon: "launch", link: "md/installation-guide/"},
    {
        text: "玩转IDEA", icon: "intellij-idea", prefix: "md/idea-tips/", children: [
            {
                text: "IDEA 教程",
                icon: "intellij-idea",
                link: "https://www.jetbrains.com/help/idea/getting-started.html"
            },
            {text: "正版激活码", icon: "intellij-idea", link: "activation"},
        ]
    },
    {text: "文库汇总", icon: "article", link: "article.html"},
]);
