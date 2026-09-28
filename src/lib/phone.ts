/** Accepts 06…, 07…, 05…, +212… or 00212…; returns +212XXXXXXXXX or null. */
export function normalizeMoroccanPhone(raw: string): string | null {
  const digits = raw.replace(/[\s.\-()]/g, "");
  const match = /^(?:\+212|00212|212|0)([5-7]\d{8})$/.exec(digits);
  return match ? `+212${match[1]}` : null;
}
