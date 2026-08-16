"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, 
    Filter, 
    ShoppingBag, 
    ChevronDown, 
    ChevronRight,
    X,
    Package,
    Truck,
    CheckCircle2,
    Clock,
    ShieldAlert,
    Printer,
    ArrowUpDown,
    Calendar,
    User,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Loader2,
    Download
} from "lucide-react";
// TODO: replace with real API call — see GET /admin/orders once backend is ready
const mockOrders: any[] = [];
import { formatGhs, resolveOrderItemLineTotal } from "@/lib/price";
import { ORDER_STATUS_LABELS, ORDER_STATUS_VALUES, type OrderStatus } from "@/lib/order-status";

// Order status types
const ORDER_STATUSES = [
    { id: 'processing', label: ORDER_STATUS_LABELS.processing, color: 'amber', icon: Package },
    { id: 'delivery-in-progress', label: ORDER_STATUS_LABELS['delivery-in-progress'], color: 'blue', icon: Truck },
    { id: 'delivery-on-route', label: ORDER_STATUS_LABELS['delivery-on-route'], color: 'purple', icon: Truck },
    { id: 'order-delivered', label: ORDER_STATUS_LABELS['order-delivered'], color: 'green', icon: CheckCircle2 },
    { id: 'cancelled', label: ORDER_STATUS_LABELS.cancelled, color: 'red', icon: ShieldAlert },
] as const;

const escapeCsvValue = (value: unknown) => {
    const text = String(value ?? "");
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const downloadCsv = (filename: string, headers: string[], rows: unknown[][]) => {
    const csv = [headers, ...rows]
        .map((row) => row.map(escapeCsvValue).join(","))
        .join("\r\n");
    const blob = new Blob([`\uFEFF${csv}\r\n`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
    const statusConfig = ORDER_STATUSES.find(s => s.id === status) || ORDER_STATUSES[0];
    const Icon = statusConfig.icon;
    
    const colorClasses = {
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        green: 'bg-green-500/10 text-green-400 border-green-500/20',
        red: 'bg-red-500/10 text-red-400 border-red-500/20',
    }[statusConfig.color];
    
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${colorClasses}`}>
            <Icon className="w-3.5 h-3.5" />
            {statusConfig.label}
        </span>
    );
}

// Order Detail Modal
function OrderDetailModal({ order, onClose, onStatusChange }: { 
    order: any; 
    onClose: () => void;
    onStatusChange: (orderId: string, newStatus: string) => void;
}) {
    const [activeTab, setActiveTab] = useState<'items' | 'customer' | 'timeline'>('items');
    
    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    const deliveryStages = ORDER_STATUS_VALUES.slice(0, 4);
    const currentStageIndex = deliveryStages.indexOf(order.status as OrderStatus);
    const timeline = [
        { status: 'Order Placed', date: order.createdAt, completed: true },
        { status: 'Payment Confirmed', date: order.createdAt, completed: order.paymentStatus === 'paid' },
        ...deliveryStages.map((status, index) => ({
            status: ORDER_STATUS_LABELS[status],
            date: currentStageIndex >= index ? order.updatedAt : null,
            completed: currentStageIndex >= index,
        })),
    ];
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 100 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-xl font-bold">{order.orderNumber}</h2>
                        <p className="text-white/50 text-sm">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => window.print()}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Printer className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-6 py-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                        <StatusBadge status={order.status} />
                        <span className="text-white/50 hidden sm:inline">|</span>
                        <span className={`text-sm ${order.paymentStatus === 'paid' ? 'text-green-400' : 'text-amber-400'}`}>
                            {order.paymentStatus === 'paid' ? 'Payment Confirmed' : 'Payment Pending'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-auto">
                        <span className="text-sm text-white/50">Update Status:</span>
                        <select
                            value={order.status}
                            onChange={(e) => onStatusChange(order.id, e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-white/30 min-w-[120px]"
                        >
                            {ORDER_STATUSES.map(status => (
                                <option key={status.id} value={status.id}>{status.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    {[
                        { id: 'items', label: 'Items', count: order.items?.length || 0 },
                        { id: 'customer', label: 'Customer' },
                        { id: 'timeline', label: 'Timeline' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                                activeTab === tab.id ? 'text-white' : 'text-white/50 hover:text-white/70'
                            }`}
                        >
                            {tab.label}
                            {tab.count !== undefined && <span className="ml-2 text-xs text-white/30">({tab.count})</span>}
                            {activeTab === tab.id && (
                                <motion.div 
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" 
                                />
                            )}
                        </button>
                    ))}
                </div>
                
                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[50vh]">
                    {activeTab === 'items' && (
                        <div className="space-y-4">
                            {order.items?.map((item: any, index: number) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                                    <div className="w-16 h-16 rounded-lg bg-white/10 overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-white/50">Qty: {item.quantity} • Size: {item.size}</p>
                                    </div>
                                    <p className="font-semibold">{formatGhs(resolveOrderItemLineTotal(item))}</p>
                                </div>
                            ))}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <span className="text-white/50">Total</span>
                                <span className="text-2xl font-bold">{formatGhs(order.total)}</span>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'customer' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <User className="w-6 h-6 text-white/60" />
                                </div>
                                <div>
                                    <p className="font-semibold">{order.shippingAddress?.name}</p>
                                    <p className="text-sm text-white/50">Customer ID: {order.userId}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                    <Mail className="w-5 h-5 text-white/40" />
                                    <div>
                                        <p className="text-sm text-white/50">Email</p>
                                        <p>{order.shippingAddress?.email || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                    <Phone className="w-5 h-5 text-white/40" />
                                    <div>
                                        <p className="text-sm text-white/50">Phone</p>
                                        <p>{order.shippingAddress?.phone || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                    <MapPin className="w-5 h-5 text-white/40" />
                                    <div>
                                        <p className="text-sm text-white/50">Shipping Address</p>
                                        <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                    <CreditCard className="w-5 h-5 text-white/40" />
                                    <div>
                                        <p className="text-sm text-white/50">Payment Method / Ref</p>
                                        <p>{order.paymentMethod} - {order.paymentReference || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'timeline' && (
                        <div className="space-y-0">
                            {timeline.map((step, index) => (
                                <div key={step.status} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-green-500' : 'bg-white/20'}`} />
                                        {index < timeline.length - 1 && (
                                            <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500/30' : 'bg-white/10'}`} />
                                        )}
                                    </div>
                                    <div className="pb-8">
                                        <p className={`font-medium ${step.completed ? 'text-white' : 'text-white/40'}`}>
                                            {step.status}
                                        </p>
                                        {step.date && (
                                            <p className="text-sm text-white/50">{formatDate(step.date)}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// Main Orders Page
export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);
    const [sortBy, setSortBy] = useState<'date' | 'total'>('date');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setOrders(mockOrders.map(order => ({
            ...order,
            createdAt: order.createdAt || new Date().toISOString(),
            updatedAt: order.updatedAt || order.createdAt || new Date().toISOString(),
        })));
        setIsLoading(false);
    }, []);
    
    // Filter and sort orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            (order.orderNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.shippingAddress?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.shippingAddress?.email || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter ? order.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        return (b.total || 0) - (a.total || 0);
    });
    
    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            setOrders(prevOrders => prevOrders.map(order => 
                order.id === orderId
                    ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
                    : order
            ));

            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus, updatedAt: new Date().toISOString() });
            }
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update order status");
        }
    };
    
    const getStatusCount = (status: string) => orders.filter(o => o.status === status).length;

    const handleExportCsv = () => {
        const date = new Date().toISOString().slice(0, 10);
        downloadCsv(
            `pkaf-store-orders-${date}.csv`,
            ["Order ID", "Customer Name", "Date", "Product(s)", "Total Amount", "Payment Status", "Delivery Status"],
            filteredOrders.map((order) => [
                order.orderNumber || order.id,
                order.shippingAddress?.name,
                order.createdAt ? new Date(order.createdAt).toISOString().slice(0, 10) : "",
                (order.items || [])
                    .map((item: any) => `${item.name || item.product?.name || "Unknown product"} x${item.quantity || 1}`)
                    .join("; "),
                order.total ?? "",
                order.paymentStatus,
                order.status,
            ])
        );
    };
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Orders Management</h1>
                    <p className="text-white/50 text-sm mt-1">Manage and track customer orders</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{orders.length} total orders</span>
                </div>
            </div>
            
            {/* Status Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {ORDER_STATUSES.map((status, index) => (
                    <motion.button
                        key={status.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setStatusFilter(statusFilter === status.id ? null : status.id)}
                        className={`p-4 rounded-xl border transition-all text-left ${
                            statusFilter === status.id
                                ? 'bg-white/10 border-white/30'
                                : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                        }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <status.icon className={`w-4 h-4 ${
                                status.color === 'amber' ? 'text-amber-400' :
                                status.color === 'blue' ? 'text-blue-400' :
                                status.color === 'purple' ? 'text-purple-400' :
                                status.color === 'green' ? 'text-green-400' :
                                'text-red-400'
                            }`} />
                            <span className="text-lg font-bold">{getStatusCount(status.id)}</span>
                        </div>
                        <p className="text-sm text-white/60">{status.label}</p>
                    </motion.button>
                ))}
            </div>
            
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search orders, customers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/30"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                            isFilterOpen ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                        }`}
                    >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">Filter</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                        onClick={() => setSortBy(sortBy === 'date' ? 'total' : 'date')}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
                    >
                        <ArrowUpDown className="w-4 h-4" />
                        <span className="text-sm">{sortBy === 'date' ? 'Date' : 'Total'}</span>
                    </button>
                    <button
                        onClick={handleExportCsv}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-semibold">Export CSV</span>
                    </button>
                </div>
            </div>
            
            {/* Orders Table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-white/20" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Order</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Customer</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Date</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Total</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                                    <ShoppingBag className="w-5 h-5 text-white/40" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{order.orderNumber}</p>
                                                    <p className="text-xs text-white/40">{order.items?.length || 0} items</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium">{order.shippingAddress?.name}</p>
                                            <p className="text-sm text-white/40">{order.shippingAddress?.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-white/60">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{new Date(order.createdAt || 0).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="font-semibold">GH₵{order.total?.toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {!isLoading && filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/50">No orders found</p>
                    </div>
                )}
            </div>
            
            {/* Order Detail Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <OrderDetailModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                        onStatusChange={handleStatusChange}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

