"use client";
import { Intro } from "@/widgets/landing/intro";
import { Steps } from "@/widgets/landing/steps";
import { Header } from "@/widgets/layout/header";
import { Footer } from "@/widgets/layout/footer";
import { MobileBottomNav } from "@/widgets/layout/mobile";
import { useScrollRestorer } from "@/shared/lib/hooks/useScrollRestorer";
import { useAuthStore } from "@/shared/stores/useAuthStore";

const Home = () => {
  useScrollRestorer();

  const isAuthed = useAuthStore((s) => Boolean(s.token));

  return (
    <>
      <Header />
      <Intro />
      <Steps />
      <Footer />

      {isAuthed && <MobileBottomNav />}
    </>
  );
};

export default Home;
