import {sidebar} from "vuepress-theme-hope";

import {java, javaDatetime, javaFeatures, jvm} from "./java";
import {spring, springFramework, springBoot, springSsm, springDataJpa} from "./spring";
import {toolsGuide} from "./tools-guide";
import {idea} from "./idea";
import {cloudnative} from "./cloudnative";
import {docker, linux, armUbuntu} from "./cloudnative";
import {middleware} from "./middleware";
import {blockchain} from "./blockchain";
import {ai, aigc} from "./ai";
import {alibabaTech} from "./alibaba-tech";

export default sidebar({
    /** ===== 1. Java 语言核心 ===== */
    "/md/java/": java,                  // Java 基础/文章/专栏
    "/md/java/datetime/": javaDatetime, // 专栏：Java 日期时间
    "/md/java/features/": javaFeatures, // 专栏：Java 新特性
    "/md/java/jvm/": jvm,               // 专栏：深入理解 Java 虚拟机

    /** ===== 2. Spring 框架生态 ===== */
    "/md/spring/": spring,                      // Spring 文章/专栏
    "/md/spring/framework/": springFramework,   // 专栏：Spring Framework
    "/md/spring/boot/": springBoot,             // 专栏：Spring Boot
    "/md/spring/ssm/": springSsm,               // 专题：SSM 工作案例
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

    /** ===== 7. 工具指南 ===== */
    "/md/tools-guide/": toolsGuide,
    "/md/tools-guide/idea/": idea,      // 历史归档：IntelliJ IDEA 教程

    /** ===== 8. Blockchain 区块链 ===== */
    "/md/blockchain/": blockchain,        // 区块链/加密货币/香港银行

    /** ===== 9. 阿里技术学习笔记 ===== */
    "/md/alibaba-tech/": alibabaTech,
});
