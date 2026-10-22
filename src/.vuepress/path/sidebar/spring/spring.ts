import {arraySidebar} from "vuepress-theme-hope";

export const spring = arraySidebar([
        {
            text: "文章",
            children: [
                {text: "Spring 初始化", icon: "spring", link: "/md/spring/01-spring-initializr.html"},
                {text: "Spring 反应式编程", icon: "spring", link: "/md/spring/02-spring-reactive.html"},
                {text: "Spring 文档快速入门", icon: "spring", link: "/md/spring/03-spring-doc.html"},
                {text: "Spring Boot 中各测试框架", icon: "spring", link: "/md/spring/04-spring-testing-frameworks.html"},
            ],
        },
        {
            text: "专栏",
            children: [
                {text: "Spring Framework", icon: "spring", link: "/md/spring/framework/"},
                {text: "Spring Boot 教程", icon: "spring", link: "/md/spring/boot/"},
                {text: "Spring Data JPA", icon: "spring", link: "/md/spring/data-jpa/"},
            ],
        },
    ]
);
