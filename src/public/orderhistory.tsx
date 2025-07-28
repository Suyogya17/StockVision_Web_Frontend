import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Importing Font Awesome trash icon
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../pages/common/footer";
import Navbar from "../pages/common/navbar";
import {
  useDeleteOrder,
  useFindOrdersByCustomerId,
} from "../private/order/orderQuery";

interface Order {
  _id: string;
  customer: { username: string }; // ✅ FIXED
  products: Array<{
    product: { _id: string; productName: string; price: number; image: string };
    quantity: number;
  }>;
  shippingAddress: string;
  status: string;
  paymentStatus: string;
  totalPrice: number;
  orderDate: string;
}

export default function OrderHistory() {
  const [userId, setCustomerId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setCustomerId(decodedToken.id);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Failed to decode token:", error);
        toast.error("Invalid authentication token.");
      }
    } else {
      toast.error("User not authenticated.");
    }
  }, []);

  const { data, isLoading, isError, refetch } =
    useFindOrdersByCustomerId(userId);
  const { mutate: deleteOrder } = useDeleteOrder();

  const orders = data?.data ?? [];

  if (isLoading)
    return <div className="text-center text-xl">Loading your orders...</div>;
  if (isError)
    return (
      <div className="text-center text-xl text-red-500">
        Error fetching orders.
      </div>
    );

  if (!Array.isArray(orders)) {
    return (
      <div className="text-center text-xl">
        Unexpected response format. Please try again later.
      </div>
    );
  }

  if (orders.length === 0) {
    return <div className="text-center text-gray-500">No orders found.</div>;
  }

  const handleDelete = (orderId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmed) {
      deleteOrder(orderId, {
        onSuccess: () => {
          toast.success("Order deleted successfully");
          refetch();
        },
        onError: (error: any) => {
          toast.error("Failed to delete order");
          console.error("Delete error:", error);
        },
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Your Order History
        </h2>
        {username && (
          <div className="text-center text-lg text-gray-700 mb-4">
            <p>Welcome, {username}!</p>
          </div>
        )}

        <ul className="space-y-6">
          {orders.map((order: Order) => (
            <li
              key={order._id}
              className="p-4 border rounded-lg shadow-lg bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-blue-600">
                  Order #{order._id}
                </p>
                <div className="space-x-2">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="px-2 py-2 text-white rounded-lg hover:bg-red-600"
                  >
                    <FaTrashAlt
                      className="text-red-500 hover:text-red-700"
                      size={20}
                    />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Total: <span className="font-bold">Rs {order.totalPrice}</span>
              </p>
              <p className="text-sm text-gray-600">
                Shipping: {order.shippingAddress}
              </p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
              <p className="text-sm text-gray-600">
                Payment Status: {order.paymentStatus}
              </p>
              <div className="mt-4 space-y-2">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={`https://localhost:3000/${product.product.image.replace(
                        "public/",
                        ""
                      )}`}
                      alt={product.product.productName}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {product.product.productName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: Rs {product.product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
