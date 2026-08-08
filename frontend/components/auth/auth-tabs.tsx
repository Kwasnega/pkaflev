"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthTabsProps {
    activeTab: "signin" | "signup";
    onTabChange: (tab: "signin" | "signup") => void;
}

export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
    return (
        <div className="relative flex items-center justify-center gap-1">
            <button
                onClick={() => onTabChange("signin")}
                className={cn(
                    "relative px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 rounded-lg",
                    activeTab === "signin"
                        ? "text-white"
                        : "text-white/40 hover:text-white/70"
                )}
            >
                <span className={cn(
                    "transition-all duration-200",
                    activeTab === "signin" && "font-semibold"
                )}>
                    Sign In
                </span>
                {activeTab === "signin" && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}
            </button>

            <button
                onClick={() => onTabChange("signup")}
                className={cn(
                    "relative px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 rounded-lg",
                    activeTab === "signup"
                        ? "text-white"
                        : "text-white/40 hover:text-white/70"
                )}
            >
                <span className={cn(
                    "transition-all duration-200",
                    activeTab === "signup" && "font-semibold"
                )}>
                    Create Account
                </span>
                {activeTab === "signup" && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}
            </button>
        </div>
    );
}
