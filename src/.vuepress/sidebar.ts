import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [],
    /*Java新特性*/
    "/java-features/": [
        {text: "总目录", prefix: "/java-features/", link: "/java-features/",},
        {
            text: "Java 21", prefix: "Java21/", link: "Java21/",
            children: [
                {text: "字符串模版(Preview)", link: "jep430-string-templates.html"},
                {text: "有序集合", link: "jep431-sequenced-collections.html"},
                {text: "分代ZGC", link: "jep439-generational-zgc.html"},
                {text: "记录模式", link: "jep440-record-partterns.html"},
                {text: "switch模式匹配", link: "jep441-pattern-matching-for-switch.html"},
            ],
        },
        {
            text: "Java 20", prefix: "Java20/", link: "Java20/",
            children: [
                {text: "新特性总结", link: "java20-new-features-summary.html"},
            ],
        },
        {
            text: "Java 19", prefix: "Java19/", link: "Java19/",
            children: [
                {text: "新特性总结", link: "java19-new-features-summary.html"},
            ],
        },
        {
            text: "Java 18", prefix: "Java18/", link: "Java18/",
            children: [
                {text: "指定UTF-8为默认字符集", link: "jep400-utf8-by-default.html"},
                {text: "简单Web服务器", link: "jep408-simple-web-server.html"},
                {text: "新增@snipppet标签", link: "jep413-code-snippets-in-api-documentation.html"},
            ],
        },
        {
            text: "Java 17", prefix: "Java17/", link: "Java17/",
            children: [
                {text: "switch模式匹配(Preview)", link: "jep406-pattern-matching-for-switch-preview.html"},
                {text: "sealed类", link: "jep409-sealed-classes.html"},
            ],
        },
        {
            text: "Java 16", prefix: "Java16/", link: "Java16/",
            children: [
                {text: "instanceof模式匹配", link: "jep394-pattern-matching-for-instanceof.html"},
                {text: "record类", link: "jep395-records.html"},
            ],
        },
        {
            text: "Java 15", prefix: "Java15/", link: "Java15/",
            children: [
                {text: "隐藏类(Hidden Classes)", link: "jep371-hidden-classes.html"},
                {text: "文本块(Text Blocks)", link: "jep378-text-blocks.html"},
            ],
        },
        {
            text: "Java 14", prefix: "Java14/", link: "Java14/",
            children: [
                {text: "switch表达式增强", link: "jep361-switch-expressions.html"},
            ],
        },
        {
            text: "Java 11", prefix: "Java11/", link: "Java11/",
            children: [
                {text: "移除JavaEE和CORBA模块", link: "jep320-remove-JavaEE-CORBA.html"},
            ],
        },
        {
            text: "Java 10", prefix: "Java10/", link: "Java10/",
            children: [
                {text: "局部变量类型推断", link: "jep286-local-variable-type-inference.html"},
            ],
        },
        {
            text: "Java 9", prefix: "Java9/", link: "Java9/",
            children: [
                {text: "交互式编程环境JShell", link: "jep222-jshell.html"},
                {text: "不可变集合的快捷创建方法", link: "jep269-convenience-factory-methods-for-collections.html"},
            ],
        }
    ],
});
