import { createFileRoute } from "@tanstack/react-router";
import MarrakechPage from "@/components/marrakech/MarrakechPage";
import { marrakechHead } from "@/components/marrakech/route";

// "ar_" keeps this page out of the /ar homepage layout: the URL is /ar/annuaire.
export const Route = createFileRoute("/ar_/annuaire")({
  staticData: { sitemap: false },
  head: () => marrakechHead("ar"),
  component: () => <MarrakechPage lang="ar" />,
});
