"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";
import { AuthContextType } from "./(private)/layout";

export default function Home() {
  const context = useAuth();
  const router = useRouter();

  const { user, loading } = (context || {
    user: null,
    loading: true,
  }) as AuthContextType;

  useEffect(() => {
    if (!loading && user) {
      // login - redirect to dashboard
      router.push("/dashboard");
    }
  }, [user, loading]);

  // else if not logged in
  return <div className="">{loading ? <h1>Loading...</h1> : <Auth />}</div>;
}
