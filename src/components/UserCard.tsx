import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSplitwiseUser } from "@/hooks";
import { FormEvent, useCallback } from "react";
import { Input } from "./ui/input";
import { useError } from "@/contexts/ErrorContext";

export default function UserCard() {
  const { loading, user, refetch } = useSplitwiseUser();
  const { setError } = useError();

  const doLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setError(null);
      const formData = new FormData(e.target as HTMLFormElement);
      const clientKey = formData.get("clientKey");
      const clientSecret = formData.get("clientSecret");
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientKey, clientSecret }),
      }).then((res) => res.json());

      if (!response.success) {
        setError(response.error);
        return;
      }

      await refetch();
    },
    [refetch, setError],
  );

  const doLogout = useCallback(async () => {
    setError(null);
    const response = await fetch("/api/v1/logout").then((res) => res.json());
    if (!response.success) {
      setError(response.error);
    }

    refetch();
  }, [refetch, setError]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Splitwise API</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              doLogin(e);
            }}
          >
            <div>
              <label htmlFor="clientKey">Client Key</label>
              <Input type="text" id="clientKey" name="clientKey" required />
            </div>
            <div className="mb-6">
              <label htmlFor="clientSecret">Client Secret</label>
              <Input type="password" id="clientSecret" name="clientSecret" required />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-fit">
      <CardContent>
        <div className="flex flex-col items-center justify-between gap-4 *:w-full">
          <CardTitle className="flex items-center gap-4">
            <p>
              {user.first_name} {user.last_name}
            </p>
            <Avatar>
              <AvatarImage src={user.picture.small} alt={user.first_name} />
              <AvatarFallback>
                {user.first_name?.charAt(0)}
                {user.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </CardTitle>
          <Button variant="outline" onClick={doLogout}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
