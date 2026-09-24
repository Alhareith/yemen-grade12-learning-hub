import type { HTMLAttributes, ReactNode } from "react";

export type SurfaceVariant = "card" | "raised" | "subtle";
export type SurfacePadding = "sm" | "md" | "lg";

export type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SurfaceVariant;
  padding?: SurfacePadding;
  children: ReactNode;
};

export function Surface({
  variant = "card",
  padding = "md",
  className = "",
  children,
  ...props
}: SurfaceProps) {
  const classes = [
    "v3-surface",
    `v3-surface--${variant}`,
    `v3-surface--pad-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
