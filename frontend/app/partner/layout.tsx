"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Banknote, Handshake, LayoutDashboard, Link2, LogOut, Menu, Settings, Trophy, Wallet, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isPartnerAuthenticated, setPartnerAuthenticated } from "@/lib/partner-auth";

function PartnerLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const isLoginPage = pathname === "/partner/login" || pathname.startsWith("/partner/login?");
  const isDashboardPage = pathname === "/partner/dashboard";
  const isReferralPage = pathname === "/partner/dashboard/referral-history";
  const isWithdrawPage = pathname === "/partner/dashboard/withdraw";
  const isPayoutPage = pathname === "/partner/dashboard/payout-history";
  const isLeaderboardPage = pathname === "/partner/dashboard/leaderboard";
  const isSettingsPage = pathname === "/partner/dashboard/settings";
  const isDashboardRoute = pathname === "/partner/dashboard" || pathname.startsWith("/partner/dashboard/");
  const isPortalRoute = isLoginPage || isDashboardRoute;

  useEffect(() => {
    const authed = isPartnerAuthenticated();
    setAuthenticated(authed);
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("pkaf-partner-avatar");
    setProfileImage(savedAvatar ?? null);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onStorage = (event: StorageEvent) => {
        if (event.key === "pkaf-partner-avatar") {
          setProfileImage(event.newValue ?? null);
        }
      };

      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
  }, []);

  useEffect(() => {
    if (loading || !isPortalRoute) return;

    if (!authenticated && !isLoginPage) {
      router.push("/partner/login");
      return;
    }

    if (authenticated && isLoginPage) {
      router.push("/partner/dashboard");
    }
  }, [loading, authenticated, isLoginPage, isPortalRoute, router]);

  const navLinkBase = "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all";
  const navLinkInactive = "text-white/60 hover:bg-white/5 hover:text-white";
  const navLinkActive = "bg-white text-black shadow-lg shadow-white/10";

  const handleLogout = () => {
    setPartnerAuthenticated(false);
    setAuthenticated(false);
    router.push("/partner/login");
  };

  if (!isPortalRoute) {
    return <>{children}</>;
  }

  if (loading && !isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
      </div>
    );
  }

  if (!authenticated && !isLoginPage) {
    return null;
  }

  if (isLoginPage) {
    return <div className="dark min-h-screen bg-black">{children}</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0a] font-sans text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0a0a0a] lg:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
          <Link href="/partner/dashboard" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Handshake className="h-5 w-5 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight">Partner Portal</span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6">
          <Link
            href="/partner/dashboard"
            className={`${navLinkBase} ${isDashboardPage ? navLinkActive : navLinkInactive}`}
          >
            <LayoutDashboard className="h-5 w-5 shrink-0" />
            Dashboard
          </Link>
          <Link
            href="/partner/dashboard/referral-history"
            className={`${navLinkBase} ${isReferralPage ? navLinkActive : navLinkInactive}`}
          >
            <Link2 className="h-5 w-5 shrink-0" />
            Referral History
          </Link>
          <Link
            href="/partner/dashboard/withdraw"
            className={`${navLinkBase} ${isWithdrawPage ? navLinkActive : navLinkInactive}`}
          >
            <Banknote className="h-5 w-5 shrink-0" />
            Withdraw
          </Link>
          <Link
            href="/partner/dashboard/payout-history"
            className={`${navLinkBase} ${isPayoutPage ? navLinkActive : navLinkInactive}`}
          >
            <Wallet className="h-5 w-5 shrink-0" />
            Payout History
          </Link>
          <Link
            href="/partner/dashboard/leaderboard"
            className={`${navLinkBase} ${isLeaderboardPage ? navLinkActive : navLinkInactive}`}
          >
            <Trophy className="h-5 w-5 shrink-0" />
            Leaderboard
          </Link>
          <Link
            href="/partner/dashboard/settings"
            className={`${navLinkBase} ${isSettingsPage ? navLinkActive : navLinkInactive}`}
          >
            <Settings className="h-5 w-5 shrink-0" />
            Settings
          </Link>
        </div>

        <div className="space-y-2 border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#0a0a0a] lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
                <Link href="/partner/dashboard" className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                    <Handshake className="h-5 w-5 text-black" />
                  </div>
                  <span className="text-lg font-bold">Partner Portal</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/60 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <Link
                  href="/partner/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${navLinkBase} text-base ${isDashboardPage ? navLinkActive : navLinkInactive}`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/partner/dashboard/referral-history"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${navLinkBase} text-base ${isReferralPage ? navLinkActive : navLinkInactive}`}
                >
                  <Link2 className="h-5 w-5" />
                  Referral History
                </Link>
                <Link
                  href="/partner/dashboard/withdraw"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${navLinkBase} text-base ${isWithdrawPage ? navLinkActive : navLinkInactive}`}
                >
                  <Banknote className="h-5 w-5" />
                  Withdraw
                </Link>
                <Link
                  href="/partner/dashboard/payout-history"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${navLinkBase} text-base ${isPayoutPage ? navLinkActive : navLinkInactive}`}
                >
                  <Wallet className="h-5 w-5" />
                  Payout History
                </Link>
                <Link
                  href="/partner/dashboard/leaderboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${navLinkBase} text-base ${isLeaderboardPage ? navLinkActive : navLinkInactive}`}
                >
                  <Trophy className="h-5 w-5" />
                  Leaderboard
                </Link>
                <Link
                  href="/partner/dashboard/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${navLinkBase} text-base ${isSettingsPage ? navLinkActive : navLinkInactive}`}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </div>

              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex w-full flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-[#0a0a0a]/80 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="shrink-0 rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="truncate text-lg font-semibold">Partner Dashboard</h1>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 sm:flex">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs font-medium text-green-400">Active Partner</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/10">
              {profileImage ? (
                <img src={profileImage} alt="Partner profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-bold">P</span>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <PartnerLayoutContent>{children}</PartnerLayoutContent>;
}
