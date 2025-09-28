import { getAuthUserFromRequest } from "@/lib/auth";
import { NextRequest } from "next/server";
import { Client } from "splitwise-ts";

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

  const groups = await client.groups.getGroups();
  return Response.json({ success: true, ...groups });
}
