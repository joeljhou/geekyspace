import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({

    /**
     * 信息选项
     */
    // 站点图标
    favicon: "favicon.ico",

    // 全局默认作者
    author: {
        name: "会敲代码的程序员",
        url: "https://github.com/joeljhou",
        email: "joeljhou336@gmail.com"
    },

    // 全局默认协议
    license: "MIT",

    // 网站部署域名
    hostname: "https://www.geekyspace.cn",

    /**
     * 外观选项
     */
    // 深色模式支持选项 (switch：默认)
    darkmode: "switch",

    /**
     * 导航栏本地选项
     */
    navbar,

    // 网站图标
    logo: "geekyspace.png",

    // 夜间模式下导航栏图标
    logoDark: "geekyspace.png",

    // 导航栏标题
    navTitle: "极客空间",

    // 仓库链接
    repo: "https://github.com/joeljhou",

    // 是否在导航栏显示仓库链接
    repoDisplay: false,

    // 全屏按钮
    fullscreen: true,

    // 字体图标资源链接（阿里巴巴iconfont矢量图标：https://www.iconfont.cn/）
    iconAssets: "//at.alicdn.com/t/c/font_4370612_23wa7yckp7fh.css",

    // 页面显示信息
    pageInfo: ["Author", "Original", "Category", "Date", "Tag", "ReadingTime", "Word", "PageView"],

    // 是否在向下滚动时自动隐藏导航栏
    navbarAutoHide: "always",

    // 导航栏布局设置
    navbarLayout: {
        start: ["Brand"],
        center: ["Links"],
        end: ["Repo", "Outlook", "Search"],
    },

    // 是否在移动视图下隐藏站点名称
    hideSiteNameOnMobile: false,

    /**
     * 侧边栏本地选项
     */
    sidebar,

    // 是否在侧边栏显示图标
    sidebarIcon: true,

    // 侧边栏和页面目录的标题深度, 默认值为 2
    headerDepth: 2,

    /**
     * 页脚选项
     */
    footer: "© 2023 - 至今 <a href=\"https://www.geekyspace.cn\" target=\"_blank\">www.geekyspace.cn</a> 保留所有权利",

    // 默认的版权信息，设置为 false 来默认禁用它
    copyright: "Copyright © 2024 会敲代码的程序员",

    // 是否默认显示页脚
    displayFooter: true,

    /**
     * 功能区域设置选项
     */
    // 博客功能配置
    blog: {
        description: "会敲代码的程序员，分享技术，品味人生",
        intro: "/intro.html",
        medias: {
            GitHub: "https://github.com/joeljhou",
            Gitee: "https://gitee.com/joeljhou",
            BiliBili: "https://space.bilibili.com/3546587190004175",
            Twitter: "https://twitter.com/joeljhou336",
            Weibo: "https://weibo.com/u/7788864199",
            Zhihu: "https://www.zhihu.com/people/joeljhou",
            XiaoHongShu: "https://www.xiaohongshu.com/user/profile/5dd53e0c0000000001009bf1",
            // WechatMP: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4MTMwMDg4MA==",
            // Tieba: "https://tieba.baidu.com/home/main?un=%E6%9E%81%E5%AE%A2%E8%8B%B1%E9%9B%84",
            Rss: "./rss.xml",
        },
    },

    /*
    * 文章目录加密：
    * https://theme-hope.vuejs.press/zh/guide/feature/encrypt.html
    */
    encrypt: {
        config: {
            // 这会加密整个 demo 目录，并且两个密码都是可用的
            // "/demo/": ["1234"],
            // 这只会加密 /java-features/Java9/jep269-convenience-factory-methods-for-collections.html
            // "/java-features/Java9/jep269-convenience-factory-methods-for-collections.html": ["1234"]
        },
    },

    // 是否展示编辑此页链接
    editLink: true,

    // 编辑此页链接地址
    docsRepo: "https://github.com/joeljhou/joeljhou.github.io",
    docsDir: "src",
    docsBranch: "master",

    // page meta
    metaLocales: {
        editLink: "编辑此页",
    },

    plugins: {
        blog: true,

        // 开启git实现编辑此页面-最后更新时间-贡献者功能
        git: true,

        /*
        * 版权信息在复制时自动附加-vuepress-plugin-copyright2
        */
        copyright: {
            global: false,
            triggerLength: 100,
            author: "GeekySpace",
            license: "MIT",
        },

        // 代码复制功能-vuepress-plugin-copy-code2
        copyCode: {
            showInMobile: true,
        },

        // Feed生成器-vuepress-plugin-feed2
        feed: {
            rss: true,
        },

        // install @waline/client before enabling it
        // WARNING: This is a test server for demo only.
        // You should create and use your own comment service in production.
        // comment: {
        //   provider: "Waline",
        //   serverURL: "https://waline-comment.vuejs.press",
        // },

        // MarkDown文件增强-vuepress-plugin-md-enhance
        mdEnhance: {
            align: true,
            attrs: true,

            // install chart.js before enabling it
            // chart: true,

            codetabs: true,

            // insert component easily
            // component: true,

            demo: true,

            // install echarts before enabling it
            // echarts: true,

            figure: true,

            // install flowchart.ts before enabling it
            // flowchart: true,

            // gfm requires mathjax-full to provide tex support
            // gfm: true,

            imgLazyload: true,
            imgSize: true,
            include: true,

            // install katex before enabling it
            // katex: true,

            // install mathjax-full before enabling it
            // mathjax: true,

            mark: true,

            // install mermaid before enabling it
            // mermaid: true,

            playground: {
                presets: ["ts", "vue"],
            },

            // install reveal.js before enabling it
            // revealJs: {
            //   plugins: ["highlight", "math", "search", "notes", "zoom"],
            // },

            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({tag}) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: {type: "tip"},
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,

            // install @vue/repl before enabling it
            // vuePlayground: true,
        },

        // MarkDown启用组件-vuepress-plugin-components
        components: {
            components: [
                // 为站点提供了在MD文档中自定义颜色的徽章
                "Badge",
                // 为站点提供了在MD文档中加载B站视频的功能，但是不建议使用
                "BiliBili",
                // 为站点提供了在MD文档中加载PDF阅读器的功能，但是不建议使用
                // 原因一：PDF书籍较大，上传到码云后会大量占用码云空间
                // 原因二：当PDF阅读器较多的时候，将MD文档渲染成HTML页面比较耗费性能，使页面加载速度变慢
                "PDF",
            ]
        },

        // uncomment these if you want a PWA
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    },
}, {custom: true});
