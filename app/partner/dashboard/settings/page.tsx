"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Camera,
  KeyRound,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { mockPartnerProfile } from "@/lib/mock-data";

const PAYMENT_METHODS = ["Mobile Money", "Bank Transfer"] as const;
const MOBILE_PROVIDERS = ["MTN", "Telecel", "AirtelTigo"] as const;
const MOCK_CURRENT_PASSWORD = "pkaflev123";

type PaymentMethod = (typeof PAYMENT_METHODS)[number];
type MobileProvider = (typeof MOBILE_PROVIDERS)[number];

export default function PartnerSettingsPage() {
  const savedMethod = mockPartnerProfile.defaultPayoutMethod;

  const [profile, setProfile] = useState({
    fullName: mockPartnerProfile.name,
    email: mockPartnerProfile.email,
    phone: mockPartnerProfile.phone,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("pkaf-partner-avatar") ?? null;
  });

  const [method, setMethod] = useState<PaymentMethod>(savedMethod.type);
  const [mobileNumber, setMobileNumber] = useState(savedMethod.mobileNumber ?? "");
  const [network, setNetwork] = useState<MobileProvider>((savedMethod.network as MobileProvider) ?? "MTN");
  const [accountNumber, setAccountNumber] = useState(savedMethod.accountNumber ?? "");
  const [bankName, setBankName] = useState(savedMethod.bankName ?? "");

  const [profileMessage, setProfileMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [payoutMessage, setPayoutMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isPayoutMethodComplete = useMemo(() => {
    if (method === "Mobile Money") {
      return mobileNumber.trim().length > 0 && network.trim().length > 0;
    }

    return accountNumber.trim().length > 0 && bankName.trim().length > 0;
  }, [accountNumber, bankName, method, mobileNumber, network]);

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (!result) return;
      setProfileImage(result);
      localStorage.setItem("pkaf-partner-avatar", result);
      setProfileMessage({ type: "success", text: "Profile photo updated successfully." });
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileMessage(null);

    if (!profile.fullName.trim() || !profile.email.trim() || !profile.phone.trim()) {
      setProfileMessage({ type: "error", text: "Please complete all profile fields before saving." });
      return;
    }

    setProfileMessage({ type: "success", text: "Profile information updated successfully." });
  };

  const handlePasswordUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordMessage(null);

    if (passwordForm.currentPassword !== MOCK_CURRENT_PASSWORD) {
      setPasswordMessage({ type: "error", text: "Current password is incorrect." });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    setPasswordMessage({ type: "success", text: "Password updated successfully." });
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePayoutSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPayoutMessage(null);

    if (!isPayoutMethodComplete) {
      setPayoutMessage({ type: "error", text: "Please complete the selected payout method details before saving." });
      return;
    }

    setPayoutMessage({ type: "success", text: "Default payout method saved successfully." });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-white/50">Manage your profile, security, and default payout details.</p>
        </div>

        <Link
          href="/partner/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="w-full space-y-6">
        <form onSubmit={handleProfileSave} className="w-full space-y-6 rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <p className="text-sm text-white/50">Keep your contact details current.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
                {profileImage ? (
                  <img src={profileImage} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  <UserRound className="h-9 w-9 text-white/60" />
                )}
                <label className="absolute bottom-1 right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black text-white shadow-lg shadow-black/20">
                  <Camera className="h-3.5 w-3.5" />
                  <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" />
                </label>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white/70">Profile Photo</p>
                <p className="text-xs text-white/45">Optional. Upload a photo for your partner avatar.</p>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Full Name</label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(event) => setProfile({ ...profile, fullName: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) => setProfile({ ...profile, email: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Phone Number</label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(event) => setProfile({ ...profile, phone: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                />
              </div>
            </div>
          </div>

          {profileMessage ? (
            <p className={profileMessage.type === "success" ? "text-sm text-emerald-400" : "text-sm text-rose-400"}>
              {profileMessage.text}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </form>

        <form onSubmit={handlePasswordUpdate} className="w-full space-y-6 rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Change Password</h2>
              <p className="text-sm text-white/50">Keep your account secure.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
                placeholder="Enter current password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
                placeholder="Create a new password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })}
                placeholder="Re-enter new password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
              />
            </div>
          </div>

          {passwordMessage ? (
            <p className={passwordMessage.type === "success" ? "text-sm text-emerald-400" : "text-sm text-rose-400"}>
              {passwordMessage.text}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <ShieldCheck className="h-4 w-4" />
            Update Password
          </button>
        </form>
      </div>

    </div>
  );
}
