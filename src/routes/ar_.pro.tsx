import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /ar/annuaire-ai; keep old links, ads (?h=b) and search results working.
export const Route = createFileRoute("/ar_/pro")({
  staticData: { sitemap: false },
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/ar/annuaire-ai${location.searchStr}`, statusCode: 301 });
  },
});
