---
title: Andrej Karpathy（安德烈·卡帕蒂）学习资料
shortTitle:
description:
icon:
cover:
author: 流浪码客
isOriginal: true
sticky: false
star: false
date: 2026-06-06
category: AI
tags:
  - AI
---
# Andrej Karpathy（安德烈·卡帕蒂）

[[卡帕西yyds]]
## [面向普通观众的路线](https://karpathy.ai/)
### 1. 技术讲解：从零到英雄
适合系统学习神经网络、深度学习、语言模型等底层技术。
- [YouTube 播放列表：Neural Networks: Zero to Hero](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)
- [B站-头号个体-合集·//Andrej Karpathy 全集//](https://space.bilibili.com/3546983010666913/lists/7729457)
- [B站-脑袋要有光-AI 大神 卡帕西 Andrej Karpathy](https://space.bilibili.com/358605728/lists/6407133)
### 2. 大众讲解：深入理解 ChatGPT 与 LLM
适合了解 ChatGPT、LLM 的底层基本原理，不需要太强的工程背景。
- [YouTube：Deep Dive into LLMs like ChatGPT](https://www.youtube.com/watch?v=7xTGNNLPyMI)
- [B 站中文配音](https://www.bilibili.com/video/BV1fGQzBMEC2)
- [笔记 1：TLDR 版](https://anfalmushtaq.com/artic.%20es/deep-dive-into-llms-like-chatgpt-tldr)
- [笔记 2：Medium 笔记](https://medium.com/@ruchir.srivastava94/deep-dive-into-larg.%20-language-models-llms-like-chatgpt-33003084cbbf)
- [[深入探究 ChatGPT 等 LLM.excalidraw]]
### 3. 实战指南：我如何使用 LLMs
更偏实践，讲 Karpathy 在日常生活和工作中如何使用 LLMs。
- [YouTube：How I use LLMs](https://www.youtube.com/watch?v=EWvNQjAaOHw)
- [B 站中文配音](https://www.bilibili.com/video/BV1gXDeBkEa1)
### 4. 早期入门：《大型语言模型入门》
发布时间较早，但仍然适合作为 LLM 的入门材料。
- [YouTube：Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g)
- [B 站中文配音](https://www.bilibili.com/video/BV1ErjhzCE3s)
- [笔记 1：Substack 笔记](https://ppaolo.substack.com/p/introduction-to-large-language-models-llms)
- [笔记 2：Hai Gallery 笔记](https://www.hai.gallery/ai/)
## [从零到英雄系列：技术路线](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)

> 适合系统学习神经网络、反向传播、语言模型、Transformer、Tokenizer 和 GPT 训练流程。  
这条路线不是单纯讲概念，而是从零开始手写核心代码。
### 1. 神经网络和反向传播的详细介绍：构建 micrograd
从最小的计算图开始，手写自动微分引擎，理解神经网络里的前向传播、反向传播、梯度和参数更新。
- [YouTube：The spelled-out intro to neural networks and backpropagation: building micrograd](https://www.youtube.com/watch?v=VMj-3S1tku0)
- [B 站中文配音](https://www.bilibili.com/video/BV162JyztE7Q/)

### 2. 语言模型入门：构建 makemore Part 1
用字符级 bigram 模型理解语言模型的基本任务：根据上下文预测下一个字符，并引入训练、采样和 loss。
- [YouTube：The spelled-out intro to language modeling: building makemore](https://www.youtube.com/watch?v=PaCmpygFfXo)
- [B 站中文配音](https://www.bilibili.com/video/BV1NEDuBfEPW/)

### 3. makemore Part 2：MLP 多层感知机
用 MLP 改进字符级语言模型，学习 embedding、隐藏层、learning rate、训练集/验证集/测试集划分等机器学习基础。
- [YouTube：Building makemore Part 2: MLP](https://www.youtube.com/watch?v=TCH_1BHY58I)
- [B 站中文配音](https://www.bilibili.com/video/BV1mfD3BuEx9/)

### 4. makemore Part 3：激活函数、梯度与 BatchNorm
分析神经网络训练中的 activation 和 gradient 分布，理解初始化、梯度问题和 BatchNorm 的作用。
- [YouTube：Building makemore Part 3: Activations & Gradients, BatchNorm](https://www.youtube.com/watch?v=P6sfmUTpUmc)
- [B 站中文配音](https://www.bilibili.com/video/BV1jcDVBoEB4/)

### 5. makemore Part 4：Backprop Ninja
不依赖 PyTorch 的 `loss.backward()`，手动推导并实现 cross entropy、linear、tanh、BatchNorm、embedding 的反向传播。
- [YouTube：Building makemore Part 4: Becoming a Backprop Ninja](https://www.youtube.com/watch?v=q8SA3rM6ckI)
- [B 站中文配音](https://www.bilibili.com/video/BV1ZuSoBjEeu/)

### 6. makemore Part 5：构建 WaveNet
把前面的 MLP 扩展成更深的层级结构，构建类似 WaveNet 的字符级语言模型，并学习 `torch.nn` 的模块化写法。
- [YouTube：Building makemore Part 5: Building a WaveNet](https://www.youtube.com/watch?v=t3YJ5hKiMQ0)
- [B 站中文配音](https://www.bilibili.com/video/BV1qdSfBXESr/)

### 7. 从零构建 GPT
从零实现一个小型 GPT，核心包括 token embedding、position embedding、causal self-attention、multi-head attention 和 Transformer block。
- [YouTube：Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY)
- [B 站中文配音](https://www.bilibili.com/video/BV1FSSfBZEMP/)

### 8. State of GPT：GPT 技术现状
从整体视角讲 GPT 助手的训练流程，包括 pretraining、supervised fine-tuning、reward model、RLHF、prompting、tool use 和 fine-tuning。
- [YouTube：State of GPT | BRK216HFS](https://www.youtube.com/watch?v=bZQun8Y4L2A)

### 9. GPT Tokenizer：从零构建分词器
从零实现 GPT 系列使用的 BPE Tokenizer，理解字符串如何变成 token，以及为什么分词会影响 LLM 的行为。
- [YouTube：Let's build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE)
- [B 站中文配音]([https://www.bilibili.com/video/BV1FSSfBZEMP/](https://www.bilibili.com/video/BV1LeD8BuERC/))

### 10. GPT-2 124M 复现
从空文件开始复现 GPT-2 124M，包括模型结构、加载 Hugging Face 权重、训练循环、混合精度、Flash Attention、DDP 和评估。
- [YouTube：Let's reproduce GPT-2 (124M)](https://www.youtube.com/watch?v=l8pRSuU81PU)
- [B 站中文配音](https://www.bilibili.com/video/BV1qBQKBGEKG/)

补充资料：
- [GitHub：karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero)
- [GitHub：karpathy/micrograd](https://github.com/karpathy/micrograd)
- [GitHub：karpathy/makemore](https://github.com/karpathy/makemore)
- [GitHub：karpathy/minbpe](https://github.com/karpathy/minbpe)
- [GitHub：karpathy/nanoGPT](https://github.com/karpathy/nanoGPT)
- [GitHub：karpathy/build-nanogpt](https://github.com/karpathy/build-nanogpt)
- [中文配音](https://www.bilibili.com/video/BV1qBQKBGEKG) 
	- 原版 [OpenAI GPT-2](https://github.com/openai/gpt-2) 使用的是 Google 的深度学习框架 [TensorFlow](https://www.tensorflow.org) 实现。
	- 本次复现改用 Meta 的深度学习框架 [PyTorch](https://pytorch.org/)，实现时主要参考：
	  - Hugging Face Transformers 中的 [GPT-2 源码实现](https://github.com/huggingface/transformers/blob/main/src/transformers/models/gpt2/modeling_gpt2.py)
	  - Hugging Face 模型库中的 [openai-community/gpt2 预训练权重](https://huggingface.co/openai-community/gpt2)
	  - VSCode安装`ms-toolsai.jupyter` 插件
