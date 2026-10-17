import { createFileRoute } from "@tanstack/react-router";
import PartnerBenefitsPage from "@/components/partner-benefits/PartnerBenefitsPage";
import { partnerBenefitsHead } from "@/components/partner-benefits/route";

export const Route = createFileRoute("/avantages-partenaires")({
  staticData: { sitemap: true },
  head: () => partnerBenefitsHead("fr"),
  component: () => <PartnerBenefitsPage lang="fr" />,
});