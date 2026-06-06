import { records } from '@/data/records';
import { getAllEvents } from './events';

function countBy<T extends string>(values: T[]) {
  return values.reduce<Record<T, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

export function getArchiveStats() {
  const events = getAllEvents();

  return {
    totals: {
      records: records.length,
      events: events.length,
      evidence: records.reduce((sum, record) => sum + record.evidence.length, 0)
    },
    byStatus: countBy(records.map((record) => record.status)),
    byEntityType: countBy(records.map((record) => record.entity_type)),
    byCategory: countBy(records.flatMap((record) => record.category)),
    byEventType: countBy(events.map((event) => event.type)),
    byConfidence: countBy(records.map((record) => record.confidence))
  };
}

export function toStatRows(stats: Record<string, number>) {
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => ({ label, count }));
}
