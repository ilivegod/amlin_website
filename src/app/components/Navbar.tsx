"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";

const links = [
  { href: "/solutions", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#industry-solutions", label: "Industries" },
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

function handleAnchorClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
) {
  if (!href.includes("#")) return;

  const hash = href.split("#")[1];
  if (!hash) return;
  if (window.location.pathname !== "/") return;

  e.preventDefault();
  onNavigate?.();
  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
}

const navLinkClass = clsx(
  "rounded-sm font-inter text-sm font-medium text-white/[0.66]",
  "transition-all duration-300 ease-out hover:font-semibold hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
);

const mobileNavLinkClass = clsx(
  "font-polysans text-[clamp(2.25rem,9vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white",
  "transition-opacity duration-300 hover:opacity-70",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
);

const ctaClass = clsx(
  "amlin-trace items-center rounded-full border border-white/16 bg-black/35 px-[1.15rem] py-[0.6rem] backdrop-blur-[6px]",
  "font-inter text-sm font-semibold text-white/90 transition-all duration-300 ease-out",
  "hover:cursor-pointer hover:border-white/50 hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
);

function getNavStyles(progress: number): {
  header: CSSProperties;
  nav: CSSProperties;
} {
  const p = clamp01(progress);
  const blur = lerp(0, 22, p);
  const radius = lerp(0, 22, p);

  return {
    header: {
      top: lerp(24, 0, p),
      paddingTop: lerp(0, 12, p),
    },
    nav: {
      height: lerp(NAV_HEIGHT_IDLE, NAV_HEIGHT_COMPACT, p),
      maxWidth: p <= 0 ? "100%" : `min(100%, ${lerp(100, 72, p)}rem)`,
      borderRadius: radius,
      backgroundColor: `rgba(0, 0, 0, ${lerp(0, 0.52, p)})`,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      boxShadow: `0 ${lerp(0, 12, p)}px ${lerp(0, 44, p)}px rgba(0, 0, 0, ${lerp(0, 0.38, p)})`,
      paddingLeft: lerp(0, 24, p),
      paddingRight: lerp(0, 24, p),
    },
  };
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const progress = isHome ? scrollProgress : 1;
  const { header: headerStyle, nav: navStyle } = getNavStyles(progress);

  useEffect(() => {
    if (!isHome) {
      setScrollProgress(1);
      return;
    }

    const updateScrollProgress = () => {
      setScrollProgress(clamp01(window.scrollY / SCROLL_RANGE));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [isHome]);

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
          className="relative mx-auto flex w-full items-center will-change-[height,background,border-radius,box-shadow]"
          style={navStyle}
        >
          <div className="flex w-full items-center">
            <div className="flex flex-1 items-center">
              <Link
                href="/"
                className="rounded-sm hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                onClick={closeMenu}
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

            <ul className="hidden items-center gap-[clamp(1.25rem,2.6vw,2.5rem)] md:flex">
              {links.map(({ href, label }) => (
                <li key={href} className="grid list-none justify-items-center">
                  <span
                    aria-hidden="true"
                    className="invisible col-start-1 row-start-1 font-inter text-sm font-semibold"
                  >
                    {label}
                  </span>
                  <Link
                    href={href}
                    className={clsx(navLinkClass, "col-start-1 row-start-1")}
                    onClick={(e) => handleAnchorClick(e, href)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-1 items-center justify-end">
              <Link
                href="/#challenge"
                className={clsx(ctaClass, "hidden md:inline-flex")}
                onClick={(e) => handleAnchorClick(e, "/#challenge")}
              >
                Talk to our team
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="relative z-[70] rounded-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
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
                  />
                )}
              </button>
            </div>
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
            className="fixed inset-0 z-[60] flex flex-col bg-black/72 backdrop-blur-2xl md:hidden"
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
              {links.map((link, index) => (
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
                    className={mobileNavLinkClass}
                    onClick={(e) => {
                      handleAnchorClick(e, link.href, closeMenu);
                      if (!link.href.includes("#")) closeMenu();
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

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
                <Link
                  href="/#challenge"
                  className={clsx(ctaClass, "inline-flex")}
                  onClick={(e) =>
                    handleAnchorClick(e, "/#challenge", closeMenu)
                  }
                >
                  Talk to our team
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {!isHome && (
        <div
          className="pointer-events-none h-[calc(var(--nav-h)+0.75rem)]"
          aria-hidden="true"
        />
      )}
    </>
  );
}
