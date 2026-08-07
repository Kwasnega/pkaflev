"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

// Skeleton loader component
function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-current/20 rounded", className)} />
  );
}

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "right",
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isProcessing = loading || isLoading;
  const isDisabled = disabled || isProcessing;

  const handleClick = async () => {
    if (isDisabled) return;
    
    setIsPressed(true);
    setIsLoading(true);
    
    // Slide animation duration
    setTimeout(() => setIsPressed(false), 300);
    
    try {
      await onClick?.();
    } finally {
      // Keep skeleton visible for at least 500ms for smooth UX
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-widest uppercase overflow-hidden transition-all duration-300";
  
  const variants = {
    primary: "bg-white text-black hover:bg-white/90",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50",
    ghost: "bg-transparent text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-6 py-3 text-[10px]",
    md: "px-8 py-4 text-[11px]",
    lg: "px-12 py-5 text-xs",
  };

  const content = (
    <>
      {/* Background slide effect */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ x: "-100%" }}
        animate={{ x: isPressed ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
      
      {/* Skeleton loading overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-current/10 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <span className={cn(
        "relative z-10 flex items-center gap-2 transition-colors duration-300",
        isPressed ? "text-white" : ""
      )}>
        {icon && iconPosition === "left" && (
          <motion.span
            animate={{ x: isPressed ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
        <span className={cn(isProcessing && "opacity-0")}>{children}</span>
        {icon && iconPosition === "right" && (
          <motion.span
            animate={{ x: isPressed ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </>
  );

  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    isDisabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses} onClick={handleClick}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={handleClick} disabled={isDisabled} className={buttonClasses}>
      {content}
    </button>
  );
}

// Cart button with slide-to-cart animation
export function AddToCartButton({
  onAdd,
  className,
}: {
  onAdd: () => Promise<void>;
  className?: string;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = async () => {
    setIsAdding(true);
    await onAdd();
    setIsAdding(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatedButton
      onClick={handleClick}
      loading={isAdding}
      disabled={isAdded}
      className={cn("w-full", className)}
      variant={isAdded ? "secondary" : "primary"}
    >
      {isAdded ? "Added ✓" : "Add to Cart"}
    </AnimatedButton>
  );
}
