"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function MobileStickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past first hero
            setIsVisible(window.scrollY > window.innerHeight * 0.5);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div 
            className={`
                fixed bottom-0 left-0 right-0 z-50 md:hidden
                transform transition-transform duration-500 ease-out
                ${isVisible && !isDismissed ? "translate-y-0" : "translate-y-full"}
            `}
        >
            <div className="bg-black/90 backdrop-blur-md border-t border-white/10 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                        <p className="text-white text-[10px] font-medium tracking-wide">
                            Free shipping on orders over $150
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="flex-shrink-0 px-5 py-2.5 bg-white text-black text-[11px] font-bold tracking-[0.15em] uppercase active:scale-95 transition-transform"
                    >
                        Shop Now
                    </Link>
                    {/* Close button */}
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="flex-shrink-0 p-1.5 text-white/40 hover:text-white/80 transition-colors rounded-full hover:bg-white/10"
                        aria-label="Dismiss"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
            {/* Safe area padding for mobile */}
            <div className="h-[env(safe-area-inset-bottom)] bg-black" />
        </div>
    );
}
