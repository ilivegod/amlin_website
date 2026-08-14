"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";

import {
  CONTACT_SCROLL_KEY,
  smoothScrollToId,
} from "@/lib/smooth-scroll";

type ContactLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: string;
  onNavigate?: () => void;
};

export function ContactLink({
  href = "/about#contact",
  onNavigate,
  onClick,
  ...props
}: ContactLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (pathname === "/about") {
      event.preventDefault();
      onNavigate?.();
      smoothScrollToId("contact", lenis);
      return;
    }

    event.preventDefault();
    onNavigate?.();
    sessionStorage.setItem(CONTACT_SCROLL_KEY, "contact");
    router.push("/about#contact");
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
