---
title: AI 大模型提示词工程深入实战
shortTitle:
description: AIGC 生成式 AI 学习笔记
icon: aigc
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-10-08
category: AI
tags:
  - AIGC
---

# AI大模型提示词工程深入实战
## 概念
- **什么是LLM？**
	- 根据已有上下文，预测下一个 token 的概率分布。
- **什么是Prompt？**
	- 用户输入给大模型的指令/信息。
- **Prompt的类型：** 
	1. *指令型*：👉 直接告诉模型要做什么。
	2. *问答型*：👉 直接提问。
	3. 思维链：👉 引导模型展示推理过程，而非直接给出答案。
	4. 角色型：👉 给模型设定特定角色或身份
	5. 零样本、少样本、多样本Prompt
	6. ...
- **Prompt工程**
	- 优化提示词(Prompt)的工程，让大模型准确理解需求。
## 大模型发展
**🌍 国外**
- **OpenAI** — [ChatGPT](https://openai.com/)
- **Anthropic** — [Claude](https://claude.ai/)
- **Google** — [Gemini](https://gemini.google.com/)
- **Meta ** — [LLaMA](https://ai.meta.com/llama/) 

 **🇨🇳 国内**
- **百度** — [文心一言](https://yiyan.baidu.com/)
- **深度求索** — [DeepSeek](https://www.deepseek.com/en/?utm_source=chatgpt.com)  
- **阿里云** — [千问](https://tongyi.aliyun.com/)
- **智源** — [百川智能](https://baichuan-ai.com/) 医务
- **科大讯飞** — [星火](https://xinghuo.xfyun.cn/)
- **腾讯** — [混元](https://yuanbao.tencent.com/)
- **智谱清言** — [GLM / ChatGLM 系列](https://chatglm.cn/)
- **知谱 AI (Z.ai)**   — [GLM 系列](https://z.ai/)
- **Moonshot AI** — [Kimi 系列](https://www.kimi.com/)

**LLM排行版**
- [LLM Rank - 大型语言模型评测及排行榜](https://llmrank.cn/)
- [LLM 排名 | OpenRouter](https://openrouter.ai/rankings)

## 基本提示词技巧
- [AI大模型提示的艺术：掌握Elavis Saravia与CRISPE框架 - 知乎](https://zhuanlan.zhihu.com/p/692409932)

1. 清晰，明确，避免模糊
2. 使用 `###` 或 `”””` 将指令和待处理内容分开
	- 举例：把用三个引号括起来的文本翻译成英文
3. 指定输出格式
	- 举例：
		- 请按照`markdown`格式输出
		- 按照`json`格式输出一版
		- 输出格式`plantuml`
			- [https://plantuml.com/zh/](https://plantuml.com/zh/)
		- `mermaid`格式输出
			- [https://mermaid.js.org/intro/](https://mermaid.js.org/intro/)
			- [https://mermaid.live/](https://mermaid.live/)
```txt
请概括以下文章的主要观点,并按照以下格式输出:
主题1:<主题名称1>
-<观点1>
...
主题2:<主题名称2>
-<观点2>
...
文本:"""
"""
```
4. 角色扮演
	- [角色扮演场景提示词指南--火山方舟大模型服务平台-火山引擎](https://www.volcengine.com/docs/82379/1256348)
	- 背景，角色
```txt
怎么提高java技术水平
我是一名大学在校生，是数学专业我改如何提高java技术水平
```
 [ChatGPT提升学习效率的10个指令](https://blog.csdn.net/qq_40174960/article/details/158042380)
```markdown
你是一位专业的学习效率优化专家，精通以下10种学习方法：

| 技巧 | 适用场景 | 核心优势 |
|:---|:---|:---|
| **费曼学习法** | 理解复杂概念 | 检验理解深度，发现知识盲点 |
| **帕累托法则** | 时间紧迫，需要快速掌握核心 | 聚焦关键20%，高效产出80% |
| **番茄工作法** | 需要长时间专注学习 | 防止疲劳，保持高效专注 |
| **SQ3R方法** | 阅读教材、文献 | 系统化阅读，提高理解记忆 |
| **艾宾浩斯遗忘曲线** | 需要长期记忆的知识 | 科学复习，对抗遗忘 |
| **主题交叉法** | 学习多个相关主题 | 建立知识联系，促进迁移应用 |
| **双编码理论** | 抽象概念、复杂理论 | 图文结合，双重编码强化记忆 |
| **GROW模型** | 制定学习目标、职业规划 | 结构化思考，明确行动路径 |
| **分块学习法** | 知识体系庞大的领域 | 降低认知负荷，系统化掌握 |
| **多感官学习法** | 需要全面提升学习效果 | 调动多感官，适应个人学习风格 |

我的学习需求是：[填写你的具体学习目标，例如"3个月内掌握AI核心知识"]

请根据我的需求：
1. 分析最适合我的2-3种学习方法组合
2. 为每种方法提供具体的执行步骤
3. 制定一个可操作的周学习计划表
4. 提供用于跟踪学习效果的检查清单
```
## playground 模式
> 通常指 **AI 或软件产品中的交互式测试/实验环境**，让用户可以在无风险、 sandboxed（沙盒化）的环境中自由尝试功能、调试代码或探索模型能力。

**学习：**
- [聊天 | OpenAI API 参考 --- Chat | OpenAI API Reference](https://developers.openai.com/api/reference/resources/chat)
- [什么是 OpenAI Playground？ – 超越 ChatGPT，带来更多可能](https://www.essaydone.ai/zh-cn/chatgpt-hub/what-is-openai-playground.html)

下面是对 `max_tokens`、`temperature`、`top_p`、`frequency_penalty`、`presence_penalty` 五个核心参数的**结构化、技术化、无歧义版本说明**，便于在 API 调用或 Prompt 工程中精准调参。
1. **`max_tokens`（最大生成长度）**
	- 控制**模型最多生成多少个 token**。
	* 注意⚠️ token ≠ 字符数
		- 英文：1 token ≈ 0.75 个单词
		- 中文：1 token ≈ 1 个汉字
		- 代码：通常比自然语言更“耗 token”
2. **`temperature`（温度，控制随机性）**
	- 控制**采样随机程度**。
	- 数学本质：
		- 对 logits 进行 softmax 前除以 temperature。
		- 低温 → 分布更陡峭 → 更确定
		- 高温 → 分布更平滑 → 更随机
	- 取值范围：通常：`0 ~ 1`，部分系统支持到 `2`
3. **`top_p`（核采样 / Nucleus Sampling）**
	- 只从**累计概率达到 p 的候选 token 集合中采样**。

| 参数          | 控制方式     |
| ----------- | -------- |
| temperature | 改变概率分布形状 |
| top_p       | 截断概率分布尾部 |
4. **`frequency_penalty`（频率惩罚）**
	- 根据**token 已出现次数**进行惩罚。
	- 公式逻辑：
		- 出现次数越多 → 下次被选中的概率越低
	- 作用：减少重复词，避免啰嗦，降低“模型复读机”现象
	- 取值范围：`0 ~ 2.0`
5. **`presence_penalty`（存在惩罚）**
	- 只要某个 token 出现过一次，就对其进行惩罚。

| 参数                | 依据    |
| ----------------- | ----- |
| frequency_penalty | 出现次数  |
| presence_penalty  | 是否出现过 |
## 提示词工程化
- [ChatGPT提示词不会写？8个结构化案例让你从小白变大神](https://blog.csdn.net/qq_40174960/article/details/158084206)
## 引用
- [Poe - 一个端点，所有模型](https://poe.com/)
- [OpenAl Playground 模式](https://platform.openai.com/playground)
- [AI 提示词平台](https://prompts.chat/) ｜ [Github](https://github.com/f/prompts.chat)
- [提示词可视化](https://show.langgpt.ai/) ｜ [Github](https://github.com/langgptai/PromptShow)
