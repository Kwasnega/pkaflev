"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem("cookieConsent");
        if (!hasAccepted) {
            // Delay 7 seconds before showing cookie consent
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        // Still store to prevent showing again
        localStorage.setItem("cookieConsent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-5 md:p-6">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                                {/* Icon */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
                                    <Cookie className="w-6 h-6 text-black/60" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-black font-semibold text-sm md:text-base mb-1">
                                        We value your privacy
                                    </h3>
                                    <p className="text-black/60 text-xs md:text-sm leading-relaxed">
                                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-row gap-3 w-full md:w-auto flex-shrink-0">
                                    <button
                                        onClick={handleDecline}
                                        className="flex-1 md:flex-none px-5 py-2.5 text-[11px] md:text-xs font-medium text-black/60 hover:text-black transition-colors rounded-xl border border-black/10 hover:border-black/20"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 md:flex-none px-5 py-2.5 bg-black text-white text-[11px] md:text-xs font-bold tracking-wide rounded-xl hover:bg-black/80 transition-all active:scale-95"
                                    >
                                        Accept All
                                    </button>
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={handleDecline}
                                    className="absolute top-3 right-3 md:static md:ml-2 p-2 text-black/30 hover:text-black/60 transition-colors rounded-lg hover:bg-black/5"
                                    aria-label="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
