"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AuthTabs } from "./auth-tabs";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { ForgotPasswordModal } from "./forgot-password-modal";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultTab = "signin" }: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    // Reset tab when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveTab(defaultTab);
            setShowForgotPassword(false);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, defaultTab]);

    const switchTab = useCallback((tab: "signin" | "signup") => {
        setActiveTab(tab);
    }, []);

    const handleClose = () => {
        setShowForgotPassword(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[9999] overflow-y-auto pointer-events-none overscroll-none">
                <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Background effects */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/[0.03] blur-[80px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Scrollable Content Container */}
                        <div className="relative z-10 p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                            {/* Logo */}
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="flex justify-center mb-6"
                            >
                                <img
                                    src="/levlogo.png"
                                    alt="LEV"
                                    className="h-24 sm:h-28 w-auto object-contain opacity-100"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <AuthTabs activeTab={activeTab} onTabChange={switchTab} />
                            </motion.div>

                            {/* Forms */}
                            <div className="mt-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: activeTab === "signin" ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: activeTab === "signin" ? 20 : -20 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {activeTab === "signin" ? (
                                            <SignInForm 
                                                onSuccess={onClose} 
                                                onForgotPassword={() => setShowForgotPassword(true)}
                                            />
                                        ) : (
                                            <SignUpForm onSuccess={onClose} />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <ForgotPasswordModal
                isOpen={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
                onBack={() => setShowForgotPassword(false)}
            />
        </>
    );
}

