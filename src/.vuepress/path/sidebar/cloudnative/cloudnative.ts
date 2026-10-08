import {arraySidebar} from "vuepress-theme-hope";

export const cloudnative = arraySidebar([
        {text: "总目录", prefix: "/md/cloudnative/", link: "/md/cloudnative/",},
        {
            text: "专栏",
            children: [
                {text: "Docker 容器化实战", icon: "docker", link: "docker/"},
                {text: "Ubuntu 服务器折腾", icon: "ubuntu", link: "linux/oracle-cloud/"},
            ],
        },
        {
            text: "Kubernetes（K8s）", prefix: "k8s/", /*link: "k8s/",*/
            children: [],
        },
        {
            text: "Linux 服务器基础", prefix: "linux/", link: "linux/",
            children: [
                {text: "systemd 服务管理基础", icon: "linux", link: "basic/systemd-basics"},
                {text: "Linux 防火墙与 iptables 基础", icon: "linux", link: "basic/iptables-firewall-basics"},
            ],
        },
    ]
);
