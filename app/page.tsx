"use client";

import { PkaflevHero } from "@/components/pkaflev-hero";
import { EssentialsSection } from "@/components/whats-Newsection";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";
import TrustRow from "@/components/trust-row";
import { getHomepageHeroImages } from "@/lib/homepage-content";
import FlashDealsSection from "@/components/flash-deals-section";
import BestSellersSection from "@/components/best-sellers-section";

export default function Home() {
  const heroImages = getHomepageHeroImages();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="snap-start">
        <PkaflevHero videoSrc={heroImages[0]?.videoUrl || ""} imageSrc={heroImages[0]?.url || "/SMimages/pic4.webp"} />
      </div>
      <div className="snap-none">
        <EssentialsSection />
      </div>
      <FlashDealsSection />
      <BestSellersSection />
      <div className="snap-start relative">
        <PkaflevHero
          videoSrc={heroImages[1]?.videoUrl || ""}
          imageSrc={heroImages[1]?.url || "/SMimages/pic5.webp"}
          leftText="FROM CITY TO COMMUTE"
          leftButtonText="SHOP RIDES"
          leftButtonHref="/shop?category=ELECTRIC%20SCOOTERS"
          rightButtonText="PARTNER WITH US"
          rightButtonHref="/partner"
        />
        {/* Marquee overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm border-y border-white/10 py-3 md:py-4 overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="mx-8 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/60">
                FREE DELIVERY • 12-MONTH WARRANTY • NATIONWIDE SERVICE CENTERS • FLEXIBLE PAYMENT PLANS • EARN AS A PARTNER • FREE DELIVERY • 12-MONTH WARRANTY • NATIONWIDE SERVICE CENTERS • FLEXIBLE PAYMENT PLANS • EARN AS A PARTNER •
              </span>
            ))}
          </div>
        </div>
      </div>
      <TrustRow />
      <MobileStickyCTA />
    </main>
  );
}
