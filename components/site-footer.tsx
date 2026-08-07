"use client";

import { FormEvent } from "react";
import Link from "next/link";

export function SiteFooter() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="border-t border-slate-200/5 bg-[#05060a] text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 sm:gap-8 lg:gap-10 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-5 sm:gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-sm lg:max-w-[320px]">
            <Link href="/" className="mb-3 inline-block sm:mb-5">
              <img src="/levlogo.png" alt="LEV" className="h-16 w-auto object-contain sm:h-24 lg:h-32" />
            </Link>
            <p className="hidden text-sm text-slate-400 sm:block">
              LEV delivers premium urban mobility solutions with a focus on electric scooters, bikes and motorbikes.
            </p>
            <div className="mt-3 space-y-1.5 text-xs text-slate-300 sm:mt-6 sm:space-y-2 sm:text-sm">
              <p>Phone: <a href="tel:+233501234567" className="text-white hover:text-white">+233 50 123 4567</a></p>
              <p>Email: <a href="mailto:hello@lev.com" className="text-white hover:text-white">hello@lev.com</a></p>
              <p>Address: 12 Labone Avenue, Accra, Ghana</p>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4 sm:gap-6 lg:grid-cols-2 lg:gap-10">
            <div>
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">Company</h2>
              <div className="mt-2 flex flex-col gap-1.5 text-xs text-slate-300 sm:mt-4 sm:gap-2 sm:text-sm">
                <Link href="/legal" className="hover:text-white">Terms & Conditions</Link>
                <Link href="/legal" className="hover:text-white">Legal Notices</Link>
                <Link href="/partner" className="hover:text-white">Partner Portal</Link>
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">Support</h2>
              <div className="mt-2 flex flex-col gap-1.5 text-xs text-slate-300 sm:mt-4 sm:gap-2 sm:text-sm">
                <Link href="/contact" className="hover:text-white">Contact Us</Link>
                <Link href="/shop" className="hover:text-white">Shipping</Link>
                <Link href="/shop" className="hover:text-white">Returns</Link>
                <Link href="/shop" className="hover:text-white">FAQ</Link>
              </div>
            </div>

            <div className="hidden md:block md:col-span-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Newsletter</h2>
              <p className="mt-4 text-sm text-slate-400">Subscribe for updates on new products, offers and events.</p>
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                <label htmlFor="footer-newsletter" className="sr-only">Email address</label>
                <input
                  id="footer-newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/10"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} LEV. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
