import type { InputHTMLAttributes } from "react";
import { functionalIcons, iconSize, iconStroke } from "../icons/icon-system";

export type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export function SearchField({
  label,
  className = "",
  ...props
}: SearchFieldProps) {
  const SearchIcon = functionalIcons.action.search.icon;
  const size = iconSize[functionalIcons.action.search.size];

  return (
    <label className={["v3-search-field", className].filter(Boolean).join(" ")}>
      <span className="v3-search-field__label">{label}</span>
      <span className="v3-search-field__control">
        <SearchIcon
          aria-hidden="true"
          height={size}
          strokeWidth={iconStroke.default}
          width={size}
        />
        <input type="search" {...props} />
      </span>
    </label>
  );
}
