import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFindOrdersByCustomerId } from "../private/order/orderQuery";

interface Order {
  _id: string;
  customer: Array<{
    username: { username: string };
  }>;
  products: Array<{
    product: { productName: string };
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
  status: string;
  paymentStatus: string;
  totalPrice: number;
  orderDate: string;
}

export default function OrderHistory() {
  const [userId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setCustomerId(decodedToken.userId);
      } catch (error) {
        console.error("Failed to decode token:", error);
        toast.error("Invalid authentication token.");
      }
    } else {
      toast.error("User not authenticated.");
    }
  }, []);

  const { data, isLoading, isError } = useFindOrdersByCustomerId(userId);

  const orders = data?.data;
  if (isLoading) return <div>Loading your orders...</div>;
  if (isError) return <div>Error fetching orders.</div>;

  // Ensure order is an array before using .map()
  if (!Array.isArray(orders)) {
    return <div>Unexpected response format. Please try again later.</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center text-gray-500">No orders found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Your Order History
      </h2>

      <ul className="space-y-4">
        {orders.map((order: Order) => (
          <li key={order._id} className="p-4 border rounded-lg shadow-sm">
            <p className="font-semibold">Order #{order._id}</p>
            <p>
              Status: <span className="text-blue-600">{order.status}</span>
            </p>
            <p>
              Total: <span className="font-bold">Rs {order.totalPrice}</span>
            </p>
            <p>Shipping: {order.shippingAddress}</p>
            <p>Payment: {order.paymentStatus}</p>
            <ul className="mt-2">
              {order.products.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {item.product.productName} - {item.quantity} x Rs {item.price}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
