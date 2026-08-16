"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { User, Order, Address } from "@/lib/db-schema";
// TODO: replace with real API call — see GET /users/me once backend is ready
const mockUsers: any[] = [];
const mockAddresses: any[] = [];

interface UserData {
  user: User | null;
  orders: Order[];
  addresses: Address[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function mapUserProfile(profile: (typeof mockUsers)[number]): User {
  return {
    id: profile.id,
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    phone: profile.phone ?? undefined,
    avatar: profile.avatar ?? undefined,
    memberSince: profile.memberSince,
    updatedAt: profile.updatedAt ?? profile.createdAt ?? new Date().toISOString(),
    kycStatus: profile.kycStatus,
  };
}

function mapAddress(profile: (typeof mockAddresses)[number]): Address {
  return {
    id: profile.id,
    userId: profile.userId,
    name: profile.name,
    phone: profile.phone,
    address: profile.address,
    city: profile.city,
    country: profile.country,
    isDefault: profile.isDefault,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

export function useUserData(): UserData {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    if (!authUser) {
      setUser(null);
      setAddresses([]);
      setOrders([]);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const matchedUser = mockUsers.find(
        (profile) =>
          profile.id === authUser.uid ||
          profile.email.toLowerCase() === authUser.email?.toLowerCase()
      );

      if (matchedUser) {
        setUser(mapUserProfile(matchedUser));
        const matchedAddresses = mockAddresses
          .filter((address) => address.userId === matchedUser.id)
          .map(mapAddress);
        setAddresses(matchedAddresses);
      } else {
        setUser(null);
        setAddresses([]);
      }

      setOrders([]);
    } catch (err: any) {
      setError(err.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { user, orders, addresses, loading, error, refetch: fetchData };
}

// Hook for updating user profile
export function useUpdateUser() {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (data: { firstName?: string; lastName?: string; phone?: string }) => {
    if (!authUser) return { success: false, error: "Not authenticated" };

    try {
      setLoading(true);
      setError(null);

      const matchedUser = mockUsers.find(
        (profile) =>
          profile.id === authUser.uid ||
          profile.email.toLowerCase() === authUser.email?.toLowerCase()
      );

      if (matchedUser) {
        matchedUser.firstName = data.firstName ?? matchedUser.firstName;
        matchedUser.lastName = data.lastName ?? matchedUser.lastName;
        matchedUser.phone = data.phone ?? matchedUser.phone ?? null;
        matchedUser.updatedAt = new Date().toISOString();
      }

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
}

// Hook for address operations
export function useAddresses() {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const createAddress = async (data: Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">) => {
    if (!authUser) return { success: false, error: "Not authenticated" };

    try {
      setLoading(true);
      const newAddress: (typeof mockAddresses)[number] = {
        id: `address_${Date.now()}`,
        userId: authUser.uid,
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        isDefault: data.isDefault ?? false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockAddresses.push(newAddress);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id: string, data: Partial<Address>) => {
    if (!authUser) return { success: false, error: "Not authenticated" };

    try {
      setLoading(true);
      const currentAddress = mockAddresses.find((entry) => entry.id === id);

      if (currentAddress) {
        Object.assign(currentAddress, {
          ...data,
          updatedAt: new Date().toISOString(),
        });
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!authUser) return { success: false, error: "Not authenticated" };

    try {
      setLoading(true);
      const index = mockAddresses.findIndex((entry) => entry.id === id);
      if (index >= 0) {
        mockAddresses.splice(index, 1);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { createAddress, updateAddress, deleteAddress, loading };
}
