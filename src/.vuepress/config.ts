// config.ts   ---> 配置文件
// @ts-ignore
import {getDirname, path} from "vuepress/utils";
import {defineUserConfig} from "vuepress";
import {redirectPlugin} from '@vuepress/plugin-redirect';
import {docsearchPlugin} from "@vuepress/plugin-docsearch";
import {googleAnalyticsPlugin} from '@vuepress/plugin-google-analytics';
import {commentPlugin} from "vuepress-plugin-comment2";

import theme from "./theme.js";

const DOCSEARCH_ZH_LOCALES = {
    placeholder: "搜索文档",
    translations: {
        button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
        },
        modal: {
            searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
            },
            startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
            },
            errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
            },
            footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
            },
            noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
            },
        },
    },
};

// @ts-ignore
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
    base: "/geekyspace/",
    lang: "zh-CN",
    title: "极客空间",
    description: "vuepress-theme-hope 的博客搭建",

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
            locales: {
                "/": DOCSEARCH_ZH_LOCALES,
            },
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

    alias: {
        // 必应壁纸，一言描述
        "@theme-hope/modules/blog/components/BlogHero": path.resolve(
            __dirname,
            "./components/BlogHero.vue"),
    },

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
