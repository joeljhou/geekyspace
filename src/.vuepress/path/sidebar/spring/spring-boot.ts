import {arraySidebar} from "vuepress-theme-hope";

export const springBoot = arraySidebar([
        {text: "总目录", prefix: "/md/spring/boot/", link: "/md/spring/boot/",},
        {
            text: "快速入门", prefix: "", link: "/md/spring/boot/",
            children: [
                {text: "快速入门", link: "quickstart"},
            ]
        },
    ]
);
