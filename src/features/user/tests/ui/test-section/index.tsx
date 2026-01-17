"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Spinner } from "@heroui/react";
import { useGetTest } from "@/entities/user/tests/model/api/queries";
import { ErrorBlock } from "@/shared/ui/error-block";
import { TestFinishModal } from "../test-finish-modal";
import { TestTopBar } from "../test-topbar";
import { TestRunner } from "../test-runner";

export const TestSection = () => {
  const [isFinishOpen, setIsFinishOpen] = useState(false);

  const t = useTranslations();

  const router = useRouter();

  const { testId } = useParams<{ testId: string }>();

  const { data: test, isPending, isError, refetch } = useGetTest(testId);

  const openFinishModal = () => setIsFinishOpen(true);
  const closeFinishModal = () => setIsFinishOpen(false);

  const confirmFinish = () => {
    setIsFinishOpen(false);
    router.replace("/user/tests");
  };

  return (
    <>
      <TestTopBar onFinishClick={openFinishModal} />

      {isPending ? (
        <div className="mt-14 flex items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorBlock refetch={refetch} className="mt-14" />
      ) : test ? (
        <TestRunner test={test} testId={testId} />
      ) : null}

      <TestFinishModal
        isOpen={isFinishOpen}
        onOpenChange={setIsFinishOpen}
        onConfirm={confirmFinish}
        onCancel={closeFinishModal}
      />
    </>
  );
};
