import { getAuthUserFromRequest } from "@/lib/auth";
import { NextRequest } from "next/server";

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
  console.log({ selectedGroup, entryCount, user });

  return Response.json({ success: true });
}
