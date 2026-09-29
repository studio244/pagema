import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/home/HomePage";
import { homeHead } from "@/components/home/seo";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => homeHead("fr"),
  component: () => <HomePage lang="fr" />,
});
