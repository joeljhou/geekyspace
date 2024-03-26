import {sidebar} from "vuepress-theme-hope";

import {javaFeatures} from "./java-features.js";

export default sidebar({
    // Java新特性
    "/java-features/": javaFeatures,
    // Spring框架教程
    "/spring-framework/": [
        {
            text: "概述", prefix: "/spring-framework/overview/", link: "/spring-framework/overview/",
            children: [
                {text: "快速开始", link: "quickstart"},
            ]
        },
        {
            text: "核心技术", prefix: "/spring-framework/core/", link: "/spring-framework/core/",
            children: [
                {text: "IoC容器", link: "ioc-container"},
                {text: "Bean定义", link: "beans-definition"},
                {
                    text: "依赖关系",
                    prefix: "/spring-framework/core/dependencies/",
                    children: [
                        {text: "依赖注入", link: "factory-collaborators"}
                    ]
                }
            ]
        },
    ],
    /*SpringBoot教程*/
    "/spring-boot/": [
        {text: "总目录", prefix: "/spring-boot/", link: "/spring-boot/"},
        {
            text: "快速入门", children: [
                {text: "Spring Boot 入门", link: "quickstart"},
            ]
        },
    ],
    /*Spring Data JPA*/
    "/spring-data-jpa/": [
        {text: "总目录", prefix: "/spring-data-jpa/", link: "/spring-data-jpa/",},
        {
            text: "快速入门", prefix: "jetbrains/", link: "jetbrains/getting-started",
        },
    ],
});
