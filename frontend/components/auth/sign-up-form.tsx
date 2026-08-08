"use client";

import { useState } from "react";
import { Check, Lock, Mail, Phone, UserRound } from "lucide-react";
import { AuthButton } from "./auth-button";
import { InputField } from "./input-field";
import { SocialAuthButtons } from "./social-auth-buttons";
import { useAuth } from "@/contexts/AuthContext";

interface SignUpErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export function SignUpForm({ onSuccess }: { onSuccess?: () => void }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field === "acceptTerms" ? "acceptTerms" : field]: undefined }));
  };

  const validate = () => {
    const nextErrors: SignUpErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!emailRegex.test(form.email)) nextErrors.email = "Please enter a valid email";

    if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
    else if (form.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Enter a valid phone number";

    if (!form.password) nextErrors.password = "Password is required";
    else if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) nextErrors.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords do not match";

    if (!form.acceptTerms) nextErrors.acceptTerms = "You must agree to the terms and conditions";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await signup(form.email.trim(), form.password, `${form.firstName.trim()} ${form.lastName.trim()}`);
      setIsSuccess(true);
      setTimeout(() => onSuccess?.(), 1200);
    } catch (error: any) {
      setErrors((current) => ({
        ...current,
        email: error?.message || "Unable to create account right now.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h3 className="text-xl font-bold text-white">Account created</h3>
        <p className="mt-2 text-sm text-white/60">You’re ready to start shopping with PKAF LEV.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <SocialAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0a0a0a] px-4 text-white/40">Or create with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="First name"
            type="text"
            placeholder="Jane"
            icon={UserRound}
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            error={errors.firstName}
            autoComplete="given-name"
          />
          <InputField
            label="Last name"
            type="text"
            placeholder="Doe"
            icon={UserRound}
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>

        <InputField
          label="Email"
          type="email"
          placeholder="mail@domain.com"
          icon={Mail}
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <InputField
          label="Phone"
          type="tel"
          placeholder="+233 20 123 4567"
          icon={Phone}
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          showPasswordToggle
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
          error={errors.password}
          autoComplete="new-password"
        />

        <InputField
          label="Confirm password"
          type="password"
          placeholder="Repeat password"
          icon={Lock}
          showPasswordToggle
          value={form.confirmPassword}
          onChange={(event) => updateField("confirmPassword", event.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <div className="-mt-1">
          <label className="flex cursor-pointer items-center gap-2 text-[11px] leading-relaxed text-white/80">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(event) => updateField("acceptTerms", event.target.checked)}
              className="h-3.5 w-3.5 shrink-0 cursor-pointer rounded border border-white/40 bg-[#111111] text-white accent-white shadow-sm transition checked:bg-white checked:text-black focus:ring-2 focus:ring-white/30 focus:ring-offset-0"
            />
            <span>
              I agree to the <a href="/legal" className="text-white underline underline-offset-2">terms</a>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-[10px] text-red-400">{errors.acceptTerms}</p>
          )}
        </div>

        <div className="pt-2">
          <AuthButton
            isLoading={isSubmitting}
            type="submit"
            disabled={!form.acceptTerms || isSubmitting}
            className={!form.acceptTerms ? "opacity-60" : ""}
          >
            Create Account →
          </AuthButton>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
