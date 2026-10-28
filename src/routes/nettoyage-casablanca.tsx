import { createFileRoute } from "@tanstack/react-router";
import NettoyageCasablancaPage from "@/components/cleaning/NettoyageCasablancaPage";
import { fetchCasablancaCleaners, nettoyageHead } from "@/components/cleaning/route";

export const Route = createFileRoute("/nettoyage-casablanca")({
  staticData: { sitemap: true },
  loader: () => fetchCasablancaCleaners(),
  head: () => nettoyageHead("fr"),
  component: NettoyageFr,
});

function NettoyageFr() {
  return <NettoyageCasablancaPage lang="fr" agencies={Route.useLoaderData()} />;
}
