import {arraySidebar} from "vuepress-theme-hope";

export const spring = arraySidebar([
        {
            text: "文章",
            children: [
                {text: "Springdoc 快速入门", icon: "spring", link: "/md/spring/springdoc.html"},
                {text: "Spring 反应式编程", icon: "spring", link: "/md/spring/webflux/spring-reactive.html"},
                {text: "Spring Boot 中各测试框架", icon: "spring", link: "/md/spring/test/spring-testing-frameworks.html"},
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
