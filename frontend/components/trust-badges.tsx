"use client";

import { motion } from "framer-motion";
import { Shield, Lock, CreditCard, Truck, RotateCcw, BadgeCheck } from "lucide-react";

interface TrustBadgesProps {
  variant?: "light" | "dark" | "minimal";
  showShipping?: boolean;
}

// Payment Icons SVG Components
function VisaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 16" fill="none" className={className}>
      <path d="M17.5 2h-3L12 14h3l.5-2h3l.5 2h3L17.5 2zm-2 7l1-4 1 4h-2z" fill="currentColor"/>
      <path d="M28 2h-3v12h3V2z" fill="currentColor"/>
      <path d="M35 2c-1.5 0-2.5.5-3 1l-.5-1h-2.5v12h3V7c0-1.5 1-2 2-2s2 .5 2 2v5h3V6c0-2.5-1.5-4-4-4z" fill="currentColor"/>
      <path d="M8 2L5 14H2L0 7c-.5-2 0-3 3-3h2l1 4 2-6h3z" fill="currentColor"/>
    </svg>
  );
}

function MastercardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" fill="none" className={className}>
      <circle cx="7" cy="8" r="7" fill="currentColor" fillOpacity="0.6"/>
      <circle cx="17" cy="8" r="7" fill="currentColor" fillOpacity="0.6"/>
    </svg>
  );
}

function ApplePayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 16" fill="none" className={className}>
      <path d="M8.5 2.5c-.5 0-1.5.5-2 1.5-.5-1-1.5-1.5-2-1.5C3.5 2.5 2 4 2 6c0 2.5 2 4.5 2.5 5 .5.5 1 1 2 1s1.5-.5 2-1c.5.5 1 1 2 1s1.5-.5 2-1c.5-.5 2.5-2.5 2.5-5 0-2-1.5-3.5-3-3.5z" fill="currentColor"/>
      <text x="12" y="11" fontSize="8" fontWeight="600" fill="currentColor">Pay</text>
    </svg>
  );
}

export function TrustBadges({ variant = "light", showShipping = true }: TrustBadgesProps) {
  const isDark = variant === "dark";
  const isMinimal = variant === "minimal";
  
  const textColor = isDark ? "text-white/60" : "text-black/60";
  const iconColor = isDark ? "text-white/40" : "text-black/40";
  const borderColor = isDark ? "border-white/10" : "border-black/10";

  if (isMinimal) {
    return (
      <div className="flex items-center justify-center gap-4 py-3">
        <div className="flex items-center gap-1.5 text-[10px] text-black/50 uppercase tracking-wider">
          <Lock className="w-3 h-3" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-1">
          <VisaIcon className="h-3 w-auto text-black/40" />
          <MastercardIcon className="h-3 w-auto text-black/40" />
        </div>
      </div>
    );
  }

  return (
    <div className={`py-4 ${isDark ? 'bg-black/5' : 'bg-white'}`}>
      {/* Security Badges */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center`}>
            <Shield className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-black/60'}`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-black'}`}>SSL Secured</p>
            <p className={`text-[9px] ${textColor}`}>256-bit encryption</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center`}>
            <Lock className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-black/60'}`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-black'}`}>Safe Payment</p>
            <p className={`text-[9px] ${textColor}`}>100% protected</p>
          </div>
        </motion.div>
      </div>

      {/* Payment Methods */}
      <div className={`flex items-center justify-center gap-4 pt-3 border-t ${borderColor}`}>
        <span className={`text-[9px] uppercase tracking-wider ${textColor}`}>We Accept:</span>
        <div className="flex items-center gap-3">
          <VisaIcon className={`h-4 w-auto ${iconColor}`} />
          <MastercardIcon className={`h-4 w-auto ${iconColor}`} />
          <ApplePayIcon className={`h-4 w-auto ${iconColor}`} />
          <div className={`flex items-center gap-1 px-2 py-1 rounded ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
            <CreditCard className={`w-3 h-3 ${iconColor}`} />
            <span className={`text-[8px] font-bold uppercase ${textColor}`}>Cards</span>
          </div>
        </div>
      </div>

      {/* Shipping & Returns (if enabled) */}
      {showShipping && (
        <div className={`grid grid-cols-2 gap-4 mt-4 pt-4 border-t ${borderColor}`}>
          <div className="flex items-center gap-2 justify-center">
            <Truck className={`w-4 h-4 ${iconColor}`} />
            <div>
              <p className={`text-[9px] font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>Free Shipping</p>
              <p className={`text-[8px] ${textColor}`}>Orders over GH₵500</p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <RotateCcw className={`w-4 h-4 ${iconColor}`} />
            <div>
              <p className={`text-[9px] font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>Easy Returns</p>
              <p className={`text-[8px] ${textColor}`}>30-day policy</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for product cards
export function TrustBadgeMinimal() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <BadgeCheck className="w-3 h-3 text-green-500" />
        <span className="text-[9px] text-black/50">Authentic</span>
      </div>
      <div className="flex items-center gap-1">
        <Shield className="w-3 h-3 text-black/30" />
        <span className="text-[9px] text-black/50">Secure</span>
      </div>
    </div>
  );
}
