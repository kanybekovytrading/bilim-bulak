import { Locale } from "@/shared/types";
import { KG_LOCAL_LEN, KG_PREFIX, LANG_WHITELIST_PREFIXES } from "../constants";

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
  if (!raw) return "+996";

  const digits = raw.replace(/\D/g, "");
  const groups = digits.match(/.{1,3}/g)?.join(" ") ?? digits;

  return `+${groups}`;
};

export const getLangFromHostPath = (): Locale => {
  if (typeof window === "undefined") return "ru";
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  return first === "kg" ? "kg" : "ru";
};

export const shouldUseLangApi = (url: string) => {
  const path = url.split("?")[0];
  return LANG_WHITELIST_PREFIXES.some((p) => path.startsWith(p));
};

export const buildLangBaseURL = (baseURL: string, lang: Locale) => {
  const clean = baseURL.replace(/\/$/, "");
  return `${clean}/${lang}`;
};
