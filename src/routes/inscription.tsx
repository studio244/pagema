import { createFileRoute } from "@tanstack/react-router";
import SignupPage from "@/components/signup/SignupPage";
import { signupHead } from "@/components/signup/route";

export const Route = createFileRoute("/inscription")({
  staticData: { sitemap: false },
  head: () => signupHead("fr"),
  component: () => <SignupPage lang="fr" />,
});
