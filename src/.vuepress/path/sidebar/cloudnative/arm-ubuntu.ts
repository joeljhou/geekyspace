import {arraySidebar} from "vuepress-theme-hope";

const base = "/md/cloudnative/linux/arm-ubuntu/";

export const armUbuntu = arraySidebar([
    {text: "专栏导读", link: base},
    // 按当前目录和文件编号排列，VuePress 自动解析到文章默认路由。
    {
        text: "环境搭建",
        prefix: `${base}setup/`,
        collapsible: false,
        children: [
            "01-oracle-cloud-registration.html",
            "02-first-login.html",
            "03-nvm-nodejs.html",
            "04-docker-engine.html",
            "05-1panel.html",
        ],
    },
    {
        text: "网络与代理",
        prefix: `${base}network-proxy/`,
        collapsible: false,
        children: [
            "01-cloudflare-tunnel.html",
            "02-wireguard.html",
            "03-3x-ui.html",
            "04-sub-store-sub-web.html",
        ],
    },
    {
        text: "数据与存储",
        prefix: `${base}storage/`,
        collapsible: false,
        children: [
            "01-openlist.html",
            "02-postgresql.html",
            "03-redis.html",
        ],
    },
    {
        text: "AI 工具",
        prefix: `${base}ai/`,
        collapsible: false,
        children: [
            "01-codex-cli.html",
            "02-sub2api.html",
            "03-cliproxyapi-ubuntu.html",
            "04-cliproxyapi-mac-docker.html",
            "05-deepseek-harness.html",
        ],
    },
    {
        text: "自托管应用",
        prefix: `${base}apps/`,
        collapsible: false,
        children: [
            "01-joyflix.html",
            "02-obsidian-livesync.html",
            "03-codex-oci-backup.html",
        ],
    },
]);
