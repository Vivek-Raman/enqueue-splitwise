import { OAuth2User } from "splitwise-ts";

export async function POST(req: Request) {
  // const credentials = {
  //   clientId: process.env.SPLITWISE_CLIENT_KEY!,
  //   clientSecret: process.env.SPLITWISE_CLIENT_SECRET!,
  // };

  const request = await req.json();
  const credentials = {
    clientId: request.clientKey,
    clientSecret: request.clientSecret,
  };
  const user = new OAuth2User(credentials);
  await user.requestAccessToken();

  const response = Response.json({ success: true });

  const encodedCredentials = Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString("base64");
  response.headers.set("Set-Cookie", `credentials=${encodedCredentials}; HttpOnly; Secure; SameSite=Strict; Path=/`);

  return response;
}
