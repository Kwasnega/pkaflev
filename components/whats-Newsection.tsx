"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEFAULT_FEATURED_COLLECTIONS } from "@/lib/homepage-content";

interface FeaturedCollection {
  id: string;
  title: string;
  image: string;
  link: string;
    position: "left" | "center" | "right";
}

const defaultCollections: FeaturedCollection[] = DEFAULT_FEATURED_COLLECTIONS;

const normalizeImageUrl = (url: string): string => {
    return url?.replace(/\.jpe?g$/i, ".webp").replace(/\.png$/i, ".webp");
};

const normalizeCollections = (collections: FeaturedCollection[]) => {
    return defaultCollections.map((defaultCollection) => {
        const collection = collections.find((item) => item.id === defaultCollection.id);

        // Force title to prevent old names like "SM Collection" / "001 Collection"
        // Allow image from saved data so admin panel changes actually work,
        // but normalize extensions and fallback to default if missing
        const savedImage = collection?.image;
        const image = savedImage ? normalizeImageUrl(savedImage) : defaultCollection.image;

        return {
            ...defaultCollection,
            ...collection,
            title: defaultCollection.title,
            image,
        };
    });
};

const isRemoteImage = (src: string) => src.startsWith("http://") || src.startsWith("https://");

gsap.registerPlugin(ScrollTrigger);

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={cardRef}
            className={className}
            style={{ transform, transition: "transform 0.1s ease-out", transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}

export function EssentialsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [collections] = useState<FeaturedCollection[]>(defaultCollections);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section heading flies in
            gsap.fromTo(".essentials-heading",
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".essentials-heading",
                        start: "top 90%",
                    }
                }
            );

            // Left card — slides in from left
            gsap.fromTo(".card-left",
                { opacity: 0, x: -60 },
                {
                    opacity: 1, x: 0, duration: 1.2, ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".card-left",
                        start: "top 85%",
                    }
                }
            );

            // Center card — fades/zooms in
            gsap.fromTo(".card-center",
                { opacity: 0, scale: 0.98, y: 20 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "expo.out", delay: 0.08,
                    scrollTrigger: {
                        trigger: ".card-center",
                        start: "top 85%",
                    }
                }
            );

            // Right card — slides in from right, slightly delayed
            gsap.fromTo(".card-right",
                { opacity: 0, x: 60 },
                {
                    opacity: 1, x: 0, duration: 1.2, ease: "expo.out", delay: 0.15,
                    scrollTrigger: {
                        trigger: ".card-right",
                        start: "top 85%",
                    }
                }
            );

            // Subtle parallax on each image
            gsap.utils.toArray<HTMLElement>(".essentials-img").forEach((img) => {
                gsap.to(img, {
                    yPercent: -8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);


    return (
        <section ref={sectionRef} className="w-full bg-white text-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
                <h2 className="essentials-heading text-center text-[13px] md:text-[15px] tracking-[0.35em] uppercase mb-12 md:mb-16 font-black text-black opacity-0">
                    DISCOVER WHAT&apos;S NEW
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {collections.map((collection, index) => (
                        <Link
                            key={collection.id}
                            href={collection.link}
                            className={`card-${collection.position} flex flex-col opacity-0 group`}
                            aria-label={`View ${collection.title} collection`}
                        >
                            <TiltCard className="relative w-full overflow-hidden bg-black/5 h-[75vh] md:h-[95vh] cursor-pointer">
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    unoptimized={isRemoteImage(collection.image)}
                                    className="essentials-img object-cover object-center mix-blend-multiply scale-100 md:scale-[1.08] transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-[1.15]"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="px-6 py-3 border border-white/60 text-white text-[11px] font-bold tracking-[0.3em] uppercase backdrop-blur-sm transform translateZ(50px)">
                                        View Collection
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-gradient-to-t from-black via-black/70 to-transparent pb-12 md:pb-16 transform translateZ(30px)">
                                    <span className="inline-block text-white text-[14px] md:text-base font-black tracking-[0.18em] uppercase drop-shadow-xl transition-all duration-500 group-hover:translate-x-2 group-hover:tracking-[0.25em]">
                                        <span className="relative">
                                            {collection.title}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
                                        </span>
                                    </span>
                                </div>
                            </TiltCard>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
