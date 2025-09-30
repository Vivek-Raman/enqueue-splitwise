"use client";

import EnqueueConfig from "@/components/EnqueueConfig";
import UserCard from "@/components/UserCard";
import { useUser } from "@/contexts/UserContext";
import { useError } from "@/contexts/ErrorContext";

export default function Home() {
  const { error } = useError();
  const { user } = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      {error && <div className="text-red-500 text-center w-md wrap-break-word">{error}</div>}

      <UserCard />
      {user && <EnqueueConfig />}
    </div>
  );
}
