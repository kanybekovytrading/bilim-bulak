"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@heroui/react";

export const MobileBottomNav = () => {
  const t = useTranslations();

  const pathname = usePathname();

  const isActive = (href: string) => pathname.endsWith(href);

  const itemClass = (href: string) =>
    cn(
      "flex flex-col items-center justify-center gap-1 text-xs font-medium",
      "text-neutral-500",
      isActive(href) && "text-[#1570EF]"
    );

  return (
    <nav
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white",
        "border-t border-neutral-200"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between p-4">
        <Link href="/user" className={itemClass("/user")}>
          <span>{t("nav.home")}</span>
        </Link>

        <Link href="/user/tests" className={itemClass("/user/tests")}>
          <span>{t("nav.tests")}</span>
        </Link>

        <Link href="/user/courses" className={itemClass("/user/courses")}>
          <span>{t("nav.courses")}</span>
        </Link>

        <Link href="/user/profile" className={itemClass("/user/profile")}>
          <span>{t("common.profile")}</span>
        </Link>
      </div>
    </nav>
  );
};
