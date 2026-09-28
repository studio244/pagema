import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type ProLaunchStats = {
  /** Providers pre-registered in Marrakech, all activities. */
  total: number;
  /** Providers pre-registered in Marrakech, per activity. */
  byCategory: Record<string, number>;
};

// Aggregates only — never returns rows, so no personal data leaves the server.
// City is free text on the homepage form, hence the loose match.
export const getProLaunchStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProLaunchStats | null> => {
    const { data, error } = await supabaseAdmin
      .from("preregistrations")
      .select("category")
      .eq("profile", "prestataire")
      .ilike("city", "%marrak%");

    if (error) {
      console.error("getProLaunchStats failed", error);
      return null;
    }

    const byCategory: Record<string, number> = {};
    for (const { category } of data) {
      byCategory[category] = (byCategory[category] ?? 0) + 1;
    }
    return { total: data.length, byCategory };
  },
);
