import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductI } from "@/interfaces/products";
import { GetSpecificProduct } from "@/services/products.services";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import AddCartBtn from "@/components/products/addToCartBtn";
import AddToWishlistBtn from "@/components/wishlist/addToWishlistBtn";

interface ProductIdType {
  productId: string;
}

export default async function ProductDetails({params,prodId}: {params: Promise<ProductIdType>,prodId:string} ) {
  const { productId } = await params;
  // console.log(productId);


  const { data } = await GetSpecificProduct(productId);
  const product: ProductI = data;
  // console.log(data);

  return (
    <>
      <main className="max-w-5xl mx-auto  ">
        <Breadcrumb className="pt-6 ">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-lg" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-lg" href="/products">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-lg">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex min-h-screen items-center justify-center">
          <Card className="grid grid-cols-3 items-center">
            <div className="left-img col-span-1">
              <Carousel
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {product.images.map((img, index) => (
                    <CarouselItem key={index} className="basis-full">
                      <Image
                        src={img}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="w-full h-72 object-cover rounded-lg"
                        priority={index === 0}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="right-content col-span-2 space-y-6">
              <CardHeader className="">
                <CardDescription>{product.brand.name}</CardDescription>
                <CardTitle className="font-bold ">{product.title}</CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((star, index) => {
                  const filledStar = star < Math.round(product.ratingsAverage);
                  return (
                    <React.Fragment key={index}>
                      <Star
                        className={`size-5 ${
                          filledStar
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400 fill-gray-400"
                        }`}
                      />
                    </React.Fragment>
                  );
                })}
                ({product.ratingsQuantity})
              </CardContent>
              <CardContent>
                <strong>EGP{product.price}</strong>
              </CardContent>
              <CardContent className="flex items-center gap-1">
                <AddCartBtn productID={product._id} />
                <AddToWishlistBtn productID={product._id}/>
              </CardContent>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
