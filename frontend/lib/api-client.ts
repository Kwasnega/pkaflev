import { getBackendUrl } from "@/lib/api-config";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  let response: Response;

  try {
    response = await fetch(getBackendUrl(path), {
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      ...init,
    });
  } catch (error) {
    return {
      error: "Unable to reach the backend server. Please make sure it is running.",
    };
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      error: payload?.error || payload?.message || "Request failed",
    };
  }

  return { data: payload as T };
}

export async function loginUser(email: string, password: string) {
  return request<{ token?: string; role?: string; userId?: number; email?: string; message?: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(payload: Record<string, unknown>) {
  return request<{ message?: string; userId?: number; email?: string; role?: string }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchProducts() {
  return request<Array<Record<string, unknown>>>("/api/shop/products");
}

export async function checkoutOrder(payload: Record<string, unknown>) {
  return request<{ authorization_url?: string; reference?: string; order_id?: number; message?: string }>("/api/shop/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export async function createProduct(payload: Record<string, unknown>) {
  return request<{ product?: Record<string, unknown>; message?: string }>('/api/shop/products', {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getWishlist(userId: string | number) {
  return request<Array<Record<string, unknown>>>(`/api/products/wishlist/${userId}`);
}

export async function addToWishlist(userId: string | number, productId: string | number) {
  return request<Record<string, unknown>>('/api/products/wishlist', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, product_id: productId }),
  });
}

export async function removeFromWishlist(userId: string | number, productId: string | number) {
  return request<Record<string, unknown>>(`/api/products/wishlist/${userId}/${productId}`, {
    method: 'DELETE',
  });
}
