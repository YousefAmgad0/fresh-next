
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

export async function GetAllProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function GetSpecificProduct(productId: string) {
  const response = await fetch(`${API_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}
