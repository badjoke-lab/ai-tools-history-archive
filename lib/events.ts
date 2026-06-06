import type { LifecycleEvent, Record } from '@/data/schema';
import { records } from '@/data/records';

export type EventWithRecord = LifecycleEvent & {
  record: Pick<Record, 'id' | 'slug' | 'name' | 'operator' | 'status' | 'entity_type' | 'category' | 'confidence'>;
};

const descendingByDate = (a: EventWithRecord, b: EventWithRecord) => b.date.localeCompare(a.date);

export function getAllEvents(): EventWithRecord[] {
  return records
    .flatMap((record) =>
      record.events.map((event) => ({
        ...event,
        record: {
          id: record.id,
          slug: record.slug,
          name: record.name,
          operator: record.operator,
          status: record.status,
          entity_type: record.entity_type,
          category: record.category,
          confidence: record.confidence
        }
      }))
    )
    .sort(descendingByDate);
}

export function getEventsByTypes(types: string[]) {
  const typeSet = new Set(types);
  return getAllEvents().filter((event) => typeSet.has(event.type));
}

export function getApiModelLifecycleEvents() {
  return getEventsByTypes(['api_deprecated', 'api_shutdown', 'model_deprecated', 'model_retired']);
}
