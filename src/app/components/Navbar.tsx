"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { ContactLink } from "@/components/ContactLink";
import { smoothScrollToId, scrollToTop } from "@/lib/smooth-scroll";
import { useLenis } from "lenis/react";
import type Lenis from "lenis";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Industries" },
  { href: "/about", label: "About" },
];

/** Scroll distance (px) over which the nav fully compacts on the homepage. */
const SCROLL_RANGE = 160;

const NAV_HEIGHT_IDLE = 68;
const NAV_HEIGHT_COMPACT = 64;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function handleHomeClick(
  e: MouseEvent<HTMLAnchorElement>,
  pathname: string,
  lenis: Lenis | null | undefined,
  onNavigate?: () => void
) {
  if (pathname !== "/") return;

  e.preventDefault();
  onNavigate?.();
  scrollToTop(lenis, { immediate: false, duration: 1.35 });
}

function handleAnchorClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  lenis: Lenis | null | undefined,
  onNavigate?: () => void
) {
  if (!href.includes("#")) return;

  const hashIndex = href.indexOf("#");
  const linkPath = href.slice(0, hashIndex);
  const hash = href.slice(hashIndex + 1);
  if (!hash) return;

  if (linkPath && linkPath !== window.location.pathname) return;

  e.preventDefault();
  onNavigate?.();
  smoothScrollToId(hash, lenis);
}

function isNavLinkActive(href: string, pathname: string) {
  if (href.includes("#")) {
    return false;
  }

  return pathname === href;
}

const navLinkClass = (onHero: boolean, isActive: boolean) =>
  clsx(
    "rounded-sm font-inter text-sm transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2",
    isActive
      ? "font-semibold text-white underline decoration-white/80 underline-offset-[6px]"
      : "font-medium hover:font-semibold",
    !isActive &&
      (onHero
        ? "text-white/72 hover:text-white focus-visible:ring-[var(--amlin-accent)]"
        : "text-white/[0.66] hover:text-white focus-visible:ring-white/60"),
    isActive && onHero && "focus-visible:ring-[var(--amlin-accent)]",
    isActive && !onHero && "focus-visible:ring-white/60"
  );

const mobileNavLinkClass = (isActive: boolean) =>
  clsx(
    "font-jakarta text-[clamp(2.25rem,9vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white",
    "transition-opacity duration-300 hover:opacity-70",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm",
    isActive &&
      "font-extrabold underline decoration-white/85 underline-offset-[0.14em] decoration-2"
  );

const ctaClass = (onHero: boolean) =>
  clsx(
    "amlin-cta-fill items-center rounded-full border px-[1.15rem] py-[0.6rem]",
    "font-inter text-sm font-semibold",
    "hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2",
    onHero
      ? "border-white/35 text-white focus-visible:ring-[var(--amlin-accent)]"
      : "border-white/22 text-white/90 focus-visible:ring-white/60"
  );

function getMobileNavStyles(): { header: CSSProperties; nav: CSSProperties } {
  return {
    header: {
      top: 0,
      paddingTop: 12,
    },
    nav: {
      height: NAV_HEIGHT_COMPACT,
      maxWidth: "100%",
      borderRadius: 0,
      border: "none",
      backgroundColor: "transparent",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      boxShadow: "none",
      paddingLeft: 0,
      paddingRight: 0,
    },
  };
}

function getNavStyles(
  progress: number,
  onHero: boolean,
  useDarkPill = false
): {
  header: CSSProperties;
  nav: CSSProperties;
} {
  const p = clamp01(progress);
  const blur = lerp(onHero ? 0 : 0, 22, p);
  const radius = lerp(onHero ? 0 : 0, 22, p);
  const compactBorder =
    !onHero && p > 0.35
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid transparent";

  return {
    header: {
      top: lerp(24, 0, p),
      paddingTop: lerp(0, 12, p),
    },
    nav: {
      height: lerp(NAV_HEIGHT_IDLE, NAV_HEIGHT_COMPACT, p),
      maxWidth: p <= 0 ? "100%" : `min(100%, ${lerp(100, 72, p)}rem)`,
      borderRadius: radius,
      border: useDarkPill ? compactBorder : undefined,
      backgroundColor: onHero
        ? `rgba(8, 32, 68, ${lerp(0, 0.55, p)})`
        : `rgba(0, 0, 0, ${lerp(0, 0.52, p)})`,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      boxShadow: onHero
        ? `0 ${lerp(0, 12, p)}px ${lerp(0, 36, p)}px rgba(4, 20, 48, ${lerp(0, 0.28, p)})`
        : `0 ${lerp(0, 12, p)}px ${lerp(0, 44, p)}px rgba(0, 0, 0, ${lerp(0, 0.38, p)})`,
      paddingLeft: lerp(0, 24, p),
      paddingRight: lerp(0, 24, p),
    },
  };
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isOverlayPage =
    pathname === "/work" ||
    pathname === "/services" ||
    pathname === "/solutions" ||
    pathname === "/about";
  const isOverlayNav = isHome || isOverlayPage;
  const isScrollNav = isOverlayNav && !isMobile;
  const progress = isScrollNav ? scrollProgress : isMobile ? 0 : 1;
  const isOnHero = isHome && progress < 0.55;
  const useHeroChrome = isOnHero || (isOverlayPage && progress < 0.55);
  const { header: headerStyle, nav: navStyle } = isMobile
    ? getMobileNavStyles()
    : getNavStyles(progress, isOnHero, isOverlayPage);
  const showMobileLogoPill =
    isMobile && !menuOpen && isOverlayNav && scrollProgress > 0.12;

  useEffect(() => {
    if (!isOverlayNav) {
      setScrollProgress(1);
      return;
    }

    const updateScrollProgress = () => {
      setScrollProgress(clamp01(window.scrollY / SCROLL_RANGE));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [isOverlayNav]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className="fixed inset-x-0 z-50 px-[var(--hero-gutter)] will-change-[top,padding]"
        style={headerStyle}
      >
        <nav
          className={clsx(
            "relative mx-auto w-full items-center",
            isMobile
              ? "flex justify-between"
              : "grid grid-cols-[1fr_auto_1fr] will-change-[height,background,border-radius,box-shadow]"
          )}
          style={navStyle}
        >
          <div className="flex shrink-0 items-center justify-start">
            <Link
              href="/"
              className={clsx(
                "hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amlin-accent)]",
                "transition-[background-color,box-shadow,padding,border-color,border-radius] duration-300 ease-out",
                showMobileLogoPill
                  ? "rounded-full border border-white/10 bg-black/35 px-4 py-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.22)] backdrop-blur-md"
                  : "rounded-sm"
              )}
              onClick={(e) => handleHomeClick(e, pathname, lenis, closeMenu)}
            >
              <Image
                className="h-6 w-auto md:h-7"
                src="/svg/logo.svg"
                alt="Amlin Technologies logo"
                width={166}
                height={37}
                priority
              />
            </Link>
          </div>

          <ul className="hidden items-center justify-center gap-[clamp(1.25rem,2.6vw,2.5rem)] md:flex">
            {links.map(({ href, label }) => {
              const isActive = isNavLinkActive(href, pathname);

              return (
              <li key={href} className="grid list-none justify-items-center">
                <span
                  aria-hidden="true"
                  className={clsx(
                    "invisible col-start-1 row-start-1 font-inter text-sm",
                    isActive ? "font-semibold underline" : "font-semibold"
                  )}
                >
                  {label}
                </span>
                <Link
                  href={href}
                  className={clsx(
                    navLinkClass(useHeroChrome, isActive),
                    "col-start-1 row-start-1"
                  )}
                  onClick={(e) => {
                    if (href === "/") {
                      handleHomeClick(e, pathname, lenis);
                      return;
                    }
                    handleAnchorClick(e, href, lenis);
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
            })}
          </ul>

          <div className="flex shrink-0 items-center justify-end">
            <ContactLink
              className={clsx(ctaClass(useHeroChrome), "hidden md:inline-flex")}
              onNavigate={closeMenu}
            >
              Talk to our team
            </ContactLink>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={clsx(
                "relative z-[70] flex h-10 w-10 shrink-0 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amlin-accent)] md:hidden",
                "transition-[background-color,box-shadow,border-color,border-radius] duration-300 ease-out",
                showMobileLogoPill
                  ? "rounded-full border border-white/10 bg-black/35 shadow-[0_6px_20px_rgba(0,0,0,0.22)] backdrop-blur-md"
                  : "rounded-sm"
              )}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Image
                  src="/svg/hamburgerMenu.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/48 backdrop-blur-md md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div
              className="pointer-events-none absolute inset-3 rounded-[1.75rem] border border-white/[0.06]"
              aria-hidden="true"
            />

            <div className="flex flex-col items-center px-6 pb-2 pt-5">
              <span
                className="mb-6 h-1 w-12 rounded-full bg-white/25"
                aria-hidden="true"
              />
              <div className="flex w-full justify-end">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="rounded-sm p-1 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label="Close menu"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-8 px-10 pb-16">
              {links.map((link, index) => {
                const isActive = isNavLinkActive(link.href, pathname);

                return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{
                    duration: 0.52,
                    delay: 0.1 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={mobileNavLinkClass(isActive)}
                    onClick={(e) => {
                      if (link.href === "/") {
                        handleHomeClick(e, pathname, lenis, closeMenu);
                        return;
                      }
                      handleAnchorClick(e, link.href, lenis, closeMenu);
                      if (!link.href.includes("#")) closeMenu();
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
              })}

              <motion.div
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{
                  duration: 0.52,
                  delay: 0.1 + links.length * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pt-4"
              >
                <ContactLink
                  className={clsx(ctaClass(false), "inline-flex")}
                  onNavigate={closeMenu}
                >
                  Talk to our team
                </ContactLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {!isHome && !isOverlayPage && (
        <div
          className="pointer-events-none h-[calc(var(--nav-h)+0.75rem)]"
          aria-hidden="true"
        />
      )}
    </>
  );
}
