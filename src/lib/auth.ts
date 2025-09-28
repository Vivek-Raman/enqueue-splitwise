import { NextRequest } from "next/server";
import { OAuth2User } from "splitwise-ts";

export const getAuthUserFromRequest = async (req: NextRequest): Promise<OAuth2User> => {
  const encodedCredentials = req.cookies.get("credentials")?.value;
  if (!encodedCredentials) {
    throw new Error("Credentials cookie not found");
  }

  // Decode base64 and split credentials
  const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("utf-8");
  const [clientId, clientSecret] = decodedCredentials.split(":");

  if (!clientId || !clientSecret) {
    throw new Error("Invalid credentials format");
  }

  const credentials = {
    clientId,
    clientSecret,
  };

  const user = new OAuth2User(credentials);
  await user.requestAccessToken();

  return user;
};
