"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
    LayoutDashboard, 
    Package, 
    ShoppingBag, 
    Users,
    Image as ImageIcon, 
    FileText, 
    BarChart3, 
    Settings, 
    LogOut,
    Menu,
    X,
    Store,
    ChevronRight,
    Sparkles,
    Wallet,
    Trophy,
    ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

function AdminLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { user, loading, logout, isAuthenticated } = useAuth();

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Affiliates", href: "/admin/affiliates", icon: Users },
        { name: "Leaderboard", href: "/admin/leaderboard", icon: Trophy },
        { name: "Payouts", href: "/admin/payouts", icon: Wallet },
        { name: "Content", href: "/admin/content", icon: Sparkles },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { name: "KYC Review", href: "/admin/kyc-review", icon: ShieldAlert },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const isLoginPage = pathname === "/admin/login" || pathname.startsWith("/admin/login?");

    // Protect admin routes
    useEffect(() => {
        if (!loading && (!isAuthenticated || user?.role !== "admin") && !isLoginPage) {
            router.push("/admin/login");
        }
    }, [loading, isAuthenticated, isLoginPage, router, user]);

    // Show loading while checking auth
    if (loading && !isLoginPage) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated or not admin
    if ((!isAuthenticated || user?.role !== "admin") && !isLoginPage) {
        return null;
    }

    if (isLoginPage) {
        return <div className="dark bg-black min-h-screen">{children}</div>;
    }

    return (
        <div className="flex min-h-screen w-full bg-[#0a0a0a] text-white font-sans">
            {/* Desktop Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-40 hidden lg:flex flex-col border-r border-white/10 bg-[#0a0a0a] transition-all duration-300 ${
                    isSidebarCollapsed ? "w-20" : "w-64"
                }`}
            >
                {/* Logo Area */}
                <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Store className="w-5 h-5 text-black" />
                        </div>
                        {!isSidebarCollapsed && (
                            <span className="font-bold text-lg tracking-tight">PKAF STORE</span>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex flex-col flex-1 gap-1 px-3 py-6 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-white text-black shadow-lg shadow-white/10"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                {!isSidebarCollapsed && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <Menu className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? "rotate-180" : ""}`} />
                        {!isSidebarCollapsed && <span>Collapse</span>}
                    </button>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        {!isSidebarCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-white/10 lg:hidden"
                        >
                            {/* Mobile Header */}
                            <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
                                <Link href="/admin" className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                        <Store className="w-5 h-5 text-black" />
                                    </div>
                                    <span className="font-bold text-lg">PKAF STORE</span>
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-white/60 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="p-4 space-y-1">
                                {navItems.map((item, index) => {
                                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 rounded-xl px-4 py-4 text-base font-medium transition-all ${
                                                    isActive
                                                        ? "bg-white text-black"
                                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                {item.name}
                                                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Mobile Footer */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors w-full"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className={`flex w-full flex-col transition-all duration-300 ${
                isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
            }`}>
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl px-4 lg:px-8">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors shrink-0"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg font-semibold truncate">
                            {navItems.find(item => pathname === item.href || pathname.startsWith(`${item.href}/`))?.name || "PKAF STORE Admin"}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-green-400 font-medium">Store Active</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="text-sm font-bold">A</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminLayoutContent>{children}</AdminLayoutContent>;
}
