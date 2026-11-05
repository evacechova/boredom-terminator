import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: LinkProps["href"];
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`btn btn-primary ${className}`}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      inert={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </Link>
  );
}
