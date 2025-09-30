"use client";

import { Group } from "@/types/splitwise";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { useError } from "@/contexts/ErrorContext";

interface GroupInfoProps {
  group: Group;
}

export default function GroupInfo(props: GroupInfoProps) {
  const { group } = props;
  const [expenseCount, setExpenseCount] = useState<string>("");
  const { setError } = useError();

  useEffect(() => {
    const fetchExpenseInfo = async () => {
      const res = await fetch(`/api/v1/groups/${group.id}`);
      const data = await res.json();
      if (!data.success) {
        setError("Failed to fetch group info: " + data.error);
        return;
      }
      const noun = data.expenses.length === 1 ? "expense" : "expenses";
      setExpenseCount((data.expenses.length >= 100 ? "100+" : data.expenses.length.toString()) + ` ${noun}`);
    };

    fetchExpenseInfo();
  }, [group, setError]);

  return <Label>{expenseCount}</Label>;
}
