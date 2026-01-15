import Image from "next/image";
import { NewPasswordForm } from "@/features/new-password/ui/new-password-form";
import { BackButton } from "@/shared/ui/back-button";

const NewPassword = () => {
  return (
    <section className="max-w-400 m-auto p-4 lg:p-5">
      <BackButton />

      <div className="mt-8 lg:mt-11.5 flex flex-col items-center justify-between">
        <NewPasswordForm />

        <Image
          className="hidden lg:inline-block"
          src="/images/new-password.webp"
          alt="New Password"
          width={472}
          height={472}
        />
      </div>
    </section>
  );
};

export default NewPassword;
