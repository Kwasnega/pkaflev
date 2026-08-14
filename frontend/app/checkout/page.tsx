"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/contexts/AuthContext";
import { checkoutOrder } from "@/lib/api-client";

type PaymentMethod = "card" | "mobile_money" | "bank_transfer";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, subtotal } = useCart();
  const { user, loading } = useAuth();

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("Ghana");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState(user?.phoneNumber ?? "");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardName, setCardName] = useState(user?.displayName ?? "");
  const [cardLast4, setCardLast4] = useState("");
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validCheckoutItems = useMemo(() => {
    return items
      .map((item) => {
        const productId = Number(item.product.id);
        if (!Number.isFinite(productId) || productId <= 0) return null;

        return {
          productId,
          quantity: Math.max(1, Number(item.quantity) || 1),
        };
      })
      .filter((item): item is { productId: number; quantity: number } => item !== null);
  }, [items]);

  const verifyAndSubmitCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!user) {
      window.dispatchEvent(new CustomEvent("pkaflev:open-auth", { detail: { defaultTab: "signin" } }));
      setErrorMessage("Please sign in to continue checkout.");
      return;
    }

    if (!addressLine1.trim() || !city.trim() || !region.trim() || !country.trim() || !phone.trim()) {
      setErrorMessage("Please complete your delivery address and phone number.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardName.trim() || cardLast4.trim().length !== 4 || !/^\d{4}$/.test(cardLast4.trim())) {
        setErrorMessage("Please provide card holder name and the last 4 digits of the card.");
        return;
      }
    }

    if (paymentMethod === "mobile_money" && !mobileMoneyNumber.trim()) {
      setErrorMessage("Please provide a mobile money number.");
      return;
    }

    if (!validCheckoutItems.length) {
      setErrorMessage("Your cart has invalid items. Please update your cart and try again.");
      return;
    }

    const clientId = Number(user.id ?? user.uid);
    if (!Number.isFinite(clientId) || clientId <= 0) {
      setErrorMessage("Please sign in again before checking out.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await checkoutOrder({
        clientId,
        items: validCheckoutItems,
        referralCode: referralCode.trim() || undefined,
        verification: {
          addressLine1: addressLine1.trim(),
          addressLine2: addressLine2.trim() || undefined,
          city: city.trim(),
          region: region.trim(),
          country: country.trim(),
          postalCode: postalCode.trim() || undefined,
          phone: phone.trim(),
          paymentMethod,
          cardName: paymentMethod === "card" ? cardName.trim() : undefined,
          cardLast4: paymentMethod === "card" ? cardLast4.trim() : undefined,
          mobileMoneyNumber: paymentMethod === "mobile_money" ? mobileMoneyNumber.trim() : undefined,
          notes: notes.trim() || undefined,
        },
      });

      if (response.error) {
        setErrorMessage(response.error);
        return;
      }

      const authorizationUrl = response.data?.authorization_url;
      if (authorizationUrl) {
        window.location.href = authorizationUrl;
        return;
      }

      router.push("/payment");
    } catch {
      setErrorMessage("Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-10">
        <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-background/80 p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Sign in required</h1>
          <p className="text-sm text-foreground/70 mb-6">Please sign in to verify your checkout details.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("pkaflev:open-auth", { detail: { defaultTab: "signin" } }))}
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black"
            >
              Sign In
            </button>
            <Link
              href="/cart"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-white/10"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-10">
        <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-background/80 p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-sm text-foreground/70 mb-6">Add products before verifying checkout details.</p>
          <Link
            href="/shop"
            className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Checkout Verification</h1>
          <p className="mt-2 text-sm text-foreground/70">Verify your address and payment details before proceeding.</p>
        </div>

        <form onSubmit={verifyAndSubmitCheckout} className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-background/80 p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-2 block text-foreground/70">Address Line 1</span>
                  <input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" required />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block text-foreground/70">Address Line 2 (Optional)</span>
                  <input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block text-foreground/70">City</span>
                  <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" required />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block text-foreground/70">Region / State</span>
                  <input value={region} onChange={(e) => setRegion(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" required />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block text-foreground/70">Country</span>
                  <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" required />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block text-foreground/70">Postal Code</span>
                  <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" />
                </label>
                <label className="text-sm md:col-span-2">
                  <span className="mb-2 block text-foreground/70">Phone Number</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" required />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-background/80 p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Verification</h2>
              <div className="grid gap-3 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${paymentMethod === "card" ? "border-white bg-white/10" : "border-white/15 bg-white/5"}`}
                >
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mobile_money")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${paymentMethod === "mobile_money" ? "border-white bg-white/10" : "border-white/15 bg-white/5"}`}
                >
                  Mobile Money
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${paymentMethod === "bank_transfer" ? "border-white bg-white/10" : "border-white/15 bg-white/5"}`}
                >
                  Bank Transfer
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="text-sm">
                    <span className="mb-2 block text-foreground/70">Card Holder Name</span>
                    <input value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" required />
                  </label>
                  <label className="text-sm">
                    <span className="mb-2 block text-foreground/70">Card Last 4 Digits</span>
                    <input value={cardLast4} onChange={(e) => setCardLast4(e.target.value.replace(/\D/g, "").slice(0, 4))} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" inputMode="numeric" required />
                  </label>
                </div>
              )}

              {paymentMethod === "mobile_money" && (
                <div className="mt-4">
                  <label className="text-sm block">
                    <span className="mb-2 block text-foreground/70">Mobile Money Number</span>
                    <input value={mobileMoneyNumber} onChange={(e) => setMobileMoneyNumber(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" required />
                  </label>
                </div>
              )}

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-2 block text-foreground/70">Referral Code (Optional)</span>
                  <input value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block text-foreground/70">Notes (Optional)</span>
                  <input value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3" />
                </label>
              </div>
            </section>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-background/80 p-6 h-fit">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm text-foreground/70">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>GHS {subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Initializing Payment..." : "Confirm & Continue"}
            </button>

            <Link
              href="/cart"
              className="mt-3 block w-full rounded-full border border-white/20 px-6 py-4 text-center text-sm font-semibold uppercase text-white transition hover:bg-white/10"
            >
              Back to Cart
            </Link>

            {errorMessage && <p className="mt-3 text-sm text-red-400">{errorMessage}</p>}
          </aside>
        </form>
      </div>
    </div>
  );
}
