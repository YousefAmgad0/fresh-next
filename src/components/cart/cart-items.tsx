import {
  removeCartItem,
  updateCartProductQuantity,
} from "@/app/_actions/cart.action";
import type { CartProductI } from "@/interfaces/cart";
import { CartContext } from "@/providers/cart-provider";
import { Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function CartItems({
  product,
  setProduct,
}: {
  product: CartProductI;
  setProduct: (products: CartProductI[]) => void;
}) {
  const [loading, setLoading] = useState(false);

  const { handleCart } = useContext(CartContext);

  // Delete Product From Cart
  async function deleteProduct(id: string) {
    try {
      setLoading(true);

      const data = await removeCartItem(id);

      if (data.status !== "success" || !data.data?.products) {
        throw new Error(data.message || "Could not delete this product");
      }

      setProduct(data.data.products);
      handleCart();

      toast.success("Product Deleted", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Can Not Delete This Item",
        { position: "top-center" },
      );
    } finally {
      setLoading(false);
    }
  }

  // Update Product Quantity
  async function updateProductCount(id: string, newCount: number) {
    try {
      setLoading(true);

      const data = await updateCartProductQuantity(id, newCount);

      if (data.status !== "success" || !data.data?.products) {
        throw new Error(data.message || "Could not update product quantity");
      }

      setProduct(data.data.products);
      handleCart();

      toast.success("Quantity has Been Updated", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error in updating quantity",
        { position: "top-center" },
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
      {/* Product Left */}
      <div className="flex items-center gap-4">
        <img
          src={product.product.imageCover}
          alt={product.product.title}
          className="h-24 w-24 rounded-lg object-cover md:h-28 md:w-28"
        />

        <div>
          <h3 className="line-clamp-2 text-base font-semibold md:text-lg">
            {product.product.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {product.product.brand.name} | {product.product.category.name}
          </p>

          <div className="flex items-center">
            <Button
              type="button"
              disabled={loading || product.count <= 1}
              onClick={() =>
                updateProductCount(product.product._id, product.count - 1)
              }
              className="h-5 w-5 cursor-pointer rounded-lg border bg-black"
            >
              {loading ? <Spinner /> : "-"}
            </Button>

            <span className="w-6 text-center font-medium">{product.count}</span>

            <Button
              type="button"
              disabled={loading}
              onClick={() =>
                updateProductCount(product.product._id, product.count + 1)
              }
              className="h-5 w-5 cursor-pointer rounded-lg border bg-black"
            >
              {loading ? <Spinner /> : "+"}
            </Button>
          </div>
        </div>
      </div>

      {/* Product Right */}
      <div className="flex items-center gap-6">
        <span className="text-xs text-gray-500">
          {product.price} * {product.count}
        </span>

        <div className="font-semibold">{product.price * product.count}</div>

        <Button
          type="button"
          disabled={loading}
          onClick={() => deleteProduct(product.product._id)}
          className="flex cursor-pointer items-center gap-1 bg-transparent text-sm text-red-600 hover:bg-transparent hover:underline"
        >
          <Trash2 size={16} />
          {loading ? <Spinner /> : "Remove"}
        </Button>
      </div>
    </div>
  );
}
