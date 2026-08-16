export const parseMoney = (value: unknown): number => {
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

export const formatGhs = (value: unknown): string => `GH₵${parseMoney(value).toFixed(2)}`;

export const resolveOrderItemUnitPrice = (
  item: any,
  catalogProduct?: { price?: string | number } | null
): number => {
  const values = [
    catalogProduct?.price,
    item?.currentPrice,
    item?.unitPrice,
    item?.price,
    item?.product?.price,
  ];

  for (const value of values) {
    const parsed = parseMoney(value);
    if (parsed > 0) {
      return parsed;
    }
  }

  return 0;
};

// Processing fee: payment processor takes ~1.5%, PKAF STORE keeps the rest
// feePercent defaults to 3 as a safe fallback if settings haven't loaded yet
export const calculateProcessingFee = (amount: number, feePercent: number = 3): number => {
  const fee = amount * (feePercent / 100);
  return Math.ceil(fee * 100) / 100; // round up to nearest pesewa
};

export const resolveOrderItemLineTotal = (
  item: any,
  catalogProduct?: { price?: string | number } | null
): number => {
  const quantity = Math.max(1, Math.floor(parseMoney(item?.quantity) || 1));
  return resolveOrderItemUnitPrice(item, catalogProduct) * quantity;
};
