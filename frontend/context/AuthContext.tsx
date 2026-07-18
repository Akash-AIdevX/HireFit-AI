"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "@/lib/auth";
import { User } from "@/types/auth";

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const profile = await getCurrentUser();

      setUser(profile);
    } catch {
      logout();
    }
  }

  useEffect(() => {
    async function initialize() {
      const saved = localStorage.getItem("token");

      if (saved) {
        setToken(saved);

        await fetchUser();
      }

      setLoading(false);
    }

    initialize();
  }, []);

  async function login(jwt: string) {
    localStorage.setItem("token", jwt);

    setToken(jwt);

    await fetchUser();
  }

  function logout() {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}