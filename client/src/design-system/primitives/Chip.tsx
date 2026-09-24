import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ChipTone = "neutral" | "primary" | "success" | "warning";
export type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ChipTone;
  selected?: boolean;
  children: ReactNode;
};

export function Chip({
  tone = "neutral",
  selected = false,
  className = "",
  children,
  type = "button",
  ...props
}: ChipProps) {
  const classes = [
    "v3-chip",
    `v3-chip--${tone}`,
    selected ? "is-selected" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      aria-pressed={selected}
      className={classes}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
