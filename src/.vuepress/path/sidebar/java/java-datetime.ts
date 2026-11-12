import {arraySidebar} from "vuepress-theme-hope";

export const javaDatetime = arraySidebar([
    {text: "专栏导航", prefix: "/md/java/datetime/", link: "/md/java/datetime/"},
    {
        text: "1. 获取当前日期和时间",
        prefix: "01-current-datetime/",
        link: "/md/java/datetime/#_1-获取当前日期和时间",
        children: [
            {text: "当前日期和时间", link: "/md/java/datetime/datetime.html"},
            {text: "当前时间戳", link: "/md/java/datetime/timestamp.html"},
            {text: "当前区域设置/国际化", link: "/md/java/datetime/locale.html"},
        ],
    },
    {
        text: "2. 比较日期和时间",
        prefix: "02-compare-datetime/",
        link: "/md/java/datetime/#_2-比较日期和时间",
        children: [
            {text: "日期比较", link: "/md/java/datetime/compare-dates.html"},
            {text: "时区与偏移量的区别", link: "/md/java/datetime/zoneddatetime-vs-offsetdatetime.html"},
        ],
    },
    {
        text: "3. 转换日期和时间",
        prefix: "03-convert-datetime/",
        link: "/md/java/datetime/#_3-转换日期和时间",
        children: [
            {text: "转换日期时间实例", link: "/md/java/datetime/convert-dates.html"},
        ],
    },
    {
        text: "4. 将字符串解析为日期",
        prefix: "04-parse-datetime/",
        link: "/md/java/datetime/#_4-将字符串解析为日期",
        children: [],
    },
    {
        text: "5. 将日期格式化为字符串",
        prefix: "05-format-datetime/",
        link: "/md/java/datetime/#_5-将日期格式化为字符串",
        children: [],
    },
    {
        text: "6. 日期和时间提取与处理",
        prefix: "06-date-operations/",
        link: "/md/java/datetime/#_6-日期和时间提取与处理",
        children: [
            {text: "日期时间差", link: "/md/java/datetime/date-diff.html"},
        ],
    },
    {
        text: "7. 日期时间 API",
        prefix: "07-datetime-api/",
        link: "/md/java/datetime/#_7-日期时间-api",
        children: [
            {text: "Java 日期时间 API", link: "/md/java/datetime/api.html"},
        ],
    },
]);
