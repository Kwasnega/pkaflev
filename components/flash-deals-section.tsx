"use client";

import HorizontalProductSection from "@/components/horizontal-product-section";

export default function FlashDealsSection() {
  return (
    <HorizontalProductSection
      title="FLASH DEALS"
      filterFn={(p) => {
        try {
          const op = parseFloat(String(p.originalPrice || "").replace(/[^0-9.]/g, "")) || 0;
          const pr = parseFloat(String(p.price || "").replace(/[^0-9.]/g, "")) || 0;
          return op > pr;
        } catch (err) {
          return false;
        }
      }}
      maxItems={10}
    />
  );
}
