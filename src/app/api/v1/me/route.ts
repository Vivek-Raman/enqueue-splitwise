import { NextRequest } from "next/server";
import { Client, OAuth2User } from "splitwise-ts";

export async function GET(req: NextRequest) {
  try {
    const encodedCredentials = req.cookies.get("credentials")?.value;
    if (!encodedCredentials) {
      return Response.json(
        {
          success: false,
          error: "Credentials cookie not found",
        },
        { status: 401 },
      );
    }

    // Decode base64 and split credentials
    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("utf-8");
    const [clientId, clientSecret] = decodedCredentials.split(":");

    if (!clientId || !clientSecret) {
      return Response.json(
        {
          success: false,
          error: "Invalid credentials format",
        },
        { status: 401 },
      );
    }

    const credentials = {
      clientId,
      clientSecret,
    };

    const user = new OAuth2User(credentials);
    await user.requestAccessToken();

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
