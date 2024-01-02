import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [],
    /*Java新特性*/
    "/java-features/": [
        {text: "总目录", prefix: "/java-features/", link: "/java-features/",},
        {
            text: "Java 17", prefix: "Java17/", link: "Java17/",
            children: [
                {text: "switch的模式匹配（Preview）", link: "jep406-pattern-matching-for-switch-preview"},
                {text: "密封类", link: "jep409-sealed-classes"},
            ],
        },
        {
            text: "Java 16", prefix: "Java16/", link: "Java16/",
            children: [
                {text: "instanceof增强", link: "jep394-pattern-matching-for-instanceof"},
                {text: "record类", link: "jep395-records"},
            ],
        },
        {
            text: "Java 15", prefix: "Java15/", link: "Java15/",
            children: [
                {text: "隐藏类", link: "jep371-hidden-classes"},
                {text: "文本块", link: "jep378-text-blocks"},
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
                {text: "局部变量的类型推断", link: "jep286-local-variable-type-inference"},
            ],
        },
        {
            text: "Java 9", prefix: "Java9/", link: "Java9/",
            children: [
                {text: "交互式编程环境JShell", link: "jep222-jshell"},
                {text: "不可变集合的快捷创建方法", link: "jep269-convenience-factory-methods-for-collections"},
            ],
        }
    ],
});