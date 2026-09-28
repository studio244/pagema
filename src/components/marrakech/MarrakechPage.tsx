import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";
import Pagema from "./Pagema";

export default function MarrakechPage({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div className="marrakech-lp overflow-x-clip">
      <Pagema lang={lang} />
    </div>
  );
}
