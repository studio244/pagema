import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Pagema from "@/components/marrakech/Pagema";

export const Route = createFileRoute("/marrakech")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Page.ma Marrakech — Trouvez le bon service à Marrakech" },
      { name: "description", content: "Sécurité, nettoyage, intérim, assurance : Page.ma met en relation clients et entreprises de services vérifiées à Marrakech." },
      { property: "og:title", content: "Page.ma Marrakech — Trouvez le bon service" },
      { property: "og:description", content: "Mise en relation avec des entreprises de services vérifiées à Marrakech. Inscription gratuite, sans engagement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Fraunces:wght@400;600;700&display=swap" },
    ],
  }),
  component: MarrakechPage,
});

const DESIGN_WIDTH = 1440;

function MarrakechPage() {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const s = Math.min(1, window.innerWidth / DESIGN_WIDTH);
      setScale(s);
      if (innerRef.current) setHeight(innerRef.current.offsetHeight * s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="marrakech-lp w-full overflow-x-hidden bg-white" style={{ height }}>
      <div
        ref={innerRef}
        style={{ width: DESIGN_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left", marginInline: scale === 1 ? "auto" : undefined }}
      >
        <Pagema />
      </div>
    </div>
  );
}
