import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: LinkProps["href"];
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  className = "",
  "aria-label": ariaLabel,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`btn btn-primary ${className}`} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
