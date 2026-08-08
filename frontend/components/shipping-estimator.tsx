"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, Clock, Calendar } from "lucide-react";

interface ShippingEstimatorProps {
  className?: string;
}

// Ghana regions for delivery estimation
const REGIONS = [
  { name: "Greater Accra", days: { min: 1, max: 2 }, base: 25 },
  { name: "Ashanti", days: { min: 2, max: 3 }, base: 35 },
  { name: "Central", days: { min: 1, max: 2 }, base: 30 },
  { name: "Eastern", days: { min: 1, max: 3 }, base: 30 },
  { name: "Western", days: { min: 2, max: 3 }, base: 35 },
  { name: "Volta", days: { min: 2, max: 3 }, base: 35 },
  { name: "Northern", days: { min: 3, max: 5 }, base: 45 },
  { name: "Upper East", days: { min: 3, max: 5 }, base: 50 },
  { name: "Upper West", days: { min: 3, max: 5 }, base: 50 },
  { name: "Bono", days: { min: 2, max: 3 }, base: 40 },
  { name: "Bono East", days: { min: 2, max: 3 }, base: 40 },
  { name: "Ahafo", days: { min: 2, max: 3 }, base: 40 },
  { name: "Savannah", days: { min: 3, max: 5 }, base: 45 },
  { name: "North East", days: { min: 3, max: 5 }, base: 50 },
  { name: "Oti", days: { min: 2, max: 4 }, base: 40 },
  { name: "Western North", days: { min: 2, max: 4 }, base: 45 },
];

export function ShippingEstimator({ className }: ShippingEstimatorProps) {
  const [selectedRegion, setSelectedRegion] = useState("Greater Accra");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const region = REGIONS.find(r => r.name === selectedRegion) || REGIONS[0];

  useEffect(() => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + region.days.min);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + region.days.max);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    };

    if (region.days.min === region.days.max) {
      setDeliveryDate(formatDate(minDate));
    } else {
      setDeliveryDate(`${formatDate(minDate)} - ${formatDate(maxDate)}`);
    }
  }, [selectedRegion, region]);

  return (
    <div className={`bg-black/[0.02] border border-black/5 ${className}`}>
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center gap-3 hover:bg-black/[0.03] transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
          <Truck className="w-4 h-4 text-black/60" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black">
            Delivery Estimate
          </p>
          <p className="text-[11px] text-black/60 mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Get it {deliveryDate}
            <span className="text-black/30">•</span>
            <span className="text-green-600">FREE</span>
          </p>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-black/40 text-xs"
        >
          ▼
        </motion.span>
      </button>

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-3 pb-3 pt-1 border-t border-black/5">
          {/* Region Selector */}
          <div className="mb-3">
            <label className="text-[9px] uppercase tracking-wider text-black/50 mb-1.5 block">
              Select Your Region
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-black/10 text-xs text-black focus:outline-none focus:border-black/30 appearance-none cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 text-xs pointer-events-none">
                ▼
              </span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-black/5">
              <span className="text-[10px] text-black/60 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                Estimated Delivery
              </span>
              <span className="text-xs font-bold text-black">{deliveryDate}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-black/5">
              <span className="text-[10px] text-black/60">Shipping Cost</span>
              <span className="text-xs font-bold text-green-600">FREE</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[10px] text-black/60">Delivery Time</span>
              <span className="text-xs text-black">
                {region.days.min === region.days.max 
                  ? `${region.days.min} business day` 
                  : `${region.days.min}-${region.days.max} business days`}
              </span>
            </div>
          </div>

          {/* Note */}
          <p className="text-[9px] text-black/40 mt-3 leading-relaxed">
            Orders placed before 2PM ship same day. Excludes weekends and holidays.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Compact version for product cards
export function ShippingEstimateCompact({ region = "Greater Accra" }: { region?: string }) {
  const regionData = REGIONS.find(r => r.name === region) || REGIONS[0];
  
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + regionData.days.min);
  
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="flex items-center gap-1.5 text-[9px] text-black/50">
      <Truck className="w-3 h-3" />
      <span>Get it by <span className="text-black font-medium">{formattedDate}</span> • FREE</span>
    </div>
  );
}
