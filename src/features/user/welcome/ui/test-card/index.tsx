import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { CircleQuestionMark, Clock } from "lucide-react";
import { TestItem } from "@/entities/user/tests/model/types";

interface Props {
  test: TestItem;
  isPaying?: boolean;
  onPay: (testId: number) => void;
}

export const TestCard = ({ test, isPaying = false, onPay }: Props) => {
  const t = useTranslations();

  return (
    <div className="bg-white rounded-3xl max-w-86.5 p-4 md:basis-[calc(50%-1rem)] lg:basis-0 lg:flex-1">
      <h3 className="font-semibold text-xl md:text-2xl">{test.title}</h3>

      <p className="font-medium text-neutral-500 mt-2">{test.description}</p>

      <div className="flex items-center gap-8 mt-6 font-medium">
        <div className="flex items-center gap-1">
          <Clock />
          <span>{t("testsPage.minutes", { value: test.timerMinutes })}</span>
        </div>

        <div className="flex items-center gap-1">
          <CircleQuestionMark />
          <span>{t("testsPage.questions", { value: test.questionCount })}</span>
        </div>
      </div>

      <p className="mt-6 font-medium text-neutral-500">
        {t("testsPage.priceLabel")}
        <span className="text-xl md:text-2xl text-blue-700">
          {" "}
          {test.price}с
        </span>
      </p>

      <Button
        className="bg-blue-700 mt-3 md:mt-6 rounded-xl w-full font-medium text-sm md:text-xl py-3.5 md:py-6"
        isDisabled={isPaying}
        onClick={() => onPay(test.id)}
      >
        {isPaying ? t("common.loading") : t("testsPage.pay")}
      </Button>
    </div>
  );
};
