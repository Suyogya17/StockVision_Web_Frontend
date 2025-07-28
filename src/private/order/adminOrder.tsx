import AdminNavBar from "../../pages/common/adminnavbar";
import { useGetOrders, useUpdateOrder } from "./orderQuery";

interface Order {
  _id: string;
  customer: {
    _id: string;
    username: string;
  } | null;
  products: {
    product: { productName: string; image?: string } | null;
    quantity: number;
  }[];
  totalPrice: number;
  orderDate: string;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
}

export default function AdminOrder() {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOrders();
  const { mutate: updateOrderStatus } = useUpdateOrder();

  if (isLoading) {
    return (
      <p className="text-gray-600 text-lg animate-pulse">Loading orders...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600 text-lg">
        Error fetching orders: {(error as Error).message}
      </p>
    );
  }

  const sortedOrders = orders
    .filter((order: Order) => order.customer !== null) // skip orders with no customer
    .sort((a: Order, b: Order) => {
      return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
    });

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(
      { orderId, updatedData: { status } },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error("Status update error:", error);
        },
      }
    );
  };

  const handlePaymentStatusChange = (
    orderId: string,
    paymentStatus: string
  ) => {
    updateOrderStatus(
      { orderId, updatedData: { paymentStatus } },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error("Payment status update error:", error);
        },
      }
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center">
            Customers Orders
          </h2>
          {sortedOrders.length === 0 ? (
            <p className="text-gray-500 text-center">No orders found.</p>
          ) : (
            <ul className="space-y-6">
              {sortedOrders.map((order: Order) => (
                <li
                  key={order._id}
                  className="border rounded-lg p-6 shadow-sm bg-white"
                >
                  <p>
                    User ID: <strong>{order.customer?._id || "Unknown"}</strong>
                  </p>
                  <p>
                    Username:{" "}
                    <strong>{order.customer?.username || "Unknown"}</strong>
                  </p>
                  <p>
                    Total Price: <strong>Rs {order.totalPrice}</strong>
                  </p>
                  <p>
                    Date:{" "}
                    <strong>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </strong>
                  </p>
                  <p>
                    Status: <strong>{order.status}</strong>
                  </p>
                  <p>
                    Shipping Address: <strong>{order.shippingAddress}</strong>
                  </p>

                  {/* Dropdown for Order Status */}
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order Status
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Dropdown for Payment Status */}
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Status
                    </label>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handlePaymentStatusChange(order._id, e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {/* Displaying Products in the Order */}
                  <div className="mt-4 space-y-4">
                    {order.products.map((orderProduct, index) => {
                      const product = orderProduct.product;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-4 border p-4 rounded-lg"
                        >
                          {product?.image && (
                            <img
                              src={`https://localhost:3000/${product.image.replace(
                                "public/",
                                ""
                              )}`}
                              alt={product.productName}
                              className="w-20 h-20 object-cover rounded-lg shadow-sm"
                            />
                          )}
                          <div>
                            <h3 className="text-lg font-semibold">
                              {product?.productName || "Product removed"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Quantity: {orderProduct.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
