import { createFileRoute, notFound } from "@tanstack/react-router";
import AgencyDetail from "@/components/agencies/AgencyDetail";
import { agencyHead } from "@/components/agencies/route";
import { fetchAgency, fetchContactCount } from "@/lib/agencies";

export const Route = createFileRoute("/services/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const [agency, contacts] = await Promise.all([
      fetchAgency(params.slug),
      fetchContactCount(params.slug),
    ]);
    if (!agency) throw notFound();
    return { agency, contacts };
  },
  head: ({ loaderData }) => agencyHead("fr", loaderData?.agency),
  component: AgencyFr,
});

function AgencyFr() {
  const { agency, contacts } = Route.useLoaderData();
  return <AgencyDetail lang="fr" agency={agency} contacts={contacts} />;
}
