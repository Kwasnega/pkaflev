"use client";

import { motion } from "framer-motion";

export default function ServicesPage() {
    const services = [
        {
            title: "Delivery & Logistics",
            content: "We provide nationwide delivery across Ghana. Standard delivery within Accra typically takes 24-48 hours. Regional deliveries (Kumasi, Takoradi, Tamale) may take 3-5 business days. International shipping is calculated at checkout via our global logistics partners."
        },
        {
            title: "Returns & Exchanges",
            content: "In accordance with Ghanaian consumer standards, items may be returned within 7 days of delivery if they are in their original, unworn condition with tags attached. Please note that custom-made or altered garments are final sale."
        },
        {
            title: "Payment Methods",
            content: "We accept all major local and international debit/credit cards. For our local clients, Mobile Money (MTN, Vodafone, AirtelTigo) is also accepted for seamless transactions."
        },
        {
            title: "Sizing & Fit",
            content: "Our garments follow international sizing standards. For specific measurements or fit assistance, please reach out to our concierge via the contact portal."
        }
    ];

    return (
        <div className="min-h-screen bg-white text-black font-sans pt-32 pb-20 px-6 md:px-12 selection:bg-black selection:text-white">
            <main className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-[10px] tracking-[0.5em] uppercase border-b border-black/10 pb-4 mb-16">
                        Client Services
                    </h1>

                    <div className="space-y-12">
                        {services.map((item, idx) => (
                            <section key={idx} className="max-w-2xl">
                                <h2 className="text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">{item.title}</h2>
                                <p className="text-sm leading-relaxed tracking-widest font-light">
                                    {item.content}
                                </p>
                            </section>
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
