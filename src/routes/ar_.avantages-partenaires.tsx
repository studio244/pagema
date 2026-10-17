import { createFileRoute } from "@tanstack/react-router";
import PartnerBenefitsPage from "@/components/partner-benefits/PartnerBenefitsPage";
import { partnerBenefitsHead } from "@/components/partner-benefits/route";

export const Route = createFileRoute("/ar_/avantages-partenaires")({
  staticData: { sitemap: true },
  head: () => partnerBenefitsHead("ar"),
  component: () => <PartnerBenefitsPage lang="ar" />,
});