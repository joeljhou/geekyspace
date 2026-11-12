import {arraySidebar} from "vuepress-theme-hope";

export const cloudnative = arraySidebar([
        {
            text: "文章", children: [
                {
                    text: "Linux", link: "/md/cloudnative/linux/",
                    children: [
                        {text: "systemd 服务管理", link: "/md/cloudnative/linux/basic/01-systemd"},
                        {text: "iptables 防火墙", link: "/md/cloudnative/linux/basic/02-iptables"},
                    ],
                },
            ],
        },
        {
            text: "专栏", children: [
                {text: "Docker 容器化实战", link: "/md/cloudnative/docker/"},
                {text: "Ubuntu 服务器折腾", link: "/md/cloudnative/linux/arm-ubuntu/"},
            ],
        },
    ]
);
