"use client";

import EnqueueConfig from "@/components/EnqueueConfig";
import SplitwiseLogin from "@/components/SplitwiseLogin";
import UserCard from "@/components/UserCard";
import { useSplitwiseUser } from "@/hooks";

export default function Home() {
  const { user, loading, error } = useSplitwiseUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        {error && <div className="text-red-500">Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {!user && !loading && <SplitwiseLogin />}
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <UserCard user={user} />
      <EnqueueConfig />
    </div>
  );
}
