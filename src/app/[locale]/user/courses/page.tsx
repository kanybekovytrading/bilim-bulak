"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { UserLayout } from "@/widgets/layout/user-layout";

const Courses = () => {
  const t = useTranslations();
  const locale = useLocale();

  const content = useMemo(() => {
    const kg = {
      title: "Урматтуу эжеке-агайлар!",
      p1:
        "Биз сиздерге профессионалдуу жардам бере турган сабактар менен толук камсыз кылууга даярбыз. " +
        "Бул сабактардан алган билимиңизди теориялык жана практикалык жактан колдонуп, күнүмдүк ишиңизде натыйжалуулугун арттыра аласыз.",
      subTitle: "Сиздерге сунуш кыла турган маалыматтар үч бөлүктөн турат:",
      items: [
        {
          title: "Медитация",
          text: "стресстин деңгээлин төмөндөтүүгө жардам берет, ички тынчтыкты жана концентрацияны күчөтөт.",
        },
        {
          title: "Аффирмациялар",
          text: "нерв системасын чындап бекемдейт, иммунитетти күчөтөт жана эмоционалдык туруктуулукту жогорулатат.",
        },
        {
          title: "50 сабактан турган теориялык билим",
          text: "бул билим сизге иш жүзүндө бардык көндүмдөрдү колдонууну үйрөтөт.",
        },
      ],
    };

    const ru = {
      title: "Уважаемые учителя!",
      p1:
        "Мы готовы предоставить вам профессиональные занятия, которые окажут практическую и теоретическую помощь. " +
        "Полученные знания вы сможете использовать как в теории, так и на практике, повышая эффективность своей работы.",
      subTitle: "Информация представлена в трёх ключевых блоках:",
      items: [
        {
          title: "Медитация",
          text: "помогает снижать уровень стресса, улучшает концентрацию и внутреннее спокойствие.",
        },
        {
          title: "Аффирмации",
          text: "укрепляют нервную систему, повышают иммунитет и эмоциональную устойчивость.",
        },
        {
          title: "50 теоретических уроков",
          text: "эти знания помогут применять полученные навыки на практике.",
        },
      ],
      note: "Наша цель – сделать вас уверенными, сильными и эффективными профессионалами.",
    };

    return locale === "ru" ? ru : kg;
  }, [locale, t]);

  return (
    <UserLayout>
      <section className="animate-fade-in max-w-400 m-auto px-5">
        <h1 className="font-bold text-2xl md:text-4xl leading-tight">
          {content.title}
        </h1>

        <div className="h-4" />

        <p className="text-neutral-700 text-sm md:text-xl leading-relaxed">
          {content.p1}
        </p>

        <div className="h-6" />

        <div className="rounded-2xl bg-indigo-50 p-4 md:p-6">
          <h2 className="font-bold text-lg md:text-2xl text-neutral-900">
            {content.subTitle}
          </h2>

          <div className="mt-4 grid gap-3">
            {content.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 md:p-5 border border-indigo-100"
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl md:text-2xl leading-none">1️⃣</div>
                  <div className="text-sm md:text-xl leading-relaxed">
                    <span className="font-semibold text-neutral-900">
                      {item.title}
                    </span>{" "}
                    – <span className="text-neutral-700">{item.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default Courses;
