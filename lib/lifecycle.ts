import type { Record } from '@/data/schema';

export type LifecycleProjection = {
  launchYear: string | null;
  endYear: string | null;
  eventTypes: string[];
  replacementGuidanceRecorded: boolean;
  dataExportDeadlineRecorded: boolean;
  highReliabilityEvidence: boolean;
  archivedEvidenceAvailable: boolean;
};

function recordedYear(value?: string) {
  if (!value) return null;
  const match = value.match(/^(\d{4})/);
  return match?.[1] ?? null;
}

export function getLifecycleProjection(record: Record): LifecycleProjection {
  return {
    launchYear: recordedYear(record.launched_at),
    endYear: recordedYear(record.ended_at),
    eventTypes: Array.from(new Set(record.events.map((event) => event.type))).sort(),
    replacementGuidanceRecorded: record.evidence.some((item) => item.supports.includes('replacement_guidance')),
    dataExportDeadlineRecorded: record.events.some((event) => event.type === 'data_export_deadline'),
    highReliabilityEvidence: record.evidence.some((item) => item.reliability === 'high'),
    archivedEvidenceAvailable: record.evidence.some((item) => Boolean(item.archived_url))
  };
}
