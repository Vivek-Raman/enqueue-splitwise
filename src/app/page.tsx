"use client";

import EnqueueConfig from "@/components/EnqueueConfig";
import UserCard from "@/components/UserCard";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <UserCard />
      {user && <EnqueueConfig />}
    </div>
  );
}
