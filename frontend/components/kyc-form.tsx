"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  FileImage,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import type { KycStatus } from "@/lib/mock-types";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
──────────────────────────────────────────────────────────────────────────────*/
export type IdType = "Ghana Card" | "Passport" | "Driver's License";

interface KycFormProps {
  /** Pre-fill the full-name field from the account data */
  defaultName?: string;
  /** Current kyc status of the user/partner */
  currentStatus?: KycStatus;
  /** Colour scheme: "light" (account page) | "dark" (partner dashboard) */
  theme?: "light" | "dark";
  /** Called with "pending" after a successful mock submission */
  onStatusChange?: (status: KycStatus) => void;
}

/* ─────────────────────────────────────────────────────────────────────────────
   KYC Status Banner — shows the current verification state above the form
──────────────────────────────────────────────────────────────────────────────*/
function KycStatusBanner({
  status,
  theme,
}: {
  status: KycStatus;
  theme: "light" | "dark";
}) {
  const configs: Record<
    KycStatus,
    { label: string; sub: string; Icon: typeof ShieldCheck; colors: { light: string; dark: string } }
  > = {
    unverified: {
      label: "Identity Not Verified",
      sub: "Submit the form below to verify your identity.",
      Icon: AlertCircle,
      colors: {
        light: "bg-amber-50 border-amber-200 text-amber-800",
        dark: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      },
    },
    pending: {
      label: "Verification Pending",
      sub: "Your documents are under review — this typically takes 1–2 business days.",
      Icon: Clock,
      colors: {
        light: "bg-blue-50 border-blue-200 text-blue-800",
        dark: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      },
    },
    verified: {
      label: "Identity Verified",
      sub: "Your identity has been successfully verified.",
      Icon: ShieldCheck,
      colors: {
        light: "bg-emerald-50 border-emerald-200 text-emerald-800",
        dark: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      },
    },
    rejected: {
      label: "Verification Rejected",
      sub: "Your submission was not accepted. Please re-submit with valid documents.",
      Icon: X,
      colors: {
        light: "bg-red-50 border-red-200 text-red-800",
        dark: "bg-red-500/10 border-red-500/30 text-red-400",
      },
    },
  };

  const cfg = configs[status];
  const Icon = cfg.Icon;
  const colorClass = theme === "dark" ? cfg.colors.dark : cfg.colors.light;

  return (
    <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${colorClass}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="font-bold uppercase tracking-wider text-[11px]">{cfg.label}</p>
        <p className="mt-0.5 text-[11px] opacity-80">{cfg.sub}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   File Upload Zone (front / back)
──────────────────────────────────────────────────────────────────────────────*/
function UploadZone({
  label,
  required,
  file,
  onFile,
  theme,
  error,
}: {
  label: string;
  required: boolean;
  file: File | null;
  onFile: (f: File | null) => void;
  theme: "light" | "dark";
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = file ? URL.createObjectURL(file) : null;

  const baseZone =
    theme === "dark"
      ? "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
      : "border-neutral-200 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100";
  const errorZone =
    theme === "dark"
      ? "border-red-500/50 bg-red-500/[0.04]"
      : "border-red-300 bg-red-50";

  const labelColor = theme === "dark" ? "text-white/40" : "text-black/40";
  const iconColor = theme === "dark" ? "text-white/20" : "text-neutral-300";
  const hintColor = theme === "dark" ? "text-white/30" : "text-neutral-400";

  return (
    <div className="space-y-1.5">
      <label className={`text-[10px] font-black tracking-[0.15em] uppercase ${labelColor}`}>
        {label} {required ? <span className="text-red-400 ml-0.5">*</span> : <span className="opacity-50">(optional)</span>}
      </label>

      {previewUrl ? (
        /* Preview thumbnail */
        <div className="relative group">
          <div
            className={`relative overflow-hidden rounded-2xl border ${
              theme === "dark" ? "border-white/10" : "border-neutral-200"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={label}
              className="h-36 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onFile(null)}
                className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-black shadow"
              >
                <X className="h-3 w-3" />
                Remove
              </button>
            </div>
          </div>
          <p className={`mt-1 text-[10px] truncate ${hintColor}`}>{file?.name}</p>
        </div>
      ) : (
        /* Drop zone */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-7 transition-all ${
            error ? errorZone : baseZone
          }`}
        >
          <FileImage className={`h-7 w-7 ${iconColor}`} />
          <div className="text-center">
            <p className={`text-xs font-bold ${hintColor}`}>
              <span className={theme === "dark" ? "text-white/60" : "text-black/50"}>
                Click to upload
              </span>{" "}
              an image
            </p>
            <p className={`mt-0.5 text-[10px] ${hintColor}`}>JPG, PNG, WEBP — max 10 MB</p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const f = e.target.files?.[0] ?? null;
          onFile(f);
          e.target.value = "";
        }}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shared field primitives (match account page Input pattern)
──────────────────────────────────────────────────────────────────────────────*/
function FieldLabel({
  children,
  theme,
  required,
}: {
  children: React.ReactNode;
  theme: "light" | "dark";
  required?: boolean;
}) {
  return (
    <label className={`text-[10px] font-black tracking-[0.15em] uppercase ${theme === "dark" ? "text-white/40" : "text-black/40"}`}>
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function FieldInput({
  theme,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  theme: "light" | "dark";
  error?: string;
}) {
  const base =
    theme === "dark"
      ? "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.07]"
      : "bg-neutral-50 border-neutral-100 text-black placeholder:text-neutral-300 focus:border-black focus:bg-white";
  const errCls =
    theme === "dark"
      ? "border-red-500/50 bg-red-500/[0.04]"
      : "border-red-300 bg-red-50";

  return (
    <>
      <input
        {...props}
        className={`w-full rounded-2xl border px-4 py-4 text-sm font-bold outline-none transition-all ${error ? errCls : base} ${props.className ?? ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </>
  );
}

function FieldSelect({
  theme,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  theme: "light" | "dark";
  error?: string;
}) {
  const base =
    theme === "dark"
      ? "bg-white/[0.04] border-white/[0.08] text-white focus:border-white/30 focus:bg-white/[0.07]"
      : "bg-neutral-50 border-neutral-100 text-black focus:border-black focus:bg-white";
  const errCls =
    theme === "dark"
      ? "border-red-500/50 bg-red-500/[0.04]"
      : "border-red-300 bg-red-50";

  return (
    <>
      <select
        {...props}
        className={`w-full rounded-2xl border px-4 py-4 text-sm font-bold outline-none transition-all cursor-pointer ${error ? errCls : base} ${props.className ?? ""}`}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main KycForm component
──────────────────────────────────────────────────────────────────────────────*/
export function KycForm({
  defaultName = "",
  currentStatus = "unverified",
  theme = "light",
  onStatusChange,
}: KycFormProps) {
  /* ── local status (tracks optimistic mock update) ── */
  const [status, setStatus] = useState<KycStatus>(currentStatus);

  /* ── form state ── */
  const [fullName, setFullName] = useState(defaultName);
  const [dob, setDob] = useState("");
  const [idType, setIdType] = useState<IdType>("Ghana Card");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  /* ── submission state ── */
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* Back image is required for Ghana Card & Driver's License, optional for Passport */
  const backRequired = idType !== "Passport";

  /* ── validation ── */
  function validate() {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Full legal name is required.";
    if (!dob) e.dob = "Date of birth is required.";
    if (!idNumber.trim()) e.idNumber = "ID number is required.";
    if (!address.trim()) e.address = "Residential address is required.";
    if (!frontFile) e.front = "Front image of your ID is required.";
    if (backRequired && !backFile) e.back = "Back image is required for this ID type.";
    return e;
  }

  /* ── submit handler ── */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    /* Simulate a 1.2 s network delay then set status to "pending" */
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setStatus("pending");
      onStatusChange?.("pending");
    }, 1200);
  }

  /* ── theme-derived classes ── */
  const cardBg =
    theme === "dark"
      ? "bg-white/[0.03] border border-white/10"
      : "bg-white border border-neutral-100 shadow-sm";
  const headingColor = theme === "dark" ? "text-white" : "text-black";
  const subColor = theme === "dark" ? "text-white/50" : "text-neutral-500";
  const submitBtnBase =
    theme === "dark"
      ? "bg-white text-black hover:bg-white/90"
      : "bg-black text-white hover:bg-neutral-800";
  const dividerColor = theme === "dark" ? "border-white/10" : "border-neutral-100";

  /* ── if already verified, just show the banner ── */
  if (status === "verified") {
    return (
      <div className={`rounded-2xl p-6 ${cardBg}`}>
        <KycStatusBanner status="verified" theme={theme} />
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-5 sm:p-6 ${cardBg}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className={`text-base font-black uppercase tracking-tight ${headingColor}`}>
          Identity Verification (KYC)
        </h2>
        <p className={`mt-1 text-xs ${subColor}`}>
          We are required by law to verify the identity of our clients and partners.
          All documents are encrypted and handled securely.
        </p>
      </div>

      {/* Status Banner */}
      <div className="mb-6">
        <KycStatusBanner status={status} theme={theme} />
      </div>

      {/* Success confirmation (after submit) */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
              theme === "dark"
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-[11px] font-bold leading-relaxed">
              Your documents have been submitted and are under review — this
              typically takes 1–2 business days.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Only show the form if not already pending/rejected from a prior submission */}
      {status !== "pending" ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className={`border-b pb-4 ${dividerColor}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${subColor}`}>
                Personal Information
              </p>

              {/* Full legal name */}
              <div className="space-y-1.5">
                <FieldLabel theme={theme} required>Full Legal Name</FieldLabel>
                <FieldInput
                  id="kyc-full-name"
                  theme={theme}
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Kwame Asante Mensah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={errors.fullName}
                />
              </div>

              {/* Date of birth */}
              <div className="mt-4 space-y-1.5">
                <FieldLabel theme={theme} required>Date of Birth</FieldLabel>
                <FieldInput
                  id="kyc-dob"
                  theme={theme}
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  error={errors.dob}
                />
              </div>

              {/* Residential address */}
              <div className="mt-4 space-y-1.5">
                <FieldLabel theme={theme} required>Residential Address</FieldLabel>
                <FieldInput
                  id="kyc-address"
                  theme={theme}
                  type="text"
                  placeholder="e.g. 14 Accra Road, East Legon, Accra"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={errors.address}
                />
              </div>
            </div>

            {/* ID details */}
            <div className={`border-b pb-4 ${dividerColor}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${subColor}`}>
                Identity Document
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ID type */}
                <div className="space-y-1.5">
                  <FieldLabel theme={theme} required>ID Type</FieldLabel>
                  <FieldSelect
                    id="kyc-id-type"
                    theme={theme}
                    value={idType}
                    onChange={(e) => {
                      setIdType(e.target.value as IdType);
                      setBackFile(null);
                    }}
                  >
                    <option value="Ghana Card">Ghana Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driver's License">Driver&apos;s License</option>
                  </FieldSelect>
                </div>

                {/* ID number */}
                <div className="space-y-1.5">
                  <FieldLabel theme={theme} required>ID Number</FieldLabel>
                  <FieldInput
                    id="kyc-id-number"
                    theme={theme}
                    type="text"
                    placeholder={
                      idType === "Ghana Card"
                        ? "GHA-XXXXXXXXX-X"
                        : idType === "Passport"
                        ? "G0000000"
                        : "DVLA-XXXXXXXX"
                    }
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    error={errors.idNumber}
                  />
                </div>
              </div>

              {/* Document uploads */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UploadZone
                  label="Front of ID"
                  required
                  file={frontFile}
                  onFile={setFrontFile}
                  theme={theme}
                  error={errors.front}
                />
                <UploadZone
                  label={`Back of ID`}
                  required={backRequired}
                  file={backFile}
                  onFile={setBackFile}
                  theme={theme}
                  error={errors.back}
                />
              </div>
              {!backRequired && (
                <p className={`mt-2 text-[10px] italic ${subColor}`}>
                  Back image is not required for passports.
                </p>
              )}
            </div>

            {/* Consent note */}
            <p className={`text-[10px] leading-relaxed ${subColor}`}>
              By submitting this form you confirm that the information provided is
              accurate and that you consent to PKAF STORE processing your identity
              documents for verification purposes in accordance with our Privacy
              Policy.
            </p>

            {/* Submit */}
            <button
              id="kyc-submit-btn"
              type="submit"
              disabled={submitting}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black tracking-[0.15em] uppercase transition-all disabled:opacity-60 disabled:cursor-not-allowed ${submitBtnBase}`}
            >
              {submitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Upload className="h-4 w-4" />
                  </motion.span>
                  Submitting…
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Submit for Verification
                </>
              )}
            </button>
          </form>
        ) : null}
    </div>
  );
}
