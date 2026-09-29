import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sendPreregistrationEmail } from "@/lib/notify.functions";
import { normalizeMoroccanPhone } from "@/lib/phone";
import { DICTS, type Lang } from "@/lib/i18n";
import {
  CATEGORY_MAX_LENGTH,
  OTHER,
  OTHER_MAX_LENGTH,
  OTHER_TEXT,
  withOther,
} from "@/lib/other-service";
import { MARRAKECH_COPY } from "./copy";

type Profile = "client" | "prestataire";

/** Saved values stay French whatever the page language. */
const SERVICES = ["Sécurité", "Nettoyage", "Jardinage", "Piscine", OTHER];

const labelClass =
  "text-xs font-medium text-start text-[#404653] leading-normal tracking-wide w-fit h-fit";
const inputClass =
  "self-stretch h-11 bg-white rounded-[10px] border border-[#16181f]/10 py-2.5 px-3.5 text-sm text-[#16181f] leading-[1.57] placeholder:text-[#404653]/35 focus:outline-none focus:border-[#ffd000] focus:ring-2 focus:ring-[#ffd000]/40";

/** "مراكش" → "Marrakech", so data and sign-up counts are the same in both languages. */
function toFrenchCity(city: string) {
  const trimmed = city.trim();
  const match = Object.entries(DICTS.ar.cityLabels).find(([, ar]) => ar === trimmed);
  return match ? match[0] : trimmed;
}

function Check({ checked }: { checked: boolean }) {
  return checked ? (
    <span
      className="flex shrink-0 flex-col justify-center items-center w-4 h-4 bg-[#ffd000] rounded"
      aria-hidden="true"
    >
      <span className="text-[10px] font-bold text-center text-white leading-[1.2]">✓</span>
    </span>
  ) : (
    <span className="flex shrink-0 w-4 h-4 rounded border border-[#16181f]/15" aria-hidden="true" />
  );
}

/** Working version of the /marrakech pre-registration form (same table and email as the homepage). */
export default function MarrakechForm({ lang }: { lang: Lang }) {
  const copy = MARRAKECH_COPY[lang];
  const f = copy.form;
  const arrow = lang === "ar" ? "↖" : "↗";
  const [profile, setProfile] = useState<Profile>("client");
  const [fullName, setFullName] = useState("");
  const [when, setWhen] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(f.defaultCity);
  const [services, setServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");
  const [details, setDetails] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const isClient = profile === "client";
  // Ticked services and "Autre : <text>" are saved together, within the database's 80 characters.
  const otherPrefix = [...services.filter((s) => s !== OTHER), `${OTHER} : `].join(", ");
  const otherMaxLength = Math.min(OTHER_MAX_LENGTH, CATEGORY_MAX_LENGTH - otherPrefix.length);

  const toggleService = (value: string) =>
    setServices((current) =>
      current.includes(value) ? current.filter((s) => s !== value) : [...current, value],
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizeMoroccanPhone(phone);
    const problems = [
      ...(normalized ? [] : ["phone"]),
      ...(services.length ? [] : ["services"]),
      ...(consent ? [] : ["consent"]),
    ];
    setErrors(problems);
    if (problems.length || !normalized) return;

    setStatus("sending");
    const category = services
      .map((s) => withOther(s, otherService))
      .join(", ")
      .slice(0, CATEGORY_MAX_LENGTH);
    const savedCity = toFrenchCity(city);
    const needDetails =
      [when.trim() && `Date/heure souhaitée : ${when.trim()}`, details.trim()]
        .filter(Boolean)
        .join("\n") || null;
    const { error } = await supabase.from("preregistrations").insert({
      full_name: fullName.trim(),
      phone: normalized,
      email: email.trim(),
      city: savedCity,
      category,
      profile,
      need_details: needDetails,
    });
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("done");

    // The registration is saved; a failed notification email must not block the visitor.
    sendPreregistrationEmail({
      data: {
        profile,
        fullName: fullName.trim(),
        phone: normalized,
        email: email.trim(),
        city: savedCity,
        category,
        needDetails,
        source: lang === "ar" ? "Page /ar/marrakech" : "Page /marrakech",
      },
    }).catch((emailError: unknown) => console.error(emailError));
  }

  const tabClass = (active: boolean) =>
    `flex flex-row justify-center items-center text-center min-h-10 rounded-full py-2 px-3 sm:px-5 text-sm font-medium leading-tight ${
      active
        ? "bg-[#ffd000] text-black shadow-[0px_1px_2px_-1px_rgb(0_0_0_/_0.1),_0px_1px_3px_0px_rgb(0_0_0_/_0.1)]"
        : "text-[#404653] hover:text-black"
    }`;

  return (
    <>
      {/* Toggle */}
      <div
        className="grid w-full max-w-md grid-cols-2 items-stretch gap-1 bg-[#16181f]/5 rounded-[26px] p-1 sm:flex sm:w-fit sm:max-w-none sm:rounded-full"
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={isClient}
          className={tabClass(isClient)}
          onClick={() => setProfile("client")}
        >
          {f.tabClient}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isClient}
          className={tabClass(!isClient)}
          onClick={() => setProfile("prestataire")}
        >
          {f.tabPro}
        </button>
      </div>

      {/* Form Card */}
      <div className="flex flex-col shrink-0 gap-8 items-start self-stretch h-fit bg-white/85 rounded-3xl shadow-[0px_18px_50px_-32px_rgb(20_23_29_/_0.55),_0px_0px_0px_1px_rgb(22_24_31_/_0.1)] backdrop-blur-lg p-6 sm:p-10 overflow-hidden">
        {status === "done" ? (
          <div className="self-stretch py-24 text-center" role="status">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#b83e26]">
              {f.received}
            </p>
            <p className="mt-3 text-[clamp(1.6rem,4vw,2rem)] font-black leading-tight tracking-tight text-[#16181f]">
              {isClient ? f.doneClient : f.donePro}
            </p>
            <p className="mt-3 text-base text-[#404653]">
              {isClient ? f.doneBodyClient : f.doneBodyPro}
            </p>
          </div>
        ) : (
          <form className="contents" onSubmit={handleSubmit}>
            {/* Info */}
            <div className="flex flex-row gap-2.5 items-center self-stretch h-fit bg-[#b83e26]/4 rounded-xl py-2.5 px-3">
              <div className="flex flex-col justify-center items-center w-5 h-5 bg-[#b83e26]/12 rounded-full">
                <p className="text-xs font-bold text-center text-[#b83e26] leading-normal w-fit h-fit">
                  i
                </p>
              </div>
              <p className="text-xs font-normal text-start text-[#7f1e0b] leading-normal flex-1 h-fit">
                {isClient ? f.infoClient : f.infoPro}
              </p>
            </div>

            <div className="grid gap-4 self-stretch sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 items-start flex-1 h-fit">
                <label className={labelClass} htmlFor="mk-name">
                  {isClient ? f.nameClient : f.namePro}
                </label>
                <input
                  id="mk-name"
                  maxLength={120}
                  className={inputClass}
                  placeholder={isClient ? f.namePhClient : f.namePhPro}
                  autoComplete={isClient ? "name" : "organization"}
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5 items-start flex-1 h-fit">
                <div className="flex flex-row gap-1.5 items-center w-fit h-fit">
                  <label className={labelClass} htmlFor="mk-when">
                    {isClient ? f.whenClient : f.whenPro}
                  </label>
                  <span className="text-xs font-normal text-start text-[#404653]/50 leading-normal">
                    {f.optional}
                  </span>
                </div>
                <input
                  id="mk-when"
                  className={inputClass}
                  placeholder={isClient ? f.whenPhClient : f.whenPhPro}
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 self-stretch sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 items-start flex-1 h-fit">
                <label className={labelClass} htmlFor="mk-phone">
                  {f.phone}
                </label>
                <input
                  id="mk-phone"
                  maxLength={40}
                  className={inputClass}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  placeholder="06 XX XX XX XX"
                  required
                  value={phone}
                  aria-invalid={errors.includes("phone")}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.includes("phone") && (
                  <p className="text-xs font-medium text-[#b83e26]">{f.phoneError}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5 items-start flex-1 h-fit">
                <label className={labelClass} htmlFor="mk-email">
                  {f.email}
                </label>
                <input
                  id="mk-email"
                  maxLength={160}
                  className={inputClass}
                  type="email"
                  autoComplete="email"
                  dir="ltr"
                  placeholder="nom@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 items-start self-stretch h-fit">
              <label className={labelClass} htmlFor="mk-city">
                {f.city}
              </label>
              <input
                id="mk-city"
                maxLength={80}
                className={inputClass}
                placeholder={f.cityPh}
                autoComplete="address-level2"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <fieldset className="flex flex-col gap-2.5 items-start self-stretch h-fit">
              <legend className={`${labelClass} mb-2.5`}>
                {isClient ? f.servicesClient : f.servicesPro}
              </legend>
              <div className="grid grid-cols-2 gap-2.5 self-stretch sm:grid-cols-3">
                {SERVICES.map((value) => {
                  const checked = services.includes(value);
                  return (
                    <label
                      key={value}
                      className={`flex flex-row gap-2 items-center h-11 bg-white rounded-[10px] border py-2.5 px-3.5 cursor-pointer ${
                        checked ? "border-[#ffd000]" : "border-[#16181f]/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleService(value)}
                      />
                      <Check checked={checked} />
                      <span className="text-sm font-medium text-start text-[#16181f] leading-[1.43]">
                        {copy.services[value] ?? value}
                      </span>
                    </label>
                  );
                })}
              </div>
              {services.includes(OTHER) && (
                <div className="flex flex-col gap-1.5 self-stretch">
                  <label className={labelClass} htmlFor="mk-other-service">
                    {OTHER_TEXT[lang].label}
                  </label>
                  <input
                    id="mk-other-service"
                    className={inputClass}
                    type="text"
                    placeholder={OTHER_TEXT[lang].placeholder}
                    required
                    autoFocus
                    maxLength={otherMaxLength}
                    value={otherService}
                    onChange={(e) => setOtherService(e.target.value.slice(0, otherMaxLength))}
                  />
                </div>
              )}
              {errors.includes("services") && (
                <p className="text-xs font-medium text-[#b83e26]">{f.servicesError}</p>
              )}
            </fieldset>

            <div className="flex flex-col gap-1.5 items-start self-stretch h-fit">
              <div className="flex flex-row gap-1.5 items-center w-fit h-fit">
                <label className={labelClass} htmlFor="mk-details">
                  {isClient ? f.detailsClient : f.detailsPro}
                </label>
                <span className="text-xs font-normal text-start text-[#404653]/50 leading-normal">
                  {f.optional}
                </span>
              </div>
              <textarea
                id="mk-details"
                className={`${inputClass} h-[100px] py-3 resize-none`}
                placeholder={isClient ? f.detailsPhClient : f.detailsPhPro}
                maxLength={2000}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <label className="flex flex-row gap-2.5 items-start self-stretch h-fit cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span className="mt-[3px]">
                <Check checked={consent} />
              </span>
              <span className="text-xs font-normal text-start text-[#404653]/70 leading-relaxed flex-1">
                {f.consent}
                {errors.includes("consent") && (
                  <span className="block font-medium text-[#b83e26]">{f.consentError}</span>
                )}
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex flex-row gap-2 justify-center items-center self-stretch h-fit bg-[#ffd001] rounded-full py-3.5 px-6 text-sm font-semibold text-center text-black leading-normal shadow-[0px_1px_2px_-1px_rgb(0_0_0_/_0.1),_0px_1px_3px_0px_rgb(0_0_0_/_0.1)] hover:bg-[#f5c800] disabled:opacity-60"
            >
              {status === "sending"
                ? f.sending
                : `${isClient ? f.submitClient : f.submitPro} ${arrow}`}
            </button>

            {status === "error" && (
              <p
                className="self-stretch text-center text-xs font-medium text-[#b83e26]"
                role="alert"
              >
                {f.error}
              </p>
            )}

            <div className="flex flex-row justify-center items-start self-stretch h-fit">
              <p className="text-xs font-normal text-center text-[#404653]/50 leading-normal w-fit h-fit">
                {f.note}
              </p>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
