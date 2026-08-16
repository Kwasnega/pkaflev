"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PkaflevHeroProps {
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    leftText?: string;
    leftButtonText?: string;
    leftButtonHref?: string;
    rightButtonText?: string;
    rightButtonHref?: string;
    className?: string;
    disableTextAnimation?: boolean;
}

export const PkaflevHero = ({
    imageSrc = "/images/hero/hero-main.jpg",
    videoSrc,
    imageAlt = "PKAF STORE Hero",
    leftText = "PKAF STORE",
    leftButtonText = "SHOP NOW",
    leftButtonHref = "/shop",
    rightButtonText,
    rightButtonHref,
    className,
    disableTextAnimation = false,
}: PkaflevHeroProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const [canAnimate, setCanAnimate] = useState(false);

    useEffect(() => {
        // Check if splash already completed (page refresh case)
        const splashSeen = sessionStorage.getItem("splashSeen");
        if (splashSeen) {
            setCanAnimate(true);
        }

        // Listen for splash completion
        const handleSplashComplete = () => {
            setCanAnimate(true);
        };

        window.addEventListener('splashComplete', handleSplashComplete);
        return () => window.removeEventListener('splashComplete', handleSplashComplete);
    }, []);

    useEffect(() => {
        if (!canAnimate) return;

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            if (disableTextAnimation && h1Ref.current) {
                gsap.set(h1Ref.current, { clearProps: "all" });
                gsap.set(h1Ref.current, { rotation: 0, x: 0, scale: 1, opacity: 1, clipPath: "none" });
            }
            // Ken Burns effect - slow zoom focusing on center
            gsap.fromTo(imageRef.current,
                { scale: isMobile ? 1.02 : 1, x: 0, y: 0 },
                {
                    scale: isMobile ? 1.05 : 1.06,
                    x: isMobile ? -10 : 0,
                    y: isMobile ? 0 : -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            );

            // Parallax on Text - moves up faster than scroll
            gsap.to(textRef.current, {
                yPercent: -50,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "50% top",
                    scrub: true,
                },
            });

            // Buttons fade out on scroll
            gsap.to(".hero-buttons", {
                yPercent: 30,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "30% top",
                    end: "60% top",
                    scrub: true,
                },
            });

            // Headline wheel entrance (rotating + circular reveal)
            if (h1Ref.current && !disableTextAnimation) {
                gsap.set(h1Ref.current, { transformOrigin: "50% 50%" });
                gsap.fromTo(
                    h1Ref.current,
                    { rotation: -720, x: -200, scale: 0.6, opacity: 0, clipPath: "circle(0% at 50% 50%)" },
                    { rotation: 0, x: 0, scale: 1, opacity: 1, clipPath: "circle(150% at 50% 50%)", duration: 1.2, ease: "power3.out", delay: 0.2 }
                );
            }

            // Other content entrance (exclude headline which already animated)
            if (!disableTextAnimation) {
                gsap.from(".hero-content-reveal", {
                    y: 60,
                    opacity: 0,
                    duration: 1.1,
                    stagger: 0.18,
                    ease: "expo.out",
                    delay: 0.6,
                });
            }

            // Tagline color transition: from black to white
            if (taglineRef.current) {
                gsap.fromTo(taglineRef.current, { color: "#000000" }, { color: "#ffffff", duration: 1.4, delay: 0.9, ease: "power2.out" });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [canAnimate]);

    return (
        <div ref={sectionRef} className={cn("relative min-h-[100svh] w-full overflow-hidden bg-black", className)}>
            {/* Background Media with Ken Burns */}
            <div ref={imageRef} className="absolute inset-0 z-0 h-full w-full md:h-[112%] md:w-full">
                {videoSrc ? (
                    <video src={videoSrc} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        className="object-cover object-center grayscale-[20%] brightness-[0.7]"
                        sizes="100vw"
                    />
                )}
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

            {/* Centered Big Text and Tagline */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-5 sm:px-8 md:px-12 pointer-events-none">
                <div ref={textRef} className="w-full text-center">
                    <h1 ref={h1Ref} className="hero-text text-[clamp(2.99rem,11vw,8rem)] font-black leading-[0.85] tracking-tighter text-white uppercase">
                        {leftText}
                    </h1>
                    <p ref={taglineRef} className="hero-content-reveal mt-4 md:mt-6 text-[10px] md:text-xs font-light tracking-[0.4em] uppercase" style={{ color: "#000" }}>
                        POWER YOUR EVERYDAY.
                    </p>
                </div>
            </div>

            {/* Bottom Buttons — stacked on mobile, side by side on desktop */}
            <div className="hero-buttons absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-3 px-5 sm:px-8 sm:bottom-12 md:bottom-20 md:flex-row md:gap-6 md:justify-center">
                <div className="hero-content-reveal w-full md:w-auto">
                    <Link
                        href={leftButtonHref}
                        className="group flex h-12 sm:h-14 w-full items-center justify-center border border-white/80 px-6 text-[12px] sm:text-[14px] font-bold tracking-[0.2em] text-white transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:bg-white active:text-black md:w-[260px]"
                    >
                        <span className="relative z-10">{leftButtonText}</span>
                    </Link>
                </div>
                {rightButtonText && rightButtonHref ? (
                    <div className="hero-content-reveal w-full md:w-auto">
                        <Link
                            href={rightButtonHref}
                            className="group flex h-12 sm:h-14 w-full items-center justify-center border border-white/80 px-6 text-[12px] sm:text-[14px] font-bold tracking-[0.2em] text-white transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:bg-white active:text-black md:w-[260px]"
                        >
                            <span className="relative z-10">{rightButtonText}</span>
                        </Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
