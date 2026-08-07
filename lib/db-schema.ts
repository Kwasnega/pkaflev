// Database schema types for PKAF LEV

import type { ProductCategory, ProductCondition } from "./mock-types";

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
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  memberSince: string;
  updatedAt: string;
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

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  productId?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  trackingNumber?: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}

export interface CreateAddressInput {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  isDefault?: boolean;
}

export interface UpdateAddressInput extends Partial<CreateAddressInput> {
  id: string;
}

// Site Settings for homepage hero images
export interface SiteSettings {
  id: string;
  heroImage1: string;
  heroImage2: string;
  updatedAt: string;
}

export interface UpdateSiteSettingsInput {
  heroImage1?: string;
  heroImage2?: string;
}
