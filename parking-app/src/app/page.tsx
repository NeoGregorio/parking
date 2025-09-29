"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import Auth from "@/components/auth/Auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export default function Home() {
  const context = useAuth();
  const router = useRouter();

  if (!context) {
    return <div>Error: Auth context not available</div>;
  }

  const { user, loading }: AuthContextType = context;

  if (!loading && user) {
    // login - redirect to dashboard
    router.push("/dashboard");
    return null;
  }

  // else if not logged in
  return <div className="">{loading ? <h1>Loading...</h1> : <Auth />}</div>;
}
