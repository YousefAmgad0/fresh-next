"use client";
import { clearUserCart, getLoggedUserCart } from "@/app/_actions/cart.action";
import React, { useContext, useEffect, useState } from "react";

import { Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItems from "@/components/cart/cart-items";
import { CartI, CartProductI, DataI } from "@/interfaces/cart";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { CartContext } from "@/providers/cart-provider";
import CheckOutSession from "@/components/cart/CheckOutSession";

export default function Cart() {
  /******************************************USER ID************************************************ */

  /******************************************************************************************************* */

  const [product, setProduct] = useState<CartProductI[]>([]);
  // const [cart, setCart] = useState<CartI | null>(null);
  // const [cartData, setCartData] = useState<DataI | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);
  // *************************************************************************************************//

  async function getUserCart() {
    try {
      const data: CartI = await getLoggedUserCart();
      // console.log(data, "Get Logged User Data");
      setProduct(data.data.products);
      // setCart(data);
      // setCartData(data.data);
      
      setcartID(data.cartId);
      setUserID(data.data.cartOwner);
      // setUserID(data.data.cartOwner);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCart(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  /**************************************************************************************************** */
  const { handleCart } = useContext(CartContext);
  const [cartID, setcartID] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  const totalPrice = product.reduce(
    (accu, prod) => accu + prod.price * prod.count,
    0,
  );
  const TotalCount = product.reduce((accu, prod) => accu + prod.count, 0);

  /**************************************************************************************************** */
  async function ClearAllProducts() {
    try {
      setLoading(true);
      const data = await clearUserCart();
      // console.log(data, "Clear All items");

      if (data.message == "success") {
        toast.success("All Product has been deleted");
        setProduct([]);
      }
      handleCart();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loadingCart) {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <p className="text-4xl font-bold tracking-wide">ShopMart</p>
          <Loader className="animate-spin size-10 text-primary" />
        </div>
      </>
    );
  }
  if (product.length == 0) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          Cart is Empty Go To Shop Now{" "}
          <Link className="cursor-pointer" href="/products">
            🧺
          </Link>
        </div>
      </>
    );
  }
  /**************************************************************************************************** */

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
      <p className="text-muted-foreground mt-1">
        {product.length} item in your cart
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {product.map((prod) => (
            <React.Fragment key={prod.product._id}>
              <CartItems setProduct={setProduct} product={prod} />
            </React.Fragment>
          ))}
        </div>

        {/* Order Summary */}

        <div className="space-y-4">
          <div className="border rounded-xl p-4 shadow-sm bg-white space-y-2">
            <h2 className="font-bold text-lg">Order Summary</h2>
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal: ({TotalCount} item)</span>
              <span className="text-3xl font-bold">EGP {totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>Total</span>
              <span>{totalPrice}</span>
            </div>
            <CheckOutSession cartId={cartID!} />
            <Link href={'/products'}><Button className="w-full mt-2">Continue Shopping</Button></Link>
          </div>

          <button
            onClick={ClearAllProducts}
            className="flex items-center justify-center w-full py-2 border rounded-lg text-red-600 hover:bg-red-50 gap-1"
          >
            <Trash2 size={16} /> {loading ? <Spinner /> : "Clear Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
