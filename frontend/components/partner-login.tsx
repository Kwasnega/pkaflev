"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Handshake, Sparkles } from "lucide-react";
import {
  PARTNER_DEMO_EMAIL,
  PARTNER_DEMO_PASSWORD,
  setPartnerAuthenticated,
  validatePartnerCredentials,
} from "@/lib/partner-auth";

export function PartnerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState(PARTNER_DEMO_EMAIL);
  const [password, setPassword] = useState(PARTNER_DEMO_PASSWORD);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!validatePartnerCredentials(email, password)) {
        throw new Error("Invalid login credentials.");
      }

      setPartnerAuthenticated(true);
      router.push("/partner/dashboard");
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSignIn();
  };

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(72,119,255,0.18),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(119,255,213,0.16),_transparent_30%)]" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-12">
        <div className="relative z-10 w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-4 rounded-3xl bg-white/5 p-5 shadow-inner shadow-white/5">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-400/15 to-emerald-400/10 text-sky-300 ring-1 ring-white/10">
              <Handshake className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-300">PKAF Partner</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back, partner.</h1>
            </div>
          </div>

          <p className="mb-8 text-sm leading-6 text-slate-300">
            Sign in to track referrals, commissions, and payouts from your PKAF STORE affiliate dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-slate-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={PARTNER_DEMO_EMAIL}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white shadow-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20"
                autoComplete="email"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-200">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={PARTNER_DEMO_PASSWORD}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white shadow-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-sky-400 to-emerald-400 px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-sky-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
              <Sparkles className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-300">
            <p className="font-semibold uppercase tracking-[0.18em] text-slate-200">Demo credentials</p>
            <p className="mt-2 text-sm leading-6">
              Email: <span className="font-medium text-white">{PARTNER_DEMO_EMAIL}</span>
            </p>
            <p>
              Password: <span className="font-medium text-white">{PARTNER_DEMO_PASSWORD}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
