"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/mock-types";
import { useProducts } from "@/components/product-provider";
import { ProductCard } from "@/components/shop-section";
import { useCart } from "@/components/cart-provider";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  title: string;
  filterFn?: (p: Product) => boolean;
  maxItems?: number;
};

export default function HorizontalProductSection({ title, filterFn = () => true, maxItems = 10 }: Props) {
  const { products, isLoading } = useProducts();
  const { addItem } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isSwipingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [, setIsDragging] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "touch" && e.pointerType !== "pen") return;
      isDraggingRef.current = true;
      isSwipingRef.current = false;
      startXRef.current = e.pageX - scrollContainer.offsetLeft;
      startYRef.current = e.pageY - scrollContainer.offsetTop;
      scrollLeftRef.current = scrollContainer.scrollLeft;
      setIsDragging(true);
      scrollContainer.setPointerCapture?.(e.pointerId);
      scrollContainer.style.cursor = "grabbing";
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
          scrollContainer.style.cursor = "grab";
          return;
        }
        isSwipingRef.current = true;
      }

      e.preventDefault();
      const walk = dx * 2;
      scrollContainer.scrollLeft = scrollLeftRef.current - walk;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      isSwipingRef.current = false;
      setIsDragging(false);
      scrollContainer.releasePointerCapture?.(e.pointerId);
      scrollContainer.style.cursor = "grab";
    };

    const handlePointerLeave = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      isSwipingRef.current = false;
      setIsDragging(false);
      scrollContainer.style.cursor = "grab";
    };

    scrollContainer.addEventListener("pointerdown", handlePointerDown);
    scrollContainer.addEventListener("pointermove", handlePointerMove);
    scrollContainer.addEventListener("pointerup", handlePointerUp);
    scrollContainer.addEventListener("pointercancel", handlePointerUp);
    scrollContainer.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      scrollContainer.removeEventListener("pointerdown", handlePointerDown);
      scrollContainer.removeEventListener("pointermove", handlePointerMove);
      scrollContainer.removeEventListener("pointerup", handlePointerUp);
      scrollContainer.removeEventListener("pointercancel", handlePointerUp);
      scrollContainer.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const items = products.filter(filterFn).slice(0, maxItems);

  return (
    <section className="w-full py-8 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <h2 className="essentials-heading text-[13px] md:text-[15px] tracking-[0.35em] uppercase mb-6 md:mb-8 font-black">
          {title}
        </h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto px-2 md:px-0 pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", touchAction: "pan-y" }}
          >
            {isLoading && <div className="">Loading...</div>}
            {!isLoading && items.length === 0 && <div className="text-foreground/60">No items.</div>}

            {items.map((product, i) => (
              <div key={product.id} className="flex-shrink-0 w-[170px] md:w-[220px] snap-start">
                <div className="h-[440px] md:h-[500px] w-full">
                  <ProductCard product={product as any} index={i} onQuickAdd={() => addItem(product as any, 1)} />
                </div>
              </div>
            ))}
          </div>

          <button
            aria-label="Scroll left"
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const first = el.querySelector<HTMLElement>(".snap-start");
              const cardW = first ? first.getBoundingClientRect().width : el.clientWidth * 0.8;
              el.scrollBy({ left: -(cardW + 16), behavior: "smooth" });
            }}
            className="hidden md:flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 rounded-full absolute left-2 top-1/2 -translate-y-1/2 z-30 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const first = el.querySelector<HTMLElement>(".snap-start");
              const cardW = first ? first.getBoundingClientRect().width : el.clientWidth * 0.8;
              el.scrollBy({ left: cardW + 16, behavior: "smooth" });
            }}
            className="hidden md:flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 rounded-full absolute right-2 top-1/2 -translate-y-1/2 z-30 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
