import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch } from "./ai-run-id";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const journeySchema = z.object({
  request: z.object({
    title: z.string(),
    clientNeed: z.string(),
    tags: z.array(z.string()),
  }),
  followUp: z.object({
    title: z.string(),
    status: z.string(),
    stages: z.array(z.string()),
  }),
  quote: z.object({
    title: z.string(),
    details: z.string(),
    price: z.string(),
  }),
});

export type JourneyPreview = z.infer<typeof journeySchema>;

export async function generateJourneyPreview(input: {
  activity: string;
  city: string;
  lang: "fr" | "ar";
}): Promise<JourneyPreview> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI key not configured");

  const runIdFetch = createLovableAiGatewayRunIdFetch(undefined);
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const language = input.lang === "ar" ? "Arabic (Moroccan context)" : "French (Moroccan context)";
  const result = streamText({
    model: provider.responses(MODEL),
    system:
      "You generate realistic but clearly fictional previews of how a service marketplace in Morocco will work. " +
      `Answer entirely in ${language}. Prices in MAD, plausible for the Moroccan market. ` +
      "The preview shows three steps of the future journey: (1) a client request arriving, " +
      "(2) the provider's follow-up tracking, (3) the quote sent to the client. " +
      "Keep every string short (one line each). Exactly 4 stages for the follow-up, the third one being the current stage.",
    prompt:
      `Activity: ${input.activity}. City: ${input.city}. ` +
      "Generate the personalized journey preview for a provider in this activity and city.",
    output: Output.object({ schema: journeySchema }),
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return await result.output;
}
