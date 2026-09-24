import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "start",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "v3-button",
    `v3-button--${variant}`,
    `v3-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {Icon && iconPosition === "start" ? <Icon aria-hidden="true" /> : null}
      <span>{children}</span>
      {Icon && iconPosition === "end" ? <Icon aria-hidden="true" /> : null}
    </button>
  );
}
