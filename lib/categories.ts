import { categories } from '@/data/enums';
import type { Category } from '@/data/enums';
import type { Record } from '@/data/schema';
import { records } from '@/data/records';

export function formatCategoryLabel(category: string) {
  return category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' / ');
}

export function getAllCategorySummaries() {
  return categories.map((category) => {
    const categoryRecords = getRecordsByCategory(category);

    return {
      category,
      label: formatCategoryLabel(category),
      recordCount: categoryRecords.length,
      eventCount: categoryRecords.reduce((sum, record) => sum + record.events.length, 0),
      evidenceCount: categoryRecords.reduce((sum, record) => sum + record.evidence.length, 0)
    };
  });
}

export function getRecordsByCategory(category: Category | string): Record[] {
  return records.filter((record) => record.category.includes(category as Category));
}

export function getCategoryBySlug(category: string) {
  return categories.find((item) => item === category);
}
