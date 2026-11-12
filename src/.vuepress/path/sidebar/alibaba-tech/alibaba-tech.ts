import {arraySidebar} from "vuepress-theme-hope";

export const alibabaTech = arraySidebar([
    {text: "文库汇总", link: "/article.html"},
    {text: "阿里技术总目录", link: "/md/alibaba-tech/"},
    {
        text: "前端与跨端基础",
        collapsible: false,
        children: [
            {text: "01. 前端工程之美", link: "01-frontend-engineering"},
            {text: "02. Flutter 入门指南", link: "02-flutter"},
        ],
    },
    {
        text: "工程卓越之旅",
        prefix: "engineering-excellence/",
        collapsible: false,
        children: [
            {text: "01. 可落地的整洁代码", link: "01-clean-code"},
            {text: "02. 技术文档该怎么写", link: "02-technical-writing"},
            {text: "03. 手把手教你单元测试", link: "03-unit-testing"},
            {text: "04. 玩转代码评审", link: "04-code-review"},
        ],
    },
]);
