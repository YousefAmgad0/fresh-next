const API_URL = process.env.NEXT_PUBLIC_BASE_URL!;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

export async function GetAllProducts() {
  const resposne = await fetch(`${API_URL}/products`);
  const data = await resposne.json();
  return data;
}
export async function GetSpecificProduct(producId :string) {
  const resposne = await fetch(`${API_URL}/products/${producId}`);
  const data = await resposne.json();
  return data;
}

