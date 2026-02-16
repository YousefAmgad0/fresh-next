import {
  clearUserCart,
  reomveCartItem,
  updateCartProductQuantity,
} from "@/app/_actions/cart.action";
import { CartProductI } from "@/interfaces/cart";
import { Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/providers/cart-provider";

export default function CartItems({
  product,
  setProduct,
 
}: {
  product: CartProductI;
  setProduct: (products: CartProductI[]) => void;
 
}) {
  const [loading, setLoading] = useState(false);



  /************************************************************************************ */
  async function deleteProduct(id: string) {
    try {
      setLoading(true);
      const data = await reomveCartItem(id);
      // console.log(data);
      if (data.status == "success") {
        toast.success("Product Deleted", { position: "top-center" });
      }
      setProduct(data.data.products);
      handleCart()
    } catch (error) {
      toast.error("Can Not Delete This Item", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }
  /************************************************************************************* */
  const {handleCart}=useContext(CartContext)
  /************************************************************************************* */
  async function UpdateProductCount(id: string, newCount: number) {
    try {
      setLoading(true);
      const data = await updateCartProductQuantity(id, newCount);
      // console.log(data, "Update Count ");
      toast.success("Quantity has Been Updated", { position: "top-center" });
      setProduct(data.data.products);
      handleCart()
    } catch (error) {
      console.log(error, "Error in Update quantity");
      toast.error("has Error in updating", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }
  /*************************************************************************************** */

  return (
    <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm bg-white">
      {/* Product Left */}
      <div className="flex items-center gap-4">
        <img
          src={product.product.imageCover}
          alt={product.product.title}
          className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
        />
        <div>
          <h3 className="font-semibold text-base md:text-lg line-clamp-2">
            {product.product.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {product.product.brand.name} | {product.product.category.name}
          </p>
          <div className="flex items-center">
            <Button
            disabled={loading}
            onClick={() =>
              UpdateProductCount(product.product._id, product.count - 1)
            }
            className="w-5 h-5 rounded-lg border  bg-black  cursor-pointer"
          >
            {loading ? <Spinner /> : "-"}
          </Button>
          <span className="w-6 text-center font-medium">{product.count}</span>
          <Button
            disabled={loading}
            onClick={() =>
              UpdateProductCount(product.product._id, product.count + 1)
            }
            className="w-5 h-5 rounded-lg border  bg-black  cursor-pointer"
          >
            {loading ? <Spinner /> : "+"}
          </Button>
          </div>
        </div>

      </div>

      {/* Product Right */}
      <div className="flex items-center gap-6">
        <span className="text-xs text-gray-500">{product.price}*{product.count}</span>
        <div className="font-semibold">{product.price*product.count}</div>
        <Button
          disabled={loading}
          onClick={() => deleteProduct(product.product._id)}
          className="flex items-center text-sm text-red-600 hover:underline gap-1 bg-transparent hover:bg-transparent cursor-pointer"
        >
          <Trash2 size={16} /> {loading ? <Spinner /> : "Remove"}
        </Button>
      </div>
    </div>
  );
}
