"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import type { TestStartResponse } from "@/entities/user/tests/model/types";
import { TestQuestion } from "../test-question";

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

  const questions = useMemo(() => {
    const list = test.questions ?? [];
    return [...list].sort((a, b) => a.orderNumber - b.orderNumber);
  }, [test.questions]);

  const currentQuestion = questions[currentIndex];

  const selectedAnswerId = currentQuestion
    ? selectedByQuestion[currentQuestion.id]
    : undefined;

  const safeTotal = Math.max(1, test.questionCount ?? questions.length ?? 0);

  const doneCount = Object.keys(selectedByQuestion).length;
  const percent = Math.min(100, Math.max(0, (doneCount / safeTotal) * 100));

  const selectAnswer = (answerId: number) => {
    if (!currentQuestion) return;

    setSelectedByQuestion((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const goNext = () => {
    if (!currentQuestion) return;

    const picked = selectedByQuestion[currentQuestion.id];
    if (!picked) return;

    const isLast = currentIndex >= questions.length - 1;

    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    const payload = {
      testId: test.id ?? Number(testId),
      startedAt: test.startedAt,
      answers: Object.entries(selectedByQuestion).map(
        ([questionId, answerId]) => ({
          questionId: Number(questionId),
          answerId,
        })
      ),
    };

    console.log("SUBMIT PAYLOAD (later)", payload);
  };

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
            44:44
          </p>
        </div>

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
          isDisabled={!currentQuestion || !selectedAnswerId}
          className="w-full rounded-xl bg-blue-700 text-white font-medium text-sm md:text-xl py-3.5 md:py-4.5 h-fit"
        >
          {t("signUpForm.continue")}
        </Button>
      </div>
    </div>
  );
};
