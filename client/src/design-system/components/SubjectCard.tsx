import type { ReactNode } from "react";

export type SubjectTone =
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "arabic"
  | "english"
  | "islamic"
  | "social";

export type SubjectCardProps = {
  title: string;
  meta: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  tone: SubjectTone;
  variant?: "compact" | "actionable";
  actionLabel?: string;
  onAction?: () => void;
  badge?: ReactNode;
};

export function SubjectCard({
  title,
  meta,
  illustrationSrc,
  illustrationAlt = "",
  tone,
  variant = "compact",
  actionLabel = "استكشف المادة",
  onAction,
  badge,
}: SubjectCardProps) {
  return (
    <article
      className={`v3-subject-card v3-subject-card--${variant} v3-subject-card--${tone}`}
      data-subject-card
      data-subject-card-variant={variant}
    >
      <div className="v3-subject-card__content">
        <div className="v3-subject-card__copy">
          {badge ? <div className="v3-subject-card__badge">{badge}</div> : null}
          <h3 className="v3-subject-card__title">{title}</h3>
          <p className="v3-subject-card__meta">{meta}</p>
        </div>
        {illustrationSrc ? (
          <img
            alt={illustrationAlt}
            className="v3-subject-card__art"
            decoding="async"
            loading="lazy"
            src={illustrationSrc}
          />
        ) : (
          <span
            aria-hidden="true"
            className="v3-subject-card__art v3-subject-card__art--reserved"
            data-subject-art-slot
          />
        )}
      </div>
      {variant === "actionable" ? (
        <button className="v3-subject-card__cta" onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : null}
    </article>
  );
}
