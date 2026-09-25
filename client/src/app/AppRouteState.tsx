import "@/design-system/tokens/tokens.css";
import "@/design-system/typography/typography.css";
import "@/design-system/primitives/primitives.css";
import { Button, Surface } from "@/design-system/primitives";
import { functionalIcons } from "@/design-system/icons/icon-system";
import "./app-route-state.css";

type AppRouteLoadingProps = {
  standalone?: boolean;
};

export function AppRouteLoading({ standalone = false }: AppRouteLoadingProps) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={
        standalone
          ? "v3-route-state v3-route-state--standalone"
          : "v3-route-state"
      }
      data-app-route-loading=""
      data-v3-ui=""
      dir="rtl"
      role="status"
    >
      <div className="v3-route-loading__content">
        <span aria-hidden="true" className="v3-route-loading__spinner" />
        <p>جاري فتح المسار…</p>
      </div>
    </div>
  );
}

type AppErrorStateProps = {
  standalone?: boolean;
  onRetry: () => void;
  onHome?: () => void;
};

export function AppErrorState({
  standalone = false,
  onRetry,
  onHome,
}: AppErrorStateProps) {
  const WarningIcon = functionalIcons.status.warning.icon;

  return (
    <div
      className={
        standalone
          ? "v3-route-state v3-route-state--standalone"
          : "v3-route-state"
      }
      data-app-error-state=""
      data-v3-ui=""
      dir="rtl"
      role="alert"
    >
      <Surface
        aria-labelledby="app-error-title"
        className="v3-route-error"
        padding="lg"
        variant="raised"
      >
        <span aria-hidden="true" className="v3-route-error__icon">
          <WarningIcon />
        </span>
        <h1 id="app-error-title">تعذر فتح هذا الجزء</h1>
        <p>
          حدث خطأ غير متوقع. يمكنك إعادة تحميل الصفحة أو العودة إلى الرئيسية
          ثم المحاولة مرة أخرى.
        </p>
        <div className="v3-route-error__actions">
          <Button
            icon={functionalIcons.action.retry.icon}
            onClick={onRetry}
            variant="primary"
          >
            إعادة تحميل الصفحة
          </Button>
          {onHome ? (
            <Button
              icon={functionalIcons.navigation.home.icon}
              onClick={onHome}
              variant="secondary"
            >
              العودة للرئيسية
            </Button>
          ) : null}
        </div>
      </Surface>
    </div>
  );
}
