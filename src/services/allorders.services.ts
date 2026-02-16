export async function GetUserOrders(userID: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`, {
      cache: 'no-store', // يمنع Next.js من تخزين الاستجابة
    });

    if (!response.ok) {
      let errorMessage = `فشل جلب الطلبات: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // تجاهل إذا لم يكن هناك جسم JSON
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in GetUserOrders:", error);
    throw error; // نرمي الخطأ مرة أخرى ليتم التقاطه في الصفحة
  }
}