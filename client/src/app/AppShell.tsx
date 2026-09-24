import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import type { ReactNode } from "react";
import "@/design-system/tokens/tokens.css";
import "@/design-system/typography/typography.css";
import "@/design-system/components/components.css";
import "./app-shell.css";

interface AppShellProps {
  children: ReactNode;
  header?: ReactNode;
  mobileNavigation?: ReactNode;
}

/**
 * Product-level shell boundary.
 *
 * V3 styling is intentionally limited to the chrome scopes. The existing
 * feature outlet stays outside [data-v3-ui] until each feature is migrated,
 * preventing typography and token leakage into current/Legacy surfaces.
 */
export default function AppShell({
  children,
  header,
  mobileNavigation,
}: AppShellProps) {
  return (
    <div className="v3-app-shell-frame" data-app-shell="" dir="rtl" lang="ar">
      <div
        className="v3-app-shell__scope"
        data-app-shell-chrome=""
        data-v3-ui=""
      >
        <a className="v3-app-shell__skip-link" href="#app-content">
          تجاوز إلى المحتوى
        </a>

        {header ? (
          <div className="v3-app-shell__header-slot">
            <div className="v3-app-shell__container">{header}</div>
          </div>
        ) : null}
      </div>

      <div id="app-content" data-app-shell-content="" tabIndex={-1}>
        {children}
      </div>

      {mobileNavigation ? (
        <>
          <div
            aria-hidden="true"
            className="v3-app-shell__scope v3-app-shell__mobile-spacer"
            data-app-shell-mobile-spacer=""
            data-v3-ui=""
          />
          <div
            className="v3-app-shell__scope v3-app-shell__mobile-slot"
            data-app-shell-mobile=""
            data-v3-ui=""
          >
            {mobileNavigation}
          </div>
        </>
      ) : null}
    </div>
  );
}
