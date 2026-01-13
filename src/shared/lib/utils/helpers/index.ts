import { KG_LOCAL_LEN, KG_PREFIX } from "../constants";

export function normalizeKgPhoneDigits(input: unknown): string {
  let digits = String(input ?? "").replace(/\D/g, "");

  if (!digits.startsWith(KG_PREFIX)) digits = KG_PREFIX + digits;

  const tail = digits.slice(KG_PREFIX.length).slice(0, KG_LOCAL_LEN);

  return KG_PREFIX + tail;
}

export function isValidKgPhoneDigits(phone: string): boolean {
  return new RegExp(`^${KG_PREFIX}\\d{${KG_LOCAL_LEN}}$`).test(phone);
}

export const formatKgPhone = (raw?: string) => {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) return "+996 XXX XXX XXX";

  const cc = digits.slice(0, 3);
  const p1 = digits.slice(3, 6);
  const p2 = digits.slice(6, 9);
  const p3 = digits.slice(9, 12);

  const rest = [p1, p2, p3].filter(Boolean).join(" ");
  return `+${cc}${rest ? " " + rest : ""}`;
};
