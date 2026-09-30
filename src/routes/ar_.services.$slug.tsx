import { createFileRoute, notFound } from "@tanstack/react-router";
import AgencyDetail from "@/components/agencies/AgencyDetail";
import { agencyHead } from "@/components/agencies/route";
import { fetchAgency, fetchContactCount } from "@/lib/agencies";

export const Route = createFileRoute("/ar_/services/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const [agency, contacts] = await Promise.all([
      fetchAgency(params.slug),
      fetchContactCount(params.slug),
    ]);
    if (!agency) throw notFound();
    return { agency, contacts };
  },
  head: ({ loaderData }) => agencyHead("ar", loaderData?.agency),
  component: AgencyAr,
});

function AgencyAr() {
  const { agency, contacts } = Route.useLoaderData();
  return <AgencyDetail lang="ar" agency={agency} contacts={contacts} />;
}
