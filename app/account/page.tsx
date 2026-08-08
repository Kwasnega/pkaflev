"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { 
  User, Mail, Phone, MapPin, Package, Clock, ChevronRight, 
  Edit3, Plus, Trash2, Star, CheckCircle, X, Download, 
  Truck, CreditCard, Home, LogOut, Crown, Sparkles,
  MoreVertical, RefreshCw, FileText, Shield, Loader2, ShoppingBag
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData, useUpdateUser, useAddresses } from "@/hooks/useUserData";
import { useCart } from "@/components/cart-provider";
import { useProducts } from "@/components/product-provider";
import type { Order, Address } from "@/lib/db-schema";
import { formatGhs, parseMoney, resolveOrderItemLineTotal, resolveOrderItemUnitPrice } from "@/lib/price";
import { getOrderStatusLabel } from "@/lib/order-status";

// Types
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  memberSince: string;
}

// Animation Components
const ShimmerEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
    />
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    processing: "bg-neutral-100 text-neutral-900 border-neutral-300",
    "delivery-in-progress": "bg-sky-50 text-sky-700 border-sky-200",
    "delivery-on-route": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "order-delivered": "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-neutral-200 text-neutral-600 border-neutral-300 line-through",
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${styles[status] || "bg-white text-neutral-900 border-neutral-200"}`}>
      {getOrderStatusLabel(status)}
    </span>
  );
};

const getInitials = (firstName?: string, lastName?: string) => {
  const firstInitial = firstName?.trim()?.[0] || "";
  const lastInitial = lastName?.trim()?.[0] || "";
  return `${firstInitial}${lastInitial}` || "G4";
};

const getOrderItems = (order?: Pick<Order, "items"> | null) => Array.isArray(order?.items) ? order.items : [];

const getOrderItemImage = (item: any) => item?.image || item?.product?.image || "/icon.jpg";

export default function AccountPage() {
  const router = useRouter();
  const { user: authUser, isAuthenticated, logout, changePassword } = useAuth();
  const { user, orders, addresses, loading, refetch } = useUserData();
  const { updateUser, loading: updatingUser } = useUpdateUser();
  const { createAddress, updateAddress, deleteAddress, loading: addressLoading } = useAddresses();
  
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses">("overview");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Form states
  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [addressForm, setAddressForm] = useState({ name: "", phone: "", address: "", city: "", country: "Ghana", isDefault: false });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Update profile form when user data loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Update address form when editing
  useEffect(() => {
    if (editingAddress) {
      setAddressForm({
        name: editingAddress.name,
        phone: editingAddress.phone,
        address: editingAddress.address,
        city: editingAddress.city,
        country: editingAddress.country,
        isDefault: editingAddress.isDefault,
      });
    } else {
      setAddressForm({ name: "", phone: "", address: "", city: "", country: "Ghana", isDefault: false });
    }
  }, [editingAddress]);

  // Clear form messages when modal closes
  useEffect(() => {
    if (!isEditProfileOpen && !isChangePasswordOpen && !isAddAddressOpen && !editingAddress) {
      setFormError(null);
      setFormSuccess(null);
    }
  }, [isEditProfileOpen, isChangePasswordOpen, isAddAddressOpen, editingAddress]);

  // Handle profile update
  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const result = await updateUser({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      phone: profileForm.phone,
    });

    if (result.success) {
      setFormSuccess("Profile updated successfully!");
      refetch();
      setTimeout(() => setIsEditProfileOpen(false), 1500);
    } else {
      setFormError(result.error || "Failed to update profile");
    }
  };

  // Handle password change
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!authUser) {
      setFormError("You must be logged in to change your password");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormError("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);

      setFormSuccess("Password updated successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setIsChangePasswordOpen(false), 1500);
    } catch (err: any) {
      if (err.code === "auth/wrong-password") {
        setFormError("Current password is incorrect");
      } else {
        setFormError(err.message || "Failed to update password");
      }
    }
  };

  // Handle address submit (create or update)
  const handleAddressSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (editingAddress) {
      const result = await updateAddress(editingAddress.id, addressForm);
      if (result.success) {
        setFormSuccess("Address updated successfully!");
        refetch();
        setTimeout(() => { setIsAddAddressOpen(false); setEditingAddress(null); }, 1500);
      } else {
        setFormError(result.error || "Failed to update address");
      }
    } else {
      const result = await createAddress(addressForm);
      if (result.success) {
        setFormSuccess("Address added successfully!");
        refetch();
        setTimeout(() => { setIsAddAddressOpen(false); setEditingAddress(null); }, 1500);
      } else {
        setFormError(result.error || "Failed to add address");
      }
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".account-section", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  const { addItem } = useCart();
  const { products } = useProducts();

  const findCatalogProductForOrderItem = (item: any) => {
    return products.find((product) => product.id === item.productId || product.name === item.name) || null;
  };

  const getOrderItemLineTotal = (item: any) => {
    const storedLineTotal = parseMoney(item.lineTotal);
    if (storedLineTotal > 0) return storedLineTotal;
    return resolveOrderItemLineTotal(item, findCatalogProductForOrderItem(item));
  };

  const handleReorder = (order: Order) => {
    console.log("Reordering:", order.orderNumber);
    
    // Add all items from the order to cart
    let addedCount = 0;
    getOrderItems(order).forEach((item) => {
      // Find the actual product in the catalog to get the current price (CRITICAL FOR SECURITY)
      const currentProduct = products.find(p => p.id === item.productId || p.name === item.name);
      
        if (currentProduct && parseMoney(currentProduct.price) > 0) {
        // Use the actual current price from the catalog
        addItem(currentProduct, item.quantity || 1);
        addedCount++;
      } else {
        // Fallback for discontinued products (we don't allow reordering if we can't verify the price)
        console.warn(`Product not found in catalog: ${item.name}. Cannot reorder for security reasons.`);
      }
    });
    
    if (addedCount > 0) {
      alert(`${addedCount} items added to cart! Redirecting to checkout...`);
      router.push("/cart");
    } else {
      alert("None of the items in this order are currently available in our catalog.");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    console.log("Cancelling order:", orderId);
    
    try {
      const { user } = useAuth();
      if (!user) {
        alert("You must be logged in to cancel an order");
        return;
      }

      const idToken = await user.getIdToken();
      
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        alert("Order cancelled successfully!");
        // Refresh orders list
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Cancel order error:", error);
      alert("An error occurred while cancelling the order");
    }
  };

  const handleDownloadInvoice = (order: Order) => {
    console.log("Opening invoice for:", order.orderNumber);
    setSelectedOrder(order);
    // In a real app, this would trigger a PDF download or open a printable window
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    const result = await updateAddress(addressId, { isDefault: true });
    if (result.success) {
      refetch();
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    const result = await deleteAddress(addressId);
    if (result.success) {
      refetch();
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
          <p className="text-sm text-black/50">Loading your account...</p>
        </div>
      </main>
    );
  }

  // Use user data from API or fallback to auth user data
  const displayUser: UserProfile = user ? {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
    memberSince: user.memberSince,
  } : authUser ? {
    firstName: authUser.displayName?.split(" ")[0] || "",
    lastName: authUser.displayName?.split(" ").slice(1).join(" ") || "",
    email: authUser.email || "",
    phone: "",
    memberSince: new Date().getFullYear().toString(),
  } : {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    memberSince: "",
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-white font-sans text-neutral-900">
      {/* Header */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-8 px-4 sm:px-6 md:px-12 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <motion.div
                className="inline-flex items-center gap-2 mb-2 md:mb-3 px-3 py-1.5 bg-neutral-100 rounded-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Crown size={14} className="text-black" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-900">
                  Premium
                </span>
              </motion.div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">
                My Account
              </h1>
              <p className="text-xs md:text-sm text-neutral-500 mt-1">
                Member since {displayUser.memberSince}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-black transition-colors p-2 -mr-2 uppercase tracking-widest"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex gap-4 sm:gap-12 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: "overview", label: "Overview", icon: User },
              { id: "orders", label: "Orders", icon: Package },
              { id: "addresses", label: "Addresses", icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`relative py-4 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id ? "text-black" : "text-neutral-300 hover:text-black/60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <tab.icon size={14} className="sm:w-4 sm:h-4" />
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-black rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 md:gap-8"
            >
              {/* Profile Card */}
              <div className="account-section order-1">
                <div className="bg-gradient-to-br from-black to-neutral-800 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                  <ShimmerEffect />
                  <div className="relative z-10">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black border-2 border-white flex items-center justify-center mb-4 md:mb-6 shadow-2xl">
                      <span className="text-3xl font-black">
                        {getInitials(displayUser.firstName, displayUser.lastName)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{displayUser.firstName} {displayUser.lastName}</h2>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">{displayUser.email}</p>
                    
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <button
                        onClick={() => setIsEditProfileOpen(true)}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 md:gap-2"
                      >
                        <Edit3 size={14} className="md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Edit</span>
                        <span className="sm:hidden">Edit</span>
                      </button>
                      <button
                        onClick={() => setIsChangePasswordOpen(true)}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 md:gap-2"
                      >
                        <Shield size={14} className="md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Password</span>
                        <span className="sm:hidden">Password</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 md:space-y-6 order-2">
                <div className="account-section grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
                  {[
                    { label: "Total Orders", value: orders.length, icon: Package },
                    { label: "Active Orders", value: orders.filter(o => o.status !== "order-delivered" && o.status !== "cancelled").length, icon: Clock },
                    { label: "Addresses", value: addresses.length, icon: MapPin },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`bg-neutral-50 rounded-2xl p-4 md:p-8 border border-neutral-100 text-left hover:border-black/10 transition-all ${idx === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-8 h-8 rounded-lg bg-white border border-neutral-100 flex items-center justify-center">
                          <stat.icon size={16} className="text-black" />
                        </div>
                      </div>
                      <p className="text-2xl md:text-4xl font-black text-black leading-none">{stat.value}</p>
                      <p className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase mt-2">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Orders Preview */}
                <div className="account-section bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/5">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg font-bold tracking-tight">Recent Orders</h3>
                    {orders.length > 0 && (
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="text-[10px] font-black text-black hover:text-neutral-500 flex items-center gap-1 transition-colors uppercase tracking-widest"
                      >
                        View All <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {orders.length === 0 ? (
                      <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                        <ShoppingBag size={32} className="text-neutral-200 mx-auto mb-4" />
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">No orders yet</p>
                        <button
                          onClick={() => router.push("/shop")}
                          className="mt-4 text-xs font-black text-black hover:bg-black hover:text-white px-4 py-2 border border-black rounded-lg transition-all uppercase tracking-widest"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      orders.slice(0, 3).map((order, idx) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-neutral-50 rounded-xl gap-2 sm:gap-0 border border-transparent hover:border-neutral-200 transition-colors"
                      >
                        <div>
                          <p className="text-xs md:text-sm font-black text-black">{order.orderNumber}</p>
                          <p className="text-[10px] md:text-xs text-neutral-500 font-medium">{order.date}</p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                          <span className="text-sm font-black text-black">{order.total}</span>
                          <StatusBadge status={order.status} />
                        </div>
                      </motion.div>
                    )))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-black tracking-tight">Order History</h2>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
                  {["all", "processing", "delivery-in-progress", "delivery-on-route", "order-delivered", "cancelled"].map((filter) => (
                    <button
                      key={filter}
                      className="px-3 md:px-4 py-2 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors whitespace-nowrap"
                    >
                      {filter === "all" ? "All" : getOrderStatusLabel(filter)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {orders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="account-section bg-neutral-50 rounded-xl md:rounded-2xl p-8 md:p-12 text-center border border-black/5"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                      <ShoppingBag size={28} className="text-neutral-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">No Orders Yet</h3>
                    <p className="text-sm text-black/50 mb-6 max-w-sm mx-auto">
                      You haven&apos;t placed any orders yet. Start shopping to see your order history here.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      Start Shopping
                      <ChevronRight size={16} />
                    </Link>
                  </motion.div>
                ) : (
                  orders.map((order, idx) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="account-section bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/5 hover:border-black/10 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-50 flex items-center justify-center flex-shrink-0 border border-neutral-100">
                          <Package size={18} className="text-black md:w-5 md:h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-base md:text-lg font-black text-black truncate tracking-tight">{order.orderNumber}</p>
                          <p className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-widest">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4">
                        <StatusBadge status={order.status} />
                        <span className="text-lg md:text-xl font-black text-black">{formatGhs(order.total)}</span>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                      {getOrderItems(order).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-3 bg-neutral-50 rounded-xl p-2 md:p-2.5 min-w-fit border border-neutral-100">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white relative overflow-hidden flex-shrink-0 border border-neutral-100">
                            <Image
                              src={getOrderItemImage(item)}
                              alt={item.name || "Order item"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="pr-2">
                            <p className="text-xs font-black text-black whitespace-nowrap">{item.name}</p>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-2 md:gap-3 pt-3 md:pt-4 border-t border-neutral-100">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 md:px-6 py-2.5 bg-black text-white rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors flex items-center gap-2"
                      >
                        <FileText size={14} />
                        Details
                      </button>
                      {(order.status === "delivery-in-progress" || order.status === "delivery-on-route") && (
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="px-4 md:px-6 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-amber-100 transition-colors flex items-center gap-2 border border-amber-100"
                        >
                          <Truck size={14} />
                          Track
                        </button>
                      )}
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 md:px-6 py-2.5 bg-neutral-100 text-black rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors flex items-center gap-2"
                      >
                        <RefreshCw size={14} />
                        Reorder
                      </button>
                      {order.status === "processing" && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-4 md:px-6 py-2.5 bg-red-50 text-red-600 rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-100"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDownloadInvoice(order)}
                        className="p-2.5 bg-neutral-50 text-neutral-400 hover:text-black rounded-xl transition-colors ml-auto border border-neutral-100"
                        title="Download Invoice"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </motion.div>
                )))}
              </div>
            </motion.div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === "addresses" && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-black">Saved Addresses</h2>
                <button
                  onClick={() => setIsAddAddressOpen(true)}
                  className="px-4 md:px-6 py-2.5 md:py-3 bg-black text-white rounded-xl text-xs md:text-sm font-bold tracking-wider uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} className="md:w-[18px] md:h-[18px]" />
                  Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {addresses.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="account-section col-span-full bg-neutral-50 rounded-xl md:rounded-2xl p-8 md:p-12 text-center border border-black/5"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                      <Home size={28} className="text-neutral-400" />
                    </div>
                    <h3 className="text-sm font-black text-black uppercase tracking-tight mb-2">No Saved Addresses</h3>
                    <p className="text-xs text-neutral-400 font-medium mb-8 max-w-[200px] mx-auto uppercase tracking-widest leading-loose">
                      Save your shipping details for a faster checkout experience.
                    </p>
                    <button
                      onClick={() => setIsAddAddressOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      <Plus size={16} />
                      Add Address
                    </button>
                  </motion.div>
                ) : (
                  addresses.map((address, idx) => (
                  <motion.div
                    key={address.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`account-section relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 transition-all ${
                      address.isDefault ? "border-black" : "border-black/5 hover:border-black/10"
                    }`}
                  >
                    {address.isDefault && (
                      <div className="absolute -top-2 md:-top-3 left-4 md:left-6 px-2 md:px-3 py-0.5 md:py-1 bg-black rounded-full text-[9px] md:text-[10px] font-bold text-white tracking-wider uppercase flex items-center gap-1">
                        <Star size={8} className="md:w-[10px] md:h-[10px]" fill="white" />
                        Default
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          address.isDefault ? "bg-neutral-200 text-black" : "bg-neutral-100 text-black/40"
                        }`}>
                          <Home size={16} className="md:w-[18px] md:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-black text-sm md:text-base text-black truncate">{address.name}</h3>
                          <p className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-widest">{address.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 md:gap-2 flex-shrink-0 ml-2">
                        <button
                          onClick={() => setEditingAddress(address)}
                          className="p-1.5 md:p-2 text-black/40 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <Edit3 size={14} className="md:w-4 md:h-4" />
                        </button>
                        {!address.isDefault && (
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="p-1.5 md:p-2 text-black/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} className="md:w-4 md:h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-0.5 md:space-y-1 text-xs md:text-sm">
                      <p className="text-neutral-600 font-medium">{address.address}</p>
                      <p className="text-neutral-600 font-medium">{address.city}, {address.country}</p>
                    </div>

                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="mt-3 md:mt-4 w-full py-2.5 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black hover:bg-neutral-100 rounded-xl border border-neutral-200 transition-colors"
                      >
                        Set as Default
                      </button>
                    )}
                  </motion.div>
                )))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <Modal onClose={() => setIsEditProfileOpen(false)} title="Edit Profile">
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{formError}</div>
              )}
              {formSuccess && (
                <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">{formSuccess}</div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="First Name" 
                  value={profileForm.firstName} 
                  onChange={(v) => setProfileForm({ ...profileForm, firstName: v })} 
                />
                <Input 
                  label="Last Name" 
                  value={profileForm.lastName} 
                  onChange={(v) => setProfileForm({ ...profileForm, lastName: v })} 
                />
              </div>
              <Input 
                label="Email" 
                type="email" 
                value={profileForm.email} 
                onChange={() => {}}
                disabled
              />
              <Input 
                label="Phone" 
                value={profileForm.phone} 
                onChange={(v) => setProfileForm({ ...profileForm, phone: v })} 
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 py-3 border border-black/20 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingUser}
                  className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {updatingUser ? <Loader2 size={16} className="animate-spin" /> : null}
                  Save Changes
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {isChangePasswordOpen && (
          <Modal onClose={() => setIsChangePasswordOpen(false)} title="Change Password">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{formError}</div>
              )}
              {formSuccess && (
                <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">{formSuccess}</div>
              )}
              <Input 
                label="Current Password" 
                type="password" 
                value={passwordForm.currentPassword}
                onChange={(v) => setPasswordForm({ ...passwordForm, currentPassword: v })}
              />
              <Input 
                label="New Password" 
                type="password" 
                value={passwordForm.newPassword}
                onChange={(v) => setPasswordForm({ ...passwordForm, newPassword: v })}
              />
              <Input 
                label="Confirm New Password" 
                type="password" 
                value={passwordForm.confirmPassword}
                onChange={(v) => setPasswordForm({ ...passwordForm, confirmPassword: v })}
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="flex-1 py-3 border border-black/20 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <Modal onClose={() => setSelectedOrder(null)} title={`Order ${selectedOrder.orderNumber}`}>
            <div id="receipt-content" className="space-y-6 print:p-0">
              {/* Receipt Header (Only visible when printing) */}
              <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-6">
                <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">PKAF LEV</h1>
                <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Official Purchase Receipt</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100 print:bg-white print:border-none print:px-0">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Order Date</p>
                  <p className="text-sm font-black text-black">{selectedOrder.date}</p>
                </div>
                <div className="print:hidden">
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <div className="hidden print:block text-right">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Status</p>
                  <p className="text-sm font-black text-black uppercase">{selectedOrder.status}</p>
                </div>
              </div>

              {/* Tracking Timeline (Hidden when printing) */}
              <div className="p-5 bg-neutral-900 rounded-2xl text-white relative overflow-hidden print:hidden">
                <ShimmerEffect />
                <div className="relative z-10">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                    <Truck size={14} className="text-amber-400" />
                    Tracking Status
                  </h4>
                  <div className="space-y-6">
                    {[
                      { step: "Order Placed", date: selectedOrder.date, completed: true },
                      { step: "Processing", date: "Verified & Prepared", completed: ["processing", "delivery-in-progress", "delivery-on-route", "order-delivered"].includes(selectedOrder.status) },
                      { step: "Delivery In Progress", date: "Preparing dispatch", completed: ["delivery-on-route", "order-delivered"].includes(selectedOrder.status) },
                      { step: "Delivery On Route", date: selectedOrder.trackingNumber || "Pending Dispatch", completed: selectedOrder.status === "order-delivered" },
                      { step: "Order Delivered", date: "Arrival at destination", completed: selectedOrder.status === "order-delivered" },
                    ].map((t, i) => (
                      <div key={i} className="flex gap-4 relative">
                        {i < 4 && (
                          <div className={`absolute left-[7px] top-[18px] w-[2px] h-[24px] ${t.completed ? 'bg-amber-400' : 'bg-white/10'}`} />
                        )}
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                          t.completed ? 'bg-amber-400 border-amber-400' : 'border-white/20'
                        }`}>
                          {t.completed && <CheckCircle size={10} className="text-black" />}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${t.completed ? 'text-white' : 'text-white/40'}`}>{t.step}</p>
                          <p className="text-[10px] text-white/40 mt-0.5">{t.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4 print:text-black">Items Ordered</h4>
                <div className="space-y-3">
                  {getOrderItems(selectedOrder).map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100 group hover:border-black/10 transition-colors print:bg-white print:border-b print:border-neutral-100 print:rounded-none print:px-0">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-white relative overflow-hidden border border-neutral-100 print:border-neutral-200">
                          <Image
                            src={getOrderItemImage(item)}
                            alt={item.name || "Order item"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-black text-black">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-neutral-100 rounded-md uppercase tracking-wider print:border-neutral-200">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider print:text-neutral-500">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-black text-black">{formatGhs(getOrderItemLineTotal(item))}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-6 space-y-2 print:border-black print:border-t-2">
                <div className="flex justify-between text-xs font-bold text-neutral-400 uppercase tracking-widest print:text-neutral-500">
                  <span>Subtotal</span>
                  <span>{formatGhs(selectedOrder.subtotal || selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-neutral-400 uppercase tracking-widest print:text-neutral-500">
                  <span>Shipping</span>
                  <span className="text-green-600 print:text-black">Complimentary</span>
                </div>
                <div className="flex justify-between text-xl font-black text-black pt-2 print:text-2xl">
                  <span>Total</span>
                  <span>{formatGhs(selectedOrder.total)}</span>
                </div>
              </div>
              
              <div className="pt-4 flex gap-3 print:hidden">
                <button 
                  onClick={() => handleReorder(selectedOrder)}
                  className="flex-1 py-4 bg-black text-white rounded-2xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors"
                >
                  Buy Again
                </button>
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-4 bg-neutral-100 text-black rounded-2xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors"
                >
                  <Download size={16} />
                </button>
              </div>

              {/* Receipt Footer (Only visible when printing) */}
              <div className="hidden print:block text-center mt-12 border-t border-neutral-100 pt-8">
                <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-2">Thank you for your purchase</p>
                <p className="text-[9px] text-neutral-300 uppercase tracking-[0.3em]">PKAF LEV © 2026</p>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Add/Edit Address Modal */}
      <AnimatePresence>
        {(isAddAddressOpen || editingAddress) && (
          <Modal 
            onClose={() => { setIsAddAddressOpen(false); setEditingAddress(null); }} 
            title={editingAddress ? "Edit Address" : "Add New Address"}
          >
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{formError}</div>
              )}
              {formSuccess && (
                <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">{formSuccess}</div>
              )}
              <Input 
                label="Address Name" 
                value={addressForm.name} 
                onChange={(v) => setAddressForm({ ...addressForm, name: v })}
                placeholder="Home, Office, etc." 
              />
              <Input 
                label="Phone Number" 
                value={addressForm.phone} 
                onChange={(v) => setAddressForm({ ...addressForm, phone: v })}
              />
              <Input 
                label="Street Address" 
                value={addressForm.address} 
                onChange={(v) => setAddressForm({ ...addressForm, address: v })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="City" 
                  value={addressForm.city} 
                  onChange={(v) => setAddressForm({ ...addressForm, city: v })}
                />
                <Input 
                  label="Country" 
                  value={addressForm.country} 
                  onChange={(v) => setAddressForm({ ...addressForm, country: v })}
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={addressForm.isDefault}
                    onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                    className="peer sr-only" 
                  />
                  <div className="w-5 h-5 border-2 border-neutral-200 rounded-md peer-checked:bg-black peer-checked:border-black transition-all flex items-center justify-center">
                    <CheckCircle size={12} className="text-white scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">Set as default address</span>
              </label>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setIsAddAddressOpen(false); setEditingAddress(null); }}
                  className="flex-1 py-3 border border-black/20 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addressLoading}
                  className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {addressLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {editingAddress ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </main>
  );
}

// Helper Components
function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarCompensation = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    if (scrollBarCompensation > 0) {
      document.body.style.paddingRight = `${scrollBarCompensation}px`;
    }
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[85dvh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X size={20} className="sm:w-5 sm:h-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

function Input({ 
  label, 
  type = "text", 
  defaultValue, 
  value, 
  onChange, 
  placeholder, 
  disabled 
}: { 
  label: string; 
  type?: string; 
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm text-black font-bold focus:outline-none focus:border-black focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-neutral-300"
      />
    </div>
  );
}


