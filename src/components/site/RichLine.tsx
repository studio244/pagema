import type { RichText } from "@/lib/i18n";

/** A sentence whose links sit inside the text (contextual internal links). */
export function RichLine({
  parts,
  tone = "ink",
  className = "",
}: {
  parts: RichText;
  /** "paper" on dark sections. */
  tone?: "ink" | "paper";
  className?: string;
}) {
  const linkClass =
    tone === "paper"
      ? "font-semibold text-paper underline decoration-terra decoration-2 underline-offset-4 hover:text-terra"
      : "font-semibold text-ink underline decoration-terra decoration-2 underline-offset-4 hover:text-terra-deep";
  return (
    <p className={className}>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={i} href={part.href} className={linkClass}>
            {part.label}
          </a>
        ),
      )}
    </p>
  );
}
