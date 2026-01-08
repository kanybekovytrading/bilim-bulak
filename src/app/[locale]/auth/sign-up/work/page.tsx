import { BackButton } from "@/shared/ui/back-button";

const SignUpWork = () => {
  return (
    <section className="max-w-400 m-auto p-4 lg:p-5">
      <BackButton />

      <div className="mt-8 lg:mt-11.5">
        <h1 className="text-3xl lg:text-4xl font-semibold">Катталуу</h1>
        <p className="text-blue-700 text-base lg:text-xl font-medium mt-2">
          2-кадам: Иштеген жериңиз
        </p>

        <div className="mt-8 rounded-2xl bg-[#F5F5F5] p-6 text-neutral-600 font-medium">
          Бул экран азырынча даяр эмес 🙂 (Step 2 / Work info)
        </div>
      </div>
    </section>
  );
};

export default SignUpWork;
