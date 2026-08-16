"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
    Store, 
    Power, 
    Save, 
    RefreshCw, 
    Check,
    AlertTriangle,
    Mail,
    Phone,
    Truck,
    CreditCard,
    Globe,
    Bell,
    Shield
} from "lucide-react";

// Settings sections
const SETTINGS_SECTIONS = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'store', label: 'Store Status', icon: Power },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
];

// Toggle Switch Component
function ToggleSwitch({ 
    checked, 
    onChange, 
    label,
    description
}: { 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
}) {
    return (
        <div className="flex items-start justify-between p-4 rounded-xl bg-white/5">
            <div>
                <p className="font-medium">{label}</p>
                {description && <p className="text-sm text-white/50 mt-1">{description}</p>}
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                    checked ? 'bg-green-500' : 'bg-white/20'
                }`}
            >
                <motion.div
                    animate={{ x: checked ? 28 : 4 }}
                    className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
                />
            </button>
        </div>
    );
}

// Input Field Component
function InputField({ 
    label, 
    value, 
    onChange, 
    placeholder,
    type = 'text'
}: { 
    label: string; 
    value: string; 
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/30"
            />
        </div>
    );
}

// Main Settings Page
export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('store');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    
    // Store settings state
    const [settings, setSettings] = useState({
        // Store status
        storeOpen: true,
        browseOnlyMode: false,
        maintenanceMode: false,
        
        // Contact info
        storeEmail: 'info@pkafstore.com',
        storePhone: '+233 55 123 4567',
        supportEmail: 'support@pkafstore.com',
        
        // Shipping
        deliveryFee: 25,
        freeShippingThreshold: 500,
        deliveryTime: '3-5 business days',
        
        // Payment
        currency: 'GHS',
        processingFee: 3,
        acceptMobileMoney: true,
        acceptBankTransfer: true,
        acceptCashOnDelivery: false,
        
        // Notifications
        orderNotifications: true,
        lowStockAlerts: true,
        marketingEmails: false,
        
        // General
        storeName: 'PKAF STORE',
        storeTagline: 'POWER YOUR EVERYDAY.',
        announcement: '',
    });
    
    // Handle setting change
    const updateSetting = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaveStatus('idle');
    };
    
    // Save settings
    const handleSave = async () => {
        setSaveStatus('saving');
        try {
            await new Promise((resolve) => setTimeout(resolve, 250));
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (error) {
            console.error("Save settings error:", error);
            setSaveStatus('idle');
            alert("Failed to save settings. Please try again.");
        }
    };
    
    // Store Status Banner
    const StoreStatusBanner = () => {
        if (settings.maintenanceMode) {
            return (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-amber-400">Maintenance Mode Active</p>
                        <p className="text-sm text-white/50">Your store is currently in maintenance mode. Only admins can access the site.</p>
                    </div>
                </div>
            );
        }
        
        if (!settings.storeOpen) {
            return (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                    <Power className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-red-400">Store is Closed</p>
                        <p className="text-sm text-white/50">Customers can browse but cannot make purchases. Toggle below to reopen.</p>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-green-400">Store is Open</p>
                    <p className="text-sm text-white/50">Your store is accepting orders and customers can complete purchases.</p>
                </div>
            </div>
        );
    };
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-white/50 text-sm mt-1">Manage your store configuration</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        saveStatus === 'saved' 
                            ? 'bg-green-500 text-black' 
                            : 'bg-white text-black hover:bg-white/90'
                    }`}
                >
                    {saveStatus === 'saving' ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : saveStatus === 'saved' ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                    </span>
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    {SETTINGS_SECTIONS.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeSection === section.id
                                    ? 'bg-white/10 border border-white/20'
                                    : 'hover:bg-white/5'
                            }`}
                        >
                            <section.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{section.label}</span>
                        </button>
                    ))}
                </div>
                
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Store Status Section */}
                    {activeSection === 'store' && (
                        <div className="space-y-6">
                            <StoreStatusBanner />
                            
                            <div className="rounded-2xl border border-white/10 overflow-hidden">
                                <div className="p-6 border-b border-white/10">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Power className="w-5 h-5" />
                                        Store Control
                                    </h3>
                                    <p className="text-sm text-white/50 mt-1">
                                        Control whether customers can browse and purchase from your store
                                    </p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <ToggleSwitch
                                        checked={settings.storeOpen}
                                        onChange={(v) => updateSetting('storeOpen', v)}
                                        label="Store Open"
                                        description="Allow customers to browse and purchase products"
                                    />
                                    
                                    {!settings.storeOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
                                        >
                                            <p className="text-sm text-amber-400 mb-3">When store is closed:</p>
                                            <ul className="text-sm text-white/60 space-y-1 list-disc list-inside">
                                                <li>Customers can view products</li>
                                                <li>Add to cart is disabled</li>
                                                <li>Checkout is disabled</li>
                                                <li>Custom message shown to customers</li>
                                            </ul>
                                        </motion.div>
                                    )}
                                    
                                    <ToggleSwitch
                                        checked={settings.maintenanceMode}
                                        onChange={(v) => updateSetting('maintenanceMode', v)}
                                        label="Maintenance Mode"
                                        description="Put site in maintenance mode (admins only)"
                                    />
                                    

                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Contact Info Section */}
                    {activeSection === 'contact' && (
                        <div className="rounded-2xl border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    Contact Information
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <InputField
                                    label="Store Email"
                                    value={settings.storeEmail}
                                    onChange={(v) => updateSetting('storeEmail', v)}
                                    placeholder="info@pkafstore.com"
                                />
                                <InputField
                                    label="Support Email"
                                    value={settings.supportEmail}
                                    onChange={(v) => updateSetting('supportEmail', v)}
                                    placeholder="support@pkafstore.com"
                                />
                                <InputField
                                    label="Store Phone"
                                    value={settings.storePhone}
                                    onChange={(v) => updateSetting('storePhone', v)}
                                    placeholder="+233 55 123 4567"
                                />
                            </div>
                        </div>
                    )}
                    

                    
                    {/* Payment Section */}
                    {activeSection === 'payment' && (
                        <div className="rounded-2xl border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Payment Methods
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="p-4 rounded-xl bg-white/5">
                                    <p className="text-sm font-medium mb-1">Currency</p>
                                    <p className="text-xs text-white/50">Ghana Cedi (GH₵)</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70">Processing Fee (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0"
                                            max="20"
                                            step="0.1"
                                            value={settings.processingFee}
                                            onChange={(e) => updateSetting('processingFee', parseFloat(e.target.value) || 0)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/30 pr-10"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold">%</span>
                                    </div>
                                    <p className="text-xs text-white/40">Charged to customers on every order. The payment processor takes ~1.5%; the remainder goes to PKAF STORE.</p>
                                </div>
                                
                                <ToggleSwitch
                                    checked={settings.acceptMobileMoney}
                                    onChange={(v) => updateSetting('acceptMobileMoney', v)}
                                    label="Mobile Money"
                                    description="Accept mobile money payments"
                                />
                                <ToggleSwitch
                                    checked={settings.acceptBankTransfer}
                                    onChange={(v) => updateSetting('acceptBankTransfer', v)}
                                    label="Bank Transfer"
                                    description="Accept bank transfer payments"
                                />
                                <ToggleSwitch
                                    checked={settings.acceptCashOnDelivery}
                                    onChange={(v) => updateSetting('acceptCashOnDelivery', v)}
                                    label="Cash on Delivery"
                                    description="Accept cash payments on delivery"
                                />
                            </div>
                        </div>
                    )}
                    
                    {/* Notifications Section */}
                    {activeSection === 'notifications' && (
                        <div className="rounded-2xl border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Bell className="w-5 h-5" />
                                    Notifications
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <ToggleSwitch
                                    checked={settings.orderNotifications}
                                    onChange={(v) => updateSetting('orderNotifications', v)}
                                    label="New Order Notifications"
                                    description="Get notified when a new order is placed"
                                />
                                <ToggleSwitch
                                    checked={settings.lowStockAlerts}
                                    onChange={(v) => updateSetting('lowStockAlerts', v)}
                                    label="Low Stock Alerts"
                                    description="Get notified when products are running low"
                                />
                            </div>
                        </div>
                    )}
                    
                    {/* General Section */}
                    {activeSection === 'general' && (
                        <div className="rounded-2xl border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Store className="w-5 h-5" />
                                    General Settings
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <InputField
                                    label="Store Name"
                                    value={settings.storeName}
                                    onChange={(v) => updateSetting('storeName', v)}
                                    placeholder="PKAF STORE"
                                />
                                <InputField
                                    label="Store Tagline"
                                    value={settings.storeTagline}
                                    onChange={(v) => updateSetting('storeTagline', v)}
                                    placeholder="POWER YOUR EVERYDAY."
                                />
                                <InputField
                                    label="Announcement Banner"
                                    value={settings.announcement}
                                    onChange={(v) => updateSetting('announcement', v)}
                                    placeholder="Free shipping on orders over GH₵50,000"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
