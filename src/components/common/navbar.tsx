"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, ShoppingCart, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "@/providers/cart-provider";
import { Spinner } from "../ui/spinner";

export default function Navbar() {
  const { data: session, status } = useSession();
  // console.log(status);

  function logOutUser() {
    signOut({ callbackUrl: "/login" });
  }

  const { isLoadingCount, noOfCartItems } = useContext(CartContext);

  return (
    <nav className="bg-[#F5F5F5E5] py-3">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="nav-logo">
          <Link href="/" className="font-bold flex items-center gap-2">
            <Avatar className="rounded-lg">
              <AvatarFallback className="bg-black font-bold rounded-lg text-white">
                S
              </AvatarFallback>
            </Avatar>
            ShopMart
          </Link>
        </div>

        {/* Links - desktop */}
        <div className="nav-link hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="flex items-center gap-4">
                <NavigationMenuLink asChild>
                  <Link
                    href="/products"
                    className="font-bold px-3 py-1 rounded-md hover:bg-black hover:text-white transition"
                  >
                    Products
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/brands"
                    className="font-bold px-3 py-1 rounded-md hover:bg-black hover:text-white transition"
                  >
                    Brands
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/categories"
                    className="font-bold px-3 py-1 rounded-md hover:bg-black hover:text-white transition"
                  >
                    Categories
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/products">Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/brands">Brands</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/categories">Categories</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Actions */}
        <div className="nav-action flex items-center gap-2 mt-2 md:mt-0">
          <p className="font-black text-back capitalize">
            {session?.user?.name}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="size-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-36">
              <DropdownMenuGroup>
                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/changePassword">Change Password</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/address">Address</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/allorders">Your Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={logOutUser}
                        className="text-red-600"
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <div className="relative">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full cursor-pointer"
              >
                <ShoppingCart className="size-6" />

                {/* Badge */}
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {isLoadingCount ? <Spinner /> : noOfCartItems}
                </span>
              </Button>
            </Link>
          </div>

          {/* Wishlist */}
          <Link href="/wishlist">
            <Heart className="w-6 h-6 fill-current text-red-600 hover:scale-110 transition-transform duration-200 ml-2" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
