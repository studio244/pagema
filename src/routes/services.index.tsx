import { createFileRoute } from "@tanstack/react-router";
import AgencyDirectory from "@/components/agencies/AgencyDirectory";
import { directoryHead, validateServiceSearch } from "@/components/agencies/route";
import { fetchAgencies } from "@/lib/agencies";

export const Route = createFileRoute("/services/")({
  staticData: { sitemap: true },
  validateSearch: validateServiceSearch,
  loader: () => fetchAgencies(),
  head: () => directoryHead("fr"),
  component: ServicesFr,
});

function ServicesFr() {
  const agencies = Route.useLoaderData();
  const { service } = Route.useSearch();
  return <AgencyDirectory lang="fr" agencies={agencies} service={service} />;
}
