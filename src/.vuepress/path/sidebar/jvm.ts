import {arraySidebar} from "vuepress-theme-hope";

export const jvm = arraySidebar([
        {text: "概述", link: "overview"},
        {
            text: "JVM规范", collapsible: true, prefix: "specs/", link: "specs/",
            children: [
                {text: "类文件结构", link: "class"},
                {text: "字节码指令集", link: "bytecode"},
            ],
        },
        {text: "类加载机制", link: "classload"},
        {text: "实战编译JDK", link: "compile_jdk"},
    ]
);
