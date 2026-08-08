import { ShopSection } from "@/components/shop-section";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category: categoryParam } = await params;
    const category = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
    return {
        title: `${category} | PKAF LEV`,
        description: `Browse our ${category} collection.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    return (
        <main>
            <ShopSection category={category} />
        </main>
    );
}
