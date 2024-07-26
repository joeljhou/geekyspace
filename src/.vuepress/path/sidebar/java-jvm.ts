import {arraySidebar} from "vuepress-theme-hope";

export const javaJvm = arraySidebar([
        {text: "总目录", prefix: "/md/jvm/", link: "/md/jvm/",},
        {
            text: "JVM 基础", prefix: "basics/", link: "basics/",
            children: [
                {text: "概述", link: "overview"},
                {text: "类文件结构", link: "class"},
                {text: "字节码指令", link: "bytecode"},
                {text: "类加载机制", link: "classload"},
            ],
        },
        {
            text: "JVM 进阶", prefix: "advanced/", link: "advanced/",
            children: [
                {text: "实战编译JDK", link: "compile_jdk"},
            ],
        },
        {
            text: "GC 垃圾回收", prefix: "GC/", link: "GC/",
            children: [
                {text: "javaJvm", link: "javaJvm"},
            ],
        },
        {
            text: "调试排错", prefix: "debug/", link: "debug/",
            children: [
                {text: "javaJvm", link: "javaJvm"},
            ],
        },
    ]
);
