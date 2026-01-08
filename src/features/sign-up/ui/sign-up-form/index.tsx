"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, InputGroup, Label, TextField } from "@heroui/react";
import { SignUpFirstStepFormValues } from "@/entities/sign-up/model/types";
import { SignUpFirstStepSchema } from "@/entities/sign-up/model/schemas";
import { PhoneInputField } from "@/shared/ui/phone-input-field";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFirstStepFormValues>({
    resolver: zodResolver(SignUpFirstStepSchema),
    defaultValues: {
      fullName: "",
      phone: "996",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: SignUpFirstStepFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl font-semibold">Катталуу</h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2">
        1-кадам: Жеке маалыматтар
      </p>

      <Form
        className="mt-8 lg:mt-10 w-full flex flex-col gap-4 md:gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField name="fullName">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            Аты-жөнүңүз
          </Label>

          <InputGroup.Input
            {...register("fullName")}
            autoComplete="name"
            className="placeholder:text-[#A9A9A9] focus:border-blue-700 py-3.5 px-4 font-medium text-sm lg:text-xl bg-[#F5F5F5] rounded-lg"
            placeholder="Асанов Үсөн Эсенович"
          />

          {errors.fullName?.message && (
            <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
              {errors.fullName.message}
            </p>
          )}
        </TextField>

        <TextField name="phone">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            Телефон номериңиз
          </Label>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInputField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.phone}
                placeholder="+996 700 000 000"
              />
            )}
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
