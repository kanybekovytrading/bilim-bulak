import { UserLayout } from "@/widgets/layout/user-layout";
import { ProfileForm } from "@/features/user/profile/ui/profile-form";
import Image from "next/image";

const Profile = () => (
  <UserLayout>
    <section className="mt-8 lg:mt-11.5 lg:flex items-start justify-between gap-10 lg:px-20">
      <ProfileForm />

      <div className="flex-col items-center hidden lg:flex">
        <Image
          src="/images/sign-up.webp"
          alt="Sign Up"
          width={472}
          height={472}
        />
      </div>
    </section>
  </UserLayout>
);

export default Profile;
