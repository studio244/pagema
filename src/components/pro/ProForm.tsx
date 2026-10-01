import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { sendPreregistrationEmail } from "@/lib/notify.functions";
import type { ProLaunchStats } from "@/lib/pro.functions";
import { CATEGORIES, COVERAGE_CITIES } from "@/lib/catalog";
import { normalizeMoroccanPhone } from "@/lib/phone";
import { OTHER, OTHER_MAX_LENGTH, OTHER_TEXT, withOther } from "@/lib/other-service";
import type { ProCopy } from "./copy";
import { FORM_SKINS, type FormSkinName } from "@/components/form-skin";
import { DEFAULT_CITY, placesText, remainingPlaces, type Labels } from "./places";

export function Reassurance({ copy, className = "" }: { copy: ProCopy; className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {copy.reassurance.map((item) => (
        <li key={item} className="flex items-center gap-1.5 whitespace-nowrap">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-current opacity-70" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Provider pre-registration form (WhatsApp, activity, city; optionally name and email), shared by /pro and /inscription.
 * Activity and city values are always saved in French, whatever the page language.
 */
export function ProForm({
  lang,
  stats,
  labels,
  phoneRef,
  source,
  onStart,
  onSubmitted,
  withContact = false,
  skin = "zine",
  className = "",
}: {
  lang: Lang;
  stats: ProLaunchStats | null;
  labels: Labels;
  phoneRef: React.RefObject<HTMLInputElement | null>;
  /** Shown in the notification email, e.g. "Landing /pro — hero A". */
  source: string;
  onStart?: () => void;
  onSubmitted?: (values: { category: string; city: string }) => void;
  /** Also ask for name and email (/pro and /inscription). */
  withContact?: boolean;
  /** "marrakech" restyles the form for /annuaire; the content is the same. */
  skin?: FormSkinName;
  className?: string;
}) {
  const { copy } = labels;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [otherService, setOtherService] = useState("");
  const [city, setCity] = useState(DEFAULT_CITY);
  const [phoneError, setPhoneError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  // The /pro look stays as it was; other skins come from the shared form skins.
  const s = skin === "zine" ? null : FORM_SKINS[skin];
  const inputClass =
    s?.input ??
    "w-full bg-paper border-2 border-ink px-3 py-3 text-base placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-terra/50";
  const labelClass =
    s?.label ??
    "block font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft mb-1.5";
  const noteClass = s ? "mt-1.5 text-xs font-medium text-[#b83e26]" : "mt-1.5 text-sm font-semibold text-terra-deep";

  const otherText = OTHER_TEXT[lang];
  const remaining =
    category && category !== OTHER && city === DEFAULT_CITY
      ? remainingPlaces(stats, category)
      : null;
  const activityName = category ? labels.category(category) : "";
  const activityInline = lang === "fr" ? activityName.toLowerCase() : activityName;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizeMoroccanPhone(phone);
    if (!normalized) {
      setPhoneError(true);
      phoneRef.current?.focus();
      return;
    }
    setStatus("sending");
    const savedCategory = withOther(category, otherService);
    const { error } = await supabase.from("preregistrations").insert({
      full_name: fullName.trim(),
      email: email.trim(),
      phone: normalized,
      city,
      category: savedCategory,
      profile: "prestataire",
    });
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("done");
    onSubmitted?.({ category: savedCategory, city });

    // The registration is saved; a failed notification email must not block the provider.
    sendPreregistrationEmail({
      data: {
        profile: "prestataire",
        fullName: fullName.trim(),
        phone: normalized,
        email: email.trim(),
        city,
        category: savedCategory,
        source,
      },
    }).catch((emailError: unknown) => console.error(emailError));
  }

  return (
    <div
      className={`${s?.card ?? "relative border-2 border-ink bg-paper p-6 sm:p-8 shadow-cut"} ${className}`}
    >
      {status === "done" ? (
        <div className="py-6 text-center" role="status">
          <span
            className={s?.doneTag ?? "font-mono text-xs font-semibold uppercase tracking-wide text-terra-deep"}
          >
            {copy.form.doneTag}
          </span>
          <p className={s?.doneTitle ?? "mt-3 font-display text-3xl leading-tight tracking-tight"}>
            {copy.form.doneTitle}
          </p>
          <p className={s?.doneBody ?? "mt-3 leading-relaxed text-ink-soft"}>{copy.form.doneBody}</p>
        </div>
      ) : (
        // First real input (not mere focus: CTA clicks focus the phone field programmatically).
        <form className="space-y-5" onSubmit={handleSubmit} onChange={onStart}>
          <div>
            <p className={s?.title ?? "font-display text-2xl leading-tight tracking-tight"}>
              {copy.form.title}
            </p>
            <Reassurance copy={copy} className={s ? "mt-2 text-[#e0b400]" : "mt-2 text-terra-deep"} />
          </div>

          {withContact && (
            <div>
              <label className={labelClass} htmlFor="pro-name">
                {copy.form.name}
              </label>
              <input
                id="pro-name"
                className={inputClass}
                type="text"
                autoComplete="name"
                placeholder={copy.form.namePh}
                required
                maxLength={120}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="pro-phone">
              {copy.form.phone}
            </label>
            <input
              id="pro-phone"
              ref={phoneRef}
              className={inputClass}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              placeholder={copy.form.phonePh}
              required
              value={phone}
              aria-invalid={phoneError}
              aria-describedby={phoneError ? "pro-phone-error" : undefined}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(false);
              }}
            />
            {phoneError && (
              <p id="pro-phone-error" className={noteClass}>
                {copy.form.phoneError}
              </p>
            )}
          </div>

          {withContact && (
            <div>
              <label className={labelClass} htmlFor="pro-email">
                {copy.form.email}
              </label>
              <input
                id="pro-email"
                className={inputClass}
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                placeholder={copy.form.emailPh}
                required
                maxLength={160}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="pro-category">
              {copy.form.activity}
            </label>
            <select
              id="pro-category"
              className={inputClass}
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                {copy.form.activityPh}
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {labels.category(c)}
                </option>
              ))}
              <option value={OTHER}>{otherText.option}</option>
            </select>
            {category === OTHER && (
              <div className="mt-3">
                <label className="sr-only" htmlFor="pro-category-other">
                  {otherText.label}
                </label>
                <input
                  id="pro-category-other"
                  className={inputClass}
                  type="text"
                  placeholder={otherText.placeholder}
                  required
                  autoFocus
                  maxLength={OTHER_MAX_LENGTH}
                  value={otherService}
                  onChange={(e) => setOtherService(e.target.value)}
                />
              </div>
            )}
            {remaining !== null && (
              <p className={noteClass}>
                {remaining === 0
                  ? copy.form.placesFull(activityInline)
                  : copy.form.placesLeft(placesText(copy, remaining), activityInline)}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="pro-city">
              {copy.form.city}
            </label>
            <select
              id="pro-city"
              className={inputClass}
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {COVERAGE_CITIES.map((c) => (
                <option key={c} value={c}>
                  {labels.city(c)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className={
              s?.button ??
              "w-full bg-terra text-paper border-2 border-ink px-6 py-4 font-display text-xl leading-tight tracking-tight lift disabled:opacity-60"
            }
          >
            {status === "sending" ? copy.form.sending : copy.cta}
          </button>

          {status === "error" && (
            <p className={s?.error ?? "text-sm font-semibold text-terra-deep"} role="alert">
              {copy.form.error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
