"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Track scroll - show only when user scrolls UP after scrolling down significantly
  useEffect(() => {
    const hasSubscribed = localStorage.getItem("newsletter-subscribed");
    const hasDismissed = localStorage.getItem("newsletter-dismissed");
    
    if (hasSubscribed || hasDismissed) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Mark as scrolled if they've gone down 600px
      if (currentScrollY > 600 && !hasScrolled) {
        setHasScrolled(true);
      }
      
      // Show popup when scrolling UP after scrolling down
      if (hasScrolled && currentScrollY < lastScrollY && currentScrollY > 300 && !isVisible) {
        setIsVisible(true);
        localStorage.setItem("newsletter-seen", "true");
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, lastScrollY, isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");
    localStorage.setItem("newsletter-subscribed", "true");
    
    // Close after showing success
    setTimeout(() => {
      setIsVisible(false);
      setIsDismissed(true);
    }, 2500);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("newsletter-dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop - lighter and more subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-[2px]"
            onClick={handleDismiss}
          />
          
          {/* Popup - Elegant slide from bottom */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[210] md:left-auto md:right-8 md:bottom-8 md:w-[420px]"
          >
            <div className="relative bg-white shadow-2xl overflow-hidden md:rounded-sm">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-black" />
              
              {/* Close button - minimal */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-black/30 hover:text-black transition-colors z-10 p-1"
              >
                <X size={16} strokeWidth={1.5} />
              </button>

              <div className="p-6 md:p-8">
                {/* Content */}
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 py-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-black tracking-wider uppercase">You&apos;re In</h3>
                      <p className="text-black/50 text-xs mt-0.5">Welcome to the inner circle.</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* Header - Icon + Title + Description */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-black/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-black tracking-widest uppercase mb-1">
                          Get The Inside Scoop
                        </h3>
                        <p className="text-black/50 text-[11px] leading-relaxed">
                          Exclusive drops, early access to new collections, and 10% off your first order.
                        </p>
                      </div>
                    </div>

                    {/* Form - Full width below */}
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setStatus("idle");
                          }}
                          placeholder="Enter your email"
                          className={cn(
                            "w-full px-4 py-3 bg-black/[0.03] border text-black text-xs placeholder:text-black/30 focus:outline-none transition-all",
                            status === "error"
                              ? "border-red-400/50"
                              : "border-black/10 focus:border-black/30"
                          )}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-5 py-3 bg-black text-white text-[10px] font-bold tracking-widest uppercase hover:bg-black/80 transition-all disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
                      >
                        {status === "loading" ? (
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            JOIN
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
                
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-red-500 mt-3 pl-11"
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
