<div align="center">

![Hindsight Banner](https://raw.githubusercontent.com/vectorize-io/hindsight/main/hindsight-docs/static/img/hindsight-github-banner.png)

[文档](https://hindsight.vectorize.io) • [集成](https://hindsight.vectorize.io/integrations) • [示例库](https://hindsight.vectorize.io/cookbook) • [基准测试](https://benchmarks.hindsight.vectorize.io/) • [论文](https://arxiv.org/abs/2512.12818) • [Hindsight Cloud](https://ui.hindsight.vectorize.io/signup)

[![Release](https://github.com/vectorize-io/hindsight/actions/workflows/release.yml/badge.svg)](https://github.com/vectorize-io/hindsight/actions/workflows/release.yml)
[![Version](https://img.shields.io/pypi/v/hindsight-api?logo=python&logoColor=white&label=version&color=blue)](https://pypi.org/project/hindsight-api/)
[![PyPI Downloads](https://img.shields.io/pypi/dm/hindsight-client?logo=pypi&logoColor=white&label=PyPI&color=blue)](https://pypi.org/project/hindsight-client/)
[![NPM Downloads](https://img.shields.io/npm/dm/%40vectorize-io%2Fhindsight-client?logo=npm&logoColor=white&label=NPM&color=blue)](https://www.npmjs.com/package/@vectorize-io/hindsight-client)
[![Slack Community](https://img.shields.io/badge/Slack-Join%20Community-4A154B?logo=slack)](https://vectorize.io/slack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br/>
<p align="center">
 <a href="https://www.star-history.com/vectorize-io/hindsight"><img src="https://api.star-history.com/badge?repo=vectorize-io/hindsight&type=rank" alt="Star History Rank" /> <img src="https://api.star-history.com/badge?repo=vectorize-io/hindsight&type=trending" alt="GitHub Trending Repository of the Day" /></a>
</p>

</div>

---

## 什么是 Hindsight？

Hindsight™ 是一套智能体记忆系统，旨在打造能够随时间不断学习的更聪明智能体。多数智能体记忆系统只关注「回放对话历史」，而 Hindsight 关注的是让智能体**学会**，而不只是记住。

<video src="https://github.com/user-attachments/assets/923b798d-3581-4897-bb62-9cfa5a931682" controls></video>

它弥补了 RAG、知识图谱等替代方案的根本缺陷，并在长期记忆任务上取得了业界领先的（state-of-the-art）表现。

**目录**

- [记忆性能与准确率](#记忆性能与准确率)
- [快速开始](#快速开始) — [服务端](#1-启动服务端) · [客户端](#2-连接客户端) · [支持的平台](#支持的平台) · [嵌入式](#python-嵌入式无需服务端)
- [将 Hindsight 接入你的 Agent](#将-hindsight-接入你的-agent) — [LLM 包装器](#llm-包装器两行代码) · [集成](#集成) · [编程智能体](#编程智能体) · [MCP](#mcp-服务)
- [核心概念](#核心概念) — [记忆类型](#记忆类型) · [retain / recall / reflect](#三个核心操作) · [观察](#观察) · [心智模型与知识页](#心智模型与知识页) · [记忆库](#记忆库banks)
- [应用场景](#应用场景)
- [生产环境部署](#生产环境部署)
- [资源](#资源)

---

## 记忆性能与准确率

根据基准测试表现，Hindsight 是目前被测过的最准确的智能体记忆系统。它在被广泛用于评估各类对话式 AI 场景记忆表现的 LongMemEval 基准上取得了业界领先的成绩。截至 2026 年 1 月，Hindsight 与其他智能体记忆方案的当前成绩对比如下：

![Overview](https://raw.githubusercontent.com/vectorize-io/hindsight/main/hindsight-docs/static/img/hindsight-benchmarks.png)

> 实时、持续更新的结果——包括各模型的准确率、延迟与成本——发布于 [benchmarks.hindsight.vectorize.io](https://benchmarks.hindsight.vectorize.io/)。

Hindsight 的基准测试数据已由弗吉尼亚理工 [Sanghani 人工智能与数据分析中心](https://sanghani.cs.vt.edu/) 以及《华盛顿邮报》的研究合作方独立复现。其余分数由各家软件厂商自行上报。

Hindsight 已在多家财富 500 强企业的生产环境中使用，并被越来越多 AI 初创公司采用。

---

> 🤖 **正在使用编程智能体？** 安装 Hindsight 文档技能，编码时即可即时查阅文档：
> ```bash
> npx skills add https://github.com/vectorize-io/hindsight --skill hindsight-docs
> ```
> 适用于 Claude Code、Cursor 及其他 AI 编程助手。

---

## 快速开始

### 1. 启动服务端

#### Docker（推荐）

```bash
export OPENAI_API_KEY=sk-xxx

docker run -it --pull always --name hindsight --restart unless-stopped -p 8888:8888 -p 9999:9999 \
  -e HINDSIGHT_API_LLM_API_KEY=$OPENAI_API_KEY \
  -v hindsight-data:/home/hindsight/.pg0 \
  ghcr.io/vectorize-io/hindsight:latest
```

>API 地址：http://localhost:8888
>UI 地址：http://localhost:9999

Hindsight 通过 `HINDSIGHT_API_LLM_PROVIDER` 支持 **25+ 家 LLM 提供商**——云端托管（`openai`、`anthropic`、`gemini`、`groq`、`bedrock`、`vertexai`、`minimax`、`deepseek`、`atlas`、`meta` 等）、完全本地（`ollama`、`lmstudio`、`llamacpp`）、任意 OpenAI 兼容端点，以及可触达其余厂商的网关（`litellm`、`litellmrouter`）。已有的订阅也能直接复用：`openai-codex`（ChatGPT Plus/Pro）、`claude-code`（Claude Pro/Max）、`cursor`（Cursor）和 `github-copilot`（GitHub Copilot）无需 API Key。详见[支持的模型](https://hindsight.vectorize.io/developer/models)。

#### Docker（外部 PostgreSQL）

```bash
export OPENAI_API_KEY=sk-xxx
export HINDSIGHT_DB_PASSWORD=choose-a-password
cd docker/docker-compose
docker compose up
```

> 企业部署还支持 Oracle AI Database，功能完全对齐。详见[存储文档](https://hindsight.vectorize.io/developer/storage)。

#### 裸机（pip）

```bash
pip install hindsight-api
export HINDSIGHT_API_LLM_API_KEY=sk-xxx

hindsight-api
```

#### Kubernetes（Helm）

```bash
helm install hindsight oci://ghcr.io/vectorize-io/charts/hindsight \
  --set api.llm.provider=openai \
  --set api.llm.apiKey=sk-xxx \
  --set postgresql.enabled=true
```

#### 托管版（无需服务端）

[Hindsight Cloud](https://vectorize.io/pricing) 是托管方案：基础设施自动扩缩，附带仪表盘、备份、团队协作以及 99.9% 可用性 SLA。按用量计费，起步赠送免费额度——无固定月费或席位费。将任意客户端指向 `https://api.hindsight.vectorize.io` 并带上你的 API Key，即可完全跳过部署环节。

[对比自托管、Cloud 与企业版 →](https://vectorize.io/pricing) · [注册 →](https://ui.hindsight.vectorize.io/signup)

包括 Windows 与离线（air-gapped）环境在内的所有选项，详见[安装指南](https://hindsight.vectorize.io/developer/installation)。

### 2. 连接客户端

```bash
pip install hindsight-client -U                                  # Python
npm install @vectorize-io/hindsight-client                        # Node.js / TypeScript
go get github.com/vectorize-io/hindsight/hindsight-clients/go     # Go
curl -fsSL https://hindsight.vectorize.io/get-cli | bash          # CLI
```

#### Python

```python
from hindsight_client import Hindsight

client = Hindsight(base_url="http://localhost:8888")

# Retain：存储信息
client.retain(bank_id="my-bank", content="Alice works at Google as a software engineer")

# Recall：检索记忆
client.recall(bank_id="my-bank", query="What does Alice do?")

# Reflect：生成带倾向性的回答
client.reflect(bank_id="my-bank", query="Tell me about Alice")
```

#### Node.js / TypeScript

```javascript
const { HindsightClient } = require('@vectorize-io/hindsight-client');

const main = async () => {
  const client = new HindsightClient({ baseUrl: 'http://localhost:8888' });

  await client.retain('my-bank', 'Alice loves hiking in Yosemite');

  const results = await client.recall('my-bank', 'What does Alice like?');
  console.log(results);
}

main();
```

完整参考：[Python](https://hindsight.vectorize.io/sdks/python) · [Node.js](https://hindsight.vectorize.io/sdks/nodejs) · [Go](https://hindsight.vectorize.io/sdks/go) · [CLI](https://hindsight.vectorize.io/sdks/cli) · [REST API](https://hindsight.vectorize.io/api-reference)

### 支持的平台

| 平台 | Docker | 裸机（pip） | 嵌入式数据库（pg0） |
|----------|--------|------------------|--------------------|
| **Linux**（x86_64、ARM64） | ✅ | ✅ | ✅ |
| **macOS**（Apple Silicon / arm64） | ✅ | ✅ | ✅ |
| **macOS**（Intel / x86_64） | ✅ | ⚠️ | ✅ |
| **Windows**（x86_64） | ✅ | ✅ | ✅ |

⚠️ Intel Mac：请使用 `hindsight-all-slim`——详见[安装指南](https://hindsight.vectorize.io/developer/installation#supported-platforms)。

### Python 嵌入式（无需服务端）

```bash
pip install hindsight-all -U
```

在 Intel（x86_64）Mac 上请改用 `hindsight-all-slim`——参见[支持的平台](#支持的平台)。

```python
import os
from hindsight import HindsightServer, HindsightClient

with HindsightServer(
    llm_provider="openai",
    llm_model="gpt-5-mini",
    llm_api_key=os.environ["OPENAI_API_KEY"]
) as server:
    client = HindsightClient(base_url=server.url)
    client.retain(bank_id="my-bank", content="Alice works at Google")
    results = client.recall(bank_id="my-bank", query="Where does Alice work?")
```

[Node.js 等效方案](https://hindsight.vectorize.io/sdks/hindsight-all-npm) 与 [守护进程 CLI](https://hindsight.vectorize.io/sdks/embed) 同样可用。

---

## 将 Hindsight 接入你的 Agent

### LLM 包装器（两行代码）

为已有 Agent 添加记忆最简单的方式就是 LLM 包装器。把你的 LLM 客户端换成包装后的版本即可——此后每次调用都会自动存储与检索记忆，无需改动其他代码。

```bash
pip install hindsight-litellm
```

```python
from openai import OpenAI
from hindsight_litellm import wrap_openai

# 包装你已有的 LLM 客户端即可完成接入。
# 默认指向 Hindsight Cloud；传入 hindsight_api_url 可改用自托管服务端。
client = wrap_openai(
    OpenAI(),
    bank_id="user-123",
    hindsight_api_url="http://localhost:8888",
)

# 调用前 Hindsight 会召回相关记忆，
# 调用后会保留本次对话。
response = client.chat.completions.create(
    model="gpt-5-mini",
    messages=[{"role": "user", "content": "What do you know about me?"}],
)
```

`wrap_anthropic()` 对 Anthropic SDK 做同样的事，且每一项设置——bank、召回预算、事实类型、用 reflect 替代 recall——都可通过 `hindsight_*` 关键字参数在每次调用时单独覆盖。底层基于 LiteLLM，因此同一套集成可覆盖 **100+ 模型**。详见 [LiteLLM 集成](https://hindsight.vectorize.io/sdks/integrations/litellm)。

如果你需要显式控制记忆**何时**被存储与召回，请直接使用 [SDK 或 REST API](#2-连接客户端)。

### 集成

**60+ 项集成**——多数无需改代码。

| | |
|---|---|
| **编程智能体** | [Claude Code](https://hindsight.vectorize.io/sdks/integrations/claude-code) · [Codex](https://hindsight.vectorize.io/sdks/integrations/codex) · [Cursor](https://hindsight.vectorize.io/sdks/integrations/cursor) · [GitHub Copilot](https://hindsight.vectorize.io/sdks/integrations/github-copilot) · [opencode](https://hindsight.vectorize.io/sdks/integrations/opencode) · [Cline](https://hindsight.vectorize.io/sdks/integrations/cline) · [Aider](https://hindsight.vectorize.io/sdks/integrations/aider) · [Zed](https://hindsight.vectorize.io/sdks/integrations/zed) · [Continue](https://hindsight.vectorize.io/sdks/integrations/continue) · [Roo Code](https://hindsight.vectorize.io/sdks/integrations/roo-code) · [OpenHands](https://hindsight.vectorize.io/sdks/integrations/openhands) |
| **智能体框架** | [LangGraph / LangChain](https://hindsight.vectorize.io/sdks/integrations/langgraph) · [LlamaIndex](https://hindsight.vectorize.io/sdks/integrations/llamaindex) · [CrewAI](https://hindsight.vectorize.io/sdks/integrations/crewai) · [Pydantic AI](https://hindsight.vectorize.io/sdks/integrations/pydantic-ai) · [OpenAI Agents SDK](https://hindsight.vectorize.io/sdks/integrations/openai-agents) · [Google ADK](https://hindsight.vectorize.io/sdks/integrations/google-adk) · [Agno](https://hindsight.vectorize.io/sdks/integrations/agno) · [Strands](https://hindsight.vectorize.io/sdks/integrations/strands) · [AutoGen](https://hindsight.vectorize.io/sdks/integrations/autogen) · [Microsoft Agent Framework](https://hindsight.vectorize.io/sdks/integrations/agent-framework) · [Vercel AI SDK](https://hindsight.vectorize.io/sdks/integrations/ai-sdk) · [Haystack](https://hindsight.vectorize.io/sdks/integrations/haystack) |
| **无代码 / 低代码** | [n8n](https://hindsight.vectorize.io/sdks/integrations/n8n) · [Zapier](https://hindsight.vectorize.io/sdks/integrations/zapier) · [Dify](https://hindsight.vectorize.io/sdks/integrations/dify) · [Flowise](https://hindsight.vectorize.io/sdks/integrations/flowise) |
| **应用与工具** | [ChatGPT](https://hindsight.vectorize.io/sdks/integrations/chatgpt) · [Perplexity](https://hindsight.vectorize.io/sdks/integrations/perplexity) · [Obsidian](https://hindsight.vectorize.io/sdks/integrations/obsidian) · [Pipecat](https://hindsight.vectorize.io/sdks/integrations/pipecat) · [Vapi](https://hindsight.vectorize.io/sdks/integrations/vapi) |

👉 [**浏览全部集成**](https://hindsight.vectorize.io/integrations)

### 编程智能体

一个包即可为 CLI 编程智能体赋予长期项目记忆：基于 git 历史与过往会话自动构建的「每仓库一个 bank」，在智能体开始工作时注入其中，并附带涵盖架构、规范与进行中工作的精选知识页。

```bash
npx @vectorize-io/hindsight-coding-agents install all          # 所有检测到的智能体，原生接入
npx @vectorize-io/hindsight-coding-agents install claude-code  # 或仅安装某一个
```

支持 Claude Code、Codex CLI、Cursor CLI、GitHub Copilot CLI、opencode、Kilo CLI、Cline CLI、Antigravity CLI、Devin CLI、pi、Prime Agent、Grok Build 与 DeepSeek Harness。数据摄取是自动的——无需任何初始化命令。详见[编程智能体集成](https://hindsight.vectorize.io/sdks/integrations/coding-agents)。

### MCP 服务

每个服务端都内置一个 [Model Context Protocol](https://modelcontextprotocol.io/) 端点，每个 bank 一个，默认开启：

```
http://localhost:8888/mcp/{bank_id}/
```

将任意 MCP 客户端指向它，即可把 retain、recall、reflect 作为工具暴露出来。详见 [MCP 服务文档](https://hindsight.vectorize.io/developer/mcp-server)。

---

## 核心概念

![Overview](https://raw.githubusercontent.com/vectorize-io/hindsight/main/hindsight-docs/static/img/hindsight-overview.webp)

### 记忆类型

多数智能体记忆实现依赖基础的向量检索，偶尔使用知识图谱。Hindsight 采用仿生数据结构来组织智能体记忆，更接近人类记忆的工作方式：

- **世界事实（World facts）：** 关于世界的事实（"炉子会变烫"）
- **经历（Experiences）：** 智能体自身的体验（"我摸了炉子，真的很疼"）
- **观察（Observations）：** 由大量记忆凝练而成、有证据支撑的信念
- **心智模型（Mental models）：** 从观察与事实中综合而来的、对智能体所处世界的习得性理解

记忆存放在 **bank（记忆库）** 中。新记忆加入时，会被推入「世界事实」或「经历」通道之一，再以实体、关系、时间序列的组合形式表示，并辅以稀疏/稠密向量表征，以便后续召回。

### 三个核心操作

#### Retain

`retain` 操作用于将新记忆推入 Hindsight。它告诉 Hindsight **保留**你作为输入传入的信息。

```python
client.retain(
    bank_id="my-bank",
    content="Alice got promoted to senior engineer",
    context="career update",
    timestamp="2025-06-15T10:00:00Z",
)
```

在背后，retain 借助 LLM 抽取关键事实、时间数据、实体与关系，再经由归一化流程，把抽取出的数据转换为规范化实体、时间序列、搜索索引及元数据。这些表征构成了 recall 与 reflect 操作中精准记忆检索的通路。

<video src="https://github.com/user-attachments/assets/0555177d-6635-467d-97cb-9dcddb999b15" controls muted></video>

[Retain 文档 →](https://hindsight.vectorize.io/developer/retain)

#### Recall

recall 操作用于检索记忆。这些记忆可来自任意记忆类型（世界事实、经历等）。

```python
client.recall(bank_id="my-bank", query="What does Alice do?")
client.recall(bank_id="my-bank", query="What happened in June?")   # 时间检索
```

recall 并行执行 4 种检索策略：
- 语义：向量相似度
- 关键词：BM25 精确匹配
- 图谱：实体/时间/因果关联
- 时间：时间范围过滤

<video src="https://github.com/user-attachments/assets/1c02eac8-1c5a-4e42-9a00-7201d44975a0" controls muted></video>

各路结果会被合并，先以倒数排名融合（reciprocal rank fusion）按相关性排序，再用交叉编码器（cross-encoder）重排模型重排，最后按需裁剪以适配 token 上限。

[Recall 文档 →](https://hindsight.vectorize.io/developer/retrieval)

#### Reflect

reflect 操作对已有记忆做更深入的分析。它让智能体在记忆之间建立新的联系，并对自身世界形成更透彻的理解——或用来回答一个需要深度思考而非简单查表的问题。

```python
client.reflect(bank_id="my-bank", query="What should I know about Alice?")
```

例如，reflect 适用的场景包括：

- **AI 项目经理** 反思项目中需要规避的风险。
- **销售智能体** 反思为何某些外联消息有回应、另一些没有。
- **支持智能体** 反思客户现有产品文档未能解答的问题所在。

<video src="https://github.com/user-attachments/assets/1dd8aa20-5ad0-4536-823e-0fadf8051d57" controls muted></video>

[Reflect 文档 →](https://hindsight.vectorize.io/developer/reflect)

### 观察

被保留的事实不会始终堆成一摊。在后台，Hindsight 会把相关事实整合为**观察**——即 bank 随时间积累起来的、已去重的信念。每条观察都保留支撑证据（含原文引用）与证明计数；当新证据到来时，它会被**精炼**而非覆盖，因此新信息会强化、削弱或延展既有信念，而不是悄无声息地替换掉它。

[观察文档 →](https://hindsight.vectorize.io/developer/observations)

### 心智模型与知识页

**心智模型** 是对某个 bank 某个问题的常驻回答（"该用户的偏好是什么？"）。你只需定义一次问题；Hindsight 负责写出答案、存储它，并在 bank 持续学习的过程中于后台重写它。读取它只是一次数据库读取——无需检索、无需调用 LLM——于是智能体可以带着一页已成定论的知识启动，而不必每次会话都重新发现。

**知识页** 是「隐藏了机制」的心智模型：由 bank 自行书写、关于自身的鲜活文档，像 wiki 一样按文件夹组织、可搜索，并能以普通 markdown 形式投影到磁盘上。你只需提供名称与一个问题；其余决策都是可覆盖的默认值。

[心智模型 →](https://hindsight.vectorize.io/developer/mental-models) · [知识页 →](https://hindsight.vectorize.io/developer/knowledge-pages)

### 记忆库（Banks）

**bank** 是一个相互隔离的记忆存储——一个用户、智能体或项目的「一颗大脑」。隔离是严格的：bank 之间不会泄漏。bank 带有背景上下文与**倾向特质**（disposition traits，如怀疑、拘泥字面、共情），这些特质塑造了 reflect 在其记忆上推理的方式，并可由声明式的 [bank 模板](https://hindsight.vectorize.io/developer/api/bank-templates) 创建。

还有两点值得了解：

- **默认多语言。** 输入语言会被检测并端到端保留——事实保持原始语言，实体保留原生文字（张伟 仍是 张伟，而非 "Zhang Wei"）。[文档 →](https://hindsight.vectorize.io/developer/multilingual)
- **记忆防御（Memory Defense）。** 一项可按 bank 启用的策略，针对 45 种模式扫描每次 retain 中的密钥与 PII，要么对命中项做脱敏（`[REDACTED:github_token]`），要么在存入前直接拦截。[文档 →](https://hindsight.vectorize.io/developer/memory-defense)

---

## 应用场景

Hindsight 既服务于对话式 AI 智能体，也服务于旨在自主执行任务的智能体。最理想的应用场景是那些需要融合上述特性的智能体，例如需要应对开放式任务、根据用户反馈改变行为、并学习执行复杂任务以逼近人类工作水平的 AI 员工。Hindsight 也可配合 n8n 等构建的简单 AI 工作流使用，但对这类应用可能有些杀鸡用牛刀。

### 按用户记忆与聊天历史

你能用 Hindsight 做的最简单的场景之一，就是通过存储与召回与单个用户相关的记忆，来为 AI 聊天机器人及其他对话式智能体做个性化。

该场景的典型需求大致如下：

![Per-User Memories](https://raw.githubusercontent.com/vectorize-io/hindsight/main/hindsight-docs/static/img/per-user-memory-requirements.png)

<video src="https://github.com/user-attachments/assets/4805e8e1-e7d1-47c6-a4f8-2344a5ec8906" controls></video>

在 Hindsight 中满足这些需求很直接。当新的用户输入与工具调用通过 retain 操作被摄入 Hindsight 时，可用自定义元数据来丰富新记忆。元数据提供了一种便捷方式，用来隔离那些需要限定给特定用户的记忆。一旦喂入 retain 操作，任何由此生成的原始记忆与心智模型，都可在检索相关记忆时按需过滤。

![Per-User Memories](https://raw.githubusercontent.com/vectorize-io/hindsight/main/hindsight-docs/static/img/per-user-memory-howto.png)

更多模式见[示例库](https://hindsight.vectorize.io/cookbook)与[最佳实践](https://hindsight.vectorize.io/best-practices)。

---

## 生产环境部署

| | |
|---|---|
| **存储** | PostgreSQL + pgvector，或功能完全对齐的 Oracle AI Database 23ai —— [存储](https://hindsight.vectorize.io/developer/storage) |
| **配置** | 层级式：全局环境变量 → 每租户 → 每 bank —— [配置](https://hindsight.vectorize.io/developer/configuration) |
| **监控** | 面向 LLM 调用、token 与延迟的 Prometheus 指标与仪表盘 —— [监控](https://hindsight.vectorize.io/developer/monitoring) |
| **运维** | 用于迁移、bank 修复与卡住操作的管理 CLI —— [管理 CLI](https://hindsight.vectorize.io/developer/admin-cli) |
| **事件** | 面向 retain、整合与刷新生命周期事件的 Webhook —— [Webhook](https://hindsight.vectorize.io/developer/api/webhooks) |
| **可扩展性** | 租户、鉴权与存储的扩展点 —— [扩展](https://hindsight.vectorize.io/developer/extensions) |
| **托管** | 用 [Hindsight Cloud](https://vectorize.io/pricing) 省去这一切——托管、按量计费、99.9% 可用性 SLA |

---

## 资源

**文档：**
- [文档](https://hindsight.vectorize.io) · [FAQ](https://hindsight.vectorize.io/faq) · [最佳实践](https://hindsight.vectorize.io/best-practices) · [示例库](https://hindsight.vectorize.io/cookbook) · [博客](https://hindsight.vectorize.io/blog)
- [论文](https://arxiv.org/abs/2512.12818) · [基准测试](https://benchmarks.hindsight.vectorize.io/) · [RAG 与记忆对比](https://hindsight.vectorize.io/developer/rag-vs-hindsight)

**客户端：**
- [Python](https://hindsight.vectorize.io/sdks/python) · [Node.js](https://hindsight.vectorize.io/sdks/nodejs) · [Go](https://hindsight.vectorize.io/sdks/go) · [CLI](https://hindsight.vectorize.io/sdks/cli) · [REST API](https://hindsight.vectorize.io/api-reference)

**社区：**
- [Slack](https://vectorize.io/slack)
- [GitHub Issues](https://github.com/vectorize-io/hindsight/issues)

---

## Star 历史

[![Star History Chart](https://api.star-history.com/chart?repos=vectorize-io/hindsight&type=date&legend=top-left)](https://www.star-history.com/?repos=vectorize-io%2Fhindsight&type=date&legend=top-left)

---

## 贡献

详见 [CONTRIBUTING.md](https://github.com/vectorize-io/hindsight/blob/main/CONTRIBUTING.md)。

## 许可证

MIT —— 详见 [LICENSE](https://github.com/vectorize-io/hindsight/blob/main/LICENSE)

---

由 [Vectorize.io](https://vectorize.io) 构建

<img src="https://umami-pixel.chris-latimer.workers.dev/?id=a8b043e6-6964-454d-80df-69b69d3f0d50&host=github.com&url=/vectorize-io/hindsight" width="1" height="1" alt="" />
