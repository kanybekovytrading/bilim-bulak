"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, cn, Spinner } from "@heroui/react";
import { MoveRight } from "lucide-react";

import { useGetTestResult } from "@/entities/user/tests/model/api/queries";
import { ErrorBlock } from "@/shared/ui/error-block";
import { SeverityLevel } from "@/entities/user/tests/model/types";

export const CompleteTest = () => {
  const { testId } = useParams<{ testId: string }>();
  const router = useRouter();
  const t = useTranslations("testsComplete"); // namespace

  const {
    data: result,
    isPending,
    isError,
    refetch,
  } = useGetTestResult(testId);

  const ui = useMemo(() => {
    const level = (result?.severityLevel ?? "low") as SeverityLevel;

    const map: Record<SeverityLevel, { color: string }> = {
      low: {
        color: "#16A34A",
      },
      moderate: {
        color: "#D97706",
      },
      high: {
        color: "#EA580C",
      },
      critical: {
        color: "#DC2626",
      },
    };

    return map[level];
  }, [result?.severityLevel]);

  const goToCourses = () => router.replace("/user/courses");

  return (
    <div className="flex flex-col items-center py-10 px-5">
      <Image
        src="/images/complete.webp"
        alt={t("imageAlt")}
        width={200}
        height={200}
      />

      {isPending ? (
        <div className="mt-14 flex items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorBlock refetch={refetch} className="mt-14" />
      ) : (
        <div style={{ maxWidth: 520 }} className="w-full mt-8">
          <div className="rounded-2xl border-neutral-200 bg-white p-5 sm:p-6 shadow-sm">
            <p className="text-center text-sm text-neutral-500">
              {t("subtitle")}
            </p>

            <div className="mt-2 text-center">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-700">
                {result?.totalScore ?? 0}
              </div>
              <div className="mt-1 text-sm text-neutral-500">
                {t("scoreLabel")}
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <span
                className="text-center"
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: ui.color,
                }}
              >
                {result?.categoryDescription}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {t("mentalStateLabel")}
                </p>
                <p className="mt-1 text-base font-semibold text-neutral-900">
                  {result?.mentalState || t("empty")}
                </p>
              </div>

              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {t("recommendationLabel")}
                </p>
                <p className="mt-1 text-sm sm:text-base leading-relaxed text-neutral-700">
                  {result?.recommendation || t("empty")}
                </p>
              </div>
            </div>

            <Button
              onPress={goToCourses}
              className={cn(
                "mt-6 w-full h-fit rounded-xl bg-blue-700 text-white font-medium",
                "text-sm lg:text-xl py-3 lg:py-4.5"
              )}
            >
              {t("toCourses")} <MoveRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
