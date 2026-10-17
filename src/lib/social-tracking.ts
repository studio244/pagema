declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Track outbound clicks on social links (Google Analytics). */
export function trackSocialClick(network: "instagram" | "facebook" | "linkedin", page: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "social_click", { network, page });
}
