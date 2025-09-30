"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Group } from "@/types/splitwise";

interface GroupSelectorProps {
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
}

export default function GroupSelector(props: GroupSelectorProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { selectedGroup, setSelectedGroup } = props;

  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/v1/groups");
      const data = await response.json();
      if (data.success) {
        setGroups(data.groups);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedGroup ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={selectedGroup.avatar?.small} alt={selectedGroup.name} />
                  <AvatarFallback>{selectedGroup.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                {selectedGroup.name}
              </div>
            ) : (
              <>+ Select group</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <GroupList setOpen={setOpen} setSelectedGroup={setSelectedGroup} groups={groups} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedGroup ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={selectedGroup.avatar?.small} alt={selectedGroup.name} />
                <AvatarFallback>{selectedGroup.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              {selectedGroup.name}
            </div>
          ) : (
            <>+ Select group</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Select Group</DrawerTitle>
        <div className="mt-4 border-t">
          <GroupList setOpen={setOpen} setSelectedGroup={setSelectedGroup} groups={groups} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function GroupList({
  setOpen,
  setSelectedGroup,
  groups,
}: {
  setOpen: (open: boolean) => void;
  setSelectedGroup: (group: Group | null) => void;
  groups: Group[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Search groups..." />
      <CommandList>
        <CommandEmpty>No groups found.</CommandEmpty>
        <CommandGroup>
          {groups.map((group) => (
            <CommandItem
              key={group.id}
              value={group.name}
              onSelect={(value) => {
                setSelectedGroup(groups.find((g) => g.name === value) || null);
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={group.avatar?.small} alt={group.name} />
                  <AvatarFallback>{group.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                {group.name}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
