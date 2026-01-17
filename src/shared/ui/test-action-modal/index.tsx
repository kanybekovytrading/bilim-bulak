"use client";
import { Modal, Button, cn } from "@heroui/react";
import {
  CircleAlert,
  CircleQuestionMark,
  Clock,
  MoveUpRight,
} from "lucide-react";
import type { TestItem } from "@/shared/types";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAvailable: boolean;
  test: TestItem;
  onConfirm: () => void;
}

export const TestActionModal = ({
  isOpen,
  onOpenChange,
  isAvailable,
  test,
  onConfirm,
}: Props) => (
  <Modal>
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} variant="blur">
      <Modal.Container placement="center">
        <Modal.Dialog className="rounded-3xl">
          <Modal.CloseTrigger />

          <Modal.Body style={{ color: "black" }}>
            <h3 className="font-bold text-xl text-black! md:text-2xl">
              {isAvailable ? "Толомду ырастоо" : "Даярсызбы?"}
            </h3>

            <p className="mt-2">
              <span className="text-neutral-500 font-medium text-xl">
                Тест:
              </span>
              <br />
              <span className="text-black font-semibold text-xl">
                {test.title}
              </span>
            </p>

            <div className="h-3" />

            <div className="flex items-center gap-6 justify-between font-medium text-neutral-500">
              <div className="flex items-center gap-2">
                <Clock />
                <span>{test.timerMinutes} мүнөт</span>
              </div>

              <div className="flex items-center gap-2">
                <CircleQuestionMark />
                <span>{test.questionCount} суроо</span>
              </div>
            </div>

            {isAvailable ? (
              <>
                <div className="h-5" />

                <p className="mt-5 font-medium text-neutral-500">
                  Баасы:{" "}
                  <span className="text-xl md:text-2xl text-blue-700">
                    {test.price} c
                  </span>
                </p>

                <div className="h-3" />

                <p
                  style={{ color: "orange" }}
                  className="font-medium text-sm flex items-center gap-1"
                >
                  <CircleAlert />
                  Көңүл буруңуз! Төлөм кайтарылбайт.
                </p>
              </>
            ) : (
              <div
                style={{ borderRadius: "12px" }}
                className="mt-4 bg-[#F5F5F5] p-4"
              >
                <p className="font-semibold text-neutral-800">Кеңештер:</p>
                <ul className="mt-2 text-sm font-medium text-neutral-500 list-disc pl-5 space-y-1">
                  <li>Тынч жерге отуруңуз</li>
                  <li>Суроолорду шашпай окуңуз</li>
                  <li>Көңүлүңүздү бөлбөөгө аракет кылыңыз</li>
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2">
              <Button
                onPress={onConfirm}
                style={
                  isAvailable
                    ? { backgroundColor: "#1570EF", color: "#fff" }
                    : { backgroundColor: "#22C55E", color: "#fff" }
                }
                className={cn(
                  "w-full rounded-xl font-medium text-sm md:text-xl py-3.5 md:py-4.5 h-fit",
                  isAvailable
                    ? "bg-blue-700 text-white"
                    : "bg-green-500 text-white"
                )}
              >
                {isAvailable ? "Төлөөгө өтүү" : "Баштоо"}

                {isAvailable && <MoveUpRight />}
              </Button>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);
