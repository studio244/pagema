import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /ar/annuaire; keep old links and search results working.
export const Route = createFileRoute("/ar_/marrakech")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/ar/annuaire", statusCode: 301 });
  },
});
