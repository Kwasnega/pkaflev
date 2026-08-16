"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet } from "lucide-react";
// TODO: replace with real API call — see GET /partner/payouts once backend is ready
const mockPartnerProfile: any = { payouts: [] };
import { formatGhs } from "@/lib/price";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PayoutHistoryPage() {
  const partner = mockPartnerProfile;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payout History</h1>
          <p className="mt-1 text-sm text-white/50">
            Review your commission payouts and payment method history.
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
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Total Payouts</p>
            <p className="mt-2 text-3xl font-semibold text-white">{formatGhs(partner.payoutHistory.reduce((sum, payout) => sum + payout.amount, 0))}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/70">
            <Wallet className="mr-2 inline-block h-4 w-4 text-white/80" />
            Payout activity
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-white/60">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {partner.payoutHistory.map((payout, index) => (
                  <motion.tr
                    key={payout.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-sm text-white/70">{formatDate(payout.date)}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-white">{formatGhs(payout.amount)}</td>
                    <td className="px-6 py-4 text-sm text-white/80">{payout.method}</td>
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
