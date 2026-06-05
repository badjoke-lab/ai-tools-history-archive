type ConfidenceBadgeProps = {
  confidence: string;
};

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  return <span className="confidence-badge">Confidence: {confidence}</span>;
}
