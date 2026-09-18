import { createFileRoute } from "@tanstack/react-router";

const RESEND_API = "https://api.resend.com";
const DOMAIN = "page.ma";

async function resendFetch(path: string, init?: RequestInit) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) throw new Error("RESEND_API_KEY manquant");
  const response = await fetch(`${RESEND_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Resend [${response.status}]: ${body}`);
  }
  return JSON.parse(body);
}

export const Route = createFileRoute("/api/resend-domain")({
  server: {
    handlers: {
      // GET: current verification status + DNS records
      GET: async () => {
        const { data: domains } = await resendFetch("/domains");
        const domain = (domains ?? []).find(
          (d: { name?: string }) => d.name === DOMAIN,
        );
        if (!domain) {
          return Response.json({ registered: false, domain: DOMAIN });
        }
        const details = await resendFetch(`/domains/${domain.id}`);
        return Response.json({ registered: true, ...details });
      },
      // POST: register the domain (or trigger verification if it exists)
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const { data: domains } = await resendFetch("/domains");
        let domain = (domains ?? []).find(
          (d: { name?: string }) => d.name === DOMAIN,
        );
        if (!domain) {
          domain = await resendFetch("/domains", {
            method: "POST",
            body: JSON.stringify({ name: DOMAIN }),
          });
        }
        if (body?.action === "verify") {
          await resendFetch(`/domains/${domain.id}/verify`, { method: "POST" });
        }
        const details = await resendFetch(`/domains/${domain.id}`);
        return Response.json({ registered: true, ...details });
      },
    },
  },
});
