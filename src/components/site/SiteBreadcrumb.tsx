import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { siteCopy, type NavLink } from "./nav";

/** Visible breadcrumb; the last item is the current page. Same trail as the page's BreadcrumbList JSON-LD. */
export function SiteBreadcrumb({
  lang,
  items,
  className = "",
}: {
  lang: Lang;
  items: NavLink[];
  className?: string;
}) {
  return (
    <Breadcrumb aria-label={siteCopy(lang).breadcrumb} className={className}>
      <BreadcrumbList className="font-mono text-[11px] uppercase tracking-wide text-ink-soft sm:gap-2">
        {items.map((item, i) => (
          <Fragment key={item.href}>
            {i > 0 && (
              <BreadcrumbSeparator>
                <ChevronRight className="rtl:-scale-x-100" />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              {i === items.length - 1 ? (
                <BreadcrumbPage className="font-semibold text-ink">{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={item.href}
                  className="hover:text-ink underline-offset-4 hover:underline"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
