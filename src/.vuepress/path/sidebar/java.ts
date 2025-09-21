import {arraySidebar} from "vuepress-theme-hope";

export const java = arraySidebar([
        {
            text: "Java 基础", prefix: "basic/", /*link: "basic/",*/
            children: [
                {text: "快速入门", link: "java-from-scratch"},
                {text: "面向对象编程（OOP）", link: "java-basic-oop"},
                {text: "常用类与工具", link: "java-common-classes"},
            ],
        },
        {
            text: "文章",
            children: [
                {text: "Java 多线程与并发", icon: "thread", link: "thread/thread-concurrency"},
                {text: "Java 程序员快速掌握 Kotlin", icon: "kotlin", link: "kotlin/kotlin-quick-for-java"},
            ],
        },
        {
            text: "专栏",
            children: [
                {text: "Java 新版本特性", icon: "java", link: "features/"},
                {text: "深入理解Java虚拟机", icon: "jvm-xx", link: "jvm/"},
            ],
        },
    ]
);
