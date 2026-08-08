"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
    onComplete: () => void;
}

// Glitch characters for scrambling effect
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isGlitching, setIsGlitching] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [taglineText, setTaglineText] = useState("");
    const [showTagline, setShowTagline] = useState(false);
    const [rgbOffset, setRgbOffset] = useState({ r: 0, g: 0, b: 0 });

    const TARGET_TEXT = "PKAF LEV";
    const TAGLINE = "WE WEAR THE FUTURE";

    // Scramble text effect
    const scrambleText = useCallback((target: string, setText: (text: string) => void, duration: number = 1500) => {
        const chars = target.split("");
        const totalFrames = duration / 50;
        let frame = 0;

        const interval = setInterval(() => {
            const progress = frame / totalFrames;
            const revealedCount = Math.floor(progress * chars.length);

            const currentText = chars.map((char, i) => {
                if (i < revealedCount) return char;
                if (char === " ") return " ";
                return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }).join("");

            setText(currentText);
            frame++;

            if (frame > totalFrames) {
                clearInterval(interval);
                setText(target);
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // RGB Glitch effect
    const triggerGlitch = useCallback(() => {
        setRgbOffset({
            r: (Math.random() - 0.5) * 10,
            g: (Math.random() - 0.5) * 10,
            b: (Math.random() - 0.5) * 10
        });
        setTimeout(() => setRgbOffset({ r: 0, g: 0, b: 0 }), 100);
    }, []);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem("splashSeen");
        if (hasSeenSplash) {
            setIsVisible(false);
            onComplete();
            return;
        }

        // Start glitch effect
        setIsGlitching(true);

        // Scramble main text
        const cleanup = scrambleText(TARGET_TEXT, setDisplayText, 1800);

        // Random glitch triggers during animation
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) triggerGlitch();
        }, 200);

        // Show tagline after main text
        const taglineTimer = setTimeout(() => {
            setShowTagline(true);
            scrambleText(TAGLINE, setTaglineText, 1200);
        }, 2000);

        // Let text sit for a moment before transitioning
        const completeTimer = setTimeout(() => {
            setIsGlitching(false);
            // Wait 2 seconds for user to read, then smooth transition
            setTimeout(() => {
                sessionStorage.setItem("splashSeen", "true");
                setIsVisible(false);
                window.dispatchEvent(new Event('splashComplete'));
                onComplete();
            }, 2000);
        }, 4500);

        return () => {
            cleanup();
            clearInterval(glitchInterval);
            clearTimeout(taglineTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete, scrambleText, triggerGlitch]);

    if (!isVisible) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="splash"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ 
                    opacity: 0, 
                    scale: 0.95,
                    y: -30,
                    filter: "blur(10px)"
                }}
                transition={{ 
                    duration: 1.2, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    opacity: { duration: 0.8, ease: "easeOut" },
                    scale: { duration: 1.0, ease: "easeOut" },
                    y: { duration: 0.9, ease: [0.33, 1, 0.68, 1] }
                }}
                className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden will-change-transform"
            >
                {/* Animated noise background */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Scanlines */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.08]"
                    style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                    }}
                />

                {/* CRT flicker */}
                <motion.div
                    animate={{ opacity: [0, 0.02, 0, 0.01, 0] }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute inset-0 bg-white pointer-events-none"
                />

                {/* RGB Split layers */}
                <div className="relative z-10 text-center">
                    {/* Red channel offset */}
                    <motion.div
                        animate={{ x: rgbOffset.r, opacity: isGlitching ? 0.8 : 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ color: '#ff0000', mixBlendMode: 'screen' }}
                    >
                        <span className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                            {displayText}
                        </span>
                    </motion.div>

                    {/* Green channel offset */}
                    <motion.div
                        animate={{ x: rgbOffset.g, opacity: isGlitching ? 0.8 : 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ color: '#00ff00', mixBlendMode: 'screen' }}
                    >
                        <span className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                            {displayText}
                        </span>
                    </motion.div>

                    {/* Blue channel offset */}
                    <motion.div
                        animate={{ x: rgbOffset.b, opacity: isGlitching ? 0.8 : 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ color: '#0000ff', mixBlendMode: 'screen' }}
                    >
                        <span className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                            {displayText}
                        </span>
                    </motion.div>

                    {/* Main text with glitch effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative"
                    >
                        {/* Text shadow/glow */}
                        <div 
                            className="absolute inset-0 blur-xl opacity-50"
                            style={{
                                textShadow: '0 0 60px rgba(255,255,255,0.5), 0 0 120px rgba(255,255,255,0.3)'
                            }}
                        >
                            <span className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
                                {displayText}
                            </span>
                        </div>

                        {/* Main text */}
                        <motion.h1
                            className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white relative"
                            animate={isGlitching ? {
                                skewX: [0, -2, 2, -1, 0],
                            } : {}}
                            transition={{ duration: 0.1 }}
                        >
                            {displayText || "\u00A0"}
                        </motion.h1>

                        {/* Glitch bars overlay */}
                        {isGlitching && (
                            <>
                                <motion.div
                                    animate={{ 
                                        y: [-100, 100],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
                                    className="absolute left-0 right-0 h-1 bg-white/30"
                                />
                                <motion.div
                                    animate={{ 
                                        y: [100, -100],
                                        opacity: [0, 0.5, 0]
                                    }}
                                    transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2 }}
                                    className="absolute left-0 right-0 h-2 bg-white/20"
                                />
                            </>
                        )}
                    </motion.div>

                    {/* Tagline with typewriter effect */}
                    <AnimatePresence>
                        {showTagline && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 md:mt-8"
                            >
                                <p className="text-white/50 text-xs md:text-sm tracking-[0.6em] uppercase font-medium">
                                    {taglineText}
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="inline-block w-2 h-4 md:h-5 bg-white/50 ml-1 align-middle"
                                    />
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Corner brackets */}
                <div className="absolute inset-8 pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute top-0 left-0 w-8 h-8"
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-white/40 to-transparent" />
                        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="absolute top-0 right-0 w-8 h-8"
                    >
                        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-white/40 to-transparent" />
                        <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="absolute bottom-0 left-0 w-8 h-8"
                    >
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-white/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-white/40 to-transparent" />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="absolute bottom-0 right-0 w-8 h-8"
                    >
                        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-white/40 to-transparent" />
                        <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-white/40 to-transparent" />
                    </motion.div>
                </div>

                {/* Progress bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6.5, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-transparent via-white to-transparent origin-left"
                    />
                </div>

                {/* Version number */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-4 right-6 text-[8px] tracking-[0.3em] text-white/30 uppercase"
                >
                    V.4.L
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// Add global styles for effects
if (typeof document !== 'undefined') {
    const styleId = 'splash-glitch-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes text-flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
}
