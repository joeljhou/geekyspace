import {arraySidebar} from "vuepress-theme-hope";

export const docker = arraySidebar([
        {text: "总目录", prefix: "/md/cloudnative/docker/", link: "/md/cloudnative/docker/",},
        {
            text: "1. 基础入门",
            children: [
                {text: "Docker 概述", icon: "docker", link: "overview"},
                {text: "Docker 安装", icon: "docker", link: "install"},
            ],
        },
        {
            text: "2. 配置与使用",
            children: [
                {text: "镜像加速器", icon: "docker", link: "mirror-acceleration"},
                {text: "Top20 常用命令", icon: "docker", link: "top20-commands"},
            ],
        },
    ]
);
