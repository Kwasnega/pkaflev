"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Banknote, CreditCard, Phone, ShieldAlert } from "lucide-react";
// TODO: replace with real API call — see POST /partner/withdraw once backend is ready
const mockPartnerProfile: any = { availableBalance: 0 };
import type { KycStatus } from "@/lib/mock-types";
import { formatGhs } from "@/lib/price";

const AVAILABLE_BALANCE = 1240.0;
const PAYMENT_METHODS = ["Mobile Money", "Bank Transfer"] as const;
const MOBILE_PROVIDERS = ["MTN", "Telecel", "AirtelTigo"] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

type MobileProvider = (typeof MOBILE_PROVIDERS)[number];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WithdrawPage() {
  const partner = mockPartnerProfile;
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState<PaymentMethod>("Mobile Money");
  const [provider, setProvider] = useState<MobileProvider>("MTN");
  const [mobileNumber, setMobileNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [balance, setBalance] = useState(AVAILABLE_BALANCE);
  const [pendingPayouts, setPendingPayouts] = useState(partner.payoutHistory.filter((payout) => payout.method === "Mobile Money" || payout.method === "Bank Transfer"));
  const [kycStatus, setKycStatus] = useState<KycStatus>("unverified");

  useEffect(() => {
    const savedStatus = localStorage.getItem("pkaf-partner-kyc") as KycStatus | null;
    setKycStatus(savedStatus ?? partner.kycStatus);
  }, [partner.kycStatus]);

  const canSubmit = amount > 0 && amount <= balance && (method === "Bank Transfer" ? accountNumber.trim().length > 0 && bankName.trim().length > 0 : mobileNumber.trim().length > 0);

  const availableAmountText = useMemo(() => formatGhs(balance), [balance]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (amount <= 0) {
      setError("Please enter an amount greater than zero.");
      return;
    }

    if (amount > balance) {
      setError("Requested amount exceeds available balance.");
      return;
    }

    const newBalance = Number((balance - amount).toFixed(2));
    setBalance(newBalance);
    setAmount(0);
    setMobileNumber("");
    setBankName("");
    setAccountNumber("");
    setSuccess("Withdrawal request submitted — funds will arrive within 3-5 business days.");

    setPendingPayouts((current) => [
      {
        id: `pending-${Date.now()}`,
        date: new Date().toISOString(),
        amount,
        method,
      },
      ...current,
    ]);
  };

  const handleWithdrawAll = () => {
    setAmount(balance);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Withdraw Funds</h1>
          <p className="mt-1 text-sm text-white/50">
            Request a payout from your available balance.
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

      {kycStatus !== "verified" ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="mb-2 text-xl font-bold">Identity Verification Required</h2>
          <p className="mb-8 max-w-md text-sm text-white/50">
            You must verify your identity to enable withdrawals and secure your payouts. This process typically takes 1-2 business days.
          </p>
          <Link
            href="/partner/verify"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Verify Identity
          </Link>
        </div>
      ) : (
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Available balance</p>
                <p className="mt-3 text-4xl font-semibold text-white">{availableAmountText}</p>
                <p className="mt-2 text-sm text-white/50">This is the amount you can withdraw right now.</p>
              </div>
              <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-white/70">
                <p>Total lifetime earnings</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatGhs(partner.stats.totalCommissionEarned)}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={amount || ""}
                  onChange={(event) => {
                    setAmount(Number(event.target.value));
                    setError("");
                  }}
                  placeholder="Enter amount"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                />
                <button
                  type="button"
                  onClick={handleWithdrawAll}
                  className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/15"
                >
                  Withdraw All
                </button>
              </div>
              <p className="mt-2 text-sm text-white/50">Available: {availableAmountText}</p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-white/70">Payout Method</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {PAYMENT_METHODS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setMethod(option);
                      setError("");
                    }}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      method === option
                        ? "border-white/20 bg-white/5 text-white"
                        : "border-white/10 bg-transparent text-white/70 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {method === "Mobile Money" ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">Mobile Money Number</label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(event) => {
                      setMobileNumber(event.target.value);
                      setError("");
                    }}
                    placeholder="e.g. 024 123 4567"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">Provider</label>
                  <select
                    value={provider}
                    onChange={(event) => setProvider(event.target.value as MobileProvider)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                  >
                    {MOBILE_PROVIDERS.map((item) => (
                      <option key={item} value={item} className="bg-[#0b0b0b] text-white">
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(event) => {
                      setAccountNumber(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter account number"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(event) => {
                      setBankName(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter bank name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                  />
                </div>
              </div>
            )}

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}
            {success ? <p className="text-sm text-emerald-400">{success}</p> : null}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canSubmit}
            >
              Request Withdrawal
            </button>
          </form>
        </div>

        <aside className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Pending Withdrawals</h2>
              <p className="text-sm text-white/50">Requests waiting to be processed.</p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingPayouts.map((payout) => (
              <div key={payout.id} className="rounded-3xl border border-white/10 bg-black/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-white/60">{formatDate(payout.date)}</p>
                    <p className="text-sm text-white/80">{payout.method}</p>
                  </div>
                  <p className="text-lg font-semibold text-white">{formatGhs(payout.amount)}</p>
                </div>
                <p className="mt-2 text-xs text-white/50">Status: pending</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
      )}
    </div>
  );
}
