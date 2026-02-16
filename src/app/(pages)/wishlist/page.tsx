import { getLoggedUserWishlist } from "@/app/_actions/wishlist.action";
import { WishlistI } from "@/interfaces/wishlist";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteWishlistButton from "@/components/wishlist/DeleteWishlistButton";

export default async function Wishlist() {
  const { data } = await getLoggedUserWishlist();

  // تأكد إن productWishlist دايمًا array
  const productWishlist: WishlistI[] = data || [];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-8">
        My Wishlist ({productWishlist.length})
      </h2>

      {productWishlist.length === 0 ? (
        <p className="text-gray-500 text-lg">No products in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productWishlist.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow-sm"
            >
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="mt-3 line-clamp-1 font-bold">{product.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold">
                    {product.price} EGP
                  </span>
                  <span className="text-yellow-500">
                    ⭐ {product.ratingsAverage}
                  </span>
                </div>
              </Link>

              <DeleteWishlistButton prodID={product._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
