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
  const { data: orders = [], isLoading, isError, error } = useGetOrders(); 

  if (isLoading) {
    return <p className="text-gray-600 text-lg animate-pulse">Loading orders...</p>;
  }

  if (isError) {
    return <p className="text-red-600 text-lg">Error fetching orders: {(error as Error).message}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center">Customers Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">No orders found.</p>
          ) : (
            <ul className="space-y-6">
              {orders.map((order: Order) => (
                <li key={order._id} className="border rounded-lg p-6 shadow-sm bg-white">
                  <p>User ID: <strong>{order.customer._id}</strong></p>
                  <p>Username: <strong>{order.customer.username}</strong></p>
                  <p>Total Price: <strong>Rs {order.totalPrice}</strong></p>
                  <p>Date: <strong>{new Date(order.orderDate).toLocaleDateString()}</strong></p>
                  <p>Status: <strong>{order.status}</strong></p>
                  <p>Shipping Address: <strong>{order.shippingAddress}</strong></p>

                  {/* Displaying Products in the Order */}
                  <div className="mt-4 space-y-4">
                    {order.products.map((orderProduct, index) => {
                      const product = orderProduct.product;
                      return (
                        <div key={index} className="flex items-center gap-4 border p-4 rounded-lg">
                          {/* Display the product image if available */}
                          {product.image && (
                            <img
                              src={`http://localhost:3000/${product.image.replace("public/", "")}`}
                              alt={product.productName}
                              className="w-20 h-20 object-cover rounded-lg shadow-sm"
                            />
                          )}
                          <div>
                            <h3 className="text-lg font-semibold">{product.productName}</h3>
                            <p className="text-sm text-gray-500">Quantity: {orderProduct.quantity}</p>
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
