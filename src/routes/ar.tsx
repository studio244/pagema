import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/home/HomePage";
import { homeHead } from "@/components/home/seo";

export const Route = createFileRoute("/ar")({
  staticData: { sitemap: true },
  head: () => homeHead("ar"),
  component: () => <HomePage lang="ar" />,
});
