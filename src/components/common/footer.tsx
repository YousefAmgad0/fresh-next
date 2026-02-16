"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Logo & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Avatar className="rounded-lg w-8 h-8 flex justify-center items-center bg-black text-white font-bold">
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <span className="font-bold">ShopMart</span>
            </div>
            <p className="text-gray-600 leading-6">
              Your one-stop destination for the latest technology, fashion, and
              lifestyle products. Quality guaranteed with fast shipping and
              excellent customer service.
            </p>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Shop Street, Octoper City, DC 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>(+20) 01093333333</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@shopmart.com</span>
              </div>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-bold mb-2">SHOP</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="cursor-default">Electronics</span>
              </li>
              <li>
                <span className="cursor-default">Fashion</span>
              </li>
              <li>
                <span className="cursor-default">Home & Garden</span>
              </li>
              <li>
                <span className="cursor-default">Sports</span>
              </li>
              <li>
                <span className="cursor-default">Deals</span>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="font-bold mb-2">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="cursor-default">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Help Center
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Track Your Order
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Size Guide
                </span>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-bold mb-2">ABOUT</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="cursor-default">
                  About ShopMart
                </span>
              </li>
              <li>
                <span className="cursor-default">Careers</span>
              </li>
              <li>
                <span className="cursor-default">Press</span>
              </li>
              <li>
                <span className="cursor-default">
                  Investor Relations
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Sustainability
                </span>
              </li>
            </ul>
          </div>

          {/* POLICIES */}
          <div>
            <h3 className="font-bold mb-2">POLICIES</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="cursor-default">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Cookie Policy
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Refund Policy
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
