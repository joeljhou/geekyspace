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
        // 设置重定向
        redirectPlugin({
            config: {},
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

    // 添加百度统计代码
    head: [
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
        ]
    ],

});
