import { createFileRoute } from "@tanstack/react-router";
import SignupPage from "@/components/signup/SignupPage";
import { signupHead } from "@/components/signup/route";

// "ar_" keeps this page out of the /ar homepage layout: the URL is /ar/inscription.
export const Route = createFileRoute("/ar_/inscription")({
  staticData: { sitemap: false },
  head: () => signupHead("ar"),
  component: () => <SignupPage lang="ar" />,
});
