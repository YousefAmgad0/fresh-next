"use server";

import { ProfileI } from "@/interfaces/profile";
import { ProductI } from "./../../interfaces/products";
import { getUserToken } from "@/lib/auth";
import { getToken } from "next-auth/jwt";

export async function addAddress(profile: ProfileI) {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "POST",
      body: JSON.stringify(profile),

      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  const data = await response.json();
  return data;
}
//                              Get User Address
export async function getLoggedUserAddress() {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  const data = await response.json();
  return data;
}
//                              Remove User Address
export async function removeUserAddress(id:string) {
  const token = await getUserToken();
  if (!token) throw new Error("Not authorized to do this");
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
    {
        method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  const data = await response.json();
  return data;
}
