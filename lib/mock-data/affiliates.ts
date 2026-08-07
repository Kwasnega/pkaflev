export type AffiliateStatus = "pending approval" | "active" | "suspended";

export interface AffiliateReferralHistoryItem {
  month: string;
  sales: number;
  commission: number;
  orders: number;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  dateJoined: string;
  totalSales: number;
  totalCommission: number;
  status: AffiliateStatus;
  referralHistory: AffiliateReferralHistoryItem[];
}

export const affiliates: Affiliate[] = [
  {
    id: "aff-1001",
    name: "Nana Kofi Mensah",
    email: "nana@urbanloop.gh",
    referralCode: "LEV-NK-2024",
    dateJoined: "2024-02-14",
    totalSales: 18450,
    totalCommission: 1845,
    status: "active",
    referralHistory: [
      { month: "Jan", sales: 4200, commission: 420, orders: 9 },
      { month: "Feb", sales: 6800, commission: 680, orders: 14 },
      { month: "Mar", sales: 7450, commission: 745, orders: 16 },
    ],
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
    referralHistory: [
      { month: "Jan", sales: 2100, commission: 210, orders: 5 },
      { month: "Feb", sales: 3600, commission: 360, orders: 6 },
      { month: "Mar", sales: 4200, commission: 420, orders: 8 },
    ],
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
    referralHistory: [
      { month: "Jan", sales: 6100, commission: 610, orders: 11 },
      { month: "Feb", sales: 8900, commission: 890, orders: 15 },
      { month: "Mar", sales: 11120, commission: 1112, orders: 18 },
    ],
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
    referralHistory: [
      { month: "Jan", sales: 1800, commission: 180, orders: 4 },
      { month: "Feb", sales: 2400, commission: 240, orders: 5 },
      { month: "Mar", sales: 4000, commission: 400, orders: 7 },
    ],
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
    referralHistory: [
      { month: "Jan", sales: 3000, commission: 300, orders: 7 },
      { month: "Feb", sales: 5200, commission: 520, orders: 10 },
      { month: "Mar", sales: 6100, commission: 610, orders: 12 },
    ],
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
    referralHistory: [
      { month: "Jan", sales: 4700, commission: 470, orders: 8 },
      { month: "Feb", sales: 6600, commission: 660, orders: 12 },
      { month: "Mar", sales: 10100, commission: 1010, orders: 17 },
    ],
  },
];

export const mockAffiliates = affiliates;
