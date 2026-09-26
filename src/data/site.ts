export interface NavItem {
  label: string;
  href: string;
}

export interface MemoryType {
  key: string;
  name: string;
  en: string;
  summary: string;
  example: string;
  colorVar: string;
}

export interface Operation {
  key: string;
  name: string;
  verb: string;
  title: string;
  summary: string;
  colorVar: string;
  strategies?: { name: string; detail: string }[];
  examples?: string[];
}

export interface IntegrationCategory {
  name: string;
  icon: string;
  items: { name: string; href: string }[];
}

export interface DeploymentItem {
  name: string;
  detail: string;
  href: string;
  icon: string;
}

export const site = {
  name: 'Hindsight',
  tagline: '会学习的智能体记忆',
  description:
    'Hindsight 是一套智能体记忆系统：不只回放对话历史，而是让智能体随时间真正学会。LongMemEval 94.6%，业界领先。',
  github: 'https://github.com/vectorize-io/hindsight',
  benchmarks: 'https://benchmarks.hindsight.vectorize.io/',
  pricing: 'https://vectorize.io/pricing',
  slack: 'https://vectorize.io/slack',
  paper: 'https://arxiv.org/abs/2512.12818',
  cloudSignup: 'https://ui.hindsight.vectorize.io/signup',
} as const;

export const nav: NavItem[] = [
  { label: '快速开始', href: '/quickstart' },
  { label: '核心概念', href: '/concepts' },
  { label: '集成', href: '/integrations' },
  { label: '应用场景', href: '/use-cases' },
  { label: '生产部署', href: '/deployment' },
  { label: '资源', href: '/resources' },
];

export const benchmarks = [
  { name: 'Hindsight', score: 94.6, highlight: true },
  { name: 'SuperMemory', score: 85.92, highlight: false },
  { name: 'Zep', score: 71.2, highlight: false },
  { name: 'GPT-4o', score: 60.2, highlight: false },
] as const;

export const memoryTypes: MemoryType[] = [
  {
    key: 'facts',
    name: '世界事实',
    en: 'World facts',
    summary: '关于外部世界的事实性知识，不依赖智能体自身的经历。',
    example: '“炉子开着的时候会变烫。”',
    colorVar: 'var(--color-cat-1)',
  },
  {
    key: 'experiences',
    name: '经历',
    en: 'Experiences',
    summary: '智能体自身的第一手体验，带有主体视角与时间戳。',
    example: '“我摸了炉子，真的很疼。”',
    colorVar: 'var(--color-cat-2)',
  },
  {
    key: 'observations',
    name: '观察',
    en: 'Observations',
    summary: '由大量记忆凝练出的、有证据支撑的信念，会被精炼而非覆盖。',
    example: '“这个厨房里的操作台总是很烫。”',
    colorVar: 'var(--color-cat-3)',
  },
  {
    key: 'mental-models',
    name: '心智模型',
    en: 'Mental models',
    summary: '从观察与事实中综合出的、对所处世界的习得性理解。',
    example: '“张伟习惯先验证再动手。”',
    colorVar: 'var(--color-cat-4)',
  },
];

export const operations: Operation[] = [
  {
    key: 'retain',
    name: 'Retain',
    verb: '保留',
    title: '把新记忆推入 Hindsight',
    summary:
      'retain 借助 LLM 抽取关键事实、时间数据、实体与关系，再经归一化流程转换为规范化实体、时间序列、搜索索引与元数据。这些表征构成了 recall 与 reflect 精准检索记忆的通路。',
    colorVar: 'var(--color-cat-2)',
    examples: ['career update', '2025-06-15T10:00:00Z'],
  },
  {
    key: 'recall',
    name: 'Recall',
    verb: '召回',
    title: '检索任意类型的记忆',
    summary:
      'recall 并行执行四路检索，结果先以倒数排名融合按相关性排序，再用交叉编码器重排，最后按需裁剪以适配 token 上限。',
    colorVar: 'var(--color-cat-1)',
    strategies: [
      { name: '语义', detail: '向量相似度' },
      { name: '关键词', detail: 'BM25 精确匹配' },
      { name: '图谱', detail: '实体 / 时间 / 因果关联' },
      { name: '时间', detail: '时间范围过滤' },
    ],
  },
  {
    key: 'reflect',
    name: 'Reflect',
    verb: '反思',
    title: '在记忆之上生成新的洞见',
    summary:
      'reflect 让智能体在记忆之间建立新联系，并对自身世界形成更透彻的理解，适合需要深度思考而非简单查表的问题。',
    colorVar: 'var(--color-cat-4)',
    examples: ['AI 项目经理', '销售智能体', '支持智能体'],
  },
];

export const integrationCategories: IntegrationCategory[] = [
  {
    name: '编程智能体',
    icon: 'tabler:code-dots',
    items: [
      { name: 'Claude Code', href: 'https://hindsight.vectorize.io/sdks/integrations/claude-code' },
      { name: 'Codex', href: 'https://hindsight.vectorize.io/sdks/integrations/codex' },
      { name: 'Cursor', href: 'https://hindsight.vectorize.io/sdks/integrations/cursor' },
      { name: 'GitHub Copilot', href: 'https://hindsight.vectorize.io/sdks/integrations/github-copilot' },
      { name: 'opencode', href: 'https://hindsight.vectorize.io/sdks/integrations/opencode' },
      { name: 'Cline', href: 'https://hindsight.vectorize.io/sdks/integrations/cline' },
      { name: 'Aider', href: 'https://hindsight.vectorize.io/sdks/integrations/aider' },
      { name: 'Zed', href: 'https://hindsight.vectorize.io/sdks/integrations/zed' },
      { name: 'Continue', href: 'https://hindsight.vectorize.io/sdks/integrations/continue' },
      { name: 'Roo Code', href: 'https://hindsight.vectorize.io/sdks/integrations/roo-code' },
      { name: 'OpenHands', href: 'https://hindsight.vectorize.io/sdks/integrations/openhands' },
    ],
  },
  {
    name: '智能体框架',
    icon: 'tabler:assembly',
    items: [
      { name: 'LangGraph / LangChain', href: 'https://hindsight.vectorize.io/sdks/integrations/langgraph' },
      { name: 'LlamaIndex', href: 'https://hindsight.vectorize.io/sdks/integrations/llamaindex' },
      { name: 'CrewAI', href: 'https://hindsight.vectorize.io/sdks/integrations/crewai' },
      { name: 'Pydantic AI', href: 'https://hindsight.vectorize.io/sdks/integrations/pydantic-ai' },
      { name: 'OpenAI Agents SDK', href: 'https://hindsight.vectorize.io/sdks/integrations/openai-agents' },
      { name: 'Google ADK', href: 'https://hindsight.vectorize.io/sdks/integrations/google-adk' },
      { name: 'Agno', href: 'https://hindsight.vectorize.io/sdks/integrations/agno' },
      { name: 'Strands', href: 'https://hindsight.vectorize.io/sdks/integrations/strands' },
      { name: 'AutoGen', href: 'https://hindsight.vectorize.io/sdks/integrations/autogen' },
      { name: 'Microsoft Agent Framework', href: 'https://hindsight.vectorize.io/sdks/integrations/agent-framework' },
      { name: 'Vercel AI SDK', href: 'https://hindsight.vectorize.io/sdks/integrations/ai-sdk' },
      { name: 'Haystack', href: 'https://hindsight.vectorize.io/sdks/integrations/haystack' },
    ],
  },
  {
    name: '无代码 / 低代码',
    icon: 'tabler:plug-connected',
    items: [
      { name: 'n8n', href: 'https://hindsight.vectorize.io/sdks/integrations/n8n' },
      { name: 'Zapier', href: 'https://hindsight.vectorize.io/sdks/integrations/zapier' },
      { name: 'Dify', href: 'https://hindsight.vectorize.io/sdks/integrations/dify' },
      { name: 'Flowise', href: 'https://hindsight.vectorize.io/sdks/integrations/flowise' },
    ],
  },
  {
    name: '应用与工具',
    icon: 'tabler:apps',
    items: [
      { name: 'ChatGPT', href: 'https://hindsight.vectorize.io/sdks/integrations/chatgpt' },
      { name: 'Perplexity', href: 'https://hindsight.vectorize.io/sdks/integrations/perplexity' },
      { name: 'Obsidian', href: 'https://hindsight.vectorize.io/sdks/integrations/obsidian' },
      { name: 'Pipecat', href: 'https://hindsight.vectorize.io/sdks/integrations/pipecat' },
      { name: 'Vapi', href: 'https://hindsight.vectorize.io/sdks/integrations/vapi' },
    ],
  },
];

export const deploymentItems: DeploymentItem[] = [
  {
    name: '存储',
    detail: 'PostgreSQL + pgvector，或功能完全对齐的 Oracle AI Database 23ai',
    href: 'https://hindsight.vectorize.io/developer/storage',
    icon: 'tabler:database-cog',
  },
  {
    name: '配置',
    detail: '层级式配置：全局环境变量 → 每租户 → 每 bank',
    href: 'https://hindsight.vectorize.io/developer/configuration',
    icon: 'tabler:settings-automation',
  },
  {
    name: '监控',
    detail: '面向 LLM 调用、token 与延迟的 Prometheus 指标与仪表盘',
    href: 'https://hindsight.vectorize.io/developer/monitoring',
    icon: 'tabler:chart-histogram',
  },
  {
    name: '运维',
    detail: '用于迁移、bank 修复与卡住操作的管理 CLI',
    href: 'https://hindsight.vectorize.io/developer/admin-cli',
    icon: 'tabler:tool',
  },
  {
    name: '事件',
    detail: '面向 retain、整合与刷新生命周期事件的 Webhook',
    href: 'https://hindsight.vectorize.io/developer/api/webhooks',
    icon: 'tabler:bolt',
  },
  {
    name: '可扩展性',
    detail: '租户、鉴权与存储的扩展点',
    href: 'https://hindsight.vectorize.io/developer/extensions',
    icon: 'tabler:plug',
  },
  {
    name: '托管',
    detail: 'Hindsight Cloud：托管、按量计费、99.9% 可用性 SLA',
    href: 'https://vectorize.io/pricing',
    icon: 'tabler:cloud-check',
  },
];

export const platforms = [
  { os: 'Linux', arch: 'x86_64 / ARM64', docker: true, pip: true, pg0: true },
  { os: 'macOS', arch: 'Apple Silicon / arm64', docker: true, pip: true, pg0: true },
  { os: 'macOS', arch: 'Intel / x86_64', docker: true, pip: 'warn', pg0: true },
  { os: 'Windows', arch: 'x86_64', docker: true, pip: true, pg0: true },
] as const;

export const resourceLinks = [
  {
    group: '文档',
    items: [
      { name: '官方文档', href: 'https://hindsight.vectorize.io' },
      { name: 'FAQ', href: 'https://hindsight.vectorize.io/faq' },
      { name: '最佳实践', href: 'https://hindsight.vectorize.io/best-practices' },
      { name: '示例库', href: 'https://hindsight.vectorize.io/cookbook' },
      { name: '博客', href: 'https://hindsight.vectorize.io/blog' },
      { name: 'RAG 与记忆对比', href: 'https://hindsight.vectorize.io/developer/rag-vs-hindsight' },
    ],
  },
  {
    group: '客户端',
    items: [
      { name: 'Python', href: 'https://hindsight.vectorize.io/sdks/python' },
      { name: 'Node.js', href: 'https://hindsight.vectorize.io/sdks/nodejs' },
      { name: 'Go', href: 'https://hindsight.vectorize.io/sdks/go' },
      { name: 'CLI', href: 'https://hindsight.vectorize.io/sdks/cli' },
      { name: 'REST API', href: 'https://hindsight.vectorize.io/api-reference' },
    ],
  },
  {
    group: '研究与社区',
    items: [
      { name: '基准测试看板', href: 'https://benchmarks.hindsight.vectorize.io/' },
      { name: '论文', href: 'https://arxiv.org/abs/2512.12818' },
      { name: 'Slack 社区', href: 'https://vectorize.io/slack' },
      { name: 'GitHub Issues', href: 'https://github.com/vectorize-io/hindsight/issues' },
      { name: 'Star 历史', href: 'https://www.star-history.com/vectorize-io/hindsight' },
    ],
  },
] as const;
