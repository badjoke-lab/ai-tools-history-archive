import { records } from '@/data/records';
import { getAllEvents } from './events';
import { getLifecycleProjection } from './lifecycle';

function countBy<T extends string>(values: T[]) {
  return values.reduce<Record<T, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

function lifespanBucket(launchYear: string | null, endYear: string | null) {
  if (!launchYear || !endYear) return null;
  const span = Number(endYear) - Number(launchYear);
  if (!Number.isFinite(span) || span < 0) return null;
  if (span === 0) return 'same calendar year';
  if (span === 1) return '1 calendar year';
  if (span <= 3) return '2–3 calendar years';
  if (span <= 5) return '4–5 calendar years';
  return '6+ calendar years';
}

type LifespanBucket = Exclude<ReturnType<typeof lifespanBucket>, null>;

export function getArchiveStats() {
  const events = getAllEvents();
  const evidence = records.flatMap((record) => record.evidence);
  const projections = records.map((record) => ({ record, projection: getLifecycleProjection(record) }));
  const lifespanBuckets = projections
    .map(({ projection }) => lifespanBucket(projection.launchYear, projection.endYear))
    .filter((value): value is LifespanBucket => value !== null);

  return {
    totals: {
      records: records.length,
      events: events.length,
      evidence: evidence.length
    },
    byStatus: countBy(records.map((record) => record.status)),
    byEntityType: countBy(records.map((record) => record.entity_type)),
    byCategory: countBy(records.flatMap((record) => record.category)),
    byEventType: countBy(events.map((event) => event.type)),
    byConfidence: countBy(records.map((record) => record.confidence)),
    byOperator: countBy(records.map((record) => record.operator)),
    byLaunchYear: countBy(
      projections.map(({ projection }) => projection.launchYear).filter((value): value is string => Boolean(value))
    ),
    byEndYear: countBy(
      projections.map(({ projection }) => projection.endYear).filter((value): value is string => Boolean(value))
    ),
    lifespanBuckets: countBy(lifespanBuckets),
    byEvidenceSourceType: countBy(evidence.map((item) => item.source_type)),
    byEvidenceReliability: countBy(evidence.map((item) => item.reliability)),
    byReviewYear: countBy(records.map((record) => record.last_reviewed_at.slice(0, 4))),
    coverage: {
      replacementGuidanceRecorded: projections.filter(({ projection }) => projection.replacementGuidanceRecorded).length,
      dataExportDeadlineRecorded: projections.filter(({ projection }) => projection.dataExportDeadlineRecorded).length,
      highReliabilityEvidence: projections.filter(({ projection }) => projection.highReliabilityEvidence).length,
      archivedEvidenceAvailable: projections.filter(({ projection }) => projection.archivedEvidenceAvailable).length,
      launchYearRecorded: projections.filter(({ projection }) => Boolean(projection.launchYear)).length,
      endYearRecorded: projections.filter(({ projection }) => Boolean(projection.endYear)).length,
      lifespanComparable: lifespanBuckets.length,
      lastReviewedRecorded: records.filter((record) => Boolean(record.last_reviewed_at)).length
    }
  };
}

export function toStatRows(stats: Record<string, number>) {
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => ({ label, count }));
}
