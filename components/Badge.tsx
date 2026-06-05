type BadgeProps = {
  children: React.ReactNode;
  tone?: 'default' | 'strong';
};

export function Badge({ children, tone = 'default' }: BadgeProps) {
  return <span className={`badge ${tone === 'strong' ? 'badge-strong' : ''}`}>{children}</span>;
}
