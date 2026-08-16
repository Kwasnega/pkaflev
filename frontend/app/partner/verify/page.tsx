"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { KycForm } from "@/components/kyc-form";
// TODO: replace with real API call — see GET /partner/status once backend is ready
const mockPartnerProfile: any = { status: "pending" };
import type { KycStatus } from "@/lib/mock-types";

export default function PartnerVerifyPage() {
  const router = useRouter();
  const partner = mockPartnerProfile;
  const [kycStatus, setKycStatus] = useState<KycStatus>("unverified");

  useEffect(() => {
    const savedStatus = localStorage.getItem("pkaf-partner-kyc") as KycStatus | null;
    setKycStatus(savedStatus ?? partner.kycStatus);
  }, [partner.kycStatus]);

  const handleStatusChange = (status: KycStatus) => {
    setKycStatus(status);
    localStorage.setItem("pkaf-partner-kyc", status);
    
    // Wait for a brief moment to show success state before redirecting
    setTimeout(() => {
      router.push("/partner/dashboard");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0a] font-sans text-white">
      <div className="w-full flex-col p-4 lg:p-8 max-w-4xl mx-auto mt-10 space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <ShieldAlert className="text-amber-500 h-6 w-6" />
              Identity Verification
            </h1>
            <p className="mt-1 text-sm text-white/50">
              Complete your KYC to enable withdrawals and full dashboard access.
            </p>
          </div>
          <Link
            href="/partner/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </header>

        <div className="rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6">
          <KycForm
            theme="dark"
            defaultName={partner.name}
            currentStatus={kycStatus}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
}
