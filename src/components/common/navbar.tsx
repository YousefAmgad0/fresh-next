
"use client";

import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { CartContext } from "@/providers/cart-provider";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";

import {
  Heart,
  ShoppingCart,
  UserRound,
  Menu,
} from "lucide-react";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Brands", href: "/brands" },
  { name: "Categories", href: "/categories" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isLoadingCount, noOfCartItems } = useContext(CartContext);

  async function logOutUser() {
    await signOut({ callbackUrl: "/login" });
  }

  function isActiveLink(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav className="relative z-50 border-b border-gray-200 bg-[#F5F5F5E5]">
      <div className="container mx-auto flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          aria-label="ShopMart Home"
          className="flex shrink-0 items-center gap-2 font-bold text-gray-900"
        >
          <Avatar className="size-9 rounded-lg">
            <AvatarFallback className="rounded-lg bg-black font-bold text-white">
              S
            </AvatarFallback>
          </Avatar>

          <span className="text-lg sm:text-xl">ShopMart</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((item) => {
            const active = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-200 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">

          {/* User Name */}
          {session?.user?.name && (
            <span className="hidden max-w-28 truncate text-sm font-bold capitalize text-gray-900 lg:block">
              {session.user.name}
            </span>
          )}

          {/* Account Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="User account menu"
              >
                <UserRound className="size-5 sm:size-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/changePassword">Change Password</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/address">Address</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/allorders">Your Orders</Link>
                    </DropdownMenuItem>
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

              {session && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logOutUser}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    Log out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-full"
          >
            <Link href="/cart" aria-label="Shopping cart">
              <ShoppingCart className="size-5 sm:size-6" />

              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                {isLoadingCount ? <Spinner /> : noOfCartItems}
              </span>
            </Link>
          </Button>

          {/* Wishlist */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart className="size-5 fill-current text-red-600 transition-transform duration-200 hover:scale-110 sm:size-6" />
            </Link>
          </Button>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="text-left text-xl font-bold">
                    ShopMart
                  </SheetTitle>

                  <SheetDescription className="text-sm text-gray-500">
                    Navigate through ShopMart pages.
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-2">
                  {navLinks.map((item) => {
                    const active = isActiveLink(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
}
