"use client";

import { motion } from "framer-motion";

export default function SupplyChainPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans pt-32 pb-20 px-6 md:px-12 selection:bg-black selection:text-white">
            <main className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-[10px] tracking-[0.5em] uppercase border-b border-black/10 pb-4 mb-16">
                        Supply Chain Disclosure
                    </h1>

                    <div className="space-y-16">
                        <section className="max-w-2xl">
                            <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Ethical Sourcing</h2>
                            <p className="text-sm leading-relaxed tracking-widest font-light mb-4">
                                At PKAF LEV, we believe that the beauty of a product lies not only in its design but in the integrity of its creation. We are dedicated to ensuring that our entire supply chain operates ethically and transparently.
                            </p>
                        </section>

                        <section className="max-w-2xl">
                            <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Labour Standards</h2>
                            <p className="text-sm leading-relaxed tracking-widest font-light mb-4">
                                We operate in strict compliance with the **Labour Act, 2003 (Act 651)** of Ghana. Our manufacturing partners are vetted to ensure:
                            </p>
                            <ul className="text-[11px] tracking-[0.15em] font-light space-y-4 ml-4 list-disc text-black/70">
                                <li>Fair wages that meet or exceed national minimum standards.</li>
                                <li>Safe and healthy working environments.</li>
                                <li>Zero tolerance for forced or child labour.</li>
                                <li>Respect for workers' rights to association and representation.</li>
                            </ul>
                        </section>

                        <section className="max-w-2xl">
                            <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Sustainability</h2>
                            <p className="text-sm leading-relaxed tracking-widest font-light">
                                We actively prioritize locally sourced materials where possible to support the Ghanaian textile industry and reduce our carbon footprint, contributing to a more sustainable fashion ecosystem in West Africa.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
