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

type SubjectCardCommonProps = {
  title: string;
  meta: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  tone: SubjectTone;
  badge?: ReactNode;
};

type CompactSubjectCardProps = {
  variant?: "compact";
  actionLabel?: never;
  onAction?: never;
};

type ActionableSubjectCardProps = {
  variant: "actionable";
  actionLabel?: string;
  onAction: () => void;
};

export type SubjectCardProps = SubjectCardCommonProps &
  (CompactSubjectCardProps | ActionableSubjectCardProps);

export function SubjectCard(props: SubjectCardProps) {
  const {
    title,
    meta,
    illustrationSrc,
    illustrationAlt = "",
    tone,
    badge,
  } = props;
  const variant = props.variant ?? "compact";

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
      {props.variant === "actionable" ? (
        <button className="v3-subject-card__cta" onClick={props.onAction} type="button">
          {props.actionLabel ?? "استكشف المادة"}
        </button>
      ) : null}
    </article>
  );
}
