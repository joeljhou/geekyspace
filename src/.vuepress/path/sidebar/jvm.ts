import {arraySidebar} from "vuepress-theme-hope";

export const jvm = arraySidebar([
        {text: "总目录", prefix: "/md/jvm/", link: "/md/jvm/",},
        {
            text: "走近Java", prefix: "part1/", link: "part1/",
            children: [
                {text: "JVM概述", link: "overview"},
                {text: "编译JDK", link: "compile_jdk"},
            ],
        },
        {
            text: "自动内存管理", prefix: "part2/", link: "part2/",
            children: [],
        },
        {
            text: "虚拟机执行子系统", prefix: "part3/", link: "part3/",
            children: [
                {text: "类文件结构", link: "class-file-structure"},
                {text: "字节码指令集", link: "bytecode-instructions-set"},
                {text: "类加载机制", link: "class-loading-mechanism"},
            ],
        },
        {
            text: "程序编译与代码优化", prefix: "part4/", link: "part4/",
            children: [],
        },
        {
            text: "高效并发", prefix: "part5/", link: "part5/",
            children: [],
        },

    ]
);
