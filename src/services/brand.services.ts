export async function GetAllBrands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );
  const data = await response.json();
  return data;
}

export async function GetSpecificBrand(productId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${productId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching brand:", error);
  }
}

export async function GetProductsByBrand(brandId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


