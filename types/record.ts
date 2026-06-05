export type ArchiveEvent = {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
  evidence_ids: string[];
  confidence: string;
};

export type Evidence = {
  id: string;
  title: string;
  url: string;
  archived_url?: string;
  source_type: string;
  accessed_at: string;
  supports: string[];
  reliability: string;
};

export type ArchiveRecord = {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  entity_type: string;
  category: string[];
  operator: string;
  country: string | null;
  status: string;
  current_state: string;
  launched_at: string | null;
  ended_at: string | null;
  last_known_url: string | null;
  current_url_status: string;
  summary: string;
  confidence: string;
  related_records: string[];
  last_reviewed_at: string;
  events: ArchiveEvent[];
  evidence: Evidence[];
};
