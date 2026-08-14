"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mockProducts } from "@/lib/mock-data";
import type { Product } from "@/lib/mock-types";
import { createProduct, fetchProducts } from "@/lib/api-client";

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

function mapBackendProduct(product: Record<string, unknown>): Product {
    return {
        id: String(product.product_id ?? product.id ?? ""),
        name: String(product.product_name ?? product.name ?? "Untitled product"),
        image: String(product.image ?? product.image_url ?? "/icon.jpg"),
        price: String(product.price ?? "0"),
        description: String(product.description ?? ""),
        category: String(product.category ?? "accessories"),
        createdAt: new Date().toISOString(),
    };
}

function sortProducts(products: Product[]) {
    return [...products].sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
}

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetchProducts();
                if (response.data && Array.isArray(response.data)) {
                    const backendProducts = response.data.map((product) => mapBackendProduct(product as Record<string, unknown>)) as Product[];

                    if (backendProducts.length > 0) {
                        setProducts(sortProducts(backendProducts));
                        window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(backendProducts));
                        setIsLoading(false);
                        return;
                    }
                }
            } catch {
                // Fall back to local mock data if the API is unavailable.
            }

            try {
                const saved = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
                setProducts(sortProducts(saved ? JSON.parse(saved) as Product[] : mockProducts));
            } catch {
                setProducts(sortProducts(mockProducts));
            }
            setIsLoading(false);
        };

        const timer = window.setTimeout(() => {
            void loadProducts();
        }, 120);

        return () => window.clearTimeout(timer);
    }, []);

    const addProduct = async (product: Omit<Product, "id">) => {
        const fallbackProduct = {
            ...product,
            id: `mock-${Date.now()}`,
            createdAt: new Date().toISOString(),
        } as Product;

        try {
            const response = await createProduct({
                product_name: product.name,
                description: product.description,
                price: Number(product.price) || 0,
                cost_price: 0,
                stock_quantity: 100,
                image_url: product.image ?? null,
            });

            const createdProduct = response.data?.product ?? response.data?.message ?? null;
            if (createdProduct && typeof createdProduct === "object") {
                const normalizedProduct = mapBackendProduct(createdProduct as Record<string, unknown>);
                const next = sortProducts([normalizedProduct, ...products.filter((item) => item.id !== normalizedProduct.id)]);
                setProducts(next);
                window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
                return normalizedProduct.id;
            }
        } catch {
            // Fall back to local-only storage if the backend is unavailable.
        }

        setProducts((prev) => {
            const next = sortProducts([...prev, fallbackProduct]);
            window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
            return next;
        });
        return fallbackProduct.id;
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

