"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Link2 } from "lucide-react";
// TODO: replace with real API call — see GET /partner/referrals once backend is ready
type PayoutStatus = any;
const mockPartnerProfile: any = { referrals: [] };


import { formatGhs } from "@/lib/price";

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

export default function ReferralHistoryPage() {
  const partner = mockPartnerProfile;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Referral History</h1>
          <p className="mt-1 text-sm text-white/50">
            All sales attributed to your referral link, including commission and payout status.
          </p>
        </div>
        <Link
          href="/partner/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Referral Link</p>
            <p className="mt-2 font-mono text-sm text-sky-300">{partner.referralLink}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Referral code</p>
            <p className="mt-1 font-mono text-lg font-semibold text-white sm:text-xl">
              {partner.referralCode}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Product</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-white/60">Sale Amount</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-white/60">Commission</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {partner.referralHistory.map((sale, index) => (
                  <motion.tr
                    key={sale.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-sm text-white/70">{formatDate(sale.date)}</td>
                    <td className="px-6 py-4 text-sm text-white/80">{sale.customerName}</td>
                    <td className="px-6 py-4 text-sm text-white/80">{sale.productName}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-white">{formatGhs(sale.saleAmount)}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-emerald-400">{formatGhs(sale.commissionAmount)}</td>
                    <td className="px-6 py-4">
                      <PayoutStatusBadge status={sale.payoutStatus} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
