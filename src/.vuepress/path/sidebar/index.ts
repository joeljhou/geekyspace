import {sidebar} from "vuepress-theme-hope";

import {javaFeatures} from "./java-features.js";
import {springFramework} from "./spring-framework";

export default sidebar({
    "/md/java-features/": javaFeatures,        // Java新特性
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
