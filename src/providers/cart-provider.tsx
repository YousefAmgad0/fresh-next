"use client";
import { getLoggedUserCart } from "@/app/_actions/cart.action";
import { CartI } from "@/interfaces/cart";
import React, { Children, createContext, useEffect, useState } from "react";

interface CartContextI {
  noOfCartItems: number;
  handleCart: () => void;
  isLoadingCount: boolean;
}

export const CartContext = createContext<CartContextI>({
  noOfCartItems: 0,
  handleCart: () => {},
  isLoadingCount: false,
});
export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(false);
  async function handleCart() {
    try {
      setIsLoadingCount(true);
      const data: CartI = await getLoggedUserCart();
      const total = data.data.products.reduce(
        (accu, prod) => prod.count + accu,
        0,
      );
      setNoOfCartItems(total);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCount(false);
    }
  }

  useEffect(() => {
    handleCart();
  }, []);
  return (
    <>
      <CartContext.Provider
        value={{ noOfCartItems, handleCart, isLoadingCount }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
