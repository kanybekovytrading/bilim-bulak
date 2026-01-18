"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const Intro = () => {
  const router = useRouter();
  const t = useTranslations();
  const isAuthed = useAuthStore((s) => Boolean(s.token));

  const navigateTo = () => router.push(isAuthed ? "/user" : "/auth/sign-in");

  return (
    <section className="animate-fade-in max-w-400 m-auto px-4 md:px-5 flex flex-col items-center justify-center mt-8 md:mt-20">
      <h1 className="font-bold text-3xl md:text-5xl text-center">
        {t("intro.titlePart1")} <br /> {t("intro.titlePart2")}
      </h1>

      <div className="mt-3 max-w-300 text-neutral-600 text-sm md:text-xl font-medium leading-relaxed">
        <p className="text-center text-balance">{t("intro.about.p1")}</p>

        <p className="mt-4 text-center text-balance">{t("intro.about.p2")}</p>

        <ul className="mt-4 text-center grid gap-2 list-disc list-inside">
          <li>- {t("intro.about.list.testing")}</li>
          <li>- {t("intro.about.list.stress")}</li>
          <li>- {t("intro.about.list.recommendations")}</li>
          <li>- {t("intro.about.list.training")}</li>
        </ul>

        <div className="mt-5 rounded-2xl text-center bg-indigo-50 px-4 py-3">
          <p className="font-semibold text-neutral-800">
            {t("intro.goal.title")}
          </p>
          <p className="mt-1 text-neutral-700">{t("intro.goal.text")}</p>
        </div>
      </div>

      <Button
        onClick={navigateTo}
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
