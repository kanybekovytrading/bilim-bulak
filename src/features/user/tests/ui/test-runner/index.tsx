"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { toast } from "sonner";

import type { TestStartResponse } from "@/entities/user/tests/model/types";
import { useSubmitTestAnswers } from "@/entities/user/tests/model/api/queries";
import { clearTestStart } from "@/entities/user/tests/model/storage";
import { TestQuestion } from "../test-question";
import { useTestCountdown } from "../../lib/hooks/useTestCountdown";

interface Props {
  test: TestStartResponse;
  testId: string;
}

export const TestRunner = ({ test, testId }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedByQuestion, setSelectedByQuestion] = useState<
    Record<number, number>
  >({});

  const t = useTranslations();
  const router = useRouter();
  const submitMutation = useSubmitTestAnswers();

  const selectedRef = useRef<Record<number, number>>({});
  useEffect(() => {
    selectedRef.current = selectedByQuestion;
  }, [selectedByQuestion]);

  const questions = test.questions;
  const currentQuestion = questions[currentIndex];

  const selectedAnswerId = currentQuestion
    ? selectedByQuestion[currentQuestion.id]
    : undefined;

  const safeTotal = Math.max(1, test.questionCount ?? questions.length ?? 0);
  const doneCount = Object.keys(selectedByQuestion).length;

  const percent = Math.min(100, Math.max(0, (doneCount / safeTotal) * 100));

  const totalSeconds = Math.max(0, (test.timerMinutes ?? 0) * 60);

  const { mmss, clear, secondsLeft } = useTestCountdown({
    testId: test.id ?? testId,
    totalSeconds,
    isEnabled: totalSeconds > 0,
  });

  const submittedRef = useRef(false);

  const cleanupAndExit = () => {
    clearTestStart(test.id ?? testId);
    clear();
    toast.info(t("tests.timeoutNotEnoughAnswers"));

    // “back, но replace”: уводим на список тестов (без возврата обратно в прохождение)
    router.replace("/user/tests");
  };

  const submitNow = async () => {
    if (submittedRef.current) return;
    if (submitMutation.isPending) return;

    submittedRef.current = true;

    const latestSelected = selectedRef.current;

    const payload = {
      testId: test.id ?? Number(testId),
      startedAt: test.startedAt,
      answers: Object.entries(latestSelected).map(([questionId, answerId]) => ({
        questionId: Number(questionId),
        answerId,
      })),
    };

    toast.promise(submitMutation.mutateAsync(payload), {
      loading: t("common.sending"),
      success: () => {
        clearTestStart(payload.testId);
        clear();
        router.replace(`/user/tests/${payload.testId}/complete`);
        return t("common.success");
      },
      error: (err) => {
        submittedRef.current = false;
        const msg = err?.response?.data?.message;
        return msg ? msg : t("common.requestError");
      },
    });
  };

  // ✅ таймаут логика
  useEffect(() => {
    if (totalSeconds <= 0) return;
    if (secondsLeft > 0) return; // <-- таймаут наступил только когда 0
    if (submittedRef.current) return;

    const done = Object.keys(selectedRef.current).length;
    const ratio = safeTotal > 0 ? done / safeTotal : 0;

    console.log("TIMEOUT", { safeTotal, done, ratio });

    if (ratio < 0.3) {
      submittedRef.current = true;
      cleanupAndExit();
      return;
    }

    submitNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, totalSeconds, safeTotal]);

  const selectAnswer = (answerId: number) => {
    if (!currentQuestion) return;

    setSelectedByQuestion((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const goNext = async () => {
    if (!currentQuestion) return;

    const isLast = currentIndex >= questions.length - 1;

    if (!isLast) {
      const picked = selectedByQuestion[currentQuestion.id];
      if (!picked) return;

      setCurrentIndex((i) => i + 1);
      return;
    }

    // last question → сабмитим
    submitNow();
  };

  const isBtnDisabled =
    !currentQuestion ||
    !selectedAnswerId ||
    submitMutation.isPending ||
    submittedRef.current;

  return (
    <div className="max-w-400 min-h-screen m-auto flex justify-center mt-10">
      <div
        style={{ width: 472, padding: "0px 20px" }}
        className="flex flex-col items-center"
      >
        <h1 className="text-neutral-500 font-medium text-sm md:text-xl">
          {test.title}
        </h1>

        <div className="mt-3 md:mt-6 h-3 w-full rounded-full bg-[#F5F5F5] overflow-hidden">
          <div
            className="rounded-full bg-blue-700 h-3 transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full mt-3 md:mt-6">
          <p className="text-sm md:text-2xl font-semibold text-blue-700">
            {Math.min(currentIndex + 1, safeTotal)} / {safeTotal}
          </p>

          <p className="text-2xl md:text-4xl font-semibold text-green-500">
            {mmss}
          </p>
        </div>

        <div className="h-10" />

        {currentQuestion ? (
          <TestQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            selectedAnswerId={selectedAnswerId}
            onSelect={selectAnswer}
          />
        ) : null}

        <div className="h-5" />

        <Button
          onPress={goNext}
          isDisabled={isBtnDisabled}
          className="w-full rounded-xl bg-blue-700 text-white font-medium text-sm md:text-xl py-3.5 md:py-4.5 h-fit"
        >
          {submitMutation.isPending
            ? t("common.loading")
            : t("signUpForm.continue")}
        </Button>
      </div>
    </div>
  );
};
