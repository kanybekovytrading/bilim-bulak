"use client";
import { useEffect } from "react";

interface Options {
  enabled: boolean;
}

export const useBeforeUnload = ({ enabled }: Options) => {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [enabled]);
};
