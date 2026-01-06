import "./globals.css";
import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { METADATA } from "@/shared/utils/constants";

const rubik = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = METADATA;

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ children, params }: Readonly<Props>) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={rubik.variable}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
