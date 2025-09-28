"use client";

import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useSplitwiseUser } from "@/hooks";

export default function SplitwiseLogin() {
  const { refetch } = useSplitwiseUser();

  const doLogin = async (e: FormEvent<HTMLFormElement>) => {
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

    if (response.success) {
      refetch();
    }
  };

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
