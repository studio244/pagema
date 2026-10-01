import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /annuaire-ai; keep old links, ads (?h=b) and search results working.
export const Route = createFileRoute("/pro")({
  staticData: { sitemap: false },
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/annuaire-ai${location.searchStr}`, statusCode: 301 });
  },
});
