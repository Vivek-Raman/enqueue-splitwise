export async function POST() {
  const response = Response.json({ success: true });
  response.headers.set("Set-Cookie", `credentials=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
  return response;
}
