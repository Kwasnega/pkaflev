"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const curtainRef = useRef<HTMLDivElement>(null);
    const prevPathRef = useRef<string | null>(null);

    useEffect(() => {
        // Push the curtain fully off-screen on mount — no animation, just positioning
        if (curtainRef.current) {
            gsap.set(curtainRef.current, { yPercent: 100 });
        }

        // Failsafe: ensure curtain is hidden after max animation time
        const failsafe = setTimeout(() => {
            if (curtainRef.current) {
                gsap.set(curtainRef.current, { yPercent: 100 });
            }
        }, 2000);

        return () => clearTimeout(failsafe);
    }, []);

    useEffect(() => {
        // On very first run set prevPath and bail — no animation
        if (prevPathRef.current === null) {
            prevPathRef.current = pathname;
            return;
        }

        // If path didn't actually change (Strict Mode double-fire etc.) bail
        if (prevPathRef.current === pathname) return;
        prevPathRef.current = pathname;

        if (!curtainRef.current) return;

        // Kill any ongoing tweens on the curtain
        gsap.killTweensOf(curtainRef.current);

        // Simple sweep: slide in from bottom → slide out to top
        const tl = gsap.timeline();
        tl.set(curtainRef.current, { yPercent: 100 })
          .to(curtainRef.current, { yPercent: 0, duration: 0.5, ease: "expo.inOut" })
          .to(curtainRef.current, { yPercent: -100, duration: 0.6, ease: "expo.inOut", delay: 0.05 })
          .eventCallback("onComplete", () => {
              // Ensure curtain is fully hidden
              if (curtainRef.current) {
                  gsap.set(curtainRef.current, { yPercent: 100 });
              }
          });
    }, [pathname]);

    return (
        <>
            <div
                ref={curtainRef}
                className="fixed inset-0 z-[9999] bg-black pointer-events-none will-change-transform"
                style={{ transform: "translateY(100%)" }}
                aria-hidden="true"
            />
            {children}
        </>
    );
};
