import type {
  Category,
  ConfidenceLevel,
  EntityType,
  EventType,
  ReliabilityLevel,
  SourceType,
  Status
} from './enums';

export type UrlStatus =
  | 'live_verified'
  | 'live_unverified'
  | 'dead_domain'
  | 'redirected'
  | 'repurposed'
  | 'unsafe'
  | 'unknown';

export type Evidence = {
  id: string;
  record_id: string;
  event_id?: string;
  title: string;
  url: string;
  archived_url?: string;
  source_type: SourceType;
  publisher?: string;
  published_at?: string;
  accessed_at: string;
  supports: string[];
  reliability: ReliabilityLevel;
  notes?: string;
};

export type LifecycleEvent = {
  id: string;
  record_id: string;
  date: string;
  type: EventType;
  title: string;
  description: string;
  evidence_ids: string[];
  confidence: ConfidenceLevel;
};

export type Record = {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  entity_type: EntityType;
  category: Category[];
  operator: string;
  country?: string;
  status: Status;
  current_state: string;
  launched_at?: string;
  ended_at?: string;
  last_known_url?: string;
  current_url_status: UrlStatus;
  summary: string;
  confidence: ConfidenceLevel;
  events: LifecycleEvent[];
  evidence: Evidence[];
  related_records: string[];
  last_reviewed_at: string;
  known_unknowns?: string[];
};
