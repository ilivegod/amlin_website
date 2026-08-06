"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";

import { smoothScrollToId } from "@/lib/smooth-scroll";

type AboutContactLinkProps = ComponentProps<typeof Link>;

export function AboutContactLink({
  href = "#contact",
  onClick,
  ...props
}: AboutContactLinkProps) {
  const lenis = useLenis();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    event.preventDefault();
    smoothScrollToId("contact", lenis);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
