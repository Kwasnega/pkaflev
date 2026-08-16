"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
    onComplete: () => void;
}

const PRELOAD_IMAGES = [
    "/SMimages/pic4.webp",
    "/SMimages/pic5.webp",
    "/SMimages/pic6.webp",
    "/SMimages/pic19.webp",
    "/SMimages/pic1.webp",
    "/SMimages/pic3.webp",
    "/levlogo.png",
];

const TAGLINE = "Power Your Everyday.";

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [typedText, setTypedText] = useState("");
    const [showText, setShowText] = useState(false);
    const hasCompleted = useRef(false);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem("splashSeen");
        if (hasSeenSplash) {
            setIsVisible(false);
            if (!hasCompleted.current) {
                hasCompleted.current = true;
                onComplete();
            }
            return;
        }

        // Preload images in background
        PRELOAD_IMAGES.forEach((src) => {
            const image = new window.Image();
            image.src = src;
        });

        // Minimum splash duration: 5.5s so the logo video plays fully
        const MIN_SPLASH_MS = 5500;
        const FADE_OUT_MS = 1200;

        const start = Date.now();

        // Start typewriter 600ms after mount
        const textTimer = window.setTimeout(() => {
            setShowText(true);

            let i = 0;
            const typeInterval = window.setInterval(() => {
                i++;
                setTypedText(TAGLINE.slice(0, i));
                if (i >= TAGLINE.length) {
                    window.clearInterval(typeInterval);
                }
            }, 70);

            // Schedule exit after minimum splash time
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);

            const exitTimer = window.setTimeout(() => {
                setIsVisible(false);

                // Call onComplete after fade-out finishes
                const completeTimer = window.setTimeout(() => {
                    sessionStorage.setItem("splashSeen", "true");
                    window.dispatchEvent(new Event("splashComplete"));
                    if (!hasCompleted.current) {
                        hasCompleted.current = true;
                        onComplete();
                    }
                }, FADE_OUT_MS);

                return () => window.clearTimeout(completeTimer);
            }, remaining);

            return () => {
                window.clearInterval(typeInterval);
                window.clearTimeout(exitTimer);
            };
        }, 600);

        return () => window.clearTimeout(textTimer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    <motion.video
                        src="/SMimages/pkaflevlogo.mp4"
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-[24vw] max-w-[140px] md:w-[16vw] md:max-w-[200px] h-auto object-contain"
                    />

                    {/* Typewriter tagline */}
                    <AnimatePresence>
                        {showText && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="mt-5 md:mt-7 flex items-center"
                            >
                                <span className="text-white/60 text-[11px] md:text-[13px] tracking-[0.35em] uppercase font-medium font-mono">
                                    {typedText}
                                </span>
                                {typedText.length < TAGLINE.length && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.4, repeat: Infinity }}
                                        className="inline-block w-[2px] h-3.5 md:h-4 bg-white/60 ml-1.5"
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 5.5, ease: "linear" }}
                            className="h-full bg-white/30 origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
