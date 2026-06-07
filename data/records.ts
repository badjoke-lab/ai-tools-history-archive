import type { Record } from './schema';

export const records: Record[] = [
  {
    id: 'atha_000001',
    slug: 'bard',
    name: 'Bard',
    aliases: ['Google Bard'],
    entity_type: 'product',
    category: ['chat_assistant'],
    operator: 'Google',
    country: 'United States',
    status: 'rebranded',
    current_state: 'The Bard brand was rebranded into Gemini as part of Google’s broader Gemini product family.',
    launched_at: '2023',
    ended_at: '2024-02-08',
    last_known_url: 'https://bard.google.com/',
    current_url_status: 'redirected',
    summary: 'Bard was Google’s AI chatbot product name before Google announced that Bard would become Gemini in February 2024.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000001',
        record_id: 'atha_000001',
        date: '2024-02-08',
        type: 'rebrand',
        title: 'Bard became Gemini',
        description: 'Google announced that Bard would become Gemini and introduced Gemini as the main product family name.',
        evidence_ids: ['atha_evidence_000001'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000001',
        record_id: 'atha_000001',
        event_id: 'atha_event_000001',
        title: 'Bard becomes Gemini: Try Ultra 1.0 and a new mobile app today',
        url: 'https://blog.google/products/gemini/bard-gemini-advanced-app/',
        source_type: 'official_blog',
        publisher: 'Google',
        published_at: '2024-02-08',
        accessed_at: '2026-06-05',
        supports: ['rebrand', 'current_state', 'operator_statement'],
        reliability: 'high'
      }
    ],
    related_records: [],
    last_reviewed_at: '2026-06-05'
  },
  {
    id: 'atha_000002',
    slug: 'openai-ai-text-classifier',
    name: 'OpenAI AI Text Classifier',
    aliases: ['AI Text Classifier'],
    entity_type: 'service',
    category: ['education', 'research'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'shutdown',
    current_state: 'The classifier is no longer available, according to OpenAI’s update note.',
    launched_at: '2023-01-31',
    ended_at: '2023-07-20',
    last_known_url: 'https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/',
    current_url_status: 'live_verified',
    summary: 'OpenAI released a classifier intended to indicate AI-written text, then later made it unavailable due to its low rate of accuracy.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000002',
        record_id: 'atha_000002',
        date: '2023-07-20',
        type: 'shutdown',
        title: 'AI Text Classifier became unavailable',
        description: 'OpenAI updated the classifier announcement to state that the AI Text Classifier was no longer available due to its low rate of accuracy.',
        evidence_ids: ['atha_evidence_000002'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000002',
        record_id: 'atha_000002',
        event_id: 'atha_event_000002',
        title: 'New AI classifier for indicating AI-written text',
        url: 'https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/',
        source_type: 'official_announcement',
        publisher: 'OpenAI',
        published_at: '2023-01-31',
        accessed_at: '2026-06-05',
        supports: ['shutdown', 'current_state', 'reason_note'],
        reliability: 'high'
      }
    ],
    related_records: [],
    last_reviewed_at: '2026-06-05'
  },
  {
    id: 'atha_000003',
    slug: 'copilot-gpt-builder',
    name: 'Copilot GPT Builder',
    aliases: ['Microsoft Copilot GPT Builder', 'GPT Builder in Copilot Pro'],
    entity_type: 'feature',
    category: ['chat_assistant', 'agent_automation'],
    operator: 'Microsoft',
    country: 'United States',
    status: 'feature_removed',
    current_state: 'The Copilot GPT Builder feature has been retired and associated GPTs/GPT data were deleted according to Microsoft support documentation.',
    launched_at: '2024',
    ended_at: '2024-07-14',
    last_known_url: 'https://support.microsoft.com/en-us/microsoft-copilot/gpt-builder-has-been-retired',
    current_url_status: 'live_verified',
    summary: 'Copilot GPT Builder was a Copilot Pro feature for creating GPTs. Microsoft support documentation states that the feature has been retired.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000003',
        record_id: 'atha_000003',
        date: '2024-07-14',
        type: 'feature_removed',
        title: 'Copilot GPT Builder retired',
        description: 'Microsoft retired GPT Builder in Copilot Pro and removed associated GPTs and GPT data.',
        evidence_ids: ['atha_evidence_000003'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000003',
        record_id: 'atha_000003',
        event_id: 'atha_event_000003',
        title: 'GPT Builder has been retired',
        url: 'https://support.microsoft.com/en-us/microsoft-copilot/gpt-builder-has-been-retired',
        source_type: 'official_support',
        publisher: 'Microsoft Support',
        accessed_at: '2026-06-05',
        supports: ['feature_removed', 'current_state', 'data_deletion_note'],
        reliability: 'high'
      }
    ],
    related_records: [],
    last_reviewed_at: '2026-06-05'
  },
  {
    id: 'atha_000004',
    slug: 'openai-gpt-3-base-models',
    name: 'OpenAI GPT-3 base models',
    aliases: ['ada', 'babbage', 'curie', 'davinci', 'text-davinci-003'],
    entity_type: 'model',
    category: ['api_model_infra'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'Legacy GPT-3 base and related completion models were retired according to OpenAI’s API deprecations documentation.',
    launched_at: '2020',
    ended_at: '2024-01-04',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'OpenAI’s deprecations documentation records the retirement of older GPT-3 base and related completion models, including text-davinci-003, as part of the API lifecycle.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000004',
        record_id: 'atha_000004',
        date: '2024-01-04',
        type: 'model_retired',
        title: 'Legacy GPT-3 models retired',
        description: 'OpenAI’s deprecation documentation lists older GPT-3 base and completion models as retired with replacement guidance.',
        evidence_ids: ['atha_evidence_000004'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000004',
        record_id: 'atha_000004',
        event_id: 'atha_event_000004',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-05',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: [],
    last_reviewed_at: '2026-06-05'
  },
  {
    id: 'atha_000005',
    slug: 'openai-assistants-api',
    name: 'OpenAI Assistants API',
    aliases: ['Assistants API'],
    entity_type: 'api',
    category: ['api_model_infra', 'agent_automation'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'deprecated',
    current_state: 'OpenAI indicates that the Assistants API will be sunset after the Responses API reaches full feature parity, with a target sunset in the first half of 2026.',
    launched_at: '2023',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'The Assistants API is tracked as an API lifecycle record because OpenAI has announced a planned sunset path toward the newer Responses API.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000005',
        record_id: 'atha_000005',
        date: '2025-03-11',
        type: 'api_deprecated',
        title: 'Assistants API sunset path announced',
        description: 'OpenAI documented a sunset path for the Assistants API after feature parity with the Responses API, with a target sunset in the first half of 2026.',
        evidence_ids: ['atha_evidence_000005'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000005',
        record_id: 'atha_000005',
        event_id: 'atha_event_000005',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-05',
        supports: ['api_deprecated', 'sunset_path', 'current_state'],
        reliability: 'high'
      }
    ],
    related_records: [],
    last_reviewed_at: '2026-06-05',
    known_unknowns: ['Exact retirement timing depends on OpenAI’s final sunset announcement.']
  },
  {
    id: 'atha_000006',
    slug: 'anthropic-claude-1-and-instant-models',
    name: 'Anthropic Claude 1 and Instant models',
    aliases: ['Claude 1', 'Claude Instant', 'claude-instant-1.2'],
    entity_type: 'model',
    category: ['api_model_infra', 'chat_assistant'],
    operator: 'Anthropic',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'Claude 1 and Claude Instant models were retired on Anthropic-operated platforms according to Anthropic’s model deprecations documentation.',
    launched_at: '2023',
    ended_at: '2024-11-06',
    last_known_url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations',
    current_url_status: 'live_verified',
    summary: 'Anthropic lists Claude 1 and Claude Instant model variants as retired, with recommended replacement guidance in its model deprecations documentation.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000006',
        record_id: 'atha_000006',
        date: '2024-11-06',
        type: 'model_retired',
        title: 'Claude 1 and Instant models retired',
        description: 'Anthropic’s deprecation history states that Claude 1 and Instant models were retired on November 6, 2024.',
        evidence_ids: ['atha_evidence_000006'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000006',
        record_id: 'atha_000006',
        event_id: 'atha_event_000006',
        title: 'Anthropic model deprecations',
        url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations',
        source_type: 'official_docs',
        publisher: 'Anthropic',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: [],
    last_reviewed_at: '2026-06-08'
  },
  {
    id: 'atha_000007',
    slug: 'anthropic-claude-2-and-sonnet-3-models',
    name: 'Anthropic Claude 2 and Sonnet 3 models',
    aliases: ['Claude 2', 'Claude 2.1', 'Claude Sonnet 3'],
    entity_type: 'model',
    category: ['api_model_infra', 'chat_assistant'],
    operator: 'Anthropic',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'Claude 2, Claude 2.1, and Claude Sonnet 3 models were retired on Anthropic-operated platforms according to Anthropic’s model deprecations documentation.',
    launched_at: '2023',
    ended_at: '2025-07-21',
    last_known_url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations',
    current_url_status: 'live_verified',
    summary: 'Anthropic’s model lifecycle documentation records the retirement of Claude 2, Claude 2.1, and Claude Sonnet 3 models with replacement guidance.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000007',
        record_id: 'atha_000007',
        date: '2025-07-21',
        type: 'model_retired',
        title: 'Claude 2 and Sonnet 3 models retired',
        description: 'Anthropic’s deprecation history states that Claude 2, Claude 2.1, and Claude Sonnet 3 models were retired on July 21, 2025.',
        evidence_ids: ['atha_evidence_000007'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000007',
        record_id: 'atha_000007',
        event_id: 'atha_event_000007',
        title: 'Anthropic model deprecations',
        url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations',
        source_type: 'official_docs',
        publisher: 'Anthropic',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['anthropic-claude-1-and-instant-models'],
    last_reviewed_at: '2026-06-08'
  },
  {
    id: 'atha_000008',
    slug: 'google-gemini-2-0-flash-models',
    name: 'Google Gemini 2.0 Flash models',
    aliases: ['gemini-2.0-flash', 'gemini-2.0-flash-001', 'gemini-2.0-flash-lite'],
    entity_type: 'model',
    category: ['api_model_infra'],
    operator: 'Google',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'Google’s Gemini API deprecations page lists Gemini 2.0 Flash model shutdown dates and recommended replacements.',
    launched_at: '2025-02-05',
    ended_at: '2026-06-01',
    last_known_url: 'https://ai.google.dev/gemini-api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'Gemini 2.0 Flash and related Gemini 2.0 Flash Lite model entries are tracked as API model lifecycle records because Google lists shutdown dates and replacements for them.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000008',
        record_id: 'atha_000008',
        date: '2026-06-01',
        type: 'model_retired',
        title: 'Gemini 2.0 Flash model shutdown date reached',
        description: 'Google’s Gemini API deprecations page lists June 1, 2026 shutdown dates for Gemini 2.0 Flash and related Gemini 2.0 Flash Lite models.',
        evidence_ids: ['atha_evidence_000008'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000008',
        record_id: 'atha_000008',
        event_id: 'atha_event_000008',
        title: 'Gemini deprecations',
        url: 'https://ai.google.dev/gemini-api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'Google AI for Developers',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: [],
    last_reviewed_at: '2026-06-08'
  },
  {
    id: 'atha_000009',
    slug: 'google-text-embedding-004',
    name: 'Google text-embedding-004',
    aliases: ['text-embedding-004'],
    entity_type: 'model',
    category: ['api_model_infra'],
    operator: 'Google',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'Google’s Gemini API deprecations page lists text-embedding-004 with a January 14, 2026 shutdown date and a recommended replacement.',
    launched_at: '2024-04-09',
    ended_at: '2026-01-14',
    last_known_url: 'https://ai.google.dev/gemini-api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'text-embedding-004 is tracked as a model lifecycle record because Google lists its shutdown date and replacement in the Gemini API deprecations table.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000009',
        record_id: 'atha_000009',
        date: '2026-01-14',
        type: 'model_retired',
        title: 'text-embedding-004 shutdown date reached',
        description: 'Google’s Gemini API deprecations page lists January 14, 2026 as the shutdown date for text-embedding-004.',
        evidence_ids: ['atha_evidence_000009'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000009',
        record_id: 'atha_000009',
        event_id: 'atha_event_000009',
        title: 'Gemini deprecations',
        url: 'https://ai.google.dev/gemini-api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'Google AI for Developers',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['google-gemini-2-0-flash-models'],
    last_reviewed_at: '2026-06-08'
  },
  {
    id: 'atha_000010',
    slug: 'google-imagen-3-generate-002',
    name: 'Google Imagen 3.0 generate 002',
    aliases: ['imagen-3.0-generate-002', 'Imagen 3'],
    entity_type: 'model',
    category: ['api_model_infra', 'image_generation'],
    operator: 'Google',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'Google’s Gemini API deprecations page lists imagen-3.0-generate-002 with a November 10, 2025 shutdown date and a recommended replacement.',
    launched_at: '2025-02-06',
    ended_at: '2025-11-10',
    last_known_url: 'https://ai.google.dev/gemini-api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'imagen-3.0-generate-002 is tracked as an image-generation model lifecycle record because Google lists its shutdown date and replacement in the Gemini API deprecations table.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000010',
        record_id: 'atha_000010',
        date: '2025-11-10',
        type: 'model_retired',
        title: 'imagen-3.0-generate-002 shutdown date reached',
        description: 'Google’s Gemini API deprecations page lists November 10, 2025 as the shutdown date for imagen-3.0-generate-002.',
        evidence_ids: ['atha_evidence_000010'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000010',
        record_id: 'atha_000010',
        event_id: 'atha_event_000010',
        title: 'Gemini deprecations',
        url: 'https://ai.google.dev/gemini-api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'Google AI for Developers',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['google-text-embedding-004'],
    last_reviewed_at: '2026-06-08'
  }
];
