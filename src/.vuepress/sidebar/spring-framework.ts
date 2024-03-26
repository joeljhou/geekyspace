import {arraySidebar} from "vuepress-theme-hope";

export const springFramework = arraySidebar([
        {
            text: "概述", collapsible: true, prefix: "/spring-framework/overview/", link: "/spring-framework/overview/",
            children: [
                {text: "快速开始", link: "quickstart"},
            ]
        },
        {
            text: "核心技术", collapsible: true, prefix: "/spring-framework/core/", link: "/spring-framework/core/",
            children: [
                {text: "IoC容器", link: "ioc-container"},
                {text: "Bean定义", link: "beans-definition"},
                {
                    text: "依赖",
                    prefix: "/spring-framework/core/dependencies/",
                    collapsible: true,
                    children: [
                        {text: "依赖注入", link: "factory-collaborators"}
                    ]
                }
            ]
        },
    ]
);
