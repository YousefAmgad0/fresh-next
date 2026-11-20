
import Image from "next/image";
import Link from "next/link";
import { Star, PackageSearch } from "lucide-react";

import {
  GetSpecificBrand,
  GetProductsByBrand,
} from "@/services/brand.services";

import type {
  BrandByIDType,
  ProductByBrandType,
} from "@/interfaces/brand";

import {
  Card,
  CardContent,
  CardHeader,
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

  // Get brand details
  const brandResponse = await GetSpecificBrand(brandID);

  if (!brandResponse?.data) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Brand not found
        </h1>

        <p className="mt-3 text-gray-500">
          The brand you are looking for does not exist.
        </p>

        <Link
          href="/brands"
          className="mt-6 inline-block font-semibold text-gray-900 underline underline-offset-4"
        >
          Browse all brands
        </Link>
      </main>
    );
  }

  const brandBYId: BrandByIDType = brandResponse.data;

  // Get brand products
  const productsResponse = await GetProductsByBrand(brandID);

  const products: ProductByBrandType[] = productsResponse?.data || [];

  return (
    <main className="min-h-screen bg-gray-50/70">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="transition-colors hover:text-gray-900">
            Home
          </Link>

          <span>/</span>

          <Link
            href="/brands"
            className="transition-colors hover:text-gray-900"
          >
            Brands
          </Link>

          <span>/</span>

          <span className="font-medium text-gray-900">
            {brandBYId.name}
          </span>
        </nav>

        {/* Brand Hero */}
        <section className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="grid items-center md:grid-cols-2">
            <div className="order-2 px-7 py-10 md:order-1 md:px-12 md:py-14">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                Explore our collection
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                {brandBYId.name}
              </h1>

              <p className="mt-5 max-w-lg leading-7 text-gray-600">
                Discover products from our {brandBYId.name} collection and
                find what you are looking for.
              </p>

              <p className="mt-6 text-sm font-medium text-gray-500">
                {products.length}{" "}
                {products.length === 1 ? "Product" : "Products"} available
              </p>
            </div>

            <div className="relative order-1 h-56 bg-gray-100 md:order-2 md:h-80">
              <Image
                src={brandBYId.image}
                alt={brandBYId.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-500">
                Brand collection
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Explore Products
              </h2>
            </div>

            <span className="text-sm text-gray-500">
              {products.length}{" "}
              {products.length === 1 ? "item" : "items"}
            </span>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
              <PackageSearch className="mb-4 size-12 text-gray-400" />

              <h3 className="text-xl font-bold text-gray-900">
                No products found
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                There are currently no products available from this brand.
                Please check back later.
              </p>

              <Link
                href="/products"
                className="mt-6 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
              >
                Browse all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((prod) => {
                const rating = Math.min(
                  5,
                  Math.max(0, Math.round(prod.ratingsAverage || 0)),
                );

                return (
                  <Card
                    key={prod._id}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border-gray-200 bg-white py-0 shadow-sm"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${prod._id}`}
                      aria-label={`View ${prod.title}`}
                      className="relative block aspect-square overflow-hidden bg-gray-50 p-5"
                    >
                      <Image
                        src={prod.imageCover}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-4"
                      />
                    </Link>

                    {/* Product Information */}
                    <CardHeader className="gap-2 px-5 pt-5">
                      <CardDescription className="font-medium text-gray-500">
                        {prod.brand?.name}
                      </CardDescription>

                      <CardTitle className="line-clamp-2 min-h-12 text-base leading-6 text-gray-900">
                        <Link
                          href={`/products/${prod._id}`}
                          className="transition-colors hover:text-gray-600"
                        >
                          {prod.title}
                        </Link>
                      </CardTitle>

                      <p className="text-sm text-gray-500">
                        {prod.category?.name}
                      </p>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col px-5 pb-5">
                      {/* Rating */}
                      <div className="mt-3 flex items-center gap-2">
                        <div
                          className="flex items-center"
                          aria-label={`Rated ${prod.ratingsAverage} out of 5`}
                        >
                          {[0, 1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              className={`size-4 ${
                                star < rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>

                        <span className="text-xs text-gray-500">
                          ({prod.ratingsQuantity})
                        </span>
                      </div>

                      {/* Price */}
                      <p className="mt-4 text-lg font-bold text-gray-900">
                        EGP {prod.price.toLocaleString("en-EG")}
                      </p>

                      {/* Actions */}
                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <AddCartBtn productID={prod._id} />
                        <AddToWishlistBtn productID={prod._id} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
