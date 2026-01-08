"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, InputGroup, Label, TextField } from "@heroui/react";
import { Step1Values } from "@/entities/sign-up/model/types";
import { step1Schema } from "@/entities/sign-up/model/schemas";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "",
      phone: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: Step1Values) => {
    console.log(values);
    // тут дальше: сохранить в стейт шага / отправить на API / перейти на 2-кадам
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl font-semibold">Катталуу</h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2">
        1-кадам: Жеке маалыматтар
      </p>

      {/* Важно: сабмитить будем через handleSubmit */}
      <Form
        className="mt-8 lg:mt-10 w-full flex flex-col gap-4 md:gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField name="name">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            Аты-жөнүңүз
          </Label>

          <InputGroup.Input
            {...register("name")}
            className="placeholder:text-[#A9A9A9] focus:border-blue-700 py-3.5 px-4 font-medium text-sm lg:text-xl bg-[#F5F5F5] rounded-lg"
            placeholder="Асанов Үсөн Эсенович"
          />

          {errors.name?.message && (
            <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
              {errors.name.message}
            </p>
          )}
        </TextField>

        <TextField name="phone">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            Телефон номериңиз
          </Label>

          <InputGroup.Input
            {...register("phone")}
            inputMode="tel"
            className="placeholder:text-[#A9A9A9] focus:border-blue-700 py-3.5 px-4 font-medium text-sm lg:text-xl bg-[#F5F5F5] rounded-lg"
            placeholder="+996 700 707 700"
          />

          {errors.phone?.message && (
            <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
              {errors.phone.message}
            </p>
          )}
        </TextField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-blue-700 text-white rounded-xl py-3 font-medium disabled:opacity-60"
        >
          {isSubmitting ? "Жүктөлүүдө..." : "Улантуу"}
        </button>
      </Form>
    </div>
  );
};
