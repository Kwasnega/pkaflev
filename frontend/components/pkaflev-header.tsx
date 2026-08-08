"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon, ShoppingBag as BagIcon, X, ChevronRight, Menu, User, Trash2, Plus, Minus, Heart, BriefcaseBusiness } from "lucide-react";
import { useCart } from "./cart-provider";
import { useWishlist } from "./wishlist-provider";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "./product-provider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "@/components/auth";

// Magnetic Nav Link Component
function MagneticNavLink({ 
  children, 
  href, 
  onMouseEnter, 
  className,
  isActive 
}: { 
  children: React.ReactNode; 
  href: string; 
  onMouseEnter?: () => void;
  className?: string;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull strength
    setPosition({ 
      x: distanceX * 0.3, 
      y: distanceY * 0.3 
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-block transition-transform duration-200 ease-out",
        className
      )}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <span className={cn(
        "relative z-10 transition-all duration-300",
        isActive && "text-current"
      )}>
        {children}
      </span>
      {isActive && (
        <motion.div
          layoutId="nav-active"
          className="absolute -inset-2 bg-current/10 rounded-sm -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

// View Cart Button with slide animation
function ViewCartButton({ 
    isLightBase, 
    forceBlack,
    onClick 
}: { 
    isLightBase: boolean; 
    forceBlack: boolean;
    onClick: () => void;
}) {
    const [isSliding, setIsSliding] = useState(false);

    const handleClick = () => {
        setIsSliding(true);
        // Wait for animation then navigate
        setTimeout(() => {
            onClick();
        }, 400);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isSliding}
            className={cn(
                "relative block w-full py-3 text-center text-xs font-bold tracking-widest overflow-hidden transition-all duration-300",
                isLightBase || forceBlack
                    ? "bg-black text-white"
                    : "bg-white text-black"
            )}
        >
            {/* Background slide animation */}
            <span 
                className={cn(
                    "absolute inset-0 transition-transform duration-400 ease-out",
                    isLightBase || forceBlack ? "bg-white" : "bg-black",
                    isSliding ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ transitionDuration: '400ms' }}
            />
            
            {/* Text content */}
            <span className={cn(
                "relative z-10 flex items-center justify-center gap-2 transition-colors duration-300",
                isSliding ? (isLightBase || forceBlack ? "text-black" : "text-white") : ""
            )}>
                <span className={cn(
                    "transition-transform duration-400",
                    isSliding ? "translate-x-8 opacity-0" : "translate-x-0"
                )}>
                    VIEW CART
                </span>
                <span className={cn(
                    "absolute transition-all duration-400",
                    isSliding ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}>
                    {isLightBase || forceBlack ? "→" : "→"}
                </span>
            </span>
        </button>
    );
}

interface PkaflevHeaderProps {
    className?: string;
}

export const PkaflevHeader = ({ className }: PkaflevHeaderProps) => {
    const { totalItems, items, removeItem, updateQuantity, subtotal, settings } = useCart();
    const { totalWishlistItems } = useWishlist();
    const { isAuthenticated } = useAuth();
    const { products } = useProducts();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [expandedMobileLink, setExpandedMobileLink] = useState<string | null>(null);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [accountTab, setAccountTab] = useState<"login" | "signup">("login");
    const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const cartPreviewRef = useRef<HTMLDivElement>(null);
    const lastScrollYRef = useRef(0);
    const pathname = usePathname();

    // Handle account icon click - redirect if logged in, show modal if not
    const handleAccountClick = () => {
        if (isAuthenticated) {
            router.push("/account");
        } else {
            setIsAccountOpen(true);
            setAccountTab("login");
        }
    };

    const isAccountPage = pathname === "/account";
    const isWishlistPage = pathname === "/wishlist";
    const isPolicyPage = ["/contact", "/services", "/legal", "/supply-chain"].includes(pathname || "");
    const isShopPage = pathname?.startsWith("/shop") || pathname === "/shop";
    const forceSolid = isAccountPage || isShopPage || isWishlistPage;
    const forceBlack = isPolicyPage;

    // Determine if the base header style is "light" (white/scrolled) or "dark" (transparent/hero)
    const isLightBase = (scrolled || forceSolid) && !forceBlack;

    // Close cart preview when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartPreviewRef.current && !cartPreviewRef.current.contains(event.target as Node)) {
                setIsCartPreviewOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Header transparency logic
            setScrolled(currentScrollY > 20);

            // Hide/Show logic — use ref to avoid stale closure without re-registering listener
            if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
                setIsVisible(false);
                setHoveredLink(null);
            } else {
                setIsVisible(true);
            }

            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // ← empty array: register once, never re-register

    // Prevent scrolling when menu is open or mega menu is active
    useEffect(() => {
        if (isMenuOpen || hoveredLink) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen, hoveredLink]);

    if (!mounted) return null;

    const navLinks = [
        {
            name: "SHOP",
            href: "/shop",
            subLinks: [
                { name: "Electric Scooters", href: "/shop?category=ELECTRIC%20SCOOTERS" },
                { name: "Electric Bikes", href: "/shop?category=ELECTRIC%20BIKES" },
                { name: "Motorbikes", href: "/shop?category=MOTORBIKES" },
                { name: "Accessories", href: "/shop?category=ACCESSORIES" },
            ],
        },
        { name: "BECOME A PARTNER", href: "/partner" },
        { name: "SUPPORT", href: "/contact" },
    ];

    const megaMenuContent: Record<string, { links: { name: string, href: string }[], featured: { title: string, image: string }[] }> = {
        "SHOP": {
            links: [
                { name: "Electric Scooters", href: "/shop?category=ELECTRIC%20SCOOTERS" },
                { name: "Electric Bikes", href: "/shop?category=ELECTRIC%20BIKES" },
                { name: "Motorbikes", href: "/shop?category=MOTORBIKES" },
                { name: "Accessories", href: "/shop?category=ACCESSORIES" },
            ],
            featured: [
                { title: "ELECTRIC SCOOTERS", image: "/images/products/scooter-1.jpg" },
                { title: "ELECTRIC BIKES", image: "/images/products/ebike-1.jpg" }
            ]
        }
    };

    const utilityLinks = [
        { name: "CONTACT", href: "/contact" },
        { name: "CLIENT SERVICES", href: "/services" },
        { name: "LEGAL NOTICES", href: "/legal" },
        { name: "SUPPLY CHAINS ACT", href: "/supply-chain" },
        { name: "SOCIAL", href: "/social" },
    ];

    return (
        <div onMouseLeave={() => setHoveredLink(null)} className="relative">


            <header
                style={{ backfaceVisibility: 'hidden' }}
                className={cn(
                    "fixed top-0 left-0 right-0 w-full z-[120] flex items-center px-6 transition-[background-color,border-color,height,opacity] duration-300 ease-in-out",
                    !isVisible && !isMenuOpen && !isAccountOpen ? "opacity-0 pointer-events-none" : "opacity-100",
                    (scrolled || forceSolid || isMenuOpen) 
                        ? "h-14 bg-white text-black border-b border-black/5" 
                        : hoveredLink
                            ? cn("h-14 transition-colors duration-300", isLightBase ? "bg-white text-black" : "bg-black/20 text-white backdrop-blur-2xl")
                            : "h-20 bg-transparent text-white",
                    forceBlack && "bg-black text-white border-none",
                    className
                )}
            >
                {/* Desktop: Left Navigation with Magnetic Effect */}
                <nav className={cn(
                    "hidden lg:flex flex-1 items-center justify-start gap-12 text-[11px] font-bold tracking-[0.2em]",
                    forceBlack
                        ? "text-white"
                        : !!hoveredLink
                            ? isLightBase ? "text-black" : "text-white"
                            : (scrolled || forceSolid) ? "text-black" : "text-white"
                )}>
                    {navLinks.map((link) => (
                        <MagneticNavLink
                            key={link.name}
                            href={link.href}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            isActive={hoveredLink === link.name}
                            className={cn(
                                "pb-1",
                                hoveredLink === link.name ? "opacity-100" : "hover:opacity-60"
                            )}
                        >
                            {link.name}
                            {hoveredLink === link.name && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className={cn(
                                        "absolute left-0 right-0 bottom-[-2px] h-[1.5px]",
                                        isLightBase ? "bg-black" : "bg-white"
                                    )}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </MagneticNavLink>
                    ))}
                </nav>

                {/* Mobile: Left Menu Icon */}
                <div className="flex lg:hidden w-16 justify-start">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={cn(
                            "hover:opacity-60 transition-opacity",
                            forceBlack
                                ? "text-white"
                                : !!hoveredLink
                                    ? isLightBase ? "text-black" : "text-white"
                                    : (scrolled || forceSolid || isShopPage) ? "text-black" : "text-white"
                        )}
                    >
                        <Menu size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Logo (Centered) - Always Black on Shop Page */}
                <div className="flex flex-1 justify-center min-w-0 px-4">
                    <Link href="/" className="group relative" onClick={() => setIsMenuOpen(false)}>
                        <img
                            src="/levlogo.png"
                            alt="LEV"
                            className="h-[7.5rem] lg:h-[8.5rem] w-auto object-contain max-w-[300px] lg:max-w-[340px] transition-all duration-300 drop-shadow-lg"
                        />
                    </Link>
                </div>

                {/* Desktop: Right Navigation — Wishlist, Account, and Cart Preview */}
                <nav className={cn(
                    "hidden lg:flex flex-1 items-center justify-end gap-6",
                    forceBlack
                        ? "text-white"
                        : !!hoveredLink
                            ? isLightBase ? "text-black" : "text-white"
                            : (scrolled || forceSolid) ? "text-black" : "text-white"
                )}
                    onMouseEnter={() => setHoveredLink(null)}
                >
                    <button
                        onClick={() => router.push("/wishlist")}
                        className="hover:opacity-60 transition-opacity relative p-1 magnetic-icon"
                        aria-label="Wishlist"
                    >
                        <Heart className="h-5 w-5" strokeWidth={1.5} />
                        {mounted && totalWishlistItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] text-white font-bold">
                                {totalWishlistItems}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={handleAccountClick}
                        className="hover:opacity-60 transition-opacity p-1 magnetic-icon"
                        aria-label="Account"
                    >
                        <User className="h-5 w-5" strokeWidth={1.5} />
                    </button>

                    <div ref={cartPreviewRef} className="relative">
                        <button
                            onClick={() => setIsCartPreviewOpen(!isCartPreviewOpen)}
                            onMouseEnter={() => totalItems > 0 && setIsCartPreviewOpen(true)}
                            className="hover:opacity-60 transition-opacity relative p-1 magnetic-icon"
                            aria-label="Cart"
                        >
                            <BagIcon className="h-5 w-5" strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className={cn(
                                    "absolute -top-1 -right-1 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse",
                                    isLightBase || forceBlack ? "bg-black text-white" : "bg-white text-black"
                                )}>
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Cart Preview Dropdown */}
                        <AnimatePresence>
                            {isCartPreviewOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className={cn(
                                        "absolute right-0 top-full mt-4 w-[380px] shadow-2xl border z-[200]",
                                        isLightBase || forceBlack
                                            ? "bg-white border-black/10 text-black"
                                            : "bg-black/95 border-white/10 text-white backdrop-blur-xl"
                                    )}
                                >
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-current/10">
                                            <span className="text-sm font-bold tracking-wider">YOUR BAG ({totalItems})</span>
                                            <button
                                                onClick={() => setIsCartPreviewOpen(false)}
                                                className="hover:opacity-60"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {items.length === 0 ? (
                                            <div className="text-center py-6">
                                                <BagIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                                <p className="text-sm font-bold tracking-wider uppercase mb-1">BAG&apos;S LOOKING LIGHT.</p>
                                                <p className="text-xs text-current/50 uppercase tracking-widest mb-4">FIX THAT.</p>

                                                {/* Recommended Products */}
                                                <div className="mt-4 pt-4 border-t border-current/10">
                                                    <p className="text-[10px] text-current/40 uppercase tracking-widest mb-3 text-left">You Might Like</p>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {products.slice(0, 3).map((product) => (
                                                            <Link
                                                                key={product.id}
                                                                href={`/shop/product/${product.id}`}
                                                                onClick={() => setIsCartPreviewOpen(false)}
                                                                className="group text-left"
                                                            >
                                                                <div className="aspect-[3/4] bg-current/5 overflow-hidden mb-1.5">
                                                                    <Image
                                                                        src={product.image || "/levlogo.png"}
                                                                        alt={product.name}
                                                                        width={100}
                                                                        height={133}
                                                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                                    />
                                                                </div>
                                                                <p className="text-[9px] font-bold truncate group-hover:underline">{product.name}</p>
                                                                <p className="text-[9px] text-current/60">{product.price || "GH₵0.00"}</p>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                <Link
                                                    href="/shop"
                                                    onClick={() => setIsCartPreviewOpen(false)}
                                                    className={cn(
                                                        "inline-block mt-5 px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase hover:opacity-80 transition-opacity",
                                                        isLightBase || forceBlack
                                                            ? "bg-black text-white"
                                                            : "bg-white text-black"
                                                    )}
                                                >
                                                    SHOP NOW
                                                </Link>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                                                    {items.map((item, index) => (
                                                        <div key={`${item.product.id}-${index}`} className="flex gap-3">
                                                            <div className="w-16 h-20 bg-current/5 flex-shrink-0 overflow-hidden">
                                                                {item.product.image ? (
                                                                    <Image
                                                                        src={item.product.image}
                                                                        alt={item.product.name}
                                                                        width={64}
                                                                        height={80}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full bg-current/10 flex items-center justify-center">
                                                                        <BagIcon className="w-6 h-6 text-current/30" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-bold truncate">{item.product.name}</p>
                                                                <p className="text-[10px] text-current/60 mt-0.5">Qty: {item.quantity}</p>
                                                                <div className="flex items-center justify-between mt-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <button
                                                                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                                            className="w-5 h-5 border border-current/20 flex items-center justify-center hover:bg-current/10"
                                                                        >
                                                                            <Minus className="w-3 h-3" />
                                                                        </button>
                                                                        <span className="text-xs w-4 text-center">{item.quantity}</span>
                                                                        <button
                                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                            className="w-5 h-5 border border-current/20 flex items-center justify-center hover:bg-current/10"
                                                                        >
                                                                            <Plus className="w-3 h-3" />
                                                                        </button>
                                                                    </div>
                                                                    <span className="text-xs font-bold">{item.product.price}</span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => removeItem(item.product.id)}
                                                                className="self-start p-1 hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-current/10">
                                                    <div className="flex justify-between mb-4">
                                                        <span className="text-sm">Subtotal</span>
                                                        <span className="text-sm font-bold">GH₵{subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <ViewCartButton
                                                        isLightBase={isLightBase}
                                                        forceBlack={forceBlack}
                                                        onClick={() => {
                                                            setIsCartPreviewOpen(false);
                                                            window.location.href = "/cart";
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* Mobile: Right Icons */}
                <div className={cn(
                    "flex lg:hidden w-28 justify-end gap-3",
                    forceBlack
                        ? "text-white"
                        : !!hoveredLink
                            ? isLightBase ? "text-black" : "text-white"
                            : (scrolled || forceSolid || isMenuOpen || isShopPage) ? "text-black" : "text-white"
                )}
                    onMouseEnter={() => setHoveredLink(null)}
                >
                    <button
                        onClick={() => router.push('/wishlist')}
                        className="hover:opacity-60 transition-opacity p-1 relative"
                        aria-label="Wishlist"
                    >
                        <Heart className="h-5 w-5" strokeWidth={1.5} />
                        {mounted && totalWishlistItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {totalWishlistItems}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={handleAccountClick}
                        className="hover:opacity-60 transition-opacity p-1" aria-label="Account">
                        <User className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                    <Link href="/cart" className="hover:opacity-60 transition-opacity relative p-1" onClick={() => setIsMenuOpen(false)} aria-label="Cart">
                        <BagIcon className="h-5 w-5" strokeWidth={1.5} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Account Modal */}
                <AuthModal
                    isOpen={isAccountOpen}
                    onClose={() => setIsAccountOpen(false)}
                    defaultTab={accountTab === "login" ? "signin" : "signup"}
                />
            </header>

            {/* Mega Menu Overlay */}
            <AnimatePresence>
                {hoveredLink && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed inset-x-0 top-[56px] bottom-0 z-[110] backdrop-blur-2xl overflow-hidden flex flex-col"
                    >
                        <div
                            className={cn(
                                "w-full h-[65vh] min-h-[460px] border-b border-black/5 transition-colors duration-300 relative z-20",
                                isLightBase ? "bg-white text-black" : "bg-black/20 text-white"
                            )}
                            onMouseEnter={(e) => e.stopPropagation()}
                        >
                            {hoveredLink && megaMenuContent[hoveredLink] && (
                                <div className="w-full px-10 md:px-14 py-10 pb-16 flex justify-between gap-20 h-full max-w-[1920px] mx-auto overflow-y-auto">
                                    {/* Sub Links */}
                                    <div className="flex flex-col gap-5 min-w-[200px]">
                                        {megaMenuContent[hoveredLink].links.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={cn(
                                                    "text-[12px] tracking-[0.4em] font-bold transition-colors",
                                                    isLightBase ? "text-black hover:text-black/70" : "text-white hover:text-white/70"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Featured Items */}
                                    <div className="flex gap-10">
                                        {megaMenuContent[hoveredLink].featured.map((item, idx) => (
                                            <div key={idx} className="group cursor-pointer w-[200px] lg:w-[240px]">
                                                <div className="aspect-[2/3] h-[300px] lg:h-[360px] overflow-hidden bg-zinc-100 mb-4 rounded-[2px] relative">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                                <p className={cn(
                                                    "text-[10px] tracking-[0.4em] font-bold transition-colors uppercase",
                                                    isLightBase ? "text-black" : "text-white"
                                                )}>
                                                    {item.title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Interaction Dead Zone: Closes menu when entering the blurred mirror area below */}
                        <div
                            className="flex-1 w-full relative z-10 cursor-default"
                            onMouseEnter={() => setHoveredLink(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Drawer Menu - Slides from right */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        
                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-full max-w-sm z-[140] bg-neutral-950 shadow-2xl flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <Image
                                    src="/levlogo.png"
                                    alt="LEV"
                                    width={120}
                                    height={40}
                                    className="h-8 w-auto object-contain brightness-0 invert"
                                />
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white hover:bg-white/10 transition-colors p-2 rounded-lg"
                                >
                                    <X size={24} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Main Navigation */}
                            <nav className="flex-1 overflow-y-auto">
                                <div className="p-5 space-y-1">
                                    {navLinks.map((link, index) => {
                                        const isExpanded = expandedMobileLink === link.name;
                                        const isShopLink = link.name === "SHOP";

                                        return (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.08, duration: 0.4 }}
                                            >
                                                {isShopLink ? (
                                                    <div className="rounded-xl border border-white/5 bg-white/[0.02]">
                                                        <button
                                                            type="button"
                                                            onClick={() => setExpandedMobileLink(isExpanded ? null : link.name)}
                                                            className="flex w-full items-center justify-between py-4 px-4 text-white text-lg font-bold tracking-wide uppercase hover:bg-white/5 rounded-xl transition-colors group"
                                                        >
                                                            <span>{link.name}</span>
                                                            <ChevronRight
                                                                size={20}
                                                                className={cn(
                                                                    "text-white/30 group-hover:text-white/60 transition-colors transition-transform",
                                                                    isExpanded && "rotate-90"
                                                                )}
                                                            />
                                                        </button>

                                                        <AnimatePresence initial={false}>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                                    className="overflow-hidden border-t border-white/10"
                                                                >
                                                                    <div className="space-y-1 px-3 py-3">
                                                                        {link.subLinks?.map((subLink) => (
                                                                            <Link
                                                                                key={subLink.name}
                                                                                href={subLink.href}
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium uppercase tracking-[0.12em] text-white/70 hover:bg-white/5 hover:text-white"
                                                                            >
                                                                                <span>{subLink.name}</span>
                                                                                <ChevronRight size={14} className="text-white/30" />
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center justify-between py-4 px-4 text-white text-lg font-bold tracking-wide uppercase hover:bg-white/5 rounded-xl transition-colors group"
                                                    >
                                                        <span>{link.name}</span>
                                                        <ChevronRight
                                                            size={20}
                                                            className="text-white/30 group-hover:text-white/60 transition-colors"
                                                        />
                                                    </Link>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Divider */}
                                <div className="mx-5 h-px bg-white/10 my-4" />

                                {/* Quick Actions */}
                                <div className="px-5 space-y-2">
                                    <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-3 px-4">Quick Access</p>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Link
                                            href="/cart"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 py-3 px-4 text-white/80 hover:bg-white/5 rounded-xl transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                                <BagIcon size={18} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-sm font-medium tracking-wide">Shopping Cart</span>
                                                {totalItems > 0 && (
                                                    <span className="text-white/50 text-xs ml-2">({totalItems})</span>
                                                )}
                                            </div>
                                            <ChevronRight size={16} className="text-white/30" />
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <button
                                            onClick={() => { 
                                                setIsMenuOpen(false); 
                                                handleAccountClick();
                                            }}
                                            className="w-full flex items-center gap-3 py-3 px-4 text-white/80 hover:bg-white/5 rounded-xl transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                                <User size={18} strokeWidth={1.5} />
                                            </div>
                                            <span className="text-sm font-medium tracking-wide">My Account</span>
                                            <ChevronRight size={16} className="text-white/30 ml-auto" />
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <Link
                                            href="/partner/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 py-3 px-4 text-white/80 hover:bg-white/5 rounded-xl transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                                <BriefcaseBusiness size={18} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-sm font-medium tracking-wide">Partner Login</span>
                                            </div>
                                            <ChevronRight size={16} className="text-white/30" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </nav>

                            {/* Footer Links */}
                            <div className="border-t border-white/10 p-5 bg-black/20">
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {utilityLinks.slice(0, 4).map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-white/40 text-[11px] tracking-wider uppercase hover:text-white/70 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

