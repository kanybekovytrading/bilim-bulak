import { Spinner } from "@heroui/react";
import { useTranslations } from "next-intl";
import { usePay } from "@/features/user/payment/lib/hooks/usePay";
import { useGetTests } from "@/entities/user/tests/model/api/queries";
import { ErrorBlock } from "@/shared/ui/error-block";
import { TestCard } from "../test-card";

export const Tests = () => {
  const t = useTranslations();

  const { data: tests, isPending, isError, refetch } = useGetTests();
  const { pay } = usePay();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 id="tests" className="font-bold text-2xl md:text-4xl text-center">
        {t("testsPage.title")}
      </h2>

      {isError ? (
        <ErrorBlock refetch={refetch} className="mt-14" />
      ) : (
        <div className="mt-14 flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-stretch gap-8 relative before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-indigo-100 before:blur-2xl before:opacity-80">
          {(tests ?? []).slice(0, 4).map((test) => (
            <TestCard key={test.id} test={test} onPay={pay} />
          ))}
        </div>
      )}
    </div>
  );
};
