"use client";
import { CompleteTest } from "@/features/user/tests/ui/complete";
import { useRequireAuth } from "@/shared/lib/hooks/useRequireAuth";

const Complete = () => {
  const { ready, isAuthed } = useRequireAuth();

  if (!ready) return null;
  if (!isAuthed) return null;

  return (
    <section className="animate-fade-in">
      <CompleteTest />
    </section>
  );
};

export default Complete;
