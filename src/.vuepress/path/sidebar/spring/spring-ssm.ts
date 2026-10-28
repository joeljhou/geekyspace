import {arraySidebar} from "vuepress-theme-hope";

export const springSsm = arraySidebar([
    {text: "SSM 工作案例", link: "/md/spring/ssm/"},
    "01-idea",
    "02-maven",
    {
        text: "Spring 与 MVC",
        prefix: "03-spring-mvc/",
        link: "/md/spring/ssm/03-spring-mvc/",
        collapsible: true,
        children: "structure",
    },
    "04-rest-template",
]);
