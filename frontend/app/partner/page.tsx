"use client";

import Link from "next/link";
import { useState } from "react";
import { PkaflevHero } from "@/components/pkaflev-hero";
import { getPartnerHeroMedia } from "@/lib/homepage-content";
import { getBackendUrl } from "@/lib/api-config";

export default function PartnerPage() {
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    partnershipType: "Reseller",
    website: "",
    monthlyCapacity: "",
    message: "",
  });
  const [status, setStatus] = useState<null | "idle" | "sending" | "success" | "error">(
    "idle"
  );
  const { imageSrc: partnerHeroImage, videoSrc: partnerHeroVideo } = getPartnerHeroMedia();

  function update(k: string, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const generatedPassword = `pkaf-${Math.random().toString(36).slice(2, 10)}!`;
      const res = await fetch(getBackendUrl("/api/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: generatedPassword,
          name: form.contactName || form.businessName,
          role: "affiliate",
        }),
      });

      const payload = await res.json().catch(() => null);

      if (res.ok) {
        setStatus("success");
        setForm({
          businessName: "",
          contactName: "",
          email: "",
          phone: "",
          location: "",
          partnershipType: "Reseller",
          website: "",
          monthlyCapacity: "",
          message: "",
        });
      } else {
        console.error("Partner registration failed:", payload);
        setStatus("error");
      }
    } catch (err) {
      console.error("Partner registration error:", err);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white text-foreground">
      <div className="w-full">
        <PkaflevHero
          imageSrc={partnerHeroImage}
          videoSrc={partnerHeroVideo}
          leftText="Become a PKAF Partner"
          leftButtonText="Apply Now"
          leftButtonHref="#partner-form"
          rightButtonText="Learn More"
          rightButtonHref="#reasons"
          disableTextAnimation
          className="mb-8"
        />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-3xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] tracking-[0.3em] uppercase text-gray-500">Partner With Us</p>
          <Link
            href="/partner/login"
            className="inline-flex items-center justify-center rounded border border-black/10 bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black/90"
          >
            Partner Login
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <form id="partner-form" className="md:col-span-2 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-gray-700 placeholder-gray-400"
                placeholder="Business name"
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                required
              />
              <input
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-gray-700 placeholder-gray-400"
                placeholder="Contact name"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-gray-700 placeholder-gray-400"
                placeholder="Email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
              <input
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-gray-700 placeholder-gray-400"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <input
              className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-gray-700 placeholder-gray-400"
              placeholder="Location (city, region)"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-gray-700 placeholder-gray-400"
                value={form.partnershipType}
                onChange={(e) => update("partnershipType", e.target.value)}
              >
                <option>Reseller</option>
                <option>Service Center</option>
                <option>Fleet / Corporate</option>
                <option>Affiliate / Influencer</option>
              </select>
              <input
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-gray-700 placeholder-gray-400"
                placeholder="Website (optional)"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>

            <input
              className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-gray-700 placeholder-gray-400"
              placeholder="Estimated monthly capacity / orders"
              value={form.monthlyCapacity}
              onChange={(e) => update("monthlyCapacity", e.target.value)}
            />

            <textarea
              className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded h-28 text-gray-700 placeholder-gray-400"
              placeholder="Tell us about your business and what you're interested in"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="inline-block rounded border border-black/10 bg-black text-white px-6 py-3 font-semibold group"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Apply Now"}
              </button>
              {status === "success" && <span className="text-green-400">Submitted — we'll be in touch.</span>}
              {status === "error" && <span className="text-rose-400">Submission failed — try again.</span>}
            </div>
          </form>

          <aside id="reasons" className="space-y-6">
            <div className="bg-gray-50 border border-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2 text-black">Why partner with PKAF</h3>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• Competitive wholesale margins</li>
                <li>• Training & certification for technicians</li>
                <li>• Marketing & co-op support</li>
                <li>• Nationwide warranty & service network</li>
                <li>• Lead referrals for qualified partners</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-4 rounded">
              <h4 className="font-semibold text-black">Next steps</h4>
              <p className="text-sm text-gray-600">We review applications within 3 business days and schedule an onboarding call.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </div>
  );
}
