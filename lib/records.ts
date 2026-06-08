import { records as records01 } from '@/data/records';
import { records02 } from '@/data/records-02';

const records = [...records01, ...records02];

export function getAllRecords() {
  return records;
}

export function getRecordBySlug(slug: string) {
  return records.find((record) => record.slug === slug);
}

export function getRecordStats() {
  const totalRecords = records.length;
  const totalEvents = records.reduce((sum, record) => sum + record.events.length, 0);
  const totalEvidence = records.reduce((sum, record) => sum + record.evidence.length, 0);

  return {
    totalRecords,
    totalEvents,
    totalEvidence
  };
}
