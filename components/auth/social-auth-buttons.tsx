"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 12.23c0-.68-.06-1.34-.18-1.97H12v3.73h5.39c-.23 1.24-.93 2.29-1.98 2.99v2.48h3.2c1.88-1.72 2.99-4.27 2.99-7.23z" fill="#4285F4" />
      <path d="M12 22c2.7 0 4.96-.89 6.61-2.4l-3.2-2.48c-.89.6-2.03.96-3.41.96-2.62 0-4.84-1.77-5.64-4.15H.96v2.6C2.66 19.9 6.99 22 12 22z" fill="#34A853" />
      <path d="M6.36 19.89c-.72-1.37-1.14-2.89-1.14-4.59s.42-3.22 1.14-4.59V8.11H2.39C1.46 9.94 1 11.9 1 14c0 2.1.46 4.06 1.39 5.89l4.97-1.37z" fill="#FBBC05" />
      <path d="M12 5.98c1.47 0 2.79.5 3.83 1.49l2.88-2.88C16.96 2.47 14.7 1.5 12 1.5c-5.01 0-9.34 2.1-11.04 5.11l3.97 2.97c.8-2.38 2.98-4.1 7.07-4.1z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.4c0-2.12 1.74-3.14 1.82-3.19-1-1.46-2.56-1.66-3.1-1.68-1.32-.13-2.57.79-3.24.79-.68 0-1.72-.77-2.83-.75-1.46.02-2.8.84-3.54 2.15-1.52 2.63-.39 6.52 1.09 8.64.72 1.04 1.58 2.2 2.71 2.16 1.08-.04 1.49-.7 2.81-.7 1.31 0 1.68.7 2.83.68 1.17-.02 1.92-1.06 2.64-2.1.83-1.2 1.17-2.36 1.19-2.42-.03-.01-2.27-.87-3.99-2.52zM14.79 4.99c.59-.72 1-1.72.89-2.72-.86.03-1.9.57-2.52 1.29-.55.64-1.04 1.64-.91 2.62.96.08 1.95-.49 2.54-1.19z" />
    </svg>
  );
}

interface SocialAuthButtonsProps {
  className?: string;
}

export function SocialAuthButtons({ className }: SocialAuthButtonsProps) {
  const handleGoogleAuth = () => {
    console.log("Google auth clicked");
  };

  const handleAppleAuth = () => {
    console.log("Apple auth clicked");
  };

  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      <motion.button
        type="button"
        onClick={handleGoogleAuth}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Google</span>
      </motion.button>

      <motion.button
        type="button"
        onClick={handleAppleAuth}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#f5f5f5] px-4 py-3 text-sm font-medium text-black shadow-[0_12px_30px_rgba(255,255,255,0.08)] transition-all hover:border-white/20 hover:bg-white"
      >
        <AppleIcon className="h-5 w-5" />
        <span>Apple</span>
      </motion.button>
    </div>
  );
}
