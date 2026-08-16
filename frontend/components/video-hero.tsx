"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface VideoHeroProps {
  videoSrc?: string;
  leftButtonText?: string;
  leftButtonHref?: string;
  rightButtonText?: string;
  rightButtonHref?: string;
}

export function VideoHero({
  videoSrc = "/VID-1.webm",
  leftButtonText = "SHOP",
  leftButtonHref = "/shop",
  rightButtonText = "CAMPAIGN",
  rightButtonHref = "/contact",
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slightly slower for cinematic feel
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ filter: "brightness(0.6) contrast(1.1)" }}
        >
          <source src={videoSrc} type="video/webm" />
        </video>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-10" />
        
        {/* Noise texture overlay for film grain effect */}
        <div 
          className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center px-6">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white/60 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-6"
          >
            The Movement
          </motion.p>
          
          <h1 className="text-white font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] uppercase">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block"
            >
              BUILT
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block text-white/80"
            >
              DIFFERENT
            </motion.span>
          </h1>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href={leftButtonHref}
            className="group relative px-10 py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:bg-black hover:text-white border-2 border-white"
          >
            <span className="relative z-10">{leftButtonText}</span>
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          
          <Link
            href={rightButtonHref}
            className="group relative px-10 py-4 bg-transparent text-white text-xs font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 border-2 border-white/50 hover:border-white"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              {rightButtonText}
            </span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Side Text - Vertical */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
      >
        <p className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase writing-mode-vertical transform -rotate-180"
           style={{ writingMode: "vertical-rl" }}>
          PKAF STORE — EST. 2024
        </p>
      </motion.div>
    </section>
  );
}
