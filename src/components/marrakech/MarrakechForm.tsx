import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sendPreregistrationEmail } from "@/lib/notify.functions";
import { normalizeMoroccanPhone } from "@/lib/phone";

type Profile = "client" | "prestataire";

const SERVICES = ["Sécurité", "Nettoyage", "Jardinage", "Piscine", "Autre"];

const labelClass =
  "text-xs font-medium text-left text-[#404653] leading-normal tracking-wide w-fit h-fit";
const inputClass =
  "self-stretch h-11 bg-white rounded-[10px] border border-[#16181f]/10 py-2.5 px-3.5 text-sm text-[#16181f] leading-[1.57] placeholder:text-[#404653]/35 focus:outline-none focus:border-[#ffd000] focus:ring-2 focus:ring-[#ffd000]/40";

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
export default function MarrakechForm() {
  const [profile, setProfile] = useState<Profile>("client");
  const [fullName, setFullName] = useState("");
  const [when, setWhen] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Marrakech");
  const [services, setServices] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const isClient = profile === "client";

  const toggleService = (label: string) =>
    setServices((current) =>
      current.includes(label) ? current.filter((s) => s !== label) : [...current, label],
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
    const category = services.join(", ");
    const needDetails =
      [when.trim() && `Date/heure souhaitée : ${when.trim()}`, details.trim()]
        .filter(Boolean)
        .join("\n") || null;
    const { error } = await supabase.from("preregistrations").insert({
      full_name: fullName.trim(),
      phone: normalized,
      email: email.trim(),
      city: city.trim(),
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
        city: city.trim(),
        category,
        needDetails,
        source: "Page /marrakech",
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
          Je cherche un prestataire
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isClient}
          className={tabClass(!isClient)}
          onClick={() => setProfile("prestataire")}
        >
          Je suis prestataire
        </button>
      </div>

      {/* Form Card */}
      <div className="flex flex-col shrink-0 gap-8 items-start self-stretch h-fit bg-white/85 rounded-3xl shadow-[0px_18px_50px_-32px_rgb(20_23_29_/_0.55),_0px_0px_0px_1px_rgb(22_24_31_/_0.1)] backdrop-blur-lg p-6 sm:p-10 overflow-hidden">
        {status === "done" ? (
          <div className="self-stretch py-24 text-center" role="status">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#b83e26]">Reçu ✓</p>
            <p className="mt-3 text-[clamp(1.6rem,4vw,2rem)] font-black leading-tight tracking-tight text-[#16181f]">
              {isClient ? "On s'occupe de trouver vos pros." : "Bienvenue dans le réseau Page.ma."}
            </p>
            <p className="mt-3 text-base text-[#404653]">
              {isClient
                ? "On vous rappelle rapidement pour valider votre besoin."
                : "On vous contacte pour vérifier votre société avant le lancement."}
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
              <p className="text-xs font-normal text-left text-[#7f1e0b] leading-normal flex-1 h-fit">
                {isClient
                  ? "Pour les entreprises et particuliers : nous réunissons vos informations pour qualifier la demande et la transmettre aux bons professionnels de votre ville."
                  : "Pour les entreprises de services : présentez votre activité, nous vous recontactons pour valider votre profil avant le lancement."}
              </p>
            </div>

            <div className="grid gap-4 self-stretch sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 items-start flex-1 h-fit">
                <label className={labelClass} htmlFor="mk-name">
                  {isClient ? "NOM & PRÉNOM *" : "SOCIÉTÉ / CONTACT *"}
                </label>
                <input
                  id="mk-name"
                  className={inputClass}
                  placeholder={isClient ? "Prénom Nom" : "Nom de la société"}
                  autoComplete={isClient ? "name" : "organization"}
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5 items-start flex-1 h-fit">
                <div className="flex flex-row gap-1.5 items-center w-fit h-fit">
                  <label className={labelClass} htmlFor="mk-when">
                    {isClient ? "DATE/HEURE SOUHAITÉE" : "ZONE D'INTERVENTION"}
                  </label>
                  <span className="text-xs font-normal text-left text-[#404653]/50 leading-normal">
                    Optionnel
                  </span>
                </div>
                <input
                  id="mk-when"
                  className={inputClass}
                  placeholder={
                    isClient ? "Ex. : semaine prochaine, le matin" : "Ex. : Marrakech et environs"
                  }
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 self-stretch sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 items-start flex-1 h-fit">
                <label className={labelClass} htmlFor="mk-phone">
                  TÉLÉPHONE *
                </label>
                <input
                  id="mk-phone"
                  className={inputClass}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="06 XX XX XX XX"
                  required
                  value={phone}
                  aria-invalid={errors.includes("phone")}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.includes("phone") && (
                  <p className="text-xs font-medium text-[#b83e26]">
                    Numéro marocain attendu, ex. 06 12 34 56 78.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5 items-start flex-1 h-fit">
                <label className={labelClass} htmlFor="mk-email">
                  EMAIL *
                </label>
                <input
                  id="mk-email"
                  className={inputClass}
                  type="email"
                  autoComplete="email"
                  placeholder="nom@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 items-start self-stretch h-fit">
              <label className={labelClass} htmlFor="mk-city">
                VILLE *
              </label>
              <input
                id="mk-city"
                className={inputClass}
                placeholder="Saisissez votre ville"
                autoComplete="address-level2"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <fieldset className="flex flex-col gap-2.5 items-start self-stretch h-fit">
              <legend className={`${labelClass} mb-2.5`}>
                {isClient ? "SERVICES QUI VOUS INTÉRESSENT *" : "VOS ACTIVITÉS *"}
              </legend>
              <div className="grid grid-cols-2 gap-2.5 self-stretch sm:grid-cols-3">
                {SERVICES.map((label) => {
                  const checked = services.includes(label);
                  return (
                    <label
                      key={label}
                      className={`flex flex-row gap-2 items-center h-11 bg-white rounded-[10px] border py-2.5 px-3.5 cursor-pointer ${
                        checked ? "border-[#ffd000]" : "border-[#16181f]/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleService(label)}
                      />
                      <Check checked={checked} />
                      <span className="text-sm font-medium text-left text-[#16181f] leading-[1.43]">
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.includes("services") && (
                <p className="text-xs font-medium text-[#b83e26]">
                  Choisissez au moins un service.
                </p>
              )}
            </fieldset>

            <div className="flex flex-col gap-1.5 items-start self-stretch h-fit">
              <div className="flex flex-row gap-1.5 items-center w-fit h-fit">
                <label className={labelClass} htmlFor="mk-details">
                  {isClient ? "DÉCRIVEZ VOTRE BESOIN" : "DÉCRIVEZ VOTRE ACTIVITÉ"}
                </label>
                <span className="text-xs font-normal text-left text-[#404653]/50 leading-normal">
                  Optionnel
                </span>
              </div>
              <textarea
                id="mk-details"
                className={`${inputClass} h-[100px] py-3 resize-none`}
                placeholder={
                  isClient
                    ? "Localisation, fréquence, surface à traiter, équipes requises..."
                    : "Services proposés, taille de l'équipe, références..."
                }
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
              <span className="text-xs font-normal text-left text-[#404653]/70 leading-relaxed flex-1">
                J'accepte que les données collectées par Page.ma soient utilisées pour la mise en
                relation et conformément aux règles de confidentialité.
                {errors.includes("consent") && (
                  <span className="block font-medium text-[#b83e26]">
                    Merci de cocher cette case pour continuer.
                  </span>
                )}
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex flex-row gap-2 justify-center items-center self-stretch h-fit bg-[#ffd001] rounded-full py-3.5 px-6 text-sm font-semibold text-center text-black leading-normal shadow-[0px_1px_2px_-1px_rgb(0_0_0_/_0.1),_0px_1px_3px_0px_rgb(0_0_0_/_0.1)] hover:bg-[#f5c800] disabled:opacity-60"
            >
              {status === "sending"
                ? "Envoi…"
                : isClient
                  ? "Je veux recevoir des devis ↗"
                  : "Je rejoins Page.ma ↗"}
            </button>

            {status === "error" && (
              <p
                className="self-stretch text-center text-xs font-medium text-[#b83e26]"
                role="alert"
              >
                L'envoi n'a pas abouti. Vérifiez vos informations et réessayez.
              </p>
            )}

            <div className="flex flex-row justify-center items-start self-stretch h-fit">
              <p className="text-xs font-normal text-center text-[#404653]/50 leading-normal w-fit h-fit">
                Sans engagement. Vos données restent confidentielles et ne sont jamais revendues.
              </p>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
