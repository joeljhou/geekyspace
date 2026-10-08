import {arraySidebar} from "vuepress-theme-hope";

export const springFramework = arraySidebar([
        {text: "总目录", prefix: "/md/spring/framework/", link: "/md/spring/framework/",},
        {
            text: "概述", prefix: "overview/", link: "overview/",
            children: [
                {text: "快速开始", link: "quickstart"},
            ]
        },
        {
            text: "核心技术", prefix: "core/", link: "core/",
            children: [
                {text: "IoC容器", link: "ioc-container"},
                {text: "Bean定义", link: "beans-definition"},
                {
                    text: "依赖", prefix: "dependencies/", link: "dependencies/",
                    children: [
                        {text: "依赖注入", link: "factory-collaborators"},
                        {text: "依赖和配置详解", link: "factory-properties-detailed"},
                        {text: "使用depends-on", link: "factory-dependson"},
                        {text: "懒加载Bean", link: "factory-lazy-init"},
                        {text: "自动装配协作者", link: "factory-autowire"},
                        {text: "方法注入", link: "factory-method-injection"},
                    ]
                },
                {text: "Bean作用域", link: "beans-scope"},
                {text: "Bean生命周期", link: "beans-lifecycle"},
                {text: "Bean定义继承", link: "child-bean-definitions"},
            ]
        },
    ]
);
