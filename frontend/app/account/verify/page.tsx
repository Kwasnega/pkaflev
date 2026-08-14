"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { KycForm } from "@/components/kyc-form";
import { useUserData, useUpdateUser } from "@/hooks/useUserData";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import type { KycStatus } from "@/lib/mock-types";

export default function VerifyAccountPage() {
  const router = useRouter();
  const { user, loading } = useUserData();
  const { isAuthenticated } = useAuth();
  const [kycStatus, setKycStatus] = useState<KycStatus>("unverified");

  useEffect(() => {
    if (user?.kycStatus) {
      setKycStatus(user.kycStatus);
    }
  }, [user]);

  if (!isAuthenticated && !loading) {
    router.push("/");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  const defaultName = user ? `${user.firstName} ${user.lastName}`.trim() : "";

  return (
    <main className="min-h-screen bg-white font-sans text-neutral-900 pb-12">
      {/* Header */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-8 px-4 sm:px-6 md:px-12 border-b border-black/5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
              <Shield size={28} className="text-blue-500" />
              Identity Verification
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 mt-2">
              Secure your account and unlock faster checkout.
            </p>
          </div>
          <Link
            href="/account"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Account
          </Link>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 pt-8">
        <KycForm
          theme="light"
          defaultName={defaultName}
          currentStatus={kycStatus}
          onStatusChange={(status) => {
            setKycStatus(status);
            // Wait a brief moment to show success state before redirecting
            setTimeout(() => {
              router.push("/account");
            }, 1000);
          }}
        />
      </div>
    </main>
  );
}
