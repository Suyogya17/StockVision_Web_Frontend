import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteOrder,
  useFindOrdersByCustomerId,
  useUpdateOrder,
} from "../private/order/orderQuery";

interface Order {
  _id: string;
  customer: Array<{
    username: { username: string };
  }>;
  products: Array<{
    image: any;
    product: { productName: string; price: string; image: string };
    quantity: number;
    price: string;
  }>;
  shippingAddress: string;
  status: string;
  paymentStatus: string;
  totalPrice: number;
  orderDate: string;
}

export default function OrderHistory() {
  const [userId, setCustomerId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  // Fetching the token and setting customer ID
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

  const { data, isLoading, isError, refetch } =
    useFindOrdersByCustomerId(userId);
  const { mutate: deleteOrder } = useDeleteOrder();
  const { mutate: updateOrder } = useUpdateOrder();

  const orders = data?.data ?? [];

  // Handle loading or error states
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

  // Handle Delete Order with confirmation and auto-reload
  const handleDelete = (orderId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmed) {
      deleteOrder(orderId, {
        onSuccess: () => {
          toast.success("Order deleted successfully");
          refetch(); // Automatically reload the orders after deletion
        },
        onError: (error: any) => {
          toast.error("Failed to delete order");
          console.error("Delete error:", error);
        },
      });
    }
  };

  // Handle Update Order
  const handleUpdate = (updatedData: any) => {
    if (selectedOrder) {
      updateOrder(
        { orderId: selectedOrder._id, updatedData },
        {
          onSuccess: () => {
            navigate("/orderhistory");
            toast.success("Order updated successfully");
            refetch();
            setSelectedOrder(null); // Close the update modal
          },
          onError: (error: any) => {
            toast.error("Failed to update order");
            console.error("Update error:", error);
          },
        }
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Your Order History
      </h2>

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
                  onClick={() => setSelectedOrder(order)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none"
                >
                  <i className="fas fa-pencil-alt"></i> Update
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Status: <span className="text-blue-500">{order.status}</span>
            </p>
            <p className="text-sm text-gray-600">
              Total: <span className="font-bold">Rs {order.totalPrice}</span>
            </p>
            <p className="text-sm text-gray-600">
              Shipping: {order.shippingAddress}
            </p>
            <p className="text-sm text-gray-600">
              Payment Status: {order.paymentStatus}
            </p>
            <div className="mt-4">
              <ul className="space-y-2">
                {order.products.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <img
                      src={`http://localhost:3000/${item.product.image.replace(
                        "public/",
                        ""
                      )}`}
                      alt={item.product.productName}
                      className="w-90 h-60 object-cover rounded"
                    />
                    <div>
                      <p className="text-gray-800">
                        {item.product.productName}
                      </p>
                      <p className="text-gray-600">
                        Rs {item.product.price} x {item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      {/* Update Order Modal (only shown when selectedOrder is set) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Update Order #{selectedOrder._id}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Status</label>
                <input
                  type="text"
                  defaultValue={selectedOrder.status}
                  onChange={(e) =>
                    setSelectedOrder((prev) => ({
                      ...prev!,
                      status: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">
                  Shipping Address
                </label>
                <input
                  type="text"
                  defaultValue={selectedOrder.shippingAddress}
                  onChange={(e) =>
                    setSelectedOrder((prev) => ({
                      ...prev!,
                      shippingAddress: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleUpdate({
                      status: selectedOrder.status,
                      shippingAddress: selectedOrder.shippingAddress,
                    })
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
