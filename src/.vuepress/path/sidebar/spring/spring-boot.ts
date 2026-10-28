import {arraySidebar} from "vuepress-theme-hope";

export const springBoot = arraySidebar([
    {text: "Spring Boot", link: "/md/spring/boot/"},
    {
        text: "2.x", prefix: "2.x/", link: "/md/spring/boot/2.x/", collapsible: true, children: "structure",
    },
]);
