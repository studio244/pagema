import { useState } from "react";
import { useT } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { sendPreregistrationEmail } from "@/lib/notify.functions";
import { OTHER, OTHER_MAX_LENGTH, OTHER_TEXT, withOther } from "@/lib/other-service";
import { CATEGORIES, COVERAGE_CITIES, INVESTMENT, REAL_ESTATE } from "@/lib/catalog";
import stampAsset from "@/assets/pagema-app-icon.png";
import { FORM_SKINS, type FormSkinName } from "@/components/form-skin";

const STAMP_URL = stampAsset;

const HEALTH_ENTITIES = ["Groupe de santé", "Clinique", "Centre de soins / diagnostic"];

const REAL_ESTATE_INTENTS = [
  "Acheter un bien",
  "Vendre un bien",
  "Louer un bien",
  "Gestion locative / conciergerie",
];

const INVESTMENT_INTENTS = [
  "Investir (rendement locatif)",
  "Acheter pour revendre",
  "Projet de promotion immobilière",
  "Terrain / foncier",
  "Investissement en société / participation",
];

const TEAM_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"];

export type Profile = "client" | "prestataire";

/** Pre-registration form (client or provider), shared by the homepage and /annuaire. Needs a LangContext provider. */
export function PreregistrationForm({
  profile,
  source,
  skin = "zine",
  defaultCity = "",
  defaultCategory = CATEGORIES[0]!,
}: {
  profile: Profile;
  /** Preselected city (French value from COVERAGE_CITIES); empty shows the placeholder. */
  defaultCity?: string;
  /** Preselected trade (French value from CATEGORIES); defaults to the first one. */
  defaultCategory?: string;
  /** Visual style; the form content is the same. */
  skin?: FormSkinName;
  /** Shown in the notification email, e.g. "Page /annuaire". */
  source?: string;
}) {
  const { t, lang } = useT();
  const f = t.form;
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [category, setCategory] = useState<string>(defaultCategory);
  const [otherService, setOtherService] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [teamSize, setTeamSize] = useState<string>(TEAM_SIZES[0]!);
  const [needDetails, setNeedDetails] = useState("");
  const [healthEntity, setHealthEntity] = useState<string>(HEALTH_ENTITIES[0]!);
  const [realEstateIntent, setRealEstateIntent] = useState<string>(REAL_ESTATE_INTENTS[0]!);

  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const s = FORM_SKINS[skin];
  const inputClass = s.input;
  const selectClass = s.select;
  const labelClass = s.label;

  const isHealth = profile === "prestataire" && category === "Santé";
  const isInvestment = category === INVESTMENT;
  const isRealEstate = category === REAL_ESTATE || isInvestment;
  const intentOptions = isInvestment ? INVESTMENT_INTENTS : REAL_ESTATE_INTENTS;
  const intentValue = intentOptions.includes(realEstateIntent)
    ? realEstateIntent
    : intentOptions[0]!;
  const idPrefix = profile;

  function resetForm() {
    setFullName("");
    setPhone("");
    setEmail("");
    setCity(defaultCity);
    setCategory(defaultCategory);
    setOtherService("");
    setCompanyName("");
    setTeamSize(TEAM_SIZES[0]!);
    setNeedDetails("");
    setHealthEntity(HEALTH_ENTITIES[0]!);
    setRealEstateIntent(REAL_ESTATE_INTENTS[0]!);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const payload = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      category: withOther(category, otherService),
      profile,
      company_name: profile === "prestataire" ? companyName.trim() || null : null,
      team_size: profile === "prestataire" ? teamSize : null,
      need_details: profile === "client" ? needDetails.trim() || null : null,
      health_entity_type: isHealth ? healthEntity : null,
      real_estate_intent: isRealEstate ? intentValue : null,
    };
    const { error } = await supabase.from("preregistrations").insert(payload);
    if (error) {
      setStatus("error");
      return;
    }

    try {
      await sendPreregistrationEmail({
        data: {
          profile,
          fullName: payload.full_name,
          phone: payload.phone,
          email: payload.email,
          city: payload.city,
          category: payload.category,
          companyName: payload.company_name,
          teamSize: payload.team_size,
          needDetails: payload.need_details,
          healthEntityType: payload.health_entity_type,
          realEstateIntent: payload.real_estate_intent,
          source,
        },
      });
    } catch (emailError) {
      console.error(emailError);
      setStatus("error");
      return;
    }

    resetForm();
    setStatus("done");
  }

  return (
    <div>
      <div className={s.card}>
        {s.stamp && (
          <span className="absolute -top-3 -right-3 w-14 h-14 stamp" aria-hidden="true">
            <img
              src={STAMP_URL}
              alt=""
              className="w-full h-full object-cover rounded-lg border-2 border-ink shadow-cut"
            />
          </span>
        )}
        <div className="flex items-center gap-2.5 mb-6">
          <svg
            className={`${s.accent} w-6 h-6 shrink-0`}
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path className="drawl" d="M6 24 C 14 10, 26 10, 34 18" />
            <path className="drawl" d="M34 18 l -6 -1 M34 18 l -1 -6" />
          </svg>
          <p className={s.header}>
            {f.title[profile]} · {f.free}
          </p>
        </div>

        {status === "done" ? (
          <div className={s.done}>
            <span className={s.doneTag}>
              {f.received}
            </span>
            <p className={s.doneTitle}>
              {profile === "client"
                ? isRealEstate
                  ? f.doneClientRE
                  : f.doneClient
                : f.donePro}
            </p>
            <p className={s.doneBody}>
              {profile === "client"
                ? isRealEstate
                  ? isInvestment
                    ? f.doneInvestBody
                    : f.doneREBody
                  : f.doneClientBody
                : f.doneProBody}
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {profile === "prestataire" && (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-company`}>
                  {f.company}
                </label>
                <input
                  id={`${idPrefix}-company`}
                  maxLength={120}
                  className={inputClass}
                  placeholder={f.companyPh}
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className={labelClass} htmlFor={`${idPrefix}-name`}>
                {profile === "client" ? f.yourName : f.contact}
              </label>
              <input
                id={`${idPrefix}-name`}
                maxLength={120}
                className={inputClass}
                placeholder={f.namePh}
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-phone`}>
                  {f.phone}
                </label>
                <input
                  id={`${idPrefix}-phone`}
                  maxLength={40}
                  minLength={6}
                  className={inputClass}
                  placeholder="06…"
                  type="tel"
                  dir="ltr"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-email`}>
                  {f.email}
                </label>
                <input
                  id={`${idPrefix}-email`}
                  maxLength={160}
                  className={inputClass}
                  placeholder={profile === "client" ? "vous@email.ma" : "contact@societe.ma"}
                  type="email"
                  dir="ltr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-city`}>
                  {f.city}
                </label>
                <select
                  id={`${idPrefix}-city`}
                  className={selectClass}
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="" disabled>
                    {f.cityPh}
                  </option>
                  {COVERAGE_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {t.cityLabels[c] ?? c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-category`}>
                  {profile === "client" ? f.serviceWanted : f.yourTrade}
                </label>
                <select
                  id={`${idPrefix}-category`}
                  className={selectClass}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {t.categoryLabels[c] ?? c}
                    </option>
                  ))}
                  <option value={OTHER}>{OTHER_TEXT[lang].option}</option>
                </select>
                {category === OTHER && (
                  <input
                    id={`${idPrefix}-category-other`}
                    className={`${inputClass} mt-2`}
                    type="text"
                    placeholder={OTHER_TEXT[lang].placeholder}
                    aria-label={OTHER_TEXT[lang].label}
                    required
                    autoFocus
                    maxLength={OTHER_MAX_LENGTH}
                    value={otherService}
                    onChange={(e) => setOtherService(e.target.value)}
                  />
                )}
              </div>
            </div>

            {isHealth && (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-health`}>
                  {f.healthType}
                </label>
                <select
                  id={`${idPrefix}-health`}
                  className={selectClass}
                  value={healthEntity}
                  onChange={(e) => setHealthEntity(e.target.value)}
                >
                  {HEALTH_ENTITIES.map((h, i) => (
                    <option key={h} value={h}>
                      {t.lists.health[i] ?? h}
                    </option>
                  ))}
                </select>
                <p className={s.hint}>
                  {f.healthNote}
                </p>
              </div>
            )}

            {isRealEstate && (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-realestate`}>
                  {profile === "client"
                    ? isInvestment
                      ? f.investProject
                      : f.reProject
                    : isInvestment
                      ? f.investSpec
                      : f.reSpec}
                </label>
                <select
                  id={`${idPrefix}-realestate`}
                  className={selectClass}
                  value={intentValue}
                  onChange={(e) => setRealEstateIntent(e.target.value)}
                >
                  {intentOptions.map((r, i) => (
                    <option key={r} value={r}>
                      {(isInvestment ? t.lists.investment : t.lists.realEstate)[i] ?? r}
                    </option>
                  ))}
                </select>
                <p className={s.hint}>
                  {isInvestment
                    ? f.investNote
                    : f.reNote}
                </p>
              </div>
            )}

            {profile === "prestataire" ? (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-team`}>
                  {f.team}
                </label>
                <select
                  id={`${idPrefix}-team`}
                  className={selectClass}
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                >
                  {TEAM_SIZES.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-need`}>
                  {isRealEstate
                    ? f.projectOpt
                    : f.needOpt}
                </label>
                <textarea
                  id={`${idPrefix}-need`}
                  rows={3}
                  className={inputClass}
                  placeholder={
                    isRealEstate
                      ? f.projectPh
                      : f.needPh
                  }
                  value={needDetails}
                  onChange={(e) => setNeedDetails(e.target.value)}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={s.button}
            >
              {status === "sending"
                ? f.sending
                : profile === "client"
                  ? isRealEstate
                    ? f.submitRE
                    : f.submitClient
                  : f.submitPro}
            </button>
            {status === "error" && (
              <p className={s.error}>
                {f.error}
              </p>
            )}
            <p className={s.footnote}>
              {f.footnote}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
