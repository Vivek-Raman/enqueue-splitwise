import { Group } from "@/types/splitwise";
import { useCallback, useEffect, useState } from "react";
import { Label } from "./ui/label";

interface GroupInfoProps {
  group: Group;
}

export default function GroupInfo(props: GroupInfoProps) {
  const { group } = props;
  const [expenseCount, setExpenseCount] = useState<string>("");

  useEffect(() => {
    const fetchExpenseInfo = async () => {
      const res = await fetch(`/api/v1/groups/${group.id}`);
      const data = await res.json();
      if (!data.success) {
        console.error("Failed to fetch expense info");
        return;
      }
      const noun = data.expenses.length === 1 ? "expense" : "expenses";
      setExpenseCount((data.expenses.length >= 100 ? "100+" : data.expenses.length.toString()) + ` ${noun}`);
    };

    fetchExpenseInfo();
  }, [group]);

  return <Label>{expenseCount}</Label>;
}
