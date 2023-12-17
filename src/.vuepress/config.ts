import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/vuepress-theme-hope/",

  lang: "zh-CN",
  title: "会敲代码的程序猿",
  description: "vuepress-theme-hope 的博客搭建",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
