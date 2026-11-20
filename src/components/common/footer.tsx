
import Link from "next/link";
import { Banknote, CreditCard } from "lucide-react";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "My Orders", href: "/allorders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "My Addresses", href: "/address" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black font-bold text-white">
                S
              </span>
              <span className="text-xl font-bold text-gray-900">
                ShopMart
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-gray-600">
              Discover a wide range of products and enjoy a smooth and
              convenient online shopping experience.
            </p>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payment Methods */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">
              Payment Methods
            </h3>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <CreditCard size={20} className="text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  Online Payment
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <Banknote size={20} className="text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  Cash on Delivery
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Secure online checkout powered by Stripe.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ShopMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
