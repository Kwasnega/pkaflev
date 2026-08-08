"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Actual products from the project catalog
const FEATURED_ITEMS = [
    { id: "1", name: "PK-01 Puffer", price: "GH₵100", image: "/images/look_2_new_1772586200765.png" },
    { id: "2", name: "JC-10 Bomber", price: "GH₵120", image: "/images/look_1_new_1772586185397.png" },
    { id: "3", name: "JC-14 Leather", price: "GH₵160", image: "/images/J4-1.png" },
    { id: "4", name: "BL-01 Blazer", price: "GH₵90", image: "/images/look_7_new_1772586448482.png" },
    { id: "5", name: "TS-01 Tee", price: "GH₵85", image: "/images/look_1_1772585711621.png" },
    { id: "6", name: "CORE LOGO CAP", price: "GH₵45", image: "/images/caps_merch.png" },
];

gsap.registerPlugin(ScrollTrigger);

export function FeaturedStrip() {
    const stripRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const isSwipingRef = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const [, setIsDragging] = useState(false);

    // Drag to scroll functionality
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const handlePointerDown = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse' && e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
            isDraggingRef.current = true;
            isSwipingRef.current = false;
            startXRef.current = e.pageX - scrollContainer.offsetLeft;
            startYRef.current = e.pageY - scrollContainer.offsetTop;
            scrollLeftRef.current = scrollContainer.scrollLeft;
            setIsDragging(true);
            scrollContainer.setPointerCapture?.(e.pointerId);
            scrollContainer.style.cursor = 'grabbing';
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!isDraggingRef.current) return;
            const x = e.pageX - scrollContainer.offsetLeft;
            const y = e.pageY - scrollContainer.offsetTop;
            const dx = x - startXRef.current;
            const dy = y - startYRef.current;

            if (!isSwipingRef.current) {
                if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
                if (Math.abs(dy) > Math.abs(dx)) {
                    isDraggingRef.current = false;
                    setIsDragging(false);
                    scrollContainer.style.cursor = 'grab';
                    return;
                }
                isSwipingRef.current = true;
            }

            e.preventDefault();
            const walk = dx * 2; // Scroll speed multiplier
            scrollContainer.scrollLeft = scrollLeftRef.current - walk;
        };

        const handlePointerUp = (e: PointerEvent) => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            isSwipingRef.current = false;
            setIsDragging(false);
            scrollContainer.releasePointerCapture?.(e.pointerId);
            scrollContainer.style.cursor = 'grab';
        };

        const handlePointerLeave = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            isSwipingRef.current = false;
            setIsDragging(false);
            scrollContainer.style.cursor = 'grab';
        };

        scrollContainer.addEventListener('pointerdown', handlePointerDown);
        scrollContainer.addEventListener('pointermove', handlePointerMove);
        scrollContainer.addEventListener('pointerup', handlePointerUp);
        scrollContainer.addEventListener('pointercancel', handlePointerUp);
        scrollContainer.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            scrollContainer.removeEventListener('pointerdown', handlePointerDown);
            scrollContainer.removeEventListener('pointermove', handlePointerMove);
            scrollContainer.removeEventListener('pointerup', handlePointerUp);
            scrollContainer.removeEventListener('pointercancel', handlePointerUp);
            scrollContainer.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".featured-item",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stripRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, stripRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={stripRef} className="w-full bg-black py-8 md:py-16 overflow-hidden">
            <div className="px-4 md:px-12 mb-4 md:mb-8 flex items-center justify-between">
                <p className="text-[11px] md:text-sm font-bold tracking-[0.4em] uppercase text-white/50">
                    Quick Shop — Drag to explore
                </p>
                <div className="hidden md:flex gap-1">
                    <span className="w-8 h-[2px] bg-white/20" />
                    <span className="w-8 h-[2px] bg-white/40" />
                    <span className="w-8 h-[2px] bg-white/20" />
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 md:gap-5 overflow-x-auto px-4 md:px-12 pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab select-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", touchAction: "pan-x" }}
            >
                {FEATURED_ITEMS.map((item, index) => (
                    <div
                        key={item.id}
                        className="featured-item featured-product flex-shrink-0 w-[165px] md:w-[220px] snap-start"
                        style={{ perspective: "1000px" }}
                    >
                        {/* Card with 3D tilt effect */}
                        <Link href={`/shop?product=${item.id}`} className="group block">
                            <div 
                                className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a] rounded-sm transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                    loading={index < 3 ? "eager" : "lazy"}
                                    style={{ aspectRatio: '3/4' }}
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                                {/* Quick add button on hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className="px-4 py-2 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        Quick View
                                    </span>
                                </div>
                            </div>
                        </Link>
                        
                        {/* Name and price below the card */}
                        <div className="mt-3 md:mt-4 space-y-1">
                            <h3 className="text-white text-[13px] md:text-sm font-semibold tracking-wide truncate leading-tight">
                                {item.name}
                            </h3>
                            <p className="text-white/60 text-[12px] md:text-xs font-medium tracking-wider">
                                {item.price}
                            </p>
                        </div>
                    </div>
                ))}

                {/* View All card */}
                <Link
                    href="/shop"
                    className="featured-item flex-shrink-0 w-[120px] md:w-[160px] h-[140px] md:h-[180px] snap-start self-center flex flex-col items-center justify-center border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300 rounded-sm group"
                >
                    <span className="text-white/60 text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase text-center group-hover:text-white transition-colors">
                        View<br/>All
                    </span>
                    <span className="mt-2 text-white/40 text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">→</span>
                </Link>
            </div>
        </section>
    );
}
