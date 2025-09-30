"use client";

import { Group } from "@/types/splitwise";
import { FormEvent, useCallback, useState } from "react";
import GroupSelector from "./GroupSelector";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import GroupInfo from "./GroupInfo";
import { useError } from "@/hooks";

export default function EnqueueConfig() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const { setError } = useError();

  const doSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.target as HTMLFormElement);
      const entryCount = formData.get("entry-count");
      const response = await fetch("/api/v1/create", {
        method: "POST",
        body: JSON.stringify({
          selectedGroup: selectedGroup?.id,
          entryCount: entryCount,
        }),
      }).then((res) => res.json());
      if (!response.success) {
        setError(response.error);
      }
    },
    [selectedGroup, setError],
  );

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Enqueue Config</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            doSubmit(e);
          }}
        >
          <div className="flex flex-col gap-1">
            <Label>Group to use</Label>
            <GroupSelector selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
            {selectedGroup && <GroupInfo group={selectedGroup} />}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="entry-count">Number of entries</Label>
            <Input name="entry-count" type="number" defaultValue="10" min="1" max="30" />
          </div>
          <div>Make sure to select a separate group to create blank expenses.</div>
          <Button type="submit">Create</Button>
        </form>
      </CardContent>
    </Card>
  );
}
