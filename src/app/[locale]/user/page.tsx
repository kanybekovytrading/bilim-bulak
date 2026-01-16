import { Welcome } from "@/widgets/landing/welcome";
import { UserLayout } from "@/widgets/layout/user-layout";

const User = () => {
  return (
    <>
      <UserLayout>
        <Welcome />
      </UserLayout>
    </>
  );
};

export default User;
