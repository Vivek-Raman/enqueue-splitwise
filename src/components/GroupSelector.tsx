import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";

export default function GroupSelector() {
  const [groups, setGroups] = useState([]);

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

  return (
    <Card>
      <CardContent>
        {groups.length > 0 ? (
          <select className="w-full p-2 border rounded">
            {groups.map((group: any) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        ) : (
          <p>No groups available</p>
        )}
      </CardContent>
    </Card>
  );
}
