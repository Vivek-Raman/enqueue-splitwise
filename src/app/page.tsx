"use client";

import SplitwiseLogin from "@/components/SplitwiseLogin";
import UserCard from "@/components/UserCard";
import { useSplitwiseUser } from "@/hooks";

export default function Home() {
  const { user, loading, error } = useSplitwiseUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {error && <div className="mb-4 text-red-500">Error: {error}</div>}
      {loading && <div className="mb-4">Loading...</div>}
      {!user && !loading && <SplitwiseLogin />}
      {user && <UserCard user={user} />}
    </div>
  );
}
