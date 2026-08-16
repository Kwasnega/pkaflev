"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { loginUser, registerUser } from "@/lib/api-client";

interface AuthUser {
  uid: string;
  id?: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  role?: "user" | "admin";
  token?: string | null;
  getIdToken: () => Promise<string>;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = "pkaflev_auth_user";
const ADMIN_AUTH_FLAG = "pkaflev_mock_admin_authenticated";

function createAuthUser(
  email: string,
  displayName: string,
  role: "user" | "admin" = "user",
  token: string | null = null,
  userId?: string | number,
): AuthUser {
  const name = displayName?.trim() || email.split("@")[0];
  const nameParts = name.split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ") ?? "";
  const uid = userId ? String(userId) : `auth-${Date.now()}`;

  return {
    uid,
    id: uid,
    email,
    displayName: name,
    photoURL: null,
    phoneNumber: null,
    firstName,
    lastName,
    role,
    token,
    getIdToken: async () => token ?? `mock-token-${uid}`,
  };
}

function persistAuthUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;

  if (user) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    if (user.role === "admin") {
      window.localStorage.setItem(ADMIN_AUTH_FLAG, "true");
    } else {
      window.localStorage.removeItem(ADMIN_AUTH_FLAG);
    }
  } else {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.localStorage.removeItem(ADMIN_AUTH_FLAG);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUser) {
        const parsed = JSON.parse(storedUser) as AuthUser;
        if (parsed?.email) {
          setUser({ ...parsed, getIdToken: async () => parsed.token ?? `mock-token-${parsed.uid}` });
        }
      }
    } catch {
      // Ignore storage access issues in non-browser environments.
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await loginUser(email.trim(), password);

      if (response.error) {
        throw new Error(response.error);
      }

      const authUser = createAuthUser(
        email.trim(),
        email.split("@")[0],
        (response.data?.role as "user" | "admin") ?? "user",
        response.data?.token ?? null,
        response.data?.userId,
      );

      setUser(authUser);
      persistAuthUser(authUser);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, displayName?: string) => {
    setLoading(true);

    try {
      const response = await registerUser({
        email: email.trim(),
        password,
        name: displayName,
        role: "user",
      });

      if (response.error) {
        throw new Error(response.error);
      }

      const authUser = createAuthUser(
        email.trim(),
        displayName ?? email.split("@")[0],
        "user",
        null,
        response.data?.userId,
      );

      setUser(authUser);
      persistAuthUser(authUser);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Keep existing mock semantics for now.
    if (!email.trim()) {
      throw new Error("Please provide an email address.");
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const MOCK_CURRENT_PASSWORD = "password123";

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (currentPassword !== MOCK_CURRENT_PASSWORD) {
      throw { code: "auth/wrong-password", message: "Current password is incorrect" };
    }

    if (!newPassword || newPassword.length < 6) {
      throw { code: "auth/weak-password", message: "Password must be at least 6 characters" };
    }
  };

  const logout = async () => {
    setUser(null);
    persistAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        resetPassword,
        changePassword,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
