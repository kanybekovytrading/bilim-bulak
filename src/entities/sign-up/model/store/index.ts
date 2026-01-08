import { create } from "zustand";
import { SignUpFirstStepData, SignUpSecondStepData } from "../types";

type SignUpStore = {
  firstStep: SignUpFirstStepData | null;
  secondStep: SignUpSecondStepData | null;

  setFirstStep: (data: SignUpFirstStepData) => void;
  setSecondStep: (data: SignUpSecondStepData) => void;

  reset: () => void;
};

export const useSignUpStore = create<SignUpStore>((set) => ({
  firstStep: null,
  secondStep: null,

  setFirstStep: (data) => set({ firstStep: data }),
  setSecondStep: (data) => set({ secondStep: data }),

  reset: () => set({ firstStep: null, secondStep: null }),
}));
