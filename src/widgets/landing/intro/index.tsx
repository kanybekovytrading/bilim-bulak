"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const Intro = () => {
  const router = useRouter();

  const t = useTranslations();

  const navigateToSignUp = () => router.push("/auth/sign-up");

  return (
    <section className="max-w-400 m-auto px-4 md:px-5 flex flex-col items-center justify-center mt-8 md:mt-20">
      <h1 className="font-bold text-3xl md:text-5xl text-center">
        {t("intro.titlePart1")} <br /> {t("intro.titlePart2")}
      </h1>

      <p className="text-center text-balance mt-3 text-sm md:text-xl font-medium text-neutral-500">
        {t("intro.subtitlePart1")}
        <br className="hidden md:inline-block" /> {t("intro.subtitlePart2")}
        <span className="text-blue-700"> «Билим Булак» </span>
        {t("intro.subtitlePart3")} <br className="hidden md:inline-block" />
        {t("intro.subtitlePart4")}.
      </p>

      <Button
        onClick={navigateToSignUp}
        className="bg-blue-700 flex items-center gap-2 mt-10 rounded-xl font-medium text-sm md:text-xl py-3 px-4 md:py-4 md:px-5 h-fit w-fit"
      >
        {t("common.takeTest")} <MoveRight size={24} />
      </Button>

      <Image
        className="mt-3"
        src="/images/intro.webp"
        alt="Intro"
        width={750}
        height={500}
      />
    </section>
  );
};
