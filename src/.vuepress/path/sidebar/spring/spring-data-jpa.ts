import {arraySidebar} from "vuepress-theme-hope";

export const springDataJpa = arraySidebar([
        {text: "总目录", prefix: "/md/spring/data-jpa/", link: "/md/spring/data-jpa/",},
        {
            text: "快速入门", prefix: "jetbrains/", link: "jetbrains/",
            children: [
                {text: "Spring Data JPA 快速入门", link: "getting-started"},
            ]
        },
    ]
);
