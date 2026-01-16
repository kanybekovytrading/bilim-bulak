"use client";
import { Intro } from "@/widgets/landing/intro";
import { Steps } from "@/widgets/landing/steps";
import { Header } from "@/widgets/layout/header";
import { Footer } from "@/widgets/layout/footer";
import { useScrollRestorer } from "@/shared/lib/hooks/useScrollRestorer";

const Home = () => {
  useScrollRestorer();

  return (
    <>
      <Header />
      <Intro />
      <Steps />
      <Footer />
    </>
  );
};

export default Home;
