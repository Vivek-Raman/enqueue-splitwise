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
        error: "Unauthorized: " + error,
      },
      { status: 401 },
    );
  }

  try {
    const client = new Client(user);
    const userResponse = await client.users.getCurrentUser();

    return Response.json({
      success: true,
      user: userResponse.user,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch current user",
      },
      { status: 500 },
    );
  }
}
