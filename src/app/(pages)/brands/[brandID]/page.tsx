import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

import {
  GetSpecificBrand,
  GetProductsByBrand,
} from "@/services/brand.services";

import {
  BrandByIDType,
  ProductByBrandType,
} from "@/interfaces/brand";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AddCartBtn from "@/components/products/addToCartBtn";
import AddToWishlistBtn from "@/components/wishlist/addToWishlistBtn";



export default async function BrandPage({
  params,
}: {
  params: Promise<{ brandID: string }>;
}) {
  const { brandID } = await params;

  /* ================= Brand ================= */

  const brandResponse = await GetSpecificBrand(brandID);

  if (!brandResponse?.data) {
    return <h2>Brand not found</h2>;
  }

  const brandBYId: BrandByIDType = brandResponse.data;

  /* ================= Products ================= */

  const productsResponse = await GetProductsByBrand(brandID);

  const products: ProductByBrandType[] =
    productsResponse?.data || [];

  return (
    <main className="container py-10">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((prod) => (
            <Card key={prod._id} className="h-full">
              <Link href={`/products/${prod._id}`}>
                <Image
                  className="w-full object-contain"
                  src={prod.imageCover}
                  width={300}
                  height={300}
                  alt={prod.title}
                />

                <CardHeader>
                  <CardDescription>
                    {prod.brand?.name}
                  </CardDescription>

                  <CardTitle className="font-bold line-clamp-1">
                    {prod.title}
                  </CardTitle>

                  <CardDescription>
                    {prod.category?.name}
                  </CardDescription>
                </CardHeader>

                {/* Rating */}
                <CardContent className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((star, index) => {
                    const filledStar =
                      star < Math.round(prod.ratingsAverage);

                    return (
                      <Star
                        key={index}
                        className={`size-5 ${
                          filledStar
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400 fill-gray-400"
                        }`}
                      />
                    );
                  })}

                  <span>({prod.ratingsQuantity})</span>
                </CardContent>

                {/* Price */}
                <CardContent>
                  <strong>EGP {prod.price}</strong>
                </CardContent>
              </Link>

              {/* Actions */}
              <CardContent className="flex items-center gap-3">
                <AddCartBtn productID={prod._id} />
                <AddToWishlistBtn productID={prod._id}/>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
