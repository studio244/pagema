import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        element.dataset["visible"] = "true";
        observer.unobserve(element);
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/** Marque Page.ma (la lame terre cuite du logo), utilisée comme motif de marque. */
export function BrandMark({ className = "", ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 130"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
      {...rest}
    >
      <path d="M2 3 L92 96 a9 9 0 0 1 -2 14 c-20 12 -24 40 -7 60 l4 5 H8 a6 6 0 0 1 -6 -6 Z" />
    </svg>
  );
}

export function Eyebrow({
  children,
  className = "",
  markClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  markClassName?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] ${className}`}
    >
      <BrandMark className={`h-3.5 w-auto shrink-0 ${markClassName}`} />
      <span>{children}</span>
    </p>
  );
}

export function Benefit({ children, tone }: { children: React.ReactNode; tone?: "paper" }) {
  return (
    <li className={`flex items-start gap-3 ${tone === "paper" ? "text-paper" : "text-ink"}`}>
      <BrandMark className="mt-1.5 h-3.5 w-auto shrink-0 text-terra" />
      <span className="leading-relaxed text-pretty">{children}</span>
    </li>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#ffffff" aria-hidden="true">
      <path d="M16.04 3C9.03 3 3.34 8.69 3.34 15.7c0 2.24.59 4.42 1.7 6.35L3.2 29l7.11-1.86a12.65 12.65 0 0 0 5.72 1.37h.01c7 0 12.7-5.7 12.7-12.7C28.74 8.69 23.05 3 16.04 3Zm0 23.24h-.01a10.6 10.6 0 0 1-5.36-1.47l-.38-.23-4.22 1.1 1.13-4.11-.25-.42a10.53 10.53 0 0 1-1.62-5.61c0-5.84 4.76-10.6 10.61-10.6 2.83 0 5.5 1.1 7.5 3.11a10.52 10.52 0 0 1 3.1 7.5c0 5.85-4.76 10.73-10.5 10.73Zm5.82-7.94c-.32-.16-1.98-.98-2.28-1.09-.31-.11-.53-.17-.75.16-.22.32-.86 1.09-1.06 1.31-.19.22-.39.24-.71.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.82-.98-2.49-.26-.65-.52-.56-.71-.57h-.64c-.22 0-.58.08-.88.4-.3.32-1.15 1.13-1.15 2.75 0 1.62 1.18 3.19 1.34 3.41.16.21 2.32 3.54 5.62 4.96.79.34 1.4.54 1.88.69.79.25 1.51.22 2.08.13.63-.09 1.98-.81 2.26-1.59.28-.78.28-1.45.2-1.59-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}
