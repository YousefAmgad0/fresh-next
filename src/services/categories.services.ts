// ===== Categories =====
export async function GetAllCategories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
  const data = await response.json();
  return data;
}

export async function GetSpecificCategory(categoryId: string) {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, {
    next: { revalidate: 10 }
  });
  const data = await response.json();
  return data;
}

// // ===== SubCategories =====
// export async function GetAllSubCategories() {
//   const response = await fetch('https://ecommerce.routemisr.com/api/v1/subcategories');
//   const data = await response.json();
//   return data;
// }

// export async function GetSpecificSubCategory(subCategoryId: string) {
//   const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`);
//   const data = await response.json();
//   return data;
// }

// export async function GetSubCategoriesByCategory(categoryId: string) {
//   const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
//   const data = await response.json();
//   return data;
// }

// // Get products by category
// export async function GetProductsByCategory(categoryId: string) {
//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/products`,
//     { next: { revalidate: 10 } }
//   );
//   const data = await response.json();
//   return data;
// }




export async function GetProductsByCategory(categoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
