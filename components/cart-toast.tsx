"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartToastProps {
  isVisible: boolean;
  productName: string;
  productImage?: string;
  productPrice?: string;
  onClose: () => void;
}

export function CartToast({ isVisible, productName, productImage, productPrice, onClose }: CartToastProps) {
  const [progress, setProgress] = useState(100);
  const [shouldClose, setShouldClose] = useState(false);

  // Handle auto-close timing separately from progress
  useEffect(() => {
    if (!isVisible) {
      setProgress(100);
      setShouldClose(false);
      return;
    }

    // Auto close after 3 seconds
    const closeTimer = setTimeout(() => {
      setShouldClose(true);
    }, 3000);

    return () => clearTimeout(closeTimer);
  }, [isVisible]);

  // Separate effect to handle closing after animation
  useEffect(() => {
    if (shouldClose) {
      const timeout = setTimeout(() => {
        onClose();
        setShouldClose(false);
        setProgress(100);
      }, 300); // Small delay for exit animation
      return () => clearTimeout(timeout);
    }
  }, [shouldClose, onClose]);

  // Progress animation
  useEffect(() => {
    if (!isVisible || shouldClose) return;

    const duration = 3000;
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - step));
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, shouldClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-24 right-4 z-[150] w-[320px] bg-white shadow-2xl border border-black/10 overflow-hidden"
        >
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/10">
            <motion.div
              className="h-full bg-black"
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          <div className="p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-black">
                Added to Bag
              </span>
              <button
                onClick={onClose}
                className="ml-auto text-black/30 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Product Info */}
            <div className="flex gap-3">
              {productImage ? (
                <div className="w-14 h-14 bg-black/5 flex-shrink-0 overflow-hidden">
                  <Image
                    src={productImage}
                    alt={productName}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 bg-black/5 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-black/30" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-black truncate">{productName}</p>
                {productPrice && (
                  <p className="text-[11px] text-black/60 mt-0.5">{productPrice}</p>
                )}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/cart"
              onClick={onClose}
              className="mt-3 block w-full py-2.5 bg-black text-white text-[10px] font-bold tracking-widest uppercase text-center hover:bg-black/80 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
