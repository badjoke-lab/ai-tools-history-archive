type StatusBadgeProps = {
  label: string;
  tone?: 'neutral' | 'active' | 'changed' | 'ended' | 'warning';
};

const toneClassName = {
  neutral: 'status-badge neutral',
  active: 'status-badge active',
  changed: 'status-badge changed',
  ended: 'status-badge ended',
  warning: 'status-badge warning'
};

export function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  return <span className={toneClassName[tone]}>{label}</span>;
}

export function getStatusTone(status: string): StatusBadgeProps['tone'] {
  if (status === 'active') return 'active';
  if (status === 'active_changed' || status === 'rebranded' || status === 'merged' || status === 'acquired') return 'changed';
  if (status === 'shutdown' || status === 'retired' || status === 'feature_removed' || status === 'api_discontinued' || status === 'model_discontinued') return 'ended';
  if (status === 'deprecated' || status === 'shutdown_announced' || status === 'unknown' || status === 'unverified') return 'warning';
  return 'neutral';
}
