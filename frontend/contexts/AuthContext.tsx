"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
// TODO: replace with real API call — see GET /auth/me once backend is ready
const mockUsers: any[] = [];

interface AuthUser {
  uid: string;
  id?: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  role?: "user" | "admin";
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
const LOCAL_STORAGE_KEY = "pkaflev_mock_auth_user_id";
const ADMIN_AUTH_FLAG = "pkaflev_mock_admin_authenticated";

function toAuthUser(profile: (typeof mockUsers)[number]): AuthUser {
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim();

  return {
    uid: profile.id,
    id: profile.id,
    email: profile.email,
    displayName: fullName || profile.email,
    photoURL: profile.avatar ?? null,
    phoneNumber: profile.phone ?? null,
    firstName: profile.firstName,
    lastName: profile.lastName,
    role: profile.role,
    getIdToken: async () => `mock-token-${profile.id}`,
  };
}

function persistAuthUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;

  if (user) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, user.uid);
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
      const storedUserId = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUserId) {
        const profile = mockUsers.find((entry) => entry.id === storedUserId);

        if (profile) {
          setUser(toAuthUser(profile));
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
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Invalid login credentials.");
      }

      const profile = mockUsers.find((entry) => entry.email.toLowerCase() === email.toLowerCase());
      if (!profile) {
        throw new Error("No account found for that email.");
      }

      const authUser = toAuthUser(profile);
      setUser(authUser);
      persistAuthUser(authUser);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, displayName?: string) => {
    const nameParts = displayName?.trim().split(/\s+/) ?? [];
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") ?? "";

    const newUser: AuthUser = {
      uid: `mock-${Date.now()}`,
      id: `mock-${Date.now()}`,
      email,
      displayName: displayName?.trim() || email.split("@")[0],
      photoURL: null,
      phoneNumber: null,
      firstName,
      lastName,
      role: "user",
      getIdToken: async () => `mock-token-${Date.now()}`,
    };

    setUser(newUser);
    persistAuthUser(newUser);
  };

  const resetPassword = async (email: string) => {
    const profile = mockUsers.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

    if (!profile) {
      throw new Error("No account found for that email.");
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
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore logout network issues; always clear local state.
    } finally {
      setUser(null);
      persistAuthUser(null);
    }
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
