"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Shield, CheckCircle, LogOut, UserX, Trash2, AlertTriangle } from "lucide-react";
import type { KycStatus } from "@/lib/mock-types";
import { cn } from "@/lib/utils";

interface AccountActionsMenuProps {
  kycStatus: KycStatus;
  verifyHref: string;
  onLogout: () => Promise<void> | void;
  deactivateCopy: string;
  deleteCopy: string;
  theme?: "light" | "dark";
  className?: string;
}

export function AccountActionsMenu({
  kycStatus,
  verifyHref,
  onLogout,
  deactivateCopy,
  deleteCopy,
  theme = "light",
  className,
}: AccountActionsMenuProps) {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  // Close options menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
        setIsOptionsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeactivateConfirm = async () => {
    setIsDeactivateModalOpen(false);
    alert("Account deactivated successfully.");
    await onLogout();
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteModalOpen(false);
    alert("Account deleted permanently.");
    await onLogout();
  };

  const isDark = theme === "dark";

  return (
    <>
      <div className={cn("relative", className)} ref={optionsMenuRef}>
        <button
          onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
          className={cn(
            "flex items-center justify-center p-2 rounded-full transition-colors",
            isDark ? "hover:bg-white/10 text-white/70" : "hover:bg-neutral-100 text-neutral-500"
          )}
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>

        <AnimatePresence>
          {isOptionsMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute right-0 mt-2 w-56 rounded-2xl shadow-xl z-50 overflow-hidden",
                isDark ? "bg-[#111214] ring-1 ring-white/10 text-white" : "bg-white ring-1 ring-black/5 text-neutral-900"
              )}
            >
              <div className="p-1.5 flex flex-col">
                {kycStatus === "unverified" || kycStatus === "rejected" ? (
                  <Link
                    href={verifyHref}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isDark ? "hover:bg-white/5" : "hover:bg-neutral-50"
                    )}
                    onClick={() => setIsOptionsMenuOpen(false)}
                  >
                    <Shield size={16} className="text-blue-500" />
                    <span>Verify Account</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium opacity-50">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <span>Verified</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setIsOptionsMenuOpen(false);
                    onLogout();
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors w-full text-left",
                    isDark ? "hover:bg-white/5" : "hover:bg-neutral-50"
                  )}
                >
                  <LogOut size={16} className={isDark ? "text-white/60" : "text-neutral-500"} />
                  <span>Log Out</span>
                </button>

                <button
                  onClick={() => {
                    setIsOptionsMenuOpen(false);
                    setIsDeactivateModalOpen(true);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors w-full text-left",
                    isDark ? "hover:bg-white/5" : "hover:bg-neutral-50"
                  )}
                >
                  <UserX size={16} className={isDark ? "text-white/60" : "text-neutral-500"} />
                  <span>Deactivate Account</span>
                </button>

                <div className={cn("h-px my-1.5 mx-2", isDark ? "bg-white/10" : "bg-neutral-100")} />

                <button
                  onClick={() => {
                    setIsOptionsMenuOpen(false);
                    setIsDeleteModalOpen(true);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors w-full text-left",
                    isDark ? "text-red-400 hover:bg-red-500/10" : "text-red-600 hover:bg-red-50"
                  )}
                >
                  <Trash2 size={16} className="text-red-500" />
                  <span>Delete Account</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Deactivate Account Modal */}
      <AnimatePresence>
        {isDeactivateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsDeactivateModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "relative w-full max-w-md rounded-3xl p-6 shadow-2xl",
                isDark ? "bg-[#111214] text-white border border-white/10" : "bg-white text-neutral-900"
              )}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4 mx-auto">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Deactivate Account?</h2>
              <p className={cn("text-center mb-6 text-sm", isDark ? "text-white/60" : "text-neutral-500")}>
                {deactivateCopy}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeactivateModalOpen(false)}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold transition-colors",
                    isDark ? "border border-white/20 hover:bg-white/5" : "border border-neutral-200 hover:bg-neutral-50"
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeactivateConfirm}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold transition-colors",
                    isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                  )}
                >
                  Deactivate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "relative w-full max-w-md rounded-3xl p-6 shadow-2xl",
                isDark ? "bg-[#111214] text-white border border-white/10" : "bg-white text-neutral-900"
              )}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4 mx-auto">
                <Trash2 size={24} />
              </div>
              <h2 className={cn("text-xl font-bold text-center mb-2", isDark ? "text-red-400" : "text-red-600")}>Delete Account?</h2>
              <p className={cn("text-center mb-6 text-sm", isDark ? "text-white/60" : "text-neutral-500")}>
                {deleteCopy}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold transition-colors",
                    isDark ? "border border-white/20 hover:bg-white/5" : "border border-neutral-200 hover:bg-neutral-50"
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
