import productsData from "./products.json";
import usersData from "./users.json";
import addressesData from "./addresses.json";
import ordersData from "./orders.json";
import type { Product, UserProfile, Address, Order } from "@/lib/mock-types";

export const mockProducts: Product[] = productsData as Product[];
export const products: Product[] = mockProducts;
export const users: UserProfile[] = usersData as UserProfile[];
export const addresses: Address[] = addressesData as Address[];
export const orders: Order[] = ordersData as Order[];

export { productsData, usersData, addressesData, ordersData };
export { affiliates, mockAffiliates } from "./affiliates";
export { mockPartnerProfile } from "./partner";
export type { KycStatus } from "@/lib/mock-types";
export type {
  Affiliate,
  AffiliateStatus,
  AffiliateReferralHistoryItem,
} from "./affiliates";
export type {
  PartnerProfile,
  PartnerStats,
  ReferralSale,
  PayoutRecord,
  PayoutStatus,
} from "./partner";
