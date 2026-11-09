"use client";

import { addToWishlist } from "@/app/_actions/wishlist.action";
import { CartContext } from "@/providers/cart-provider";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

export default function AddToWishlistBtn({ productID }: { productID: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleCart } = useContext(CartContext);

  async function addProductToWishlist(productID: string) {
    try {
      setLoading(true);

      const response = await addToWishlist(productID);

      if (response.status == "success") {
        toast.success(response.message, { position: "top-center" });
        handleCart();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-center" });

        if (error.message === "You Must Logged in To Add To Wishlist") {
          router.push("/login");
        }
      } else {
        toast.error("Something went wrong", { position: "top-center" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        <Heart
          onClick={() => addProductToWishlist(productID)}
          className="w-6 h-6 cursor-pointer hover:scale-110 transition"
        />
      )}
    </>
  );
}
