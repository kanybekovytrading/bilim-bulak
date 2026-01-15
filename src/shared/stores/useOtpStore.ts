import { create } from "zustand";
import { VerifyOtpType } from "../types";

interface OtpContext {
  phone: string;
  type: VerifyOtpType;
}

interface OtpStore {
  context: OtpContext | null;
  setContext: (ctx: OtpContext) => void;
  clear: () => void;
}

export const useOtpStore = create<OtpStore>()((set) => ({
  context: null,
  setContext: (ctx) => set({ context: ctx }),
  clear: () => set({ context: null }),
}));
