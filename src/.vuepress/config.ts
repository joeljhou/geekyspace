// config.ts   ---> 配置文件
import {defineUserConfig} from "vuepress";
import {redirectPlugin} from '@vuepress/plugin-redirect';
import {docsearchPlugin} from "@vuepress/plugin-docsearch";
import {googleAnalyticsPlugin} from '@vuepress/plugin-google-analytics';
import {commentPlugin} from "vuepress-plugin-comment2";
import {docSearchLocales} from "./config/docSearchLocales";

import theme from "./theme.js";

export default defineUserConfig({
    base: "/",
    lang: "zh-CN",

    theme,

    plugins: [
        // 设置重定向（Spring 目录结构调整：/md/spring-* 收敛至 /md/spring/ 下）
        redirectPlugin({
            config: {
                // spring-framework -> spring/framework
                "/md/spring-framework/": "/md/spring/framework/",
                "/md/spring-framework/overview/": "/md/spring/framework/overview/",
                "/md/spring-framework/overview/quickstart.html": "/md/spring/framework/overview/quickstart.html",
                "/md/spring-framework/core/": "/md/spring/framework/core/",
                "/md/spring-framework/core/ioc-container.html": "/md/spring/framework/core/ioc-container.html",
                "/md/spring-framework/core/beans-definition.html": "/md/spring/framework/core/beans-definition.html",
                "/md/spring-framework/core/beans-scope.html": "/md/spring/framework/core/beans-scope.html",
                "/md/spring-framework/core/beans-lifecycle.html": "/md/spring/framework/core/beans-lifecycle.html",
                "/md/spring-framework/core/child-bean-definitions.html": "/md/spring/framework/core/child-bean-definitions.html",
                "/md/spring-framework/core/dependencies/": "/md/spring/framework/core/dependencies/",
                "/md/spring-framework/core/dependencies/factory-collaborators.html": "/md/spring/framework/core/dependencies/factory-collaborators.html",
                "/md/spring-framework/core/dependencies/factory-properties-detailed.html": "/md/spring/framework/core/dependencies/factory-properties-detailed.html",
                "/md/spring-framework/core/dependencies/factory-dependson.html": "/md/spring/framework/core/dependencies/factory-dependson.html",
                "/md/spring-framework/core/dependencies/factory-lazy-init.html": "/md/spring/framework/core/dependencies/factory-lazy-init.html",
                "/md/spring-framework/core/dependencies/factory-autowire.html": "/md/spring/framework/core/dependencies/factory-autowire.html",
                "/md/spring-framework/core/dependencies/factory-method-injection.html": "/md/spring/framework/core/dependencies/factory-method-injection.html",
                // spring-boot -> spring/boot
                "/md/spring-boot/": "/md/spring/boot/",
                "/md/spring-boot/quickstart.html": "/md/spring/boot/quickstart.html",
                // spring-data-jpa -> spring/data-jpa
                "/md/spring-data-jpa/": "/md/spring/data-jpa/",
                "/md/spring-data-jpa/jetbrains/getting-started.html": "/md/spring/data-jpa/jetbrains/getting-started.html",
                // idea-tips -> installation-guide（IDEA 激活教程迁移至安装大全）
                "/md/idea-tips/activation.html": "/md/installation-guide/dev-env/idea/idea-activation.html",
            },
        }),
        // 搜索插件
        docsearchPlugin({
            appId: "PTKSWUU4JQ",
            apiKey: "8cf4dc036ad5f140f40d1d97e178b0b4",
            indexName: "geekyspace",
            locales: {"/": docSearchLocales},
            injectStyles: true
        }),
        // 设置谷歌分析
        googleAnalyticsPlugin({
            id: "G-3L19EZ1HH8",
            debug: false,
        }),
        // 设置评论插件
        commentPlugin({
            // 插件选项：Artalk | Giscus | Waline | Twikoo
            provider: "Giscus",
        }),
    ],

    // Enable it with pwa
    // shouldPrefetch: false,

    head: [
        // 添加百度统计代码
        [
            "script",
            {},
            `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?c3b455c45c9c9b349e7d28e7e13e950f";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
            `
        ],
        // 添加Google AdSense广告位
        [
            "script",
            {
                async: true,
                src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3218450089809357",
                crossorigin: "anonymous"
            }
        ]
    ],

});
