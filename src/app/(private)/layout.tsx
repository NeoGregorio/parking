"use client";

import React from "react";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// hooks
import useAuth from "@/hooks/useAuth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export default function PrivatePagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = useAuth();
  const router = useRouter();

  const { user, loading } = (context || {
    user: null,
    loading: true,
  }) as AuthContextType;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading]);

  return <>{children}</>;
}
