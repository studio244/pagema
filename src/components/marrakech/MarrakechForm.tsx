import { useEffect, useRef, useState } from "react";
import { DICTS, LangContext, type Lang } from "@/lib/i18n";
import { getProLaunchStats, type ProLaunchStats } from "@/lib/pro.functions";
import { PreregistrationForm, type Profile } from "@/components/home/PreregistrationForm";
import { ProForm } from "@/components/pro/ProForm";
import { PRO_COPY } from "@/components/pro/copy";
import type { Labels } from "@/components/pro/places";
import { MARRAKECH_COPY } from "./copy";

const TAB_EVENT = "marrakech:signup-tab";

/** Switches the sign-up form to a tab; used by links pointing at #inscription. */
export function selectSignupTab(profile: Profile) {
  window.dispatchEvent(new CustomEvent<Profile>(TAB_EVENT, { detail: profile }));
}

/** /annuaire sign-up: the homepage client form and the /pro provider form, behind a toggle. */
export default function MarrakechForm({ lang }: { lang: Lang }) {
  const f = MARRAKECH_COPY[lang].form;
  const dict = DICTS[lang];
  const labels: Labels = {
    copy: PRO_COPY[lang],
    category: (c) => dict.categoryLabels[c] ?? c,
    city: (c) => dict.cityLabels[c] ?? c,
  };
  const [profile, setProfile] = useState<Profile>("client");
  const [stats, setStats] = useState<ProLaunchStats | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const page = lang === "ar" ? "/ar/annuaire" : "/annuaire";

  useEffect(() => {
    getProLaunchStats()
      .then(setStats)
      .catch((error: unknown) => console.warn("pro stats unavailable", error));
  }, []);

  useEffect(() => {
    const onTab = (e: Event) => setProfile((e as CustomEvent<Profile>).detail);
    window.addEventListener(TAB_EVENT, onTab);
    return () => window.removeEventListener(TAB_EVENT, onTab);
  }, []);

  const tabClass = (active: boolean) =>
    `flex flex-row justify-center items-center text-center min-h-10 rounded-full py-2 px-3 sm:px-5 text-sm font-medium leading-tight ${
      active
        ? "bg-[#ffd000] text-black shadow-[0px_1px_2px_-1px_rgb(0_0_0_/_0.1),_0px_1px_3px_0px_rgb(0_0_0_/_0.1)]"
        : "text-[#404653] hover:text-black"
    }`;

  return (
    <LangContext.Provider value={{ lang, t: dict, setLang: () => {} }}>
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <div
          className="grid w-full max-w-md grid-cols-2 items-stretch gap-1 bg-[#16181f]/5 rounded-[26px] p-1 sm:flex sm:w-fit sm:max-w-none sm:rounded-full"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={profile === "client"}
            className={tabClass(profile === "client")}
            onClick={() => setProfile("client")}
          >
            {f.tabClient}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={profile === "prestataire"}
            className={tabClass(profile === "prestataire")}
            onClick={() => setProfile("prestataire")}
          >
            {f.tabPro}
          </button>
        </div>

        {profile === "client" ? (
          <div className="w-full">
            <PreregistrationForm
              profile="client"
              skin="marrakech"
              defaultCity="Marrakech"
              source={`Page ${page}`}
            />
          </div>
        ) : (
          <ProForm
            lang={lang}
            stats={stats}
            labels={labels}
            phoneRef={phoneRef}
            withContact
            skin="marrakech"
            className="w-full"
            source={`Page ${page}`}
          />
        )}
      </div>
    </LangContext.Provider>
  );
}
