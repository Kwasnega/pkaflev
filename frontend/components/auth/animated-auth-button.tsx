"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
}

export function AnimatedAuthButton({ isLoading, children, className, disabled, ...props }: AnimatedAuthButtonProps) {
    return (
        <button
            disabled={disabled || isLoading}
            className={cn(
                "relative w-full bg-white text-black py-4 rounded-xl overflow-hidden",
                "text-[12px] font-bold tracking-[0.12em] uppercase",
                "transition-all duration-300 ease-out",
                "hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                className
            )}
            {...props}
        >
            {/* Content container with slide animation */}
            <motion.div
                className="relative flex items-center justify-center gap-2"
                initial={false}
                animate={{
                    x: isLoading ? 30 : 0,
                    opacity: isLoading ? 0 : 1,
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
            >
                {children}
            </motion.div>

            {/* Loading spinner that slides in */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                animate={{
                    x: isLoading ? 0 : -30,
                    opacity: isLoading ? 1 : 0,
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: isLoading ? 0.15 : 0,
                }}
            >
                <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </motion.div>

            {/* Subtle shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        </button>
    );
}
