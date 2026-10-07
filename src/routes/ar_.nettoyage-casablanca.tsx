import { createFileRoute } from "@tanstack/react-router";
import NettoyageCasablancaPage from "@/components/cleaning/NettoyageCasablancaPage";
import { nettoyageHead } from "@/components/cleaning/route";

// "ar_" keeps this page out of the /ar homepage layout: the URL is /ar/nettoyage-casablanca.
export const Route = createFileRoute("/ar_/nettoyage-casablanca")({
  staticData: { sitemap: true },
  head: () => nettoyageHead("ar"),
  component: () => <NettoyageCasablancaPage lang="ar" />,
});
