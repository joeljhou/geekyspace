import {arraySidebar} from "vuepress-theme-hope";

export const linux = arraySidebar([
        {text: "总目录", prefix: "/md/cloudnative/linux/", link: "/md/cloudnative/linux/",},
        {
            text: "Linux 基础", prefix: "basic/", /*link: "basic/",*/
            children: [
                {text: "systemd 服务管理基础", icon: "linux", link: "systemd-basics"},
                {text: "Linux 防火墙与 iptables 基础", icon: "linux", link: "iptables-firewall-basics"},
            ],
        },
        {
            text: "专栏",
            children: [
                {text: "Ubuntu 服务器折腾", icon: "ubuntu", link: "oracle-cloud/"},
            ],
        },
    ]
);
