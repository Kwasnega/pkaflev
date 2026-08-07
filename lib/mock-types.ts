export type ProductCategory = "scooters" | "bikes" | "motorbikes" | "accessories";
export type ProductCondition = "new" | "refurbished";

export interface Product {
  id: string;
  name: string;
  brand?: string;
  collection?: string;
  category?: ProductCategory | string;
  image: string;
  images?: string[];
  price?: string;
  description?: string;
  motorPower?: string;
  batteryCapacity?: string;
  range?: string;
  topSpeed?: string;
  chargeTime?: string;
  weight?: string;
  maxLoad?: string;
  warranty?: string;
  condition?: ProductCondition | string;
  videoUrl?: string;
  createdAt?: string;
  inStock?: boolean;
  originalPrice?: string;
  discount?: string;
  featured?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatar?: string | null;
  memberSince: string;
  role?: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderAddress {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface OrderItem {
  productId?: string;
  name?: string;
  price?: string | number;
  quantity?: number | string;
  image?: string;
  product?: {
    id?: string;
    name?: string;
    image?: string;
  };
  unitPrice?: number;
  lineTotal?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  paymentMethod?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentReference?: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  receiptSent?: boolean;
  receiptSentAt?: string;
}