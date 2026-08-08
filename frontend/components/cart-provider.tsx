"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/lib/mock-types";
import { parseMoney } from "@/lib/price";

export interface CartItem {
	product: Product;
	quantity: number;
}

interface CartContextValue {
	items: CartItem[];
	totalItems: number;
	subtotal: number;
	settings?: any;
	addItem: (product: Product, quantity?: number) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	removeItem: (productId: string) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	useEffect(() => {
		try {
			const raw = localStorage.getItem("shopping-cart");
			if (raw) setItems(JSON.parse(raw));
		} catch (e) {
			// ignore
		}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem("shopping-cart", JSON.stringify(items));
		} catch (e) {}
	}, [items]);

	const addItem = (product: Product, quantity = 1) => {
		setItems((prev) => {
			const existing = prev.find((i) => i.product.id === product.id);
			if (existing) {
				return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
			}
			return [{ product, quantity }, ...prev];
		});
	};

	const updateQuantity = (productId: string, quantity: number) => {
		setItems((prev) => prev.map((i) => i.product.id === productId ? { ...i, quantity } : i));
	};

	const removeItem = (productId: string) => {
		setItems((prev) => prev.filter((i) => i.product.id !== productId));
	};

	const clearCart = () => setItems([]);

	const totalItems = items.reduce((s, i) => s + i.quantity, 0);
	const subtotal = items.reduce((s, i) => s + (parseMoney(i.product.price) * i.quantity), 0);

	return (
		<CartContext.Provider value={{ items, totalItems, subtotal, addItem, updateQuantity, removeItem, clearCart }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}

export default CartProvider;
