import {navbar} from "vuepress-theme-hope";

export default navbar([
    {text: "首页", icon: "home", link: "/"},
    {text: "所有文章", icon: "list", link: "timeline/"},
    {
        text: "Java教程", icon: "java", children: [
            {text: "Java 8 教程", icon: "java", link: "https://docs.oracle.com/javase/tutorial/index.html"},
            {text: "Java 新特性", icon: "java", link: "java-features/"},
        ]
    },
    {
        text: "Spring教程", icon: "spring", children: [
            {text: "Spring 框架", icon: "spring", link: "spring-framework/overview/"},
            {text: "Spring Boot 教程", icon: "spring", link: "spring-boot/"},
            {text: "Spring Data JPA", icon: "spring", link: "spring-data-jpa/jetbrains/getting-started"},
        ]
    },
    {text: "安装大全", icon: "launch", link: "installation-guide/"},
    {
        text: "玩转IDEA", icon: "intellij-idea", prefix: "idea-tips/", children: [
            {
                text: "IDEA 教程",
                icon: "intellij-idea",
                link: "https://www.jetbrains.com/help/idea/getting-started.html"
            },
            {text: "正版激活码", icon: "intellij-idea", link: "activation"},
        ]
    },
    {text: "文库汇总", icon: "article", link: "home.html"},
    {text: "加群交流", icon: "wechat", link: "wechat/"},
]);
