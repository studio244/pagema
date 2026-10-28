import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import logoAsset from "@/assets/pagema-logo.png";
import { localPath, menuGroups, siteCopy, type NavGroup } from "./nav";

const linkClass =
  "font-mono text-xs leading-none uppercase tracking-wide text-ink-soft hover:text-ink border-b-2 border-transparent hover:border-terra py-1 transition-colors";

/**
 * Main menu shared by the public pages: Accueil, two dropdowns, Avantages partenaires,
 * FR/AR switch and the "Inscrire mon entreprise" CTA. Below xl it folds into a panel
 * with expandable sections.
 */
export function SiteHeader({
  lang,
  switchHref,
  ctaHref,
}: {
  lang: Lang;
  /** Same page in the other language. */
  switchHref: string;
  /** Where the CTA leads; pages with their own provider form point it there. */
  ctaHref?: string;
}) {
  const c = siteCopy(lang);
  const groups = menuGroups(lang);
  const cta = ctaHref ?? localPath(lang, "/inscription");
  const [open, setOpen] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Close the open dropdown on Escape or on a click outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.getElementById(`menu-button-${open}`)?.focus();
      setOpen(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!desktopRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <a href={localPath(lang, "/")} className="shrink-0" aria-label={`Page.ma · ${c.home}`}>
            <img src={logoAsset} alt="Page.ma" className="h-9 sm:h-10 w-auto" dir="ltr" />
          </a>
        </div>

        <nav
          ref={desktopRef}
          aria-label={c.menu.main}
          className="hidden xl:flex items-center gap-5"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
          }}
        >
          <a href={localPath(lang, "/")} className={linkClass}>
            {c.home}
          </a>
          {groups.map((group) => (
            <Dropdown
              key={group.id}
              group={group}
              open={open === group.id}
              onToggle={() => setOpen(open === group.id ? null : group.id)}
            />
          ))}
          <a href={localPath(lang, "/avantages-partenaires")} className={linkClass}>
            {c.partners}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={switchHref}
            hrefLang={lang === "ar" ? "fr" : "ar"}
            lang={lang === "ar" ? "fr" : "ar"}
            className="hidden sm:inline-flex font-mono text-xs leading-none py-1 text-ink-soft hover:text-ink"
          >
            {lang === "ar" ? "Français" : "العربية"}
          </a>
          <a
            href={cta}
            className="hidden md:inline-flex items-center font-mono text-xs leading-none uppercase tracking-wide border-2 border-ink px-4 py-2 lift bg-terra text-paper"
          >
            {c.cta}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-menu-panel"
            aria-label={menuOpen ? c.menu.close : c.menu.open}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 border-2 border-ink lift bg-paper"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path
                d={menuOpen ? "M5 5l14 14M19 5L5 19" : "M4 6h16M4 12h16M4 18h16"}
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <MobilePanel
          lang={lang}
          groups={groups}
          cta={cta}
          switchHref={switchHref}
          onNavigate={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}

function Dropdown({
  group,
  open,
  onToggle,
}: {
  group: NavGroup;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        id={`menu-button-${group.id}`}
        aria-expanded={open}
        aria-controls={`menu-${group.id}`}
        onClick={onToggle}
        className={`${linkClass} inline-flex items-center gap-1 ${open ? "text-ink border-terra" : ""}`}
      >
        {group.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {/* Always in the HTML so crawlers see the links; only shown when open. */}
      <ul
        id={`menu-${group.id}`}
        hidden={!open}
        className="absolute start-0 top-full mt-3 min-w-64 border-2 border-ink bg-paper shadow-cut py-2"
      >
        {group.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="block px-4 py-2.5 text-sm font-semibold text-ink-soft hover:bg-paper-deep hover:text-ink focus-visible:bg-paper-deep"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobilePanel({
  lang,
  groups,
  cta,
  switchHref,
  onNavigate,
}: {
  lang: Lang;
  groups: NavGroup[];
  cta: string;
  switchHref: string;
  onNavigate: () => void;
}) {
  const c = siteCopy(lang);
  const [section, setSection] = useState<string | null>(null);
  const rowClass =
    "flex w-full items-center justify-between font-mono text-sm uppercase tracking-wide py-3 border-b border-ink/20";

  return (
    <nav
      id="site-menu-panel"
      aria-label={c.menu.main}
      className="xl:hidden border-t-2 border-ink bg-paper paper-noise max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col">
        <a href={localPath(lang, "/")} onClick={onNavigate} className={rowClass}>
          {c.home}
        </a>
        {groups.map((group) => {
          const expanded = section === group.id;
          return (
            <div key={group.id}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`mobile-menu-${group.id}`}
                onClick={() => setSection(expanded ? null : group.id)}
                className={rowClass}
              >
                {group.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {expanded && (
                <ul id={`mobile-menu-${group.id}`} className="py-2 border-b border-ink/20">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={onNavigate}
                        className="block ps-4 py-2.5 text-sm font-semibold text-ink-soft hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        <a
          href={localPath(lang, "/avantages-partenaires")}
          onClick={onNavigate}
          className={rowClass}
        >
          {c.partners}
        </a>
        <a
          href={switchHref}
          hrefLang={lang === "ar" ? "fr" : "ar"}
          lang={lang === "ar" ? "fr" : "ar"}
          className="sm:hidden font-mono text-sm py-3 border-b border-ink/20"
        >
          {lang === "ar" ? "Français" : "العربية"}
        </a>
        <a
          href={cta}
          onClick={onNavigate}
          className="mt-4 inline-flex items-center justify-center text-center font-mono text-xs leading-tight uppercase tracking-wide border-2 border-ink px-3 py-3 lift bg-terra text-paper"
        >
          {c.cta}
        </a>
      </div>
    </nav>
  );
}
