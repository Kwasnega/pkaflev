"use client";

import { Crown, Medal, Trophy } from "lucide-react";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/leaderboard";
import { formatGhs } from "@/lib/price";

const rankStyles = {
  1: "border-amber-300/40 bg-amber-300/10 text-amber-200",
  2: "border-slate-300/30 bg-slate-300/10 text-slate-200",
  3: "border-orange-400/30 bg-orange-400/10 text-orange-200",
} as const;

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-4 w-4" />;
  if (rank === 2) return <Medal className="h-4 w-4" />;
  if (rank === 3) return <Trophy className="h-4 w-4" />;
  return <span className="text-sm font-bold text-white/50">#{rank}</span>;
}

export function Leaderboard({ currentPartnerId }: { currentPartnerId?: string }) {
  const entries = getLeaderboard();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left">
          <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/50">
            <tr>
              <th className="px-5 py-4">Rank</th>
              <th className="px-5 py-4">Partner</th>
              <th className="px-5 py-4 text-right">Sales Generated</th>
              <th className="px-5 py-4 text-right">Commission Earned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {entries.map((entry) => {
              const isCurrentPartner = entry.id === currentPartnerId;
              const topRankStyle = rankStyles[entry.rank as keyof typeof rankStyles];

              return (
                <tr
                  key={entry.id}
                  className={isCurrentPartner ? "bg-sky-400/10" : "transition-colors hover:bg-white/[0.03]"}
                >
                  <td className="px-5 py-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${topRankStyle || "border-white/10 bg-white/5"}`}>
                      <RankIcon rank={entry.rank} />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${isCurrentPartner ? "bg-sky-300 text-slate-950" : "bg-white/10 text-white"}`}>
                        {entry.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{entry.name}</p>
                        {isCurrentPartner ? (
                          <span className="mt-1 inline-flex rounded-full border border-sky-300/30 bg-sky-300/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-sky-200">
                            You
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-sm text-white/70">{formatGhs(entry.totalSales)}</td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-emerald-300">{formatGhs(entry.totalCommission)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
