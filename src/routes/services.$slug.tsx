import { createFileRoute, notFound } from "@tanstack/react-router";
import AgencyDetail from "@/components/agencies/AgencyDetail";
import { agencyHead } from "@/components/agencies/route";
import { fetchAgency } from "@/lib/agencies";

export const Route = createFileRoute("/services/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const agency = await fetchAgency(params.slug);
    if (!agency) throw notFound();
    return agency;
  },
  head: ({ loaderData }) => agencyHead("fr", loaderData),
  component: AgencyFr,
});

function AgencyFr() {
  return <AgencyDetail lang="fr" agency={Route.useLoaderData()} />;
}
