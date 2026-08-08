"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
    Package, 
    ShoppingBag, 
    TrendingUp, 
    Users, 
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    PackageCheck,
    Loader2,
    LucideIcon,
    Wallet
} from "lucide-react";
import { useProducts } from "@/components/product-provider";
import Link from "next/link";
import { orders as mockOrders, users as mockUsers, mockPartnerProfile } from "@/lib/mock-data";
import { formatGhs, parseMoney } from "@/lib/price";

// Animated number counter
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
        const duration = 1500;
        const startTime = Date.now();
        const startValue = displayValue;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = startValue + (value - startValue) * eased;
            
            setDisplayValue(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }, [value]);
    
    return <span>{prefix}{Math.round(displayValue).toLocaleString()}{suffix}</span>;
}

// KPI Card Component
function KPICard({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendUp, 
    delay = 0 
}: { 
    title: string; 
    value: string | number; 
    icon: LucideIcon; 
    trend: string; 
    trendUp: boolean;
    delay?: number;
}) {
    const numericValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/[^0-9]/g, "")) || 0;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6 group hover:border-white/20 transition-colors"
        >
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
            
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5">
                        <Icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                        {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend}
                    </div>
                </div>
                
                <div>
                    <p className="text-white/50 text-sm mb-1">{title}</p>
                    <p className="text-3xl font-bold tracking-tight">
                        {typeof value === 'number' ? (
                            <AnimatedNumber value={numericValue} />
                        ) : (
                            value
                        )}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// Sales Chart - Kept mostly as is for visual flair, but could be connected to real data later
function SalesChart() {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '12m'>('7d');
    
    const chartData = {
        '7d': [3200, 4100, 3800, 5200, 6800, 5900, 4500],
        '30d': [4100, 3800, 5200, 6800, 5900, 4500, 3600, 4800, 5500, 6200, 5800, 7100, 4900, 4200],
        '12m': [18000, 22000, 19500, 28000, 32000, 28500, 24000, 26500, 31000, 29500, 34000, 38500]
    };
    
    const data = chartData[timeRange];
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 80 - 10;
        return `${x},${y}`;
    }).join(' ');
    
    const areaPoints = `0,100 ${points} 100,100`;
    
    const formatCurrency = (amount: number) => {
        if (amount >= 1000) {
            return `GH₵${(amount / 1000).toFixed(1)}K`;
        }
        return `GH₵${amount.toLocaleString()}`;
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Revenue Overview</h3>
                    <p className="text-white/50 text-sm">Sales performance over time</p>
                </div>
                <div className="flex gap-1 p-1 rounded-lg bg-white/5">
                    {(['7d', '30d', '12m'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                timeRange === range 
                                    ? 'bg-white text-black' 
                                    : 'text-white/60 hover:text-white'
                            }`}
                        >
                            {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '12 Months'}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="h-48 w-full">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>
                    <polygon points={areaPoints} fill="url(#areaGradient)" />
                    <polyline points={points} fill="none" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                    {data.map((_, i) => {
                        const x = (i / (data.length - 1)) * 100;
                        const y = 100 - ((data[i] - min) / range) * 80 - 10;
                        return <circle key={i} cx={x} cy={y} r="1" fill="white" />;
                    })}
                </svg>
            </div>
        </motion.div>
    );
}

// Activity Feed Component
function ActivityFeed({ orders, products }: { orders: any[], products: any[] }) {
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        const orderActivities = orders.slice(0, 3).map(o => ({
            id: `o-${o.id}`,
            type: 'order',
            message: `New order ${o.orderNumber} received`,
            time: new Date(o.createdAt).toLocaleTimeString(),
            icon: ShoppingBag
        }));
        const productActivities = products.slice(0, 2).map(p => ({
            id: `p-${p.id}`,
            type: 'product',
            message: `Product "${p.name}" added`,
            time: new Date(p.createdAt || Date.now()).toLocaleTimeString(),
            icon: Package
        }));
        
        setActivities([...orderActivities, ...productActivities].sort(() => Math.random() - 0.5));
    }, [orders, products]);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6"
        >
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3"
                    >
                        <div className={`p-2 rounded-lg ${
                            activity.type === 'order' ? 'bg-blue-500/10' :
                            activity.type === 'product' ? 'bg-green-500/10' :
                            'bg-white/5'
                        }`}>
                            <activity.icon className={`w-4 h-4 ${
                                activity.type === 'order' ? 'text-blue-400' :
                                activity.type === 'product' ? 'text-green-400' :
                                'text-white/60'
                            }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{activity.message}</p>
                            <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                {activity.time}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function PayoutsPanel() {
    const totalPaid = mockPartnerProfile.payoutHistory.reduce((sum, payout) => sum + payout.amount, 0);
    const pending = mockPartnerProfile.referralHistory.filter((sale) => sale.payoutStatus === "pending").reduce((sum, sale) => sum + sale.commissionAmount, 0);
    const activePartnerCount = mockPartnerProfile.stats.totalSignups;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6"
        >
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Payouts</h3>
                    <p className="text-sm text-white/50 mt-1">Referral partner commission activity</p>
                </div>
                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-300">
                    <Wallet className="w-5 h-5" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl bg-black/20 border border-white/10 p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Paid</p>
                    <p className="mt-2 text-xl font-bold text-white">{formatGhs(totalPaid)}</p>
                </div>
                <div className="rounded-xl bg-black/20 border border-white/10 p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Pending</p>
                    <p className="mt-2 text-xl font-bold text-white">{formatGhs(pending)}</p>
                </div>
            </div>

            <div className="space-y-3">
                {mockPartnerProfile.referralHistory.slice(0, 3).map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                        <div>
                            <p className="text-sm font-medium text-white">{sale.productName}</p>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                                {sale.payoutStatus === "pending" ? "Awaiting payout" : "Paid out"}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold text-emerald-300">{formatGhs(sale.commissionAmount)}</p>
                            <p className="text-[10px] text-white/45">{sale.customerName}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-sm">
                <span className="text-white/60">Active partners</span>
                <span className="font-semibold text-white">{activePartnerCount}</span>
            </div>
        </motion.div>
    );
}

// Main Dashboard Component
export default function AdminDashboard() {
    const { products, isLoading: productsLoading } = useProducts();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [customerCount, setCustomerCount] = useState(0);
    const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
    
    useEffect(() => {
        setOrders(mockOrders.map(order => ({ ...order })));
        setIsLoadingOrders(false);
    }, []);

    useEffect(() => {
        setCustomerCount(mockUsers.length);
        setIsLoadingCustomers(false);
    }, []);

    const totalRevenue = orders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + parseMoney(o.total), 0);
    const pendingOrders = orders.filter(o => o.status === 'processing').length;
    const completedOrders = orders.filter(o => o.status === 'order-delivered').length;
    const totalPaidPayouts = mockPartnerProfile.payoutHistory.reduce((sum, payout) => sum + payout.amount, 0);
    const pendingReferralPayouts = mockPartnerProfile.referralHistory
        .filter((sale) => sale.payoutStatus === "pending")
        .reduce((sum, sale) => sum + sale.commissionAmount, 0);
    
    const kpiData = [
        { title: "Total Revenue", value: formatGhs(totalRevenue), icon: TrendingUp, trend: "+12.5%", trendUp: true },
        { title: "Total Orders", value: orders.length, icon: ShoppingBag, trend: "+8.2%", trendUp: true },
        { title: "Pending Orders", value: pendingOrders, icon: Clock, trend: "-2.1%", trendUp: false },
        { title: "Completed", value: completedOrders, icon: CheckCircle2, trend: "+15.3%", trendUp: true },
        { title: "Products", value: products.length, icon: Package, trend: "+5 this week", trendUp: true },
        { title: "Payouts", value: formatGhs(totalPaidPayouts + pendingReferralPayouts), icon: Wallet, trend: "+4 partner payouts", trendUp: true },
        { title: "Customers", value: customerCount, icon: Users, trend: "Registered users", trendUp: true },
    ];
    
    if (productsLoading || isLoadingOrders || isLoadingCustomers) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-white/20" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                    <p className="text-white/50 text-sm mt-1">Welcome back! Here's what's happening with your store.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                    <span>Last updated:</span>
                    <span className="text-white">{new Date().toLocaleTimeString()}</span>
                </div>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpiData.map((kpi, index) => (
                    <KPICard
                        key={kpi.title}
                        title={kpi.title}
                        value={kpi.value}
                        icon={kpi.icon}
                        trend={kpi.trend}
                        trendUp={kpi.trendUp}
                        delay={index * 0.1}
                    />
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SalesChart />
                </div>
                <div className="space-y-6">
                    <PayoutsPanel />
                    <ActivityFeed orders={orders} products={products} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/admin/products/new" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                <Package className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Add Product</p>
                            </div>
                        </Link>
                        <Link href="/admin/orders" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                <ShoppingBag className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">View Orders</p>
                            </div>
                        </Link>
                        <Link href="/admin/content" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                <TrendingUp className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Content</p>
                            </div>
                        </Link>
                        <Link href="/admin/settings" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                                <AlertTriangle className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Settings</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
