"use client";

import { motion } from "framer-motion";
import { useCart } from "@/components/cart-provider";

export default function ContactPage() {
    const { settings } = useCart();
    return (
        <div className="min-h-screen bg-white text-black font-sans pt-32 pb-20 px-6 md:px-12 selection:bg-black selection:text-white">
            <main className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-[10px] tracking-[0.5em] uppercase border-b border-black/10 pb-4 mb-16">
                        Contact Us
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <section className="space-y-8">
                            <div>
                                <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Inquiries</h2>
                                <p className="text-sm tracking-widest font-light">
                                    General: info@pkaflev.com<br />
                                    Support: support@pkaflev.com
                                </p>
                            </div>

                            <div>
                                <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Phone</h2>
                                <p className="text-sm tracking-widest font-light">
                                    {settings?.storePhone || "+233 (0) 24 123 4567"}<br />
                                    Mon - Fri: 9:00 AM - 6:00 PM GMT
                                </p>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div>
                                <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Location</h2>
                                <p className="text-sm tracking-widest font-light uppercase">
                                    PKAF LEV Studio<br />
                                    East Legon, Area 46<br />
                                    Accra, Ghana
                                </p>
                            </div>

                            <div>
                                <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Studio Visits</h2>
                                <p className="text-[11px] tracking-widest font-light text-black/60 italic">
                                    Our studio is currently available by appointment only.
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-24 pt-12 border-t border-black/5">
                        <p className="text-[9px] tracking-[0.3em] uppercase text-black/30 text-center">
                            Handcrafted in Accra. Inspired by Global Quality.
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
