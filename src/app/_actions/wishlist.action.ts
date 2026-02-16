'use server'

import { getUserToken } from "@/lib/auth";

export async function addToWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("You Must Logged in To Add To Wishlist");  

  const resposne = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
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


export async function getLoggedUserWishlist() {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");

  const resposne = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await resposne.json();
  return data;
}

export async function reomveWishlistItem(id: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");

  const resposne = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
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