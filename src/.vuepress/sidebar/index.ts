import {sidebar} from "vuepress-theme-hope";

import {javaFeatures} from "./java-features.js";
import {springFramework} from "./spring-framework";

export default sidebar({
    "/java-features/": javaFeatures,        // Java新特性
    "/spring-framework/": springFramework,  // Spring框架
    "/spring-boot/": [
        {text: "总目录", prefix: "/spring-boot/", link: "/spring-boot/"},
        {
            text: "快速入门", children: [
                {text: "Spring Boot 入门", link: "quickstart"}
            ]
        },
    ],
    "/spring-data-jpa/": [
        {text: "总目录", prefix: "/spring-data-jpa/", link: "/spring-data-jpa/"},
        {text: "快速入门", prefix: "jetbrains/", link: "jetbrains/getting-started"},
    ],

});
