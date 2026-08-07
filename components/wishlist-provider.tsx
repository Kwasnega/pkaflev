"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Product, useProducts } from "@/components/product-provider";

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
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setWishlistedIds(parsed.filter((id) => typeof id === "string"));
        }
      }
    } catch (error) {
      // ignore invalid storage values
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistedIds));
    } catch (error) {
      // ignore storage errors
    }
  }, [wishlistedIds]);

  const wishlistProducts = useMemo(
    () => products.filter((product) => wishlistedIds.includes(product.id)),
    [products, wishlistedIds]
  );

  const isWishlisted = (productId: string) => wishlistedIds.includes(productId);
  const addToWishlist = (productId: string) => {
    setWishlistedIds((prev) => (prev.includes(productId) ? prev : [productId, ...prev]));
  };
  const removeFromWishlist = (productId: string) => {
    setWishlistedIds((prev) => prev.filter((id) => id !== productId));
  };
  const toggleWishlistItem = (productId: string) => {
    setWishlistedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [productId, ...prev]
    );
  };
  const clearWishlist = () => setWishlistedIds([]);

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
