"use client";

import EnqueueConfig from "@/components/EnqueueConfig";
import UserCard from "@/components/UserCard";
import { useError, useSplitwiseUser } from "@/hooks";

export default function Home() {
  const { error } = useError();
  const { user } = useSplitwiseUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      {error && <div className="text-red-500">Error: {error}</div>}
      {user && (
        <>
          <UserCard />
          <EnqueueConfig />
        </>
      )}
    </div>
  );
}
