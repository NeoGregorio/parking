"use client";

import { Button } from "@/components/ui/button";
import client from "@/api/client";

export default function Dashboard() {
  return (
    <div>
      <Button onClick={() => client.auth.signOut()}>Sign out</Button>
      <h1>Dashboard</h1>
    </div>
  );
}
