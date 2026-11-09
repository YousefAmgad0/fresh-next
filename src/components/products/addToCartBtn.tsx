"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { addToCart } from "@/app/_actions/cart.action";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { CartContext } from "@/providers/cart-provider";
import { useRouter } from "next/navigation";

export default function AddCartBtn({ productID }: { productID: string }) {
  const router = useRouter();
  const { handleCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function addProductToCart(productID: string) {
    try {
      setLoading(true);

      const response = await addToCart(productID);

      if (response.status == "success") {
        toast.success(response.message, { position: "top-center" });
        handleCart();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-center" });

        if (error.message === "You Must Logged in To Add To Cart") {
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
    <Button
      disabled={loading}
      onClick={() => addProductToCart(productID)}
      className="grow cursor-pointer"
    >
      <ShoppingCart className="size-5" />
      Add To Cart
    </Button>
  );
}
