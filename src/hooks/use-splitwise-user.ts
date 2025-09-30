"use client";

import { useState, useEffect } from "react";
import { SplitwiseUser, SplitwiseApiResponse } from "../types/splitwise";

interface UseSplitwiseUserReturn {
  user: SplitwiseUser | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

export function useSplitwiseUser(): UseSplitwiseUserReturn {
  const [user, setUser] = useState<SplitwiseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/v1/me");
      const data: SplitwiseApiResponse<SplitwiseUser> = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user", err);
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
    refetch: fetchUser,
  };
}
