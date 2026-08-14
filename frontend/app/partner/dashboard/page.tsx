"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { KycStatus } from "@/lib/mock-types";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Copy,
  Link2,
  LucideIcon,
  MousePointerClick,
  TrendingUp,
  UserPlus,
  Wallet,
} from "lucide-react";
import { mockPartnerProfile } from "@/lib/mock-data";
import type { PayoutStatus } from "@/lib/mock-data";
import { formatGhs } from "@/lib/price";
import { NewsletterPopup } from "@/components/newsletter-popup";

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startValue = displayValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {prefix}
      {Math.round(displayValue).toLocaleString()}
      {suffix}
    </span>
  );
}

function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  delay = 0,
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  trendUp: boolean;
  delay?: number;
}) {
  const numericValue =
    typeof value === "number" ? value : parseInt(value.toString().replace(/[^0-9]/g, "")) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 transition-colors hover:border-white/20"
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-colors group-hover:bg-white/10" />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <div className="rounded-xl bg-white/5 p-3">
            <Icon className="h-5 w-5 text-white/80" />
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-green-400" : "text-red-400"}`}>
            <ArrowUpRight className="h-3 w-3" />
            {trend}
          </div>
        </div>

        <div>
          <p className="mb-1 text-sm text-white/50">{title}</p>
          <p className="text-3xl font-bold tracking-tight">
            {typeof value === "number" ? <AnimatedNumber value={numericValue} /> : value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
  const isPaid = status === "paid";
  const Icon = isPaid ? CheckCircle2 : Clock;
  const colorClasses = isPaid
    ? "bg-green-500/10 text-green-400 border-green-500/20"
    : "bg-amber-500/10 text-amber-400 border-amber-500/20";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${colorClasses}`}>
      <Icon className="h-3.5 w-3.5" />
      {isPaid ? "Paid" : "Pending"}
    </span>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PartnerDashboardPage() {
  const partner = mockPartnerProfile;
  const [copied, setCopied] = useState(false);
  const [kycStatus, setKycStatus] = useState<KycStatus>("unverified");

  useEffect(() => {
    const savedStatus = localStorage.getItem("pkaf-partner-kyc") as KycStatus | null;
    setKycStatus(savedStatus ?? partner.kycStatus);
  }, [partner.kycStatus]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(partner.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const kpiData = [
    {
      title: "Commission Earned",
      value: formatGhs(partner.stats.totalCommissionEarned),
      icon: TrendingUp,
      trend: "+9.8%",
      trendUp: true,
    },
    {
      title: "Total Clicks",
      value: partner.stats.totalClicks,
      icon: MousePointerClick,
      trend: "+18.4%",
      trendUp: true,
    },
    {
      title: "Total Signups",
      value: partner.stats.totalSignups,
      icon: UserPlus,
      trend: "+12.1%",
      trendUp: true,
    },
    {
      title: "Pending Payout",
      value: formatGhs(partner.stats.pendingPayoutAmount),
      icon: Wallet,
      trend: "3 sales",
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            Welcome, {partner.name}
            <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full border ${
              kycStatus === "verified" ? "bg-green-500/10 text-green-400 border-green-500/20" :
              kycStatus === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
              kycStatus === "rejected" ? "bg-red-500/10 text-red-400 border-red-500/20" :
              "bg-white/5 text-white/50 border-white/10"
            }`}>
              {kycStatus === "verified" ? "Verified" :
               kycStatus === "pending" ? "Pending Review" :
               kycStatus === "rejected" ? "Unverified" :
               "Unverified"}
            </span>
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Track your referrals, commissions, and payout history.
          </p>
        </div>
        <div className="min-w-[220px] rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <span className="block text-[10px] uppercase tracking-[0.32em] text-slate-400">Referral code</span>
          <span className="mt-2 block font-mono text-2xl font-black tracking-tight text-white sm:text-3xl">
            {partner.referralCode}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
            trendUp={kpi.trendUp}
            delay={index * 0.1}
          />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white/5 p-3">
              <Link2 className="h-5 w-5 text-white/80" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Your Referral Link</h2>
              <p className="mt-1 text-sm text-white/50">
                Share this link to earn commission on every qualifying sale.
              </p>
              <p className="mt-3 break-all font-mono text-sm text-sky-300">{partner.referralLink}</p>
              <p className="mt-2 text-xs text-white/40">
                Code: <span className="text-white/70">{partner.referralCode}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </motion.section>

      <NewsletterPopup />

      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Your Dashboard Summary</h2>
              <p className="mt-1 text-sm text-white/50">
                View the key partner metrics here, then use the links below to open your full referral and payout history.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="/partner/dashboard/referral-history"
              className="rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-white/20 hover:bg-white/5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Referral History</p>
                  <p className="mt-3 text-xl font-semibold text-white">See all referred sales</p>
                </div>
                <Link2 className="h-6 w-6 text-white/80" />
              </div>
              <p className="mt-4 text-sm text-white/50">Access every referral sale and commission status in one place.</p>
            </a>

            <a
              href="/partner/dashboard/payout-history"
              className="rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-white/20 hover:bg-white/5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Payout History</p>
                  <p className="mt-3 text-xl font-semibold text-white">Review past payouts</p>
                </div>
                <Wallet className="h-6 w-6 text-white/80" />
              </div>
              <p className="mt-4 text-sm text-white/50">Track every commission payout made to your account.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
