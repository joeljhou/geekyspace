import {arraySidebar} from "vuepress-theme-hope";

export const java = arraySidebar([
        {
            text: "文章", children: [
                {text: "Java 基础", prefix: "basic/", children: "structure",},
                {text: "并发编程", prefix: "juc/", children: "structure",},
                {text: "JVM 语言", prefix: "langs/", children: "structure"},
                {text: "框架与组件", prefix: "framework/", children: "structure"},
            ],
        },
        {
            text: "专栏", children: [
                {text: "Java 日期时间", icon: "java", link: "datetime/"},
                {text: "Java 新版本特性", icon: "java", link: "features/"},
                {text: "深入理解Java虚拟机", icon: "jvm-xx", link: "jvm/"},
            ],
        },
    ]
);
