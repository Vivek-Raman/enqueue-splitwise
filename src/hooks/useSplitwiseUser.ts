"use client";

import { useState, useEffect } from "react";
import { SplitwiseUser, SplitwiseApiResponse } from "../types/splitwise";

interface UseSplitwiseUserReturn {
  user: SplitwiseUser | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSplitwiseUser(): UseSplitwiseUserReturn {
  const [user, setUser] = useState<SplitwiseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/v1/me");
      const data: SplitwiseApiResponse<SplitwiseUser> = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setError(data.error || "Failed to fetch user");
        setUser(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
}
