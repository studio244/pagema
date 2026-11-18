import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";
import Pagema from "./Pagema";
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function MarrakechPage({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div className="marrakech-lp overflow-x-clip">
      <Pagema lang={lang} />
      <div className="brand-v2 border-t border-ink/20 bg-paper px-5 py-8 text-center">
        <Button asChild variant="outline"><Link to={lang==='ar'?'/ar/services':'/services'} search={{service:'Assurance',city:'Marrakech'}}>{lang==='ar'?'وكالات التأمين في مراكش':'Agences d’assurance à Marrakech'}</Link></Button>
      </div>
    </div>
  );
}
