import { createFileRoute } from "@tanstack/react-router";
import NettoyageCasablancaPage from "@/components/cleaning/NettoyageCasablancaPage";
import { nettoyageHead } from "@/components/cleaning/route";

export const Route = createFileRoute("/nettoyage-casablanca")({
  staticData: { sitemap: true },
  head: () => nettoyageHead("fr"),
  component: () => <NettoyageCasablancaPage lang="fr" />,
});
