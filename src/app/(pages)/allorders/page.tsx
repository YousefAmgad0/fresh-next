import { getLoggedUserID } from "@/app/_actions/cart.action";
import { GetUserOrders } from "@/services/allorders.services";
import { OrderI } from "@/interfaces/orders";

export default async function AllOrders() {
  try {
    // 1. جلب userID
    const userID = await getLoggedUserID();

    // 2. جلب الطلبات
    const ordersData = await GetUserOrders(userID);
    const userOrders: OrderI[] = ordersData || [];

    // 3. إذا مفيش طلبات
    if (!userOrders.length) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No Orders </p>
        </div>
      );
    }

    // 4. عرض الطلبات
    return (
      <main className="space-y-6 py-6">
        {userOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <p className="font-semibold text-lg">Order ID: {order._id}</p>
            <p>
              User: {order.user.name} ({order.user.email})
            </p>
            <p className="font-medium">
              Total Price: EGP {order.totalOrderPrice}
            </p>
            <p>Payment Method: {order.paymentMethodType}</p>
            <p>
              Paid:{" "}
              <span
                className={order.isPaid ? "text-green-600" : "text-red-600"}
              >
                {order.isPaid ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Delivered:{" "}
              <span
                className={
                  order.isDelivered ? "text-green-600" : "text-red-600"
                }
              >
                {order.isDelivered ? "Yes" : "No"}
              </span>
            </p>

            <div className="mt-4 space-y-2">
              <p className="font-semibold">Products:</p>
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-2 border rounded"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.count} × EGP {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    );
  } catch (error) {
    // التعامل مع أي خطأ (عدم تسجيل الدخول، فشل الشبكة، إلخ)
    console.error("Error in AllOrders:", error);
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">
          {error instanceof Error ? error.message : "حدث خطأ غير متوقع"}
        </p>
        <p className="text-gray-600 mt-2">
         Try Again
        </p>
      </div>
    );
  }
}
