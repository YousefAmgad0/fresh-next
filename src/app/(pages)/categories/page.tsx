import { CategoryI } from "@/interfaces/category";
import { GetAllCategories } from "@/services/categories.services";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const { data } = await GetAllCategories();

  const categories: CategoryI[] = data;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Categories</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link key={cat._id} href={`/categories/${cat._id}`}>
            <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
              <div className="w-full h-64 relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw,
           (max-width: 768px) 50vw,
           (max-width: 1024px) 33vw,
           25vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{cat.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
