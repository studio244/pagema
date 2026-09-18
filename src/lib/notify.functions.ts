import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const payloadSchema = z.object({
  profile: z.enum(["client", "prestataire"]),
  fullName: z.string().min(1).max(120),
  phone: z.string().min(1).max(40),
  email: z.string().email().max(160),
  city: z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  companyName: z.string().max(120).nullish(),
  teamSize: z.string().max(40).nullish(),
  needDetails: z.string().max(2000).nullish(),
  healthEntityType: z.string().max(80).nullish(),
  realEstateIntent: z.string().max(120).nullish(),
});

function row(label: string, value: string | null | undefined): string {
  if (!value) return "";
  return `<tr>
  <td style="padding:6px 12px 6px 0;font-weight:600;color:#1d3b2a;vertical-align:top;white-space:nowrap;">${label}</td>
  <td style="padding:6px 0;color:#222;">${value.replace(/</g, "&lt;")}</td>
</tr>`;
}

export const sendPreregistrationEmail = createServerFn({ method: "POST" })
  .inputValidator((data) => payloadSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const to = process.env["CONTACT_EMAIL_TO"];
    const from = process.env["CONTACT_EMAIL_FROM"];
    if (!apiKey || !to || !from) {
      throw new Error("Configuration email manquante");
    }

    const subject = `Pré-inscription ${data.profile} — ${data.fullName} (${data.city})`;
    const html = `
<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;">
  <h2 style="margin:0 0 12px;">Nouvelle pré-inscription ${data.profile === "client" ? "client" : "prestataire"}</h2>
  <table style="border-collapse:collapse;">
    ${row("Nom", data.fullName)}
    ${row("Téléphone", data.phone)}
    ${row("Email", data.email)}
    ${row("Ville", data.city)}
    ${row("Catégorie", data.category)}
    ${row("Société", data.companyName)}
    ${row("Taille d'équipe", data.teamSize)}
    ${row("Besoin", data.needDetails)}
    ${row("Type d'établissement santé", data.healthEntityType)}
    ${row("Projet immobilier", data.realEstateIntent)}
  </table>
</div>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // onboarding@resend.dev only delivers until a domain is verified in Resend.
        from: `${from} <onboarding@resend.dev>`,
        to: [to],
        reply_to: data.email,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Resend failed [${response.status}]: ${body}`);
      throw new Error(`Envoi email impossible [${response.status}]`);
    }

    return { ok: true };
  });
