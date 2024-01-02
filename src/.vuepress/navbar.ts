import {navbar} from "vuepress-theme-hope";

export default navbar([
    /*首页*/
    {
        text: "首页",
        icon: "home",
        link: "/",
    },
    /*所有文章*/
    {
        text: "所有文章",
        icon: "list",
        link: "timeline/",
    },
    /*Java教程*/
    {
        text: "Java教程",
        // icon: "java",
        children: [
            {
                text: "Java 8 教程",
                icon: "java",
                link: "https://books.didispace.com/java8-tutorial/index.html",
            },
            {
                text: "Java 新特性",
                icon: "java",
                link: "java-features/",
            },
        ]
    },
    /*Spring教程*/
    {
        text: "Spring教程",
        // icon: "spring",
        children: [
            {
                text: "Spring Boot 教程",
                icon: "spring",
                link: "spring-boot/",
            },
            {
                text: "Spring Cloud 教程",
                icon: "spring",
                link: "spring-cloud/",
            },
            {
                text: "Spring Cloud Alibaba 教程",
                icon: "spring",
                link: "spring-cloud-alibaba/",
            },
        ]
    },
    /*安装大全*/
    {
        text: "安装大全",
        icon: "launch",
        link: "installation-guide/",
    },
    /*玩转IDEA*/
    {
        text: "玩转IDEA",
        icon: "intellij-idea",
        link: "idea-tips/",
    },
    /*文库汇总*/
    {
        text: "文库汇总",
        icon: "article",
        link: "home/",
    },
    /*加群交流*/
    {
        text: "加群交流",
        icon: "wechat",
        link: "wechat/",
    },
]);