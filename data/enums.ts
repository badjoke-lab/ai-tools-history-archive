export const entityTypes = [
  'company',
  'service',
  'product',
  'feature',
  'model',
  'api',
  'hardware'
] as const;

export const categories = [
  'chat_assistant',
  'writing_productivity',
  'image_generation',
  'image_editing',
  'video_generation',
  'voice_tts',
  'music_audio',
  'coding_developer',
  'ai_search',
  'agent_automation',
  'design_presentation',
  'marketing_sales',
  'education',
  'research',
  'healthcare',
  'legal',
  'finance',
  'game_3d',
  'hardware_device',
  'api_model_infra',
  'other'
] as const;

export const statuses = [
  'active',
  'active_changed',
  'shutdown',
  'shutdown_announced',
  'acquired',
  'merged',
  'rebranded',
  'deprecated',
  'retired',
  'feature_removed',
  'api_discontinued',
  'model_discontinued',
  'unknown',
  'unverified'
] as const;

export const eventTypes = [
  'launch',
  'beta_launch',
  'pricing_change',
  'free_plan_removed',
  'usage_limit_changed',
  'feature_removed',
  'api_deprecated',
  'api_shutdown',
  'model_deprecated',
  'model_retired',
  'rebrand',
  'acquisition',
  'merger',
  'pivot',
  'shutdown_notice',
  'shutdown',
  'domain_offline',
  'domain_redirected',
  'terms_changed',
  'policy_changed',
  'safety_restriction_added',
  'commercial_terms_changed',
  'data_export_deadline',
  'open_source_release',
  'unknown_change'
] as const;

export const sourceTypes = [
  'official_announcement',
  'official_docs',
  'official_blog',
  'official_support',
  'official_changelog',
  'press_release',
  'regulatory_filing',
  'archived_page',
  'credible_media',
  'company_social',
  'developer_changelog',
  'github_release',
  'forum_post',
  'user_report',
  'unknown'
] as const;

export const reliabilityLevels = ['high', 'medium', 'low', 'unknown'] as const;
export const confidenceLevels = ['high', 'medium', 'low', 'needs_review'] as const;

export type EntityType = (typeof entityTypes)[number];
export type Category = (typeof categories)[number];
export type Status = (typeof statuses)[number];
export type EventType = (typeof eventTypes)[number];
export type SourceType = (typeof sourceTypes)[number];
export type ReliabilityLevel = (typeof reliabilityLevels)[number];
export type ConfidenceLevel = (typeof confidenceLevels)[number];
