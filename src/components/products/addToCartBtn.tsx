"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { addToCart } from "@/app/_actions/cart.action";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { CartContext } from "@/providers/cart-provider";
import { redirect } from "next/navigation";


export default function AddCartBtn({ productID }: { productID: string }) {
  /************************************************************************** */
  const {handleCart}=useContext(CartContext)
  /************************************************************************** */
  const [loading, setLoading] = useState(false);
  async function addProductToCart(productID: string) {
    try {
      setLoading(true);
      const response = await addToCart(productID);
      // console.log(response, "Add To Cart");
      if (response.status == "success") {
        toast.success(response.message,{position:'top-center'});
      }
      handleCart()

    } catch (error : any) {
      toast.error(error.message,{position:'top-center'});
      redirect('/login')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button disabled={loading}
      onClick={() => addProductToCart(productID)}
      className="grow cursor-pointer"
    >
      <ShoppingCart className="size-5" />
      Add To Cart
    </Button>
  );
}
