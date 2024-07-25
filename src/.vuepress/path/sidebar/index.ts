import {sidebar} from "vuepress-theme-hope";

import {javaFeatures} from "./java-features.js";
import {springFramework} from "./spring-framework";

export default sidebar({
    "/md/java-features/": javaFeatures,        // Java新特性
    "/md/jvm/": [
        {text: "总目录", prefix: "/md/jvm/", link: "/md/jvm/",},
        {
            text: "JVM 基础", prefix: "basics/", link: "basics/",
            children: [
                {text: "概述", link: "overview"},
                {text: "编译JDK", link: "compile_jdk"},
                {text: "类字节码详解", link: "class"},
                {text: "类加载机制", link: "classload"},
            ],
        },
        {
            text: "GC 垃圾回收", prefix: "GC/", link: "GC/",
            children: [
                {text: "jvm", link: "jvm"},
            ],
        },
        {
            text: "调试排错", prefix: "debug/", link: "debug/",
            children: [
                {text: "jvm", link: "jvm"},
            ],
        },
    ],        // Java新特性
    "/md/spring-framework/": springFramework,  // Spring框架
    "/md/spring-boot/": [
        {text: "总目录", prefix: "/md/spring-boot/", link: "/md/spring-boot/"},
        {
            text: "快速入门", children: [
                {text: "Spring Boot 入门", link: "quickstart"}
            ]
        },
    ],
    "/md/spring-data-jpa/": [
        {text: "总目录", prefix: "/md/spring-data-jpa/", link: "/md/spring-data-jpa/"},
        {text: "快速入门", prefix: "/md/jetbrains/", link: "/md/jetbrains/getting-started"},
    ],
    "/md/installation-guide/": [
        {text: "开发者安装大全", prefix: "/md/installation-guide/", link: "/md/installation-guide/"},
        {
            text: "操作系统", prefix: "os/", children: [
                {text: "Windows、Office激活", link: "windows-office-activation"},
            ]
        },
    ],
});