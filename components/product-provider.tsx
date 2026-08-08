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

const PRODUCTS_STORAGE_KEY = "pkaf_products";

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
            try {
                const saved = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
                setProducts(sortProducts(saved ? JSON.parse(saved) as Product[] : mockProducts));
            } catch {
                setProducts(sortProducts(mockProducts));
            }
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

        setProducts((prev) => {
            const next = sortProducts([...prev, newProduct]);
            window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
            return next;
        });
        return newProduct.id;
    };

    const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
        setProducts((prev) => {
            const next = sortProducts(prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)));
            window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    };

    const deleteProduct = async (id: string) => {
        setProducts((prev) => {
            const next = prev.filter((item) => item.id !== id);
            window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
            return next;
        });
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

