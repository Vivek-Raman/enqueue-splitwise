import { getAuthUserFromRequest } from "@/lib/auth";
import { NextRequest } from "next/server";
import { Client } from "splitwise-ts";

export async function GET(request: NextRequest, ctx: RouteContext<"/api/v1/groups/[id]">) {
  const { id: groupID } = await ctx.params;

  const user = await getAuthUserFromRequest(request);
  if (!user) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const client = new Client(user);
  const response = await client.expenses.getExpenses({
    group_id: parseInt(groupID, 10),
    limit: 100,
  });

  return Response.json({
    success: true,
    expenses: response.expenses,
  });
}
