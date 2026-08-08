export const ORDER_STATUS_VALUES = [
  "processing",
  "delivery-in-progress",
  "delivery-on-route",
  "order-delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUS_VALUES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  processing: "Processing",
  "delivery-in-progress": "Delivery In Progress",
  "delivery-on-route": "Delivery On Route",
  "order-delivered": "Order Delivered",
  cancelled: "Cancelled",
};

export const getOrderStatusLabel = (status: string) =>
  ORDER_STATUS_LABELS[status as OrderStatus] || status;
