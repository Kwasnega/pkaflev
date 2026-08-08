"use client";

import { motion } from "framer-motion";

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans pt-32 pb-20 px-6 md:px-12 selection:bg-black selection:text-white">
            <main className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-[10px] tracking-[0.5em] uppercase border-b border-black/10 pb-4 mb-16">
                        Legal Notices
                    </h1>

                    <div className="space-y-16">
                        <section className="max-w-2xl">
                            <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Data Protection</h2>
                            <p className="text-sm leading-relaxed tracking-widest font-light mb-4">
                                PKAF LEV is committed to safeguarding your personal data in strict accordance with the **Data Protection Act, 2012 (Act 843)** of the Republic of Ghana.
                            </p>
                            <p className="text-sm leading-relaxed tracking-widest font-light">
                                We only collect information essential for transaction processing and service enhancement. Your data is processed with the highest degree of confidentiality and is never disclosed to unauthorized third parties.
                            </p>
                        </section>

                        <section className="max-w-2xl">
                            <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Terms of Access</h2>
                            <p className="text-sm leading-relaxed tracking-widest font-light">
                                By utilizing this portal, you agree to comply with our standards of use. All content, including imagery, typography, and design elements, remains the intellectual property of PKAF LEV and is protected under Ghanaian and International copyright laws.
                            </p>
                        </section>

                        <section className="max-w-2xl">
                            <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Governing Law</h2>
                            <p className="text-sm leading-relaxed tracking-widest font-light">
                                These notices and any disputes arising from the use of this site are governed exclusively by the laws of the Republic of Ghana.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
