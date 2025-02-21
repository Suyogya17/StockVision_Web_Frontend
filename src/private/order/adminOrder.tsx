import AdminNavBar from "../../pages/common/adminnavbar";
import { useGetOrders } from "./orderQuery";

interface Order {
  _id: string;
  customer: {
    _id: string;
    username: string;
  };
  products: {
    product: { productName: string; image?: string };
    quantity: number;
  }[];
  totalPrice: number;
  orderDate: string;
  status: string;
  shippingAddress: string;
}

export default function AdminOrder() {
  // Fetch orders
  const { data: orders, isLoading, isError, error } = useGetOrders();

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg animate-pulse">Loading orders...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">
          Error fetching orders: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="flex justify-center text-2xl font-semibold mb-4 text-gray-800">
            Customers Orders
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">No orders found.</p>
          ) : (
            <ul className="space-y-6">
              {orders.map((order: Order) => (
                <li
                  key={order._id}
                  className="border rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition"
                >
                  {/* User Information */}
                  <div className="mb-4 border-b pb-2">
                    <p className="text-sm text-gray-700 font-medium">
                      User ID:{" "}
                      <span className="font-bold">{order.customer._id}</span>
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Username:{" "}
                      <span className="font-bold">
                        {order.customer.username}
                      </span>
                    </p>
                  </div>

                  {/* Loop through all products in the order */}
                  <div className="space-y-4">
                    {order.products.map((orderProduct) => {
                      const product = orderProduct.product;
                      return (
                        <div
                          key={product.productName}
                          className="flex items-center gap-4"
                        >
                          {/* Display the product image */}
                          {product.image && (
                            <img
                              src={`http://localhost:3000/${product.image.replace(
                                "public/",
                                ""
                              )}`}
                              alt={product.productName}
                              className="w-20 h-20 object-cover rounded-lg shadow-sm"
                            />
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {product.productName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Quantity: {orderProduct.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order summary section */}
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-700 font-medium">
                      Order ID: <span className="font-normal">{order._id}</span>
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Total Price:{" "}
                      <span className="font-normal">Rs {order.totalPrice}</span>
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Date:{" "}
                      <span className="font-normal">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Status:{" "}
                      <span className="font-normal">{order.status}</span>
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Shipping Address:{" "}
                      <span className="font-normal">
                        {order.shippingAddress}
                      </span>
                    </p>
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
