import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";

import {
  GetProductsByCategory,
  GetSpecificCategory,
} from "@/services/categories.services";

import { ProductByBrandType } from "@/interfaces/brand";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AddCartBtn from "@/components/products/addToCartBtn";
import AddToWishlistBtn from "@/components/wishlist/addToWishlistBtn";


interface CategoryParamsType {
  categoriesId: string;
}

export interface CategoryByIDType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<CategoryParamsType>;
}) {
  const { categoriesId } = await params;

  /* ================= Category ================= */

  const categoryResponse = await GetSpecificCategory(categoriesId);

  if (!categoryResponse?.data) {
    return <h2>Category not found</h2>;
  }

  const prodCategory: CategoryByIDType =
    categoryResponse.data;

  /* ================= Products ================= */

  const response = await GetProductsByCategory(categoriesId);

  const productCategory: ProductByBrandType[] =
    response?.data || [];

  return (
    <main className="container py-10">
      {/* Category Title */}
      <h2 className="text-4xl font-bold mb-8">
        {prodCategory.name}
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productCategory.length === 0 ? (
          <p>No products found</p>
        ) : (
          productCategory.map((prod) => (
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

                  <CardTitle className="line-clamp-2">
                    {prod.title}
                  </CardTitle>

                  <CardDescription>
                    {prod.category?.name}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((star, index) => {
                    const filled =
                      star < Math.round(prod.ratingsAverage);

                    return (
                      <Star
                        key={index}
                        className={`size-5 ${
                          filled
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400 fill-gray-400"
                        }`}
                      />
                    );
                  })}

                  <span>({prod.ratingsQuantity})</span>
                </CardContent>

                <CardContent>
                  <strong>EGP {prod.price}</strong>
                </CardContent>
              </Link>

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
