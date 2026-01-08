import { BackButton } from "@/shared/ui/back-button";

const SignUpOtp = () => {
  return (
    <section className="max-w-400 m-auto p-4 lg:p-5">
      <BackButton />

      <div className="mt-8 lg:mt-11.5">
        <h1 className="text-3xl lg:text-4xl font-semibold">OTP</h1>

        <div className="mt-8 rounded-2xl bg-[#F5F5F5] p-6 text-neutral-600 font-medium">
          Бул экран азырынча даяр эмес 🙂 (OTP verify)
        </div>
      </div>
    </section>
  );
};

export default SignUpOtp;
