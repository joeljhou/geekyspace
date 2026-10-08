import {arraySidebar} from "vuepress-theme-hope";

export const ai = arraySidebar([
        {text: "总目录", prefix: "/md/ai/", link: "/md/ai/",},
        {
            text: "AIGC 生成式 AI", prefix: "aigc/",
            children: [
                {text: "提示词工程（Prompt）", icon: "aigc", link: "prompt-engineering"},
                {text: "文本生成（Text）", icon: "aigc", link: "text-generation"},
                {text: "图像生成（Image）", icon: "aigc", link: "image-generation"},
                {text: "视频生成（Video）", icon: "aigc", link: "video-generation"},
                {text: "代码生成（Code）", icon: "aigc", link: "code-generation"},
            ],
        },
        {
            text: "智能体平台", prefix: "coze/",
            children: [
                {text: "Coze：零基础开发对话机器人", icon: "coze", link: "coze-chatbot-basics"},
            ],
        },
        {
            text: "大师笔记",
            children: [
                {text: "Andrej Karpathy 学习资料", icon: "claudecode-fill", link: "karpathy-notes"},
            ],
        },
    ]
);
