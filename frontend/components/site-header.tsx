"use client";

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
        <Link
            href={href}
            className="rounded-full border border-foreground/30 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-foreground transition hover:bg-foreground hover:text-background sm:text-sm md:tracking-widest"
        >
            {children}
        </Link>
    );
};

export interface SiteHeaderProps {
    leftAction?: React.ReactNode;
    disableThemeToggle?: boolean;
}


export function SiteHeader({ leftAction, disableThemeToggle = false }: SiteHeaderProps) {
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const q = searchParams?.get("search") || "";
        setQuery(q);
    }, [searchParams]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-transparent px-4 py-3 pointer-events-none">
            {/* Left: Hamburger */}
            <div className="flex items-center min-w-[32px] pointer-events-auto">
                <button className="text-white" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Center: Title */}
            <div className="flex-1 flex justify-center pointer-events-auto">
                <span className="text-white font-bold tracking-[0.3em] text-lg uppercase" style={{ letterSpacing: '0.3em' }}>Fear of God</span>
            </div>

            {/* Right: Search and Cart */}
            <div className="flex items-center gap-4 min-w-[64px] justify-end pointer-events-auto">
                <div className="relative">
                    <button onClick={() => { setShowSearch(v => !v); setTimeout(() => inputRef.current?.focus(), 50); }} className="text-white" aria-label="Search">
                        <Search className="h-5 w-5" />
                    </button>

                    {/* Search dropdown - matches header spacing and icon style */}
                    <div className="absolute right-0 mt-3">
                        <AnimatePresence>
                            {showSearch && (
                                <motion.form
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const encoded = encodeURIComponent(query.trim());
                                        router.push(`/shop${encoded ? `?search=${encoded}` : ``}`);
                                        setShowSearch(false);
                                    }}
                                    className="w-screen max-w-xs bg-white p-2 rounded shadow-xl flex items-center gap-2"
                                >
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search shop..."
                                        className="w-full px-3 py-2 text-sm bg-transparent outline-none"
                                    />
                                    <button type="button" onClick={() => { setShowSearch(false); setQuery(""); }} className="text-black/60">
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <Link href="/cart" className="text-white flex items-center" aria-label="Cart">
                    <ShoppingBag className="h-5 w-5" />
                    {/* Optionally show cart count: <span className="ml-1 text-xs">({mounted ? totalItems : 0})</span> */}
                </Link>
            </div>
        </header>
    );
}
