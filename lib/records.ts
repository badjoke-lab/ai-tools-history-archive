import bard from '@/data/records/bard.json';
import copilotGptBuilder from '@/data/records/microsoft-copilot-gpt-builder.json';
import openAiTextClassifier from '@/data/records/openai-ai-text-classifier.json';
import openAiTextDavinci003 from '@/data/records/openai-text-davinci-003.json';
import type { ArchiveRecord } from '@/types/record';

const records = [
  bard,
  openAiTextClassifier,
  copilotGptBuilder,
  openAiTextDavinci003
] as ArchiveRecord[];

export function getAllRecords() {
  return [...records].sort((a, b) => a.name.localeCompare(b.name));
}

export function getRecordBySlug(slug: string) {
  return records.find((record) => record.slug === slug) ?? null;
}

export function getRecordSlugs() {
  return records.map((record) => record.slug);
}

export function formatLabel(value: string) {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
