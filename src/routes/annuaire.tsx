import { createFileRoute } from "@tanstack/react-router";
import MarrakechPage from "@/components/marrakech/MarrakechPage";
import { marrakechHead } from "@/components/marrakech/route";

export const Route = createFileRoute("/annuaire")({
  staticData: { sitemap: false },
  head: () => marrakechHead("fr"),
  component: () => <MarrakechPage lang="fr" />,
});
