import { createServerFn } from "@tanstack/react-start";
import { CATEGORIES, COVERAGE_CITIES } from "@/lib/catalog";

export const getJourneyPreview = createServerFn({ method: "POST" })
  .inputValidator((input: { activity: string; city: string; lang: "fr" | "ar" }) => {
    if (!CATEGORIES.includes(input.activity)) throw new Error("Activité inconnue");
    if (!COVERAGE_CITIES.includes(input.city)) throw new Error("Ville inconnue");
    if (input.lang !== "fr" && input.lang !== "ar") throw new Error("Langue inconnue");
    return input;
  })
  .handler(async ({ data }) => {
    const { generateJourneyPreview } = await import("./journey.server");
    return generateJourneyPreview(data);
  });
