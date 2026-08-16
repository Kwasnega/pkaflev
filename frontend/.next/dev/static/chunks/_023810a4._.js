(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/price.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateProcessingFee",
    ()=>calculateProcessingFee,
    "formatGhs",
    ()=>formatGhs,
    "parseMoney",
    ()=>parseMoney,
    "resolveOrderItemLineTotal",
    ()=>resolveOrderItemLineTotal,
    "resolveOrderItemUnitPrice",
    ()=>resolveOrderItemUnitPrice
]);
const parseMoney = (value)=>{
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
    }
    if (typeof value !== "string") {
        return 0;
    }
    const normalized = value.replace(/,/g, "").trim();
    const match = normalized.match(/-?\d+(?:\.\d+)?/);
    if (!match) {
        return 0;
    }
    const parsed = Number.parseFloat(match[0]);
    return Number.isFinite(parsed) ? parsed : 0;
};
const formatGhs = (value)=>`GH₵${parseMoney(value).toFixed(2)}`;
const resolveOrderItemUnitPrice = (item, catalogProduct)=>{
    const values = [
        catalogProduct?.price,
        item?.currentPrice,
        item?.unitPrice,
        item?.price,
        item?.product?.price
    ];
    for (const value of values){
        const parsed = parseMoney(value);
        if (parsed > 0) {
            return parsed;
        }
    }
    return 0;
};
const calculateProcessingFee = (amount, feePercent = 3)=>{
    const fee = amount * (feePercent / 100);
    return Math.ceil(fee * 100) / 100; // round up to nearest pesewa
};
const resolveOrderItemLineTotal = (item, catalogProduct)=>{
    const quantity = Math.max(1, Math.floor(parseMoney(item?.quantity) || 1));
    return resolveOrderItemUnitPrice(item, catalogProduct) * quantity;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/cart-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$price$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/price.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CartProvider({ children }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            try {
                const raw = localStorage.getItem("shopping-cart");
                if (raw) setItems(JSON.parse(raw));
            } catch (e) {
            // ignore
            }
        }
    }["CartProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            try {
                localStorage.setItem("shopping-cart", JSON.stringify(items));
            } catch (e) {}
        }
    }["CartProvider.useEffect"], [
        items
    ]);
    const addItem = (product, quantity = 1)=>{
        setItems((prev)=>{
            const existing = prev.find((i)=>i.product.id === product.id);
            if (existing) {
                return prev.map((i)=>i.product.id === product.id ? {
                        ...i,
                        quantity: i.quantity + quantity
                    } : i);
            }
            return [
                {
                    product,
                    quantity
                },
                ...prev
            ];
        });
    };
    const updateQuantity = (productId, quantity)=>{
        setItems((prev)=>prev.map((i)=>i.product.id === productId ? {
                    ...i,
                    quantity
                } : i));
    };
    const removeItem = (productId)=>{
        setItems((prev)=>prev.filter((i)=>i.product.id !== productId));
    };
    const clearCart = ()=>setItems([]);
    const totalItems = items.reduce((s, i)=>s + i.quantity, 0);
    const subtotal = items.reduce((s, i)=>s + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$price$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMoney"])(i.product.price) * i.quantity, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            items,
            totalItems,
            subtotal,
            addItem,
            updateQuantity,
            removeItem,
            clearCart
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/cart-provider.tsx",
        lineNumber: 67,
        columnNumber: 3
    }, this);
}
_s(CartProvider, "OFpe5t0oz9MFBJItuO7ZFbxuhyA=");
_c = CartProvider;
function useCart() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
_s1(useCart, "/dMy7t63NXD4eYACoT93CePwGrg=");
const __TURBOPACK__default__export__ = CartProvider;
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mock-data/products.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"id\":\"pkaf-001\",\"name\":\"Volt X1 Electric Scooter\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"scooters\",\"price\":\"GH₵4,850\",\"description\":\"A compact city commuter scooter with a 350W motor, ideal for daily urban trips up to 40km on a single charge.\",\"image\":\"/images/products/scooter-1.jpg\",\"images\":[\"/images/products/scooter-1.jpg\",\"/images/products/scooter-1a.jpg\"],\"motorPower\":\"350W\",\"batteryCapacity\":\"48V 15Ah\",\"range\":\"40km per charge\",\"topSpeed\":\"25km/h\",\"chargeTime\":\"4-6 hours\",\"weight\":\"18kg\",\"maxLoad\":\"120kg\",\"warranty\":\"12 months\",\"condition\":\"new\",\"originalPrice\":\"GH₵5,500\",\"discount\":\"12% OFF\",\"createdAt\":\"2026-01-05T10:00:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-002\",\"name\":\"Urban Glide Pro Electric Scooter\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"scooters\",\"price\":\"GH₵6,200\",\"description\":\"A premium dual-suspension scooter with a 500W motor, long-range battery and app connectivity for the modern commuter.\",\"image\":\"/images/products/scooter-2.jpg\",\"images\":[\"/images/products/scooter-2.jpg\",\"/images/products/scooter-2a.jpg\"],\"motorPower\":\"500W\",\"batteryCapacity\":\"48V 20Ah\",\"range\":\"55km per charge\",\"topSpeed\":\"32km/h\",\"chargeTime\":\"6-7 hours\",\"weight\":\"21kg\",\"maxLoad\":\"130kg\",\"warranty\":\"24 months\",\"condition\":\"new\",\"createdAt\":\"2026-01-12T14:30:00.000Z\",\"inStock\":true,\"featured\":true},{\"id\":\"pkaf-003\",\"name\":\"City Dash Folding Scooter\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"scooters\",\"price\":\"GH₵3,950\",\"description\":\"Lightweight folding scooter that fits easily into a car boot or under a desk. Perfect for mixed commutes.\",\"image\":\"/images/products/scooter-3.jpg\",\"images\":[\"/images/products/scooter-3.jpg\",\"/images/products/scooter-3a.jpg\"],\"motorPower\":\"300W\",\"batteryCapacity\":\"36V 12Ah\",\"range\":\"30km per charge\",\"topSpeed\":\"25km/h\",\"chargeTime\":\"3-4 hours\",\"weight\":\"14kg\",\"maxLoad\":\"110kg\",\"warranty\":\"12 months\",\"condition\":\"new\",\"createdAt\":\"2026-01-20T09:15:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-004\",\"name\":\"Terra R7 Off-Road Scooter\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"scooters\",\"price\":\"GH₵8,400\",\"description\":\"A rugged all-terrain scooter with knobby tyres, reinforced frame and dual suspension built for rough roads.\",\"image\":\"/images/products/scooter-4.jpg\",\"images\":[\"/images/products/scooter-4.jpg\",\"/images/products/scooter-4a.jpg\"],\"motorPower\":\"800W\",\"batteryCapacity\":\"60V 20Ah\",\"range\":\"50km per charge\",\"topSpeed\":\"45km/h\",\"chargeTime\":\"7-8 hours\",\"weight\":\"29kg\",\"maxLoad\":\"150kg\",\"warranty\":\"24 months\",\"condition\":\"new\",\"originalPrice\":\"GH₵9,200\",\"discount\":\"8% OFF\",\"createdAt\":\"2026-02-01T11:45:00.000Z\",\"inStock\":false,\"featured\":true},{\"id\":\"pkaf-005\",\"name\":\"Ranger Pro E-Bike\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"bikes\",\"price\":\"GH₵9,800\",\"description\":\"A versatile step-through e-bike with a 500W mid-drive motor, perfect for commuting and weekend leisure rides.\",\"image\":\"/images/products/ebike-1.jpg\",\"images\":[\"/images/products/ebike-1.jpg\",\"/images/products/ebike-1a.jpg\"],\"motorPower\":\"500W\",\"batteryCapacity\":\"48V 17Ah\",\"range\":\"75km per charge\",\"topSpeed\":\"25km/h\",\"chargeTime\":\"5-6 hours\",\"weight\":\"24kg\",\"maxLoad\":\"140kg\",\"warranty\":\"24 months\",\"condition\":\"new\",\"createdAt\":\"2026-02-08T10:20:00.000Z\",\"inStock\":true,\"featured\":true},{\"id\":\"pkaf-006\",\"name\":\"Trailblazer X E-Mountain Bike\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"bikes\",\"price\":\"GH₵14,500\",\"description\":\"A full-suspension electric mountain bike with a 750W hub motor, hydraulic brakes and aggressive trail geometry.\",\"image\":\"/images/products/ebike-2.jpg\",\"images\":[\"/images/products/ebike-2.jpg\",\"/images/products/ebike-2a.jpg\"],\"motorPower\":\"750W\",\"batteryCapacity\":\"48V 21Ah\",\"range\":\"90km per charge\",\"topSpeed\":\"32km/h\",\"chargeTime\":\"6-7 hours\",\"weight\":\"28kg\",\"maxLoad\":\"150kg\",\"warranty\":\"24 months\",\"condition\":\"new\",\"createdAt\":\"2026-02-15T15:00:00.000Z\",\"inStock\":true,\"featured\":true},{\"id\":\"pkaf-007\",\"name\":\"Commute One Folding E-Bike\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"bikes\",\"price\":\"GH₵7,600\",\"description\":\"A compact folding e-bike with a 250W motor and lightweight aluminium frame, ideal for multi-modal commutes.\",\"image\":\"/images/products/ebike-3.jpg\",\"images\":[\"/images/products/ebike-3.jpg\",\"/images/products/ebike-3a.jpg\"],\"motorPower\":\"250W\",\"batteryCapacity\":\"36V 14Ah\",\"range\":\"50km per charge\",\"topSpeed\":\"25km/h\",\"chargeTime\":\"4-5 hours\",\"weight\":\"19kg\",\"maxLoad\":\"120kg\",\"warranty\":\"12 months\",\"condition\":\"new\",\"originalPrice\":\"GH₵8,400\",\"discount\":\"9% OFF\",\"createdAt\":\"2026-02-22T08:30:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-008\",\"name\":\"CargoMax Delivery E-Bike (Refurbished)\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"bikes\",\"price\":\"GH₵6,300\",\"description\":\"A refurbished heavy-duty cargo e-bike with a reinforced rear rack, perfect for deliveries and errands.\",\"image\":\"/images/products/ebike-4.jpg\",\"images\":[\"/images/products/ebike-4.jpg\",\"/images/products/ebike-4a.jpg\"],\"motorPower\":\"500W\",\"batteryCapacity\":\"48V 15Ah\",\"range\":\"60km per charge\",\"topSpeed\":\"25km/h\",\"chargeTime\":\"5-6 hours\",\"weight\":\"32kg\",\"maxLoad\":\"180kg\",\"warranty\":\"6 months\",\"condition\":\"refurbished\",\"createdAt\":\"2026-03-01T12:10:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-009\",\"name\":\"Thunder 150 Electric Motorbike\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"motorbikes\",\"price\":\"GH₵18,500\",\"description\":\"A full-size electric motorbike with a 150cc-equivalent motor, highway-capable speed and long-range battery.\",\"image\":\"/images/products/motorbike-1.jpg\",\"images\":[\"/images/products/motorbike-1.jpg\",\"/images/products/motorbike-1a.jpg\"],\"motorPower\":\"3,000W\",\"batteryCapacity\":\"72V 45Ah\",\"range\":\"110km per charge\",\"topSpeed\":\"85km/h\",\"chargeTime\":\"6-8 hours\",\"weight\":\"95kg\",\"maxLoad\":\"180kg\",\"warranty\":\"24 months\",\"condition\":\"new\",\"createdAt\":\"2026-01-10T09:00:00.000Z\",\"inStock\":true,\"featured\":true},{\"id\":\"pkaf-010\",\"name\":\"Storm R Electric Motorbike\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"motorbikes\",\"price\":\"GH₵15,200\",\"description\":\"A sporty all-electric motorbike tuned for acceleration and style, with a removable dual battery system.\",\"image\":\"/images/products/motorbike-2.jpg\",\"images\":[\"/images/products/motorbike-2.jpg\",\"/images/products/motorbike-2a.jpg\"],\"motorPower\":\"2,500W\",\"batteryCapacity\":\"72V 40Ah\",\"range\":\"95km per charge\",\"topSpeed\":\"75km/h\",\"chargeTime\":\"5-7 hours\",\"weight\":\"88kg\",\"maxLoad\":\"160kg\",\"warranty\":\"12 months\",\"condition\":\"new\",\"originalPrice\":\"GH₵16,800\",\"discount\":\"10% OFF\",\"createdAt\":\"2026-01-18T16:45:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-011\",\"name\":\"EcoRide City Electric Motorbike\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"motorbikes\",\"price\":\"GH₵12,900\",\"description\":\"A practical city-oriented electric motorbike with a comfortable seat and efficient battery for daily trips.\",\"image\":\"/images/products/motorbike-3.jpg\",\"images\":[\"/images/products/motorbike-3.jpg\",\"/images/products/motorbike-3a.jpg\"],\"motorPower\":\"2,000W\",\"batteryCapacity\":\"60V 35Ah\",\"range\":\"80km per charge\",\"topSpeed\":\"65km/h\",\"chargeTime\":\"5-6 hours\",\"weight\":\"78kg\",\"maxLoad\":\"150kg\",\"warranty\":\"12 months\",\"condition\":\"new\",\"createdAt\":\"2026-02-05T13:20:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-012\",\"name\":\"Titan 200 Electric Cruiser Motorbike\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"motorbikes\",\"price\":\"GH₵24,000\",\"description\":\"A heavyweight electric cruiser with a long-distance battery, premium suspension and touring comfort.\",\"image\":\"/images/products/motorbike-4.jpg\",\"images\":[\"/images/products/motorbike-4.jpg\",\"/images/products/motorbike-4a.jpg\"],\"motorPower\":\"4,500W\",\"batteryCapacity\":\"72V 60Ah\",\"range\":\"150km per charge\",\"topSpeed\":\"100km/h\",\"chargeTime\":\"8-10 hours\",\"weight\":\"110kg\",\"maxLoad\":\"200kg\",\"warranty\":\"24 months\",\"condition\":\"new\",\"createdAt\":\"2026-02-12T10:40:00.000Z\",\"inStock\":false,\"featured\":true},{\"id\":\"pkaf-013\",\"name\":\"Aero Full-Face Helmet\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"accessories\",\"price\":\"GH₵450\",\"description\":\"A certified full-face helmet with EPS impact liner, ventilation channels and an anti-fog visor for safe rides.\",\"image\":\"/images/products/helmet-1.jpg\",\"images\":[\"/images/products/helmet-1.jpg\"],\"createdAt\":\"2026-01-08T11:00:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-014\",\"name\":\"Smart Fast Charger 48V\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"accessories\",\"price\":\"GH₵280\",\"description\":\"An automatic 48V smart charger with overcharge protection, compatible with most PKAF LEV scooters and e-bikes.\",\"image\":\"/images/products/charger-1.jpg\",\"images\":[\"/images/products/charger-1.jpg\"],\"createdAt\":\"2026-01-15T09:30:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-015\",\"name\":\"Spare Lithium Battery 48V 15Ah\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"accessories\",\"price\":\"GH₵1,150\",\"description\":\"A genuine replacement lithium-ion battery pack that doubles your range on select VolT and Ranger models.\",\"image\":\"/images/products/battery-1.jpg\",\"images\":[\"/images/products/battery-1.jpg\"],\"createdAt\":\"2026-01-22T14:00:00.000Z\",\"inStock\":true,\"featured\":true},{\"id\":\"pkaf-016\",\"name\":\"Heavy-Duty Anti-Theft U-Lock\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"accessories\",\"price\":\"GH₵190\",\"description\":\"A hardened steel U-lock with double locking mechanism and anti-drill cylinder to secure your LEV anywhere.\",\"image\":\"/images/products/lock-1.jpg\",\"images\":[\"/images/products/lock-1.jpg\"],\"createdAt\":\"2026-02-03T10:00:00.000Z\",\"inStock\":true},{\"id\":\"pkaf-017\",\"name\":\"GripMax Phone Mount & Holder Kit\",\"brand\":\"PKAF LEV\",\"collection\":\"PKAF LEV ORIGINALS\",\"category\":\"accessories\",\"price\":\"GH₵120\",\"description\":\"A shock-absorbing universal phone mount with a secure locking clamp, compatible with all handlebar sizes.\",\"image\":\"/images/products/accessory-1.jpg\",\"images\":[\"/images/products/accessory-1.jpg\",\"/images/products/accessory-1a.jpg\"],\"createdAt\":\"2026-02-10T12:20:00.000Z\",\"inStock\":true}]"));}),
"[project]/lib/mock-data/users.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":"user_001","email":"amanda@stylemaverik.com","firstName":"Amanda","lastName":"Boateng","phone":"+233501234567","avatar":null,"memberSince":"2024","role":"user","kycStatus":"pending","createdAt":"2025-01-10T10:00:00.000Z","updatedAt":"2025-01-10T10:00:00.000Z"},{"id":"user_002","email":"kwame@stylemaverik.com","firstName":"Kwame","lastName":"Mensah","phone":"+233542345678","avatar":"/SMimages/logo1.webp","memberSince":"2024","role":"admin","kycStatus":"verified","createdAt":"2024-11-18T09:15:00.000Z","updatedAt":"2025-02-01T08:20:00.000Z"},{"id":"admin_001","email":"admin@pkaflev.com","firstName":"Admin","lastName":"PKAF","phone":null,"avatar":null,"memberSince":"2026","role":"admin","kycStatus":"unverified","createdAt":"2026-01-01T00:00:00.000Z","updatedAt":"2026-01-01T00:00:00.000Z"},{"id":"user_003","email":"nana@stylemaverik.com","firstName":"Nana","lastName":"Agyeman","phone":null,"avatar":null,"memberSince":"2025","kycStatus":"unverified","createdAt":"2025-03-05T12:45:00.000Z","updatedAt":"2025-03-05T12:45:00.000Z"},{"id":"user_004","email":"abena@stylemaverik.com","firstName":"Abena","lastName":"Owusu","phone":"+233244567890","avatar":null,"memberSince":"2025","kycStatus":"rejected","createdAt":"2025-06-12T14:30:00.000Z","updatedAt":"2025-07-01T09:00:00.000Z"}]);}),
"[project]/lib/mock-data/addresses.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":"address_001","userId":"user_001","name":"Amanda Boateng","phone":"+233501234567","address":"12 Labone Avenue","city":"Accra","country":"Ghana","isDefault":true,"createdAt":"2025-01-10T10:00:00.000Z","updatedAt":"2025-01-10T10:00:00.000Z"},{"id":"address_002","userId":"user_001","name":"Amanda Boateng","phone":"+233501234567","address":"8 East Legon Road","city":"Accra","country":"Ghana","isDefault":false,"createdAt":"2025-02-15T16:40:00.000Z","updatedAt":"2025-02-15T16:40:00.000Z"},{"id":"address_003","userId":"user_003","name":"Nana Agyeman","phone":"+233542345678","address":"44 Cantonments Road","city":"Kumasi","country":"Ghana","isDefault":true,"createdAt":"2025-03-05T12:45:00.000Z","updatedAt":"2025-03-05T12:45:00.000Z"}]);}),
"[project]/lib/mock-data/orders.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":"order_001","orderNumber":"SM-2025-001","userId":"user_001","items":[{"productId":"pkaf-001","name":"Volt X1 Electric Scooter","price":4850,"quantity":1,"image":"/images/products/scooter-1.jpg","unitPrice":4850,"lineTotal":4850},{"productId":"pkaf-013","name":"Aero Full-Face Helmet","price":450,"quantity":1,"image":"/images/products/helmet-1.jpg","unitPrice":450,"lineTotal":450}],"shippingAddress":{"name":"Amanda Boateng","email":"amanda@stylemaverik.com","phone":"+233501234567","address":"12 Labone Avenue","city":"Accra","country":"Ghana"},"billingAddress":{"name":"Amanda Boateng","email":"amanda@stylemaverik.com","phone":"+233501234567","address":"12 Labone Avenue","city":"Accra","country":"Ghana"},"paymentMethod":"Mock","subtotal":360,"shipping":25,"tax":18,"total":403,"paymentReference":"mock_ref_001","status":"processing","paymentStatus":"paid","createdAt":"2025-02-02T14:12:00.000Z","updatedAt":"2025-02-02T14:12:00.000Z","receiptSent":true,"receiptSentAt":"2025-02-02T14:15:00.000Z"},{"id":"order_002","orderNumber":"SM-2025-002","userId":"user_003","items":[{"productId":"pkaf-005","name":"Ranger Pro E-Bike","price":9800,"quantity":1,"image":"/images/products/ebike-1.jpg","unitPrice":9800,"lineTotal":9800}],"shippingAddress":{"name":"Nana Agyeman","email":"nana@stylemaverik.com","phone":"+233542345678","address":"44 Cantonments Road","city":"Kumasi","country":"Ghana"},"billingAddress":{"name":"Nana Agyeman","email":"nana@stylemaverik.com","phone":"+233542345678","address":"44 Cantonments Road","city":"Kumasi","country":"Ghana"},"paymentMethod":"Mock","subtotal":180,"shipping":25,"tax":9,"total":214,"paymentReference":"mock_ref_002","status":"delivery-on-route","paymentStatus":"paid","createdAt":"2025-03-07T10:30:00.000Z","updatedAt":"2025-03-07T10:30:00.000Z","receiptSent":true,"receiptSentAt":"2025-03-07T10:32:00.000Z"},{"id":"order_003","orderNumber":"SM-2025-003","userId":"user_001","items":[{"productId":"pkaf-009","name":"Thunder 150 Electric Motorbike","price":18500,"quantity":1,"image":"/images/products/motorbike-1.jpg","unitPrice":18500,"lineTotal":18500}],"shippingAddress":{"name":"Amanda Boateng","email":"amanda@stylemaverik.com","phone":"+233501234567","address":"8 East Legon Road","city":"Accra","country":"Ghana"},"billingAddress":{"name":"Amanda Boateng","email":"amanda@stylemaverik.com","phone":"+233501234567","address":"8 East Legon Road","city":"Accra","country":"Ghana"},"paymentMethod":"Mock","subtotal":140,"shipping":25,"tax":7,"total":172,"paymentReference":"mock_ref_003","status":"cancelled","paymentStatus":"pending","createdAt":"2025-03-12T17:00:00.000Z","updatedAt":"2025-03-12T17:00:00.000Z","receiptSent":false}]);}),
"[project]/lib/mock-data/affiliates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "affiliates",
    ()=>affiliates,
    "mockAffiliates",
    ()=>mockAffiliates
]);
const affiliates = [
    {
        id: "aff-1001",
        name: "Nana Kofi Mensah",
        email: "nana@urbanloop.gh",
        referralCode: "LEV-NK-2024",
        dateJoined: "2024-02-14",
        totalSales: 18450,
        totalCommission: 1845,
        status: "active",
        kycStatus: "verified",
        referralHistory: [
            {
                month: "Jan",
                sales: 4200,
                commission: 420,
                orders: 9
            },
            {
                month: "Feb",
                sales: 6800,
                commission: 680,
                orders: 14
            },
            {
                month: "Mar",
                sales: 7450,
                commission: 745,
                orders: 16
            }
        ]
    },
    {
        id: "aff-1002",
        name: "Akosua Boateng",
        email: "akosua@ridehub.co",
        referralCode: "LEV-AK-2781",
        dateJoined: "2024-03-08",
        totalSales: 9900,
        totalCommission: 990,
        status: "pending approval",
        kycStatus: "pending",
        referralHistory: [
            {
                month: "Jan",
                sales: 2100,
                commission: 210,
                orders: 5
            },
            {
                month: "Feb",
                sales: 3600,
                commission: 360,
                orders: 6
            },
            {
                month: "Mar",
                sales: 4200,
                commission: 420,
                orders: 8
            }
        ]
    },
    {
        id: "aff-1003",
        name: "Kwame Sarpong",
        email: "kwame@citystride.gh",
        referralCode: "LEV-KS-4410",
        dateJoined: "2023-11-21",
        totalSales: 26120,
        totalCommission: 2612,
        status: "active",
        kycStatus: "verified",
        referralHistory: [
            {
                month: "Jan",
                sales: 6100,
                commission: 610,
                orders: 11
            },
            {
                month: "Feb",
                sales: 8900,
                commission: 890,
                orders: 15
            },
            {
                month: "Mar",
                sales: 11120,
                commission: 1112,
                orders: 18
            }
        ]
    },
    {
        id: "aff-1004",
        name: "Adjoa Owusu",
        email: "adjoa@voltmetrics.io",
        referralCode: "LEV-AO-6103",
        dateJoined: "2024-05-04",
        totalSales: 8200,
        totalCommission: 820,
        status: "suspended",
        kycStatus: "rejected",
        referralHistory: [
            {
                month: "Jan",
                sales: 1800,
                commission: 180,
                orders: 4
            },
            {
                month: "Feb",
                sales: 2400,
                commission: 240,
                orders: 5
            },
            {
                month: "Mar",
                sales: 4000,
                commission: 400,
                orders: 7
            }
        ]
    },
    {
        id: "aff-1005",
        name: "Yaw Boadu",
        email: "yaw@motionhouse.gh",
        referralCode: "LEV-YB-9134",
        dateJoined: "2024-01-18",
        totalSales: 14300,
        totalCommission: 1430,
        status: "active",
        kycStatus: "unverified",
        referralHistory: [
            {
                month: "Jan",
                sales: 3000,
                commission: 300,
                orders: 7
            },
            {
                month: "Feb",
                sales: 5200,
                commission: 520,
                orders: 10
            },
            {
                month: "Mar",
                sales: 6100,
                commission: 610,
                orders: 12
            }
        ]
    },
    {
        id: "aff-1006",
        name: "Efua Nartey",
        email: "efua@mobilitygh.com",
        referralCode: "LEV-EN-2048",
        dateJoined: "2023-09-29",
        totalSales: 21400,
        totalCommission: 2140,
        status: "pending approval",
        kycStatus: "unverified",
        referralHistory: [
            {
                month: "Jan",
                sales: 4700,
                commission: 470,
                orders: 8
            },
            {
                month: "Feb",
                sales: 6600,
                commission: 660,
                orders: 12
            },
            {
                month: "Mar",
                sales: 10100,
                commission: 1010,
                orders: 17
            }
        ]
    }
];
const mockAffiliates = affiliates;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mock-data/partner.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockPartnerProfile",
    ()=>mockPartnerProfile
]);
const mockPartnerProfile = {
    name: "James Doe",
    email: "partner@pkaflev.com",
    phone: "+233 20 123 4567",
    referralCode: "PKAF-JDOE23",
    referralLink: "https://pkaflev.com/?ref=PKAF-JDOE23",
    kycStatus: "pending",
    stats: {
        totalClicks: 2847,
        totalSignups: 142,
        totalCommissionEarned: 4860.0,
        pendingPayoutAmount: 720.0,
        conversionRate: 4.99
    },
    referralHistory: [
        {
            id: "ref-001",
            date: "2026-07-28T14:22:00.000Z",
            customerName: "Customer #1842",
            productName: "PKAF City Cruiser E-Scooter",
            saleAmount: 3200.0,
            commissionAmount: 160.0,
            payoutStatus: "pending"
        },
        {
            id: "ref-002",
            date: "2026-07-25T09:15:00.000Z",
            customerName: "Customer #1831",
            productName: "Urban Glide Pro Helmet",
            saleAmount: 450.0,
            commissionAmount: 22.5,
            payoutStatus: "pending"
        },
        {
            id: "ref-003",
            date: "2026-07-21T16:40:00.000Z",
            customerName: "Customer #1819",
            productName: "PKAF VoltMax E-Bike",
            saleAmount: 5800.0,
            commissionAmount: 290.0,
            payoutStatus: "pending"
        },
        {
            id: "ref-004",
            date: "2026-07-18T11:05:00.000Z",
            customerName: "Customer #1804",
            productName: "RangeBoost Battery Pack 48V",
            saleAmount: 980.0,
            commissionAmount: 49.0,
            payoutStatus: "paid"
        },
        {
            id: "ref-005",
            date: "2026-07-14T08:30:00.000Z",
            customerName: "Customer #1792",
            productName: "PKAF City Cruiser E-Scooter",
            saleAmount: 3200.0,
            commissionAmount: 160.0,
            payoutStatus: "paid"
        },
        {
            id: "ref-006",
            date: "2026-07-10T19:55:00.000Z",
            customerName: "Customer #1778",
            productName: "SwiftRide Commuter E-Bike",
            saleAmount: 4200.0,
            commissionAmount: 210.0,
            payoutStatus: "paid"
        },
        {
            id: "ref-007",
            date: "2026-07-06T13:18:00.000Z",
            customerName: "Customer #1765",
            productName: "PKAF Pro Riding Gloves",
            saleAmount: 180.0,
            commissionAmount: 9.0,
            payoutStatus: "paid"
        },
        {
            id: "ref-008",
            date: "2026-07-02T10:42:00.000Z",
            customerName: "Customer #1751",
            productName: "PKAF VoltMax E-Bike",
            saleAmount: 5800.0,
            commissionAmount: 290.0,
            payoutStatus: "paid"
        },
        {
            id: "ref-009",
            date: "2026-06-28T15:27:00.000Z",
            customerName: "Customer #1738",
            productName: "Urban Glide Pro Helmet",
            saleAmount: 450.0,
            commissionAmount: 22.5,
            payoutStatus: "paid"
        },
        {
            id: "ref-010",
            date: "2026-06-24T09:03:00.000Z",
            customerName: "Customer #1724",
            productName: "PKAF City Cruiser E-Scooter",
            saleAmount: 3200.0,
            commissionAmount: 160.0,
            payoutStatus: "paid"
        }
    ],
    payoutHistory: [
        {
            id: "pay-004",
            date: "2026-07-01T10:00:00.000Z",
            amount: 1240.0,
            method: "Mobile Money"
        },
        {
            id: "pay-003",
            date: "2026-06-01T10:00:00.000Z",
            amount: 980.0,
            method: "Mobile Money"
        },
        {
            id: "pay-002",
            date: "2026-05-01T10:00:00.000Z",
            amount: 1560.0,
            method: "Mobile Money"
        },
        {
            id: "pay-001",
            date: "2026-04-01T10:00:00.000Z",
            amount: 1080.0,
            method: "Bank Transfer"
        }
    ],
    defaultPayoutMethod: {
        type: "Mobile Money",
        mobileNumber: "+233 20 123 4567",
        network: "MTN",
        accountNumber: "",
        bankName: ""
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mock-data/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addresses",
    ()=>addresses,
    "mockProducts",
    ()=>mockProducts,
    "orders",
    ()=>orders,
    "products",
    ()=>products,
    "users",
    ()=>users
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$products$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/lib/mock-data/products.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$users$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/lib/mock-data/users.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$addresses$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/lib/mock-data/addresses.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$orders$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/lib/mock-data/orders.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$affiliates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data/affiliates.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$partner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data/partner.ts [app-client] (ecmascript)");
;
;
;
;
const mockProducts = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$products$2e$json__$28$json$29$__["default"];
const products = mockProducts;
const users = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$users$2e$json__$28$json$29$__["default"];
const addresses = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$addresses$2e$json__$28$json$29$__["default"];
const orders = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$orders$2e$json__$28$json$29$__["default"];
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBackendBaseUrl",
    ()=>getBackendBaseUrl,
    "getBackendUrl",
    ()=>getBackendUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEFAULT_BACKEND_URL = ("TURBOPACK compile-time value", "http://localhost:5000") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BACKEND_URL || "http://localhost:5000";
function getBackendBaseUrl() {
    return DEFAULT_BACKEND_URL.replace(/\/$/, "");
}
function getBackendUrl(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${getBackendBaseUrl()}${normalizedPath}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToWishlist",
    ()=>addToWishlist,
    "checkoutOrder",
    ()=>checkoutOrder,
    "createProduct",
    ()=>createProduct,
    "fetchProducts",
    ()=>fetchProducts,
    "getWishlist",
    ()=>getWishlist,
    "loginUser",
    ()=>loginUser,
    "registerUser",
    ()=>registerUser,
    "removeFromWishlist",
    ()=>removeFromWishlist
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-config.ts [app-client] (ecmascript)");
;
async function request(path, init) {
    let response;
    try {
        response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBackendUrl"])(path), {
            headers: {
                "Content-Type": "application/json",
                ...init?.headers || {}
            },
            ...init
        });
    } catch (error) {
        return {
            error: "Unable to reach the backend server. Please make sure it is running."
        };
    }
    const payload = await response.json().catch(()=>null);
    if (!response.ok) {
        return {
            error: payload?.error || payload?.message || "Request failed"
        };
    }
    return {
        data: payload
    };
}
async function loginUser(email, password) {
    return request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    });
}
async function registerUser(payload) {
    return request("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function fetchProducts() {
    return request("/api/shop/products");
}
async function checkoutOrder(payload) {
    return request("/api/shop/checkout", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function createProduct(payload) {
    return request('/api/shop/products', {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function getWishlist(userId) {
    return request(`/api/products/wishlist/${userId}`);
}
async function addToWishlist(userId, productId) {
    return request('/api/products/wishlist', {
        method: 'POST',
        body: JSON.stringify({
            user_id: userId,
            product_id: productId
        })
    });
}
async function removeFromWishlist(userId, productId) {
    return request(`/api/products/wishlist/${userId}/${productId}`, {
        method: 'DELETE'
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/product-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductProvider",
    ()=>ProductProvider,
    "useProducts",
    ()=>useProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/mock-data/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const PRODUCTS_STORAGE_KEY = "pkaf_products";
const ProductContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function mapBackendProduct(product) {
    return {
        id: String(product.product_id ?? product.id ?? ""),
        name: String(product.product_name ?? product.name ?? "Untitled product"),
        image: String(product.image ?? product.image_url ?? "/icon.jpg"),
        price: String(product.price ?? "0"),
        description: String(product.description ?? ""),
        category: String(product.category ?? "accessories"),
        createdAt: new Date().toISOString()
    };
}
function sortProducts(products) {
    return [
        ...products
    ].sort((a, b)=>{
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
}
function ProductProvider({ children }) {
    _s();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductProvider.useEffect": ()=>{
            const loadProducts = {
                "ProductProvider.useEffect.loadProducts": async ()=>{
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchProducts"])();
                        if (response.data && Array.isArray(response.data)) {
                            const backendProducts = response.data.map({
                                "ProductProvider.useEffect.loadProducts.backendProducts": (product)=>mapBackendProduct(product)
                            }["ProductProvider.useEffect.loadProducts.backendProducts"]);
                            if (backendProducts.length > 0) {
                                setProducts(sortProducts(backendProducts));
                                window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(backendProducts));
                                setIsLoading(false);
                                return;
                            }
                        }
                    } catch  {
                    // Fall back to local mock data if the API is unavailable.
                    }
                    try {
                        const saved = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
                        setProducts(sortProducts(saved ? JSON.parse(saved) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockProducts"]));
                    } catch  {
                        setProducts(sortProducts(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockProducts"]));
                    }
                    setIsLoading(false);
                }
            }["ProductProvider.useEffect.loadProducts"];
            const timer = window.setTimeout({
                "ProductProvider.useEffect.timer": ()=>{
                    void loadProducts();
                }
            }["ProductProvider.useEffect.timer"], 120);
            return ({
                "ProductProvider.useEffect": ()=>window.clearTimeout(timer)
            })["ProductProvider.useEffect"];
        }
    }["ProductProvider.useEffect"], []);
    const addProduct = async (product)=>{
        const fallbackProduct = {
            ...product,
            id: `mock-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProduct"])({
                product_name: product.name,
                description: product.description,
                price: Number(product.price) || 0,
                cost_price: 0,
                stock_quantity: 100,
                image_url: product.image ?? null
            });
            const createdProduct = response.data?.product ?? response.data?.message ?? null;
            if (createdProduct && typeof createdProduct === "object") {
                const normalizedProduct = mapBackendProduct(createdProduct);
                const next = sortProducts([
                    normalizedProduct,
                    ...products.filter((item)=>item.id !== normalizedProduct.id)
                ]);
                setProducts(next);
                window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
                return normalizedProduct.id;
            }
        } catch  {
        // Fall back to local-only storage if the backend is unavailable.
        }
        setProducts((prev)=>{
            const next = sortProducts([
                ...prev,
                fallbackProduct
            ]);
            window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
            return next;
        });
        return fallbackProduct.id;
    };
    const updateProduct = async (id, updatedFields)=>{
        setProducts((prev)=>{
            const next = sortProducts(prev.map((item)=>item.id === id ? {
                    ...item,
                    ...updatedFields
                } : item));
            window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    };
    const deleteProduct = async (id)=>{
        setProducts((prev)=>{
            const next = prev.filter((item)=>item.id !== id);
            window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductContext.Provider, {
        value: {
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            isLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/product-provider.tsx",
        lineNumber: 132,
        columnNumber: 9
    }, this);
}
_s(ProductProvider, "U7Qxnmy0PRpeVhtyqezv0QxSkvk=");
_c = ProductProvider;
function useProducts() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
_s1(useProducts, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ProductProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LOCAL_STORAGE_KEY = "pkaflev_auth_user";
const ADMIN_AUTH_FLAG = "pkaflev_mock_admin_authenticated";
function createAuthUser(email, displayName, role = "user", token = null, userId) {
    const name = displayName?.trim() || email.split("@")[0];
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") ?? "";
    const uid = userId ? String(userId) : `auth-${Date.now()}`;
    return {
        uid,
        id: uid,
        email,
        displayName: name,
        photoURL: null,
        phoneNumber: null,
        firstName,
        lastName,
        role,
        token,
        getIdToken: async ()=>token ?? `mock-token-${uid}`
    };
}
function persistAuthUser(user) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (user) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
        if (user.role === "admin") {
            window.localStorage.setItem(ADMIN_AUTH_FLAG, "true");
        } else {
            window.localStorage.removeItem(ADMIN_AUTH_FLAG);
        }
    } else {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        window.localStorage.removeItem(ADMIN_AUTH_FLAG);
    }
}
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            try {
                const storedUser = window.localStorage.getItem(LOCAL_STORAGE_KEY);
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    if (parsed?.email) {
                        setUser({
                            ...parsed,
                            getIdToken: {
                                "AuthProvider.useEffect": async ()=>parsed.token ?? `mock-token-${parsed.uid}`
                            }["AuthProvider.useEffect"]
                        });
                    }
                }
            } catch  {
            // Ignore storage access issues in non-browser environments.
            } finally{
                setLoading(false);
            }
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        setLoading(true);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(email.trim(), password);
            if (response.error) {
                throw new Error(response.error);
            }
            const authUser = createAuthUser(email.trim(), email.split("@")[0], response.data?.role ?? "user", response.data?.token ?? null, response.data?.userId);
            setUser(authUser);
            persistAuthUser(authUser);
        } finally{
            setLoading(false);
        }
    };
    const signup = async (email, password, displayName)=>{
        setLoading(true);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerUser"])({
                email: email.trim(),
                password,
                name: displayName,
                role: "user"
            });
            if (response.error) {
                throw new Error(response.error);
            }
            const authUser = createAuthUser(email.trim(), displayName ?? email.split("@")[0], "user", null, response.data?.userId);
            setUser(authUser);
            persistAuthUser(authUser);
        } finally{
            setLoading(false);
        }
    };
    const resetPassword = async (email)=>{
        await new Promise((resolve)=>setTimeout(resolve, 300));
        // Keep existing mock semantics for now.
        if (!email.trim()) {
            throw new Error("Please provide an email address.");
        }
    };
    const changePassword = async (currentPassword, newPassword)=>{
        const MOCK_CURRENT_PASSWORD = "password123";
        await new Promise((resolve)=>setTimeout(resolve, 800));
        if (currentPassword !== MOCK_CURRENT_PASSWORD) {
            throw {
                code: "auth/wrong-password",
                message: "Current password is incorrect"
            };
        }
        if (!newPassword || newPassword.length < 6) {
            throw {
                code: "auth/weak-password",
                message: "Password must be at least 6 characters"
            };
        }
    };
    const logout = async ()=>{
        setUser(null);
        persistAuthUser(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            login,
            signup,
            resetPassword,
            changePassword,
            logout,
            isAuthenticated: !!user
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/AuthContext.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "NiO5z6JIqzX62LS5UWDgIqbZYyY=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/wishlist-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WishlistProvider",
    ()=>WishlistProvider,
    "useWishlist",
    ()=>useWishlist
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const WishlistContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const STORAGE_KEY = "wishlist-items";
function WishlistProvider({ children }) {
    _s();
    const { products } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProducts"])();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [wishlistedIds, setWishlistedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const requireAuthenticatedWishlist = ()=>{
        if (!user) {
            window.dispatchEvent(new CustomEvent("pkaflev:open-auth", {
                detail: {
                    defaultTab: "signin"
                }
            }));
            return false;
        }
        return true;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WishlistProvider.useEffect": ()=>{
            const loadWishlist = {
                "WishlistProvider.useEffect.loadWishlist": async ()=>{
                    try {
                        if (!user?.id && !user?.uid) {
                            setWishlistedIds([]);
                            window.localStorage.removeItem(STORAGE_KEY);
                            return;
                        }
                        const userId = user?.id ?? user?.uid;
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWishlist"])(userId);
                        if (response.data && Array.isArray(response.data)) {
                            const ids = response.data.map({
                                "WishlistProvider.useEffect.loadWishlist.ids": (entry)=>{
                                    const record = entry;
                                    const nestedProduct = record.product;
                                    return record.product_id ?? nestedProduct?.product_id ?? null;
                                }
                            }["WishlistProvider.useEffect.loadWishlist.ids"]).filter({
                                "WishlistProvider.useEffect.loadWishlist.ids": (value)=>value !== null && value !== undefined
                            }["WishlistProvider.useEffect.loadWishlist.ids"]).map({
                                "WishlistProvider.useEffect.loadWishlist.ids": (value)=>String(value)
                            }["WishlistProvider.useEffect.loadWishlist.ids"]);
                            setWishlistedIds(ids);
                            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
                            return;
                        }
                        const raw = window.localStorage.getItem(STORAGE_KEY);
                        const fallbackIds = raw ? JSON.parse(raw) : [];
                        const parsedFallback = Array.isArray(fallbackIds) ? fallbackIds.filter({
                            "WishlistProvider.useEffect.loadWishlist": (id)=>typeof id === "string"
                        }["WishlistProvider.useEffect.loadWishlist"]) : [];
                        setWishlistedIds(parsedFallback);
                    } catch  {
                        setWishlistedIds([]);
                    }
                }
            }["WishlistProvider.useEffect.loadWishlist"];
            if (!loading) {
                void loadWishlist();
            }
        }
    }["WishlistProvider.useEffect"], [
        loading,
        user?.id,
        user?.uid
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WishlistProvider.useEffect": ()=>{
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistedIds));
            } catch  {
            // ignore storage errors
            }
        }
    }["WishlistProvider.useEffect"], [
        wishlistedIds
    ]);
    const wishlistProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WishlistProvider.useMemo[wishlistProducts]": ()=>products.filter({
                "WishlistProvider.useMemo[wishlistProducts]": (product)=>wishlistedIds.includes(product.id)
            }["WishlistProvider.useMemo[wishlistProducts]"])
    }["WishlistProvider.useMemo[wishlistProducts]"], [
        products,
        wishlistedIds
    ]);
    const isWishlisted = (productId)=>wishlistedIds.includes(productId);
    const addToWishlist = async (productId)=>{
        if (!requireAuthenticatedWishlist()) {
            return;
        }
        if (wishlistedIds.includes(productId)) {
            return;
        }
        setWishlistedIds((prev)=>prev.includes(productId) ? prev : [
                productId,
                ...prev
            ]);
        try {
            const userId = user?.id ?? user?.uid;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToWishlist"])(userId, productId);
        } catch  {
        // fall back to local-only storage when the backend is unavailable
        }
    };
    const removeFromWishlist = async (productId)=>{
        if (!user) {
            window.dispatchEvent(new CustomEvent("pkaflev:open-auth", {
                detail: {
                    defaultTab: "signin"
                }
            }));
            return;
        }
        setWishlistedIds((prev)=>prev.filter((id)=>id !== productId));
        try {
            const userId = user?.id ?? user?.uid;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeFromWishlist"])(userId, productId);
        } catch  {
        // ignore backend errors
        }
    };
    const toggleWishlistItem = (productId)=>{
        if (!user) {
            window.dispatchEvent(new CustomEvent("pkaflev:open-auth", {
                detail: {
                    defaultTab: "signin"
                }
            }));
            return;
        }
        void (isWishlisted(productId) ? removeFromWishlist(productId) : addToWishlist(productId));
    };
    const clearWishlist = async ()=>{
        if (!requireAuthenticatedWishlist()) {
            return;
        }
        setWishlistedIds([]);
        try {
            const userId = user?.id ?? user?.uid;
            await Promise.all(wishlistedIds.map((id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeFromWishlist"])(userId, id)));
        } catch  {
        // ignore backend errors
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WishlistContext.Provider, {
        value: {
            wishlistedIds,
            wishlistProducts,
            totalWishlistItems: wishlistProducts.length,
            isWishlisted,
            addToWishlist,
            removeFromWishlist,
            toggleWishlistItem,
            clearWishlist
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/wishlist-provider.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_s(WishlistProvider, "XXZhuttZgaNcI+WcyoI6fyAyvy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProducts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = WishlistProvider;
function useWishlist() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return context;
}
_s1(useWishlist, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "WishlistProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/auth-tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthTabs",
    ()=>AuthTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function AuthTabs({ activeTab, onTabChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex items-center justify-center gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onTabChange("signin"),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 rounded-lg", activeTab === "signin" ? "text-white" : "text-white/40 hover:text-white/70"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-all duration-200", activeTab === "signin" && "font-semibold"),
                        children: "Sign In"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/auth-tabs.tsx",
                        lineNumber: 23,
                        columnNumber: 17
                    }, this),
                    activeTab === "signin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        layoutId: "activeTab",
                        className: "absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full",
                        transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/auth/auth-tabs.tsx",
                        lineNumber: 30,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/auth-tabs.tsx",
                lineNumber: 14,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onTabChange("signup"),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 rounded-lg", activeTab === "signup" ? "text-white" : "text-white/40 hover:text-white/70"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-all duration-200", activeTab === "signup" && "font-semibold"),
                        children: "Create Account"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/auth-tabs.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this),
                    activeTab === "signup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        layoutId: "activeTab",
                        className: "absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full",
                        transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/auth/auth-tabs.tsx",
                        lineNumber: 54,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/auth-tabs.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/auth-tabs.tsx",
        lineNumber: 13,
        columnNumber: 9
    }, this);
}
_c = AuthTabs;
var _c;
__turbopack_context__.k.register(_c, "AuthTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/input-field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputField",
    ()=>InputField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const InputField = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(({ label, error, icon: Icon, showPasswordToggle, isValid, validationMessage, className, type = "text", ...props }, ref)=>{
    _s();
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasValue, setHasValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputType = showPasswordToggle && showPassword ? "text" : type;
    // Show validation state only when not focused and has value
    const showValidation = !isFocused && hasValue && isValid !== undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 ml-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/auth/input-field.tsx",
                lineNumber: 30,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-4 h-4 transition-colors duration-200", error ? "text-red-400" : isFocused || hasValue ? "text-white/60" : "text-white/25")
                        }, void 0, false, {
                            fileName: "[project]/components/auth/input-field.tsx",
                            lineNumber: 37,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/auth/input-field.tsx",
                        lineNumber: 36,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: ref,
                        type: inputType,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full bg-white/[0.04] border rounded-xl py-3.5 text-sm text-white placeholder:text-white/25", "outline-none transition-all duration-200 ease-out", "focus:shadow-[0_0_0_4px_rgba(255,255,255,0.05)]", Icon ? "pl-12 pr-12" : "px-4 pr-12", showPasswordToggle && "pr-12", error ? "border-red-500/50 focus:border-red-400 bg-red-500/[0.03]" : isValid ? "border-green-500/50 focus:border-green-400 bg-green-500/[0.03]" : "border-white/[0.08] focus:border-white/30 focus:bg-white/[0.06] hover:border-white/15", className),
                        onFocus: ()=>setIsFocused(true),
                        onBlur: (e)=>{
                            setIsFocused(false);
                            setHasValue(e.target.value.length > 0);
                        },
                        onChange: (e)=>{
                            setHasValue(e.target.value.length > 0);
                            props.onChange?.(e);
                        },
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/components/auth/input-field.tsx",
                        lineNumber: 48,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: showValidation && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.5
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.5
                            },
                            className: "absolute right-4 top-1/2 -translate-y-1/2",
                            children: isValid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-3 h-3 text-green-500",
                                    strokeWidth: 3
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/input-field.tsx",
                                    lineNumber: 87,
                                    columnNumber: 41
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/auth/input-field.tsx",
                                lineNumber: 86,
                                columnNumber: 37
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-3 h-3 text-red-500",
                                    strokeWidth: 3
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/input-field.tsx",
                                    lineNumber: 91,
                                    columnNumber: 41
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/auth/input-field.tsx",
                                lineNumber: 90,
                                columnNumber: 37
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/auth/input-field.tsx",
                            lineNumber: 79,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/auth/input-field.tsx",
                        lineNumber: 77,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    showPasswordToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setShowPassword(!showPassword),
                        className: "absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors duration-150 rounded-md hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                        tabIndex: -1,
                        "aria-label": showPassword ? "Hide password" : "Show password",
                        children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/input-field.tsx",
                            lineNumber: 108,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/input-field.tsx",
                            lineNumber: 110,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/auth/input-field.tsx",
                        lineNumber: 100,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/input-field.tsx",
                lineNumber: 33,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                    initial: {
                        opacity: 0,
                        y: -5
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -5
                    },
                    className: "text-xs text-red-400 ml-1",
                    children: error
                }, "error", false, {
                    fileName: "[project]/components/auth/input-field.tsx",
                    lineNumber: 119,
                    columnNumber: 25
                }, ("TURBOPACK compile-time value", void 0)) : showValidation && validationMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                    initial: {
                        opacity: 0,
                        y: -5
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -5
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs ml-1", isValid ? "text-green-400" : "text-red-400"),
                    children: validationMessage
                }, "validation", false, {
                    fileName: "[project]/components/auth/input-field.tsx",
                    lineNumber: 129,
                    columnNumber: 25
                }, ("TURBOPACK compile-time value", void 0)) : null
            }, void 0, false, {
                fileName: "[project]/components/auth/input-field.tsx",
                lineNumber: 117,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/input-field.tsx",
        lineNumber: 29,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
}, "88CeWvgvf9aq4u0yA/oqzwy0dFU=")), "88CeWvgvf9aq4u0yA/oqzwy0dFU=");
_c1 = InputField;
InputField.displayName = "InputField";
var _c, _c1;
__turbopack_context__.k.register(_c, "InputField$forwardRef");
__turbopack_context__.k.register(_c1, "InputField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/auth-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthButton",
    ()=>AuthButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function AuthButton({ isLoading, children, className, disabled, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        disabled: disabled || isLoading,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-full bg-white text-black py-4 rounded-xl", "text-[12px] font-bold tracking-[0.15em] uppercase", "transition-all duration-200 ease-out", "hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]", "active:scale-[0.98] active:shadow-none", "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center gap-2 transition-opacity duration-150", isLoading && "opacity-0"),
                children: children
            }, void 0, false, {
                fileName: "[project]/components/auth/auth-button.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                className: "absolute inset-0 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "animate-spin h-5 w-5 text-black",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            className: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "4"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/auth-button.tsx",
                            lineNumber: 47,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            className: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/auth-button.tsx",
                            lineNumber: 55,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth/auth-button.tsx",
                    lineNumber: 41,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/auth/auth-button.tsx",
                lineNumber: 36,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/auth-button.tsx",
        lineNumber: 13,
        columnNumber: 9
    }, this);
}
_c = AuthButton;
var _c;
__turbopack_context__.k.register(_c, "AuthButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/social-auth-buttons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocialAuthButtons",
    ()=>SocialAuthButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function GoogleIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21.6 12.23c0-.68-.06-1.34-.18-1.97H12v3.73h5.39c-.23 1.24-.93 2.29-1.98 2.99v2.48h3.2c1.88-1.72 2.99-4.27 2.99-7.23z",
                fill: "#4285F4"
            }, void 0, false, {
                fileName: "[project]/components/auth/social-auth-buttons.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 22c2.7 0 4.96-.89 6.61-2.4l-3.2-2.48c-.89.6-2.03.96-3.41.96-2.62 0-4.84-1.77-5.64-4.15H.96v2.6C2.66 19.9 6.99 22 12 22z",
                fill: "#34A853"
            }, void 0, false, {
                fileName: "[project]/components/auth/social-auth-buttons.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.36 19.89c-.72-1.37-1.14-2.89-1.14-4.59s.42-3.22 1.14-4.59V8.11H2.39C1.46 9.94 1 11.9 1 14c0 2.1.46 4.06 1.39 5.89l4.97-1.37z",
                fill: "#FBBC05"
            }, void 0, false, {
                fileName: "[project]/components/auth/social-auth-buttons.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 5.98c1.47 0 2.79.5 3.83 1.49l2.88-2.88C16.96 2.47 14.7 1.5 12 1.5c-5.01 0-9.34 2.1-11.04 5.11l3.97 2.97c.8-2.38 2.98-4.1 7.07-4.1z",
                fill: "#EA4335"
            }, void 0, false, {
                fileName: "[project]/components/auth/social-auth-buttons.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/social-auth-buttons.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = GoogleIcon;
function AppleIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M16.7 12.4c0-2.12 1.74-3.14 1.82-3.19-1-1.46-2.56-1.66-3.1-1.68-1.32-.13-2.57.79-3.24.79-.68 0-1.72-.77-2.83-.75-1.46.02-2.8.84-3.54 2.15-1.52 2.63-.39 6.52 1.09 8.64.72 1.04 1.58 2.2 2.71 2.16 1.08-.04 1.49-.7 2.81-.7 1.31 0 1.68.7 2.83.68 1.17-.02 1.92-1.06 2.64-2.1.83-1.2 1.17-2.36 1.19-2.42-.03-.01-2.27-.87-3.99-2.52zM14.79 4.99c.59-.72 1-1.72.89-2.72-.86.03-1.9.57-2.52 1.29-.55.64-1.04 1.64-.91 2.62.96.08 1.95-.49 2.54-1.19z"
        }, void 0, false, {
            fileName: "[project]/components/auth/social-auth-buttons.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/auth/social-auth-buttons.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c1 = AppleIcon;
function SocialAuthButtons({ className }) {
    const handleGoogleAuth = ()=>{
        console.log("Google auth clicked");
    };
    const handleAppleAuth = ()=>{
        console.log("Apple auth clicked");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid grid-cols-2 gap-3", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                type: "button",
                onClick: handleGoogleAuth,
                whileHover: {
                    y: -1
                },
                whileTap: {
                    scale: 0.99
                },
                className: "flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GoogleIcon, {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/social-auth-buttons.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Google"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/social-auth-buttons.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/social-auth-buttons.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                type: "button",
                onClick: handleAppleAuth,
                whileHover: {
                    y: -1
                },
                whileTap: {
                    scale: 0.99
                },
                className: "flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#f5f5f5] px-4 py-3 text-sm font-medium text-black shadow-[0_12px_30px_rgba(255,255,255,0.08)] transition-all hover:border-white/20 hover:bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppleIcon, {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/social-auth-buttons.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Apple"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/social-auth-buttons.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/social-auth-buttons.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/social-auth-buttons.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c2 = SocialAuthButtons;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "GoogleIcon");
__turbopack_context__.k.register(_c1, "AppleIcon");
__turbopack_context__.k.register(_c2, "SocialAuthButtons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/sign-in-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignInForm",
    ()=>SignInForm,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/input-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/auth-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$social$2d$auth$2d$buttons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/social-auth-buttons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function SignInForm({ onSuccess, onForgotPassword }) {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSuccess, setIsSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [touched, setTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: false,
        password: false
    });
    const [rememberMe, setRememberMe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Real-time validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 6;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignInForm.useEffect": ()=>{
            const savedEmail = localStorage.getItem("remembered-email");
            if (savedEmail) {
                setEmail(savedEmail);
                setRememberMe(true);
            }
        }
    }["SignInForm.useEffect"], []);
    const validate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SignInForm.useCallback[validate]": ()=>{
            const newErrors = {};
            if (!email) {
                newErrors.email = "Email is required";
            } else if (!isEmailValid) {
                newErrors.email = "Please enter a valid email address";
            }
            if (!password) {
                newErrors.password = "Password is required";
            } else if (!isPasswordValid) {
                newErrors.password = "Password must be at least 6 characters";
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }
    }["SignInForm.useCallback[validate]"], [
        email,
        password,
        isEmailValid,
        isPasswordValid
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validate()) {
            setTouched({
                email: true,
                password: true
            });
            return;
        }
        setIsLoading(true);
        try {
            // Auth login (mock)
            await login(email, password);
            // Save email if remember me is checked
            if (rememberMe) {
                localStorage.setItem("remembered-email", email);
            } else {
                localStorage.removeItem("remembered-email");
            }
            setIsSuccess(true);
            // Show success then close
            setTimeout(()=>{
                onSuccess && onSuccess();
            }, 1500);
        } catch (err) {
            setErrors({
                password: err.message || "Invalid email or password"
            });
        } finally{
            setIsLoading(false);
        }
    };
    const clearError = (field)=>{
        setErrors((prev)=>({
                ...prev,
                [field]: undefined
            }));
    };
    if (isSuccess) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "flex flex-col items-center justify-center py-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        scale: 0
                    },
                    animate: {
                        scale: 1
                    },
                    transition: {
                        type: "spring",
                        damping: 10,
                        stiffness: 200
                    },
                    className: "w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "w-10 h-10 text-green-500",
                        strokeWidth: 3
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-in-form.tsx",
                        lineNumber: 117,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/auth/sign-in-form.tsx",
                    lineNumber: 111,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-white mb-2",
                    children: "Welcome Back!"
                }, void 0, false, {
                    fileName: "[project]/components/auth/sign-in-form.tsx",
                    lineNumber: 119,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/60 text-sm",
                    children: "Signed in successfully"
                }, void 0, false, {
                    fileName: "[project]/components/auth/sign-in-form.tsx",
                    lineNumber: 120,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/auth/sign-in-form.tsx",
            lineNumber: 106,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$social$2d$auth$2d$buttons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SocialAuthButtons"], {}, void 0, false, {
                fileName: "[project]/components/auth/sign-in-form.tsx",
                lineNumber: 128,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full border-t border-white/10"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/sign-in-form.tsx",
                            lineNumber: 133,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-in-form.tsx",
                        lineNumber: 132,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex justify-center text-xs uppercase",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-[#0a0a0a] px-4 text-white/40",
                            children: "Or continue with email"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/sign-in-form.tsx",
                            lineNumber: 136,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-in-form.tsx",
                        lineNumber: 135,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/sign-in-form.tsx",
                lineNumber: 131,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputField"], {
                        label: "Email",
                        type: "email",
                        placeholder: "mail@domain.com",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"],
                        value: email,
                        onChange: (e)=>{
                            setEmail(e.target.value);
                            clearError("email");
                            if (!touched.email) setTouched((prev)=>({
                                    ...prev,
                                    email: true
                                }));
                        },
                        onBlur: ()=>setTouched((prev)=>({
                                    ...prev,
                                    email: true
                                })),
                        error: touched.email ? errors.email : undefined,
                        isValid: touched.email ? isEmailValid : undefined,
                        validationMessage: touched.email ? isEmailValid ? "Valid email" : "Invalid email format" : undefined,
                        autoComplete: "email"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-in-form.tsx",
                        lineNumber: 141,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputField"], {
                                label: "Password",
                                type: "password",
                                placeholder: "••••••••",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"],
                                showPasswordToggle: true,
                                value: password,
                                onChange: (e)=>{
                                    setPassword(e.target.value);
                                    clearError("password");
                                    if (!touched.password) setTouched((prev)=>({
                                            ...prev,
                                            password: true
                                        }));
                                },
                                onBlur: ()=>setTouched((prev)=>({
                                            ...prev,
                                            password: true
                                        })),
                                error: touched.password ? errors.password : undefined,
                                isValid: touched.password ? isPasswordValid : undefined,
                                validationMessage: touched.password ? isPasswordValid ? "Valid password" : "Min 6 characters" : undefined,
                                autoComplete: "current-password"
                            }, void 0, false, {
                                fileName: "[project]/components/auth/sign-in-form.tsx",
                                lineNumber: 160,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: rememberMe,
                                                        onChange: (e)=>setRememberMe(e.target.checked),
                                                        className: "peer sr-only"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/auth/sign-in-form.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center", rememberMe ? "bg-white border-white" : "border-white/30 group-hover:border-white/50"),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-3 h-3 text-black transition-all duration-200", rememberMe ? "scale-100 opacity-100" : "scale-0 opacity-0"),
                                                            strokeWidth: 3
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/auth/sign-in-form.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/auth/sign-in-form.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/auth/sign-in-form.tsx",
                                                lineNumber: 182,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-white/50 group-hover:text-white/70 transition-colors",
                                                children: "Remember me"
                                            }, void 0, false, {
                                                fileName: "[project]/components/auth/sign-in-form.tsx",
                                                lineNumber: 201,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/auth/sign-in-form.tsx",
                                        lineNumber: 181,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>onForgotPassword && onForgotPassword(),
                                        className: "text-[11px] text-white/40 hover:text-white/70 transition-colors duration-150 underline-offset-2 hover:underline",
                                        children: "Forgot password?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/auth/sign-in-form.tsx",
                                        lineNumber: 206,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/auth/sign-in-form.tsx",
                                lineNumber: 180,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/auth/sign-in-form.tsx",
                        lineNumber: 159,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthButton"], {
                            isLoading: isLoading,
                            children: "Sign In →"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/sign-in-form.tsx",
                            lineNumber: 217,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-in-form.tsx",
                        lineNumber: 216,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/sign-in-form.tsx",
                lineNumber: 140,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/sign-in-form.tsx",
        lineNumber: 126,
        columnNumber: 9
    }, this);
}
_s(SignInForm, "V5GHa2/hq5CGTbu1l9eb9HJSxUs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SignInForm;
const __TURBOPACK__default__export__ = SignInForm;
var _c;
__turbopack_context__.k.register(_c, "SignInForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/sign-up-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignUpForm",
    ()=>SignUpForm,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.js [app-client] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/auth-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/input-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$social$2d$auth$2d$buttons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/social-auth-buttons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function SignUpForm({ onSuccess }) {
    _s();
    const { signup } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSuccess, setIsSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const updateField = (field, value)=>{
        setForm((current)=>({
                ...current,
                [field]: value
            }));
        setErrors((current)=>({
                ...current,
                [field === "acceptTerms" ? "acceptTerms" : field]: undefined
            }));
    };
    const validate = ()=>{
        const nextErrors = {};
        if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
        if (!form.lastName.trim()) nextErrors.lastName = "Last name is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) nextErrors.email = "Email is required";
        else if (!emailRegex.test(form.email)) nextErrors.email = "Please enter a valid email";
        if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
        else if (form.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Enter a valid phone number";
        if (!form.password) nextErrors.password = "Password is required";
        else if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters";
        if (!form.confirmPassword) nextErrors.confirmPassword = "Please confirm your password";
        else if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords do not match";
        if (!form.acceptTerms) nextErrors.acceptTerms = "You must agree to the terms and conditions";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            await signup(form.email.trim(), form.password, `${form.firstName.trim()} ${form.lastName.trim()}`);
            setIsSuccess(true);
            setTimeout(()=>onSuccess?.(), 1200);
        } catch (error) {
            setErrors((current)=>({
                    ...current,
                    email: error?.message || "Unable to create account right now."
                }));
        } finally{
            setIsSubmitting(false);
        }
    };
    if (isSuccess) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-8 w-8",
                        strokeWidth: 3
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/auth/sign-up-form.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-white",
                    children: "Account created"
                }, void 0, false, {
                    fileName: "[project]/components/auth/sign-up-form.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-white/60",
                    children: "You’re ready to start shopping with PKAF LEV."
                }, void 0, false, {
                    fileName: "[project]/components/auth/sign-up-form.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/auth/sign-up-form.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$social$2d$auth$2d$buttons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SocialAuthButtons"], {}, void 0, false, {
                fileName: "[project]/components/auth/sign-up-form.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full border-t border-white/10"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/sign-up-form.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex justify-center text-xs uppercase",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-[#0a0a0a] px-4 text-white/40",
                            children: "Or create with email"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/sign-up-form.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/sign-up-form.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputField"], {
                                label: "First name",
                                type: "text",
                                placeholder: "Jane",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"],
                                value: form.firstName,
                                onChange: (event)=>updateField("firstName", event.target.value),
                                error: errors.firstName,
                                autoComplete: "given-name"
                            }, void 0, false, {
                                fileName: "[project]/components/auth/sign-up-form.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputField"], {
                                label: "Last name",
                                type: "text",
                                placeholder: "Doe",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"],
                                value: form.lastName,
                                onChange: (event)=>updateField("lastName", event.target.value),
                                error: errors.lastName,
                                autoComplete: "family-name"
                            }, void 0, false, {
                                fileName: "[project]/components/auth/sign-up-form.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputField"], {
                        label: "Email",
                        type: "email",
                        placeholder: "mail@domain.com",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"],
                        value: form.email,
                        onChange: (event)=>updateField("email", event.target.value),
                        error: errors.email,
                        autoComplete: "email"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputField"], {
                        label: "Phone",
                        type: "tel",
                        placeholder: "+233 20 123 4567",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"],
                        value: form.phone,
                        onChange: (event)=>updateField("phone", event.target.value),
                        error: errors.phone,
                        autoComplete: "tel"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputField"], {
                        label: "Password",
                        type: "password",
                        placeholder: "••••••••",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"],
                        showPasswordToggle: true,
                        value: form.password,
                        onChange: (event)=>updateField("password", event.target.value),
                        error: errors.password,
                        autoComplete: "new-password"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputField"], {
                        label: "Confirm password",
                        type: "password",
                        placeholder: "Repeat password",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"],
                        showPasswordToggle: true,
                        value: form.confirmPassword,
                        onChange: (event)=>updateField("confirmPassword", event.target.value),
                        error: errors.confirmPassword,
                        autoComplete: "new-password"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "-mt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex cursor-pointer items-center gap-2 text-[11px] leading-relaxed text-white/80",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: form.acceptTerms,
                                        onChange: (event)=>updateField("acceptTerms", event.target.checked),
                                        className: "h-3.5 w-3.5 shrink-0 cursor-pointer rounded border border-white/40 bg-[#111111] text-white accent-white shadow-sm transition checked:bg-white checked:text-black focus:ring-2 focus:ring-white/30 focus:ring-offset-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/auth/sign-up-form.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "I agree to the ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "/legal",
                                                className: "text-white underline underline-offset-2",
                                                children: "terms"
                                            }, void 0, false, {
                                                fileName: "[project]/components/auth/sign-up-form.tsx",
                                                lineNumber: 189,
                                                columnNumber: 30
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/auth/sign-up-form.tsx",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/auth/sign-up-form.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            errors.acceptTerms && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-[10px] text-red-400",
                                children: errors.acceptTerms
                            }, void 0, false, {
                                fileName: "[project]/components/auth/sign-up-form.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthButton"], {
                            isLoading: isSubmitting,
                            type: "submit",
                            disabled: !form.acceptTerms || isSubmitting,
                            className: !form.acceptTerms ? "opacity-60" : "",
                            children: "Create Account →"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/sign-up-form.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/sign-up-form.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/sign-up-form.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/sign-up-form.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(SignUpForm, "CSJfOqk3bbavEHmP8M8rV59/Erw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SignUpForm;
const __TURBOPACK__default__export__ = SignUpForm;
var _c;
__turbopack_context__.k.register(_c, "SignUpForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/forgot-password-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ForgotPasswordModal",
    ()=>ForgotPasswordModal,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ForgotPasswordModal({ isOpen, onClose, onBack }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[10000] flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white text-black p-6 rounded",
            children: [
                "Forgot password placeholder",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onBack,
                            className: "px-3 py-2 border rounded",
                            children: "Back"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/forgot-password-modal.tsx",
                            lineNumber: 11,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-3 py-2 bg-black text-white rounded",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/forgot-password-modal.tsx",
                            lineNumber: 12,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth/forgot-password-modal.tsx",
                    lineNumber: 10,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/auth/forgot-password-modal.tsx",
            lineNumber: 9,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/auth/forgot-password-modal.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, this);
}
_c = ForgotPasswordModal;
const __TURBOPACK__default__export__ = ForgotPasswordModal;
var _c;
__turbopack_context__.k.register(_c, "ForgotPasswordModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/auth-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthModal",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/auth-tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$sign$2d$in$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/sign-in-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$sign$2d$up$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/sign-up-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$forgot$2d$password$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/forgot-password-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function AuthModal({ isOpen, onClose, defaultTab = "signin" }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultTab);
    const [showForgotPassword, setShowForgotPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Reset tab when modal opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthModal.useEffect": ()=>{
            if (isOpen) {
                setActiveTab(defaultTab);
                setShowForgotPassword(false);
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "AuthModal.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["AuthModal.useEffect"];
        }
    }["AuthModal.useEffect"], [
        isOpen,
        defaultTab
    ]);
    const switchTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthModal.useCallback[switchTab]": (tab)=>{
            setActiveTab(tab);
        }
    }["AuthModal.useCallback[switchTab]"], []);
    const handleClose = ()=>{
        setShowForgotPassword(false);
        onClose();
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                transition: {
                    duration: 0.3
                },
                className: "fixed inset-0 z-[9998] bg-black/90 backdrop-blur-sm",
                onClick: handleClose
            }, void 0, false, {
                fileName: "[project]/components/auth/auth-modal.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] overflow-y-auto pointer-events-none overscroll-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-full items-center justify-center p-4 sm:p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20,
                            scale: 0.95
                        },
                        animate: {
                            opacity: 1,
                            y: 0,
                            scale: 1
                        },
                        exit: {
                            opacity: 0,
                            y: 20,
                            scale: 0.95
                        },
                        transition: {
                            duration: 0.4,
                            ease: [
                                0.16,
                                1,
                                0.3,
                                1
                            ]
                        },
                        className: "relative w-full max-w-md bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[85vh]",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/[0.03] blur-[80px] rounded-full pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/components/auth/auth-modal.tsx",
                                lineNumber: 71,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/components/auth/auth-modal.tsx",
                                lineNumber: 72,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClose,
                                className: "absolute top-4 right-4 z-20 p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10",
                                "aria-label": "Close modal",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/auth-modal.tsx",
                                    lineNumber: 80,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/auth/auth-modal.tsx",
                                lineNumber: 75,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 p-6 sm:p-8 overflow-y-auto custom-scrollbar",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.4,
                                            delay: 0.1
                                        },
                                        className: "flex justify-center mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/levlogo.png",
                                            alt: "LEV",
                                            className: "h-24 sm:h-28 w-auto object-contain opacity-100"
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/auth-modal.tsx",
                                            lineNumber: 92,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/auth/auth-modal.tsx",
                                        lineNumber: 86,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        transition: {
                                            duration: 0.3,
                                            delay: 0.2
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthTabs"], {
                                            activeTab: activeTab,
                                            onTabChange: switchTab
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/auth-modal.tsx",
                                            lineNumber: 104,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/auth/auth-modal.tsx",
                                        lineNumber: 99,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            mode: "wait",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    x: activeTab === "signin" ? -20 : 20
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    x: activeTab === "signin" ? 20 : -20
                                                },
                                                transition: {
                                                    duration: 0.25
                                                },
                                                children: activeTab === "signin" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$sign$2d$in$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignInForm"], {
                                                    onSuccess: onClose,
                                                    onForgotPassword: ()=>setShowForgotPassword(true)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/auth/auth-modal.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 45
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$sign$2d$up$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignUpForm"], {
                                                    onSuccess: onClose
                                                }, void 0, false, {
                                                    fileName: "[project]/components/auth/auth-modal.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 45
                                                }, this)
                                            }, activeTab, false, {
                                                fileName: "[project]/components/auth/auth-modal.tsx",
                                                lineNumber: 110,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/auth-modal.tsx",
                                            lineNumber: 109,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/auth/auth-modal.tsx",
                                        lineNumber: 108,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/auth/auth-modal.tsx",
                                lineNumber: 84,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/auth/auth-modal.tsx",
                        lineNumber: 62,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/auth/auth-modal.tsx",
                    lineNumber: 61,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/auth/auth-modal.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$forgot$2d$password$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForgotPasswordModal"], {
                isOpen: showForgotPassword,
                onClose: ()=>setShowForgotPassword(false),
                onBack: ()=>setShowForgotPassword(false)
            }, void 0, false, {
                fileName: "[project]/components/auth/auth-modal.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(AuthModal, "d46kNegTOZJt6WO9fNUNFs/+Mek=");
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/animated-auth-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedAuthButton",
    ()=>AnimatedAuthButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function AnimatedAuthButton({ isLoading, children, className, disabled, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        disabled: disabled || isLoading,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-full bg-white text-black py-4 rounded-xl overflow-hidden", "text-[12px] font-bold tracking-[0.12em] uppercase", "transition-all duration-300 ease-out", "hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]", "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "relative flex items-center justify-center gap-2",
                initial: false,
                animate: {
                    x: isLoading ? 30 : 0,
                    opacity: isLoading ? 0 : 1
                },
                transition: {
                    duration: 0.4,
                    ease: [
                        0.25,
                        0.1,
                        0.25,
                        1
                    ]
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/components/auth/animated-auth-button.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 flex items-center justify-center",
                initial: false,
                animate: {
                    x: isLoading ? 0 : -30,
                    opacity: isLoading ? 1 : 0
                },
                transition: {
                    duration: 0.4,
                    ease: [
                        0.25,
                        0.1,
                        0.25,
                        1
                    ],
                    delay: isLoading ? 0.15 : 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "animate-spin h-5 w-5 text-black",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            className: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "4"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/animated-auth-button.tsx",
                            lineNumber: 62,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            className: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/animated-auth-button.tsx",
                            lineNumber: 70,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth/animated-auth-button.tsx",
                    lineNumber: 56,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/auth/animated-auth-button.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -translate-x-full hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/components/auth/animated-auth-button.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/animated-auth-button.tsx",
        lineNumber: 13,
        columnNumber: 9
    }, this);
}
_c = AnimatedAuthButton;
var _c;
__turbopack_context__.k.register(_c, "AnimatedAuthButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/auth-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/auth-tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$sign$2d$in$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/sign-in-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$sign$2d$up$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/sign-up-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$input$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/input-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/auth-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$animated$2d$auth$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/animated-auth-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$forgot$2d$password$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/forgot-password-modal.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/pkaflev-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PkaflevHeader",
    ()=>PkaflevHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2d$business$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseBusiness$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase-business.js [app-client] (ecmascript) <export default as BriefcaseBusiness>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cart$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/cart-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wishlist$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/wishlist-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/auth-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
// Magnetic Nav Link Component
function MagneticNavLink({ children, href, onMouseEnter, className, isActive }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const handleMouseMove = (e)=>{
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        // Magnetic pull strength
        setPosition({
            x: distanceX * 0.3,
            y: distanceY * 0.3
        });
    };
    const handleMouseLeave = ()=>{
        setPosition({
            x: 0,
            y: 0
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ref: ref,
        href: href,
        onMouseEnter: onMouseEnter,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-block transition-transform duration-200 ease-out", className),
        style: {
            transform: `translate(${position.x}px, ${position.y}px)`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 transition-all duration-300", isActive && "text-current"),
                children: children
            }, void 0, false, {
                fileName: "[project]/components/pkaflev-header.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                layoutId: "nav-active",
                className: "absolute -inset-2 bg-current/10 rounded-sm -z-10",
                transition: {
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6
                }
            }, void 0, false, {
                fileName: "[project]/components/pkaflev-header.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/pkaflev-header.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(MagneticNavLink, "5o4ehqgmojCHPSmxMWTPGKSjVtk=");
_c = MagneticNavLink;
// View Cart Button with slide animation
function ViewCartButton({ isLightBase, forceBlack, onClick }) {
    _s1();
    const [isSliding, setIsSliding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleClick = ()=>{
        setIsSliding(true);
        // Wait for animation then navigate
        setTimeout(()=>{
            onClick();
        }, 400);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleClick,
        disabled: isSliding,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative block w-full py-3 text-center text-xs font-bold tracking-widest overflow-hidden transition-all duration-300", isLightBase || forceBlack ? "bg-black text-white" : "bg-white text-black"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 transition-transform duration-400 ease-out", isLightBase || forceBlack ? "bg-white" : "bg-black", isSliding ? "translate-x-0" : "-translate-x-full"),
                style: {
                    transitionDuration: '400ms'
                }
            }, void 0, false, {
                fileName: "[project]/components/pkaflev-header.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 flex items-center justify-center gap-2 transition-colors duration-300", isSliding ? isLightBase || forceBlack ? "text-black" : "text-white" : ""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-transform duration-400", isSliding ? "translate-x-8 opacity-0" : "translate-x-0"),
                        children: "VIEW CART"
                    }, void 0, false, {
                        fileName: "[project]/components/pkaflev-header.tsx",
                        lineNumber: 130,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute transition-all duration-400", isSliding ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"),
                        children: isLightBase || forceBlack ? "→" : "→"
                    }, void 0, false, {
                        fileName: "[project]/components/pkaflev-header.tsx",
                        lineNumber: 136,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/pkaflev-header.tsx",
                lineNumber: 126,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/pkaflev-header.tsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
_s1(ViewCartButton, "F+Va5Zfzaxm1H0ONYxatRdufIFQ=");
_c1 = ViewCartButton;
const PkaflevHeader = ({ className })=>{
    _s2();
    const { totalItems, items, removeItem, updateQuantity, subtotal, settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cart$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const { totalWishlistItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wishlist$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlist"])();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { products } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProducts"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredLink, setHoveredLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expandedMobileLink, setExpandedMobileLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAccountOpen, setIsAccountOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accountTab, setAccountTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("login");
    const [isCartPreviewOpen, setIsCartPreviewOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cartPreviewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastScrollYRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Close the auth modal automatically when the user navigates to a new page.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PkaflevHeader.useEffect": ()=>{
            if (isAccountOpen) {
                setIsAccountOpen(false);
            }
        }
    }["PkaflevHeader.useEffect"], [
        pathname,
        isAccountOpen
    ]);
    // Handle account icon click - redirect if logged in, show modal if not
    const handleAccountClick = ()=>{
        if (isAuthenticated) {
            router.push("/account");
        } else {
            setIsAccountOpen(true);
            setAccountTab("login");
        }
    };
    const isAccountPage = pathname === "/account";
    const isWishlistPage = pathname === "/wishlist";
    const isPolicyPage = [
        "/contact",
        "/services",
        "/legal",
        "/supply-chain"
    ].includes(pathname || "");
    const isShopPage = pathname?.startsWith("/shop") || pathname === "/shop";
    const forceSolid = isAccountPage || isShopPage || isWishlistPage;
    const forceBlack = isPolicyPage;
    // Determine if the base header style is "light" (white/scrolled) or "dark" (transparent/hero)
    const isLightBase = (scrolled || forceSolid) && !forceBlack;
    // Close cart preview when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PkaflevHeader.useEffect": ()=>{
            const handleClickOutside = {
                "PkaflevHeader.useEffect.handleClickOutside": (event)=>{
                    if (cartPreviewRef.current && !cartPreviewRef.current.contains(event.target)) {
                        setIsCartPreviewOpen(false);
                    }
                }
            }["PkaflevHeader.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "PkaflevHeader.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["PkaflevHeader.useEffect"];
        }
    }["PkaflevHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PkaflevHeader.useEffect": ()=>{
            setMounted(true);
            const handleScroll = {
                "PkaflevHeader.useEffect.handleScroll": ()=>{
                    const currentScrollY = window.scrollY;
                    // Header transparency logic
                    setScrolled(currentScrollY > 20);
                    // Hide/Show logic — use ref to avoid stale closure without re-registering listener
                    if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
                        setIsVisible(false);
                        setHoveredLink(null);
                    } else {
                        setIsVisible(true);
                    }
                    lastScrollYRef.current = currentScrollY;
                }
            }["PkaflevHeader.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "PkaflevHeader.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["PkaflevHeader.useEffect"];
        }
    }["PkaflevHeader.useEffect"], []); // ← empty array: register once, never re-register
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PkaflevHeader.useEffect": ()=>{
            const handleOpenAuth = {
                "PkaflevHeader.useEffect.handleOpenAuth": (event)=>{
                    const customEvent = event;
                    const defaultTab = customEvent.detail?.defaultTab === "signup" ? "signup" : "signin";
                    setIsAccountOpen(true);
                    setAccountTab(defaultTab === "signup" ? "signup" : "login");
                }
            }["PkaflevHeader.useEffect.handleOpenAuth"];
            window.addEventListener("pkaflev:open-auth", handleOpenAuth);
            return ({
                "PkaflevHeader.useEffect": ()=>window.removeEventListener("pkaflev:open-auth", handleOpenAuth)
            })["PkaflevHeader.useEffect"];
        }
    }["PkaflevHeader.useEffect"], []);
    // Prevent scrolling when menu is open or mega menu is active
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PkaflevHeader.useEffect": ()=>{
            if (isMenuOpen || hoveredLink) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "unset";
            }
        }
    }["PkaflevHeader.useEffect"], [
        isMenuOpen,
        hoveredLink
    ]);
    if (!mounted) return null;
    const navLinks = [
        {
            name: "SHOP",
            href: "/shop",
            subLinks: [
                {
                    name: "ALL PRODUCTS",
                    href: "/shop",
                    isPrimary: true
                },
                {
                    name: "Electric Scooters",
                    href: "/shop?category=ELECTRIC%20SCOOTERS"
                },
                {
                    name: "Electric Bikes",
                    href: "/shop?category=ELECTRIC%20BIKES"
                },
                {
                    name: "Motorbikes",
                    href: "/shop?category=MOTORBIKES"
                },
                {
                    name: "Accessories",
                    href: "/shop?category=ACCESSORIES"
                }
            ]
        },
        {
            name: "BECOME A PARTNER",
            href: "/partner"
        },
        {
            name: "SUPPORT",
            href: "/contact"
        }
    ];
    const megaMenuContent = {
        "SHOP": {
            links: [
                {
                    name: "ALL PRODUCTS",
                    href: "/shop"
                },
                {
                    name: "Electric Scooters",
                    href: "/shop?category=ELECTRIC%20SCOOTERS"
                },
                {
                    name: "Electric Bikes",
                    href: "/shop?category=ELECTRIC%20BIKES"
                },
                {
                    name: "Motorbikes",
                    href: "/shop?category=MOTORBIKES"
                },
                {
                    name: "Accessories",
                    href: "/shop?category=ACCESSORIES"
                }
            ],
            featured: [
                {
                    title: "ELECTRIC SCOOTERS",
                    image: "/images/products/scooter-1.jpg"
                },
                {
                    title: "ELECTRIC BIKES",
                    image: "/images/products/ebike-1.jpg"
                }
            ]
        }
    };
    const utilityLinks = [
        {
            name: "CONTACT",
            href: "/contact"
        },
        {
            name: "CLIENT SERVICES",
            href: "/services"
        },
        {
            name: "LEGAL NOTICES",
            href: "/legal"
        },
        {
            name: "SUPPLY CHAINS ACT",
            href: "/supply-chain"
        },
        {
            name: "SOCIAL",
            href: "/social"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseLeave: ()=>setHoveredLink(null),
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    backfaceVisibility: 'hidden'
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 left-0 right-0 w-full z-[120] flex items-center px-6 transition-[background-color,border-color,height,opacity] duration-300 ease-in-out", !isVisible && !isMenuOpen && !isAccountOpen ? "opacity-0 pointer-events-none" : "opacity-100", scrolled || forceSolid || isMenuOpen ? "h-14 bg-white text-black border-b border-black/5" : hoveredLink ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-14 transition-colors duration-300", isLightBase ? "bg-white text-black" : "bg-black/20 text-white backdrop-blur-2xl") : "h-20 bg-transparent text-white", forceBlack && "bg-black text-white border-none", className),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hidden lg:flex flex-1 items-center justify-start gap-12 text-[11px] font-bold tracking-[0.2em]", forceBlack ? "text-white" : !!hoveredLink ? isLightBase ? "text-black" : "text-white" : scrolled || forceSolid ? "text-black" : "text-white"),
                        children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MagneticNavLink, {
                                href: link.href,
                                onMouseEnter: ()=>setHoveredLink(link.name),
                                isActive: hoveredLink === link.name,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pb-1", hoveredLink === link.name ? "opacity-100" : "hover:opacity-60"),
                                children: [
                                    link.name,
                                    hoveredLink === link.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        layoutId: "nav-underline",
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute left-0 right-0 bottom-[-2px] h-[1.5px]", isLightBase ? "bg-black" : "bg-white"),
                                        transition: {
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.6
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 335,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, link.name, true, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 323,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/components/pkaflev-header.tsx",
                        lineNumber: 314,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex lg:hidden w-16 justify-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsMenuOpen(true),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hover:opacity-60 transition-opacity", forceBlack ? "text-white" : !!hoveredLink ? isLightBase ? "text-black" : "text-white" : scrolled || forceSolid || isShopPage ? "text-black" : "text-white"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                size: 24,
                                strokeWidth: 1.5
                            }, void 0, false, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 361,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/pkaflev-header.tsx",
                            lineNumber: 350,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/pkaflev-header.tsx",
                        lineNumber: 349,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 justify-center min-w-0 px-4",
                        children: !isShopPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "group relative",
                            onClick: ()=>setIsMenuOpen(false),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/levlogo.png",
                                alt: "LEV",
                                className: "h-[7.5rem] lg:h-[8.5rem] w-auto object-contain max-w-[300px] lg:max-w-[340px] transition-all duration-300 drop-shadow-lg"
                            }, void 0, false, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 369,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/pkaflev-header.tsx",
                            lineNumber: 368,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/pkaflev-header.tsx",
                        lineNumber: 366,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hidden lg:flex flex-1 items-center justify-end gap-6", forceBlack ? "text-white" : !!hoveredLink ? isLightBase ? "text-black" : "text-white" : scrolled || forceSolid ? "text-black" : "text-white"),
                        onMouseEnter: ()=>setHoveredLink(null),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/wishlist"),
                                className: "hover:opacity-60 transition-opacity relative p-1 magnetic-icon",
                                "aria-label": "Wishlist",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "h-5 w-5",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 394,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    mounted && totalWishlistItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] text-white font-bold",
                                        children: totalWishlistItems
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 396,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 389,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAccountClick,
                                className: "hover:opacity-60 transition-opacity p-1 magnetic-icon",
                                "aria-label": "Account",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    className: "h-5 w-5",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/components/pkaflev-header.tsx",
                                    lineNumber: 407,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 402,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: cartPreviewRef,
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsCartPreviewOpen(!isCartPreviewOpen),
                                        onMouseEnter: ()=>totalItems > 0 && setIsCartPreviewOpen(true),
                                        className: "hover:opacity-60 transition-opacity relative p-1 magnetic-icon",
                                        "aria-label": "Cart",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                className: "h-5 w-5",
                                                strokeWidth: 1.5
                                            }, void 0, false, {
                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                lineNumber: 417,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            totalItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute -top-1 -right-1 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse", isLightBase || forceBlack ? "bg-black text-white" : "bg-white text-black"),
                                                children: totalItems
                                            }, void 0, false, {
                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                lineNumber: 419,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 411,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: isCartPreviewOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.95
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0,
                                                scale: 1
                                            },
                                            exit: {
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.95
                                            },
                                            transition: {
                                                duration: 0.2
                                            },
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-0 top-full mt-4 w-[380px] shadow-2xl border z-[200]", isLightBase || forceBlack ? "bg-white border-black/10 text-black" : "bg-black/95 border-white/10 text-white backdrop-blur-xl"),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-4 pb-3 border-b border-current/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-bold tracking-wider",
                                                                children: [
                                                                    "YOUR BAG (",
                                                                    totalItems,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 445,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setIsCartPreviewOpen(false),
                                                                className: "hover:opacity-60",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                    lineNumber: 450,
                                                                    columnNumber: 49
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 446,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center py-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                className: "w-10 h-10 mx-auto mb-3 opacity-30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 456,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-bold tracking-wider uppercase mb-1",
                                                                children: "BAG'S LOOKING LIGHT."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-current/50 uppercase tracking-widest mb-4",
                                                                children: "FIX THAT."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 458,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 pt-4 border-t border-current/10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[10px] text-current/40 uppercase tracking-widest mb-3 text-left",
                                                                        children: "You Might Like"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 462,
                                                                        columnNumber: 53
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-3 gap-2",
                                                                        children: products.slice(0, 3).map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                href: `/shop/product/${product.id}`,
                                                                                onClick: ()=>setIsCartPreviewOpen(false),
                                                                                className: "group text-left",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "aspect-[3/4] bg-current/5 overflow-hidden mb-1.5",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                            src: product.image || "/levlogo.png",
                                                                                            alt: product.name,
                                                                                            width: 100,
                                                                                            height: 133,
                                                                                            className: "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/pkaflev-header.tsx",
                                                                                            lineNumber: 472,
                                                                                            columnNumber: 69
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 471,
                                                                                        columnNumber: 65
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-[9px] font-bold truncate group-hover:underline",
                                                                                        children: product.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 480,
                                                                                        columnNumber: 65
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-[9px] text-current/60",
                                                                                        children: product.price || "GH₵0.00"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 481,
                                                                                        columnNumber: 65
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, product.id, true, {
                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                lineNumber: 465,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 463,
                                                                        columnNumber: 53
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 461,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/shop",
                                                                onClick: ()=>setIsCartPreviewOpen(false),
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-block mt-5 px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase hover:opacity-80 transition-opacity", isLightBase || forceBlack ? "bg-black text-white" : "bg-white text-black"),
                                                                children: "SHOP NOW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-3 max-h-[300px] overflow-y-auto",
                                                                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "w-16 h-20 bg-current/5 flex-shrink-0 overflow-hidden",
                                                                                children: item.product.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                    src: item.product.image,
                                                                                    alt: item.product.name,
                                                                                    width: 64,
                                                                                    height: 80,
                                                                                    className: "w-full h-full object-cover"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                                    lineNumber: 507,
                                                                                    columnNumber: 69
                                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-full h-full bg-current/10 flex items-center justify-center",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                                        className: "w-6 h-6 text-current/30"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 516,
                                                                                        columnNumber: 73
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                                    lineNumber: 515,
                                                                                    columnNumber: 69
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                lineNumber: 505,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex-1 min-w-0",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs font-bold truncate",
                                                                                        children: item.product.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 521,
                                                                                        columnNumber: 65
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-[10px] text-current/60 mt-0.5",
                                                                                        children: [
                                                                                            "Qty: ",
                                                                                            item.quantity
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 522,
                                                                                        columnNumber: 65
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center justify-between mt-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex items-center gap-2",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                        onClick: ()=>updateQuantity(item.product.id, Math.max(1, item.quantity - 1)),
                                                                                                        className: "w-5 h-5 border border-current/20 flex items-center justify-center hover:bg-current/10",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                                                            className: "w-3 h-3"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/pkaflev-header.tsx",
                                                                                                            lineNumber: 529,
                                                                                                            columnNumber: 77
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                                        lineNumber: 525,
                                                                                                        columnNumber: 73
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-xs w-4 text-center",
                                                                                                        children: item.quantity
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                                        lineNumber: 531,
                                                                                                        columnNumber: 73
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                        onClick: ()=>updateQuantity(item.product.id, item.quantity + 1),
                                                                                                        className: "w-5 h-5 border border-current/20 flex items-center justify-center hover:bg-current/10",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                                            className: "w-3 h-3"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/pkaflev-header.tsx",
                                                                                                            lineNumber: 536,
                                                                                                            columnNumber: 77
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                                        lineNumber: 532,
                                                                                                        columnNumber: 73
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                                lineNumber: 524,
                                                                                                columnNumber: 69
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-xs font-bold",
                                                                                                children: item.product.price
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                                lineNumber: 539,
                                                                                                columnNumber: 69
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 523,
                                                                                        columnNumber: 65
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                lineNumber: 520,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>removeItem(item.product.id),
                                                                                className: "self-start p-1 hover:text-red-500 transition-colors",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                    className: "w-4 h-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                                    lineNumber: 546,
                                                                                    columnNumber: 65
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                lineNumber: 542,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, `${item.product.id}-${index}`, true, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 504,
                                                                        columnNumber: 57
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 pt-4 border-t border-current/10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-between mb-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm",
                                                                                children: "Subtotal"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                lineNumber: 554,
                                                                                columnNumber: 57
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-bold",
                                                                                children: [
                                                                                    "GH₵",
                                                                                    subtotal.toFixed(2)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                lineNumber: 555,
                                                                                columnNumber: 57
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 553,
                                                                        columnNumber: 53
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ViewCartButton, {
                                                                        isLightBase: isLightBase,
                                                                        forceBlack: forceBlack,
                                                                        onClick: ()=>{
                                                                            setIsCartPreviewOpen(false);
                                                                            window.location.href = "/cart";
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 557,
                                                                        columnNumber: 53
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 552,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                lineNumber: 443,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/pkaflev-header.tsx",
                                            lineNumber: 431,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 429,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 410,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pkaflev-header.tsx",
                        lineNumber: 379,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex lg:hidden w-28 justify-end gap-3", forceBlack ? "text-white" : !!hoveredLink ? isLightBase ? "text-black" : "text-white" : scrolled || forceSolid || isMenuOpen || isShopPage ? "text-black" : "text-white"),
                        onMouseEnter: ()=>setHoveredLink(null),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push('/wishlist'),
                                className: "hover:opacity-60 transition-opacity p-1 relative",
                                "aria-label": "Wishlist",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "h-5 w-5",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 591,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    mounted && totalWishlistItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-1 -right-1 bg-red-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold",
                                        children: totalWishlistItems
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 593,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 586,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAccountClick,
                                className: "hover:opacity-60 transition-opacity p-1",
                                "aria-label": "Account",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    className: "h-5 w-5",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/components/pkaflev-header.tsx",
                                    lineNumber: 601,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 598,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/cart",
                                className: "hover:opacity-60 transition-opacity relative p-1",
                                onClick: ()=>setIsMenuOpen(false),
                                "aria-label": "Cart",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        className: "h-5 w-5",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 604,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    totalItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold",
                                        children: totalItems
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 606,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 603,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pkaflev-header.tsx",
                        lineNumber: 576,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$auth$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthModal"], {
                        isOpen: isAccountOpen,
                        onClose: ()=>setIsAccountOpen(false),
                        defaultTab: accountTab === "login" ? "signin" : "signup"
                    }, void 0, false, {
                        fileName: "[project]/components/pkaflev-header.tsx",
                        lineNumber: 614,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/pkaflev-header.tsx",
                lineNumber: 299,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: hoveredLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    transition: {
                        duration: 0.3,
                        ease: [
                            0.23,
                            1,
                            0.32,
                            1
                        ]
                    },
                    className: "fixed inset-x-0 top-[56px] bottom-0 z-[110] backdrop-blur-2xl overflow-hidden flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full h-[65vh] min-h-[460px] border-b border-black/5 transition-colors duration-300 relative z-20", isLightBase ? "bg-white text-black" : "bg-black/20 text-white"),
                            onMouseEnter: (e)=>e.stopPropagation(),
                            children: hoveredLink && megaMenuContent[hoveredLink] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full px-10 md:px-14 py-10 pb-16 flex justify-between gap-20 h-full max-w-[1920px] mx-auto overflow-y-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-5 min-w-[200px]",
                                        children: megaMenuContent[hoveredLink].links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[12px] tracking-[0.4em] font-bold transition-colors", isLightBase ? "text-black hover:text-black/70" : "text-white hover:text-white/70"),
                                                children: link.name
                                            }, link.name, false, {
                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                lineNumber: 643,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 641,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-10",
                                        children: megaMenuContent[hoveredLink].featured.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group cursor-pointer w-[200px] lg:w-[240px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "aspect-[2/3] h-[300px] lg:h-[360px] overflow-hidden bg-zinc-100 mb-4 rounded-[2px] relative",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: item.image,
                                                            alt: item.title,
                                                            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pkaflev-header.tsx",
                                                            lineNumber: 661,
                                                            columnNumber: 53
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 660,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] tracking-[0.4em] font-bold transition-colors uppercase", isLightBase ? "text-black" : "text-white"),
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 667,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                lineNumber: 659,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 657,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pkaflev-header.tsx",
                                lineNumber: 639,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/pkaflev-header.tsx",
                            lineNumber: 631,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 w-full relative z-10 cursor-default",
                            onMouseEnter: ()=>setHoveredLink(null)
                        }, void 0, false, {
                            fileName: "[project]/components/pkaflev-header.tsx",
                            lineNumber: 680,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pkaflev-header.tsx",
                    lineNumber: 624,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/pkaflev-header.tsx",
                lineNumber: 622,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: 0.3
                            },
                            className: "fixed inset-0 z-[130] bg-black/80 backdrop-blur-md",
                            onClick: ()=>setIsMenuOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/components/pkaflev-header.tsx",
                            lineNumber: 693,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                x: "-100%"
                            },
                            animate: {
                                x: 0
                            },
                            exit: {
                                x: "-100%"
                            },
                            transition: {
                                type: "spring",
                                damping: 25,
                                stiffness: 200
                            },
                            className: "fixed left-0 top-0 bottom-0 w-full max-w-sm z-[140] bg-neutral-950 shadow-2xl flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-5 border-b border-white/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/levlogo.png",
                                            alt: "LEV",
                                            width: 120,
                                            height: 40,
                                            className: "h-8 w-auto object-contain brightness-0 invert"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pkaflev-header.tsx",
                                            lineNumber: 712,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsMenuOpen(false),
                                            className: "text-white hover:bg-white/10 transition-colors p-2 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 24,
                                                strokeWidth: 1.5
                                            }, void 0, false, {
                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                lineNumber: 723,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/pkaflev-header.tsx",
                                            lineNumber: 719,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pkaflev-header.tsx",
                                    lineNumber: 711,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "flex-1 overflow-y-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-5 space-y-1",
                                            children: navLinks.map((link, index)=>{
                                                const isExpanded = expandedMobileLink === link.name;
                                                const isShopLink = link.name === "SHOP";
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        x: 30
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        x: 0
                                                    },
                                                    transition: {
                                                        delay: index * 0.08,
                                                        duration: 0.4
                                                    },
                                                    children: isShopLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-xl border border-white/5 bg-white/[0.02]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setExpandedMobileLink(isExpanded ? null : link.name),
                                                                className: "flex w-full items-center justify-between py-4 px-4 text-white text-lg font-bold tracking-wide uppercase hover:bg-white/5 rounded-xl transition-colors group",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: link.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 748,
                                                                        columnNumber: 61
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                        size: 20,
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-white/30 group-hover:text-white/60 transition-colors transition-transform", isExpanded && "rotate-90")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 749,
                                                                        columnNumber: 61
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 743,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                                initial: false,
                                                                children: isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        height: 0,
                                                                        opacity: 0
                                                                    },
                                                                    animate: {
                                                                        height: "auto",
                                                                        opacity: 1
                                                                    },
                                                                    exit: {
                                                                        height: 0,
                                                                        opacity: 0
                                                                    },
                                                                    transition: {
                                                                        duration: 0.2,
                                                                        ease: "easeOut"
                                                                    },
                                                                    className: "overflow-hidden border-t border-white/10",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1 px-3 py-3",
                                                                        children: link.subLinks?.map((subLink)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                href: subLink.href,
                                                                                onClick: ()=>setIsMenuOpen(false),
                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm uppercase tracking-[0.12em] hover:bg-white/5", // @ts-ignore - dynamic property checking
                                                                                subLink.isPrimary ? "font-bold text-white shadow-[0_0_12px_rgba(255,255,255,0.05)]" : "font-medium text-white/70 hover:text-white"),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: subLink.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 781,
                                                                                        columnNumber: 81
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                        size: 14,
                                                                                        className: "text-white/30"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                                        lineNumber: 782,
                                                                                        columnNumber: 81
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, subLink.name, true, {
                                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                                lineNumber: 769,
                                                                                columnNumber: 77
                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 767,
                                                                        columnNumber: 69
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                    lineNumber: 760,
                                                                    columnNumber: 65
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 758,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 742,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: link.href,
                                                        onClick: ()=>setIsMenuOpen(false),
                                                        className: "flex items-center justify-between py-4 px-4 text-white text-lg font-bold tracking-wide uppercase hover:bg-white/5 rounded-xl transition-colors group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: link.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 796,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                size: 20,
                                                                className: "text-white/30 group-hover:text-white/60 transition-colors"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 797,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 791,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, link.name, false, {
                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                    lineNumber: 735,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/pkaflev-header.tsx",
                                            lineNumber: 729,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mx-5 h-px bg-white/10 my-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pkaflev-header.tsx",
                                            lineNumber: 809,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-5 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white/40 text-[10px] tracking-[0.3em] uppercase mb-3 px-4",
                                                    children: "Quick Access"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                    lineNumber: 813,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 10
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    transition: {
                                                        delay: 0.4
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/cart",
                                                        onClick: ()=>setIsMenuOpen(false),
                                                        className: "flex items-center gap-3 py-3 px-4 text-white/80 hover:bg-white/5 rounded-xl transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                    size: 18,
                                                                    strokeWidth: 1.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                    lineNumber: 826,
                                                                    columnNumber: 49
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 825,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium tracking-wide",
                                                                        children: "Shopping Cart"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 829,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    totalItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/50 text-xs ml-2",
                                                                        children: [
                                                                            "(",
                                                                            totalItems,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                                        lineNumber: 831,
                                                                        columnNumber: 53
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 828,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                size: 16,
                                                                className: "text-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 834,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                    lineNumber: 815,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 10
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    transition: {
                                                        delay: 0.5
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setIsMenuOpen(false);
                                                            handleAccountClick();
                                                        },
                                                        className: "w-full flex items-center gap-3 py-3 px-4 text-white/80 hover:bg-white/5 rounded-xl transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                    size: 18,
                                                                    strokeWidth: 1.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                    lineNumber: 851,
                                                                    columnNumber: 49
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 850,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium tracking-wide",
                                                                children: "My Account"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 853,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                size: 16,
                                                                className: "text-white/30 ml-auto"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 854,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 843,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                    lineNumber: 838,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 10
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    transition: {
                                                        delay: 0.6
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/partner/login",
                                                        onClick: ()=>setIsMenuOpen(false),
                                                        className: "flex items-center gap-3 py-3 px-4 text-white/80 hover:bg-white/5 rounded-xl transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2d$business$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseBusiness$3e$__["BriefcaseBusiness"], {
                                                                    size: 18,
                                                                    strokeWidth: 1.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                    lineNumber: 869,
                                                                    columnNumber: 49
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 868,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-medium tracking-wide",
                                                                    children: "Partner Login"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                                    lineNumber: 872,
                                                                    columnNumber: 49
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 871,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                size: 16,
                                                                className: "text-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                                lineNumber: 874,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pkaflev-header.tsx",
                                                        lineNumber: 863,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pkaflev-header.tsx",
                                                    lineNumber: 858,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pkaflev-header.tsx",
                                            lineNumber: 812,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pkaflev-header.tsx",
                                    lineNumber: 728,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-white/10 p-5 bg-black/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-x-6 gap-y-2",
                                        children: utilityLinks.slice(0, 4).map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                onClick: ()=>setIsMenuOpen(false),
                                                className: "text-white/40 text-[11px] tracking-wider uppercase hover:text-white/70 transition-colors",
                                                children: link.name
                                            }, link.name, false, {
                                                fileName: "[project]/components/pkaflev-header.tsx",
                                                lineNumber: 884,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/components/pkaflev-header.tsx",
                                        lineNumber: 882,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/pkaflev-header.tsx",
                                    lineNumber: 881,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pkaflev-header.tsx",
                            lineNumber: 703,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/components/pkaflev-header.tsx",
                lineNumber: 689,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/pkaflev-header.tsx",
        lineNumber: 296,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(PkaflevHeader, "iDpCs4gyVh5dRiFlSfyJKWHHFe4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cart$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wishlist$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlist"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProducts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c2 = PkaflevHeader;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MagneticNavLink");
__turbopack_context__.k.register(_c1, "ViewCartButton");
__turbopack_context__.k.register(_c2, "PkaflevHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/header-wrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeaderWrapper",
    ()=>HeaderWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pkaflev$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/pkaflev-header.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function isPartnerPortalRoute(pathname) {
    return pathname === "/partner/login" || pathname?.startsWith("/partner/dashboard");
}
function HeaderWrapper() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAdmin = pathname?.startsWith("/admin");
    const isCart = pathname === "/cart";
    const isPartnerPortal = isPartnerPortalRoute(pathname);
    if (isAdmin || isCart || isPartnerPortal) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pkaflev$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PkaflevHeader"], {}, void 0, false, {
        fileName: "[project]/components/header-wrapper.tsx",
        lineNumber: 18,
        columnNumber: 12
    }, this);
}
_s(HeaderWrapper, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = HeaderWrapper;
var _c;
__turbopack_context__.k.register(_c, "HeaderWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/site-footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteFooter",
    ()=>SiteFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
function SiteFooter() {
    const handleSubmit = (event)=>{
        event.preventDefault();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t border-slate-200/5 bg-[#05060a] text-slate-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 sm:gap-8 lg:gap-10 lg:px-8 lg:py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-5 sm:gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-sm lg:max-w-[320px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "mb-3 inline-block sm:mb-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/levlogo.png",
                                        alt: "LEV",
                                        className: "h-16 w-auto object-contain sm:h-24 lg:h-32"
                                    }, void 0, false, {
                                        fileName: "[project]/components/site-footer.tsx",
                                        lineNumber: 17,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/site-footer.tsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "hidden text-sm text-slate-400 sm:block",
                                    children: "LEV delivers premium urban mobility solutions with a focus on electric scooters, bikes and motorbikes."
                                }, void 0, false, {
                                    fileName: "[project]/components/site-footer.tsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 space-y-1.5 text-xs text-slate-300 sm:mt-6 sm:space-y-2 sm:text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "Phone: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "tel:+233501234567",
                                                    className: "text-white hover:text-white",
                                                    children: "+233 50 123 4567"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 23,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 23,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "Email: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "mailto:hello@lev.com",
                                                    className: "text-white hover:text-white",
                                                    children: "hello@lev.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 24,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 24,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Address: 12 Labone Avenue, Accra, Ghana"
                                        }, void 0, false, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 25,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/site-footer.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/site-footer.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid w-full grid-cols-2 gap-x-4 gap-y-6 sm:gap-6 lg:flex-1 lg:grid-cols-3 lg:gap-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.3em]",
                                            children: "Company"
                                        }, void 0, false, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex flex-col gap-1.5 text-xs text-slate-300 sm:mt-4 sm:gap-2 sm:text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/legal",
                                                    className: "hover:text-white",
                                                    children: "Terms & Conditions"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 33,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/legal",
                                                    className: "hover:text-white",
                                                    children: "Legal Notices"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 34,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/partner",
                                                    className: "hover:text-white",
                                                    children: "Partner Portal"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 35,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/site-footer.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.3em]",
                                            children: "Support"
                                        }, void 0, false, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex flex-col gap-1.5 text-xs text-slate-300 sm:mt-4 sm:gap-2 sm:text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/contact",
                                                    className: "hover:text-white",
                                                    children: "Contact Us"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 42,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/shop",
                                                    className: "hover:text-white",
                                                    children: "Shipping"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 43,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/shop",
                                                    className: "hover:text-white",
                                                    children: "Returns"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/shop",
                                                    className: "hover:text-white",
                                                    children: "FAQ"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/site-footer.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-2 lg:col-span-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xs font-semibold uppercase tracking-[0.3em] text-slate-500",
                                            children: "Newsletter"
                                        }, void 0, false, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 50,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 text-sm text-slate-400",
                                            children: "Subscribe for updates on new products, offers and events."
                                        }, void 0, false, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSubmit,
                                            className: "mt-4 flex flex-col gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "footer-newsletter",
                                                    className: "sr-only",
                                                    children: "Email address"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "footer-newsletter",
                                                    type: "email",
                                                    placeholder: "Enter your email",
                                                    className: "w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/10"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100",
                                                    children: "Subscribe"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/site-footer.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/site-footer.tsx",
                                            lineNumber: 52,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/site-footer.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/site-footer.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/site-footer.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2 border-t border-slate-800 pt-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " LEV. All rights reserved."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/site-footer.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs tracking-[0.18em] text-slate-600",
                            children: "Made By Kxy"
                        }, void 0, false, {
                            fileName: "[project]/components/site-footer.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/site-footer.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/site-footer.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/site-footer.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = SiteFooter;
var _c;
__turbopack_context__.k.register(_c, "SiteFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/footer-wrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterWrapper",
    ()=>FooterWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2d$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site-footer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function isPartnerPortalRoute(pathname) {
    return pathname === "/partner/login" || pathname?.startsWith("/partner/dashboard");
}
function FooterWrapper() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAdmin = pathname?.startsWith("/admin");
    const isPartnerPortal = isPartnerPortalRoute(pathname);
    if (isAdmin || isPartnerPortal) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2d$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiteFooter"], {}, void 0, false, {
        fileName: "[project]/components/footer-wrapper.tsx",
        lineNumber: 17,
        columnNumber: 12
    }, this);
}
_s(FooterWrapper, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = FooterWrapper;
var _c;
__turbopack_context__.k.register(_c, "FooterWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/smooth-scroll.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmoothScroll",
    ()=>SmoothScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const SmoothScroll = ({ children })=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmoothScroll.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const navigatorAny = navigator;
            const isTouchDevice = ("TURBOPACK compile-time value", "object") !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigatorAny.msMaxTouchPoints > 0);
            if (isTouchDevice) {
                return;
            }
            const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                duration: 1.2,
                easing: {
                    "SmoothScroll.useEffect": (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t))
                }["SmoothScroll.useEffect"],
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false
            });
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            return ({
                "SmoothScroll.useEffect": ()=>{
                    lenis.destroy();
                }
            })["SmoothScroll.useEffect"];
        }
    }["SmoothScroll.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
};
_s(SmoothScroll, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SmoothScroll;
var _c;
__turbopack_context__.k.register(_c, "SmoothScroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/smooth-page-transition.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmoothPageTransition",
    ()=>SmoothPageTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SmoothPageTransition({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmoothPageTransition.useEffect": ()=>{
            // Scroll to top on route change
            window.scrollTo(0, 0);
            // Small delay to ensure smooth fade in
            const timer = setTimeout({
                "SmoothPageTransition.useEffect.timer": ()=>setIsReady(true)
            }["SmoothPageTransition.useEffect.timer"], 50);
            return ({
                "SmoothPageTransition.useEffect": ()=>clearTimeout(timer)
            })["SmoothPageTransition.useEffect"];
        }
    }["SmoothPageTransition.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 8
            },
            animate: {
                opacity: isReady ? 1 : 0,
                y: isReady ? 0 : 8
            },
            exit: {
                opacity: 0,
                y: -8
            },
            transition: {
                duration: 0.4,
                ease: [
                    0.25,
                    0.1,
                    0.25,
                    1
                ]
            },
            children: children
        }, pathname, false, {
            fileName: "[project]/components/smooth-page-transition.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/smooth-page-transition.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
_s(SmoothPageTransition, "Kh9g1I5cpwoD9tpakAlCldQf5kI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SmoothPageTransition;
var _c;
__turbopack_context__.k.register(_c, "SmoothPageTransition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/app-wrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppWrapper",
    ()=>AppWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AppWrapper({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAdminRoute = pathname ? pathname.startsWith("/admin") : false;
    const [showSplash, setShowSplash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppWrapper.useEffect": ()=>{
            try {
                sessionStorage.setItem("splashSeen", "true");
                window.dispatchEvent(new Event("splashComplete"));
            } catch (e) {}
        }
    }["AppWrapper.useEffect"], []);
    if (isAdminRoute) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "opacity-100 transition-opacity duration-700",
            children: children
        }, void 0, false, {
            fileName: "[project]/components/app-wrapper.tsx",
            lineNumber: 28,
            columnNumber: 13
        }, this)
    }, void 0, false);
}
_s(AppWrapper, "5ZUC+hC4Bk3gxPzXkB7384vXg3Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AppWrapper;
var _c;
__turbopack_context__.k.register(_c, "AppWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analytics-tracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalyticsTracker",
    ()=>AnalyticsTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AnalyticsTracker() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsTracker.useEffect": ()=>{
            void pathname;
        }
    }["AnalyticsTracker.useEffect"], [
        pathname
    ]);
    return null;
}
_s(AnalyticsTracker, "V/ldUoOTYUs0Cb2F6bbxKSn7KxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AnalyticsTracker;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/gallery-cache.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedGallerySpreads",
    ()=>getCachedGallerySpreads,
    "preloadGalleryAssets",
    ()=>preloadGalleryAssets,
    "warmGalleryInBackground",
    ()=>warmGalleryInBackground
]);
const getImageSources = (spreads)=>{
    return Array.from(new Set(spreads.flatMap((spread)=>Array.isArray(spread.images) ? spread.images.map((image)=>image.src).filter(Boolean) : [])));
};
const preloadGalleryAssets = (spreads, limit = 18)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!window.__SMGalleryPreloadedImages) {
        window.__SMGalleryPreloadedImages = new Set();
    }
    getImageSources(spreads).slice(0, limit).forEach((src)=>{
        if (window.__SMGalleryPreloadedImages?.has(src)) return;
        window.__SMGalleryPreloadedImages?.add(src);
        const img = new window.Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = src;
    });
};
const getCachedGallerySpreads = async (fallback)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    preloadGalleryAssets(fallback, 24);
    return fallback;
};
const warmGalleryInBackground = (fallback)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const run = ()=>{
        preloadGalleryAssets(fallback, 24);
    };
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(run, {
            timeout: 2500
        });
    } else {
        globalThis.setTimeout(run, 1200);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/gallery-preloader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GalleryPreloader",
    ()=>GalleryPreloader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gallery$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/gallery-cache.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const FALLBACK_GALLERY_SEED = [
    {
        id: 1,
        title: "The Opening",
        subtitle: "Chapter I",
        description: "Where it all begins. Clean lines, bold presence.",
        images: [
            {
                src: "/SMimages/pic1.webp"
            },
            {
                src: "/SMimages/pic3.webp"
            }
        ],
        product: {
            name: "SM Army MTY",
            price: "GH₵200"
        },
        layout: "editorial-right"
    },
    {
        id: 2,
        title: "Dual Nature",
        subtitle: "Light & Shadow",
        description: "Two sides of the same vision.",
        images: [
            {
                src: "/SMimages/pic5.webp"
            },
            {
                src: "/SMimages/pic3.webp"
            }
        ],
        product: {
            name: "Contrast Jacket",
            price: "GH₵85"
        },
        layout: "split"
    },
    {
        id: 3,
        title: "Urban Flow",
        subtitle: "Movement",
        description: "Streetwear that moves with you.",
        images: [
            {
                src: "/SMimages/pic6.webp"
            },
            {
                src: "/SMimages/pic7.webp"
            },
            {
                src: "/SMimages/pic5.webp"
            }
        ],
        product: {
            name: "Flow Set",
            price: "GH₵120"
        },
        layout: "layered"
    }
];
function GalleryPreloader() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GalleryPreloader.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gallery$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warmGalleryInBackground"])(FALLBACK_GALLERY_SEED);
        }
    }["GalleryPreloader.useEffect"], []);
    return null;
}
_s(GalleryPreloader, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = GalleryPreloader;
var _c;
__turbopack_context__.k.register(_c, "GalleryPreloader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_023810a4._.js.map