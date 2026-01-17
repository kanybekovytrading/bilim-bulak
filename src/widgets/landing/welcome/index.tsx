"use client";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { MoveDown } from "lucide-react";
import { Tests } from "@/features/user/welcome/ui/tests";

export const Welcome = () => {
  const t = useTranslations();

  const scrollToTests = () => {
    document.getElementById("tests")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl md:text-5xl text-center">
        {t("welcome.title")}
      </h1>

      <p className="text-center text-balance mt-3 max-w-225 text-sm md:text-xl font-medium text-neutral-500">
        {t("welcome.text")}
      </p>

      <Button
        onClick={scrollToTests}
        className="bg-blue-700 flex items-center gap-2 mt-10 rounded-xl font-medium text-sm md:text-xl py-3 px-4 md:py-4 md:px-5 h-fit w-fit mb-40"
      >
        {t("common.takeTest")} <MoveDown size={24} />
      </Button>

      <Tests />
    </section>
  );
};
