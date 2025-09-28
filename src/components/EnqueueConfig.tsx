"use client";

import { Group } from "@/types/splitwise";
import { useCallback, useEffect, useState } from "react";
import GroupSelector from "./GroupSelector";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import GroupInfo from "./GroupInfo";

export default function EnqueueConfig() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const loadSavedConfig = useCallback(async () => {
    // TODO: implement
  }, []);

  const doSubmit = useCallback(async () => {
    // TODO: implement
  }, []);

  useEffect(() => {
    loadSavedConfig();
  }, []);

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
            doSubmit();
          }}
        >
          <div className="flex flex-col gap-1">
            <Label>Group to use</Label>
            <GroupSelector selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
            {selectedGroup && <GroupInfo group={selectedGroup} />}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="enqueue-time">Scheduled time</Label>
            <Input name="enqueue-time" type="time" defaultValue="23:59:00" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="max-entries">Maximum entries</Label>
            <Input name="enqueue-time" type="number" defaultValue="50" />
          </div>
          <div>Make sure to select a separate group to accumulate blank expenses.</div>
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
