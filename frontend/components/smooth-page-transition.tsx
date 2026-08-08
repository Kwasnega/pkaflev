"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function SmoothPageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Scroll to top on route change
        window.scrollTo(0, 0);
        
        // Small delay to ensure smooth fade in
        const timer = setTimeout(() => setIsReady(true), 50);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ 
                    opacity: isReady ? 1 : 0, 
                    y: isReady ? 0 : 8 
                }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ 
                    duration: 0.4, 
                    ease: [0.25, 0.1, 0.25, 1] 
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
