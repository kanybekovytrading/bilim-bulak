"use client";
import { type ReactNode } from "react";
import { useRequireAuth } from "@/shared/lib/hooks/useRequireAuth";
import { Header } from "../header";
import { Footer } from "../footer";
import { useScrollRestorer } from "@/shared/lib/hooks/useScrollRestorer";
import { MobileBottomNav } from "../mobile";

interface Props {
  children: ReactNode;
}

export const UserLayout = ({ children }: Props) => {
  const { ready, isAuthed } = useRequireAuth();

  useScrollRestorer();

  if (!ready) return null;
  if (!isAuthed) return null;

  return (
    <>
      <Header />

      <div className="pb-20 mt-7 px-4 md:pb-0">{children}</div>

      <Footer />

      <MobileBottomNav />
    </>
  );
};
