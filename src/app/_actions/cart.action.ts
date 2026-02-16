"use server";
import { ShippingListType } from "@/interfaces/cart";
import { getUserToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";

export async function addToCart(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("You Must Logged in To Add To Cart");  

  const resposne = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await resposne.json();
  return data;
}

export async function getLoggedUserCart() {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");

  const resposne = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await resposne.json();
  return data;
}

export async function getLoggedUserID(): Promise<string> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("Not authorized. Please log in.");
  }

  try {
    // فك التوكن لاستخراج الـ ID (يعتمد على بنية التوكن)
    const decoded: { id: string } = jwtDecode(token);
    if (!decoded.id) {
      throw new Error("User ID not found in token");
    }
    return decoded.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    throw new Error("Invalid authentication token");
  }
}

export async function reomveCartItem(id: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");

  const resposne = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await resposne.json();
  return data;
}

export async function updateCartProductQuantity(id: string, newCount: number) {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");

  const resposne = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ count: newCount }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await resposne.json();
  return data;
}
export async function clearUserCart() {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");

  const resposne = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await resposne.json();
  return data;
}

/***************************************************************************************************** */
// //                                                        CheckOut

// export async function checkOutAction(cartID: string ,shippingList :ShippingListType) {
//   const token = await getUserToken();
//   if (!token) throw new Error("You Must Logged in To Add To Cart");

//   const resposne = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`, {
//     method: "POST",
//     body: JSON.stringify({ shippingList }),
//     headers: {
//       token: token,
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await resposne.json();
//   return data;
// }

/***************************************************************************************************** */
// Checkout - Stripe
/***************************************************************************************************** */
export async function checkOutAction(cartID: string, shippingList: ShippingListType) {
  const token = await getUserToken();
  if (!token) throw new Error("You must be logged in to checkout");

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`,
    {
      method: "POST",
      body: JSON.stringify({ shippingList }),
      headers: {
        token,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}

/***************************************************************************************************** */
// Checkout - Cash Order
/***************************************************************************************************** */
export async function createCashOrder(cartID: string, shippingAddress: ShippingListType) {
  const token = await getUserToken();
  if (!token) throw new Error("You must be logged in to place a cash order");

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, {
    method: "POST",
    body: JSON.stringify({ shippingAddress }),
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

/***************************************************************************************************** */
// Flexible Checkout - choose type
/***************************************************************************************************** */
export async function checkoutType(
  cartID: string,
  shippingAddress: ShippingListType,
  type: "stripe" | "cash"
) {
  if (type === "stripe") {
    return await checkOutAction(cartID, shippingAddress);
  }

  if (type === "cash") {
    return await createCashOrder(cartID, shippingAddress);
  }

  throw new Error("Invalid payment type");
}


