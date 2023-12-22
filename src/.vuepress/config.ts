import {defineUserConfig} from "vuepress";
import {searchProPlugin} from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/joeljhou/",

  lang: "zh-CN",
  title: "会敲代码的程序猿",
  description: "vuepress-theme-hope 的博客搭建",

  theme,

  plugins: [
    searchProPlugin({
      indexContent: true,  // 索引全部内容
      customFields: [      // 为分类和标签添加索引
        {
          formatter: "分类：$content",
          getter: (page) => page.frontmatter.category as string | string[] | null,
        },
        {
          formatter: "标签：$content",
          getter: (page) => page.frontmatter.tag as string | string[] | null,
        },
      ],
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
