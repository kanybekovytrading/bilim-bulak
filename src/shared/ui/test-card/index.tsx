"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Chip, cn } from "@heroui/react";
import { CircleQuestionMark, Clock, MoveRight } from "lucide-react";
import { usePay } from "@/features/user/payment/lib/hooks/usePay";
import {
  TEST_STATUS_CHIP_COLOR,
  TEST_STATUS_I18N_KEY,
  TestItem,
} from "@/shared/types";
import { TestActionModal } from "../test-action-modal";

interface Props {
  test: TestItem;
}

export const TestCard = ({ test }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pay } = usePay();
  const router = useRouter();
  const t = useTranslations();

  const status = test.status;
  const isFree = Number(test.price) <= 0;

  const isAvailable = status === "AVAILABLE";
  const isPaid = status === "PAID";
  const isCompleted = status === "COMPLETED";
  const canStart = isPaid || isFree;

  const buttonText = isAvailable
    ? canStart
      ? t("testsPage.start")
      : t("testsPage.pay")
    : isPaid
    ? t("testsPage.start")
    : t("testsPage.toCourses");

  const buttonStyle = isAvailable
    ? canStart
      ? { backgroundColor: "#22C55E", color: "#fff" }
      : { backgroundColor: "#1570EF", color: "#fff" }
    : isPaid
    ? { backgroundColor: "#22C55E", color: "#fff" }
    : { backgroundColor: "#EAEDFF", color: "#1570EF" };

  const handleClick = () => {
    // COMPLETED как было
    if (isCompleted) {
      router.push("/user/courses");
      return;
    }

    if (canStart) {
      router.push(`/user/tests/${test.id}/confirm`);
      return;
    }

    setIsModalOpen(true);
  };

  const onConfirm = () => {
    setIsModalOpen(false);

    // тут теперь остаётся только оплата (AVAILABLE)
    pay(test.id);
  };

  return (
    <>
      <div className="bg-white rounded-3xl max-w-86.5 p-4 md:basis-[calc(50%-1rem)] lg:basis-0 lg:flex-1 h-full flex flex-col">
        <Chip className="w-fit" color={TEST_STATUS_CHIP_COLOR[status]}>
          {t(TEST_STATUS_I18N_KEY[status])}
        </Chip>

        <h3 className="font-semibold mt-2 text-xl md:text-2xl">{test.title}</h3>

        <p className="font-medium text-neutral-500 mt-2">{test.description}</p>

        <div className="flex items-center gap-8 mt-6 font-medium">
          <div className="flex items-center gap-1">
            <Clock />
            <span>{t("testsPage.minutes", { value: test.timerMinutes })}</span>
          </div>

          <div className="flex items-center gap-1">
            <CircleQuestionMark />
            <span>
              {t("testsPage.questions", { value: test.questionCount })}
            </span>
          </div>
        </div>

        <p className="mt-6 font-medium text-neutral-500">
          {t("testsPage.priceLabel")}
          <span className="text-xl md:text-2xl text-blue-700">
            {" "}
            {isCompleted
              ? "—"
              : isFree
                ? t("testsPage.free")
                : t("testsPage.priceValue", { value: test.price })}
          </span>
        </p>

        <div className="h-5" />

        <Button
          style={buttonStyle}
          className={cn(
            "mt-auto rounded-xl w-full font-medium flex items-center justify-center gap-2 text-sm md:text-xl py-3.5 md:py-6"
          )}
          onClick={handleClick}
        >
          {buttonText}
          {isCompleted && <MoveRight />}
        </Button>
      </div>

      {isAvailable && !canStart && (
        <TestActionModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          isAvailable={isAvailable}
          test={test}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};
