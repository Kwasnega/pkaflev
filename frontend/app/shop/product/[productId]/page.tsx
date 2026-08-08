"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ShoppingBag, Check, Lock, Heart } from "lucide-react";
import { useProducts, type Product } from "@/components/product-provider";
import { useCart } from "@/components/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";
import { ProductCard } from "@/components/shop-section";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { products } = useProducts();
  const { addItem, settings } = useCart();
  const { isWishlisted, toggleWishlistItem } = useWishlist();
  const isStoreClosed = settings ? (!settings.storeOpen || settings.browseOnlyMode) : false;

  const productId = params?.productId;
  const product = useMemo(() => {
    if (!productId || !products) return null;
    return products.find(p => String(p.id) === String(productId)) || null;
  }, [productId, products]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!product || isSlideshowPaused) return;
    const mediaList = [
      ...(product.images && product.images.length > 0 ? product.images : [product.image]),
      ...(product.videoUrl ? [product.videoUrl] : []),
    ].filter(Boolean as any);
    if (mediaList.length <= 1) return;
    const id = setInterval(() => setCurrentImageIndex(prev => (prev + 1) % mediaList.length), 4000);
    return () => clearInterval(id);
  }, [product, isSlideshowPaused]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-black/50">Product not found.</p>
          <button onClick={() => router.push('/shop')} className="mt-4 px-4 py-2 bg-black text-white">Back to Shop</button>
        </div>
      </div>
    );
  }

  const mediaList = [
    ...(product.images && product.images.length > 0 ? product.images : [product.image]),
    ...(product.videoUrl ? [product.videoUrl] : []),
  ].filter(Boolean as any);

  const handleAddToCart = async () => {
    if (isAdding || product.inStock === false || isStoreClosed) return;
    setIsAdding(true);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    await new Promise(r => setTimeout(r, 400));
    addItem(product, 1);
    setIsAdding(false);
  };

  const specs = [
    { k: 'Motor Power', v: (product as any).motorPower },
    { k: 'Battery', v: (product as any).batteryCapacity },
    { k: 'Range', v: (product as any).range },
    { k: 'Top Speed', v: (product as any).topSpeed },
    { k: 'Charge Time', v: (product as any).chargeTime },
    { k: 'Weight', v: (product as any).weight },
    { k: 'Max Load', v: (product as any).maxLoad },
    { k: 'Warranty', v: (product as any).warranty },
    { k: 'Condition', v: (product as any).condition },
  ].filter(s => s.v !== undefined && s.v !== null && s.v !== "");

  const similar = products.filter(p => p.id !== product.id && p.category === product.category).slice(0,4);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="text-sm text-black/60">← Back</button>
          <div className="flex gap-3 items-center">
            <button onClick={() => router.push('/shop')} className="text-sm text-black/60">All Products</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-7/12 bg-[#fafafa] p-4">
            {/* Main media */}
            <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden">
              {mediaList[currentImageIndex] && typeof mediaList[currentImageIndex] === 'string' && mediaList[currentImageIndex].includes('.mp4') ? (
                <video src={mediaList[currentImageIndex] as string} className="w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <Image src={mediaList[currentImageIndex] as string} alt={product.name} fill className="object-cover" />
              )}
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 text-[10px] tracking-widest rounded-sm">{String(currentImageIndex+1).padStart(2,'0')} / {String(mediaList.length).padStart(2,'0')}</div>
            </div>

            {/* Thumbnails */}
            <div className="hidden md:flex gap-3 mt-6">
              {mediaList.map((m, i) => (
                <div key={i} onClick={() => setCurrentImageIndex(i)} className={cn('relative w-24 h-24 bg-white border', currentImageIndex === i ? 'ring-2 ring-black' : '')}>
                  {typeof m === 'string' && m.includes('.mp4') ? (
                    <video src={m as string} className="w-full h-full object-cover" />
                  ) : (
                    <Image src={m as string} alt={`${product.name} ${i+1}`} fill className="object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-5/12 bg-white p-6 md:p-10">
            <div className="mb-4 text-[10px] uppercase text-black/50 tracking-wider">{product.category || 'General'}</div>
            <h1 className="text-2xl md:text-3xl font-black uppercase mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-medium">{product.price}</span>
              {product.originalPrice && <span className="text-sm text-black/40 line-through">{product.originalPrice}</span>}
            </div>

            <p className="text-sm text-black/60 mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="text-sm md:text-base font-semibold uppercase text-black/70 mb-4">Specifications</div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-black/70">
                {specs.map(s => (
                  <div key={s.k} className="flex items-center justify-between">
                    <dt className="text-[11px] text-black/60">{s.k}</dt>
                    <dd className="font-medium text-right">{s.v ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mb-6 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
              <button onClick={handleAddToCart} disabled={isAdding || product.inStock === false || isStoreClosed} className={cn('w-full h-14 text-sm font-bold uppercase', isStoreClosed ? 'bg-black/20 text-black/40' : isAdding ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-black/80')}>
                {product.inStock === false ? 'Out of Stock' : isAdding ? 'Added' : 'Add to Bag'}
              </button>
              <button
                onClick={() => toggleWishlistItem(product.id)}
                className={cn(
                  'w-full h-14 text-sm font-bold uppercase border transition',
                  isWishlisted(product.id)
                    ? 'border-red-600 bg-red-50 text-red-700'
                    : 'border-black/10 bg-white text-black hover:border-black/20'
                )}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4" />
                  {isWishlisted(product.id) ? 'Saved' : 'Save'}
                </span>
              </button>
            </div>

            <div className="text-xs text-black/40">
              <div className="flex justify-between py-2 border-b border-black/5">
                <span>SKU</span>
                <span className="font-mono">STM-{String(product.id).padStart(4,'0')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-black/5">
                <span>Category</span>
                <span>{product.category || 'General'}</span>
              </div>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similar.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} onQuickAdd={() => addItem(p,1)} isStoreClosed={isStoreClosed} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
