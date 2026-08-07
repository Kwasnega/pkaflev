export type PayoutStatus = "pending" | "paid";

export interface ReferralSale {
  id: string;
  date: string;
  customerName: string;
  productName: string;
  saleAmount: number;
  commissionAmount: number;
  payoutStatus: PayoutStatus;
}

export interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
}

export interface PartnerStats {
  totalClicks: number;
  totalSignups: number;
  totalCommissionEarned: number;
  pendingPayoutAmount: number;
  conversionRate: number;
}

export interface PartnerPayoutMethod {
  type: "Mobile Money" | "Bank Transfer";
  mobileNumber?: string;
  network?: string;
  accountNumber?: string;
  bankName?: string;
}

export interface PartnerProfile {
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referralLink: string;
  stats: PartnerStats;
  referralHistory: ReferralSale[];
  payoutHistory: PayoutRecord[];
  defaultPayoutMethod: PartnerPayoutMethod;
}

export const mockPartnerProfile: PartnerProfile = {
  name: "James Doe",
  email: "partner@pkaflev.com",
  phone: "+233 20 123 4567",
  referralCode: "PKAF-JDOE23",
  referralLink: "https://pkaflev.com/?ref=PKAF-JDOE23",
  stats: {
    totalClicks: 2847,
    totalSignups: 142,
    totalCommissionEarned: 4860.0,
    pendingPayoutAmount: 720.0,
    conversionRate: 4.99,
  },
  referralHistory: [
    {
      id: "ref-001",
      date: "2026-07-28T14:22:00.000Z",
      customerName: "Customer #1842",
      productName: "PKAF City Cruiser E-Scooter",
      saleAmount: 3200.0,
      commissionAmount: 160.0,
      payoutStatus: "pending",
    },
    {
      id: "ref-002",
      date: "2026-07-25T09:15:00.000Z",
      customerName: "Customer #1831",
      productName: "Urban Glide Pro Helmet",
      saleAmount: 450.0,
      commissionAmount: 22.5,
      payoutStatus: "pending",
    },
    {
      id: "ref-003",
      date: "2026-07-21T16:40:00.000Z",
      customerName: "Customer #1819",
      productName: "PKAF VoltMax E-Bike",
      saleAmount: 5800.0,
      commissionAmount: 290.0,
      payoutStatus: "pending",
    },
    {
      id: "ref-004",
      date: "2026-07-18T11:05:00.000Z",
      customerName: "Customer #1804",
      productName: "RangeBoost Battery Pack 48V",
      saleAmount: 980.0,
      commissionAmount: 49.0,
      payoutStatus: "paid",
    },
    {
      id: "ref-005",
      date: "2026-07-14T08:30:00.000Z",
      customerName: "Customer #1792",
      productName: "PKAF City Cruiser E-Scooter",
      saleAmount: 3200.0,
      commissionAmount: 160.0,
      payoutStatus: "paid",
    },
    {
      id: "ref-006",
      date: "2026-07-10T19:55:00.000Z",
      customerName: "Customer #1778",
      productName: "SwiftRide Commuter E-Bike",
      saleAmount: 4200.0,
      commissionAmount: 210.0,
      payoutStatus: "paid",
    },
    {
      id: "ref-007",
      date: "2026-07-06T13:18:00.000Z",
      customerName: "Customer #1765",
      productName: "PKAF Pro Riding Gloves",
      saleAmount: 180.0,
      commissionAmount: 9.0,
      payoutStatus: "paid",
    },
    {
      id: "ref-008",
      date: "2026-07-02T10:42:00.000Z",
      customerName: "Customer #1751",
      productName: "PKAF VoltMax E-Bike",
      saleAmount: 5800.0,
      commissionAmount: 290.0,
      payoutStatus: "paid",
    },
    {
      id: "ref-009",
      date: "2026-06-28T15:27:00.000Z",
      customerName: "Customer #1738",
      productName: "Urban Glide Pro Helmet",
      saleAmount: 450.0,
      commissionAmount: 22.5,
      payoutStatus: "paid",
    },
    {
      id: "ref-010",
      date: "2026-06-24T09:03:00.000Z",
      customerName: "Customer #1724",
      productName: "PKAF City Cruiser E-Scooter",
      saleAmount: 3200.0,
      commissionAmount: 160.0,
      payoutStatus: "paid",
    },
  ],
  payoutHistory: [
    {
      id: "pay-004",
      date: "2026-07-01T10:00:00.000Z",
      amount: 1240.0,
      method: "Mobile Money",
    },
    {
      id: "pay-003",
      date: "2026-06-01T10:00:00.000Z",
      amount: 980.0,
      method: "Mobile Money",
    },
    {
      id: "pay-002",
      date: "2026-05-01T10:00:00.000Z",
      amount: 1560.0,
      method: "Mobile Money",
    },
    {
      id: "pay-001",
      date: "2026-04-01T10:00:00.000Z",
      amount: 1080.0,
      method: "Bank Transfer",
    },
  ],
  defaultPayoutMethod: {
    type: "Mobile Money",
    mobileNumber: "+233 20 123 4567",
    network: "MTN",
    accountNumber: "",
    bankName: "",
  },
};
