import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Pagema from "@/components/marrakech/Pagema";

export const Route = createFileRoute("/marrakech")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Page.ma Marrakech — Trouvez le bon service à Marrakech" },
      {
        name: "description",
        content:
          "Sécurité, nettoyage, jardinage, piscine : Page.ma met en relation clients et entreprises de services vérifiées à Marrakech.",
      },
      { property: "og:title", content: "Page.ma Marrakech — Trouvez le bon service" },
      {
        property: "og:description",
        content:
          "Mise en relation avec des entreprises de services vérifiées à Marrakech. Inscription gratuite, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Fraunces:wght@400;600;700&display=swap",
      },
    ],
  }),
  component: MarrakechPage,
});

function MarrakechPage() {
  useEffect(() => {
    document.documentElement.lang = "fr";
    document.documentElement.dir = "ltr";
  }, []);

  return (
    <div className="marrakech-lp overflow-x-clip">
      <Pagema />
    </div>
  );
}
