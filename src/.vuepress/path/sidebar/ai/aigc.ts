import {arraySidebar} from "vuepress-theme-hope";

export const aigc = arraySidebar([
        {text: "总目录", prefix: "/md/ai/aigc/", link: "/md/ai/",},
        {
            text: "AIGC 生成式 AI",
            children: [
                {text: "提示词工程（Prompt）", icon: "aigc", link: "prompt-engineering"},
                {text: "文本生成（Text）", icon: "aigc", link: "text-generation"},
                {text: "图像生成（Image）", icon: "aigc", link: "image-generation"},
                {text: "视频生成（Video）", icon: "aigc", link: "video-generation"},
                {text: "代码生成（Code）", icon: "aigc", link: "code-generation"},
            ],
        },
    ]
);
