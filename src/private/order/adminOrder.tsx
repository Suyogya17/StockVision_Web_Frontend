import AdminNavBar from "../../pages/common/adminnavbar";
import { useGetOrders } from "./orderQuery";

interface Order {
  _id: string;
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
        <p className="text-gray-600 text-lg">Loading orders...</p>
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
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <ul>
              {orders.map((order: Order) => (
                <li
                  key={order._id}
                  className="flex flex-col mb-6 border rounded-lg hover:bg-gray-50"
                >
                  {/* Loop through all products in the order */}
                  {order.products.map((orderProduct) => {
                    const product = orderProduct.product;

                    return (
                      <div
                        key={product.productName}
                        className="flex flex-col gap-4 mb-4"
                      >
                        {/* Display the product image */}
                        {product.image && (
                          <img
                            src={`http://localhost:3000/${product.image.replace(
                              "public/",
                              ""
                            )}`}
                            alt={product.productName}
                            className="w-24 h-24 object-cover rounded-lg"
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

                  {/* Order summary section */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Price: Rs {order.totalPrice}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {order.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Shipping Address: {order.shippingAddress}
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
