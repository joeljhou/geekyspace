import {arraySidebar} from "vuepress-theme-hope";

export const armUbuntu = arraySidebar([
        {text: "总目录", prefix: "/md/cloudnative/linux/oracle-cloud/", link: "/md/cloudnative/linux/oracle-cloud/",},
        {
            text: "1. 开服准备",
            children: [
                {text: "甲骨文云注册教程", icon: "oracle", link: "00-oracle-cloud-registration"},
            ],
        },
        {
            text: "2. 服务器初始化",
            children: [
                {text: "首次登录服务器", icon: "ubuntu", link: "01-first-login"},
                {text: "安装 WireGuard", icon: "wg", link: "02-wireguard"},
                {text: "安装 NVM、Node.js", icon: "nodejs", link: "03-nvm-nodejs"},
                {text: "安装 Codex CLI", icon: "codex", link: "04-codex-cli"},
            ],
        },
        {
            text: "3. 应用平台",
            children: [
                {text: "安装 Docker Engine", icon: "docker", link: "05-docker-engine"},
                {text: "安装 1Panel 面板", icon: "1panel", link: "06-1panel"},
                {text: "创建 Cloudflare Tunnel 隧道", icon: "cloudflare", link: "07-cloudflare-tunnel"},
            ],
        },
        {
            text: "4. 存储、数据库与网络服务",
            children: [
                {text: "云存储挂载 Openlist 网盘", icon: "openlist", link: "08-openlist"},
                {text: "安装 PostgreSQL 18", icon: "postgresql", link: "09-postgresql"},
                {text: "安装 Redis 8.x", icon: "redis", link: "10-redis"},
                {text: "安装 Sub2API 中转站", icon: "rocket", link: "11-sub2api"},
                {text: "安装 CLIProxyAPI 中转站", icon: "rocket", link: "12-cliproxyapi"},
                {text: "安装 3X-UI 面板指南", icon: "route", link: "13-3x-ui"},
            ],
        },
        {
            text: "5. 自托管应用",
            children: [
                {text: "部署 Sub-Store 和 Sub-Web", icon: "link", link: "14-sub-store"},
                {text: "部署 JoyFlix 影视平台", icon: "film", link: "15-joyflix"},
                {text: "部署 DeepSeek Harness", icon: "robot", link: "16-deepseek-harness"},
            ],
        },
    ]
);
