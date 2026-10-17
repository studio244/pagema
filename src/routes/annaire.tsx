import { createFileRoute, redirect } from "@tanstack/react-router";

// Old misspelled address; keep existing links and search results working.
export const Route = createFileRoute("/annaire")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/annuaire", statusCode: 301 });
  },
});
