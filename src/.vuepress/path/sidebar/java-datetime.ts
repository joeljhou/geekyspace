import {arraySidebar} from "vuepress-theme-hope";

export const javaDatetime = arraySidebar([
        {text: "总目录", prefix: "/md/java/datetime/", link: "/md/java/datetime/",},
        {text: "API", prefix: "/md/java/datetime/api", link: "/md/java/datetime/api",},
        {
            text: "获取当前日期和时间",
            children: [
                {text: "当前日期和时间", link: "datetime"},
                {text: "当前时间戳", link: "timestamp"},
                {text: "当前区域设置/国际化", link: "locale"},
            ],
        },
    ]
);
