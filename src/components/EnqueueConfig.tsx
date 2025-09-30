"use client";

import { ErrorProps } from "@/types/error-props";
import { Group } from "@/types/splitwise";
import { FormEvent, useCallback, useState } from "react";
import GroupInfo from "./GroupInfo";
import GroupSelector from "./GroupSelector";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export default function EnqueueConfig({ setError }: {} & ErrorProps) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [buttonActive, setButtonActive] = useState<boolean>(true);

  const doSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setButtonActive(false);
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
        setError("Failed to create expenses: " + response.error);
        setButtonActive(true);
        return;
      }

      toast(`Successfully created expenses`, {
        description: `${entryCount} expenses created in group "${selectedGroup?.name}"`,
      });
      setButtonActive(true);
    },
    [selectedGroup, setButtonActive, setError],
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
            <GroupSelector selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} setError={setError} />
            {selectedGroup && <GroupInfo group={selectedGroup} setError={setError} />}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="entry-count">Number of entries</Label>
            <Input name="entry-count" type="number" defaultValue="10" min="1" max="30" />
          </div>
          <div>Make sure to select a separate group to create blank expenses.</div>
          <Button type="submit" disabled={!buttonActive}>
            {buttonActive ? "Create" : "Creating..."}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
