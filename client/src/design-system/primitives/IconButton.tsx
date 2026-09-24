import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { iconSize, iconStroke, type IconSize } from "../icons/icon-system";

export type IconButtonVariant = "plain" | "soft" | "primary";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: LucideIcon;
  label: string;
  iconSizeName?: IconSize;
  variant?: IconButtonVariant;
  active?: boolean;
};

export function IconButton({
  icon: Icon,
  label,
  iconSizeName = "md",
  variant = "plain",
  active = false,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  const classes = [
    "v3-icon-button",
    `v3-icon-button--${variant}`,
    active ? "is-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      aria-label={label}
      className={classes}
      title={label}
      type={type}
      {...props}
    >
      <Icon
        aria-hidden="true"
        height={iconSize[iconSizeName]}
        strokeWidth={active ? iconStroke.active : iconStroke.default}
        width={iconSize[iconSizeName]}
      />
    </button>
  );
}
