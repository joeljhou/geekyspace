import {arraySidebar} from "vuepress-theme-hope";

export const installationGuide = arraySidebar([
    {text: "开发者安装大全", prefix: "/md/installation-guide/", link: "/md/installation-guide/"},
    {
        text: "操作系统", prefix: "os/", children: [
            {text: "Windows、Office激活", link: "windows-office-activation"},
        ],
    },
    {
        text: "常用工具", prefix: "base-tools/", children: [
            {text: "Homebrew", link: "Homebrew"},
        ],
    },
    {
        text: "开发环境", prefix: "dev-env/", children: [
            {
                text: "Java", prefix: "java/", link: "java/",
                collapsible: false,
                children: [
                    {text: "SDKMAN", link: "SDKMAN"},
                ]
            },
            {
                text: "Nodejs", prefix: "nodejs/", link: "nodejs/",
                collapsible: false,
                children: [
                    {text: "nvm", link: "nvm"},
                    {text: "nrm", link: "nrm"},
                    {text: "Corepack", link: "Corepack"},
                ]
            },
        ],
    },
]);