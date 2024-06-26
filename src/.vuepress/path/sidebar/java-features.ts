import {arraySidebar} from "vuepress-theme-hope";

export const javaFeatures = arraySidebar([
        {text: "总目录", prefix: "/md/java-features/", link: "/md/java-features/",},
        {
            text: "Java 21", prefix: "Java21/", link: "Java21/",
            children: [
                {text: "字符串模版(Preview)", link: "jep430-string-templates"},
                {text: "有序集合", link: "jep431-sequenced-collections"},
                {text: "分代ZGC", link: "jep439-generational-zgc"},
                {text: "记录模式", link: "jep440-record-partterns"},
                {text: "switch模式匹配", link: "jep441-pattern-matching-for-switch"},
                {text: "虚拟线程", link: "jep444-virtual-threads"},
            ],
        },
        {
            text: "Java 20", prefix: "Java20/", link: "Java20/",
            children: [
                {text: "新特性总结", link: "java20-new-features-summary"},
            ],
        },
        {
            text: "Java 19", prefix: "Java19/", link: "Java19/",
            children: [
                {text: "新特性总结", link: "java19-new-features-summary"},
            ],
        },
        {
            text: "Java 18", prefix: "Java18/", link: "Java18/",
            children: [
                {text: "指定UTF-8为默认字符集", link: "jep400-utf8-by-default"},
                {text: "简单Web服务器", link: "jep408-simple-web-server"},
                {text: "新增@snipppet标签", link: "jep413-code-snippets-in-api-documentation"},
            ],
        },
        {
            text: "Java 17", prefix: "Java17/", link: "Java17/",
            children: [
                {text: "switch模式匹配(Preview)", link: "jep406-pattern-matching-for-switch-preview"},
                {text: "sealed类", link: "jep409-sealed-classes"},
            ],
        },
        {
            text: "Java 16", prefix: "Java16/", link: "Java16/",
            children: [
                {text: "instanceof模式匹配", link: "jep394-pattern-matching-for-instanceof"},
                {text: "record类", link: "jep395-records"},
            ],
        },
        {
            text: "Java 15", prefix: "Java15/", link: "Java15/",
            children: [
                {text: "隐藏类(Hidden Classes)", link: "jep371-hidden-classes"},
                {text: "文本块(Text Blocks)", link: "jep378-text-blocks"},
            ],
        },
        {
            text: "Java 14", prefix: "Java14/", link: "Java14/",
            children: [
                {text: "switch表达式增强", link: "jep361-switch-expressions"},
            ],
        },
        {
            text: "Java 11", prefix: "Java11/", link: "Java11/",
            children: [
                {text: "移除JavaEE和CORBA模块", link: "jep320-remove-JavaEE-CORBA"},
            ],
        },
        {
            text: "Java 10", prefix: "Java10/", link: "Java10/",
            children: [
                {text: "局部变量类型推断", link: "jep286-local-variable-type-inference"},
            ],
        },
        {
            text: "Java 9", prefix: "Java9/", link: "Java9/",
            children: [
                {text: "交互式编程环境JShell", link: "jep222-jshell"},
                {text: "不可变集合的快捷创建方法", link: "jep269-convenience-factory-methods-for-collections"},
            ],
        }
    ]
);
