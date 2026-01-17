"use client";
import { Spinner } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useGetTests } from "@/entities/user/tests/model/api/queries";
import { ErrorBlock } from "@/shared/ui/error-block";
import { TestCard } from "@/shared/ui/test-card";

export const TestsSection = () => {
  const { data: tests, isPending, isError, refetch } = useGetTests();

  const t = useTranslations();

  return (
    <section className="animate-fade-in">
      <h2 id="tests" className="font-bold text-2xl md:text-4xl text-center">
        {t("testsPage.title")}
      </h2>

      {isPending ? (
        <div className="mt-14 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <ErrorBlock refetch={refetch} className="mt-14" />
      ) : (
        <div className="mt-14 flex flex-col justify-center items-center md:flex-row md:flex-wrap lg:flex-nowrap md:items-stretch gap-8 relative before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-indigo-100 before:blur-2xl before:opacity-80">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      )}
    </section>
  );
};
