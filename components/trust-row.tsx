"use client";

import { ShieldCheck, Truck, UserCheck, CreditCard, MapPin } from "lucide-react";

export default function TrustRow() {
  const items = [
    { icon: ShieldCheck, label: "12-Month Warranty" },
    { icon: Truck, label: "Free Delivery" },
    { icon: UserCheck, label: "Verified Sellers" },
    { icon: CreditCard, label: "Secure Payment" },
    { icon: MapPin, label: "Nationwide Service" },
  ];

  return (
    <div className="w-full border-t border-white/6 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-4">
        <div className="flex items-center justify-center gap-6 md:gap-10 text-foreground/70 text-xs md:text-sm">
          {items.map((it) => (
            <div key={it.label} className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-foreground/80">
                <it.icon className="w-5 h-5" />
              </div>
              <div className="leading-tight font-medium text-[13px] md:text-sm text-foreground/70">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
