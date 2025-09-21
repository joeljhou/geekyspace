import {sidebar} from "vuepress-theme-hope";

import {java} from "./java.js";
import {javaFeatures} from "./java-features.js";
import {jvm} from "./jvm.js";
import {springFramework} from "./spring-framework"
import {installationGuide} from "./installation-guide";

export default sidebar({
    "/md/java/": java,                         // 1.Java
    "/md/java/features/": javaFeatures,        // 专栏：Java新特性
    "/md/java/jvm/": jvm,                      // 专栏：深入理解Java虚拟机
    "/md/database/mysql/": [
        {text: "总目录", prefix: "/md/database/mysql/", link: "/md/database/mysql/",},
        {
            text: "概述", prefix: "overview/", link: "overview/",
            children: [
                {text: "什么是数据库？", link: "what-is-database"},
            ],
        },
    ],

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
