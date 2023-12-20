import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [
        /*如何使用*/
        {text: "如何使用", icon: "laptop-code", prefix: "demo/", link: "demo/", children: "structure",},
        /*文章*/
        {text: "文章", icon: "book", prefix: "posts/", children: "structure",},
    ],
    /*Java新特性*/
    "/java-features/": [
        {text: "总目录", prefix: "/java-features/", link: "/java-features/",},
        {
            text: "Java 9", prefix: "Java9/", link: "Java9/",
            children: [
                {text: "交互式编程环境JShell", link: "jep222-jshell"},
                {text: "不可变集合的快捷创建方法", link: "jep269-convenience-factory-methods-for-collections"},
            ],
        }
    ],
});
