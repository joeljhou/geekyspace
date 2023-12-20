import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [
        /*最新发布*/
        "/",
        /*如何使用*/
        {
            text: "如何使用",
            icon: "laptop-code",
            prefix: "demo/",
            link: "demo/",
            children: "structure",
        },
        /*文章*/
        {
            text: "文章",
            icon: "book",
            prefix: "posts/",
            children: "structure",
        },
        "intro",
        "slides",
    ],
    /*Java新特性*/
    "/java-features": [
        /*最新发布*/
        {
            text: "总目录",
            link: "/java-features",
        },
        {
            text: "Java 9",
            // link: "/java-features/java9/",
            prefix: "/java-features/java9/",
            children: [
                {text: "交互式编程环境JShell", link: "jep222-jshell"},
                {text: "不可变集合的快捷创建方法", link: "jep269-convenience-factory-methods-for-collections"},
            ],
        }
    ],
});
