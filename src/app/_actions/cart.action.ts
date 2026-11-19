
"use server";

import type { ShippingListType } from "@/interfaces/cart";
import { getUserToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// التأكد من وجود API URL
function getApiUrl() {
  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  return API_URL.replace(/\/$/, "");
}

// التعامل مع استجابة الـ API وتوحيد الأخطاء
async function getApiResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}

// الحصول على Token والتأكد من تسجيل الدخول
async function getAuthenticatedToken() {
  const token = await getUserToken();

  if (!token) {
    throw new Error("Not authorized. Please log in.");
  }

  return token;
}

// ==========================================
// Cart Actions
// ==========================================

// Add Product To Cart
export async function addToCart(productId: string) {
  const token = await getAuthenticatedToken();

  const response = await fetch(`${getApiUrl()}/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  return getApiResponse(response);
}

// Get Logged User Cart
export async function getLoggedUserCart() {
  const token = await getAuthenticatedToken();

  const response = await fetch(`${getApiUrl()}/cart`, {
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await getApiResponse(response);

  if (!data?.data?.products) {
    throw new Error("Invalid cart data received");
  }

  return data;
}

// Get Logged User ID From Token
export async function getLoggedUserID(): Promise<string> {
  const token = await getAuthenticatedToken();

  try {
    const decoded = jwtDecode<{ id: string }>(token);

    if (!decoded.id) {
      throw new Error("User ID not found in token");
    }

    return decoded.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    throw new Error("Invalid authentication token");
  }
}

// Remove Cart Item
export async function removeCartItem(id: string) {
  const token = await getAuthenticatedToken();

  const response = await fetch(`${getApiUrl()}/cart/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  return getApiResponse(response);
}

// Update Cart Product Quantity
export async function updateCartProductQuantity(
  id: string,
  newCount: number,
) {
  const token = await getAuthenticatedToken();

  if (!Number.isInteger(newCount) || newCount < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const response = await fetch(`${getApiUrl()}/cart/${id}`, {
    method: "PUT",
    body: JSON.stringify({ count: newCount }),
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  return getApiResponse(response);
}

// Clear User Cart
export async function clearUserCart() {
  const token = await getAuthenticatedToken();

  const response = await fetch(`${getApiUrl()}/cart`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  return getApiResponse(response);
}

// ==========================================
// Checkout - Stripe
// ==========================================

export async function checkOutAction(
  cartID: string,
  shippingList: ShippingListType,
) {
  const token = await getAuthenticatedToken();

  const response = await fetch(
    `${getApiUrl()}/orders/checkout-session/${cartID}?url=${process.env.NEXT_PUBLIC_APP_URL}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingList }),
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
  );

  return getApiResponse(response);
}

// ==========================================
// Checkout - Cash Order
// ==========================================

export async function createCashOrder(
  cartID: string,
  shippingAddress: ShippingListType,
) {
  const token = await getAuthenticatedToken();

  const response = await fetch(`${getApiUrl()}/orders/${cartID}`, {
    method: "POST",
    body: JSON.stringify({ shippingAddress }),
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  return getApiResponse(response);
}

// ==========================================
// Checkout - Choose Payment Type
// ==========================================

export async function checkoutType(
  cartID: string,
  shippingAddress: ShippingListType,
  type: "stripe" | "cash",
) {
  if (type === "stripe") {
    return checkOutAction(cartID, shippingAddress);
  }

  if (type === "cash") {
    return createCashOrder(cartID, shippingAddress);
  }

  throw new Error("Invalid payment type");
}
