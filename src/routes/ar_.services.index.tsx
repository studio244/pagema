import { createFileRoute } from "@tanstack/react-router";
import AgencyDirectory from "@/components/agencies/AgencyDirectory";
import { directoryHead, validateServiceSearch } from "@/components/agencies/route";
import { fetchAgencies, fetchOfferings } from "@/lib/agencies";

// "ar_" keeps this page out of the /ar homepage layout: the URL is /ar/services.
export const Route = createFileRoute("/ar_/services/")({
  staticData: { sitemap: true },
  validateSearch: validateServiceSearch,
  loader: async () => ({agencies:await fetchAgencies(),offerings:await fetchOfferings()}),
  head: () => directoryHead("ar"),
  component: ServicesAr,
});

function ServicesAr() {
  const {agencies,offerings} = Route.useLoaderData();
  const search = Route.useSearch();
  return <AgencyDirectory lang="ar" agencies={agencies} service={search.service} offerings={offerings} filters={search} />;
}
