import {arraySidebar} from "vuepress-theme-hope";

export const toolsGuide = arraySidebar([
    {text: "工具指南", link: "/md/tools-guide/"},
    {
        text: "安装激活", prefix: "activation/",
        collapsible: false,
        children: [
            {text: "Office 激活", link: "windows-office"},
            {text: "IDEA 激活", link: "idea"},
        ],
    },
    {
        text: "环境配置", prefix: "env-config/",
        collapsible: false,
        children: [
            {text: "Homebrew", link: "homebrew"},
            {text: "SDKMAN", link: "sdkman"},
            {text: "NVM", link: "nvm"},
            {text: "NRM", link: "nrm"},
            {text: "Corepack", link: "corepack"},
        ],
    },
    {
        text: "开发实践", prefix: "dev-practices/",
        collapsible: false,
        children: [
            {text: "Git 提交规范", link: "git-commit"},
            {text: "SSH 配置多账号", link: "git-ssh"},
            {text: "NPS 内网穿透", link: "nps"},
        ],
    },
    {
        text: "Mac 技巧", prefix: "mac-tips/",
        collapsible: false,
        children: [
            {text: "Zsh 别名配置", link: "aliases"},
            {text: "Finder 快速操作", link: "finder"},
        ],
    },
]);
