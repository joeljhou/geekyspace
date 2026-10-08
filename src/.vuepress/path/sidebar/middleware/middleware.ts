import {arraySidebar} from "vuepress-theme-hope";

export const middleware = arraySidebar([
        {text: "总目录", prefix: "/md/middleware/", link: "/md/middleware/",},
        {
            text: "消息队列", prefix: "mq/", /*link: "mq/",*/
            children: [
                // {text: "RabbitMQ 高并发实战", icon: "rabbitmq", link: "rabbitmq/"},
                // {text: "Kafka 核心与实践", icon: "kafka", link: "kafka/"},
                // {text: "RocketMQ 详解", icon: "rocketmq", link: "rocketmq/"},
            ],
        },
    ]
);
