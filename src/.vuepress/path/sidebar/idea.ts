import {arraySidebar} from "vuepress-theme-hope";

export const idea = arraySidebar([
    {text: "文库汇总", link: "/article.html"},
    {text: "IDEA 归档总目录", link: "/md/tools-guide/idea/"},
    {
        text: "IntelliJ IDEA（历史归档）",
        collapsible: false,
        children: [
            {text: "01. IDEA 简介", link: "01-introduction"},
            {text: "02. Windows 安装与目录说明", link: "02-installation"},
            {text: "03. 首次启动与基础配置", link: "03-initial-setup"},
            {text: "04. 创建 Java 工程与模块", link: "04-java-project"},
            {text: "05. 常用配置", link: "05-settings"},
            {text: "06. 快捷键配置", link: "06-keymap"},
            {text: "07. 代码模板", link: "07-templates"},
            {text: "08. Java Web 与 Tomcat", link: "08-java-web"},
            {text: "09. 数据库工具", link: "09-database"},
            {text: "10. Git 与版本控制", link: "10-version-control"},
            {text: "11. 断点调试", link: "11-debugging"},
            {text: "12. Maven 配置与模块创建", link: "12-maven"},
            {text: "13. 插件、缓存与其他设置", link: "13-maintenance"},
        ],
    },
]);
