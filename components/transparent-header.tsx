"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ShoppingBag, Sun, User, Search, X, Home } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";



export interface TransparentHeaderProps {
    logoText?: string;
    className?: string;
    absolute?: boolean;
    forceLightMode?: boolean;
    disableThemeToggle?: boolean;
    hideElements?: ("home" | "search" | "cart" | "auth")[];
}

export const TransparentHeader = ({
    logoText = "46",
    className,
    absolute = true,
    forceLightMode = false,
    disableThemeToggle = false,
    hideElements = [],
}: TransparentHeaderProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={cn("w-full z-[100] flex flex-col items-center bg-background text-foreground transition-colors duration-300", absolute ? "absolute top-0 left-0 right-0 px-6 py-4 md:px-12 border-t-[6px] border-foreground" : "px-6 py-4 md:px-12 border-t-[6px] border-foreground", forceLightMode ? "bg-white text-black border-black" : "", className)}>
            <header className="flex w-full max-w-7xl items-center justify-between">

                {/* Desktop Left Nav */}
                <div className={cn("hidden lg:flex flex-1 items-center justify-start gap-8 text-[11px] font-mono tracking-widest font-bold uppercase", forceLightMode ? "text-black" : "text-foreground")}>
                    <Link href="/shop" className="hover:opacity-60 transition-opacity">FEATURED</Link>
                    <Link href="/shop" className="hover:opacity-60 transition-opacity">COLLECTIONS</Link>
                    <Link href="/shop" className="hover:opacity-60 transition-opacity">MENS</Link>
                    <Link href="/shop" className="hover:opacity-60 transition-opacity">WOMENS</Link>
                    <Link href="/shop" className="hover:opacity-60 transition-opacity">KIDS</Link>
                </div>

                {/* Center Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-1 justify-center lg:justify-center justify-start"
                >
                    <Link href="/" className="flex items-center">
                        <img
                            src="/levlogo.png"
                            alt={logoText || "LEV"}
                            className={cn("h-6 md:h-8 object-contain dark:invert", forceLightMode && "invert-0 dark:invert-0")}
                        />
                    </Link>
                </motion.div>

                {/* Desktop Right Nav (Text based) */}
                <div className={cn("hidden lg:flex flex-1 items-center justify-end gap-8 text-[11px] font-mono tracking-widest font-bold uppercase", forceLightMode ? "text-black" : "text-foreground")}>
                    {!disableThemeToggle && <ThemeToggle />}
                    {!hideElements.includes("search") && (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="hover:opacity-60 transition-opacity uppercase"
                        >
                            SEARCH
                        </button>
                    )}

                    {!hideElements.includes("cart") && (
                        <Link
                            href="/cart"
                            className="hover:opacity-60 transition-opacity uppercase"
                        >
                            BAG {mounted && totalItems > 0 ? `(${totalItems})` : ""}
                        </Link>
                    )}
                </div>

                {/* Mobile Right Icons */}
                <div className={cn("flex flex-1 items-center justify-end gap-5 lg:hidden", forceLightMode ? "text-black" : "text-foreground")}>
                    {!disableThemeToggle && <ThemeToggle />}
                    {/* Mobile Search Button */}
                    {!hideElements.includes("search") && (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
                        </button>
                    )}



                    {/* Mobile Cart */}
                    {!hideElements.includes("cart") && (
                        <Link
                            href="/cart"
                            className="hover:opacity-70 transition-opacity relative"
                            aria-label="Cart"
                        >
                            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
                            {mounted && totalItems > 0 && (
                                <span className={cn(
                                    "absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold",
                                    forceLightMode ? "bg-black text-white" : "bg-foreground text-background"
                                )}>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Mobile Menu */}
                    <button
                        aria-label="Open menu"
                        onClick={() => setMobileOpen((open) => !open)}
                        className="flex flex-col space-y-[4px] hover:opacity-70 transition-opacity ml-1"
                    >
                        <span className={cn("block h-[1.5px] w-6", forceLightMode ? "bg-black" : "bg-foreground")} />
                        <span className={cn("block h-[1.5px] w-6", forceLightMode ? "bg-black" : "bg-foreground")} />
                        <span className={cn("block h-[1.5px] w-6", forceLightMode ? "bg-black" : "bg-foreground")} />
                    </button>
                </div>
            </header>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-start bg-background/95 backdrop-blur-md px-6 py-24 md:px-12"
                    >
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-8 right-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/30 bg-background hover:bg-foreground hover:text-background transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="w-full max-w-4xl mx-auto space-y-8">
                            <h2 className="text-sm font-bold tracking-widest uppercase text-foreground/50">
                                Search 46
                            </h2>
                            <form className="relative" onSubmit={(e) => { e.preventDefault(); /* Implement actual search redirect or filter logic here */ setSearchOpen(false); }}>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="COLLECTIONS, ITEMS, STYLES..."
                                    className="w-full bg-transparent border-b-2 border-foreground/30 pb-4 text-3xl md:text-5xl lg:text-7xl font-light tracking-widest text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-foreground transition-colors"
                                />
                                <button type="submit" className="absolute right-0 bottom-4 text-foreground hover:text-foreground/70 transition-colors">
                                    <Search className="h-8 w-8 md:h-12 md:w-12" />
                                </button>
                            </form>
                            <div className="pt-8 flex flex-col gap-4">
                                <p className="text-xs font-bold tracking-widest uppercase text-foreground/50">Popular</p>
                                <div className="flex flex-wrap gap-4">
                                    {["HOODIES", "TS-01", "ACCESSORIES", "NEW IN"].map((term) => (
                                        <button key={term} className="text-sm font-light tracking-widest uppercase border border-foreground/20 rounded-full px-4 py-2 hover:bg-foreground hover:text-background transition-colors">
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={cn("relative z-30 mt-4 w-full max-w-7xl rounded-2xl border p-4 shadow-sm md:hidden", forceLightMode ? "bg-white/95 border-black/10 text-black" : "bg-background/95 border-foreground/10")}
                    >
                        {!hideElements.includes("home") && (
                            <nav className="flex flex-col gap-6 font-mono tracking-widest text-sm font-bold uppercase">
                                <Link
                                    href="/"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-between hover:opacity-70 transition-opacity py-2 border-b border-foreground/10"
                                >
                                    <span>HOME</span>
                                    <Home className="h-4 w-4" strokeWidth={1.5} />
                                </Link>
                                {/* Additional links removed per user request */}
                            </nav>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
