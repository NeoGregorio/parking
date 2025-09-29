"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import client from "@/api/client";

// Define the context type
// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
// }

// Wrap whole app in context
const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.auth.getSession().then(({ data }) => {
      // checks whether user is logged in
      setUser(data?.session?.user || null);
      setLoading(false);
    });

    // listen to auth events;
    const { data: listener } = client.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    // when app is unrendred, stop listening to auth events
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
