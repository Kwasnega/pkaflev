"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mockProducts } from "@/lib/mock-data";
import type { Product } from "@/lib/mock-types";

export type { Product } from "@/lib/mock-types";

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => Promise<string>;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

function sortProducts(products: Product[]) {
    return [...products].sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
}

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setProducts(sortProducts(mockProducts));
            setIsLoading(false);
        }, 120);

        return () => window.clearTimeout(timer);
    }, []);

    const addProduct = async (product: Omit<Product, "id">) => {
        const newProduct = {
            ...product,
            id: `mock-${Date.now()}`,
            createdAt: new Date().toISOString(),
        } as Product;

        setProducts((prev) => sortProducts([...prev, newProduct]));
        return newProduct.id;
    };

    const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
        setProducts((prev) =>
            sortProducts(
                prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
            )
        );
    };

    const deleteProduct = async (id: string) => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                isLoading,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}

