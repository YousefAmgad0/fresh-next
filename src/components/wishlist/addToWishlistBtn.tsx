"use client";
import { addToWishlist } from "@/app/_actions/wishlist.action";
import { CartContext } from "@/providers/cart-provider";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";

export default function AddToWishlistBtn({ productID }: { productID: string }) {
  const [loading, setLoading] = useState(false);
  const { handleCart } = useContext(CartContext);

  async function addProductToWishlist(productID: string) {
    try {
      setLoading(true);
      const response = await addToWishlist(productID);
      // console.log(response, "Add To Wishlist");
      if (response.status == "success") {
        toast.success(response.message, { position: "top-center" });
      }
      handleCart();
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      redirect("/login");
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
