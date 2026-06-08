import type { Record } from './schema';

export const records02: Record[] = [
  {
    id: 'atha_000011',
    slug: 'openai-reusable-prompts-api',
    name: 'OpenAI reusable prompts API',
    aliases: ['v1/prompts', 'reusable prompt objects'],
    entity_type: 'api',
    category: ['api_model_infra', 'agent_automation'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'deprecated',
    current_state: 'OpenAI announced that reusable prompt objects and the v1/prompts API are deprecated, with shutdown scheduled for November 30, 2026.',
    launched_at: '2025',
    ended_at: '2026-11-30',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'Reusable prompts are tracked as a developer-facing API lifecycle record because OpenAI lists a deprecation announcement and scheduled shutdown date for prompt objects and v1/prompts.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000011',
        record_id: 'atha_000011',
        date: '2026-06-03',
        type: 'api_deprecated',
        title: 'Reusable prompts API deprecation announced',
        description: 'OpenAI announced deprecation of reusable prompt objects and scheduled the v1/prompts API shutdown for November 30, 2026.',
        evidence_ids: ['atha_evidence_000011'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000011',
        record_id: 'atha_000011',
        event_id: 'atha_event_000011',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['api_deprecated', 'shutdown_notice', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['openai-assistants-api'],
    last_reviewed_at: '2026-06-08',
    known_unknowns: ['Removal is scheduled for a future date and should be rechecked near the deadline.']
  },
  {
    id: 'atha_000012',
    slug: 'openai-evals-platform',
    name: 'OpenAI Evals platform',
    aliases: ['OpenAI Evals', 'Evals dashboard', 'Evals API'],
    entity_type: 'service',
    category: ['api_model_infra', 'research'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'deprecated',
    current_state: 'OpenAI announced the Evals platform deprecation, with existing evals becoming read-only on October 31, 2026 and the dashboard/API scheduled to shut down on November 30, 2026.',
    launched_at: '2023',
    ended_at: '2026-11-30',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'The Evals platform is tracked as a developer tooling lifecycle record because OpenAI lists deprecation, read-only, and shutdown dates for the service.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000012',
        record_id: 'atha_000012',
        date: '2026-06-03',
        type: 'shutdown_notice',
        title: 'Evals platform deprecation announced',
        description: 'OpenAI announced the Evals platform deprecation, with existing evals becoming read-only on October 31, 2026 and shutdown scheduled for November 30, 2026.',
        evidence_ids: ['atha_evidence_000012'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000012',
        record_id: 'atha_000012',
        event_id: 'atha_event_000012',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['shutdown_notice', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['openai-reusable-prompts-api'],
    last_reviewed_at: '2026-06-08',
    known_unknowns: ['Final shutdown status should be rechecked after November 30, 2026.']
  },
  {
    id: 'atha_000013',
    slug: 'openai-agent-builder',
    name: 'OpenAI Agent Builder',
    aliases: ['Agent Builder'],
    entity_type: 'feature',
    category: ['agent_automation', 'api_model_infra'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'deprecated',
    current_state: 'OpenAI announced Agent Builder deprecation, while noting that ChatKit remains available and Agent Builder is scheduled to shut down on November 30, 2026.',
    launched_at: '2025',
    ended_at: '2026-11-30',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'Agent Builder is tracked as an agent tooling lifecycle record because OpenAI lists its deprecation and scheduled shutdown with migration guidance.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000013',
        record_id: 'atha_000013',
        date: '2026-06-03',
        type: 'shutdown_notice',
        title: 'Agent Builder deprecation announced',
        description: 'OpenAI announced Agent Builder deprecation and scheduled shutdown for November 30, 2026, with migration guidance to the Agents SDK or ChatGPT Workspace Agents.',
        evidence_ids: ['atha_evidence_000013'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000013',
        record_id: 'atha_000013',
        event_id: 'atha_event_000013',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['shutdown_notice', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['openai-assistants-api'],
    last_reviewed_at: '2026-06-08',
    known_unknowns: ['Final shutdown status should be rechecked after November 30, 2026.']
  },
  {
    id: 'atha_000014',
    slug: 'openai-older-gpt-image-models',
    name: 'OpenAI older GPT Image models',
    aliases: ['gpt-image-1-mini', 'gpt-image-1.5', 'chatgpt-image-latest'],
    entity_type: 'model',
    category: ['api_model_infra', 'image_generation'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'deprecated',
    current_state: 'OpenAI announced deprecation and scheduled removal for older GPT Image models, with gpt-image-2 listed as the recommended replacement.',
    launched_at: '2025',
    ended_at: '2026-12-01',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'Older GPT Image models are tracked as image-generation model lifecycle records because OpenAI lists their deprecation, removal date, and replacement guidance.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000014',
        record_id: 'atha_000014',
        date: '2026-06-02',
        type: 'model_deprecated',
        title: 'Older GPT Image model deprecations announced',
        description: 'OpenAI announced deprecation and scheduled December 1, 2026 removal for gpt-image-1-mini, gpt-image-1.5, and chatgpt-image-latest.',
        evidence_ids: ['atha_evidence_000014'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000014',
        record_id: 'atha_000014',
        event_id: 'atha_event_000014',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['model_deprecated', 'shutdown_notice', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['google-imagen-3-generate-002'],
    last_reviewed_at: '2026-06-08',
    known_unknowns: ['Final removal should be rechecked after December 1, 2026.']
  },
  {
    id: 'atha_000015',
    slug: 'openai-sora-2-videos-api',
    name: 'OpenAI Sora 2 video generation models and Videos API',
    aliases: ['Videos API', 'sora-2', 'sora-2-pro'],
    entity_type: 'api',
    category: ['api_model_infra', 'video_generation'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'deprecated',
    current_state: 'OpenAI announced deprecation and scheduled September 24, 2026 removal for the Videos API and Sora 2 video generation model aliases and snapshots.',
    launched_at: '2025',
    ended_at: '2026-09-24',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'Sora 2 and the Videos API are tracked as video-generation lifecycle records because OpenAI lists a deprecation notice and scheduled removal date for the API and related model aliases.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000015',
        record_id: 'atha_000015',
        date: '2026-03-24',
        type: 'api_deprecated',
        title: 'Sora 2 and Videos API deprecation announced',
        description: 'OpenAI announced deprecation and scheduled removal from the API on September 24, 2026 for the Videos API and Sora 2 video generation models.',
        evidence_ids: ['atha_evidence_000015'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000015',
        record_id: 'atha_000015',
        event_id: 'atha_event_000015',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['api_deprecated', 'model_deprecated', 'shutdown_notice'],
        reliability: 'high'
      }
    ],
    related_records: [],
    last_reviewed_at: '2026-06-08',
    known_unknowns: ['Replacement guidance is not clearly listed in the deprecations table.']
  },
  {
    id: 'atha_000016',
    slug: 'openai-dalle-model-snapshots',
    name: 'OpenAI DALL·E model snapshots',
    aliases: ['dall-e-2', 'dall-e-3'],
    entity_type: 'model',
    category: ['image_generation', 'api_model_infra'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'OpenAI listed DALL·E model snapshots as deprecated and removed from the API on May 12, 2026, with GPT Image models listed as replacements.',
    launched_at: '2022',
    ended_at: '2026-05-12',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'DALL·E model snapshots are tracked as image-generation model lifecycle records because OpenAI lists their deprecation, removal date, and replacement models.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000016',
        record_id: 'atha_000016',
        date: '2026-05-12',
        type: 'model_retired',
        title: 'DALL·E model snapshots removed from the API',
        description: 'OpenAI listed dall-e-2 and dall-e-3 as removed from the API on May 12, 2026 with GPT Image replacement guidance.',
        evidence_ids: ['atha_evidence_000016'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000016',
        record_id: 'atha_000016',
        event_id: 'atha_event_000016',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['openai-older-gpt-image-models'],
    last_reviewed_at: '2026-06-08'
  },
  {
    id: 'atha_000017',
    slug: 'openai-realtime-api-beta',
    name: 'OpenAI Realtime API Beta',
    aliases: ['OpenAI-Beta: realtime=v1', 'Realtime beta API'],
    entity_type: 'api',
    category: ['api_model_infra', 'voice_tts'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'api_discontinued',
    current_state: 'OpenAI states that the Realtime API Beta was deprecated and removed from the API on May 12, 2026, with migration guidance to the current GA interface.',
    launched_at: '2024',
    ended_at: '2026-05-12',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'The Realtime API Beta is tracked as an API lifecycle record because OpenAI lists a completed removal date and points developers to the current GA interface and migration guide.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000017',
        record_id: 'atha_000017',
        date: '2026-05-12',
        type: 'api_shutdown',
        title: 'Realtime API Beta removed',
        description: 'OpenAI states that the Realtime API Beta was deprecated and removed from the API on May 12, 2026.',
        evidence_ids: ['atha_evidence_000017'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000017',
        record_id: 'atha_000017',
        event_id: 'atha_event_000017',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['api_shutdown', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['openai-sora-2-videos-api'],
    last_reviewed_at: '2026-06-08'
  },
  {
    id: 'atha_000018',
    slug: 'openai-gpt-4o-realtime-preview-models',
    name: 'OpenAI GPT-4o realtime preview models',
    aliases: ['gpt-4o-realtime-preview', 'gpt-4o-mini-realtime-preview', 'gpt-4o-audio-preview'],
    entity_type: 'model',
    category: ['api_model_infra', 'voice_tts'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'OpenAI listed GPT-4o realtime and audio preview models as deprecated and removed from the API on May 7, 2026, with realtime/audio replacements.',
    launched_at: '2024',
    ended_at: '2026-05-07',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'GPT-4o realtime preview models are tracked as audio/realtime model lifecycle records because OpenAI lists their deprecation, removal date, and replacement models.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000018',
        record_id: 'atha_000018',
        date: '2026-05-07',
        type: 'model_retired',
        title: 'GPT-4o realtime preview models removed from the API',
        description: 'OpenAI listed gpt-4o realtime/audio preview models as removed from the API on May 7, 2026 with replacement guidance.',
        evidence_ids: ['atha_evidence_000018'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000018',
        record_id: 'atha_000018',
        event_id: 'atha_event_000018',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['openai-realtime-api-beta'],
    last_reviewed_at: '2026-06-08'
  },
  {
    id: 'atha_000019',
    slug: 'openai-chatgpt-4o-latest-snapshot',
    name: 'OpenAI chatgpt-4o-latest snapshot',
    aliases: ['chatgpt-4o-latest'],
    entity_type: 'model',
    category: ['api_model_infra', 'chat_assistant'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'OpenAI listed chatgpt-4o-latest as deprecated and removed from the API on February 17, 2026, with gpt-5.1-chat-latest listed as the replacement.',
    launched_at: '2024',
    ended_at: '2026-02-17',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'chatgpt-4o-latest is tracked as a model snapshot lifecycle record because OpenAI lists its deprecation, removal date, and replacement snapshot.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000019',
        record_id: 'atha_000019',
        date: '2026-02-17',
        type: 'model_retired',
        title: 'chatgpt-4o-latest removed from the API',
        description: 'OpenAI listed chatgpt-4o-latest as removed from the API on February 17, 2026 with gpt-5.1-chat-latest as the recommended replacement.',
        evidence_ids: ['atha_evidence_000019'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000019',
        record_id: 'atha_000019',
        event_id: 'atha_event_000019',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance'],
        reliability: 'high'
      }
    ],
    related_records: ['openai-gpt-4o-realtime-preview-models'],
    last_reviewed_at: '2026-06-08'
  },
  {
    id: 'atha_000020',
    slug: 'openai-codex-mini-latest-model',
    name: 'OpenAI codex-mini-latest model',
    aliases: ['codex-mini-latest'],
    entity_type: 'model',
    category: ['coding_developer', 'api_model_infra'],
    operator: 'OpenAI',
    country: 'United States',
    status: 'model_discontinued',
    current_state: 'OpenAI listed codex-mini-latest as deprecated and removed from the API on February 12, 2026, and noted that the legacy local shell tool was no longer supported as part of the deprecation.',
    launched_at: '2025',
    ended_at: '2026-02-12',
    last_known_url: 'https://developers.openai.com/api/docs/deprecations',
    current_url_status: 'live_verified',
    summary: 'codex-mini-latest is tracked as a coding model lifecycle record because OpenAI lists its deprecation, removal date, replacement model, and related legacy local shell tool impact.',
    confidence: 'high',
    events: [
      {
        id: 'atha_event_000020',
        record_id: 'atha_000020',
        date: '2026-02-12',
        type: 'model_retired',
        title: 'codex-mini-latest removed from the API',
        description: 'OpenAI listed codex-mini-latest as removed from the API on February 12, 2026, with gpt-5-codex-mini as the recommended replacement.',
        evidence_ids: ['atha_evidence_000020'],
        confidence: 'high'
      }
    ],
    evidence: [
      {
        id: 'atha_evidence_000020',
        record_id: 'atha_000020',
        event_id: 'atha_event_000020',
        title: 'OpenAI API deprecations',
        url: 'https://developers.openai.com/api/docs/deprecations',
        source_type: 'official_docs',
        publisher: 'OpenAI',
        accessed_at: '2026-06-08',
        supports: ['model_retired', 'current_state', 'replacement_guidance', 'feature_removed'],
        reliability: 'high'
      }
    ],
    related_records: ['openai-chatgpt-4o-latest-snapshot'],
    last_reviewed_at: '2026-06-08'
  }
];
