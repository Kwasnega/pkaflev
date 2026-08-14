"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";

export default function CartPage() {
  const router = useRouter();
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-background/80 p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-sm text-foreground/70 mb-6">Add a product to see it here.</p>
          <Link href="/shop" className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
            <p className="text-sm text-foreground/70">{totalItems} item{totalItems === 1 ? "" : "s"} in your cart</p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase text-white transition hover:bg-white/10"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="rounded-3xl border border-white/10 bg-background/80 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <img src={item.product.image} alt={item.product.name} className="h-32 w-32 rounded-3xl object-cover" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                    <p className="text-sm text-foreground/70 mt-2">{item.product.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-foreground/70">
                      <span>Price: GHS {item.product.price}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span className="font-semibold">Total: GHS {(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase text-white transition hover:bg-white/10"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase text-white transition hover:bg-white/10"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="rounded-full border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-semibold uppercase text-red-300 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-background/80 p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm text-foreground/70">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>GHS {subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-8 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
