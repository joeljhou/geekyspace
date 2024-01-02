import {defineUserConfig} from "vuepress";
import theme from "./theme.js";
import {searchProPlugin} from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/joeljhou/",

  lang: "zh-CN",
  title: "会敲代码的程序猿",
  description: "vuepress-theme-hope 的博客搭建",

  theme,

  plugins: [
    searchProPlugin({
      indexContent: true,     // 索引全部内容
      customFields: [         // 为分类和标签添加索引
        {
          formatter: "分类：$content",
          getter: (page) => toArray(page.frontmatter.category),
        },
        {
          formatter: "标签：$content",
          getter: (page) => toArray(page.frontmatter.tags),
        },
      ],
      // 热键
      hotKeys: [
        // 按下 ⌘ 加 s 聚焦搜索框
        { meta: true, key: "k", },
      ],
    }),

    // searchPlugin({
    //   locales: {'/': {placeholder: '搜索文档',}},                           // 搜索框的默认值
    //   hotKeys: ['s', '/'],                                                 // 热键, 按下 s 或 / 时聚焦搜索框
    //   maxSuggestions: 5,                                                  // 搜索结果最大数量
    //   isSearchable: (page) => page.path !== '/',           // 排除首页
    //   getExtraFields: (page) => [
    //     ...toArray(page.frontmatter.tags),
    //     ...toArray(page.frontmatter.category),
    //   ],
    // }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});


function toArray(value: any) {
  return Array.isArray(value) ? value : [value].filter(Boolean);
}
