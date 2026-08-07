import { LookbookSection } from "@/components/lookbook-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lookbook | 46",
    description: "Explore our latest collections and timeless designs.",
};

export default function LookbookPage() {
    return (
        <main>
            <LookbookSection />
        </main>
    );
}
