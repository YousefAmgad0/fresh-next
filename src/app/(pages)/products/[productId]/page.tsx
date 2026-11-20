
import { GetSpecificProduct } from "@/services/products.services";
import { ProductI } from "@/interfaces/products";
import Image from "next/image";
import {
  Star,
  Package,
  ShoppingBag,
  Tag,
  CheckCircle2,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import AddCartBtn from "@/components/products/addToCartBtn";
import AddToWishlistBtn from "@/components/wishlist/addToWishlistBtn";

interface ProductIdType {
  productId: string;
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<ProductIdType>;
}) {
  const { productId } = await params;

  const { data } = await GetSpecificProduct(productId);
  const product: ProductI = data;

  const productImages =
    product.images?.length > 0
      ? product.images
      : [product.imageCover];

  const rating = Number(product.ratingsAverage) || 0;
  const roundedRating = Math.min(5, Math.max(0, Math.round(rating)));
  const isAvailable = product.quantity > 0;

  return (
    <main className="min-h-screen bg-gray-50/70">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-48 truncate font-medium text-gray-900 sm:max-w-none">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Showcase */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image Gallery */}
            <div className="flex flex-col justify-center bg-gray-50 p-5 sm:p-8 lg:p-10">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  ShopMart Collection
                </span>

                <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                  <ShoppingBag size={14} />
                  Product Gallery
                </span>
              </div>

              <div className="relative rounded-2xl border border-gray-100 bg-white p-3 sm:p-5">
                <Carousel
                  opts={{
                    align: "start",
                    loop: productImages.length > 1,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {productImages.map((img, index) => (
                      <CarouselItem key={`${img}-${index}`}>
                        <div className="relative flex h-[320px] items-center justify-center sm:h-[430px]">
                          <Image
                            src={img}
                            alt={`${product.title} - Image ${index + 1}`}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-4"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {productImages.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2 border-gray-200 bg-white shadow-sm hover:bg-gray-100" />
                      <CarouselNext className="right-2 border-gray-200 bg-white shadow-sm hover:bg-gray-100" />
                    </>
                  )}
                </Carousel>
              </div>

              <p className="mt-4 text-center text-xs text-gray-400">
                Explore the product from different angles
              </p>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">

              {/* Brand & Category */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
                  {product.brand.name}
                </span>

                <span className="flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                  <Tag size={13} />
                  {product.category.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`Rated ${rating} out of 5`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`size-[18px] ${
                        star <= roundedRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-100 text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-sm font-semibold text-gray-800">
                  {rating.toFixed(1)}
                </span>

                <span className="text-sm text-gray-400">
                  ({product.ratingsQuantity} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="my-7 rounded-xl border border-gray-100 bg-gray-50 p-5">
                <p className="mb-1 text-sm font-medium text-gray-500">
                  Price
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {product.price.toLocaleString("en-EG")}
                  </span>

                  <span className="text-base font-semibold text-gray-500">
                    EGP
                  </span>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isAvailable ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {isAvailable ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Package size={18} />
                  )}

                  {isAvailable ? "In Stock" : "Out of Stock"}
                </div>

                <span className="text-sm text-gray-500">
                  {product.sold.toLocaleString("en-EG")} sold
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <AddCartBtn productID={product._id} />
                </div>

                <div className="flex justify-center">
                  <AddToWishlistBtn productID={product._id} />
                </div>
              </div>

              {/* Short reassurance */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Package size={17} />
                  <span>Convenient shopping with ShopMart</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
              <Package size={20} className="text-gray-700" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Product Description
              </h2>

              <p className="text-xs text-gray-500">
                Everything you need to know about this product
              </p>
            </div>
          </div>

          <p className="whitespace-pre-line text-sm leading-8 text-gray-600 sm:text-base">
            {product.description}
          </p>
        </section>

      </div>
    </main>
  );
}
