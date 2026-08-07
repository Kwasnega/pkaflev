"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, ShieldAlert, Users, ChevronDown, ChevronUp, Plus, KeyRound, Check } from "lucide-react";
import { affiliates as mockAffiliates, type Affiliate, type AffiliateStatus } from "@/lib/mock-data";
import { createPartnerAccount, getPartnerAccounts } from "@/lib/partner-auth";

const STATUS_STYLES: Record<AffiliateStatus, string> = {
  "pending approval": "bg-amber-500/10 text-amber-300 border border-amber-500/30",
  active: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
  suspended: "bg-red-500/10 text-red-300 border border-red-500/30",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function AffiliateStatusBadge({ status }: { status: AffiliateStatus }) {
  const iconMap: Record<AffiliateStatus, typeof Clock3> = {
    "pending approval": Clock3,
    active: CheckCircle2,
    suspended: ShieldAlert,
  };

  const Icon = iconMap[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${STATUS_STYLES[status]}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

export default function AffiliatesPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>(mockAffiliates);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ name: "", email: "", password: "" });
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [createdAccounts, setCreatedAccounts] = useState(() => getPartnerAccounts());

  const totals = useMemo(() => {
    const totalSales = affiliates.reduce((sum, affiliate) => sum + affiliate.totalSales, 0);
    const totalCommission = affiliates.reduce((sum, affiliate) => sum + affiliate.totalCommission, 0);
    const pending = affiliates.filter((affiliate) => affiliate.status === "pending approval").length;
    const active = affiliates.filter((affiliate) => affiliate.status === "active").length;
    const suspended = affiliates.filter((affiliate) => affiliate.status === "suspended").length;

    return { totalSales, totalCommission, pending, active, suspended };
  }, [affiliates]);

  const businessRules = [
    "Commission rate is a flat 3.5%, calculated on the original product price, not the discounted price.",
    "Referred clients (checkout with a valid referral code/link) receive a 1.5% discount on amount paid.",
    "Referral tracking is link-based: the referral code attaches silently in the background when a client arrives via a partner's link; no manual code entry required.",
    "When a referral-linked order succeeds, three affiliate fields update together inside a single database transaction: commissionsEarned (+), available_balance (+), number_of_referrals (+1). If any step fails, all steps roll back.",
    "Minimum payout threshold: GHS 500. Affiliates cannot request a payout below this amount or exceed their current available_balance.",
    "Payout requests require Admin approval or decline. Declines must include a reason, communicated to the affiliate via email notification.",
    "Suspended affiliates (account_status = suspended): referral link/code stops attributing new referrals, payout requests are blocked, and they are excluded from the leaderboard.",
    "Leaderboard displays affiliate first name and number of referrals only (not commission amounts).",
    "SSL is provided via Let's Encrypt (free, browser-trusted, auto-renewed via Certbot every 90 days).",
    "Delivery is handled manually by the business owner; order status is manually updated by Admin (pending → out for delivery → delivered).",
  ];

  const updateAffiliateStatus = (id: string, status: AffiliateStatus) => {
    setAffiliates((current) =>
      current.map((affiliate) =>
        affiliate.id === id ? { ...affiliate, status } : affiliate,
      ),
    );
  };

  const getActionLabel = (status: AffiliateStatus) => {
    if (status === "pending approval") return "Approve";
    if (status === "active") return "Suspend";
    return "Activate";
  };

  const handleCreateLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      setLoginMessage("Please fill in the affiliate email and password.");
      return;
    }

    const created = createPartnerAccount({
      name: loginForm.name || "Affiliate Partner",
      email: loginForm.email,
      password: loginForm.password,
    });

    setCreatedAccounts(getPartnerAccounts());
    setLoginMessage(`Login created for ${created.email}. They can now sign in from the partner portal.`);
    setLoginForm({ name: "", email: "", password: "" });

    setAffiliates((current) =>
      current.map((affiliate) =>
        affiliate.email.toLowerCase() === created.email.toLowerCase()
          ? { ...affiliate, status: "active" }
          : affiliate,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Partner & Affiliate Management</h1>
          <p className="mt-1 text-sm text-white/50">Track partner performance, approvals, and referral payouts</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
          <Users className="h-4 w-4" />
          {affiliates.length} total partners
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Total Sales</p>
          <p className="mt-3 text-2xl font-bold text-white">{formatCurrency(totals.totalSales)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Commission</p>
          <p className="mt-3 text-2xl font-bold text-white">{formatCurrency(totals.totalCommission)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Pending</p>
          <p className="mt-3 text-2xl font-bold text-white">{totals.pending}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Active</p>
          <p className="mt-3 text-2xl font-bold text-white">{totals.active}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Suspended</p>
          <p className="mt-3 text-2xl font-bold text-white">{totals.suspended}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-sky-300">Business Rules</p>
            <h2 className="mt-1 text-xl font-bold text-white">Frontend demo policy</h2>
          </div>
          <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-sky-200">
            3.5% commission
          </span>
        </div>

        <ul className="space-y-3 text-sm leading-relaxed text-white/75">
          {businessRules.map((rule) => (
            <li key={rule} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Create affiliate login</h2>
            <p className="text-sm text-white/60">Create a partner sign-in for a new affiliate and they can log in immediately.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="text-sm text-white/70">
            Affiliate name
            <input
              type="text"
              value={loginForm.name}
              onChange={(event) => setLoginForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Jane Doe"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#09090b] px-3 py-2.5 text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
            />
          </label>

          <label className="text-sm text-white/70">
            Email
            <input
              type="email"
              value={loginForm.email}
              onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="affiliate@brand.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#09090b] px-3 py-2.5 text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
            />
          </label>

          <label className="text-sm text-white/70">
            Password
            <input
              type="text"
              value={loginForm.password}
              onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Create password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#09090b] px-3 py-2.5 text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
            />
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleCreateLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200"
            >
              <Plus className="h-4 w-4" />
              Create login
            </button>
          </div>
        </div>

        {loginMessage ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            <Check className="h-4 w-4" />
            {loginMessage}
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Created partner logins</h3>
          <span className="text-xs text-white/50">{createdAccounts.length} accounts</span>
        </div>

        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {createdAccounts.map((account) => (
            <div key={account.email} className="rounded-xl border border-white/10 bg-[#09090b] p-3 text-sm text-white/80">
              <p className="font-medium text-white">{account.name || "Affiliate Partner"}</p>
              <p className="mt-1 text-white/60">{account.email}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/40">Password</p>
              <p className="font-mono text-xs text-white/80">{account.password}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.2em] text-white/50">
              <tr>
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Referral Code</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Sales</th>
                <th className="px-6 py-4 text-right">Commission</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {affiliates.map((affiliate) => {
                const isExpanded = expandedId === affiliate.id;

                return (
                  <>
                    <tr
                      key={affiliate.id}
                      className="cursor-pointer transition-colors hover:bg-white/[0.02]"
                      onClick={() => setExpandedId(isExpanded ? null : affiliate.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                            {affiliate.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{affiliate.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/70">{affiliate.email}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80">
                          {affiliate.referralCode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/70">
                        {new Date(affiliate.dateJoined).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-white">{formatCurrency(affiliate.totalSales)}</td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-emerald-300">{formatCurrency(affiliate.totalCommission)}</td>
                      <td className="px-6 py-4">
                        <AffiliateStatusBadge status={affiliate.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            const nextStatus: AffiliateStatus =
                              affiliate.status === "pending approval"
                                ? "active"
                                : affiliate.status === "active"
                                  ? "suspended"
                                  : "active";
                            updateAffiliateStatus(affiliate.id, nextStatus);
                          }}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
                        >
                          {getActionLabel(affiliate.status)}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-white/[0.02]">
                        <td colSpan={8} className="px-6 py-5">
                          <div className="rounded-xl border border-white/10 bg-[#111214] p-4">
                            <div className="mb-3 flex items-center justify-between">
                              <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Referral history</p>
                                <p className="mt-1 text-sm text-white/70">Recent sales generated by {affiliate.name}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setExpandedId(null)}
                                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                              >
                                {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                                {isExpanded ? "Hide" : "Show"}
                              </button>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-sm">
                                <thead className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                                  <tr>
                                    <th className="pb-2 pr-4">Month</th>
                                    <th className="pb-2 pr-4 text-right">Sales</th>
                                    <th className="pb-2 pr-4 text-right">Commission</th>
                                    <th className="pb-2 text-right">Orders</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {affiliate.referralHistory.map((entry) => (
                                    <tr key={`${affiliate.id}-${entry.month}`} className="border-t border-white/10 text-white/70">
                                      <td className="py-2 pr-4">{entry.month}</td>
                                      <td className="py-2 pr-4 text-right">{formatCurrency(entry.sales)}</td>
                                      <td className="py-2 pr-4 text-right text-emerald-300">{formatCurrency(entry.commission)}</td>
                                      <td className="py-2 text-right">{entry.orders}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
