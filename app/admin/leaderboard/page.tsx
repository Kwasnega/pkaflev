"use client";

import { Trophy } from "lucide-react";
import { Leaderboard } from "@/components/leaderboard";

export default function AdminLeaderboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] uppercase tracking-[0.28em] text-sky-300">Partner oversight</p>
        <h1 className="mt-2 text-2xl font-bold text-white">Leaderboard</h1>
        <p className="mt-1 text-sm text-white/50">Review active partner performance ranked by total commission earned.</p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="rounded-xl bg-amber-400/10 p-3 text-amber-300">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Top performers</h2>
            <p className="mt-1 text-sm text-white/50">The same ranking shown in the partner portal, with active partners only.</p>
          </div>
        </div>
        <Leaderboard />
      </section>
    </div>
  );
}
