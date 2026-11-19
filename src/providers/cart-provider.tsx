
"use client";

import { getLoggedUserCart } from "@/app/_actions/cart.action";
import { CartI } from "@/interfaces/cart";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  const { status } = useSession();

  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(false);

  const handleCart = useCallback(async () => {
    if (status !== "authenticated") {
      setNoOfCartItems(0);
      return;
    }

    try {
      setIsLoadingCount(true);

      const data: CartI = await getLoggedUserCart();

      const total = data.data.products.reduce(
        (accu, prod) => prod.count + accu,
        0,
      );

      setNoOfCartItems(total);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoadingCount(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      handleCart();
    } else if (status === "unauthenticated") {
      setNoOfCartItems(0);
    }
  }, [status, handleCart]);

  return (
    <CartContext.Provider
      value={{ noOfCartItems, handleCart, isLoadingCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
