"use client";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LucideIcon, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: LucideIcon;
    showPasswordToggle?: boolean;
    isValid?: boolean;
    validationMessage?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, error, icon: Icon, showPasswordToggle, isValid, validationMessage, className, type = "text", ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const [hasValue, setHasValue] = useState(false);

        const inputType = showPasswordToggle && showPassword ? "text" : type;

        // Show validation state only when not focused and has value
        const showValidation = !isFocused && hasValue && isValid !== undefined;

        return (
            <div className="space-y-2">
                <label className="block text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 ml-1">
                    {label}
                </label>
                <div className="relative">
                    {/* Left Icon */}
                    {Icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Icon 
                                className={cn(
                                    "w-4 h-4 transition-colors duration-200",
                                    error ? "text-red-400" :
                                    (isFocused || hasValue) ? "text-white/60" : "text-white/25"
                                )} 
                            />
                        </div>
                    )}

                    {/* Input */}
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            "w-full bg-white/[0.04] border rounded-xl py-3.5 text-sm text-white placeholder:text-white/25",
                            "outline-none transition-all duration-200 ease-out",
                            "focus:shadow-[0_0_0_4px_rgba(255,255,255,0.05)]",
                            Icon ? "pl-12 pr-12" : "px-4 pr-12",
                            showPasswordToggle && "pr-12",
                            error
                                ? "border-red-500/50 focus:border-red-400 bg-red-500/[0.03]"
                                : isValid
                                    ? "border-green-500/50 focus:border-green-400 bg-green-500/[0.03]"
                                    : "border-white/[0.08] focus:border-white/30 focus:bg-white/[0.06] hover:border-white/15",
                            className
                        )}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            setIsFocused(false);
                            setHasValue(e.target.value.length > 0);
                        }}
                        onChange={(e) => {
                            setHasValue(e.target.value.length > 0);
                            props.onChange?.(e);
                        }}
                        {...props}
                    />

                    {/* Validation Indicator */}
                    <AnimatePresence mode="wait">
                        {showValidation && !error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                {isValid ? (
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-green-500" strokeWidth={3} />
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <X className="w-3 h-3 text-red-500" strokeWidth={3} />
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Password Toggle */}
                    {showPasswordToggle && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors duration-150 rounded-md hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                            tabIndex={-1}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </div>

                {/* Error or Validation Message */}
                <AnimatePresence mode="wait">
                    {error ? (
                        <motion.p
                            key="error"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-xs text-red-400 ml-1"
                        >
                            {error}
                        </motion.p>
                    ) : showValidation && validationMessage ? (
                        <motion.p
                            key="validation"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className={cn(
                                "text-xs ml-1",
                                isValid ? "text-green-400" : "text-red-400"
                            )}
                        >
                            {validationMessage}
                        </motion.p>
                    ) : null}
                </AnimatePresence>
            </div>
        );
    }
);

InputField.displayName = "InputField";
