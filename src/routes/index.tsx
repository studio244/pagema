import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/home/HomePage";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Page.ma — Le bon prestataire, vérifié et proche de vous" },
      {
        name: "description",
        content:
          "Décrivez votre besoin, Page.ma le qualifie par téléphone et vous envoie jusqu'à 3 devis de professionnels vérifiés. Sécurité, nettoyage, intérim, assurance — dans 25 villes du Maroc. Pré-inscrivez-vous.",
      },
      {
        property: "og:title",
        content: "Page.ma — Le bon prestataire, vérifié et proche de vous",
      },
      {
        property: "og:description",
        content:
          "Jusqu'à 3 devis de pros vérifiés pour la sécurité, le nettoyage, l'intérim et l'assurance. Gratuit, sans compte, sans spam.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_MA" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "alternate", hrefLang: "fr", href: "https://page.ma/" },
      { rel: "alternate", hrefLang: "ar", href: "https://page.ma/ar" },
      { rel: "alternate", hrefLang: "x-default", href: "https://page.ma/" },
    ],
  }),
  component: () => <HomePage lang="fr" />,
});
