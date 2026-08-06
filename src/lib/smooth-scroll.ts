import type Lenis from "lenis";

export const CONTACT_SCROLL_OFFSET = -88;

export function smoothScrollToId(
  id: string,
  lenis?: Lenis | null,
  options?: { offset?: number; duration?: number }
) {
  const element = document.getElementById(id);
  if (!element) return;

  const offset = options?.offset ?? CONTACT_SCROLL_OFFSET;
  const duration = options?.duration ?? 1.75;

  if (lenis) {
    lenis.scrollTo(element, { offset, duration });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}
