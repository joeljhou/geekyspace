import {arraySidebar} from "vuepress-theme-hope";

export const javaDatetime = arraySidebar([
        {text: "总目录", prefix: "/md/java/datetime/", link: "/md/java/datetime/",},
        {text: "API", prefix: "/md/java/datetime/api", link: "/md/java/datetime/api",},
        {
            text: "1.获取当前日期和时间",
            children: [
                {text: "当前日期和时间", link: "datetime"},
                {text: "当前时间戳", link: "timestamp"},
                {text: "当前区域设置/国际化", link: "locale"},
            ],
        },
        {
            text: "2.比较日期和时间",
            children: [
                {text: "日期比较", link: "compare-dates"},
                {text: "时区与偏移量的区别", link: "zoneddatetime-vs-offsetdatetime"},
            ],
        },
        {
            text: "6.日期和时间提取与处理",
            children: [
                {text: "日期时间差", link: "date-diff"},
            ],
        },
    ]
);
