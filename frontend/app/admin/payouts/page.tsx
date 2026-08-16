"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock3, Download, Wallet, XCircle } from "lucide-react";
// TODO: replace with real API call — see GET /admin/payouts once backend is ready
const mockPartnerProfile: any = null;
import { formatGhs } from "@/lib/price";

type PayoutRequestStatus = "pending" | "approved" | "declined";

type PayoutRequest = {
  id: string;
  partnerName: string;
  email: string;
  amount: number;
  method: "Mobile Money" | "Bank Transfer";
  destination: string;
  requestedAt: string;
  status: PayoutRequestStatus;
  note?: string;
};

function StatCard({ label, value, hint, accent }: { label: string; value: string; hint: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{label}</p>
      <p className={`mt-3 text-2xl font-bold ${accent}`}>{value}</p>
      <p className="mt-2 text-xs text-white/50">{hint}</p>
    </div>
  );
}

export default function AdminPayoutsPage() {
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([
    {
      id: "pr-101",
      partnerName: "James Doe",
      email: "partner@pkafstore.com",
      amount: 720,
      method: "Mobile Money",
      destination: "+233 20 123 4567 • MTN",
      requestedAt: "2026-08-03T11:15:00.000Z",
      status: "pending",
      note: "Requested after 6 referral sales cleared.",
    },
    {
      id: "pr-102",
      partnerName: "Nana Kofi Mensah",
      email: "nana@urbanloop.gh",
      amount: 860,
      method: "Bank Transfer",
      destination: "Ecobank • 0123456789",
      requestedAt: "2026-08-01T09:00:00.000Z",
      status: "pending",
      note: "Bank transfer is the preferred payout method.",
    },
    {
      id: "pr-103",
      partnerName: "Kwame Sarpong",
      email: "kwame@citystride.gh",
      amount: 630,
      method: "Mobile Money",
      destination: "+233 24 556 8210 • AirtelTigo",
      requestedAt: "2026-07-29T15:40:00.000Z",
      status: "approved",
      note: "Approved and queued for this week’s settlement.",
    },
    {
      id: "pr-104",
      partnerName: "Efua Nartey",
      email: "efua@mobilitygh.com",
      amount: 540,
      method: "Bank Transfer",
      destination: "Stanbic Bank • 9988123456",
      requestedAt: "2026-07-27T13:20:00.000Z",
      status: "declined",
      note: "Declined: amount below the minimum payout threshold.",
    },
  ]);

  const totalPaid = useMemo(
    () => mockPartnerProfile.payoutHistory.reduce((sum, payout) => sum + payout.amount, 0),
    []
  );

  const pending = useMemo(
    () => mockPartnerProfile.referralHistory
      .filter((sale) => sale.payoutStatus === "pending")
      .reduce((sum, sale) => sum + sale.commissionAmount, 0),
    []
  );

  const recentPayouts = mockPartnerProfile.payoutHistory;
  const referralQueue = mockPartnerProfile.referralHistory.filter((sale) => sale.payoutStatus === "pending");

  const updatePayoutStatus = (id: string, status: PayoutRequestStatus) => {
    setPayoutRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
              note:
                status === "approved"
                  ? "Approved by admin and scheduled for payout."
                  : status === "declined"
                    ? "Declined by admin. Reason to be communicated to the affiliate."
                    : request.note,
            }
          : request,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">PKAF STORE Admin</p>
          <h1 className="mt-2 text-2xl font-bold text-white">Payouts</h1>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          <Download className="h-4 w-4" />
          Export report
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total paid" value={formatGhs(totalPaid)} hint="Lifetime payouts sent" accent="text-emerald-300" />
        <StatCard label="Pending" value={formatGhs(pending)} hint="Awaiting payout approval" accent="text-amber-300" />
        <StatCard label="Partners" value={String(mockPartnerProfile.stats.totalSignups)} hint="Active referrers" accent="text-white" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Payout overview</h2>
              <p className="text-sm text-white/50">Recent partner payment activity</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/50">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentPayouts.map((payout) => (
                  <tr key={payout.id} className="bg-[#0a0a0a]/30">
                    <td className="px-4 py-3">{new Date(payout.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="px-4 py-3">{payout.method}</td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-300">{formatGhs(payout.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Pending commissions</h2>
              <p className="text-sm text-white/50">Items awaiting settlement</p>
            </div>
          </div>

          <div className="space-y-3">
            {referralQueue.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-[#09090b] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{item.productName}</p>
                    <p className="mt-1 text-xs text-white/50">{item.customerName}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-300">
                    <Clock3 className="h-3 w-3" />
                    Pending
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-white/50">Referral commission</span>
                  <span className="font-semibold text-white">{formatGhs(item.commissionAmount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">Payout requests</p>
            <h2 className="mt-2 text-xl font-bold text-white">Affiliate payout queue</h2>
          </div>
          <span className="rounded-full border border-white/10 bg-[#09090b] px-3 py-1.5 text-xs text-white/60">
            {payoutRequests.filter((request) => request.status === "pending").length} pending
          </span>
        </div>

        <div className="space-y-4">
          {payoutRequests.map((request) => {
            const isPending = request.status === "pending";
            const isApproved = request.status === "approved";
            const isDeclined = request.status === "declined";

            return (
              <div key={request.id} className="rounded-2xl border border-white/10 bg-[#09090b] p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{request.partnerName}</h3>
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
                          isApproved && "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
                          isDeclined && "border border-red-500/30 bg-red-500/10 text-red-300",
                          isPending && "border border-amber-500/30 bg-amber-500/10 text-amber-300",
                        ].join(" ")}
                      >
                        {request.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
                      <span>{request.email}</span>
                      <span>{new Date(request.requestedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>{request.method}</span>
                    </div>
                  </div>

                  <div className="text-left lg:text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Requested</p>
                    <p className="mt-2 text-2xl font-bold text-white">{formatGhs(request.amount)}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Withdrawal method</p>
                    <p className="mt-2 text-sm font-medium text-white">{request.method}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Destination</p>
                    <p className="mt-2 text-sm font-medium text-white">{request.destination}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Admin decision</p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {request.status === "pending" ? "Awaiting review" : request.status === "approved" ? "Approved" : "Declined"}
                    </p>
                  </div>
                </div>

                {request.note && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/65">
                    {request.note}
                  </div>
                )}

                {isPending && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => updatePayoutStatus(request.id, "approved")}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePayoutStatus(request.id, "declined")}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
                    >
                      <XCircle className="h-4 w-4" />
                      Decline
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
