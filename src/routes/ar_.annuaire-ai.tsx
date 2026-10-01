import { createFileRoute } from "@tanstack/react-router";
import ProLanding from "@/components/pro/ProLanding";
import { proHead, validateProSearch } from "@/components/pro/route";

// "ar_" keeps this page out of the /ar homepage layout: the URL is /ar/annuaire-ai.
export const Route = createFileRoute("/ar_/annuaire-ai")({
  staticData: { sitemap: true },
  validateSearch: validateProSearch,
  head: () => proHead("ar"),
  component: ProAr,
});

function ProAr() {
  const { h } = Route.useSearch();
  return <ProLanding lang="ar" variant={h === "b" ? "b" : "a"} />;
}
