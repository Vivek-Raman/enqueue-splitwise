import { getAuthUserFromRequest } from "@/lib/auth";
import { NextRequest } from "next/server";
import { Client } from "splitwise-ts";

export async function POST(req: NextRequest) {
  let user;
  try {
    user = await getAuthUserFromRequest(req);
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Unauthorized: " + error,
      },
      { status: 401 },
    );
  }

  const { selectedGroup, entryCount } = await req.json();

  try {
    validateRequest(!!selectedGroup, "No group selected.");
    validateRequest(!!entryCount, "No entry count specified.");
    validateRequest(entryCount <= 50, "Max entry count capped at 50.");
    validateRequest(entryCount >= 1, "Min entry count capped at 1.");
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Bad Request: " + (error ?? "Unspecified"),
      },
      {
        status: 400,
      },
    );
  }

  const client = new Client(user);
  for (let i = 1; i <= entryCount; ++i) {
    const expense = {
      cost: "0.01",
      description: "Placeholder by enqueue-splitwise.vivekraman.dev",
      split_equally: "true",
    };
    console.debug(`[${selectedGroup}] Creating expense ${i}/${entryCount}`);
    await client.expenses.createExpense({
      group_id: selectedGroup,
      ...expense,
    });
    console.debug(`[${selectedGroup}]  Created expense ${i}/${entryCount}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return Response.json({ success: true });
}

function validateRequest(ensureTrue: boolean, errorMessage: string) {
  if (!ensureTrue) {
    throw new Error(errorMessage);
  }
}
