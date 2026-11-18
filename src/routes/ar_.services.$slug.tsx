import { createFileRoute, notFound } from "@tanstack/react-router";
import AgencyDetail from "@/components/agencies/AgencyDetail";
import { agencyHead } from "@/components/agencies/route";
import { fetchAgency, fetchContactCount, fetchOfferings } from "@/lib/agencies";

export const Route = createFileRoute("/ar_/services/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const [agency, contacts] = await Promise.all([
      fetchAgency(params.slug),
      fetchContactCount(params.slug),
    ]);
    if (!agency) throw notFound();
    return { agency, contacts, offerings:await fetchOfferings() };
  },
  head: ({ loaderData }) => agencyHead("ar", loaderData?.agency),
  component: AgencyAr,
});

function AgencyAr() {
  const { agency, contacts, offerings } = Route.useLoaderData();
  return <AgencyDetail lang="ar" agency={agency} contacts={contacts} offeringCatalog={offerings} />;
}
