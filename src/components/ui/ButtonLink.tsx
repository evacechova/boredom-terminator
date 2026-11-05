import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: LinkProps["href"];
  children: ReactNode;
};

export function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <Link href={href} className="btn btn-primary">
      {children}
    </Link>
  );
}
