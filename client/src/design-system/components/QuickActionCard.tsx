export type QuickActionTone = "prompts" | "practice" | "curriculum";

export type QuickActionCardProps = {
  title: string;
  description?: string;
  illustrationSrc: string;
  illustrationAlt?: string;
  tone: QuickActionTone;
  onClick?: () => void;
};

export function QuickActionCard({
  title,
  description,
  illustrationSrc,
  illustrationAlt = "",
  tone,
  onClick,
}: QuickActionCardProps) {
  return (
    <button
      className={`v3-quick-action v3-quick-action--${tone}`}
      onClick={onClick}
      type="button"
    >
      <span className="v3-quick-action__copy">
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <img
        alt={illustrationAlt}
        className="v3-quick-action__art"
        decoding="async"
        loading="lazy"
        src={illustrationSrc}
      />
    </button>
  );
}
