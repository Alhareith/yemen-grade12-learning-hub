import { functionalIcons } from "../icons/icon-system";

export type SimulationBannerProps = {
  title: string;
  description: string;
  illustrationSrc: string;
  illustrationAlt?: string;
  actionLabel?: string;
  external?: boolean;
  onAction?: () => void;
};

export function SimulationBanner({
  title,
  description,
  illustrationSrc,
  illustrationAlt = "",
  actionLabel = "ابدأ المحاكاة",
  external = true,
  onAction,
}: SimulationBannerProps) {
  const ExternalIcon = functionalIcons.action.external.icon;

  return (
    <section className="v3-simulation-banner">
      <div className="v3-simulation-banner__copy">
        <span className="v3-simulation-banner__eyebrow">محاكاة الاختبار</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="v3-simulation-banner__cta" onClick={onAction} type="button">
          <span>{actionLabel}</span>
          {external ? <ExternalIcon aria-hidden="true" /> : null}
        </button>
      </div>
      <img
        alt={illustrationAlt}
        className="v3-simulation-banner__art"
        decoding="async"
        src={illustrationSrc}
      />
    </section>
  );
}
