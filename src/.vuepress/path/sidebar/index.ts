import {sidebar} from "vuepress-theme-hope";

import {java} from "./java";
import {javaDatetime} from "./java/java-datetime";
import {javaFeatures} from "./java/java-features";
import {jvm} from "./java/jvm.js";
import {spring} from "./spring";
import {springFramework} from "./spring/spring-framework";
import {springBoot} from "./spring/spring-boot";
import {springDataJpa} from "./spring/spring-data-jpa";
import {installationGuide} from "./installation-guide";
import {cloudnative} from "./cloudnative";
import {docker} from "./cloudnative/docker";
import {linux} from "./cloudnative/linux";
import {armUbuntu} from "./cloudnative/arm-ubuntu";
import {middleware} from "./middleware";
import {blockchain} from "./blockchain";
import {ai} from "./ai";
import {aigc} from "./ai/aigc";

export default sidebar({
    /** ===== 1. Java 语言核心 ===== */
    "/md/java/": java,                  // Java 基础/文章/专栏
    "/md/java/datetime/": javaDatetime, // 专栏：Java 日期时间
    "/md/java/features/": javaFeatures, // 专栏：Java 新特性
    "/md/java/jvm/": jvm,               // 专栏：深入理解 Java 虚拟机

    /** ===== 2. Spring 框架生态 ===== */
    "/md/spring/": spring,                      // Spring 文章/专栏
    "/md/spring/framework/": springFramework,   // 专栏：Spring Framework
    "/md/spring/boot/": springBoot,             // 专栏：Spring Boot 教程
    "/md/spring/data-jpa/": springDataJpa,      // 专栏：Spring Data JPA

    /** ===== 3. DataBase 数据库（MySQL/Redis） ===== */
    "/md/database/mysql/": [
        {text: "总目录", prefix: "/md/database/mysql/", link: "/md/database/mysql/",},
        {
            text: "概述", prefix: "overview/", link: "overview/",
            children: [
                {text: "什么是数据库？", link: "what-is-database"},
            ],
        },
    ],

    /** ===== 4. AI 与智能应用 ===== */
    "/md/ai/": ai,                       // AI 总目录/AIGC/Coze/Karpathy
    "/md/ai/aigc/": aigc,                // 专栏：AIGC 生成式 AI


    /** ===== 5. Middleware 消息队列与中间件 ===== */
    "/md/middleware/": middleware,      // MQ/中间件文章/专栏

    /** ===== 6. CloudNative 云原生与容器（Docker/K8s/Linux） ===== */
    "/md/cloudnative/": cloudnative,                    // 云原生总目录
    "/md/cloudnative/docker/": docker,                  // Docker
    "/md/cloudnative/linux/": linux,                    // Linux 基础/专栏
    "/md/cloudnative/linux/oracle-cloud/": armUbuntu,   // 专栏：Ubuntu 服务器折腾

    /** ===== 8. Blockchain 区块链 ===== */
    "/md/blockchain/": blockchain,        // 区块链/加密货币/香港银行

    /** ===== 7. 安装大全 ===== */
    "/md/installation-guide/": installationGuide,
});
