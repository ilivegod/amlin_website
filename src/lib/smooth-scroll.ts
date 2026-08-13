import type Lenis from "lenis";

export const CONTACT_SCROLL_OFFSET = -88;
export const CONTACT_SCROLL_KEY = "scrollTo";

export function scrollToTop(
  lenis?: Lenis | null,
  options?: { immediate?: boolean; duration?: number }
) {
  const immediate = options?.immediate ?? true;

  if (lenis) {
    lenis.scrollTo(0, {
      immediate,
      duration: options?.duration,
    });
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: immediate ? "auto" : "smooth",
  });
}

export function hasPendingHashScroll() {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(CONTACT_SCROLL_KEY)) return true;
  const hash = window.location.hash.replace("#", "");
  return hash === "contact";
}

export function clearPendingHashScroll() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CONTACT_SCROLL_KEY);
}

export function smoothScrollToId(
  id: string,
  lenis?: Lenis | null,
  options?: { offset?: number; duration?: number }
) {
  const element = document.getElementById(id);
  if (!element) return false;

  const offset = options?.offset ?? CONTACT_SCROLL_OFFSET;
  const duration = options?.duration ?? 1.75;

  if (lenis) {
    lenis.scrollTo(element, { offset, duration });
    return true;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
