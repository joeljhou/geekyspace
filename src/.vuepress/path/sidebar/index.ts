import {sidebar} from "vuepress-theme-hope";

import {javaFeatures} from "./java-features.js";
import {jvm} from "./jvm.js";
import {springFramework} from "./spring-framework";
import {installationGuide} from "./installation-guide";

export default sidebar({
    "/md/java/": [
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
                {text: "Java 多线程与并发", icon: "thread", link: "thread/thread-juc"},
            ],
        },
        {
            text: "专栏",
            children: [
                {text: "Java 新版本特性", icon: "java", link: "features/"},
                {text: "深入理解Java虚拟机", icon: "jvm-xx", link: "jvm/"},
            ],
        },
    ],
    "/md/java/features/": javaFeatures,        // Java新特性
    "/md/java/jvm/": jvm,                      // 深入理解Java虚拟机
    "/md/spring-framework/": springFramework,  // Spring框架
    // "/md/spring-boot/": [                      // SpringBoot框架
    //     {text: "总目录", prefix: "/md/spring-boot/", link: "/md/spring-boot/"},
    //     {
    //         text: "快速入门", children: [
    //             {text: "Spring Boot 入门", link: "quickstart"}
    //         ]
    //     },
    // ],
    "/md/spring-data-jpa/": [
        {text: "总目录", prefix: "/md/spring-data-jpa/", link: "/md/spring-data-jpa/"},
        {text: "快速入门", prefix: "/md/jetbrains/", link: "jetbrains/getting-started"},
    ],
    "/md/installation-guide/": installationGuide,
    "/md/docker/": [
        {text: "概述", prefix: "/md/docker/overview", link: "/md/docker/overview"},
        {text: "安装指南", prefix: "/md/docker/install", link: "/md/docker/install"},
        {text: "镜像加速器", prefix: "/md/docker/mirror-acceleration", link: "/md/docker/mirror-acceleration"},
        {text: "Top20常用命令", prefix: "/md/docker/top20-commands", link: "/md/docker/top20-commands"},
    ],
});
