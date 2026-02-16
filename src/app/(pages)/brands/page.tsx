import { BrandI } from "@/interfaces/brand";
import { GetAllBrands } from "@/services/brand.services";
import Link from "next/link";
import React from "react";

export default async function Brand() {
  const { data } = await GetAllBrands();
  // console.log(data, "All Brands");

  const brands: BrandI[] = data || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Brands</h2>

      {brands.length === 0 ? (
        <p className="text-center text-gray-500">No brands found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`} // 👈 الرابط لكل brand
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 block"
            >
              {brand.image && (
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{brand.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
