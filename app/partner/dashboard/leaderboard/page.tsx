"use client";

import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { Leaderboard } from "@/components/leaderboard";
import { CURRENT_PARTNER_LEADERBOARD_ID } from "@/lib/leaderboard";

export default function PartnerLeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-sky-300">Performance board</p>
          <h1 className="mt-2 text-2xl font-bold">Leaderboard</h1>
          <p className="mt-1 text-sm text-white/50">See how your commission performance compares with active partners.</p>
        </div>
        <Link
          href="/partner/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="rounded-xl bg-amber-400/10 p-3 text-amber-300">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Top partner performance</h2>
            <p className="mt-1 text-sm text-white/50">Ranked by total commission earned. Your row is highlighted in blue.</p>
          </div>
        </div>
        <Leaderboard currentPartnerId={CURRENT_PARTNER_LEADERBOARD_ID} />
      </section>
    </div>
  );
}
