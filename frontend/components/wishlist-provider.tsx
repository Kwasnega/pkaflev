"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Product, useProducts } from "@/components/product-provider";
import { useAuth } from "@/contexts/AuthContext";
import { addToWishlist as addServerWishlist, getWishlist, removeFromWishlist as removeServerWishlist } from "@/lib/api-client";

interface WishlistContextValue {
  wishlistedIds: string[];
  wishlistProducts: Product[];
  totalWishlistItems: number;
  isWishlisted: (productId: string) => boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlistItem: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "wishlist-items";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { products } = useProducts();
  const { user, loading } = useAuth();
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);

  const requireAuthenticatedWishlist = () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("pkaflev:open-auth", { detail: { defaultTab: "signin" } }));
      return false;
    }

    return true;
  };

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (!user?.id && !user?.uid) {
          setWishlistedIds([]);
          window.localStorage.removeItem(STORAGE_KEY);
          return;
        }

        const userId = user?.id ?? user?.uid;
        const response = await getWishlist(userId);
        if (response.data && Array.isArray(response.data)) {
          const ids = response.data
            .map((entry) => {
              const record = entry as Record<string, unknown>;
              const nestedProduct = record.product as Record<string, unknown> | undefined;
              return record.product_id ?? nestedProduct?.product_id ?? null;
            })
            .filter((value): value is string | number => value !== null && value !== undefined)
            .map((value) => String(value));

          setWishlistedIds(ids);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
          return;
        }

        const raw = window.localStorage.getItem(STORAGE_KEY);
        const fallbackIds = raw ? JSON.parse(raw) : [];
        const parsedFallback = Array.isArray(fallbackIds) ? fallbackIds.filter((id) => typeof id === "string") : [];
        setWishlistedIds(parsedFallback);
      } catch {
        setWishlistedIds([]);
      }
    };

    if (!loading) {
      void loadWishlist();
    }
  }, [loading, user?.id, user?.uid]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistedIds));
    } catch {
      // ignore storage errors
    }
  }, [wishlistedIds]);

  const wishlistProducts = useMemo(
    () => products.filter((product) => wishlistedIds.includes(product.id)),
    [products, wishlistedIds]
  );

  const isWishlisted = (productId: string) => wishlistedIds.includes(productId);
  const addToWishlist = async (productId: string) => {
    if (!requireAuthenticatedWishlist()) {
      return;
    }

    if (wishlistedIds.includes(productId)) {
      return;
    }

    setWishlistedIds((prev) => (prev.includes(productId) ? prev : [productId, ...prev]));

    try {
      const userId = user?.id ?? user?.uid;
      await addServerWishlist(userId, productId);
    } catch {
      // fall back to local-only storage when the backend is unavailable
    }
  };
  const removeFromWishlist = async (productId: string) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("pkaflev:open-auth", { detail: { defaultTab: "signin" } }));
      return;
    }

    setWishlistedIds((prev) => prev.filter((id) => id !== productId));

    try {
      const userId = user?.id ?? user?.uid;
      await removeServerWishlist(userId, productId);
    } catch {
      // ignore backend errors
    }
  };
  const toggleWishlistItem = (productId: string) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("pkaflev:open-auth", { detail: { defaultTab: "signin" } }));
      return;
    }

    void (isWishlisted(productId) ? removeFromWishlist(productId) : addToWishlist(productId));
  };
  const clearWishlist = async () => {
    if (!requireAuthenticatedWishlist()) {
      return;
    }

    setWishlistedIds([]);

    try {
      const userId = user?.id ?? user?.uid;
      await Promise.all(wishlistedIds.map((id) => removeServerWishlist(userId, id)));
    } catch {
      // ignore backend errors
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistedIds,
        wishlistProducts,
        totalWishlistItems: wishlistProducts.length,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        toggleWishlistItem,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
