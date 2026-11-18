import { createFileRoute } from "@tanstack/react-router";
import AgencyDirectory from "@/components/agencies/AgencyDirectory";
import { directoryHead, validateServiceSearch } from "@/components/agencies/route";
import { fetchAgencies, fetchOfferings } from "@/lib/agencies";

export const Route = createFileRoute("/services/")({
  staticData: { sitemap: true },
  validateSearch: validateServiceSearch,
  loader: async () => ({agencies:await fetchAgencies(),offerings:await fetchOfferings()}),
  head: () => directoryHead("fr"),
  component: ServicesFr,
});

function ServicesFr() {
  const {agencies,offerings} = Route.useLoaderData();
  const search = Route.useSearch();
  return <AgencyDirectory lang="fr" agencies={agencies} service={search.service} offerings={offerings} filters={search} />;
}
