// client.ts   ---> 客户端配置文件
// @ts-ignore
import {defineGiscusConfig} from 'vuepress-plugin-comment2/client'
// @ts-ignore
import {defineClientConfig} from "vuepress/client";

/**
 * // 设置评论插件Giscus客户端选项：https://giscus.app/zh-CN
 */
defineGiscusConfig({
    repo: 'joeljhou/joeljhou.github.io',
    repoId: 'R_kgDOK4fo4g',
    category: 'Announcements',
    categoryId: 'DIC_kwDOK4fo4s4Cd4Y9',
    mapping: 'title'
})

export default defineClientConfig({
    // 解决百度统计单页面应用无法统计的问题
    enhance({app, router, siteData}) {
        router.beforeEach((to, from, next) => {
            // @ts-ignore
            if (typeof _hmt != "undefined") {
                if (to.path && to.fullPath !== from.fullPath) {
                    // @ts-ignore
                    _hmt.push(["_trackPageview", to.fullPath]);
                }
            }

            next();
        });
    },
    setup() {
    },
    rootComponents: [],
})
