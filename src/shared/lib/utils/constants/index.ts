import type { Metadata } from "next";

export const BASE_API_URL =
  "https://bilgirim-backend-production-8c49.up.railway.app/api";

const siteUrl = BASE_API_URL.replace(/\/$/, "") ?? "http://localhost:3000";

export const METADATA: Metadata = {
  title: "Bilim Bulak",
  description:
    "«Билим Булак» — педагогдорду психологиялык колдоо долбоору. Мектеп жана бала бакча педагогдору үчүн психология жана логопедия багытында тестирлөө жана колдоо.",
  icons: {
    icon: "/icons/logo.svg",
  },
  keywords: [
    "Билим Булак",
    "BILIM BULAK",
    "педагогдор",
    "педагог",
    "психология",
    "логопедия",
    "тестирлөө",
    "тестирование педагогов",
    "мектеп",
    "бала бакча",
    "Билим берүү министрлиги",
    "билим берүү",
  ],
  authors: [
    {
      name: "Alisher Jumanov",
      url: "https://www.linkedin.com/in/alisher-jumanov/",
    },
  ],
  creator: "Alisher Jumanov",
  publisher: "Bilim Bulak",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "BILIM BULAK — педагогдорду психологиялык колдоо",
    description:
      "Мектеп жана бала бакча педагогдору үчүн психология-логопедия багытында тестирлөө жана колдоо.",
    url: siteUrl,
    siteName: "Bilim Bulak",
    images: [
      {
        url: "/icons/logo.svg",
        width: 1200,
        height: 630,
        alt: "BILIM BULAK — педагогдорду психологиялык колдоо",
      },
    ],
    locale: "ky_KG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BILIM BULAK",
    description:
      "Педагогдорду психологиялык колдоо долбоору — тестирлөө жана колдоо.",
    images: ["/icons/logo.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const LANGUAGES = [
  { code: "ru", label: "РУС", icon: "/icons/ru.svg" },
  { code: "kg", label: "КЫР", icon: "/icons/kg.svg" },
];

export const STEPS = [
  {
    titleKey: "steps.1.title",
    description: [
      { key: "steps.1.desc.1" },
      { key: "steps.1.desc.2", className: "text-blue-700" },
    ],
    icon: "/icons/first-step.svg",
  },
  {
    titleKey: "steps.2.title",
    description: [
      { key: "steps.2.desc.1" },
      { key: "steps.2.desc.2", className: "text-green-600" },
      { key: "steps.2.desc.3" },
    ],
    icon: "/icons/second-step.svg",
  },
  {
    titleKey: "steps.3.title",
    description: [
      { key: "steps.3.desc.1" },
      { key: "steps.3.desc.2", className: "text-amber-500" },
      { key: "steps.3.desc.3" },
    ],
    icon: "/icons/third-step.svg",
  },
  {
    titleKey: "steps.4.title",
    description: [
      { key: "steps.4.desc.1" },
      { key: "steps.4.desc.2", className: "text-red-500" },
      { key: "steps.4.desc.3" },
    ],
    icon: "/icons/fourth-step.svg",
  },
];

export const KG_PREFIX = "996";

export const KG_LOCAL_LEN = 9;

export const KG_TOTAL_LEN = KG_PREFIX.length + KG_LOCAL_LEN;

export const LANG_WHITELIST_PREFIXES = [
  "/dictionaries/regions",
  "/dictionaries/organizations",
  "/dictionaries/organization-types",
  "/dictionaries/districts",
  "/user/tests",
  "/user/profile",
  "/user/courses",
];
