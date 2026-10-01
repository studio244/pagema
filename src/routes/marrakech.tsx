import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /annuaire; keep old links and search results working.
export const Route = createFileRoute("/marrakech")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/annuaire", statusCode: 301 });
  },
});
