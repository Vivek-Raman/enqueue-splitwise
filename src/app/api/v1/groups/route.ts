import { getAuthUserFromRequest } from "@/lib/auth";
import { NextRequest } from "next/server";
import { Client } from "splitwise-ts";

// list groups of the authenticated user
export async function GET(req: NextRequest) {
  let user;
  try {
    user = await getAuthUserFromRequest(req);
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Unauthorized" + error,
      },
      { status: 401 },
    );
  }

  const client = new Client(user);

  const response = await client.groups.getGroups();
  const groups = response.groups;
  groups?.sort((a, b) => a.updated_at!.localeCompare(b.updated_at!)).reverse();

  return Response.json({ success: true, groups });
}
