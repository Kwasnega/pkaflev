import { affiliates } from "@/lib/mock-data";
import { mockPartnerProfile } from "@/lib/mock-data";

export interface LeaderboardEntry {
  id: string;
  name: string;
  totalCommission: number;
  totalSales: number;
}

const additionalPartners: LeaderboardEntry[] = [
  { id: "aff-1007", name: "Kojo Mensima", totalCommission: 1760, totalSales: 17600 },
  { id: "aff-1008", name: "Abena Asare", totalCommission: 1320, totalSales: 13200 },
];

export const leaderboardEntries: LeaderboardEntry[] = [
  {
    id: "partner-james",
    name: mockPartnerProfile.name,
    totalCommission: mockPartnerProfile.stats.totalCommissionEarned,
    totalSales: mockPartnerProfile.stats.totalCommissionEarned * 20,
  },
  ...affiliates
    .filter((affiliate) => affiliate.status !== "suspended")
    .map(({ id, name, totalCommission, totalSales }) => ({ id, name, totalCommission, totalSales })),
  ...additionalPartners,
].sort((a, b) => b.totalCommission - a.totalCommission);

export const getLeaderboard = () =>
  leaderboardEntries.map((entry, index) => ({ ...entry, rank: index + 1 }));

export const CURRENT_PARTNER_LEADERBOARD_ID = "partner-james";
