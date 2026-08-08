"use client";

import HorizontalProductSection from "@/components/horizontal-product-section";
import { Product } from "@/lib/mock-types";

export default function BestSellersSection() {
  // I chose the title "Trending Now" to match the energetic site tone.
  return (
    <HorizontalProductSection
      title="TRENDING NOW"
      filterFn={(p: Product) => Boolean((p as any).featured)}
      maxItems={10}
    />
  );
}
