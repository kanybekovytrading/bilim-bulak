"use client";
import Image from "next/image";
import { Footer } from "@/widgets/layout/footer";
import { Header } from "@/widgets/layout/header";
import { MobileBottomNav } from "@/widgets/layout/mobile";
import { useAuthStore } from "@/shared/stores/useAuthStore";

const NotFound = () => {
  const isAuthed = useAuthStore((s) => Boolean(s.token));

  return (
    <>
      <Header />

      <section className="mt-7 px-5 flex flex-col justify-center items-center max-w-400 m-auto">
        <Image
          src="/images/not-found.webp"
          alt="Not Found"
          width={472}
          height={472}
        />

        <h1 className="text-2xl font-semibold md:text-4xl md:font-bold text-center">
          Мындай баракча табылган жок
        </h1>

        <p className="text-neutral-500 font-medium text-sm md:text-xl mt-3 text-center">
          Сиз издеген баракча өчүрүлгөн же шилтемеси туура эмес.
        </p>
      </section>

      <Footer />

      {isAuthed && <MobileBottomNav />}
    </>
  );
};

export default NotFound;
