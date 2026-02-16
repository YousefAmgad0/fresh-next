import { ProductI } from "@/interfaces/products";
import { GetAllProducts } from "@/services/products.services";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import AddCartBtn from "@/components/products/addToCartBtn";
import AddToWishlistBtn from "@/components/wishlist/addToWishlistBtn";

export default async function Products() {
  const { data } = await GetAllProducts();
  const product: ProductI[] = data; //عشان يظهرلي كل الي جواه لما اجي ا MAP
  // console.log(data);

  return (
    <>
      <main className="py-7">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.map((prod) => (
              <div key={prod._id} className="w-full">
                <Card className="h-full">
                  <Link href={`/products/${prod._id}`}>
                    <Image
                      src={prod.imageCover}
                      alt={prod.title}
                      width={300}
                      height={300}
                      className="w-full h-72 object-cover rounded-t-lg"
                      sizes="(max-width: 640px) 100vw,
                 (max-width: 768px) 50vw,
                 (max-width: 1024px) 33vw,
                 25vw"
                    />
                    <CardHeader>
                      <CardDescription>{prod.brand.name}</CardDescription>
                      <CardTitle className="font-bold line-clamp-1">
                        {prod.title}
                      </CardTitle>
                      <CardDescription>{prod.category.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((star, index) => {
                        const filledStar =
                          star < Math.round(prod.ratingsAverage);
                        return (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              filledStar
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-400 fill-gray-400"
                            }`}
                          />
                        );
                      })}
                      ({prod.ratingsQuantity})
                    </CardContent>
                    <CardContent>
                      <strong>EGP {prod.price}</strong>
                    </CardContent>
                  </Link>
                  <CardContent className="flex items-center gap-2 mt-2">
                    <AddCartBtn productID={prod._id} />
                    <AddToWishlistBtn productID={prod._id} />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
