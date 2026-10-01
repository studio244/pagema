/**
 * Class sets for the shared sign-up forms (homepage/pro and /annuaire).
 * "zine": the Page.ma ink-and-paper look. "marrakech": the white/yellow look of the /annuaire page.
 */
export type FormSkinName = "zine" | "marrakech";

export type FormSkin = {
  card: string;
  stamp: boolean;
  accent: string;
  header: string;
  title: string;
  label: string;
  input: string;
  select: string;
  hint: string;
  button: string;
  error: string;
  footnote: string;
  done: string;
  doneTag: string;
  doneTitle: string;
  doneBody: string;
};

const zine: FormSkin = {
  card: "relative border-2 border-ink bg-paper-deep p-6 sm:p-7 shadow-cut",
  stamp: true,
  accent: "text-terra",
  header: "font-mono text-[11px] leading-none uppercase tracking-[0.15em] text-ink-soft",
  title: "font-display text-2xl leading-tight tracking-tight",
  label: "block font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-1",
  input:
    "w-full bg-transparent border-2 border-ink px-3 py-2.5 text-sm placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-terra/50",
  select:
    "w-full bg-transparent border-2 border-ink px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terra/50",
  hint: "mt-1 font-mono text-[10px] leading-relaxed text-ink-soft",
  button:
    "w-full inline-flex items-center justify-center bg-terra text-paper border-2 border-ink font-display text-xl leading-none tracking-tight py-4 mt-2 lift disabled:opacity-60",
  error: "text-sm text-terra-deep text-center font-medium",
  footnote: "text-center font-mono text-[10px] uppercase tracking-wide text-ink-soft",
  done: "border-2 border-ink bg-paper px-4 py-8 text-center",
  doneTag: "font-mono text-[11px] uppercase tracking-wide text-terra-deep font-medium",
  doneTitle: "mt-2 font-display text-2xl tracking-tight",
  doneBody: "mt-2 text-sm text-ink-soft",
};

const marrakechInput =
  "w-full bg-white rounded-[10px] border border-[#16181f]/10 py-2.5 px-3.5 text-sm text-[#16181f] leading-[1.57] placeholder:text-[#404653]/35 focus:outline-none focus:border-[#ffd000] focus:ring-2 focus:ring-[#ffd000]/40";

const marrakech: FormSkin = {
  card: "relative bg-white/85 rounded-3xl shadow-[0px_18px_50px_-32px_rgb(20_23_29_/_0.55),_0px_0px_0px_1px_rgb(22_24_31_/_0.1)] backdrop-blur-lg p-6 sm:p-10 text-[#16181f]",
  stamp: false,
  accent: "text-[#e0b400]",
  header: "text-xs font-medium uppercase tracking-[1.76px] text-[#404653]/70",
  title: "text-2xl font-black leading-tight tracking-tight",
  label: "block text-xs font-medium text-[#404653] tracking-wide mb-1.5",
  input: marrakechInput,
  select: marrakechInput,
  hint: "mt-1.5 text-xs leading-relaxed text-[#404653]/70",
  button:
    "w-full inline-flex items-center justify-center rounded-full bg-[#ffd001] py-3.5 px-6 mt-2 text-sm font-semibold text-black shadow-[0px_1px_2px_-1px_rgb(0_0_0_/_0.1),_0px_1px_3px_0px_rgb(0_0_0_/_0.1)] hover:bg-[#f5c800] disabled:opacity-60",
  error: "text-xs text-[#b83e26] text-center font-medium",
  footnote: "text-center text-xs text-[#404653]/50",
  done: "py-16 text-center",
  doneTag: "text-xs font-semibold uppercase tracking-wide text-[#b83e26]",
  doneTitle: "mt-3 text-[clamp(1.6rem,4vw,2rem)] font-black leading-tight tracking-tight",
  doneBody: "mt-3 text-base text-[#404653]",
};

export const FORM_SKINS: Record<FormSkinName, FormSkin> = { zine, marrakech };
