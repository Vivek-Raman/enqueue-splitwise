"use client";

import EnqueueConfig from "@/components/EnqueueConfig";
import UserCard from "@/components/UserCard";
import { useSplitwiseUser } from "@/hooks";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const { user } = useSplitwiseUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      {error && <div className="text-red-500 text-center w-md wrap-break-word">{error}</div>}

      <UserCard setError={setError} />
      {user && <EnqueueConfig setError={setError} />}
    </div>
  );
}
