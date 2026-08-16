"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Plus, Check, ShoppingBag, Search, SlidersHorizontal, ArrowUpDown, Grid3X3, LayoutGrid, Zap, Lock, Heart } from "lucide-react";
import { useProducts, type Product } from "@/components/product-provider";
import { useCart } from "@/components/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";
import { parseMoney } from "@/lib/price";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { CartToast } from "./cart-toast";
import { ShippingEstimator } from "./shipping-estimator";
import { TrustBadges } from "./trust-badges";

const formatCategoryLabel = (category: string) => {
    const key = typeof category === 'string' ? category.toUpperCase() : String(category);
    if (key === "ALL") return "All Products";
    if (key === "SCOOTERS") return "Electric Scooters";
    if (key === "BIKES") return "Electric Bikes";
    if (key === "MOTORBIKES") return "Motorbikes";
    if (key === "APPLIANCES") return "Appliances";
    if (key === "ELECTRICALS") return "Electricals";
    if (key === "ACCESSORIES") return "Accessories";
    return String(category).replace(/[-_]/g, " ");
};

// Premium Product Card with hover effects
export function ProductCard({ 
    product, 
    index, 
    onQuickAdd,
    isNew = false,
    isLimited = false,
    isStoreClosed = false
}: { 
    product: Product; 
    index: number; 
    onQuickAdd: () => void;
    isNew?: boolean;
    isLimited?: boolean;
    isStoreClosed?: boolean;
}) {
    const { isWishlisted, toggleWishlistItem } = useWishlist();
    const [isHovered, setIsHovered] = useState(false);
    const [showSecondary, setShowSecondary] = useState(false);
    
    const handleQuickAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onQuickAdd();
    };
    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlistItem(product.id);
    };
    
    // Check if product has multiple images
    const hasSecondaryImage = product.images && product.images.length > 1;
    const specText = product.category === "scooters" || product.category === "bikes"
        ? product.range ? `${product.range} range` : product.chargeTime ? `${product.chargeTime} charge` : ""
        : product.category === "motorbikes"
        ? product.topSpeed ? `${product.topSpeed} top speed` : product.motorPower ? `${product.motorPower} power` : ""
        : product.category === "appliances" || product.category === "electricals"
        ? product.powerRating ? product.powerRating : product.keyFeatures?.[0] ?? ""
        : "";
    
    return (
        <Link
            href={`/shop/product/${product.id}`}
            className="group cursor-pointer relative product-card block w-full h-full overflow-hidden transition-transform duration-300 ease-out md:hover:-translate-y-1 md:hover:z-20"
            onMouseEnter={() => {
                setIsHovered(true);
                if (hasSecondaryImage || product.videoUrl) {
                    setTimeout(() => setShowSecondary(true), 150);
                }
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowSecondary(false);
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                }}
                className="h-full w-full overflow-hidden"
            >
                {/* Premium Card Container */}
                <div className="relative bg-[#fafafa] border border-black/5 hover:border-black/20 transition-all duration-500 overflow-hidden h-full w-full min-h-[340px] sm:min-h-[390px] md:min-h-[500px] flex flex-col p-3">
                    {/* Badge Strip */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex justify-end p-3">
                        {isLimited && (
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-red-600 text-white px-2 py-1 text-[9px] font-bold tracking-widest uppercase flex items-center gap-1"
                            >
                                <Zap size={10} />
                                LIMITED
                            </motion.div>
                        )}
                    </div>
                    
                    {/* Image Container */}
                    <div className="aspect-[3/4] h-[220px] sm:h-[260px] md:h-[350px] min-h-[0] relative overflow-hidden flex-shrink-0 w-full">
                        {/* Primary Image */}
                        <motion.div 
                            className="absolute inset-0"
                            animate={{ 
                                opacity: showSecondary ? 0 : 1,
                                scale: isHovered ? 1.05 : 1
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover w-full h-full"
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                        </motion.div>
                        
                        {/* Secondary Image or Video on Hover */}
                        <AnimatePresence>
                            {showSecondary && (
                                <motion.div 
                                    className="absolute inset-0 z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {product.videoUrl ? (
                                        <video
                                            src={product.videoUrl}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        />
                                    ) : hasSecondaryImage ? (
                                        <Image
                                            src={product.images![1]}
                                            alt={`${product.name} - alternate view`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                    ) : null}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        
                        {/* Hover Overlay with Quick Actions */}
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Quick Add Section - Bottom Overlay - Desktop Only */}
                        <motion.div
                            className="hidden md:block absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-auto z-30 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.35, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {isStoreClosed ? (
                                <div className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-center rounded-sm">
                                    Store Closed
                                </div>
                            ) : product.inStock === false ? (
                                <div className="w-full bg-red-600/80 backdrop-blur-sm border border-red-400/50 text-white py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-center rounded-sm">
                                    Out of Stock
                                </div>
                            ) : (
                            <motion.button
                                onClick={(e) => handleQuickAdd(e as any)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-white text-black py-3 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-250 shadow-md rounded-sm pointer-events-auto"
                            >
                                <ShoppingBag size={16} className="inline mr-2" />
                                Add to Bag
                            </motion.button>
                        )}
                        </motion.div>
                        
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Product Info */}
                    <div className="p-3 sm:p-4 bg-white flex-1 flex flex-col justify-between h-[120px] sm:h-[130px] md:h-[150px]">
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-1 font-medium">
                                    {product.category || "General"}
                                </p>
                                <h3 className="text-[13px] font-bold tracking-wide uppercase truncate group-hover:text-black/70 transition-colors">
                                    {product.name}
                                </h3>
                            </div>
                            <div className="text-right">
                                {product.originalPrice ? (
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[11px] font-semibold tracking-tight text-black">{product.price}</span>
                                        <span className="text-sm text-black/40 line-through">{product.originalPrice}</span>
                                    </div>
                                ) : (
                                    <span className="text-[13px] font-bold tracking-tight">{product.price}</span>
                                )}
                            </div>
                        </div>

                        {product.discount && (
                            <div className="mt-3 inline-flex items-center gap-2 px-2 py-1 rounded-full bg-red-100 text-red-600 text-[9px] font-bold tracking-wide uppercase">
                                <Zap size={10} />
                                {product.discount}
                            </div>
                        )}

                        {specText ? (
                            <div className="mt-3 text-[11px] text-black/50 uppercase tracking-[0.2em]">
                                {specText}
                            </div>
                        ) : null}

                        <div className="mt-4 flex items-center justify-between gap-3">
                            <button
                                onClick={handleWishlistToggle}
                                className={cn(
                                    "inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition",
                                    isWishlisted(product.id)
                                        ? "border-red-600 bg-red-50 text-red-700"
                                        : "border-black/10 bg-white text-black hover:border-black/20"
                                )}
                            >
                                <Heart className="h-4 w-4" />
                                {isWishlisted(product.id) ? "Saved" : "Save"}
                            </button>
                            {product.inStock === false ? (
                                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-red-100 text-red-600 text-[9px] font-bold tracking-wider uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                                    Out of Stock
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-[2px] bg-black/10 overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-black"
                                            initial={{ width: "100%" }}
                                            animate={{ width: "35%" }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                        />
                                    </div>
                                    <span className="text-[9px] tracking-wider uppercase text-black/40">Only 3 left</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];

// Premium Loading Skeleton Component
function ProductSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
      style={{ perspective: 1000 }}
    >
      <div className="relative bg-[#fafafa] border border-black/5 overflow-hidden">
        <div className="aspect-[3/4] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] to-[#eeeeee]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer" />
        </div>
        <div className="p-4 bg-white space-y-3">
          <div className="h-3 bg-[#f0f0f0] w-1/3 rounded" />
          <div className="flex justify-between items-center">
            <div className="h-4 bg-[#f0f0f0] w-2/3 rounded" />
            <div className="h-4 bg-[#f0f0f0] w-16 rounded" />
          </div>
          <div className="h-[2px] bg-[#f0f0f0] w-full rounded overflow-hidden">
            <div className="h-full bg-[#e0e0e0] w-1/3 skeleton-shimmer" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ShopSection({ category: initialCategory }: { category?: string }) {
    const { addItem, settings } = useCart();
    const { products, isLoading } = useProducts();
    const isStoreClosed = settings ? (!settings.storeOpen || settings.browseOnlyMode) : false;
    const isMaintenanceMode = settings?.maintenanceMode;

    const [activeCategory, setActiveCategory] = useState(initialCategory?.toUpperCase() || "ALL");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartToast, setCartToast] = useState<{
        isVisible: boolean;
        productName: string;
        productImage?: string;
        productPrice?: string;
    }>({ isVisible: false, productName: "" });
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const gridRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    // All store categories
    const categories = useMemo(() => {
        return ["ALL", "SCOOTERS", "BIKES", "MOTORBIKES", "APPLIANCES", "ELECTRICALS", "ACCESSORIES"];
    }, [products]);

    useEffect(() => {
        if (activeCategory !== "ALL" && !categories.includes(activeCategory)) {
            setActiveCategory("ALL");
        }
    }, [activeCategory, categories]);

    // Sync searchQuery with URL param `search` so header searches route to /shop?search=...
    const searchParams = useSearchParams();
    useEffect(() => {
        const q = searchParams?.get("search") || "";
        setSearchQuery(q);
    }, [searchParams]);

    // (Modal/slideshow logic removed — product detail moved to dedicated route)

    // Filter and sort products
    const filteredProducts = (() => {
        let result = products;
        
        // Category filter
        if (activeCategory !== "ALL") {
            result = result.filter(p => p.category?.toUpperCase() === activeCategory);
        }
        
        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category?.toLowerCase().includes(query)
            );
        }
        
        // Sort
        switch (sortBy) {
            case "price-asc":
                result = [...result].sort((a, b) => parseMoney(a.price) - parseMoney(b.price));
                break;
            case "price-desc":
                result = [...result].sort((a, b) => parseMoney(b.price) - parseMoney(a.price));
                break;
            case "name-asc":
                result = [...result].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result = [...result].sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "newest":
            default:
                result = [...result].sort((a, b) => ((b.id || 0) as number) - ((a.id || 0) as number));
                break;
        }
        
        return result;
    })();

    const activeSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Newest First";

    // Close sort dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setShowSortDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 100/10 GSAP scroll reveal for product cards
    useEffect(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll(".product-card");
        if (!cards.length) return;

        // Dynamic import to avoid SSR issues
        import("gsap").then(({ default: gsap }) => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);
                
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                
                cards.forEach((card, i) => {
                    const row = Math.floor(i / 3);
                    const col = i % 3;
                    
                    // Set initial state - cards start hidden (opacity 0)
                    gsap.set(card, {
                        y: isMobile ? 40 : 60,
                        opacity: 0,
                        scale: isMobile ? 0.95 : 0.85,
                        rotateY: isMobile ? 0 : (col === 0 ? -15 : col === 2 ? 15 : 0),
                    });
                    
                    // Animate when scrolled into view
                    gsap.to(card, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        duration: isMobile ? 0.5 : 0.8,
                        ease: "power3.out",
                        delay: isMobile ? 0 : col * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: isMobile ? "top 90%" : "top 85%",
                            toggleActions: "play none none reverse",
                        }
                    });
                });

                // Parallax effect on images within cards - Desktop only
                if (!isMobile) {
                    cards.forEach((card) => {
                        const img = card.querySelector(".product-image");
                        if (img) {
                            gsap.to(img, {
                                y: -30,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 1.5,
                                }
                            });
                        }
                    });
                }
            });
        });
        
        // Cleanup ScrollTrigger on unmount
        return () => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                ScrollTrigger.getAll().forEach(st => st.kill());
            });
        };
    }, [filteredProducts]);

    // Quick add from product card hover
    const handleQuickAdd = async (product: Product) => {
        // Vibration feedback (mobile)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([30, 20, 30]); // Pattern vibration
        }
        
        // Add to cart immediately
        addItem(product, 1);
        
        // Show toast
        setCartToast({
            isVisible: true,
            productName: product.name,
            productImage: product.image,
            productPrice: product.price
        });
    };
    const closeCartToast = () => {
        setCartToast(prev => ({ ...prev, isVisible: false }));
    };


    if (isMaintenanceMode) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
                <div className="max-w-md">
                    <Lock className="w-16 h-16 mx-auto mb-6 text-black/20" />
                    <h1 className="text-3xl font-black tracking-tighter uppercase mb-4">Under Maintenance</h1>
                    <p className="text-black/50 text-sm leading-relaxed mb-8">
                        {settings?.announcement || "We are currently performing scheduled maintenance to improve your experience. Please check back soon."}
                    </p>
                    <button 
                        onClick={() => window.location.href = "/"}
                        className="px-8 py-4 bg-black text-white text-[11px] font-bold tracking-[0.3em] uppercase"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20">
            {isStoreClosed && (
                <div className="bg-amber-500 text-black py-3 px-6 text-center text-[10px] font-bold tracking-[0.2em] uppercase sticky top-0 z-[100]">
                    {settings?.announcement || "STORE IS CURRENTLY CLOSED FOR PURCHASES. BROWSING ONLY."}
                </div>
            )}
            {/* COMPACT PREMIUM HERO - Products visible immediately */}
            <div className="relative pt-20 md:pt-16 px-6 md:px-12 lg:px-20 pb-2 bg-white">
                <div className="relative z-10">
                    {/* Compact Title Bar with Breadcrumb Inline */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-4 border-b border-black/10"
                    >
                        {/* Left: Breadcrumb + Title */}
                        <div className="flex items-baseline gap-4">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-black/80">Shop</span>
                            <span className="text-black/20">/</span>
                            <motion.h1 
                                className="text-2xl md:text-3xl font-black tracking-tighter uppercase"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                ALL PRODUCTS
                            </motion.h1>
                        </div>
                        
                        {/* Right: Collection Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-wrap items-center gap-3"
                        >
                            <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", isStoreClosed ? "bg-amber-500" : "bg-green-500 animate-pulse")} />
                                <span className="text-[10px] tracking-[0.3em] uppercase text-black/40">
                                    {isStoreClosed ? "Browsing Mode" : "2026 Collection Live"}
                                </span>
                            </div>
                            <span className="hidden md:inline text-[10px] tracking-[0.25em] uppercase text-black/30">
                                {isLoading ? "Loading inventory" : `${products.length} curated pieces`}
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* CONTROLS BAR - Search, Categories, Sort, Count - NOT STICKY */}
            <div className="px-6 md:px-12 lg:px-20 py-3 bg-white border-b border-black/5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Category Filter - Horizontal Scroll on Mobile */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                        <span className="text-[10px] tracking-widest uppercase text-black/30 hidden md:block mr-2">Filter:</span>
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase transition-all rounded-none border whitespace-nowrap",
                                    activeCategory === cat 
                                        ? "bg-black text-white border-black" 
                                        : "bg-transparent text-black/50 border-black/10 hover:border-black/30 hover:text-black/70"
                                )}
                            >
                                {formatCategoryLabel(cat)}
                            </motion.button>
                        ))}
                    </div>

                    {/* Right Side Controls */}
                    <div className="flex items-center gap-3">
                        {/* Search Input */}
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-hover:text-black/50 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2.5 text-sm bg-transparent border border-black/10 focus:border-black/30 outline-none transition-colors w-40 md:w-56 placeholder:text-black/30"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative" ref={sortRef}>
                            <button
                                onClick={() => setShowSortDropdown(!showSortDropdown)}
                                className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase border border-black/10 hover:border-black/30 transition-colors bg-transparent"
                            >
                                <ArrowUpDown className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">{activeSortLabel}</span>
                                <span className="sm:hidden">Sort</span>
                            </button>
                            
                            <AnimatePresence>
                                {showSortDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-white border border-black/10 shadow-xl z-50"
                                    >
                                        {SORT_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setShowSortDropdown(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-4 py-3 text-[11px] tracking-widest uppercase transition-colors",
                                                    sortBy === option.value 
                                                        ? "bg-black text-white" 
                                                        : "hover:bg-black/5 text-black/70"
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Count & Results Info */}
            <div className="px-6 md:px-12 lg:px-20 mb-6">
                <motion.div 
                    key={`${activeCategory}-${searchQuery}-${sortBy}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <p className="text-[11px] tracking-widest uppercase text-black/40">
                        {isLoading ? (
                            "Preparing the collection..."
                        ) : (
                            <>
                                Showing <span className="text-black font-bold">{filteredProducts.length}</span> of <span className="text-black">{products.length}</span> products
                            </>
                        )}
                    </p>
                    {(activeCategory !== "ALL" || searchQuery) && (
                        <button
                            onClick={() => {
                                setActiveCategory("ALL");
                                setSearchQuery("");
                            }}
                            className="text-[11px] tracking-widest uppercase text-black/40 hover:text-black transition-colors underline"
                        >
                            Clear Filters
                        </button>
                    )}
                </motion.div>
            </div>

            {/* Product Grid - Premium 3D Cards */}
            <main className="px-6 md:px-12 lg:px-20 py-6">
                {isLoading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductSkeleton key={i} index={i} />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto max-w-2xl text-center py-24 px-6 border border-black/10 bg-[#fafafa]"
                    >
                        <ShoppingBag className="w-12 h-12 mx-auto mb-6 text-black/20" />
                        <p className="text-3xl font-black tracking-tight uppercase mb-3">Collection Loading Soon</p>
                        <p className="text-black/50 text-sm leading-relaxed mb-8">
                            We are preparing the latest SM pieces. Check back shortly or contact us for availability.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex px-8 py-4 bg-black text-white text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-neutral-800 transition-colors"
                        >
                            Contact Store
                        </a>
                    </motion.div>
                ) : filteredProducts.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto max-w-2xl text-center py-20 px-6 border border-black/10 bg-[#fafafa]"
                    >
                        <Search className="w-10 h-10 mx-auto mb-5 text-black/20" />
                        <p className="text-2xl font-black tracking-tight uppercase mb-2">No matching pieces</p>
                        <p className="text-black/50 mb-6">
                            No products match <span className="font-semibold text-black">{formatCategoryLabel(activeCategory)}</span>
                            {searchQuery ? ` for "${searchQuery}"` : ""}. Clear filters to browse the full collection.
                        </p>
                        <button
                            onClick={() => {
                                setActiveCategory("ALL");
                                setSearchQuery("");
                            }}
                            className="px-8 py-3 bg-black text-white text-sm tracking-widest uppercase hover:bg-black/80 transition-colors"
                        >
                            View All Products
                        </button>
                    </motion.div>
                ) : (
                    <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                        {filteredProducts.map((product, idx) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={idx}
                                onQuickAdd={() => handleQuickAdd(product)}
                                isNew={idx < 3}
                                isLimited={idx % 5 === 0}
                                isStoreClosed={isStoreClosed}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Product detail moved to `app/shop/[productId]/page.tsx` */}

            {/* Cart Toast */}
            <CartToast
                isVisible={cartToast.isVisible}
                productName={cartToast.productName}
                productImage={cartToast.productImage}
                productPrice={cartToast.productPrice}
                onClose={closeCartToast}
            />
        </div>
    );
}
