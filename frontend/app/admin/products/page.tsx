"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Package,
    CheckCircle2,
    XCircle,
    PackageX
} from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/components/product-provider";
import { parseMoney } from "@/lib/price";

// Status Badge Component
function StatusBadge({ available }: { available: boolean }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            available 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
            {available ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {available ? 'Active' : 'Hidden'}
        </span>
    );
}

export default function AdminProducts() {
    const { products, deleteProduct, updateProduct } = useProducts();
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('date');
    
    // Get unique categories
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    
    // Filter and sort products
    const filteredProducts = products.filter((p) => {
        const matchesSearch = 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price') {
            return parseMoney(b.price) - parseMoney(a.price);
        }
        return 0;
    });

    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            deleteProduct(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Products Catalog</h1>
                    <p className="text-white/50 text-sm mt-1">Manage your store inventory</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <p className="text-white/50 text-xs mb-1">Total</p>
                    <p className="text-2xl font-bold">{products.length}</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <p className="text-white/50 text-xs mb-1">Active</p>
                    <p className="text-2xl font-bold text-green-400">{products.filter(p => p.inStock !== false).length}</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <p className="text-white/50 text-xs mb-1">Categories</p>
                    <p className="text-2xl font-bold">{categories.length}</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <p className="text-white/50 text-xs mb-1">Low Stock</p>
                    <p className="text-2xl font-bold text-amber-400">0</p>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-white/30"
                    />
                </div>
                <div className="flex gap-2">
                    {categories.length > 0 && (
                        <select
                            value={categoryFilter || ''}
                            onChange={(e) => setCategoryFilter(e.target.value || null)}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    )}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                    >
                        <option value="date">Newest</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-medium text-white/60">Product</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-white/60">Category</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-white/60">Price</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-white/60">Status</th>
                                <th className="text-right px-6 py-4 text-xs font-medium text-white/60">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.map((product, index) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-white/[0.02]"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden shrink-0">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium truncate">{product.name}</p>
                                                <p className="text-xs text-white/40 truncate max-w-[200px]">{product.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-white/5 text-xs">{product.category || 'General'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold">{product.price}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge available={product.inStock !== false} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => updateProduct(product.id, { inStock: product.inStock === false ? true : false })}
                                                title={product.inStock === false ? 'Mark as In Stock' : 'Mark as Out of Stock'}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    product.inStock === false
                                                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white'
                                                        : 'bg-white/5 text-white/40 hover:bg-amber-500/20 hover:text-amber-400'
                                                }`}
                                            >
                                                <PackageX className="w-4 h-4" />
                                            </button>
                                            <Link 
                                                href={`/admin/products/edit/${product.id}`}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/50">No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
