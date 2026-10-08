import {arraySidebar} from "vuepress-theme-hope";

export const blockchain = arraySidebar([
        {text: "总目录", prefix: "/md/blockchain/", link: "/md/blockchain/",},
        {
            text: "1. 入门指南", prefix: "crypto-guide/",
            children: [
                {text: "区块链与加密货币入门", icon: "smart-contracts", link: "what-is-blockchain"},
            ],
        },
        {
            text: "2. 周边实践", prefix: "hongkong-banking/",
            children: [
                {text: "香港银行开户核心流程", icon: "hongkong", link: "hk-bank-account-guide"},
            ],
        },
    ]
);
