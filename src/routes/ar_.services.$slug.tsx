import { createFileRoute, notFound } from "@tanstack/react-router";
import AgencyDetail from "@/components/agencies/AgencyDetail";
import { agencyHead } from "@/components/agencies/route";
import { fetchAgency } from "@/lib/agencies";

export const Route = createFileRoute("/ar_/services/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const agency = await fetchAgency(params.slug);
    if (!agency) throw notFound();
    return agency;
  },
  head: ({ loaderData }) => agencyHead("ar", loaderData),
  component: AgencyAr,
});

function AgencyAr() {
  return <AgencyDetail lang="ar" agency={Route.useLoaderData()} />;
}
