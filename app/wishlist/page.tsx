"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useWishlist } from "@/components/wishlist-provider";
import { useProducts } from "@/components/product-provider";
import { useCart } from "@/components/cart-provider";
import { ProductCard } from "@/components/shop-section";
import { ShoppingBag, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlistProducts: rawWishlistProducts, totalWishlistItems, removeFromWishlist, clearWishlist, isWishlisted, toggleWishlistItem } = useWishlist();
  const { addItem } = useCart();
  const { products = [] } = useProducts();

  // Defensive: ensure products is an array and wishlist entries are valid
  const wishlistProducts = Array.isArray(rawWishlistProducts) ? rawWishlistProducts.filter(Boolean) : [];
  const suggested = (Array.isArray(products) ? products : []).filter((product) => product && !isWishlisted(product.id)).slice(0, 6);

  return (
    <main className="min-h-screen bg-white text-black px-4 py-24 md:px-12 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-black/40 mb-2">Saved Items</p>
            <h1 className="text-4xl md:text-5xl font-black uppercase">Your Wishlist</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-3 text-sm uppercase tracking-[0.25em] text-black/70">
              <Heart className="h-4 w-4 text-red-600" />
              {totalWishlistItems} item{totalWishlistItems === 1 ? "" : "s"}
            </span>
            <button
              onClick={clearWishlist}
              className="text-[11px] uppercase tracking-[0.45em] text-black/60 hover:text-black transition"
              disabled={totalWishlistItems === 0}
            >
              Clear wishlist
            </button>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-black/5 p-12 text-center">
            <Heart className="mx-auto mb-4 h-12 w-12 text-red-600" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-black/60 max-w-xl mx-auto mb-6">Browse our shop and tap the heart to save your favorite rides and gear for later.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.3em]">
              <ShoppingBag className="h-4 w-4" />
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {wishlistProducts.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="group rounded-[2rem] border border-black/10 overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f7f7f7]">
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-black/40">No image</div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                    aria-label="Remove from wishlist"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-6 space-y-4 bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-black/40">{product.category || "General"}</p>
                      <h2 className="mt-2 text-lg font-black uppercase">{product.name}</h2>
                    </div>
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">{product.price}</span>
                  </div>
                  <p className="text-sm text-black/60 line-clamp-3">{product.description}</p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => addItem(product, 1)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#111]"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to bag
                    </button>
                    <button
                      onClick={() => toggleWishlistItem(product.id)}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] transition",
                        isWishlisted(product.id) ? "border-red-600 bg-red-50 text-red-700" : "border-black/10 bg-white text-black"
                      )}
                    >
                      <Heart className="h-4 w-4" />
                      {isWishlisted(product.id) ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.45em] text-black/40">Recommended</p>
              <h2 className="text-3xl font-black uppercase">Products you might like</h2>
            </div>
            <Link href="/shop" className="text-[11px] uppercase tracking-[0.45em] text-black/60 hover:text-black transition">Browse all</Link>
          </div>

            <div className="grid gap-5 md:grid-cols-3">
            {suggested.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickAdd={() => addItem(product, 1)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
