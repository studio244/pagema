import { createFileRoute } from "@tanstack/react-router";
import AgencyDirectory from "@/components/agencies/AgencyDirectory";
import { directoryHead, validateServiceSearch } from "@/components/agencies/route";
import { fetchAgencies } from "@/lib/agencies";

// "ar_" keeps this page out of the /ar homepage layout: the URL is /ar/services.
export const Route = createFileRoute("/ar_/services/")({
  staticData: { sitemap: true },
  validateSearch: validateServiceSearch,
  loader: () => fetchAgencies(),
  head: () => directoryHead("ar"),
  component: ServicesAr,
});

function ServicesAr() {
  const agencies = Route.useLoaderData();
  const { service } = Route.useSearch();
  return <AgencyDirectory lang="ar" agencies={agencies} service={service} />;
}
