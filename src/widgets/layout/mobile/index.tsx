"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@heroui/react";
import { Home, BookOpen, User, GraduationCap } from "lucide-react";

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

  const iconClass = (href: string) =>
    cn("w-6 h-6", isActive(href) && "text-[#1570EF]");

  return (
    <nav
      className={cn(
        "md:hidden sticky bottom-0 left-0 right-0 z-50 bg-white",
        "border-t border-neutral-200"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between p-4">
        <Link href="/user" className={itemClass("/user")}>
          <Home className={iconClass("/user")} />
          <span>{t("nav.home")}</span>
        </Link>

        <Link href="/user/tests" className={itemClass("/user/tests")}>
          <BookOpen className={iconClass("/user/tests")} />
          <span>{t("nav.tests")}</span>
        </Link>

        <Link href="/user/courses" className={itemClass("/user/courses")}>
          <GraduationCap size={27} className={iconClass("/user/courses")} />
          <span>{t("nav.courses")}</span>
        </Link>

        <Link href="/user/profile" className={itemClass("/user/profile")}>
          <User className={iconClass("/user/profile")} />
          <span>{t("common.profile")}</span>
        </Link>
      </div>
    </nav>
  );
};
