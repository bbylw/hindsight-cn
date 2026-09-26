export const snippets = {
  dockerRun: `export OPENAI_API_KEY=sk-xxx

docker run -it --pull always --name hindsight --restart unless-stopped \\
  -p 8888:8888 -p 9999:9999 \\
  -e HINDSIGHT_API_LLM_API_KEY=$OPENAI_API_KEY \\
  -v hindsight-data:/home/hindsight/.pg0 \\
  ghcr.io/vectorize-io/hindsight:latest`,

  dockerCompose: `export OPENAI_API_KEY=sk-xxx
export HINDSIGHT_DB_PASSWORD=choose-a-password
cd docker/docker-compose
docker compose up`,

  pipServer: `pip install hindsight-api
export HINDSIGHT_API_LLM_API_KEY=sk-xxx

hindsight-api`,

  helm: `helm install hindsight oci://ghcr.io/vectorize-io/charts/hindsight \\
  --set api.llm.provider=openai \\
  --set api.llm.apiKey=sk-xxx \\
  --set postgresql.enabled=true`,

  installClients: `# Python
pip install hindsight-client -U

# Node.js / TypeScript
npm install @vectorize-io/hindsight-client

# Go
go get github.com/vectorize-io/hindsight/hindsight-clients/go

# CLI
curl -fsSL https://hindsight.vectorize.io/get-cli | bash`,

  pythonClient: `from hindsight_client import Hindsight

client = Hindsight(base_url="http://localhost:8888")

# Retain：存储信息
client.retain(bank_id="my-bank", content="Alice works at Google as a software engineer")

# Recall：检索记忆
client.recall(bank_id="my-bank", query="What does Alice do?")

# Reflect：生成带倾向性的回答
client.reflect(bank_id="my-bank", query="Tell me about Alice")`,

  nodeClient: `const { HindsightClient } = require('@vectorize-io/hindsight-client');

const main = async () => {
  const client = new HindsightClient({ baseUrl: 'http://localhost:8888' });

  await client.retain('my-bank', 'Alice loves hiking in Yosemite');

  const results = await client.recall('my-bank', 'What does Alice like?');
  console.log(results);
};

main();`,

  pythonEmbedded: `import os
from hindsight import HindsightServer, HindsightClient

with HindsightServer(
    llm_provider="openai",
    llm_model="gpt-5-mini",
    llm_api_key=os.environ["OPENAI_API_KEY"]
) as server:
    client = HindsightClient(base_url=server.url)
    client.retain(bank_id="my-bank", content="Alice works at Google")
    results = client.recall(bank_id="my-bank", query="Where does Alice work?")`,

  litellmWrapper: `from openai import OpenAI
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
    messages=[{"role": "user", "content": "What do you know about me?"}]
)`,

  codingAgents: `# 所有检测到的智能体，原生接入
npx @vectorize-io/hindsight-coding-agents install all

# 或仅安装某一个
npx @vectorize-io/hindsight-coding-agents install claude-code`,

  docsSkill: `npx skills add https://github.com/vectorize-io/hindsight --skill hindsight-docs`,

  retain: `client.retain(
    bank_id="my-bank",
    content="Alice got promoted to senior engineer",
    context="career update",
    timestamp="2025-06-15T10:00:00Z",
)`,

  recall: `client.recall(bank_id="my-bank", query="What does Alice do?")
client.recall(bank_id="my-bank", query="What happened in June?")   # 时间检索`,

  reflect: `client.reflect(bank_id="my-bank", query="What should I know about Alice?")`,

  memoryDefense: `# 每行一个标识，命中即拦截
HINDSIGHT_MEMORY_DEFENSE=github_token,aws_access_key,email,phone`,

  mcp: `http://localhost:8888/mcp/{bank_id}/`,

  cloudPoint: `https://api.hindsight.vectorize.io`,

  webPromo: `export HINDSIGHT_API_LLM_API_KEY=sk-xxx
# Cloud 版无需服务端：把客户端指向托管端点
export HINDSIGHT_API_URL=https://api.hindsight.vectorize.io`,
} as const;

export type SnippetKey = keyof typeof snippets;
