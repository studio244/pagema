import { createFileRoute } from "@tanstack/react-router";
import ProLanding from "@/components/pro/ProLanding";
import { proHead, validateProSearch } from "@/components/pro/route";

export const Route = createFileRoute("/annuaire-ai")({
  staticData: { sitemap: true },
  validateSearch: validateProSearch,
  head: () => proHead("fr"),
  component: ProFr,
});

function ProFr() {
  const { h } = Route.useSearch();
  return <ProLanding lang="fr" variant={h === "b" ? "b" : "a"} />;
}
