"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    TrendingUp, 
    TrendingDown, 
    ShoppingBag, 
    Eye,
    Users,
    Target,
    ArrowUpRight,
    Calendar,
    Download,
    LucideIcon,
    Package,
    Clock,
    CheckCircle2,
    Loader2
} from "lucide-react";
// TODO: replace with real API call — see GET /admin/analytics once backend is ready
const mockOrders: any[] = [];
import { format, subDays, startOfDay, endOfDay, parseISO } from "date-fns";
import { parseMoney, resolveOrderItemLineTotal } from "@/lib/price";

const DEFAULT_ACTIVITY = [
    { action: 'Purchase', item: 'New order #1542 placed', timestamp: '10:12 AM', quantity: 1 },
    { action: 'Purchase', item: 'Order #1517 completed', timestamp: '09:48 AM', quantity: 1 },
    { action: 'Product', item: 'Black Leather Jacket restocked', timestamp: '09:10 AM', quantity: 0 },
    { action: 'Purchase', item: 'New order #1541 placed', timestamp: '08:55 AM', quantity: 1 },
    { action: 'Product', item: 'Cargo Pants inventory updated', timestamp: '08:20 AM', quantity: 0 },
];



// Stat Card Component
function StatCard({ 
    title, 
    value, 
    change, 
    changeType,
    icon: Icon,
    delay = 0
}: { 
    title: string; 
    value: string; 
    change: number; 
    changeType: 'positive' | 'negative' | 'neutral';
    icon: LucideIcon;
    delay?: number;
}) {
    const isPositive = changeType === 'positive';
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5">
                    <Icon className="w-5 h-5 text-white/80" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                    isPositive ? 'text-green-400' : changeType === 'negative' ? 'text-red-400' : 'text-white/50'
                }`}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : changeType === 'negative' ? <TrendingDown className="w-3 h-3" /> : null}
                    {Math.abs(change)}%
                </div>
            </div>
            <p className="text-white/50 text-sm">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
        </motion.div>
    );
}

// Bar Chart Component
function BarChart({ data }: { data: { day: string; sales: number }[] }) {
    const max = Math.max(...data.map(d => d.sales));
    
    return (
        <div className="h-48 flex items-end justify-between gap-2">
            {data.map((item, index) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.sales / max) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="w-full bg-white/20 rounded-t-lg hover:bg-white/30 transition-colors relative group"
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            GH₵{item.sales.toLocaleString()}
                        </div>
                    </motion.div>
                    <span className="text-xs text-white/40">{item.day}</span>
                </div>
            ))}
        </div>
    );
}

// Progress Bar Component
function ProgressBar({ value, color = 'white' }: { value: number; color?: string }) {
    return (
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setOrders(mockOrders.map(order => ({
            ...order,
            timestamp: order.createdAt || new Date().toISOString(),
        })));
        setIsLoading(false);
    }, []);

    const stats = {
        totalVisitors: orders.length * 12,
        productViews: orders.reduce((acc: Record<string, { views: number }>, order: any) => {
            order.items?.forEach((item: any) => {
                const name = item.name || 'Unknown Product';
                acc[name] = { views: (acc[name]?.views || 0) + ((item.quantity || 1) * 8) };
            });
            return acc;
        }, {}),
        trafficSources: {
            Instagram: 1400,
            Direct: 950,
            Google: 1100,
        },
    };

    const DEFAULT_ACTIVITY_ENTRIES = DEFAULT_ACTIVITY.map((activity) => ({
        ...activity,
        time: activity.timestamp,
        count: activity.quantity || 1,
    }));

    // Helper to filter orders by time range
    const filterOrdersByTime = (range: string) => {
        const now = new Date();
        const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        return orders.filter(o => new Date(o.timestamp) >= cutoff);
    };

    const filteredOrders = filterOrdersByTime(timeRange);
    const paidOrders = filteredOrders.filter(o => o.paymentStatus === 'paid');

    // Calculate metrics
    const totalRevenue = paidOrders.reduce((sum, o) => sum + parseMoney(o.total), 0);
    const totalOrdersCount = filteredOrders.length;
    
    // Top Products
    const productStats: Record<string, { name: string; sales: number; revenue: number }> = {};
    paidOrders.forEach(order => {
        if (order.items && Array.isArray(order.items)) {
            order.items.forEach((item: any) => {
                if (!productStats[item.productId || item.name]) {
                    productStats[item.productId || item.name] = { name: item.name, sales: 0, revenue: 0 };
                }
                productStats[item.productId || item.name].sales += (item.quantity || 1);
                productStats[item.productId || item.name].revenue += resolveOrderItemLineTotal(item);
            });
        }
    });

    const topProducts = Object.values(productStats)
        .map(p => ({
            ...p,
            views: stats.productViews?.[p.name]?.views || 0
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);


    // Sales by Day (last 7 days of filtered data)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const salesByDayMap: Record<string, number> = {};
    
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        salesByDayMap[days[d.getDay()]] = 0;
    }

    paidOrders.forEach(o => {
        const d = new Date(o.timestamp);
        const dayName = days[d.getDay()];
        if (salesByDayMap[dayName] !== undefined) {
            salesByDayMap[dayName] += (o.total || 0);
        }
    });

    const salesByDay = Object.entries(salesByDayMap).map(([day, sales]) => ({ day, sales }));

    const formattedRecentActivity = DEFAULT_ACTIVITY_ENTRIES;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-white/20" />
            </div>
        );
    }

    const totalVisitors = stats.totalVisitors || (totalOrdersCount * 8); // Fallback to estimate if stats is empty
    const conversionRate = totalVisitors > 0 ? ((paidOrders.length / totalVisitors) * 100) : 0;

    const data = {
        overview: {
            totalRevenue,
            totalOrders: totalOrdersCount,
            totalVisitors,
            conversionRate: parseFloat(conversionRate.toFixed(1)),
            revenueChange: 15.2, // Still mock trends but value is real
            ordersChange: 10.5,
            visitorsChange: 5.2,
            conversionChange: 1.2
        },
        topProducts,
        salesByDay,
        trafficSources: [
            { source: 'Instagram', visitors: stats.trafficSources?.Instagram || 0, percentage: totalVisitors > 0 ? Math.round(((stats.trafficSources?.Instagram || 0) / totalVisitors) * 100) : 0 },
            { source: 'Direct', visitors: stats.trafficSources?.Direct || 0, percentage: totalVisitors > 0 ? Math.round(((stats.trafficSources?.Direct || 0) / totalVisitors) * 100) : 0 },
            { source: 'Google', visitors: stats.trafficSources?.Google || 0, percentage: totalVisitors > 0 ? Math.round(((stats.trafficSources?.Google || 0) / totalVisitors) * 100) : 0 },
            { source: 'Other', visitors: (totalVisitors - (stats.trafficSources?.Instagram || 0) - (stats.trafficSources?.Direct || 0) - (stats.trafficSources?.Google || 0)) || 0, percentage: totalVisitors > 0 ? Math.round(((totalVisitors - (stats.trafficSources?.Instagram || 0) - (stats.trafficSources?.Direct || 0) - (stats.trafficSources?.Google || 0)) / totalVisitors) * 100) : 0 },
        ],

        recentActivity: formattedRecentActivity
    };


    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                    <p className="text-white/50 text-sm mt-1">Track your store performance and metrics</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
                        {(['7d', '30d', '90d'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    timeRange === range ? 'bg-white text-black' : 'text-white/60'
                                }`}
                            >
                                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Export</span>
                    </button>
                </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Revenue"
                    value={`GH₵${(data.overview.totalRevenue / 1000).toFixed(1)}K`}
                    change={data.overview.revenueChange}
                    changeType="positive"
                    icon={TrendingUp}
                    delay={0}
                />
                <StatCard
                    title="Total Orders"
                    value={data.overview.totalOrders.toString()}
                    change={data.overview.ordersChange}
                    changeType="positive"
                    icon={ShoppingBag}
                    delay={0.1}
                />
                <StatCard
                    title="Visitors"
                    value={data.overview.totalVisitors.toLocaleString()}
                    change={data.overview.visitorsChange}
                    changeType="positive"
                    icon={Users}
                    delay={0.2}
                />
                <StatCard
                    title="Conversion Rate"
                    value={`${data.overview.conversionRate}%`}
                    change={Math.abs(data.overview.conversionChange)}
                    changeType={data.overview.conversionChange > 0 ? 'positive' : 'negative'}
                    icon={Target}
                    delay={0.3}
                />
            </div>
            
            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold">Sales Overview</h3>
                            <p className="text-sm text-white/50">Daily sales performance</p>
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                            <ArrowUpRight className="w-4 h-4" />
                            <span className="text-sm font-medium">+12.5%</span>
                        </div>
                    </div>
                    <BarChart data={data.salesByDay} />
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <span className="text-sm text-white/50">Total Sales</span>
                        <span className="font-bold">GH₵{data.salesByDay.reduce((a, b) => a + b.sales, 0).toLocaleString()}</span>
                    </div>
                </motion.div>
                
                {/* Traffic Sources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
                >
                    <h3 className="text-lg font-semibold mb-1">Traffic Sources</h3>
                    <p className="text-sm text-white/50 mb-6">Where your visitors come from</p>
                    
                    <div className="space-y-4">
                        {data.trafficSources.map((source, index) => (
                            <div key={source.source}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">{source.source}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-white/50">{source.visitors.toLocaleString()}</span>
                                        <span className="text-xs text-white/30">({source.percentage}%)</span>
                                    </div>
                                </div>
                                <ProgressBar value={source.percentage} />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            
            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
                >
                    <h3 className="text-lg font-semibold mb-1">Top Products</h3>
                    <p className="text-sm text-white/50 mb-4">Best performing products by sales</p>
                    
                    <div className="space-y-3">
                        {data.topProducts.map((product, index) => (
                            <div key={product.name} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{product.name}</p>
                                    <div className="flex items-center gap-3 text-xs text-white/50">
                                        <span>{product.sales} sales</span>
                                        <span>•</span>
                                        <span>{product.views} views</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">GH₵{product.revenue.toLocaleString()}</p>
                                    <p className="text-xs text-white/50">revenue</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
                >
                    <h3 className="text-lg font-semibold mb-1">Live Activity</h3>
                    <p className="text-sm text-white/50 mb-4">Real-time store activity</p>
                    
                    <div className="space-y-3">
                        {data.recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="flex items-center gap-4 p-3 rounded-xl bg-white/5"
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    activity.action === 'Purchase' ? 'bg-green-500/10' :
                                    activity.action === 'Add to Cart' ? 'bg-blue-500/10' :
                                    'bg-white/10'
                                }`}>
                                    {activity.action === 'Purchase' ? <TrendingUp className="w-5 h-5 text-green-400" /> :
                                     activity.action === 'Add to Cart' ? <ShoppingBag className="w-5 h-5 text-blue-400" /> :
                                     <Eye className="w-5 h-5 text-white/60" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{activity.action}</p>
                                    <p className="text-xs text-white/50 truncate">{activity.item}</p>
                                </div>
                                <span className="text-xs text-white/30">{activity.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
