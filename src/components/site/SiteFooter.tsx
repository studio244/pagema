import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { trackSocialClick } from "@/lib/social-tracking";
import { BrandMark, Reveal } from "@/components/brand";
import logoAsset from "@/assets/pagema-logo.png";
import { footerGroups, siteCopy } from "./nav";

const SOCIALS = [
  {
    name: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594526347174",
    Icon: Facebook,
  },
  {
    name: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/page.ma01/",
    Icon: Instagram,
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/showcase/page-ma/",
    Icon: Linkedin,
  },
] as const;

/** Footer shared by the public pages: brand block, then Page.ma / Services / Professionnels / Informations. */
export function SiteFooter({
  lang,
  page,
}: {
  lang: Lang;
  /** Page name sent with social-link clicks (Google Analytics). */
  page: string;
}) {
  const c = siteCopy(lang).footer;
  return (
    <footer className="relative isolate overflow-hidden border-t-2 border-ink zellige">
      <BrandMark className="pointer-events-none absolute -right-14 -bottom-20 -z-10 h-[24rem] w-auto text-ink/[0.07]" />
      <Reveal className="max-w-6xl mx-auto px-5 py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1 lg:pe-4">
            <img src={logoAsset} alt="Page.ma" className="h-9 w-auto" dir="ltr" />
            <p className="mt-6 max-w-prose font-semibold leading-relaxed text-ink-soft text-pretty">
              {c.about}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ name, label, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick(name, page)}
                  aria-label={`${c.on} ${label}`}
                  className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <Icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {footerGroups(lang).map((group) => (
            <nav key={group.id} aria-label={group.label}>
              <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-terra">
                <BrandMark className="h-3 w-auto shrink-0" />
                <span>{group.label}</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {group.links.map((link) => {
                  const external = link.href.startsWith("https://");
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex items-center text-sm font-semibold leading-snug text-ink-soft transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            © 2026 PAGE.MA ·
          </span>
          <span className="flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            <span>{c.legal}</span>
            <span>
              Powered by{" "}
              <a
                href="https://hoverswitch.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terra underline decoration-terra/50 underline-offset-2 transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
              >
                HoverSwitch
              </a>
            </span>
          </span>
        </div>
      </Reveal>
    </footer>
  );
}
